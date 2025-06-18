import $, { each } from 'jquery';
import { Link } from "react-router-dom";
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'
import { useEffect } from 'react';
const out = () => {
    $(".navbar").remove();
    $(".main-footer").remove();

    $("#slideshow-container").remove();
    $("body").removeClass("Inicio");
    localStorage.clear();
    window.location.href = "/int/#/";

}
const inicio = () => {
    window.location.href = "/int/#/inicio";
}

function Materiales(props) {
    var is_restrict = "";
    const isLogged = localStorage.getItem('credenciales');
    useEffect(() => {


        var Permisos = [];
        var Modulos = [];
        var user = JSON.parse(localStorage.getItem('credenciales'));

        var user = JSON.parse(localStorage.getItem('credenciales'));
        $.each(user, function (key, val) {
            $("#usr").text(val.nombre);
        });

        $.each(user, function (key, val) {
            Permisos = val.permisos.split(",");
            Modulos = val.modulos.split(",");
        });

        for (var i = 0; i < Modulos.length; i++) {
            if (Permisos.toString().match(Modulos[i])) {

            } else {
                $("#" + Modulos[i]).remove();
                if (Modulos[i] == "adms-mat") {
                    is_restrict = "SI";
                }

            }

        }
    });


    return (
        <div className="Inicio">
            <header>


                <Accesibilidad />
                <GaleriaHeader />




                <div id="cont" class="container">
                    <p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>
                    <ol class="breadcrumb">
                        <li><a href=""><i class="icon icon-home"></i></a></li>
                        <li class="enlace" onClick={inicio}>Inicio</li>
                        <li class="active"><Link class="nav-link">Recursos materiales</Link></li>
                    </ol>

                    <div>
                        <div class="row">

                            <div id="rpt-acceso" class="col-md-4 bottom-buffer">
                                <a href='https://sistemaintegral.conavi.gob.mx:81/int/#/CtrlAcceso'>
                                    <div class="card">
                                        <img class="sac" />
                                        <p class="card-tittle red">Reporte de solicitud de acceso</p>

                                    </div>
                                </a>
                            </div>

                            <div id="rpt-vehiculo" class="col-md-4 bottom-buffer">
                                <a href='https://sistemaintegral.conavi.gob.mx:81/int/#/CtrlVehicular'>
                                    <div class="card">
                                        <img class="shv" />
                                        <p class="card-tittle red">Reporte de solicitud de vehículo</p>

                                    </div>
                                </a>
                            </div>

                            <div id="rpt-salas" class="col-md-4 bottom-buffer">
                            <a href='https://sistemaintegral.conavi.gob.mx:81/api/rep_materiales/sp_get_BSalas' target={"_blank"}>
                                <div class="card">
                                    <img class="ba" />
                                    <p class="card-tittle red">Reporte de reserva de salas</p>

                                </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="colofon red-text text-center">
                    <div class="row row-fixed">
                        <div class="col-lg-12 my-auto showcase-text">
                            <p class="lead mb-0">
                                Av. H. Escuela Naval Militar, Coapa, Presidentes Ejidales 1ª Sección, Ciudad de México. C.P. 04470<br></br>Teléfono: 55.91.38.99.91<br></br>Opción 1<br></br>atencionciudadana@conavi.gob.mx
                            </p>
                        </div>
                    </div>
                </div>

            </header>
        </div>

    );
}

export default Materiales;