import React from "react";
import '../assets/css/slideshow.css';
import '../assets/js/slideshow.js';

export default function SystemsGalery() {
    return (
        <div>
            <div id="slideshow-container-systems" class="slideshow-container">
                <div class="mySlidesSystems slider sys-1 gal-strech"></div>
                <div class="mySlidesSystems slider sys-2 gal-strech"></div>
                <div class="mySlidesSystems slider sys-3 gal-strech"></div>
                <div class="mySlidesSystems slider sys-4 gal-strech"></div>
            </div>
            <div class="dots-position">
                <span class="dotSystem"></span>
                <span class="dotSystem"></span>
                <span class="dotSystem"></span>
                <span class="dotSystem"></span>
            </div>
        </div>
    );
}