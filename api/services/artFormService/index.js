const {
    findArtFormsByTitle,
    createArtForms,
    searchArtFormByTitle,
    getRecentArtForms,
    getContentCount,
    getRecentWorksByArtForms,
    getRecentContributionsByArtForms
} = require('../../daos/artFormDao/artFormDao');
const artFormDao = require("../../daos/artFormDao/artFormDao");
const ContentContribution = require("../../daos/ContentContribution/ContentContributionDao");
const ContentDao = require('../../daos/contentDao/contentDao');
const arraySort = require('array-sort');
const mongoose = require('mongoose');

const createArtFromsIfNeed = async (artForms) => {
    const dblist = await findArtFormsByTitle(artForms);
    const newArtForms = [];
    if (dblist && dblist.length > 0) {
        newArtForms.push(...artForms.filter(each => !dblist.some(x => x.title.toLowerCase() === each.toLowerCase())));
    } else {
        newArtForms.push(...artForms);
    }

    const newResults = newArtForms.length > 0 ? await createArtForms(newArtForms) : [];
    return [...newResults, ...dblist];
};

const searchByTitle = async (req, res) => {
    const artForms = await searchArtFormByTitle(req.params.title);
    return res.status(200).json({
        success: true,
        code: 200,
        data: artForms,
    });
}

const getArtFormsByUser = async (req, res) => {
    let filteredUniqueResults = [];

    if (req.userData.data) {
        const artFroms = await ContentDao.getArtFormsByUser(req.userData.data);
        if (artFroms && artFroms.length) {
            console.log('artFroms', JSON.stringify(artFroms));
            filteredUniqueResults = artFroms
                .map(a => ({ids: a.artForms.ids, titles: a.artForms.titles}))
                .map(each => each.ids.map((id, index) => ({id, title: each.titles[index]})))
                .reduce((acc, current) => [...acc, ...current], [])
                .reduce((acc, current) => {
                    const x = acc.find(item => item.id === current.id);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
        }
    }

    res.status(200).json({
        success: true,
        code: 200,
        data: filteredUniqueResults,
    });
}

const getWorksByArtform = async (req, res) => {

    let works = [];
    if (req.params.title) {
        artForm = await artFormDao.searchArtFormByTitle(req.params.title);
        if (artForm) {
            let content = [];
            content = await ContentDao.getContentsByArtFormID(artForm._id)
            content.forEach(element => {
                if (element.contentType == "Work")
                    works.push(element)
            });
        }
    }

    res.status(200).json({
        success: true,
        code: 200,
        data: works
    })
}

const getContributionContentByArtform = async (req, res) => {

    let contents;
    if (req.params.artformId) {
        contents = await ContentDao.findContent({'artForms.ids': {$in: [mongoose.Types.ObjectId(req.params.artformId)]}, contentType: 'Contribution'});
    }

    res.status(200).json({
        success: true,
        code: 200,
        data: contents || []
    })
}

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const getRecentWorksandContributionsByArtForm = async (req, res) => {

    let artForms = await getRecentArtForms();

    let countedContents = [];
    let finalResponse = [];

    for (let art of artForms) {
        // let works = await getRecentWorksByArtForms(art);
        // let contributions = await getRecentContributionsByArtForms(art);

        let contentcount = await getContentCount(art);

        await countedContents.push({
            artForm: art,
            count: contentcount,
        })

    }

    let sortedArtforms = arraySort(countedContents, "count", {reverse: true});
    for (let art of sortedArtforms) {
        let works = await getRecentWorksByArtForms(art.artForm);
        let contributions = await getRecentContributionsByArtForms(art.artForm);
        await finalResponse.push({
            artForm: art.artForm,
            works: works,
            contributions
        })
    }
    res.status(200).json({
        success: true,
        code: 200,
        data: await finalResponse
    })
}


const getAllArtForms = async (req, res) => {
    try {
        const allArtForms = await artFormDao.getAllArtForms();
        res.status(200).json({
            success: true,
            code: 200,
            data: allArtForms
        })
    } catch (e) {
        res.status(500).text('An error has occurred');
    }
}


module.exports = {
    createArtFromsIfNeed,
    searchByTitle,
    getArtFormsByUser,
    getWorksByArtform,
    getContributionContentByArtform,
    getRecentWorksandContributionsByArtForm,
    getAllArtForms
}
