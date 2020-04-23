function scrollToBottom(){
    window.scrollBy({left:0, top:window.outerHeight + 1000, behavior:'smooth'});
}

module.exports = {
    scrollToBottom
}