import $ from 'jquery';
import Alert_ from './Alerta.js';
import Axios from 'axios';

$(document).ready(function() {

    function submitUpdate(id, element) {
        var do_ = false;
        Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/liberar_reservacion', {

            dbId: id,


        }).then(
            (response) => {
                if (response.data != "") {
                    $('#' + element).parent().parent().
                    animate({
                        'opacity': '0',
                        'margin-left': '-50%',
                    }, 500);

                    setTimeout(function() { $('#' + element).parent().parent().remove(); }, 500);
                    var counter = $('#lb-counter').text();
                    $('#lb-counter').text(counter - 1);
                    new Alert_("¡<strong>Se eliminó la reservación</strong> de esta sala con éxito!", "alertaOp alert alert-success alert-dismissible");
                    do_ = true;
                } else {
                    new Alert_("Usuario/contraseña <strong>incorrectos</strong>", "alertaOp alert alert-danger alert-dismissible");

                }
            },

        ).catch(
            (err) => {
                //console.log(err)
            });
        return do_;
    }

    $(document).on("click", ".del", function() {
        var element = $(this).attr('id');

        $('#' + element).addClass('disabled');
        $('#' + element).prop('disabled', true);
        $('#' + element).prev("div").toggleClass('hidden')
        setTimeout(function() {
            $('#' + element).prev("div").find(".box").toggleClass('active');
            $('#' + element).toggleClass('del-active');
        }, 100);

    });

    $(document).on("click", ".canc", function() {
        var element = $(this).attr('id');

       
        $('#' + element).parent().find(".box").toggleClass('active');
        $('#' + element).parent().next(".del").toggleClass('del-active');
        setTimeout(function() {
            $('#' + element).parent().toggleClass('hidden')
        }, 200);

        $('#' + element).parent().next(".del").removeClass('disabled');
        $('#' + element).parent().next(".del").prop('disabled', false);

    });


    $(document).on("click", ".conf", function() {
        var element = $(this).attr('id');

        submitUpdate(element.toString().replace("a", ""), element);
    });






});