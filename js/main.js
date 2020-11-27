$(window).on('scroll', function(){
    if($(window).scrollTop()) {
        $('nav').addClass('blue');
    }
    else {
        $('nav').removeClass('black');
    }
})