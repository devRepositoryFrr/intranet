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
import ModalFile from '../components/modal/modalFile';
import { useEffect } from 'react';


import { Redirect, Link, useHistory } from "react-router-dom";
import Inicio from './Inicio.jsx';

var pn = 1;
var sc = 1;
var pa = 1;
var ap = 1;

var active_element = "";

var window_focus;

const parrafo = (xaction) => {

	if (xaction == "1") {

		$(".parrafo").addClass("hidden");
		$(".operativos").removeClass("hidden");
	} else {
		$(".operativos").addClass("hidden");
		$(".parrafo").removeClass("hidden");
	}
	scrollTop("bread");
}

const ocultar = () => {
	$(".child_reg").remove();
	$("." + active_element).addClass("hidden");
	$(".menu_comeri").removeClass("hidden");
	scrollTop("bread")
	$(".error").show();
}

$(window).scroll(function () {
	try {
		var windowHeight = $(window).scrollTop();
		var contenido2 = $(".modulos").offset();
		contenido2 = contenido2.top;

		var contenido3 = $(".colofon").offset();
		contenido3 = contenido3.top;

		//console.log(windowHeight + " " + contenido2 + " " + contenido3)

		if (windowHeight >= contenido2 && windowHeight <= contenido3 - 270) {
			$('#to_top').fadeIn(500);
			$('#return').fadeIn(500);
		} else {
			$('#to_top').fadeOut(500);
			$('#return').fadeOut(500);
		}
	} catch (e) {

	}

});

const mostrar = (elemento) => {
	active_element = elemento;
	$("." + elemento).removeClass("hidden");
	$(".menu_comeri").addClass("hidden");
	scrollTop("bread");



	if (elemento === "md-pa" || elemento === "md-ap") {
		let id = elemento.toString().split("-")
		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/cSesion", function (data) {
			$.each(data, function (key, val) {
				//console.log(data)
				let tipo = "";
				if (val.tipo_sesion == "1") {
					tipo = "ORDINARIA"
				} else {
					tipo = "EXTRAORDINARIA"
				}
				let element = '<option class="child_reg" value="' + val.id + '">' + val.descripcion + '</option>';
				$("#sesion_" + id[1]).append(element);

			});

		});
	}


}

const scrollTop = (id) => {
	try {
		let el = document.getElementById(id);
		el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
	} catch (e) { }
}

const verPn = () => {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/cProyecto_normativo", function (data) {
		$.each(data, function (key, val) {
			//console.log(data)
			let uri = "";
			if (val.ubicacion == "") {
				uri = '';
			} else {
				uri = '<a target="_blank" href="https://sistemaintegral.conavi.gob.mx:81/int/' + val.ubicacion + '"><i class="gold enlace fas fa-file"></i></a>'
			}
			if (pn === 1) {
				var pn_ = '<i path_location="comeri/ProyectoNormativo" table="int_cm_pn" cve="' + val.id + '" id="pn_' + val.id + '" path="' + val.ubicacion + '" nombre="' + val.descripcion + '" class="act gold enlace fas fa-sync-alt"></i>';
			}else{
				var pn_="";
			}
			let element =
				'<li class="table-row child_reg">'
				+ '<div class="col col-1" data-label="">' + val.descripcion + '</div>'
				+ '<div class="col col-2" data-label="">' + uri + '</div>'
				+ '<div class="col col-3" data-label="">' + val.fecha_alta.toString().substring(0, 10) + '</div>'
				+ '<div class="col col-4" data-label=""></div>'
				+ '<div class="col col-5" data-label="">' + pn_ + '</div>'
				+ '</li>';
			$("#uPn").append(element);
			mostrar("md-Vpn");

		});

	});
}

const open_upd = (nombre, id, tabla, path,path_location) => {
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

const verCs = () => {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/cSesion", function (data) {
		$.each(data, function (key, val) {
			let uri = "";
			if (val.ubicacion == "") {
				uri = '';
			} else {
				uri = '<a target="_blank" href="https://sistemaintegral.conavi.gob.mx:81/int/' + val.ubicacion + '"><i class="gold enlace fas fa-file"></i></a>'
			}

			let tipo = "";
			if (val.tipo_sesion == "1") {
				tipo = "ORDINARIA"
			} else {
				tipo = "EXTRAORDINARIA"
			}
			if (sc === 1) {
				var sc_ = '<i path_location="comeri/Sesiones" table="int_cm_cs" cve="' + val.id + '" id="cs_' + val.id + '" path="' + val.ubicacion + '" nombre="' + val.descripcion + '" class="act gold enlace fas fa-sync-alt"></i>';
			}else{
				var sc_="";
			}
			let element =
				'<li class="table-row  child_reg">'
				+ '<div class="col col-1" data-label="">' + val.descripcion + '</div>'
				+ '<div class="col col-2" data-label="">' + uri + '</div>'
				+ '<div class="col col-3" data-label="">' + val.fecha_alta.toString().substring(0, 10) + '</div>'
				+ '<div class="col col-4" data-label="">' + tipo + '</div>'
				+ '<div class="col col-5" data-label="">' + sc_ + '</div>'
				+ '</li>';
			$("#uCs").append(element);
			mostrar("md-Vsc");


		});

	});
}

const verPa = () => {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/cProyecto_actas", function (data) {
		$.each(data, function (key, val) {
			let uri = "";
			if (val.ubicacion == "") {
				uri = '';
			} else {
				uri = '<a target="_blank" href="https://sistemaintegral.conavi.gob.mx:81/int/' + val.ubicacion + '"><i class="gold enlace fas fa-file"></i></a>'
			}
			if (pa === 1) {
				var pa_ = '<i path_location="comeri/ProyectoActas" table="int_cm_pa" cve="' + val.id + '" id="pa_' + val.id + '" path="' + val.ubicacion + '" nombre="' + val.descripcion + '" class="act gold enlace fas fa-sync-alt"></i>';
			}else{
				var pa_="";
			}
			let element =
				'<li class="table-row  child_reg">'
				+ '<div class="col col-1" data-label="">' + val.descripcion + '</div>'
				+ '<div class="col col-2" data-label="">' + uri + '</div>'
				+ '<div class="col col-3" data-label="">' + val.fecha_alta.toString().substring(0, 10) + ' - ' + val.fecha_vencimiento.toString().substring(0, 10) + '</div>'
				+ '<div class="col col-4" data-label=""></div>'
				+ '<div class="col col-5" data-label="">' + pa_ + '</div>'
				+ '</li>';
			$("#uPa").append(element);
			mostrar("md-Vpa");


		});

	});
}

const verAp = () => {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/cActas_aprobadas", function (data) {

		$.each(data, function (key, val) {
			let uri = "";
			if (val.ubicacion == "") {
				uri = '';
			} else {
				uri = '<a target="_blank" href="https://sistemaintegral.conavi.gob.mx:81/int/' + val.ubicacion + '"><i class="gold enlace fas fa-file"></i></a>'
			}
			if (pa === 1) {
				var ap_ = '<i path_location="comeri/ActasAprobadas" table="int_cm_ap" cve="' + val.id + '" id="ap_' + val.id + '" path="' + val.ubicacion + '" nombre="' + val.descripcion + '" class="act gold enlace fas fa-sync-alt"></i>';
			}else{
				var ap_="";
			}

			let element =
				'<li class="table-row child_reg">'
				+ '<div class="col col-1" data-label="">' + val.descripcion + '</div>'
				+ '<div class="col col-2" data-label=""> ' + val.descripcion_ap + '</div>'
				+ '<div class="col col-3" data-label="">' + uri + '</div>'
				+ '<div class="col col-4" data-label="">' + val.fecha_alta.toString().substring(0, 10) + '</div>'
				+ '<div i=" class="col col-5" data-label="">' + ap_ + '</div>'
				+ '</li>';
			$("#uAp").append(element);
			mostrar("md-Vap");


		});

	});
}

const validar = (id, require) => {

	var do_ = true;

	if ($("#" + id).val().length < require) {
		$("#" + id + "-error").show();
		$("#alert-" + id + "-error").addClass("hidden");

		do_ = false;

	} else {

		$("#" + id + "-error").hide();
	}
	return do_;
}

const validarCmb = (id) => {
	var do_ = true;
	if ($("#" + id).val() == 0) {
		$("#" + id + "-error").show();
		do_ = false;

	} else {
		$("#" + id + "-error").hide();
	}

	return do_;
}


const validarArchivo = (id) => {
	var do_ = true;

	$(window).focus(function () {
		window_focus = true;
	}).blur(function () {
		window_focus = false;
	});




	var loopFocus = setInterval(function () {
		if (window_focus) {
			clearInterval(loopFocus);
			if ($('#' + id).val() === '') {
				$("#" + id + "-error").show();
				$("#alert-" + id + "-error").addClass("hidden");
				do_ = false;
			} else {
				if ($('#' + id)[0].files[0].size > 60000000) {
					//console.log("El documento excede el tamaño máximo");
					Alerta_("El archivo seleccionado<strong> Excede</strong> el limite de peso establecido!", "alertaOp alert alert-warning alert-dismissible");
					$('#' + id).val('');
					$("#" + id + "-error").show();
					do_ = false;
				} else {
					$("#" + id + "-error").hide();
				}

			}
		}
	}, 500);
	return do_
}

const validarClases = (secc) => {

	var do_ = true

	var elementos = $(".error_" + secc).map(function () {
		return this.id;
	}).get();

	for (var i = 0; i < elementos.length; i++) {
		if ($("#" + elementos[i]).css("display") == "none") {

		}
		else {
			do_ = false;
			$("#" + elementos[i].replace("-error", "")).focus();
			//scroll(elementos[i].replace("-error", ""));
			break;
		}

	}

	return do_;
}

const submitInsert = (xaction) => {




	let user = JSON.parse(localStorage.getItem('credenciales'));
	switch (xaction) {
		case "1":
			if (validarClases("pn") == false) {

			} else {
				Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nProyecto_normativo', {
					descripcion: $("#descripcion_pn").val(),
					ubicacion: "comeri/ProyectoNormativo/" + $("#archivo_pn").val().replace(/C:\\fakepath\\/i, ''),
					fecha_alta: $("#fecha_inicio_pn").val(),
					fecha_vencimiento: $("#fecha_fin_pn").val(),
					usuario: user[0].email

				}).then(
					(response) => {
						if (response.data != "") {
							Alerta_("¡Registraste un nuevo un nuevo documento con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
							submitFile("comeri/ProyectoNormativo/", "archivo_pn");
						} else {
							Alerta_("<strong>Ocurrió un error</strong> al registrar este documento.", "alertaOp alert alert-danger alert-dismissible");

						}
					},
				).catch(
					(err) => {
						//console.log(err)
					});
			}
			break;

		case "2":
			if (validarClases("sc") == false) {

			} else {
				Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nSesion', {

					descripcion: $("#descripcion_sc").val(),
					tipo_sesion: $('option:selected', "#tipo_sesion_sc").attr('value'),
					ubicacion: "comeri/Sesiones/" + $("#archivo_sc").val().replace(/C:\\fakepath\\/i, ''),
					fecha_alta: $("#fecha_inicio_sc").val(),
					usuario: user[0].email

				}).then(
					(response) => {
						if (response.data != "") {
							Alerta_("¡Registraste un nuevo un nuevo documento con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
							submitFile("comeri/Sesiones/", "archivo_sc");
						} else {
							Alerta_("<strong>Ocurrió un error</strong> al registrar este documento.", "alertaOp alert alert-danger alert-dismissible");

						}
					},
				).catch(
					(err) => {
						//console.log(err)
					});
			}
			break;

		case "3":
			if (validarClases("pa") == false) {

			} else {
				Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nProyecto_actas', {

					id_sesion: $('option:selected', "#sesion_pa").attr('value'),
					descripcion: $("#descripcion_pa").val(),
					ubicacion: "comeri/ProyectoActas/" + $("#archivo_pa").val().replace(/C:\\fakepath\\/i, ''),
					fecha_alta: $("#fecha_inicio_pa").val(),
					fecha_vencimiento: $("#fecha_fin_pa").val(),
					usuario: user[0].email

				}).then(
					(response) => {
						if (response.data != "") {
							Alerta_("¡Registraste un nuevo un nuevo documento con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
							submitFile("comeri/ProyectoActas/", "archivo_pa");
						} else {
							Alerta_("<strong>Ocurrió un error</strong> al registrar este documento.", "alertaOp alert alert-danger alert-dismissible");

						}
					},
				).catch(
					(err) => {
						//console.log(err)
					});
			}
			break;

		case "4":
			if (validarClases("ap") == false) {

			} else {
				Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nActas_aprobadas', {
					id_sesion: $('option:selected', "#sesion_ap").attr('value'),
					descripcion: $("#descripcion_ap").val(),
					ubicacionl: "comeri/ActasAprobadas/" + $("#archivo_ap").val().replace(/C:\\fakepath\\/i, ''),
					fecha_alta: $("#fecha_inicio_ap").val(),
					usuario: user[0].email



				}).then(
					(response) => {
						if (response.data != "") {
							Alerta_("¡Registraste un nuevo un nuevo documento con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
							submitFile("comeri/ActasAprobadas/", "archivo_ap");
						} else {
							Alerta_("<strong>Ocurrió un error</strong> al registrar este documento.", "alertaOp alert alert-danger alert-dismissible");

						}
					},
				).catch(
					(err) => {
						//console.log(err)
					});
			}
			break;
	}


}

const submitFile = (path_, id) => {
	var path = path_;
	var formData = new FormData();

	formData.append("file", $("#" + id)[0].files[0]);
	formData.append("path", path);

	//console.log(formData)
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/upload', formData, {
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

const limpiar = (xaction) => {
	switch (xaction) {
		case "md-pn":
			$("#descripcion_pn").val("");
			$("#archivo_pn").val("");
			$("#fecha_inicio_pn").val("");
			$("#fecha_fin_pn").val("");
			limpiar();
			break;
		case "md_sc":
			$("#descripcion_sc").val("");
			$('option:selected', "#tipo_sesion_sc").attr('value');
			$("#archivo_sc").val("");
			$("#fecha_inicio_sc").val("");

			break;
		case "md_pa":
			$("#sesion_pa").val("")
			$("#descripcion_pa").val("")
			$("#archivo_pa").val("")
			$("#fecha_inicio_pa").val("")
			$("#fecha_fin_pa").val("")
			break;
		case "md_ap":
			break;

	}
}

const load = () => {
	var refreshIntervalId = setInterval(() => {

		const script = document.createElement("script");
		script.id = "fmwk_gob";
		script.src = "https://framework-gb.cdn.gob.mx/gobmx.js";
		script.async = true;
		document.body.appendChild(script);
		let user = JSON.parse(localStorage.getItem('credenciales'));

		$.each(user, function (key, val) {
			$("#usr").text(val.nombre);
		});
		if ($('#navbarMainCollapse').length != 0) {
			clearInterval(refreshIntervalId);
			$("#fmwk_gob").remove();
		} else {
			$("#fmwk_gob").remove();
		}

		var Permisos = [];
		var Modulos = [];

		$.each(user, function (key, val) {
			Permisos = val.permisos.split(",");
			Modulos = val.modulos.split(",");
		});

		for (var i = 0; i < Modulos.length; i++) {

			if (Permisos.toString().match(Modulos[i])) {

			} else {
				$("." + Modulos[i]).remove();

				switch (Modulos[i]) {

					case "open-pn":
						pn = 0;
						break;
					case "open-sc":
						sc = 0;
						break;
					case "open-pa":
						pa = 0;
						break;
					case "open-ap":
						ap = 0;
						break;

				}
			}

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



function Comeri(props) {
	useEffect(() => {
		$('body').on('click', 'i', function (e) {
			if (e.target.className === "act gold enlace fas fa-sync-alt") {
				$('body').on('click', 'i', function (e) {
					if (e.target.className === "act gold enlace fas fa-sync-alt") {
						
						open_upd($("#" + e.target.id).attr("nombre"),
							$("#" + e.target.id).attr("cve"),
							$("#" + e.target.id).attr("table"),
							$("#" + e.target.id).attr("path"),
							$("#" + e.target.id).attr("path_location"),
							
						);

					}
				});

			}
		});

	});
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

					<div id="modal" class="modal">
						<ModalFile></ModalFile>
					</div>

					<div id="to_top" class="flotante" style={{ right: 10, zIndex: 20 }}>
						<div class="enlace bottom-buffer">
							<i onClick={() => scrollTop("bread")} style={{ fontSize: 25 }} class="fas fa-chevron-circle-up gold"></i>
						</div>
					</div>
					<div id="cont" class="container">
						<p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>
						<ol id="bread" class="breadcrumb">
							<li><a href=""><i class="icon icon-home"></i></a></li>
							<li class="enlace" onClick={inicio}>Inicio</li>
							<li class="active"><Link class="nav-link">Comeri</Link></li>
						</ol>
						<div class="menu_comeri">
							<div class="parrafo">
								<h2 id="titulo">Comité de Mejora Regulatoria Interna</h2>
								<hr class="red bottom-buffer"></hr>

								<p class="text-justify">El Comité de Mejora Regulatoria Interna de la Comisión Nacional de Vivienda, (COMERI), se establece en la CONAVI, como la instancia facultada para revisar y mejorar la regulación interna bajo criterios y elementos de simplificación y de calidad regulatoria, a fin de asegurar  la certeza jurídica y contribuir a incrementar la eficiencia y eficacia de la gestión gubernamental.</p>
								<p class="text-justify">Para el cumplimiento de su objeto, el COMERI tiene las funciones siguientes:</p>
								<p class="text-justify"><strong>I.</strong>     Acordar y coordinar acciones de mejora de las disposiciones, a efecto de contribuir a su calidad regulatoria, la reducción de cargas administrativas y al logro de los objetivos institucionales;</p>
								<p class="text-justify"><strong>II.</strong>    Revisar de forma continua y programada, con la participación de las unidades administrativas competentes, todo el marco normativo interno vigente, para asegurar su calidad regulatoria y la disminución efectiva de cargas administrativas innecesarias, buscando su estandarización y congruencia con los objetivos institucionales y las facultades y atribuciones conferidas a la institución;</p>
								<p class="text-justify"><strong>III.</strong>   Analizar y dictaminar con base en la Justificación Regulatoria, todos los proyectos normativos, a fin de contribuir a su calidad regulatoria, asegurando que sean eficaces, eficientes, consistentes y claros;</p>
								<p class="text-justify"><strong>IV.</strong>   Discutir y recomendar cambios o modificaciones a las disposiciones de carácter general que inciden en la gestión interna de la CONAVI, y cuya emisión, reforma o abrogación sea competencia de otras instituciones o áreas normativas de la Administración Pública Federal;</p>
								<p class="text-justify"><strong>V.</strong>    Difundir todas las disposiciones vigentes y los proyectos normativos, a través de la Normateca Interna, así como llevar a cabo acciones que garanticen que toda la regulación vigente está publicada de forma íntegra y completa por dicho medio;</p>
								<p class="text-justify"><strong>VI.</strong>   Aprobar en su caso, los procedimientos específicos para recibir y dictaminar los proyectos normativos, así como para hacer las convocatorias respectivas y sesionar de forma electrónica o virtual;</p>
								<p class="text-justify"><strong>VII.</strong>  Aprobar el Manual de Operación de la Normateca Interna; y</p>
								<p class="text-justify"><strong>VIII.</strong> Las demás que le encomiende el Director General de la CONAVI.</p>
								<p class="text-justify"></p>
								<p class="text-justify gold"><strong>Normatividad que lo regula:</strong></p>
								<p class="text-justify"></p>
								<p class="text-justify"><em>ACUERDO de la Junta de Gobierno de la Comisión Nacional de Vivienda número JG-22-010212-260.1, por el que se aprueban las modificaciones al diverso J6-11-150509-122 por el que se crea el Comité de Mejora Regulatoria Interna, así como los Lineamientos por los que se establece el Proceso de Calidad Regulatoria en la Comisión Nacional de Vivienda.</em></p>

								<small onClick={(e) => parrafo("1")} class="gold enlace">Ir a módulos operativos <i class="fas fa-arrow-circle-right gold" ></i></small>
							</div>
							<div class="hidden operativos">


								<div class="row">
									<div style={{ padding: 20 }}>
										<h2 id="titulo">Módulos operativos</h2>
										<hr class="red bottom-buffer"></hr>
									</div>
									<div onClick={(e) => mostrar("md-pn")} id="" class="col-md-3 bottom-buffer open-pn">
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-project-diagram gold"></i>
											<p class="card-tittle red">Agregar Proyectos Normativos</p>
										</div>
									</div>


									<div onClick={(e) => mostrar("md-sc")} id="" class="col-md-3 bottom-buffer open-sc">
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-handshake gold"></i>
											<p class="card-tittle red">Agregar Sesiones</p>
										</div>
									</div>

									<div onClick={(e) => mostrar("md-pa")} id="" class="col-md-3 bottom-buffer open-pa">
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-book-open gold"></i>
											<p class="card-tittle red">Agregar Proyecto de Actas</p>
										</div>
									</div>

									<div onClick={(e) => mostrar("md-ap")} id="" class="col-md-3 bottom-buffer open-ap">
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-check-double gold"></i>
											<p class="card-tittle red">Agregar Actas aprobadas</p>
										</div>
									</div>
								</div>
								<div class="row">
									<div style={{ padding: 20 }}>
										<h2 id="titulo">Consulta</h2>
										<hr class="red bottom-buffer"></hr>
									</div>
									<div id="" class="col-md-3 bottom-buffer" onClick={verPn}>
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-project-diagram gold"></i>
											<p class="card-tittle red">Consultar Proyectos Normativos</p>
										</div>
									</div>


									<div id="" class="col-md-3 bottom-buffer" onClick={verCs}>
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-handshake gold"></i>
											<p class="card-tittle red">Consultar Sesiones</p>
										</div>
									</div>



									<div id="" class="col-md-3 bottom-buffer" onClick={verPa}>
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-book-open gold"></i>
											<p class="card-tittle red">Consultar Proyecto de Actas</p>
										</div>
									</div>


									<div id="" class="col-md-3 bottom-buffer" onClick={verAp}>
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-check-double gold"></i>
											<p class="card-tittle red">Consultar Actas aprobadas</p>
										</div>
									</div>
									{/*
									<h2 id="titulo">Comentarios</h2>
									<hr class="red bottom-buffer"></hr>

									<div id="" class="col-md-3 bottom-buffer">
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-comments gold"></i>
											<p class="card-tittle red">Comentar Proyecto de Actas</p>
										</div>
									</div>


									<div id="" class="col-md-3 bottom-buffer">
										<div class="card">
											<i style={{ fontSize: 45 }} class="fas fa-comment-alt gold"></i>
											<p class="card-tittle red">Comentar Proyectos Normativos</p>
										</div>
									</div>
								*/}
								</div>
								<small onClick={(e) => parrafo("2")} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>
							</div>
						</div>

						<div class="modulos">
							<div class="md-pn hidden form-border open-pn">

								<h2 id="titulo">Agregar Proyectos Normativos</h2>
								<hr class="red bottom-buffer"></hr>

								<small onClick={ocultar} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>

								<p class="top-buffer-x25">Proyecto Normativo:</p>
								<div>
									<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
									<textarea maxLength="200" minLength="1"
										id="descripcion_pn"
										placeholder="Especifica el nombre del proyecto normativo"
										style={{ resize: "none" }} class='form-control  max text'
										onChange={(e) => validar(e.target.id, e.target.minLength)}
									>
									</textarea>
									<label id="descripcion_pn-error" class="error_pn error" for="descripcion_pn" >Campo requerido *</label>
								</div>

								<p class="top-buffer-x25">Archivo:</p>
								<input accept="application/pdf" id="archivo_pn" type="file" class="form-control" onClick={(e) => validarArchivo(e.target.id)} />
								<label id="archivo_pn-error" class="error_pn error" for="archivo_pn" >Campo requerido *</label>

								<p class="top-buffer-x25">Fecha Alta:</p>
								<input type="date" class="form-control datetime text" id="fecha_inicio_pn" minLength="1"
									onChange={(e) => validar(e.target.id, e.target.minLength)}></input>
								<label id="fecha_inicio_pn-error" class="error_pn error" for="fecha_inicio_pn" >Campo requerido *</label>

								<p class="top-buffer-x25">Fecha Vencimiento:</p>
								<input type="date" class="form-control datetime text" id="fecha_fin_pn" minLength="1"
									onChange={(e) => validar(e.target.id, e.target.minLength)}></input>
								<label id="fecha_fin_pn-error" class="error_pn error" for="fecha_fin_pn" >Campo requerido *</label>
								<div>
									<button onClick={(e) => submitInsert("1")} class="top-buffer btn btn-primary" >Guardar</button>
								</div>
							</div>
							<div class="md-sc hidden form-border open-sc">
								<h2 id="titulo">Agregar Sesiones</h2>
								<hr class="red bottom-buffer"></hr>
								<small onClick={ocultar} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>

								<p class="top-buffer-x25">Nombre de la Sesión:</p>
								<div>
									<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
									<textarea maxLength="200" minLength="1"
										id="descripcion_sc"
										placeholder="Especifica el nombre de la sesión"
										style={{ resize: "none" }} class='form-control  max text'
										onChange={(e) => validar(e.target.id, e.target.minLength)}
									>
									</textarea>
									<label id="descripcion_sc-error" class="error_sc error" for="descripcion_sc" >Campo requerido *</label>
								</div>

								<p class="top-buffer-x25">Tipo Sesión:</p>
								<select id="tipo_sesion_sc" class="form-control" onChange={(e) => validarCmb(e.target.id)}>
									<option value="0">--SELECCIONA--</option>
									<option value="1">ORDINARIA</option>
									<option value="2">EXTRAORDINARIA</option>
								</select>
								<label id="tipo_sesion_sc-error" class="error_sc error" for="tipo_sesion_sc" >Campo requerido *</label>

								<p class="top-buffer-x25">Archivo:</p>
								<input accept="application/pdf" id="archivo_sc" type="file" class="form-control" onClick={(e) => validarArchivo(e.target.id)} />
								<label id="archivo_sc-error" class="error_sc error" for="archivo_sc" >Campo requerido *</label>

								<p class="top-buffer-x25">Fecha Alta:</p>
								<input type="date" class="form-control datetime text" id="fecha_inicio_sc" minLength="1"
									onChange={(e) => validar(e.target.id, e.target.minLength)}></input>
								<label id="fecha_inicio_sc-error" class="error_cs error" for="fecha_inicio_sc" >Campo requerido *</label>
								<div>
									<button onClick={(e) => submitInsert("2")} class="top-buffer btn btn-primary" >Guardar</button>
								</div>
							</div>
							<div class="md-pa hidden form-border open-pa">
								<h2 id="titulo">Agregar Proyecto de Actas</h2>
								<hr class="red bottom-buffer"></hr>
								<small onClick={ocultar} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>

								<p class="top-buffer-x25">Sesión:</p>
								<select id="sesion_pa" class="form-control" onChange={(e) => validarCmb(e.target.id)}>
									<option value="0">--SELECCIONA--</option>
								</select>
								<label id="sesion_pa-error" class="error_pa error" for="sesion_pa" >Campo requerido *</label>

								<p class="top-buffer-x25">Nombre del Proyecto de Acta:</p>
								<div>
									<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
									<textarea maxLength="200" minLength="1"
										id="descripcion_pa"
										placeholder="Especifica el nombre del proyecto de acta"
										style={{ resize: "none" }} class='form-control  max text'
										onChange={(e) => validar(e.target.id, e.target.minLength)}
									>
									</textarea>
									<label id="descripcion_pa-error" class="error_pa error" for="descripcion_pa" >Campo requerido *</label>
								</div>

								<p class="top-buffer-x25">Archivo:</p>
								<input accept="application/pdf" id="archivo_pa" type="file" class="form-control" onClick={(e) => validarArchivo(e.target.id)} />
								<label id="archivo_pa-error" class="error_pa error" for="archivo_pa" >Campo requerido *</label>

								<p class="top-buffer-x25">Fecha Alta:</p>
								<input type="date" class="form-control datetime text" id="fecha_inicio_pa" minLength="1"
									onChange={(e) => validar(e.target.id, e.target.minLength)}></input>
								<label id="fecha_inicio_pa-error" class="error_pa error" for="fecha_inicio_pa" >Campo requerido *</label>

								<p class="top-buffer-x25">Fecha Vencimiento:</p>
								<input type="date" class="form-control datetime text" id="fecha_fin_pa" minLength="1"
									onChange={(e) => validar(e.target.id, e.target.minLength)}></input>
								<label id="fecha_fin_pa-error" class="error_pa error" for="fecha_fin_pa" >Campo requerido *</label>
								<div>
									<button onClick={(e) => submitInsert("3")} class="top-buffer btn btn-primary" >Guardar</button>
								</div>
							</div>
							<div class="md-ap hidden form-border open-ap">
								<h2 id="titulo">Agregar Actas Aprobadas</h2>
								<hr class="red bottom-buffer"></hr>
								<small onClick={ocultar} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>

								<p class="top-buffer-x25">Sesión:</p>
								<select id="sesion_ap" class="form-control" onChange={(e) => validarCmb(e.target.id)}>
									<option value="0">--SELECCIONA--</option>
								</select>
								<label id="sesion_ap-error" class="error_ap error" for="sesion_ap" >Campo requerido *</label>

								<p class="top-buffer-x25">Nombre de Acta:</p>
								<div>
									<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
									<textarea maxLength="200" minLength="1"
										id="descripcion_ap"
										placeholder="Especifica el nombre del acta"
										style={{ resize: "none" }} class='form-control  max text'
										onChange={(e) => validar(e.target.id, e.target.minLength)}
									>
									</textarea>
									<label id="descripcion_ap-error" class="error_ap error" for="descripcion_ap" >Campo requerido *</label>
								</div>

								<p class="top-buffer-x25">Archivo:</p>
								<input accept="application/pdf" id="archivo_ap" type="file" class="form-control" onClick={(e) => validarArchivo(e.target.id)} />
								<label id="archivo_ap-error" class="error_ap error" for="archivo_ap" >Campo requerido *</label>

								<p class="top-buffer-x25">Fecha Alta:</p>
								<input type="date" class="form-control datetime text" id="fecha_inicio_ap" minLength="1"
									onChange={(e) => validar(e.target.id, e.target.minLength)}></input>
								<label id="fecha_inicio_ap-error" class="error_ap error" for="fecha_inicio_ap" >Campo requerido *</label>
								<div>
									<button onClick={(e) => submitInsert("4")} class="top-buffer btn btn-primary" >Guardar</button>
								</div>
							</div>

							<div id="md-Vpn" class="md-Vpn form-border hidden">
								<h2 id="titulo">Consultar Proyectos Normativos</h2>
								<hr class="red bottom-buffer"></hr>
								<small onClick={ocultar} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>
								<div class="row" style={{ padding: 10 }}>
									<ul id="uPn" class="responsive-table ul-responsive">
										<li class="table-header">
											<div class="col col-1">Descripción</div>
											<div class="col col-2">Documento</div>
											<div class="col col-3">Vigencia desde</div>
											<div class="col col-4">Ver comentarios</div>
											<div class="col col-5"></div>
										</li>
									</ul>

								</div>
							</div>

							<div id="md-Vsc" class="md-Vsc form-border hidden">
								<h2 id="titulo">Consultar Sesiones</h2>
								<hr class="red bottom-buffer"></hr>
								<small onClick={ocultar} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>
								<div class="row" style={{ padding: 10 }}>
									<ul id="uCs" class="responsive-table ul-responsive">
										<li class="table-header">
											<div class="col col-1">Sesión</div>
											<div class="col col-2">Documento</div>
											<div class="col col-3">Vigencia desde</div>
											<div class="col col-4">Tipo</div>
											<div class="col col-5"></div>
										</li>
									</ul>

								</div>
							</div>

							<div id="md-Vpa" class="md-Vpa form-border hidden">
								<h2 id="titulo">Consultar Proyecto de Actas</h2>
								<hr class="red bottom-buffer"></hr>
								<small onClick={ocultar} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>
								<div class="row" style={{ padding: 10 }}>
									<ul id="uPa" class="responsive-table ul-responsive">
										<li class="table-header">
											<div class="col col-1">Sesion</div>
											<div class="col col-2">Descripción</div>
											<div class="col col-3">Vigencia</div>
											<div class="col col-4">Ver Opiniones</div>
											<div class="col col-5"></div>
										</li>
									</ul>

								</div>
							</div>

							<div id="md-Vap" class="md-Vap form-border hidden">
								<h2 id="titulo">Consultar Actas Aprobadas</h2>
								<hr class="red bottom-buffer"></hr>
								<small onClick={ocultar} class="gold enlace"><i class="fas fa-undo-alt gold" ></i> Regresar</small>
								<div class="row" style={{ padding: 10 }}>
									<ul id="uAp" class="responsive-table ul-responsive">
										<li class="table-header">
											<div class="col col-1">Sesion</div>
											<div class="col col-2">Descripción</div>
											<div class="col col-3">Documento</div>
											<div class="col col-4">Vigencia desde</div>
											<div class="col col-5"></div>
										</li>
									</ul>
								</div>
							</div>
						</div>
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

export default Comeri;