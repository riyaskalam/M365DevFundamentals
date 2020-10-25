
function doAnimate() {
    $("#divAnimated").fadeOut(2000).fadeIn(2000);    
}

function createSlideShow() {
    $('.bxslider').bxSlider({
        auto: true,
        autoControls: true
    });
}