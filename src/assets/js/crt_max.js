import $ from 'jquery';
$(document).ready(function () {

    $(document).on('keyup', ".numonly", function (e) {
        
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
        
    });

    $(document).on('keyup', "[maxlength]", function (e) {
        
        var este = $(this);
        var maxlength = este.attr('maxlength');
        var maxlengthint = parseInt(maxlength);
        var textoActual = este.val();
        var currentCharacters = este.val().length;

        var remainingCharacters = maxlengthint - currentCharacters;
           var espan = este.prev('label').find('span');
            var label = este.prev('label');
        // Detectamos si es IE9 y si hemos llegado al final, convertir el -1 en 0 - bug ie9 porq. no coge directamente el atributo 'maxlength' de HTML5
        if (document.addEventListener && !window.requestAnimationFrame) {
            if (remainingCharacters <= -1) {
                remainingCharacters = 0;
            }
        }
        espan.html(remainingCharacters);
        if (!!maxlength) {
            var texto = este.val();
            if (texto.length >= maxlength) {
                e.preventDefault();

            } else if (texto.length < maxlength) {
                
                if(texto.length > maxlength-10){
                    espan.css("color","#ca3d3d");
                    label.css("color","#ca3d3d");
                }else{
                    espan.css("color","#000");
                    label.css("color","#000");
                }
            }
        }
    });
});

