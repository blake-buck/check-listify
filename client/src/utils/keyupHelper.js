function keyupHelper(e, ifEnter){
    if(e.key === 'Enter'){
        e.preventDefault();
        ifEnter();
    }
}

module.exports = {
    keyupHelper
}