import $, { each } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'


import Alerta from './Alerta';
import ModalSpa from './modal/ModalSpa';
import '../assets/css/scroll.css';
import '../assets/css/navbar.css';
import '../assets/css/modal.css';
import '../assets/css/content.css';
import '../assets/css/notificacion.css';
import '../assets/css/listas.css';
import '../assets/css/datepicker.css';
import '../assets/css/emergente.css';
import { getUserCredenciales } from '../utils/storage';




import { Redirect, Link, useHistory } from "react-router-dom";
import Inicio from './Inicio.jsx';
 const user = getUserCredenciales();
    if (!user) {
      window.location.href = "/int/#/";
          }

function verTickets(tipo) {
	//var user = JSON.parse(localStorage.getItem('credenciales'));


	var fecha = ""
	$(".registros").remove();
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_tickets_status/" + tipo + "/" + user[0]["email"], function (data) {
		$.each(data, function (key, val) {
			fecha = val.fecha.toString().replace("T", " ").replace(".000Z", "");
			$("#body-tickets").append('<tr id="' + val.id + '" class="enlace registros"><td id="' + val.id + '">' + fecha + '</td><td id="' + val.id + '">' + val.nombre + '</td></tr>')
		});

	});
}



function obtenerTotales() {

	//var user = JSON.parse(localStorage.getItem('credenciales'));

	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/tickets_count/" + user[0]["email"], function (data) {
		$.each(data, function (key, val) {
			$("#" + val.status).text(val.counter);
		});

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

	}, 400);

	setInterval(() => {
		obtenerTotales();
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


function box(tipo) {
	var texto = "";
	var tipo_ = "";
	switch (tipo) {
		case "tk1":
			texto = "Sin asignar";
			tipo_ = "P"
			break;
		case "tk2":
			texto = "Asignado";
			tipo_ = "A"
			break;
		case "tk3":
			texto = "Cerrado";
			tipo_ = "C";
			break;
		case "tk4":
			texto = "Rechazado";
			tipo_ = "R";
			break;

	}
	verTickets(tipo_);
	$("#tipo-soporte").text(texto)
	$(".sp-box").css("display", "block");


}

const close_card = () => {

	for (var i = 1; i < 5; i++) {
		$("#tk" + i).css("display", "block");
	}


	$(".sp-box").css("display", "none");

}

const tk = (id) => {

	for (var i = 1; i < 5; i++) {

		if (id != "tk" + i) {
			$("#tk" + i).css("display", "none");
		} else {

		}

	}
	box(id);
}

function ocultar_elementos(status) {
	switch (status) {


		case "P":
			$("#lbl_status").addClass("hidden");
			$("#lbl_observacion").addClass("hidden");

			$("#datetimepicker_spa").addClass("hidden");
			$("#observacion").addClass("hidden");
			$("#cbo_id_status").addClass("hidden");

			$("#btnCerrado-spa").addClass("hidden");
			$("#btnAsignar-spa").removeClass("hidden");

			break;
		case "A":
			$("#lbl_status").addClass("hidden");
			$("#lbl_observacion").addClass("hidden");

			$("#datetimepicker_spa").removeClass("hidden");
			$("#observacion").removeClass("hidden");
			$("#cbo_id_status").removeClass("hidden");

			$("#btnCerrado-spa").removeClass("hidden");
			$("#btnAsignar-spa").addClass("hidden");
			break;
		default:
			$("#lbl_status").removeClass("hidden");
			$("#lbl_observacion").removeClass("hidden");

			$("#datetimepicker_spa").addClass("hidden");
			$("#observacion").addClass("hidden");
			$("#cbo_id_status").addClass("hidden");

			$("#btnCerrado-spa").addClass("hidden");
			$("#btnAsignar-spa").addClass("hidden");
			break

	}
}

const open_Spa = (id) => {

	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_tickets_modal/" + id, function (data) {

		$.each(data, function (key, val) {

			ocultar_elementos(val.id_status);

			$.each(val, function (i, item) {
				//console.log(i + " " + item);
				if (i == "fecha") {

					$("#lbl_" + i).text(item.toString().replace("T", " ").replace(".000Z", ""));

				} else {
					$("#lbl_" + i).text(item);
				}
			});

		});


		$("#modal").css("display", "block");
		$('html').css("overflow", "hidden");
		$("#content-spa").css("display", "block");
	});




}

function Soporte(props) {
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

			if (Modulos[i] == "open-tickets") {
				is_restrict = "SI";
			}

		}

	}

	if (is_restrict == "SI") {
		out();
	}
	else if (!user) {
		out();
		return (
			<header></header>
		);
	} else {
		load();
		return (
			<div className="Inicio">
				<header>


					<Accesibilidad />
					<Alerta />
					<GaleriaHeader />

					<script>


					</script>

					<div id="modal" class="modal">
						<ModalSpa></ModalSpa>
					</div>
					<div id="cont" class="container">
						<p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>
						<ol class="breadcrumb">
							<li><a href=""><i class="icon icon-home"></i></a></li>
							<li class="enlace" onClick={inicio}>Inicio</li>
							<li class="active"><Link class="nav-link">Soporte</Link></li>
						</ol>

						<div class="row">

							<div onClick={(e) => tk(e.target.id)} id="tk1">
								<div id="tk1" class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
									<div id="tk1" class="card card-sin-asignar">
										<p id="tk1" class="card-tittle-xl red"><strong id="P">0</strong></p>
										<p id="tk1" class="card-tittle red">Sin asignar</p>
									</div>
								</div>
							</div>

							<div onClick={(e) => tk(e.target.id)} id="tk2">
								<div id="tk2" class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
									<div id="tk2" class="card card-asignado">
										<p id="tk2" class="card-tittle-xl red"><strong id="A">0</strong></p>
										<p id="tk2" class="card-tittle red">Asignado</p>
									</div>
								</div>

							</div>

							<div onClick={(e) => tk(e.target.id)} id="tk3">
								<div id="tk3" class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
									<div id="tk3" class="card card-cerrado">
										<p id="tk3" class="card-tittle-xl red"><strong id="C">0</strong></p>
										<p id="tk3" class="card-tittle red">Cerrado</p>


									</div>
								</div>

							</div>

							<div onClick={(e) => tk(e.target.id)} id="tk4">
								<div id="tk4" class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
									<div id="tk4" class="card card-rechazado">
										<p id="tk4" class="card-tittle-xl red"><strong id="R">0</strong></p>
										<p id="tk4" class="card-tittle red">Rechazado</p>



									</div>
								</div>

							</div>
						</div>

						<div class="sp-box" style={{ display: "none" }}>
							<div style={{ height: 20, position: "relative" }}>
								<div style={{ textAlign: "end", position: "absolute", right: 0, margin: 5 }}>
									<span onClick={close_card} id="sp-close"><i id="close-card" class="far fa-times-circle red" style={{ textAlign: "end", cursor: 'pointer' }}></i></span>
								</div>
								<div style={{ textAlign: "start", position: "absolute", left: 0, margin: 5 }}>
									<h10 id="tipo-soporte"> Asignado </h10>
									<hr style={{ marginTop: 1 }} class="red"></hr>
								</div>
							</div>
							<div class="ntf-list">
								<table class="table table-striped">
									<thead>
										<tr>
											<th>Fecha</th>
											<th>Usuario</th>
										</tr>
									</thead>
									<tbody id="body-tickets" onClick={(e) => open_Spa(e.target.id)}>

									</tbody>


								</table>

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

export default Soporte;