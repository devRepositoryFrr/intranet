import $ from 'jquery';

$(document).ready(function () {


    var slideIndex_gal = 0;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");


    showSlides();

    function showSlides() {
        if ($("body").hasClass("Inicio") == true) {
            var i;
            for (i = 0; i < slides.length; i++) {
                slides[i].style.opacity = "0";
            }
            slideIndex_gal++;
            if (slideIndex_gal > slides.length) { slideIndex_gal = 1 }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace("active-dot", "");
            }
            slides[slideIndex_gal - 1].style.opacity = "1";
            slides[slideIndex_gal - 1].style.zIndex = "1";
            dots[slideIndex_gal - 1].className += " active-dot";
        }
        setTimeout(showSlides, 5000); // Change image every 2 seconds
    }


});