const UserDao = require('../../daos/userDao/userDao');


async function isCodeValid(data, res) {
    console.log("isCodeValid service !", data);
    // check if code exists
    if (await UserDao.ifExistEmailValidatedByCodeFullname(data)) {
        if (await UserDao.updateAccountValidation(data)) {
            res.status(200).json({
                success: true,
                data: {
                    valid: true,
                    msg: "Accepted"
                },
                code: 200
            })
        } else {
            res.status(200).json({
                success: true,
                data: {
                    valid: false,
                    msg: "Code is not valid or already validated"
                },
                code: 406
            })
        }
    } else {
        res.status(200).json({
            success: true,
            data: {
                valid: false,
                msg: "Code is not valid or already validated "
            },
            code: 406
        })
    }

}

module.exports = {
    isCodeValid
}