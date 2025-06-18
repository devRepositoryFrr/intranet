import $ from 'jquery';

export default function Alerta_(mensaje, clase) {

    $("#alerta").html(mensaje);
    $("#alerta").attr("class", clase);

    $("#alerta").show();
    setTimeout(function () {

        $("#alerta").fadeOut(1500);
    }, 3000);


};

