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

const scroll = (id) => {
	try {
		let el = document.getElementById(id);
		el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
	} catch (e) { }


}


const adelante = () => {

	var adelante = parseInt($("#adelante").attr("pagina"));
	var atras = parseInt($("#atras").attr("pagina"));
	var elementos = parseInt($("#adelante").attr("elementos"));
	if (adelante < elementos) {

		$("#adelante").attr("pagina", adelante + 50);
		$("#atras").attr("pagina", atras + 50);

		for (var i = atras; i <= adelante; i++) {
			$("#img" + i).addClass("hidden");
		}

		for (var i = adelante + 50; i >= atras + 50; i--) {
			$("#img" + i).removeClass("hidden")

		}

		if ($("#atras").attr("pagina") != "1") {
			$("#atras").removeClass("hidden-btn");
		}
		if (adelante + 50 >= elementos) {
			$("#adelante").addClass("hidden-btn");
		}
		scroll("bread");
	}


}

const atras = () => {
	var adelante = parseInt($("#adelante").attr("pagina"));
	var atras = parseInt($("#atras").attr("pagina"));
	if (atras > 2) {
		$("#adelante").attr("pagina", adelante - 50);
		$("#atras").attr("pagina", atras - 50);
		$("#adelante").removeClass("hidden-btn");

		for (var i = adelante; i >= atras; i--) {
			$("#img" + i).addClass("hidden");

		}

		for (var i = atras; i >= atras - 50; i--) {
			$("#img" + i).removeClass("hidden");
		}

		scroll("bread");
	}

	if ($("#atras").attr("pagina") == "1") {
		$("#atras").addClass("hidden-btn");
	}

}


async function ldGaleria() {
	if (val < 1) {
		$('#paginacion').hide(0);

		if (modulo == "Galeria") {
			if ($('#paginacion').length > 0) {
				$(window).scroll(function () {
					var windowHeight = $(window).scrollTop();
					var contenido2 = $("#galeria").offset();
					contenido2 = contenido2.top;

					var contenido3 = $(".colofon").offset();
					contenido3 = contenido3.top;

					//console.log(windowHeight + " " + contenido2 + " " + contenido3)

					if (windowHeight >= contenido2 && windowHeight <= contenido3 - 270) {
						$('#paginacion').fadeIn(500);
					} else {
						$('#paginacion').fadeOut(500);
					}

				});
			}
		}

		let elementos = 150;
		$("#adelante").attr("elementos", elementos);
		$("#atras").attr("elementos", elementos);
		var clase = "";
		let imagen = "";

		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/galeria_int", function (data) {
			$.each(data, function (key, val) {
				//console.log("a");

				//if (key > 50) {
				clase = "hidden";
				//}

				setTimeout(function () {
					$("#galeria").append(
						"<div>" +
						"	<div id='img" + key + "' class='hover03 column col-md-3 bottom-buffer " + clase + "' style=''>" +
						"		<div>" +
						"			<figure>" +
						"				<img class='element-gal' style='height: 200px' width='270' src='http://" + val.foto + "'/>" +
						"			</figure>" +
						"		</div>" +
						"	</div>" +
						"</div>")
				});
			}, 3000);


		});

	}
	val = 1;

	/*inView('figure').on('enter', function (figure) {

		var img = figure.querySelector('img'); // 1

		if ('undefined' !== typeof img.dataset.src) { // 2

			figure.classList.add('is-loading'); // 3

			// 4
			newImg = new Image();
			newImg.src = img.dataset.src;

			newImg.addEventListener('load', function () {

				figure.innerHTML = ''; // 5
				figure.appendChild(this);

				// 6
				setTimeout(function () {
					figure.classList.remove('is-loading');
					figure.classList.add('is-loaded');
				}, 300);
			});
		}
	});*/
}



const load = () => {
	var refreshIntervalId = setInterval(() => {
		ldGaleria();
		const script = document.createElement("script");
		script.id = "fmwk_gob";
		script.src = "https://framework-gb.cdn.gob.mx/gobmx.js";
		script.async = true;
		document.body.appendChild(script);

	//	var user = JSON.parse(localStorage.getItem('credenciales'));
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



function Galeria(props) {

	var is_restrict = "";
//	const isLogged = localStorage.getItem('credenciales');

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

						<div id="paginacion" class="flotante" style={{ right: 25 }}>

							<div class="row enlace bottom-buffer-x15">
								<i id="atras" onClick={atras} style={{ fontSize: 25 }} class="hidden-btn fas fa-chevron-circle-left gold" pagina="1"></i>
							</div>

							<div class="row enlace" >

								<i id="adelante" onClick={adelante} style={{ fontSize: 25 }} class="fas fa-chevron-circle-right gold" pagina="50"></i>
							</div>


						</div>
						<div>
							<div id="galeria" class="row container" style={{ margin: 0 }}>

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

export default Galeria;