const Passion = require("../../models/Passion");
const utils = require('../../utils/utils');

findAllPassions = (res) => {
    return new Promise((resolve, reject) => {
        Passion.find({
            passionDeleted: false
        }).then(Passions => {
            resolve(Passions)
        }).catch(err => utils.defaultError(res, err))
    })
}

getAllPassionsByPageLimit = (res, page, limit) => {
    return new Promise((resolve, reject) => {
        Passion.find({
            passionDeleted: false
        }).sort('dateOfCreation')
            .skip(Number(page * limit))
            .limit(Number(limit))
            .exec()
            .then(async Passions => {
                let allPassions = await findAllPassions(res);

                resolve({
                    per_page: parseInt(limit),
                    total: allPassions.length,
                    total_pages: Math.floor(allPassions.length / limit),
                    data: Passions,
                })
            }).catch(err => utils.defaultError(res, err))
    })
}

const getPassionById = (passionId) => {
    return Passion.findOne({ _id: passionId, passionDeleted: false })
}

module.exports = {
    findAllPassions,
    getAllPassionsByPageLimit,
    getPassionById
}