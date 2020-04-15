function isValidPassword(password){
    return (password.match(/[A-Z]/) && password.match(/[A-Z]/).length > 0) && (password.match(/[0-9]/) && password.match(/[0-9]/).length > 0) && (password.match(/[!@#$%^&*() ]/) && password.match(/[!@#$%^&*() ]/).length > 0)
}

function validatePassword(password, confirmPassword, ...otherArgs){
    if((otherArgs.length > 0 && otherArgs.some(val => val === '')) || password === '' || password === ''){
        return 'Please fill out all fields'
    }
    else if(password !== confirmPassword){
        return 'Values in new password fields must match.';
    }
    else if(confirmPassword.length < 8){
        return 'New password must be at least 8 characters long.';
    }
    else if(!isValidPassword(confirmPassword)){
        return 'New password must contain an uppercase letter, number, and special character.';
    }

    return null
}

module.exports = {
    isValidPassword,
    validatePassword
}