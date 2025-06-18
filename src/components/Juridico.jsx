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





import { Redirect, Link, useHistory } from "react-router-dom";
import Inicio from './Inicio.jsx';
let modulo = "Juridico";
let val = 0;

const scroll = (id) => {
	try {
		let el = document.getElementById(id);
		el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
	} catch (e) { }
}

const scrollTop = (id) => {
	try {
		let el = document.getElementById(id);
		el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
	} catch (e) { }
}



const timeLine = () => {

	if (modulo == "Juridico") {
		if (val != 1) {

			$('#to_top').hide(0);
			$('#buscar').hide(0);

			$(window).scroll(function () {
				var windowHeight = $(window).scrollTop();
				var contenido2 = $("#timeline").offset();
				contenido2 = contenido2.top;

				var contenido3 = $(".colofon").offset();
				contenido3 = contenido3.top;

				//console.log(windowHeight + " " + contenido2 + " " + contenido3)

				if (windowHeight >= contenido2 && windowHeight <= contenido3 - 270) {
					$('#to_top').fadeIn(500);
					$('#buscar').fadeIn(500);
				} else {
					$('#to_top').fadeOut(500);
					$('#buscar').fadeOut(500);
				}

			});
		}
		var current_year = "";
		var direction = "l";
		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/JGjuridico", function (data) {
			$.each(data, function (key, val) {
				//console.log(data)

				switch (direction) {
					case "l": direction = "r";
						break;

					case "r": direction = "l";
						break;
				}

				var element =
					'<li id="element_time">' +
					'<div id="' + val.fecha_acuerdo.toString().substring(0, 4) + '" class="direction-' + direction + '">' +
					'<div class="flag-wrapper">' +
					'<span class="hexa"></span>' +
					'<span class="flag">' + val.sesion + '</span>' +
					'<span class="time-wrapper">' +
					'<span  class="time">' + val.fecha_acuerdo.toString().substring(0, 10) + '</span>' +
					'</span>' +
					'</div>' +
					'<div style="text-align:left !important" class="desc">' + val.acuerdos +
					'</div>' +
					'</div>' +
					'</li>';
				$("#timeline").append(element)
				if (val.fecha_acuerdo.toString().substring(0, 4) == current_year) {
					current_year = val.fecha_acuerdo.toString().substring(0, 4);
				} else {
					current_year = val.fecha_acuerdo.toString().substring(0, 4);
					<div id="fiscal" class="option-dropdown"></div>
					$("#fiscal").append('<div class="option-dropdown anio" anio="' + val.fecha_acuerdo.toString().substring(0, 4) + '"><p>' + val.fecha_acuerdo.toString().substring(0, 4) + '</p></div>');
				}
			});

		});
		val = 1;

		$(document).on("click", ".anio", function (e) {
			scrollTop($(this).attr("anio"));
		});


	}
}

const load = () => {
	timeLine();
	var refreshIntervalId = setInterval(() => {

		const script = document.createElement("script");
		script.id = "fmwk_gob";
		script.src = "https://framework-gb.cdn.gob.mx/gobmx.js";
		script.async = true;
		document.body.appendChild(script);

		var user = JSON.parse(localStorage.getItem('credenciales'));
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



function Juridico(props) {

	var is_restrict = "";
	const isLogged = localStorage.getItem('credenciales');

	var Permisos = [];
	var Modulos = [];
	var user = JSON.parse(localStorage.getItem('credenciales'));

	$.each(user, function (key, val) {
		Permisos = val.permisos.split(",");
		Modulos = val.modulos.split(",");
	});

	if (!isLogged) {
		out();
		return (
			<header></header>
		);
	} else if (isLogged) {
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
							<li class="active"><Link class="nav-link">Jurídico</Link></li>
						</ol>

						<h2 id="titulo">Línea del tiempo de juntas de gobierno</h2>
						<hr class="red bottom-buffer"></hr>


						<div id="to_top" class="flotante" style={{ right: 10, zIndex: 20 }}>
							<div class="enlace bottom-buffer">
								<i onClick={() => scroll("titulo")} style={{ fontSize: 25 }} class="fas fa-chevron-circle-up gold"></i>
							</div>
						</div>

						<div id="buscar" class="flotante-a" style={{ right: 10, zIndex: 20 }}>

							<div class="enlace bottom-buffer-x15  dropdown dropbtn" >
								<i style={{ fontSize: 25 }} class="fas fa-plus-circle gold" ></i>
								<div id="fiscal" class="dropdown-content">
								</div>
							</div>
						</div>



						<ul id="timeline" class="timeline">

						</ul>

					</div>



					<div class="colofon red-text text-center">
						<div class="row row-fixed">
							<div class="col-lg-12 my-auto showcase-text">
								<p class="lead mb-0">
									Av.H.Escuela Naval Militar, Coapa, Presidentes Ejidales 1ª Sección, Ciudad de México.C.P.04470<br></br>Teléfono: 55.91.38.99.91<br></br>Opción 1<br></br>atencionciudadana @conavi.gob.mx
								</p>
							</div>
						</div>
					</div>

				</header>
			</div>
		);

	}
}

export default Juridico;