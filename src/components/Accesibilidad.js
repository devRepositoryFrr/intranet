import React from "react";

import '../assets/css/menuAccesibilidad.css';
import '../assets/js/funciones-accesibilidad.js';

export default function Accesibilidad() {
    return (
        <div>
            <div>
                <div id="mascara-lectura-top">
                </div>
            </div>
            <div id="mascara-lectura">



            </div>
            <div>
                <div id="mascara-lectura-bottom">
                </div>
            </div>

            <div id="guia-lectura">
            </div>

            <div id="menu-accesibilidad" class="div-ttexto">
                <div class="">
                    <div class="row">
                        <button id="menu-alt-open" class="texto-accesibilidad texto-accesibilidad-plus">
                            <i class="fas fa-child" aria-hidden="true" />
                        </button>
                    </div>

                    <div id="accesibilidad-alt">
                        <div class="row">
                            <button id="btnDislexia" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-italic" aria-hidden="true" />
                                <span>Cambio de tipografia dislexia.</span><i class=""></i>
                            </button>
                        </div>

                        <div class="row">
                            <button id="btnEv" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-text-height" aria-hidden="true" />
                                <span>Espaciado vertical.</span><i class=""></i>
                            </button>
                        </div>

                        <div class="row">
                            <button id="btnEh" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-text-width" aria-hidden="true" />
                                <span>Espaciado Horizontal.</span><i class=""></i>
                            </button>
                        </div>
                        <div class="row" >
                            <button id="btn-increase" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <b>A+</b>
                                <span>Aumentar tamaño de fuente.</span>
                            </button>
                        </div>
                        <div class="row" >
                            <button id="btn-orig" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <b>A</b>
                                <span>Restaurar tamaño de fuente.</span>
                            </button>
                        </div>
                        <div class="row">
                            <button id="btn-decrease" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <b>Aa-</b>
                                <span>Reducir tamaño de fuente.</span>
                            </button>
                        </div>
                        <div class="row">
                            <button id="btnEgrises" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-adjust" aria-hidden="true" />
                                <span>Escala de grises.</span>
                            </button>
                        </div>
                        <div class="row">
                            <button id="btnLpantalla" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-assistive-listening-systems" aria-hidden="true" />
                                <span>Lector de pantalla.</span>
                            </button>
                        </div>
                        <div class="row">
                            <button id="btnApuntero" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-mouse-pointer" aria-hidden="true" />
                                <span>Aumentar tamaño de puntero.</span>
                            </button>
                        </div>
                        <div class="row">
                            <button id="btnCcontraste" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-palette InvertContrast" aria-hidden="true" />
                                <span>Invertir colores.</span>
                            </button>
                        </div>
                        <div class="row">
                            <button id="btnMlectura" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-grip-lines" aria-hidden="true" />
                                <span>Mascara de lectura.</span>
                            </button>
                        </div>
                        <div class="row">
                            <button id="btnGlectura" class="texto-accesibilidad texto-accesibilidad-plus tip">
                                <i class="fas fa-low-vision" aria-hidden="true" />
                                <span>Guía de lectura.</span>
                            </button>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}