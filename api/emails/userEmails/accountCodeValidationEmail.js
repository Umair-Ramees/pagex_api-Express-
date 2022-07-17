
accountCodeValidation = (code) => {
    let msg = `Hello ! \n  \
    \n Here is your activation code : \
    ${code} \
    \n This code is valid for 15 minutes \
    \n Your Pagex account verification code`

    return msg
}

module.exports = {
    accountCodeValidation
}