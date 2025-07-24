import $, { each } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'
import { Link } from "react-router-dom";
import Axios from 'axios';
import Alerta from './Alerta';
import Alerta_ from '../assets/js/Alerta';
import { useEffect } from 'react';
import '../assets/css/checks.css'

var email = "";

const inicio = () => {
	window.location.href = "/int/#/Inicio";
}

const out = () => {
	$(".navbar").remove();
	$(".main-footer").remove();
	$("#slideshow-container").remove();
	$("body").removeClass("Inicio");
	localStorage.clear();
	window.location.href = "/int/#/";

}

const get_cepci = () => {
	email = $("#_email_").val();
	$(".loading").removeClass("hidden");
	$(".busca").remove()
	$(".eval").append(
		'<h6>SUBDIRECTORES GENERALES CANDIDATOS A FORMAR PARTE DEL CEPCI DE LA CONAVI 2023-2026</h6>' +
		'<hr class="red"></hr>' +
		'<div id="cepci_1" class="cepci row justify-content-between">' +
		'</div>' +
		'<h6>DIRECTORAS Y DIRECTORES DE ÁREA CANDIDATOS A FORMAR PARTE DEL CEPCI DE LA CONAVI 2023-2026</h6>' +
		'<hr class="red"></hr>' +
		'<div id="cepci_2" class="cepci row">' +
		'</div>' 
		/*+'<h6>SUBDIRECTORAS Y SUBDIRECTORES DE ÁREA CANDIDATOS A FORMAR PARTE DEL CEPCI DE LA CONAVI 2023-2026</h6>' +
		'<hr class="red"></hr>' +
		'<div id="cepci_3" class="cepci row">' +
		'</div>' +
		'<h6>SUBDIRECTORAS Y SUBDIRECTORES DE ÁREA CANDIDATOS A FORMAR PARTE DEL CEPCI DE LA CONAVI 2023-2026</h6>' +
		'<hr class="red"></hr>' +
		'<div id="cepci_31" class="cepci row">' +
		'</div>' +
		'<h6>JEFATURAS DE DEPARTAMENTO CANDIDATAS A FORMAR PARTE DEL CEPCI DE LA CONAVI 2023-2026</h6>' +
		'<hr class="red"></hr>' +
		'<div id="cepci_4" class="cepci row">' +
		'</div>' +
		'<h6>JEFATURAS DE DEPARTAMENTO CANDIDATAS A FORMAR PARTE DEL CEPCI DE LA CONAVI 2023-2026</h6>' +
		'<hr class="red"></hr>' +
		'<div id="cepci_41" class="cepci row">' +
		'</div>' +
		'<h6>ENLACES CANDIDATOS A FORMAR PARTE DEL CEPCI DE LA CONAVI 2023-2026</h6>' +
		'<hr class="red"></hr>' +
		'<div id="cepci_5" class="cepci row">' +
		'</div>'*/);

	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/get_cepci/", function (data) {

		$.each(data, function (key, val) {

			$.each(val, function (id, valor) {

				let url = "https://sistemaintegral.conavi.gob.mx:81/int/foto_personal/" + valor.email + ".jpg"
				$("#cepci_" + valor.cepci).append(
					'<div class="col-md-3" >' +
					'<label id="Ecepci_' + valor.cepci + '">' +
					'<input type="checkbox" id="Ecepci_' + valor.cepci + '"  class="cepci_' + valor.cepci + '" email="' + valor.email + '"/>' +
					'<div class="icon-box">' +
					'<div class="cepci-card">' +
					"<img class='pic' src='" + url + "'/> " +
					'<div style="text-align:center" >' +
					//'<input type="radio" email="' + valor.email + '" id="cepci_' + valor.cepci + '"  name="cepci_' + valor.cepci + '" style="cursor:pointer;text-align:center" />' +
					'<div/>' +
					'<div class="names">' +

					'<br><div><i class="gold fas fa-star"></i> ' + valor.votos + '</div><br>' +
					'<strong class="nombre-cepci"><p class="social">' + valor.nombre + '</p></strong>' +
					'<class="nombre-cepci"><p style="font-size:8px" class="social">' + valor.descripcion + '</p></>' +

					'</div>' +
					'</label>' +
					'</div>' +
					'</div>' +
					'</div>'
				)
				$("#loading").remove();
				$("#send").removeClass("hidden");
			});
		});
	});
}

const send_evaluacion_old = () => {

	let Ecepci_1 = "";
	let Ecepci_2 = "";
	let Ecepci_3_1 = "";
	let Ecepci_3_2 = "";
	let Ecepci_4_1 = "";
	let Ecepci_4_2 = "";
	let Ecepci_5 = "";

	var counter_3 = 1;
	var counter_4 = 1;

	$('.cepci_1').each(function () {
		if ($(this).prop("checked") == true) {
			Ecepci_1 = $(this).attr("email");
		}
	});

	$('.cepci_2').each(function () {
		if ($(this).prop("checked") == true) {
			Ecepci_2 = $(this).attr("email");
		}
	});

	/*$('.cepci_3').each(function () {
		if ($(this).prop("checked") == true) {

			if (counter_3 == 1) {
				Ecepci_3_1 = $(this).attr("email");

			} else {
				Ecepci_3_2 = $(this).attr("email");

			}
			counter_3++


		}
	});

	$('.cepci_4').each(function () {
		if ($(this).prop("checked") == true) {
			if (counter_4 == 1) {
				Ecepci_4_1 = $(this).attr("email");
			} else {
				Ecepci_4_2 = $(this).attr("email");
			}
			counter_4++
		}
	});

	$('.cepci_5').each(function () {
		if ($(this).prop("checked") == true) {
			Ecepci_5 = $(this).attr("email");
		}
	});
*/

	if (Ecepci_1 != "" &&
		Ecepci_2 != "" 
		/*Ecepci_3_1 != "" &&
		Ecepci_3_2 != "" &&
		Ecepci_4_1 != "" &&
		Ecepci_4_2 != "" &&
		Ecepci_5 != ""*/) {


	} else {
		Alerta_("<p class='p-center' style='z-index:999999'>Debes evaluar <strong>a todos los participantes</strong> </p>", "alertaOp alert alert-warning");
	}
};

const send_evaluacion = () => {

	let Ecepci_1_1 = "";
	let Ecepci_1_2 = "";
	let Ecepci_2_1 = "";
	let Ecepci_2_2 = "";
	let Ecepci_3_1 = "";
	let Ecepci_3_2 = "";
	let Ecepci_3_3 = "";
	let Ecepci_3_4 = "";
	let Ecepci_4_1 = "";
	let Ecepci_4_2 = "";
	let Ecepci_4_3 = "";
	let Ecepci_4_4 = "";
	let Ecepci_5_1 = "";
	let Ecepci_5_2 = "";

	var counter_1 = 1;
	var counter_2 = 1;
	var counter_3 = 1;
	var counter_31 = 1;
	var counter_4 = 1;
	var counter_41 = 1;
	var counter_5 = 1;

	$('.cepci_1').each(function () {
		if ($(this).prop("checked") == true) {

			if (counter_1 == 1) {
				Ecepci_1_1 = $(this).attr("email");

			}
			counter_1++


		}
	});

	$('.cepci_2').each(function () {
		if ($(this).prop("checked") == true) {

			if (counter_2 == 1) {
				Ecepci_2_1 = $(this).attr("email");

			} else {
				Ecepci_2_2 = $(this).attr("email");

			}
			counter_2++


		}
	});

	/*$('.cepci_3').each(function () {
		if ($(this).prop("checked") == true) {

			if (counter_3 == 1) {
				Ecepci_3_1 = $(this).attr("email");

			} else if (counter_3 == 2) {
				Ecepci_3_2 = $(this).attr("email");

			}
			counter_3++

		}
	});

	$('.cepci_31').each(function () {
		if ($(this).prop("checked") == true) {

			if (counter_31 == 1) {
				Ecepci_3_3 = $(this).attr("email");

			} else if (counter_31 == 2) {
				Ecepci_3_4 = $(this).attr("email");

			}

			counter_31++


		}
	});

	$('.cepci_4').each(function () {
		if ($(this).prop("checked") == true) {
			if (counter_4 == 1) {
				Ecepci_4_1 = $(this).attr("email");

			} else if (counter_4 == 2) {
				Ecepci_4_2 = $(this).attr("email");

			}
			counter_4++
		}
	});

	$('.cepci_41').each(function () {
		if ($(this).prop("checked") == true) {

			if (counter_41 == 1) {
				Ecepci_4_3 = $(this).attr("email");

			} else if (counter_41 == 2) {
				Ecepci_4_4 = $(this).attr("email");

			}

			counter_41++


		}
	});

	$('.cepci_5').each(function () {
		if ($(this).prop("checked") == true) {
			if (counter_5 == 1) {
				Ecepci_5_1 = $(this).attr("email");

			} else if (counter_5 == 2) {
				Ecepci_5_2 = $(this).attr("email");

			}
			counter_5++
		}
	});
*/



	if (Ecepci_1_1 != "" &&
		Ecepci_2_1 != ""/* &&
		Ecepci_2_2 != "" &&
		Ecepci_3_1 != "" &&
		Ecepci_3_2 != "" &&
		Ecepci_3_3 != "" &&
		Ecepci_3_4 != "" &&
		Ecepci_4_1 != "" &&
		Ecepci_4_2 != "" &&
		Ecepci_4_3 != "" &&
		Ecepci_4_4 != "" &&
		Ecepci_5_1 != "" &&
		Ecepci_5_2 != ""*/) {

		Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/send_cepci', {
			//		Axios.post('http://localhost:3001/api/send_cepci', {
			email: email,
			eval_1_1: Ecepci_1_1,
			eval_1_2: Ecepci_1_2,
			eval_2_1: Ecepci_2_1,
			eval_2_2: Ecepci_2_2,
			eval_3_1: Ecepci_3_1,
			eval_3_2: Ecepci_3_2,
			eval_3_3: Ecepci_3_3,
			eval_3_4: Ecepci_3_4,
			eval_4_1: Ecepci_4_1,
			eval_4_2: Ecepci_4_2,
			eval_4_3: Ecepci_4_3,
			eval_4_4: Ecepci_4_4,
			eval_5_1: Ecepci_5_1,
			eval_5_2: Ecepci_5_2,


		}).then(
			(response) => {

				if (response.data == "ok") {
					$("#send").remove();
					Alerta_("<p class='p-center' style='z-index:999999'>Tu evaluación <strong>fue recibida</strong></p>", "alertaOp alert alert-success");
					setInterval(() => {
						window.location.href = "/int/#/Inicio";
					}, 2000);
				} else {
					Alerta_("<p class='p-center' style='z-index:999999'>ocurrió un error <strong>al recibir tu evaluación</strong> </p>", "alertaOp alert alert-danger");
				}
			},

		).catch(
			(err) => {
				//console.log(err)
			});


	} else {
		Alerta_("<p class='p-center' style='z-index:999999'>Debes evaluar <strong>a todos los participantes</strong> </p>", "alertaOp alert alert-warning");


	}
};

const get_email = () => {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/get_user_cepci/" + $("#_email_").val(), function (data) {
		$.each(data, function (key, val) {
			$.each(val, function (id, valor) {
				if (valor == "inexistente") {
					Alerta_("<p class='p-center' style='z-index:999999'>Este email <strong>no está  asignado</strong> a ningún servidor público</p>", "alertaOp alert alert-warning");
				} else if (valor == "calificado") {
					get_cepci();
					$("#send").remove();
				} else {
					get_cepci();
				}
			});
		});
	});

}

function Cepci(props) {


	useEffect(() => {
		var $c1 = $('.cepci_1 input[type=checkbox]');
		var $c2 = $('.cepci_2 input[type=checkbox]');
		var $c3 = $('.cepci_3 input[type=checkbox]');
		var $c31 = $('.cepci_31 input[type=checkbox]');
		var $c4 = $('.cepci_4 input[type=checkbox]');
		var $c41 = $('.cepci_41 input[type=checkbox]');
		var $c5 = $('.cepci_5 input[type=checkbox]');

		$('body').on('click', $c1, function (e) {
			if ($(".cepci_1").filter(":checked").length >= 1) {
				$(".cepci_1").filter(":not(:checked)").prop("disabled", true);
			} else {
				$(".cepci_1").prop("disabled", false);
			}
		});

		$('body').on('click', $c2, function (e) {
			if ($(".cepci_2").filter(":checked").length >= 1) {
				$(".cepci_2").filter(":not(:checked)").prop("disabled", true);
			} else {
				$(".cepci_2").prop("disabled", false);
			}
		});

		$('body').on('click', $c3, function (e) {
			if ($(".cepci_3").filter(":checked").length >= 1) {
				$(".cepci_3").filter(":not(:checked)").prop("disabled", true);
			} else {
				$(".cepci_3").prop("disabled", false);
			}
		});

		$('body').on('click', $c31, function (e) {
			if ($(".cepci_31").filter(":checked").length >= 2) {
				$(".cepci_31").filter(":not(:checked)").prop("disabled", true);
			} else {
				$(".cepci_31").prop("disabled", false);
			}
		});

		$('body').on('click', $c4, function (e) {
			if ($(".cepci_4").filter(":checked").length >= 2) {
				$(".cepci_4").filter(":not(:checked)").prop("disabled", true);
			} else {
				$(".cepci_4").prop("disabled", false);
			}
		});

		$('body').on('click', $c41, function (e) {
			if ($(".cepci_41").filter(":checked").length >= 2) {
				$(".cepci_41").filter(":not(:checked)").prop("disabled", true);
			} else {
				$(".cepci_41").prop("disabled", false);
			}
		});

		$('body').on('click', $c5, function (e) {
			if ($(".cepci_5").filter(":checked").length >= 2) {
				$(".cepci_5").filter(":not(:checked)").prop("disabled", true);
			} else {
				$(".cepci_5").prop("disabled", false);
			}
		});


		const script = document.createElement("script");
		script.id = "fmwk_gob";
		script.src = "https://framework-gb.cdn.gob.mx/gobmx.js";
		script.async = true;
		document.head.appendChild(script);

		$(".loading").addClass("hidden");

		$("html, body").removeClass("gbColor");


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
						<li class="active"><Link class="nav-link">CEPCI 2023-2026</Link></li>
					</ol>
					<div id="send" class="hidden flotante send" style={{ right: 50, zIndex: 9999 }}>
						<div class="bottom-buffer" style={{ cursor: "pointer" }}>
							<i onClick={send_evaluacion} class="fas fa-paper-plane"></i>
						</div>
					</div>
					<div class="eval">

						<div class="busca">
							<small>Introduce tu correo institucional para acceder a la encuesta</small>
							<input id="_email_" class="form-control"></input>
							<button onClick={get_email} class="btn btn-primary" type="button">
								<span class="glyphicon glyphicon-search"></span>
								Buscar
							</button>


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


export default Cepci;