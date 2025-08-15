import $, { each, valHooks } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'
import { useEffect } from 'react';
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


const visita = (email) => {
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nueva_visita_ingsu', {

		email: email,

	}).then(
		(response) => {

		},

	).catch(
		(err) => {
			//console.log(err)
		});
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

	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/info_sistemas", function (data) {
		//console.log(data);
		$.each(data, function (key, val_) {
			if (val_.grupo == "link") {
				$("#cont-files").append(

					'<a href="https://sistemaintegral.conavi.gob.mx:81/int/sistemas/' + val_.ruta + '" target="_blank"><div class="col-md-3 top-buffer-x15">' +
					'<div class="card">' +
					val_.ic +
					'<p>' + val_.descripcion + '</p>' +
					'</div>' +
					'</div> </a>'

				)
			} else if(val_.grupo == "MIN") {
				$("#cont-mins").append(
					
					'<div class="col-md-3" >' +
					'<div class="min-container" >' +
					
					'<a href="' + val_.ruta + '" target="_blank"><img class="mins" src="' + val_.ic + '"></img></a>' +
					'</div>'+
					'</div>'
				)
			} else {
				$("#cont-docs").append(
					
					'<a href="https://sistemaintegral.conavi.gob.mx:81/int/sistemas/' + val_.ruta + '" target="_blank"><div class="col-md-3 top-buffer-x15">' +
					'<div class="card">' +
					val_.ic +
					'<p>' + val_.descripcion + '</p>' +
					'</div>' +
					'</div> </a>'
				)
			}
		});
	});
}

function Sistemas(props) {

	useEffect(() => {
		const user = getUserCredenciales();
   		 if (!user) {
    		  window.location.href = "/int/#/";
    		  return;
  			  }

		visita($("#usr").text());
		let el = document.getElementById("bread");
		el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

		var is_restrict = "";
	//	const isLogged = localStorage.getItem('credenciales');

		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_visitas_igsu", function (data) {

			var items = [];

			$.each(data, function (key, val) {
				var num = val.visitas;
				$("#visitas").text(Number(num).toLocaleString('en'));

			});

		});



		if (!user) {

			out();

		} else if (user) {
			consultar()
			load();
		}

	});

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
						<li class="active"><Link class="nav-link">Sistemas</Link></li>
					</ol>

					<div class="flotante" style={{ right: 0, zIndex: 20 }}>
						<div class="stat">
							<span id="visitas" class="stat-count"><i class="fas fa-spinner fa-spin"></i></span>
							<p class="stat-detail">Visitantes</p>
						</div>
					</div>

					<div class="row top-buffer">
						<h2>Documentos</h2>
						<hr class="red"></hr>
					</div>
					<div id="cont-docs" class="row text-center top-buffer">

					</div>

					<div class="row top-buffer">
						<h2>Infografías</h2>
						<hr class="red"></hr>
					</div>
					<div id="cont-mins" class="row top-buffer">

					</div>

					<div class="row top-buffer">
						<h2>Formatos</h2>
						<hr class="red"></hr>
					</div>
					<div id="cont-files" class="row text-center top-buffer">

					</div>
					<div class="row top-buffer">
						<div class="col-md-12">
							<div>
								<h10>Proceso de Solicitud de Nuevo Desarrollo o Modificación</h10>
								<hr class="red"></hr>
							</div>
							<video style={{ width: "100%", marginTop: 20 }} playsinline="playsinline" loop="loop" controls>
								<source src='../int/Sistemas/Proceso de Solicitud de Nuevo Desarrollo o Modificación.mp4' type="video/mp4" />
							</video>
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

export default Sistemas;