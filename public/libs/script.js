const num = document.querySelectorAll('.num');

(function () {
    $('.hamburger-menu').on('click', function () {
        $('.bar').toggleClass('animate');
        var mobileNav = $('.mobile-nav');
        mobileNav.toggleClass('hide show');
    })
})();


if (document.body.contains(document.querySelector('.underscore'))) {
    function blink() {
        document.querySelector('.underscore').classList.toggle('blink');
    };

    window.setInterval(blink, 600);    
}