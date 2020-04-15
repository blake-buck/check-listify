function blurHelper(inputValue, ifInputNotBlank, alwaysCall){
    // if the user hasn't typed anything in the input field prevent the field from updating
    if(inputValue !== ''){
        ifInputNotBlank();
    }
    alwaysCall();
}

module.exports = {
    blurHelper
}