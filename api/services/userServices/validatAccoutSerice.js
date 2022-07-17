const userDao = require('../../daos/userDao/userDao');
const EmailValidation = require('../../models/EmailValidation');
const utils = require('../../utils/utils');
// const userEmailsTemplate = require('../../emails/userEmails/accountCodeValidationEmail');
// const emailSender = require('../../utils/emailSender');
const emailService = require('../sendgrid/sendgridService');

async function validateEmailAccount(data, res) {
    // vlidation email and fullname
    // TODO ADD MORE VALIDATIONS
    if (data.email != "" && data.fullname != "") {
        // Check if email exists
        let users = await userDao.ifExistUserAccount(data.email);
        // check if email is not activated
        let valideAccount = await userDao.ifExistEmailValidated(data.email);
        // check if email is not activated
        let accountActive = await userDao.ifEmailValidated(data.email);

        if (users > 0) {
            // Return error message
            res.status(200).json({
                success: true,
                msg: "Account exists",
                code: 302
            })
        } else {
            if (accountActive > 0) {
                await EmailValidation.findOneAndDelete({
                   email: data.email,
                 });
           }
            let response = {};
            let code = "";
            if (valideAccount > 0) {
                response = await userDao.getAccountValidation(data.email);
                code = response.validationCode;
            } else {
                // create account validation
                code = utils.generateRandomNum(6);
                response = await userDao.createAccountValidation(data, code);
            }
            if (response !== false) {
                // // temporary skipping email validation
                // try{
                //     await EmailValidation.updateOne({ email: data.email }, { active: true })
                // }
                // catch(e){}
                // Send Email with code
                emailService.SendValidationCode(code, data.email).then(() => {
                    res.status(200).json({
                        succes: true,
                        code: 200,
                        data: {
                            id: response._id,
                            validationCode: response.validationCode,
                        }
                    })
                }, (error) => {
                    console.log(error);
                    res.status(500)

                });
                // let msg = userEmailsTemplate.accountCodeValidation(code);
                // emailSender.sendEmail("PAGEX TEAM", data.email, "Validation code", msg);


            } else {
                res.status(500)
            }
        }
    }


}

module.exports = {
    validateEmailAccount
}
