function isValidPassword(password){
    return (password.match(/[A-Z]/) && password.match(/[A-Z]/).length > 0) && (password.match(/[0-9]/) && password.match(/[0-9]/).length > 0) && (password.match(/[!@#$%^&*() ]/) && password.match(/[!@#$%^&*() ]/).length > 0)
}

module.exports = {
    isValidPassword
}