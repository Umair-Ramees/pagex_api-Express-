const ArtForm = require("../../models/ArtForm");
const Content = require("../../models/Content");
const User = require("../../models/User");
const mongoose = require('mongoose'); 

const getArtFormById = (ArtFormId) => {
    return ArtForm.findOne({_id: ArtFormId, ArtFormDeleted: false})
}

const createArtForms = async (titles) => {
    const recods = [];
    titles.map(each => {
        recods.push({_id: new mongoose.Types.ObjectId(), title: each.trim().toLowerCase(), artFormDeleted: false});
        return each;
    });

    const results = await ArtForm.insertMany(recods);

    return results;
}

const findByIds = (ids) => {
    return ArtForm.find({_id: {$in: ids.map(x => mongoose.Types.ObjectId(x))}, artFormDeleted: false});
}
const findArtFormsByTitle = (titles) => {
    // { $regex: titles.toLowerCase(), $options: 'i' }
    const aTitle = [];

    for (const title of titles) {
        aTitle.push(`${title.trim().toLowerCase()}`);
    }

    return ArtForm.find({title: {$in: aTitle}, artFormDeleted: false}, {_id: 1, title: 1});
}

const searchArtFormByTitle = async (title) => {
    return ArtForm.find({
        title: {$regex: '.*' + title.trim().toLowerCase() + '.*', $options: 'i'},
        artFormDeleted: false
    }, {_id: 1, title: 1}).limit(10);
}
const getRecentArtForms = async () => {
    return await Content.distinct("artForms.titles", {contentDeleted: false})

}
const getRecentWorksByArtForms = async (art) => {
    let works = await Content.find({
        "artForms.titles": [art],
        contentType: "Work",
        contentDeleted: false
    }).sort({dateOfCreation: -1}).limit(3);
    let users = [];
    for (let work of works) {
        if (work && work.user) {
            let user = await User.findById(work.user, {"fullname": 1, "bio": 1, "profilePhoto": 1, "headline": 1})
            await users.push(user)
        }
    }

    let finalResponse = [];
    let i = 0;
    for (let user of users) {
        let a = await {work: works[i], userDetail: user}
        await finalResponse.push(a);
        i = i + 1

    }


    return await finalResponse;
}
const getContentCount = async (art) => {
    return await Content.count({"artForms.titles": [art], "contentType": "Work", contentDeleted: false})

}

const getRecentContributionsByArtForms = async (art) => {
    let contributions = await Content.find({
        "artForms.titles": [art],
        contentType: "Contribution",
        contentDeleted: false
    }).sort({dateOfCreation: -1}).limit(2);
    let users = [];
    for (let contribution of contributions) {

        if (contribution && contribution.user) {
            let user = await User.findById(contribution.user, {
                "fullname": 1,
                "bio": 1,
                "profilePhoto": 1,
                "headline": 1
            })
            await users.push(user)
        }
    }

    let finalResponse = [];
    let i = 0;
    for (let user of users) {
        let a = await {contribution: contributions[i], userDetail: user};
        await finalResponse.push(a);
        i = i + 1
    }
    return await finalResponse;
}

const getAllArtForms = () => {
  return ArtForm.find({});
};

module.exports = {
    getArtFormById,
    findArtFormsByTitle,
    createArtForms,
    searchArtFormByTitle,
    getRecentArtForms,
    getRecentWorksByArtForms,
    getContentCount,
    getRecentContributionsByArtForms,
    findByIds,
    getAllArtForms
}
