import $, { each } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'

import Axios from 'axios';
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
import Alerta_ from '../assets/js/Alerta.js';
import ModalFile from '../components/modal/modalFile.jsx'
import { getUserCredenciales } from '../utils/storage';



import { Redirect, Link, useHistory } from "react-router-dom";
import Inicio from './Inicio.jsx';
import { useEffect } from 'react';
const user = getUserCredenciales();

const scroll = (id) => {
	let el = document.getElementById(id);
	el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
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

const submitFile = () => {
	var path = "";
	if ($('option:selected', '#id_bloque').attr('path') != "X") {
		path = $('option:selected', '#id_bloque').attr('path');
	} else {
		path = $('option:selected', '#subtitulo').attr('path');
	}


	var formData = new FormData();

	formData.append("file", $("#file")[0].files[0]);
	formData.append("path", path);
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/upload', formData, {
		//Axios.post('http://localhost:3001/api/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(
		(response) => {

		},
	).catch(

		(err) => {

			//console.log(err)
		});

};

const submitInsert = (tabla, id_bloque, descripcion, ubicacion, sub_bloque) => {
	let do_ = true;
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nuevo_documento', {
		tabla: tabla,
		id_bloque: id_bloque,
		descripcion: descripcion,
		ubicacion: ubicacion,
		sub_bloque: sub_bloque


	}).then(
		(response) => {
			if (response.data != "") {

				Alerta_("¡Registraste un nuevo un nuevo documento con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
			} else {
				Alerta_("<strong>Ocurrió un error</strong> al registrar este documento.", "alertaOp alert alert-danger alert-dismissible");
				do_ = false;
			}
		},
	).catch(

		(err) => {

			//console.log(err)
		});
	return do_;
};

const submitUpdate = (tabla, id) => {
	let do_ = true;
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/baja_doc', {
		tabla: tabla,
		id: id

	}).then(
		(response) => {
			if (response.data != "") {

				Alerta_("¡Modificación<strong> exitosa</strong>!", "alertaOp alert alert-success alert-dismissible");
				window.location.reload("/int/#/Documentos");
			} else {
				Alerta_("<strong>Ocurrió un error</strong> al realizar esta modificación.", "alertaOp alert alert-danger alert-dismissible");
				do_ = false;
			}
		},
	).catch(

		(err) => {

			//console.log(err)
		});
	return do_;
};

const submitBaja = (tabla, id, stat) => {
	let do_ = true;
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/ocultar_doc', {
		//Axios.post('http://localhost:3001/api/ocultar_doc', {
		tabla: tabla,
		id: id,
		stat: stat

	}).then(
		(response) => {
			if (response.data != "") {
				Alerta_("¡Modificación<strong> exitosa</strong>!", "alertaOp alert alert-success alert-dismissible");
			} else {
				Alerta_("<strong>Ocurrió un error</strong> al realizar esta modificación.", "alertaOp alert alert-danger alert-dismissible");
				do_ = false;
			}
		},
	).catch(

		(err) => {

			//console.log(err)
		});
	return do_;
};

const validar = () => {

	var tabla = "";
	var bloque = $('option:selected', '#id_bloque').attr('value');
	var absolutePath = "";
	var path = $('option:selected', '#id_bloque').attr('path');
	var subpath = $('option:selected', '#subtitulo').attr('path');
	var nombre = $('#descripcion').val();
	var file = $("#file")[0].files.length;
	var sub_bloque = $('option:selected', '#id_bloque').attr('sub_bloque');
	switch ($('option:selected', '#id_bloque').attr('tabla')) {
		case "titulos_nt":
			tabla = "int_normateca";
			break;

		case "titulos_ce":
			tabla = "int_comite_etica";
			break;

		case "titulos_pl":
			tabla = "int_programa_labores";
			break;
	}

	if (path == "X") {
		if (subpath == "") {
			$(".sub-clasificacion").addClass("error")
			$("#subtitulo").focus();
		} else {
			absolutePath = subpath;
			$(".sub-clasificacion").removeClass("error")
			sub_bloque = $('option:selected', '#subtitulo').attr('sub_bloque');
		}
	} else {
		if (path == "") {
			$(".clasificacion").addClass("error")
			$("#id_bloque").focus();
		} else {
			absolutePath = path;
			$(".clasificacion").removeClass("error")
		}
	}

	if (nombre == "") {
		$(".nombre").addClass("error")
		$("#descripcion").focus();
	} else {
		$(".nombre").removeClass("error")
	}
	if (file == 0) {
		$(".documento").addClass("error")
		$("#file").focus();
	} else {
		$(".documento").removeClass("error")
		absolutePath = absolutePath + $('#file').val().replace(/C:\\fakepath\\/i, '')
	}

	$(".error").focus();

	if ($('.error').length < 1) {
		if (submitInsert(tabla, bloque, nombre, absolutePath, sub_bloque)) {
			submitFile();
		}

	} else {

	}

}

const open_upd = (nombre, id, tabla, path, path_location) => {
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-upd").css("display", "block");
	$("#id_file").val(id);
	$("#nombre_actual").val(nombre);
	$("#tabla_actual").val(tabla);
	$("#ruta_actual").val(path);
	$("#ruta_nueva").val(path);
	$("#path").val(path_location);

}

/*Normateca*/

function obtenerTitulosNt(enlace) {

	$(".menu").removeClass("hidden");
	$(".enlace-nt").remove();
	$(".t-nt").remove();
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/" + enlace + "a/T", function (data) {
		var items = [];
		var options = [];
		$.each(data, function (key, val) {

			items.push(
				"<li class='t-nt titulos-nt" + val.id_bloque + "'><input type='checkbox' name='list' id='nt-title-" + val.id_bloque + "' /><label for='nt-title-" + val.id_bloque + "'>" + val.descripcion + "</label><ul class='interior interior" + val.id_bloque + "'></ul></li>"
			);

			options.push("<option class='t-nt' sub_bloque='" + val.sub_bloque + "' tabla='" + enlace + "' path='" + val.root + "' value='" + val.id_bloque + "'>" + val.descripcion + "</option>"
			);
		});

		$("#menu").append(items);
		$("#id_bloque").append(options);
		addEnlacesNt(enlace);
	});

}

function addEnlacesNt(enlace) {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/" + enlace + "a/L", function (data) {

		$.each(data, function (key, val) {
			if (val.subtitulo == "X") {
				$(".interior" + val.id_bloque).append(
					"<li id='nt-link-" + val.id + "'><strong>" + val.descripcion + "</strong></li>");
			} else {
				if (val.cve_bajal == "A") {
					if (enlace === "titulos_nt") {
						$(".interior" + val.id_bloque).append(
							"<li id='li_" + val.id + "' class='minus'>" +
							"<i id='i_" + val.id + "' tabla='" + enlace + "' cve='" + val.id + "' class='enlace minus-item hst gold fas fa-history espacio-lateral'></i>" +
							"<i id='i_" + val.id + "' tabla='" + enlace + "' cve='" + val.id + "' nombre='" + val.descripcion + "' path='" + val.ubicacion + "' class='enlace minus-item upd gold fas fa-sync espacio-lateral'></i>" +

							"<a id='nt-link-" + val.id + "' class='enlace enlace-nt' href='../int/" + val.ubicacion + "' target='_blank'>" + val.descripcion + "</a> </li>");
					} else {
						$(".interior" + val.id_bloque).append(
							"<li id='li_" + val.id + "' class='minus'>" +

							"<i id='i_" + val.id + "' tabla='" + enlace + "' cve='" + val.id + "' nombre='" + val.descripcion + "' path='" + val.ubicacion + "' class='enlace minus-item gold hdn fas fa-eye-slash espacio-lateral'>Ocultar elemento</i>" +

							"<a id='nt-link-" + val.id + "' class='enlace enlace-nt' href='../int/" + val.ubicacion + "' target='_blank'>" + val.descripcion + "</a> </li>");

					}
				} else {
					if (enlace === "titulos_nt") {
						$(".interior" + val.id_bloque).append(
							"<li id='li_" + val.id + "' class='minus hidden-item'><i id='i_" + val.id + "' tabla='" + enlace + "' cve='" + val.id + "' class='enlace hdn minus-item gold fas fa-eye'></i><a id='nt-link-" + val.id + "' class='enlace enlace-nt' href='../int/" + val.ubicacion + "' target='_blank'>" + val.descripcion + "</a> </li>");
					} else {
						$(".interior" + val.id_bloque).append(
							"<li id='li_" + val.id + "' class='minus hidden-item'><i id='i_" + val.id + "' tabla='" + enlace + "' cve='" + val.id + "' class='enlace vbl minus-item gold fas fa-eye'>Mostrar elemento</i><a id='nt-link-" + val.id + "' class='enlace enlace-nt' href='../int/" + val.ubicacion + "' target='_blank'>" + val.descripcion + "</a></li>");
					}
				}

			}

		});

		scroll("menu");

	});




	$(document).on('click', '.hst', function () {
		var tabla = "";
		switch ($(this).attr('tabla')) {
			case "titulos_nt":
				tabla = "int_normateca";
				break;

			case "titulos_ce":
				tabla = "int_comite_etica";
				break;

			case "titulos_pl":
				tabla = "int_programa_labores";
				break;
		}
		submitUpdate(tabla, $(this).attr('cve'));

	});

	$(document).on('click', '.hdn', function () {
		var tabla = "";
		switch ($(this).attr('tabla')) {
			case "titulos_nt":
				tabla = "int_normateca";
				break;

			case "titulos_ce":
				tabla = "int_comite_etica";
				break;

			case "titulos_pl":
				tabla = "int_programa_labores";
				break;
		}
		$("#li_" + $(this).attr('cve')).addClass("hidden-item");
		$("#i_" + $(this).attr('cve')).addClass("fa-eye");
		$("#i_" + $(this).attr('cve')).removeClass("fa-eye-slash");
		$("#i_" + $(this).attr('cve')).addClass("hdn");
		$("#i_" + $(this).attr('cve')).removeClass("vbl");
		$("#i_" + $(this).attr('cve')).text("Mostrar elemento")
		submitBaja(tabla, $(this).attr('cve'), "B");


	});

	$(document).on('click', '.vbl', function () {
		var tabla = "";
		switch ($(this).attr('tabla')) {
			case "titulos_nt":
				tabla = "int_normateca";
				break;

			case "titulos_ce":
				tabla = "int_comite_etica";
				break;

			case "titulos_pl":
				tabla = "int_programa_labores";
				break;
		}
		$("#li_" + $(this).attr('cve')).removeClass("hidden-item");
		$("#i_" + $(this).attr('cve')).removeClass("fa-eye");
		$("#i_" + $(this).attr('cve')).addClass("fa-eye-slash");
		$("#i_" + $(this).attr('cve')).removeClass("hdn");
		$("#i_" + $(this).attr('cve')).addClass("vbl");
		$("#i_" + $(this).attr('cve')).text("Ocurtar elemento")
		submitBaja(tabla, $(this).attr('cve'), "A");


	});

	$(document).on('click', '.upd', function () {
		var tabla = "";
		switch ($(this).attr('tabla')) {
			case "titulos_nt":
				tabla = "int_normateca";
				break;

			case "titulos_ce":
				tabla = "int_comite_etica";
				break;

			case "titulos_pl":
				tabla = "int_programa_labores";
				break;
		}

		open_upd(
			$(this).attr('nombre'),
			$(this).attr('cve'),
			tabla,
			$(this).attr("path"),
			"sistema_gestion_manuales"

		);
	});

}

function obtenerSubtitulosNt() {
	var tabla = "";

	if ($('option:selected', '#id_bloque').attr('path') == "X") {
		$(".sub_").removeClass("hidden");

	} else {
		$(".sub_").addClass("hidden");
	}


	switch ($('option:selected', '#id_bloque').attr('tabla')) {
		case "titulos_nt":
			tabla = "int_normateca";
			break;

		case "titulos_ce":
			tabla = "int_comite_etica";
			break;

		case "titulos_pl":
			tabla = "int_programa_labores";
			break;
	}


	$(".sub-nt").remove();
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/subtitulos/" + tabla + "/" + $('option:selected', '#id_bloque').attr('value'), function (data) {
		var items = [];
		var options = [];
		$.each(data, function (key, val) {
			options.push("<option class='sub-nt' sub_bloque='" + val.sub_bloque + "' path='" + val.root + "' value='" + val.id_bloque + "'>" + val.descripcion + "</option>"
			);
		});
		$("#subtitulo").append(options);

	});

}

function Documentos(props) {
	var is_restrict = "";
//	const isLogged = localStorage.getItem('credenciales');
	useEffect(() => {
		const user = getUserCredenciales();
  		  if (!user) {
    	  window.location.href = "/int/#/";
    	  return;
 		   }
		

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
				$("#" + Modulos[i]).remove();
				if (Modulos[i] == "adms-doc") {
					is_restrict = "SI";
				}

			}

		}
	});

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



					<div id="modal" class="modal">
						<ModalFile></ModalFile>
					</div>
					<div id="cont" class="container">
						<p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>
						<ol class="breadcrumb">
							<li><a href=""><i class="icon icon-home"></i></a></li>
							<li class="enlace" onClick={inicio}>Inicio</li>
							<li class="active"><Link class="nav-link">Carga de documentación</Link></li>
						</ol>

						{/*<form action='https://sistemaintegral.conavi.gob.mx:81/api/upload' method="POST" enctype="multipart/form-data">
						<input type="file" name="file"/>
						<input type="submit" value="Subir"/>
		</form>*/}




						<div class="row">
							<div onClick={() => obtenerTitulosNt("titulos_nt")} id="adms-doc-nt" class="col-md-4 bottom-buffer">
								<div class="card">
									<img class="nt" />
									<p class="card-tittle red">Normateca</p>
								</div>
							</div>


							<div onClick={() => obtenerTitulosNt("titulos_pl")} id="adms-doc-pl" class="col-md-4 bottom-buffer">
								<div class="card">
									<img class="pl" />
									<p class="card-tittle red">Programa de labores</p>

								</div>
							</div>

							<div onClick={() => obtenerTitulosNt("titulos_ce")} id="adms-doc-ce" class="col-md-4 bottom-buffer">
								<div class="card">
									<img class="ce" />
									<p class="card-tittle red">Comité de ética </p>

								</div>
							</div>
						</div>


						<ul style={{ marginLeft: 25, marginRight: 25, marginTop: 15 }} id="menu" class="menu hidden">
							<div class="bottom-buffer-x15">
								<i style={{ fontSize: 20 }} class="gold fas fa-plus-circle">
								</i> <strong>Nuevo elemento</strong>
							</div>

							<div class="row bottom-buffer">

								<div class="col-md-6"><small>Clasificación <strong class="clasificacion req">*</strong></small><select
									onChange={obtenerSubtitulosNt} class="form-control" id="id_bloque" name="frm.id_bloque" placeholder="Clasificación"><option value="0" path="">--Seleccione clasificación--</option></select></div>
								<div class="col-md-6"><small>Nombre de archivo <strong class="nombre req">*</strong></small><input type="text" class="form-control" id="descripcion" name="frm.descripcion" placeholder="Nombre de archivo" /></div>
								<div class="sub_ col-md-12 hidden"><small>Sub clasificación <strong class="sub-clasificacion req">*</strong></small><select class="form-control" id="subtitulo" name="frm.subtitulo" placeholder="Sub clasificación"><option value="0" path="">--Seleccione sub clasificación--</option></select></div>
								<div class="col-md-12"><small>Documento <strong class="documento req">*</strong></small><input class="form-control" id="file"  accept="application/pdf" type="file" name="file" /></div>
								<div class="col-md-4">
									<div class="input-group">
										<button onClick={validar} class="btn-primary btn">Subir</button>
									</div>
								</div>

							</div>

						</ul>

					</div>
					<div class="hdn"></div>
					<div class="vbl"></div>
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

export default Documentos;