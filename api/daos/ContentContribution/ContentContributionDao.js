const ContentContribution = require('../../models/ContentContribution');
const utils = require('../../utils/utils');


const getContentContributions = (query) => {
    return new Promise((resolve, reject) => {
        ContentContribution.find(
            query
        )
            .then((ContentContribution) => {
                resolve(ContentContribution);
            })
            .catch((err) => utils.defaultError(query, err));
    });
};



module.exports = {
    getContentContributions
}; 
