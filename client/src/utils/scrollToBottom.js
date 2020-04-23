function scrollToBottom(){
    window.scrollBy({left:0, top:window.outerHeight, behavior:'smooth'});
}

module.exports = {
    scrollToBottom
}