const artFormService = require('../services/artFormService/index');

const searchArtFormByTitle = (req, res, next) => {
    // let limit = req.params.limit;
    // let page = req.params.page;
    return artFormService.searchByTitle(req, res);
}

const getArtFormsByUser = (req, res, next) => {
    return artFormService.getArtFormsByUser(req, res);
}

const getWorksByArtform = (req, res, next) => {
    return artFormService.getWorksByArtform(req, res);
}

const getContributionContentByArtform = (req, res, next) => {
    return artFormService.getContributionContentByArtform(req, res);
}
const getRecentWorksandContributionsByArtForm=(req,res,next)=>{
    return artFormService.getRecentWorksandContributionsByArtForm(req,res)
}

const getAllArtForms = (req, res) => {
    return artFormService.getAllArtForms(req, res);
}

module.exports = {
    searchArtFormByTitle,
    getArtFormsByUser,
    getContributionContentByArtform,
    getWorksByArtform,
    getRecentWorksandContributionsByArtForm,
    getAllArtForms
}
