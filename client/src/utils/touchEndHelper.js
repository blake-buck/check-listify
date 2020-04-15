function touchEndHelper(e, {touchStartX, touchStartY}, slideLeft, slideRight){
    // if the users Y scroll moves more than 50px, they are likely scrolling the page and not trying to show/hide action buttons
    if(touchStartX > e.changedTouches[0].clientX && Math.abs(touchStartY - e.changedTouches[0].clientY) <= 50){
        slideLeft();
    }

    if(touchStartX < e.changedTouches[0].clientX && Math.abs(touchStartY - e.changedTouches[0].clientY) <= 50){
        slideRight();
    }
}

module.exports = {
    touchEndHelper
}