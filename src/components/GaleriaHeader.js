import React from "react";
import '../assets/css/slideshow.css';
import '../assets/js/slideshow.js';

export default function GaleriaHeader() {
    return (
        <div>

            <div id="slideshow-container" class="slideshow-container">

                <div class="mySlides slider gal_1 gal-strech"></div>
                <div class="mySlides slider gal_2 gal-strech"></div>
                <div class="mySlides slider gal_3 gal-strech"></div>
                <div class="mySlides slider gal_4 gal-strech"></div>
                <div class="mySlides slider gal_5 gal-strech"></div>
                <div class="mySlides slider gal_6 gal-strech"></div>
                <div class="mySlides slider gal_7 gal-strech"></div>
                <div class="mySlides slider gal_8 gal-strech"></div>
                

            </div>
            <div class="dots-position">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                
            </div>
        </div>
    );
}