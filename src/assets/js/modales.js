import $ from 'jquery';
import { disabled_button, enabled_button } from './botones'

$(document).ready(function () {
/*

    $("#open-snam").click(function () {
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-snam").css("display", "block");
        
    });

    $("#add-ntf").click(function () {
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-ntf").css("display", "block");

    });

    $("#add-bt").click(function () {
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-bt").css("display", "block");

        var user = JSON.parse(localStorage.getItem('credenciales'));
        $("#cboUsuario").append("<option value='" + user[0].email + "'>" + user[0].nombre + "</option>");


    });

    $("#add-lb").click(function () {
        obtenerReservaciones();
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-lb").css("display", "block");
    });

    $("#add-ntf").click(function () {
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-ntf").css("display", "block");

    });

    $("#open-nt").click(function () {
        obtenerTitulosNt();
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-nt").css("display", "block");
        
    });

    $("#open-ce").click(function () {
        obtenerTitulosCe();
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-ce").css("display", "block");
        
    });

    $("#open-pl").click(function () {
        obtenerTitulosPl();
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-pl").css("display", "block");
        
    });


    $(".option-dropdown-dt").click(function () {

        $(".list-item").remove();
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-dt").css("display", "block");
        obtenerDirectorio($(this).attr("id"));
    });

    $(".sp1").click(function () {

        var user = JSON.parse(localStorage.getItem('credenciales'));
        disabled_button("btnGuardar-sp");
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-sp").css("display", "block");

        $.each(user[0], function (key, value) {
            $("#soporte_txt" + key).text(value);
        });

        obtenerTipoSoporte();
    });

    $(".sp2").click(function () {
        obtenerStatusTicket();
        $("#modal").css("display", "block");
        $('html').css("overflow", "hidden");
        $("#content-spV").css("display", "block");

    });

   
    function obtenerReservaciones() {

        var user = JSON.parse(localStorage.getItem('credenciales'));

        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_reservaciones/" + user[0].email, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                items.push("<div style='padding:10px; text-align:'center'' class='list-lb'><div class='hidden' id='dv" + val.id + "'><i id='a" + val.id + "' class='fas fa-check-circle conf box'></i><i id='c" + val.id + "' class='fas fa-times-circle  canc box'></i></div><i id='d" + val.id + "'  class='fas fa-minus-circle  del '></i>" + val.detalle + "</div>");
            });
            $(".list-lb").remove();
            $(".lb-list").append(items);
            $('#lb-counter').text(items.length);
        });

    }

    function obtenerDirectorio(tipo) {


        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_directorio/" + tipo, function (data) {

            var items = [];

            $.each(data, function (key, val) {

                items.push(
                    "<li id='dt" + key + "' class='list-item'> " +
                    "<div style={{}}> " +
                    "<img class='list-item-image " + val.genero + "' /> " +
                    "</div> " +
                    "<div class='list-item-content'> " +
                    "<h4 class='h4'>" + val.nombre + "</h4> " +
                    "<p class='p'>" + val.identi + "</p> " +
                    "<div class='hidden box-dt list-detail'> " +
                    "<p id='ext' class='p ln'><strong>Ext.: </strong>" + val.extension + "</p> " +
                    "<p id='area' class='p ln'><strong>Área: </strong> " + val.area + "</p> " +
                    "<p id='cargo' class='p ln'><strong>Cargo: </strong> " + val.puesto + "</p> " +
                    "<p id='mail' class='p ln'><strong>E-mail: </strong> " + val.email + "</p> " +
                    "</div> " +
                    "</div> " +
                    "</li> ");

            });

            $(".list-item").remove();
            $(".list-dt").append(items);
            $('#dt-counter').text(items.length);


        });

    }

    function obtenerTipoSoporte() {
        $(".tipoSoporte").remove();
        var items = [];
        $("#soporte_cbotipo").append("<option class='tipoSoporte' value='0'>--Selecciona--</option>");
        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/tipo_soporte", function (data) {
            $.each(data, function (key, val) {
                $("#soporte_cbotipo").append("<option class='tipoSoporte' value='" + val.id + "'>" + val.descripcion + "</option>");

            });
        });

    }

    function obtenerStatusTicket() {
        var user = JSON.parse(localStorage.getItem('credenciales'));

        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_tickets/" + user[0].email, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                var icon = "";
                switch (val.id_status) {
                    case "P":
                        icon = "fas fa-history"
                        break;
                    case "A":
                        icon = "fas fa-sync-alt"
                        break;
                    case "C":
                        icon = "fas fa-check-double"
                        break;
                    case "R":
                        icon="fas fa-times"
                }
                items.push(
                    "<li id='spv" + key + "' class='list-item'> " +
                    "<div class='stat-" + val.id_status + "'> " +
                    "<i style='width:64px;height:64px;;font-size: 30px;color: #fff;margin-top: 17px;' class='"+icon+"'></i>"+
                    "</div> " +
                    "<div class='list-item-content'> " +
                    "<h4 class='h4'>" + val.id_soporte + "</h4> " +
                    "<p class='p'>" + val.fecha + "</p> " +
                    "<div class='hidden box-dt list-detail'> " +
                    "<p id='descripcion' class='p ln'><strong>Status: </strong>" + val.status + "</p> " +
                    "<p id='descripcion' class='p ln'><strong>Asignado a: </strong>" + val.asignacion + "</p> " +
                    "<p id='descripcion' class='p ln'><strong>Descripcion del problema: </strong>" + val.descripcion + "</p> " +
                    "<p id='descripcion' class='p ln'><strong>Fecha de cierre: </strong>" + val.fecha_cierre + "</p> " +
                    "</div> " +
                    "</div> " +
                    "</li> ");
            });
            $(".list-item").remove();
            $(".list-spv").append(items);
            $('#spV-counter').text(items.length);
        });

    }

    function obtenerTitulosNt() {
        $(".enlace-nt").remove();
        $(".t-nt").remove();
        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_nt/T", function (data) {
            var items = [];
            $.each(data, function (key, val) {
                items.push(
                    "<li class='t-nt titulos-nt"+val.id_bloque+"'><input type='checkbox' name='list' id='nt-title-"+val.id_bloque+"' /><label for='nt-title-"+val.id_bloque+"'>"+val.descripcion+"</label><ul class='interior interior"+val.id_bloque+"'></ul></li>"
                    );
            });
           
            $("#menu").append(items);
            addEnlacesNt();
        });

    }

    function addEnlacesNt() {
        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_nt/L", function (data) {
            
            $.each(data, function (key, val) {
                if (val.subtitulo == "X") {
                    $(".interior"+val.id_bloque).append(
                        "<li id='nt-link-"+val.id+"'><strong>"+val.descripcion+"</strong></li>");
                } else {
                    $(".interior"+val.id_bloque).append(
                        "<li><a id='nt-link-"+val.id+"' class='enlace enlace-nt' href='../int/"+val.ubicacion+"' target='_blank'>"+val.descripcion+"</a></li>");    
                }
                
            });
           
          
            
        });

    }

    function obtenerTitulosCe() {
        $(".enlace-ce").remove();
        $(".t-ce").remove();
        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_ce/T", function (data) {
            var items = [];
            
            $.each(data, function (key, val) {
                items.push(
                    "<li class='t-ce titulos-ce"+val.id_bloque+"'><input type='checkbox' name='list' id='ce-title-"+val.id_bloque+"' /><label for='ce-title-"+val.id_bloque+"'>"+val.descripcion+"</label><ul class='interior interior"+val.id_bloque+"'></ul></li>"
                    );
            });
           
            $("#menu-ce").append(items);
            addEnlacesCe();
        });

    }

    function addEnlacesCe() {
        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_Ce/L", function (data) {
            
            $.each(data, function (key, val) {
                if (val.subtitulo == "X") {
                    $(".interior"+val.id_bloque).append(
                        "<li id='ce-link-"+val.id+"'><strong>"+val.descripcion+"</strong></li>");
                } else {
                    $(".interior"+val.id_bloque).append(
                        "<li><a id='ce-link-"+val.id+"' class='enlace enlace-ce' href='../int/"+val.ubicacion+"' target='_blank'>"+val.descripcion+"</a></li>");    
                }
                
            });
           
          
            
        });

    }

    function obtenerTitulosPl() {
        $(".enlace-pl").remove();
        $(".t-pl").remove();
        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_pl/T", function (data) {
            var items = [];
            
            $.each(data, function (key, val) {
                items.push(
                    "<li class='t-pl titulos-pl"+val.id_bloque+"'><input type='checkbox' name='list' id='pl-title-"+val.id_bloque+"' /><label for='pl-title-"+val.id_bloque+"'>"+val.descripcion+"</label><ul class='interior interior"+val.id_bloque+"'></ul></li>"
                    );
            });
           
            $("#menu-pl").append(items);
            addEnlacesPl();
        });

    }

    function addEnlacesPl() {
        $.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_pl/L", function (data) {
            
            $.each(data, function (key, val) {
                if (val.subtitulo == "X") {
                    $(".interior"+val.id_bloque).append(
                        "<li id='pl-link-"+val.id+"'><strong>"+val.descripcion+"</strong></li>");
                } else {
                    $(".interior"+val.id_bloque).append(
                        "<li><a id='pl-link-"+val.id+"' class='enlace enlace-pl' href='../int/"+val.ubicacion+"' target='_blank'>"+val.descripcion+"</a></li>");    
                }
                
            });
           
          
            
        });

    }


   
*/
});