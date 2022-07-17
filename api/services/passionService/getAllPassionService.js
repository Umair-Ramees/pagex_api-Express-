const PassionDao = require('../../daos/passionDao/pasionDao')

async function getAllPassion (res, page, limit) {
    let passions = await PassionDao.getAllPassionsByPageLimit(res, page, limit);
    res.status(200).json({
        success: true,
        code: 200,
        data: passions
    })
}

module.exports = {
    getAllPassion
}