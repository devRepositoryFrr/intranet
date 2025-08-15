import $, { each } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'
import { Link } from "react-router-dom";
import Axios from 'axios';
import Alerta from './Alerta';
import Alerta_ from '../assets/js/Alerta';
import { useEffect } from 'react';
import '../assets/css/checks.css'
import { getUserCredenciales } from '../utils/storage';

var email = "";
var is_restrict = "";
const user = getUserCredenciales();

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

const load = () => {
	var refreshIntervalId = setInterval(() => {

		const script = document.createElement("script");
		script.id = "fmwk_gob";
		script.src = "https://framework-gb.cdn.gob.mx/gobmx.js";
		script.async = true;
		document.body.appendChild(script);
		//let user = JSON.parse(localStorage.getItem('credenciales'));

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

const consultar = () => {
//	var user_ = JSON.parse(localStorage.getItem('credenciales'));
	console.log()
	let pr = user[0].permisos;
	var del = '';
	if (pr.match("adms-delpos")) {
		del = "1"
	}
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_candidatos", function (data) {


		$.each(data, function (key, val_) {
			console.log(val_)
			let _del_ = "";
			if (del == "1") {
				_del_ = '<i id="' + val_.id + '" style="float: right" class="adms-delpos drop red fa fa-solid fa-trash"></i>';
			}
			$("#cont-files").append(
				'<div id="drop_' + val_.id + '" class="col-md-4 top-buffer-x15">' +
				'<div class="card" style="height:180px">' +
				'<a href="https://sistemaintegral.conavi.gob.mx:81/int/candidatos/' + val_.path + '.pdf" target="_blank">' +
				'<div>' +
				'<i class="gold ic fas fa-file-pdf"></i>' +
				'<p><small>' + val_.nombre + '</small></p>' +
				'<p><small>' + val_.escolaridad + '</small></p>' +
				'</div>' +
				'</a>' +
				_del_ +
				'</div>' +
				'</div>' +
				'</a>'

			)


		});
	});
}

function VisorCV(props) {
	useEffect(() => {
		const user = getUserCredenciales();
  		  if (!user) {
    	  window.location.href = "/int/#/";
   	   return;
   		 }
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

				$("." + Modulos[i]).remove();
				if (Modulos[i] == "adms-vpost") {
					inicio();
				}


			}

		}

		if (is_restrict == "SI") {
			out();
		}
		if (!user) {
			out();
		} else if (user) {
			load();
		}

		$('body').on('click', '.drop', function (e) {
			var _id_ = $(this).attr("id");

			$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/baja_candidato/" + $(this).attr("id"), function (data) {

				if (data[0].res == "ok") {

					$("#drop_" + _id_).remove();
				} else {
					Alerta_("<p class='p-center' style='z-index:999999'>ocurrió un error <strong>al recibir tu evaluación</strong> </p>", "alertaOp alert alert-danger");
				}


			});


		});

		consultar();
	});

	return (
		<div className="Inicio">
			<header>

				<div id="loading" class="loading">
					<i class="gold fa fa-spin fa-bahai loading-icon"> </i>
				</div>

				<Alerta />
				<GaleriaHeader />




				<div id="cont" class="container">
					<p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>
					<ol id="bread" class="breadcrumb">
						<li><a href=""><i class="icon icon-home"></i></a></li>
						<li class="enlace" onClick={inicio}>Inicio</li>
						<li class="active"><Link class="nav-link">Visor de candidatos</Link></li>
					</ol>
					<div id="cont-files">

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


export default VisorCV;