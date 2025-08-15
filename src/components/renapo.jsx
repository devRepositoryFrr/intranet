import $, { each } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'

import Axios from 'axios';
import Alerta from './Alerta';
import '../assets/css/scroll.css';
import '../assets/css/navbar.css';
import '../assets/css/modal.css';
import '../assets/css/content.css';
import '../assets/css/notificacion.css';
import '../assets/css/listas.css';
import '../assets/css/datepicker.css';
import '../assets/css/emergente.css';
import '../assets/js/jquery.serializeToJSON'
import Alerta_ from '../assets/js/Alerta.js';
import { getUserCredenciales } from '../utils/storage';





import { Redirect, Link, useHistory } from "react-router-dom";
import Inicio from './Inicio.jsx';
let modulo = "Galeria";
let val = 0;
const user = getUserCredenciales();
    if (!user) {
      window.location.href = "/int/#/";
          }




const load = () => {
	var refreshIntervalId = setInterval(() => {

		const script = document.createElement("script");
		script.id = "fmwk_gob";
		script.src = "https://framework-gb.cdn.gob.mx/gobmx.js";
		script.async = true;
		document.body.appendChild(script);

		//var user = JSON.parse(localStorage.getItem('credenciales'));
		$.each(user, function (key, val) {
			$("#usr").text(val.nombre);
		});
		if ($('#navbarMainCollapse').length != 0) {
			clearInterval(refreshIntervalId);
			$("#fmwk_gob").remove();
		} else {
			$("#fmwk_gob").remove();
		}
		$(".loading").addClass("hidden");
	}, 400);

	setInterval(() => {

	}, 1500);

	$("html, body").removeClass("gbColor");
	$("body").addClass("Inicio");


}

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

const consultar = () => {

	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ObtenerCurps", function (data) {
		//console.log(data);
		$.each(data, function (key, val_) {

			$.get("http://187.217.48.11:8080/renapo/consultaCURP?c=" + val_.curp, function (respuesta) {

				//$.each(respuesta, function (key, val) {
				//console.log("respuesta" + respuesta.nombres)
				//$("#resultado").append("<tr><td>" + respuesta.curp + "</td><td>" + respuesta.nombres + " " + respuesta.apellido1 + " " + respuesta.apellido2 + "</td><td>" + respuesta.fechNac + "</td><td>" + respuesta.sexo + "</td></tr>")
				submitInsert(respuesta.curp, respuesta.nombres + " " + respuesta.apellido1 + " " + respuesta.apellido2, respuesta.fechNac, respuesta.sexo)

				//});

			});
		});
	});

}


const submitInsert = (curp, nombre, fecha, genero) => {



	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/curp_consultada', {

		curp: curp, nombre: nombre, fecha: fecha, genero: genero

	}).then(
		(response) => {
			if (response.data != "") {

			} else {

			}
		},
	).catch(
		(err) => {
			//console.log(err)
		});




}

function Renapo(props) {

	var is_restrict = "";
	//const isLogged = localStorage.getItem('credenciales');

	var Permisos = [];
	var Modulos = [];
	//var user = JSON.parse(localStorage.getItem('credenciales'));

	$.each(user, function (key, val) {
		Permisos = val.permisos.split(",");
		Modulos = val.modulos.split(",");
	});

	for (var i = 0; i < Modulos.length; i++) {
		if (Permisos.toString().match(Modulos[i])) {

		} else {

			if (Modulos[i] == "adms-doc") {
				is_restrict = "SI";
			}

		}

	}

	if (!user) {

		out();
		return (
			<header></header>
		);
	} else if (user) {
		load();

		return (
			<div className="Inicio">
				<header>

					<div class="loading">
						<i class="gold fa fa-spin fa-bahai loading-icon"> </i>
					</div>
					<Accesibilidad />
					<Alerta />
					<GaleriaHeader />




					<div id="cont" class="container">
						<p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>
						<ol id="bread" class="breadcrumb">
							<li><a href=""><i class="icon icon-home"></i></a></li>
							<li class="enlace" onClick={inicio}>Inicio</li>
							<li class="active"><Link class="nav-link">Galería</Link></li>
						</ol>


						<div>
							<table id="resultado">

							</table>
							<div id="galeria" class="row container" style={{ margin: 0 }}>
								<button class="btn btn-primary" onClick={consultar}>consultar</button>
							</div>


						</div>

						<div style={{ textAlign: "center" }}>

                                   <i class="fas fa-user-tie  top-buffer"></i>
                                   <h4>REPRESENTANTE LEGAL</h4>
                                   <p>Legal</p>

                                   <i class="fas fa-map-marker-alt  top-buffer"></i>
                                   <h4>DOMICILIO FISCAL</h4>
                                   <p>Dirección</p>

                                   <div class="row top-buffer">
                                        <div class="col-md-6">
                                             <i class="fas fa-users"></i>
                                             <h6>CAPACIDAD TÉCNICA</h6>
                                             <p>500</p>
                                        </div>
                                        <div class="col-md-6">
                                             <i class="fas fa-home"></i>
                                             <h6>AVANCE DE OBRA</h6>
                                             <p>200/1500</p>
                                        </div>
                                   </div>
                                   <i class="fas fa-exclamation-circle  top-buffer"></i>
                                   <h4>SANCIONES</h4>
                                   <div class="row">
                                        <div class="col-md-1">
                                        </div>
                                        <div class="col-md-2">
                                             <h6>AT</h6>
                                             <p>0</p>
                                        </div>
                                        <div class="col-md-2">
                                             <h6>OEO</h6>
                                             <p>0</p>
                                        </div>
                                        <div class="col-md-2">
                                             <h6>OEOP</h6>
                                             <p>0</p>
                                        </div>
                                        <div class="col-md-2">
                                             <h6>VO</h6>
                                             <p>0</p>
                                        </div>
                                        <div class="col-md-2">
                                             <h6>SUP</h6>
                                             <p>0</p>
                                        </div>
                                        <div class="col-md-1">
                                        </div>
                                   </div>
                                   <i class="fas fa-credit-card top-buffer"></i>
                                   <h4>DATOS BANCARIOS</h4>
                                   <div class="row">
                                        <div class="col-md-6">
                                             <i class="fas fa-university"></i>
                                             <h6>BANCO</h6>
                                             <p>BBVA</p>
                                        </div>
                                        <div class="col-md-6">
                                             <i class="fas fa-globe"></i>
                                             <h6>CUENTA CLABE</h6>
                                             <p>XXXXXXXXXXXXXXXX</p>
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
}

export default Renapo;