const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const swig = require('swig')
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.MAIL_KEY);

const sendValidationCode = (code, email) => {
    return new Promise((resolve, reject) => {
        const templateData = {
            code
        };

        generateTemplate('validation_code', templateData).then((result) => {
            const msg = {
                to: email,
                from: 'noreply@thepagex.com',
                subject: 'Account validation',
                html: result,
            };

            sgMail.send(msg).then((response) => {
                resolve();
            }, (error) => {
                console.log(error.response.body);
                reject(error);
            });
        });
    });
};

const generateTemplate = (templateName, templateData) => {
    return new Promise((resolve, reject) => {
        const template = path.join(`${__dirname}/templates/${templateName}.html`);
        fs.readFile(template, 'utf8', (err, file) => {
            if (err) reject(err);
            let swigTemplate = swig.compileFile(template);
            resolve(swigTemplate(templateData));
        });
    });
};
module.exports.SendValidationCode = sendValidationCode;
