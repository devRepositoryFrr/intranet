import $ from 'jquery';



$(document).ready(function() {


    $("#accesibilidad-alt").animate({
        'opacity': '0',
        'margin-left': '-100'
    }, 500);

    var $affectedElements = $("p, h1, h2, h3, h4, h5, h6, input, span, a, li");
    let guia_lectura = 0;
    let mascara_lectura = 0;
    let escala_grises = 0;
    let invertir_color = 0;
    let puntero_x1 = 0;
    let lector_pantalla = 0;
    let alt_accesibilidad = 0;
    let dislexia = 0;
    let hi = 0;

    var msg = new SpeechSynthesisUtterance();
    var voices;
    var synth = window.speechSynthesis;
    window.speechSynthesis.onvoiceschanged = function() {
        voices = window.speechSynthesis.getVoices();
    };

    function mensaje() {

        $("nav").attr("id", "navbar");
        $('#menu-accesibilidad').prependTo('#navbar');
        $("#menu-alt-open").animate({
            'opacity': '1'

        }, 500);
    }

    setTimeout(mensaje, 1000);

    /*-----------------------------------------------------------------LANZAR ACCESIBILIDAD ALT----------------------------------------------*/

    $("#menu-alt-open").click(function() {

        if (alt_accesibilidad === 0) {
            alt_accesibilidad = 1;

            $("#accesibilidad-alt").animate({
                'opacity': '1',
                'margin-left': '0'
            }, 500);
        } else {
            alt_accesibilidad = 0;

            $("#accesibilidad-alt").animate({
                'opacity': '0',
                'margin-left': '-100'
            }, 500);
        }

    });





    /*-----------------------------------------------------------------LANZAR ACCESIBILIDAD--------------------------------------------------*/

    $("#btnEgrises").click(function() {
        if (escala_grises === 0) {
            escala_grises = 1;
            $("body").addClass("escala-grises");
            $("#btnEgrises").css("background", "#7A1B33");
            $("#btnEgrises").css("color", "#fff");
        } else {
            escala_grises = 0;
            $("body").removeClass("escala-grises");
            $("#btnEgrises").css("background", "#fff");
            $("#btnEgrises").css("color", "#000");
        }

    });

    $("#btnLpantalla").click(function() {
        if (lector_pantalla === 0) {
            lector_pantalla = 1;

            $("#btnLpantalla").css("background", "#7A1B33");
            $("#btnLpantalla").css("color", "#fff");
        } else {
            lector_pantalla = 0;
            synth.cancel();
            $("#btnLpantalla").css("background", "#fff");
            $("#btnLpantalla").css("color", "#000");
        }

    });

    $("#btnApuntero").click(function() {
        if (puntero_x1 === 0) {
            puntero_x1 = 1;
            $("body").addClass("cursor-xl");
            $("#btnApuntero").css("background", "#7A1B33");
            $("#btnApuntero").css("color", "#fff");
        } else {
            puntero_x1 = 0;
            $("body").removeClass("cursor-xl");
            $("#btnApuntero").css("background", "#fff");
            $("#btnApuntero").css("color", "#000");
        }

    });

    $("#btnCcontraste").click(function() {
        if (invertir_color === 0) {
            invertir_color = 1;
            $("body").addClass("negativo");
            $("#btnCcontraste").css("background", "#7A1B33");
            $("#btnCcontraste").css("color", "#fff");
        } else {
            invertir_color = 0;
            $("body").removeClass("negativo");
            $("#btnCcontraste").css("background", "#fff");
            $("#btnCcontraste").css("color", "#000");
        }
    });

    $("#btnMlectura").click(function() {
        if (mascara_lectura === 0) {
            mascara_lectura = 1;
            $('body').css('background', '#919191');
            $("#btnMlectura").css("background", "#7A1B33");
            $("#mascara-lectura").show();
            $("#mascara-lectura-top").show();
            $("#mascara-lectura-bottom").show();
            $("#btnMlectura").css("color", "#fff");
        } else {
            mascara_lectura = 0;
            $('body').css('background', '#fff');
            $("#btnMlectura").css("background", "#fff");
            $("#mascara-lectura").hide();
            $("#mascara-lectura-top").hide();
            $("#mascara-lectura-bottom").hide();
            $("#btnMlectura").css("color", "#000");
        }

    });

    $("#btnGlectura").click(function() {
        if (guia_lectura === 0) {
            guia_lectura = 1;

            $("#btnGlectura").css("background", "#7A1B33");
            $("#btnGlectura").css("color", "#fff");
            $("#guia-lectura").show();
        } else {

            guia_lectura = 0;
            $("#btnGlectura").css("background", "#fff");
            $("#btnGlectura").css("color", "#000");
            $("#guia-lectura").hide();
        }

    });

    $("#btnDislexia").click(function() {
        if (dislexia === 0) {
            dislexia = 1;
            $("body").addClass("dislexia");
            $("#btnDislexia").css("background", "#7A1B33");
            $("#btnDislexia").css("color", "#fff");
        } else {
            dislexia = 0;
            $("body").removeClass("dislexia");
            $("#btnDislexia").css("background", "#fff");
            $("#btnDislexia").css("color", "#000");
        }

    });

    /*-----------------------------------------------------------------GUIA DE LECTURA-------------------------------------------------------*/

    $("body").on('mousemove', function(e) {
        if (guia_lectura === 1) {
            $('#guia-lectura').css({
                top: e.pageY + 10
            });
        }
    });

    /*-----------------------------------------------------------------MASCARA DE LECTURA----------------------------------------------------*/
    $("body").on('mousemove', function(e) {
        if (mascara_lectura === 1) {

            $('#mascara-lectura').css({
                top: e.pageY - 60
            });

            $('#mascara-lectura-top').css({
                top: e.pageY - 60
            });

            $('#mascara-lectura-bottom').css({
                top: e.pageY + 60
            });

        }
    });

    /*-----------------------------------------------------------------LECTOR DE PANTALLA----------------------------------------------------*/


    $(document).on({
        mouseenter: function() {
            if (lector_pantalla === 1) {
                speak($(this).text());
            }
        }

    }, "p, h1, h2, h3, h4, h5, h6, input, span, a, li"); //pass the element as an argument to .on



    function speak(text) {
        synth.cancel();

        msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.lang = 'es-ES';
        synth.speak(msg);


    }

    /*-----------------------------------------------------------------TAMAÑO DE TEXTO-------------------------------------------------------*/




    $affectedElements.each(function() {
        var $this = $(this);
        $this.data("orig-size", $this.css("font-size"));
    });

    $("#btn-increase").click(function() {
        if (changeFontSize(1) === 30) {
            changeFontSize(-1);
        } else {

        }
    });

    $("#btn-decrease").click(function() {
        if (changeFontSize(-1) === 10) {
            changeFontSize(1);
        } else {

        }
    });

    $("#btn-orig").click(function() {
        $affectedElements.each(function() {
            var $this = $(this);
            $this.css("font-size", $this.data("orig-size"));
        });
    });

    function changeFontSize(direction) {
        var tamano;
        $affectedElements.each(function() {
            var $this = $(this);
            tamano = parseInt($this.css("font-size").toString().replace("px", ""));

            //console.log(tamano);
            $this.css("font-size", parseInt($this.css("font-size")) + direction);


        });
        return tamano;
    }


    /*------------------------------------------------------------------ESPACIO HORIZONTAL---------------------------------------------------*/

    $("#btnEh").click(function() {
        if (hi == 0) {
            changeSpaceH(5);
            hi++;
        } else if (hi == 1) {
            changeSpaceH(8);
            hi++;

        } else if (hi == 2) {
            changeSpaceH(10);
            hi++;

        } else if (hi == 3) {
            changeSpaceH(0);
            hi = 0;
        }

    });

    function changeSpaceH(spacing) {
        var tamano;
        $affectedElements.each(function() {
            var $this = $(this);
            $this.css("letter-spacing", spacing);
        });
        return tamano;
    }

    /*------------------------------------------------------------------ESPACIO VERTICAL-----------------------------------------------------*/

    $("#btnEv").click(function() {
        if (hi == 0) {
            changeSpaceV("200%");
            hi++;
        } else if (hi == 1) {
            changeSpaceV("300%");
            hi++;

        } else if (hi == 2) {
            changeSpaceV("400%");
            hi++;

        } else if (hi == 3) {
            changeSpaceV("inherit");
            hi = 0;
        }

    });

    function changeSpaceV(spacing) {
        var tamano;
        $affectedElements.each(function() {
            var $this = $(this);
            $this.css("line-height", spacing);
        });
        return tamano;
    }
});