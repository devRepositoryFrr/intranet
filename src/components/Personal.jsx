import $, { each } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'
import { useEffect } from 'react';
import Axios from 'axios';
import Alerta from './Alerta';
import '../assets/css/scroll.css';
import '../assets/css/navbar.css';
import '../assets/css/modal_.css';
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
let val = 0;
const user = getUserCredenciales();

var modal =
	'<div class="modal-content">' +
	'<div class="modal-header">' +
	'<h4 class="modal-title-"><i class="fas fa-users-medical"></i>Nuevo puesto</h4>' +
	'</div>' +
	'<div class="modal-body">' +
	'<input type="hidden" id="sp" value="sp_insert_tp"></input>' +
	'<input type="hidden" id="api" value="insert_tp"></input>' +
	'<small>Describe el puesto</small>' +
	'<textarea type="text" id="puesto" class="form-control top-buffer-x15"></textarea>' +
	'</div>' +
	'<div class="modal-footer">' +
	'<button id="mdlCerrar" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>' +
	'<button id="add_psto" type="button" class="btn btn-primary">Guardar</button>' +
	'</div>' +
	'</div>';


function nw_puesto() {
	$(".modal-content").remove();
	$(".modal-dialog").append(modal);
}

function puestos_areas() {
	if (val === 0) {
		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/busca_area/", function (data_area) {
			$.each(data_area, function (key, val) {
				$("#area").append('<option value="' + val.id + '">' + val.descripcion + '</option>');

			});
		});

		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/busca_puesto/", function (data_puesto) {
			$.each(data_puesto, function (key, val) {
				$("#txtpuesto").append('<option class="" value="' + val.id + '">' + val.descripcion + '</option>');
			});
		});
	}
	val = 1;
}

function inexistente(xaction) {
	if (xaction == "1") {
		$('#email').val("");
	}

	$('#nombre').val("");
	$('#area').val("0");
	$('#puesto').val("0");
	$('#fecha_nacimiento').val("");
	$('#lugar_nacimiento').val("0");
	$('#formacion_academica').val("");
	$('#extension').val("");
	$('#genero').val("0");
	$('#tipo').val("0");
	$('#foto_persona').val("");
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

const buscar_usuario = (xaction) => {

	if (xaction == "1") {
		let existe = "";
		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/busca_usuario/" + $("#buscar").val(), function (data) {
			if (data != "") {
				$("#form_modif").removeClass("hidden");
			} else {
				Alerta_("<p style='text-align: center'>El usuario que intenta buscar <strong>no existe.</strong></p>", "alertaOp alert alert-danger");
				inexistente(xaction);
				$("#form_modif").addClass("hidden");


			}
			$.each(data, function (key, val) {

				$.each(val, function (i, item) {
					try {
						if (i == "fecha_nacimiento") {
							$("#" + i).val(item.toString().substring(0, 10));
						} else {
							$("#" + i).val(item.toString());
						}

						if (i == "cve_bajal") {
							if (item == "A") {
								$("#cve_b").removeClass("hidden");
								$("#cve_a").addClass("hidden");

							} else {
								$("#cve_a").removeClass("hidden");
								$("#cve_b").addClass("hidden");

							}
						}

					} catch (e) {

					}


				});

			});



		});
	} else {

		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/busca_usuario/" + $("#email").val(), function (data) {
			if (data != "") {
				Alerta_("<p style='text-align: center'>Este usuario <strong>ya existe.</strong></p>", "alertaOp alert alert-info");
				$.each(data, function (key, val) {

					$.each(val, function (i, item) {
						try {
							if (i == "fecha_nacimiento") {
								$("#" + i).val(item.toString().substring(0, 10));
							} else {
								$("#" + i).val(item.toString());
							}

						} catch (e) {

							$("#" + i).val("");

						}


					});

				});

			} else {
				inexistente(xaction);

			}




		});
	}

}

const validar_campos = () => {

	let objForm = $('#nuevo_usuario').serializeToJSON();

	$.each(objForm, function (key, val) {
		$.each(val, function (i, item) {
			if ($("#" + i).val() == "" || $("#" + i).val() == "0") {
				$("#" + i).focus();
				$("." + i).addClass("error")
				return false;
			} else {

				$("." + i).removeClass("error")
			}

		});
	});

	$.each(objForm, function (key, val) {
		$.each(val, function (i, item) {

			if ($("#" + i).val() == "" || $("#" + i).val() == "0") {
				$("." + i).addClass("error")

			} else {
				$("." + i).removeClass("error")
			}

		});
	});

	if ($('.error').length < 1) {
		submitInsert(objForm);
	} else {

	}
}

const submitInsert = (obj) => {
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/update_personal', {
		email: obj.frm.email,
		nombre: obj.frm.nombre,
		area: obj.frm.area,
		puesto: obj.frm.puesto,
		fecha_nacimiento: obj.frm.fecha_nacimiento,
		lugar_nacimiento: obj.frm.lugar_nacimiento,
		formacion_academica: obj.frm.formacion_academica,
		extension: obj.frm.extension,
		genero: obj.frm.genero,
		tipo: obj.frm.tipo
	}).then(
		(response) => {
			if (response.data != "") {

				Alerta_("¡Registraste un nuevo un nuevo elemento con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
				if ($('#foto_persona').get(0).files.length === 0) {
					inexistente("1");
				} else {
					submitFile(obj.frm.email);
				}

			} else {
				Alerta_("<strong>Ocurrió un error</strong> al registrar este elemento.", "alertaOp alert alert-danger alert-dismissible");

			}
		},
	).catch(

		(err) => {

			//console.log(err)
		});

};

const submitFile = (path_) => {

	var path = "foto_personal/" + path_ + ".jpg";
	var formData = new FormData();
	console.log(path)
	formData.append("file", $("#foto_persona")[0].files[0]);
	formData.append("path", path);

	//console.log(formData)
	let url = "https://sistemaintegral.conavi.gob.mx:81/api/upload_"
	//let url="http://localhost:3001/api/upload_";
	Axios.post(url, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(
		(response) => {

		},
	).catch(

		(err) => {

			console.log(err)
		});
	inexistente("1");
};

const nuevo = () => {
	inexistente("1");
	$("#form_modif").removeClass("hidden");
}

const submitStatus = (status) => {
	var accion = "";
	var accion_e = "";
	if (status == "A") {
		accion = "activado";
		accion_e = "activar";
	} else {
		accion = "desactivado";
		accion_e = "desactivar";
	}
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/baja_personal', {
		email: $("#email").val(),
		status: status
	}).then(
		(response) => {
			if (response.data != "") {

				Alerta_("¡El usuario fue " + accion + " con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
				if (status == "A") {
					$("#cve_b").removeClass("hidden");
					$("#cve_a").addClass("hidden");

				} else {
					$("#cve_a").removeClass("hidden");
					$("#cve_b").addClass("hidden");

				}
			} else {
				Alerta_("<strong>Ocurrió un error</strong> al " + accion_e + " este usuario.", "alertaOp alert alert-danger alert-dismissible");

			}
		},
	).catch(

		(err) => {
			inexistente("1");
			//console.log(err)
		});

};

function insertar(descripcion) {

	//Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nw_puesto', {
	Axios.post('http://localhost:3001/api/nw_puesto', {
		descripcion: descripcion

	}).then(
		(response) => {
			if (response.data != "") {
				new Alerta_("¡El <strong>puesto fue registrado</strong> de manera correcta!", "alertaOp alert alert-success alert-dismissible");
				$("#mdlCerrar").trigger("click");
				$(".puesto_opt").remove()
				$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/busca_puesto/", function (data_puesto) {
					$.each(data_puesto, function (key, val) {
						$("#puesto").append('<option class="puesto_opt" value="' + val.id + '">' + val.descripcion + '</option>');
					});
				});

			} else {
				new Alerta_("Ocurrió <strong>un error</strong> al intentar registrar este puesto", "alertaOp alert alert-danger alert-dismissible");
				$(".puesto_opt").remove()
			}
		},

	).catch(
		(err) => {

		});
	
}

function Personal(props) {

	useEffect(() => {
		const user = getUserCredenciales();
  	  	if (!user) {
     	 window.location.href = "/int/#/";
    	  return;}
		puestos_areas();
		$(".modal").on("click", "#add_psto", function () {

			insertar($("#txtpuesto").val());
		});


	});

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

	if (is_restrict == "SI") {
		out();
	}
	else if (!user) {
		out();
		return (
			<header></header>
		);
	} else if (user) {
		load();
		
		return (
			<div className="Inicio">
				<header>


					<Accesibilidad />
					<Alerta />
					<GaleriaHeader />


					<div class="modal fade" id="mdl">
						<div class="modal-dialog">

						</div>
					</div>

					<div id="cont" class="container">
						<p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>
						<ol class="breadcrumb">
							<li><a href=""><i class="icon icon-home"></i></a></li>
							<li class="enlace" onClick={inicio}>Inicio</li>
							<li class="active"><Link class="nav-link">Modificación de personal</Link></li>
						</ol>

						<div class="row">
							<div class="col-md-4">
								<div onClick={nuevo} class="enlace">
									<i style={{ fontSize: 20 }} class="gold fas fa-plus-circle">
									</i> <strong>Nuevo elemento</strong>
								</div>
							</div>
							<div class="col-md-8">
								<div class="input-group">
									<input id="buscar" type="text" placeholder="Buscar por email" class="form-control" />
									<span onClick={() => buscar_usuario("1")} class="enlace input-group-addon" style={{ backgroundColor: "#a38358", color: "#fff" }}>
										<i class="glyphicon glyphicon-search"></i>
									</span>
								</div>
							</div>
						</div>

						<div id="form_modif" class="top-buffer hidden">
							<form id="nuevo_usuario">
								<div class="row">
									<div id="cve_b" class="col-md-6 bottom-buffer-x15  hidden"><button onClick={() => submitStatus("B")} class="btn-xs btn-primary" type="button">
										Desactivar
										<span class="bootstrap-icons" aria-hidden="true"> <i class="fas fa-times-circle"></i></span>
									</button></div>
									<div id="cve_a" class="col-md-6 bottom-buffer-x15 hidden"><button onClick={() => submitStatus("A")} class="btn-xs btn-primary activar " type="button">
										Activar
										<span class="bootstrap-icons" aria-hidden="true"> <i class="fas fa-check-circle"></i></span>
									</button></div>
								</div>
								<div class="row">
									<div class="col-md-6"><small>Correo electrónico <strong class="email req">*</strong></small><input onBlur={() => buscar_usuario("2")} type="text" class="form-control" id="email" name="frm.email" placeholder="Correo electrónico" /></div>
									<div class="col-md-6"><small>Nombre <strong class="nombre req">*</strong></small><input type="text" class="form-control" id="nombre" name="frm.nombre" placeholder="Nombre" /></div>
									<div class="col-md-6"><small >Área <strong class="area req">*</strong></small><select id="area" name="frm.area" class="form-control"><option value="0">--Seleccione área--</option></select></div>
									<div class="col-md-6"><small>Puesto <strong class="puesto req">*  </strong>{/*<i data-toggle="modal" data-target="#mdl" onClick={nw_puesto} class="fas fa-plus-circle enlace"></i>*/} </small><select id="txtpuesto" name="frm.puesto" class="form-control"><option value="0">--Seleccione puesto--</option></select></div>
									<div class="col-md-6"><small>Fecha de nacimiento <strong class="fecha_nacimiento req">*</strong></small><input type="date" class="form-control" id="fecha_nacimiento" name="frm.fecha_nacimiento" placeholder="Fecha de nacimiento" /></div>
									<div class="col-md-6"><small>Lugar de nacimiento <strong class="lugar_nacimiento req">*</strong></small><select class="form-control" id="lugar_nacimiento" name="frm.lugar_nacimiento" placeholder="Lugar de nacimiento"><option value="0">--Seleccione lugar de nacimiento--</option><option value="1">Aguascalientes</option><option value="2">Baja California</option><option value="3">Baja California Sur</option><option value="4">Campeche</option><option value="5">Coahuila</option><option value="6">Colima</option><option value="7">Chiapas</option><option value="8">Chihuahua</option><option value="9">Ciudad De México</option><option value="10">Durango</option><option value="11">Guanajuato</option><option value="12">Guerrero</option><option value="13">Hidalgo</option><option value="14">Jalisco</option><option value="15">México</option><option value="16">Michoacán</option><option value="17">Morelos</option><option value="18">Nayarit</option><option value="19">Nuevo León</option><option value="20">Oaxaca</option><option value="21">Puebla</option><option value="22">Querétaro</option><option value="23">Quintana Roo</option><option value="24">San Luis Potosí</option><option value="25">Sinaloa</option><option value="26">Sonora</option><option value="27">Tabasco</option><option value="28">Tamaulipas</option><option value="29">Tlaxcala</option><option value="30">Veracruz</option><option value="31">Yucatán</option><option value="32">Zacatecas</option><option value="33">Nacido En El Extranjero</option><option value="99">Ninguno</option></select></div>
									<div class="col-md-6"><small>Formación académica <strong class="formacion_academica req">*</strong></small><input type="text" class="form-control" id="formacion_academica" name="frm.formacion_academica" placeholder="Formación académica" /></div>
									<div class="col-md-6"><small>Extensión </small><input type="text" class="form-control" id="extension" name="frm.extension" placeholder="Extensión" /></div>
									<div class="col-md-6"><small>Género <strong class="genero req">*</strong></small><select id="genero" name="frm.genero" class="form-control"><option value="0">--Seleccione género--</option><option value="H">Hombre</option><option value="M">Mujer</option></select></div>
									<div class="col-md-6"><small>Tipo <strong class="tipo req">*</strong></small><select class="form-control" id="tipo" name="frm.tipo" placeholder="Tipo"><option value="0">--Seleccione tipo--</option><option value="1">Estructura</option><option value="2">Prestador de servicios</option></select></div>

									<div class="col-md-12"><small>Foto </small><input type="file" accept=".jpg" id="foto_persona" class="form-control" /></div>

									<div class="col-md-6 top-buffer"><button onClick={validar_campos} class="btn btn-primary" type="button">
										Guardar
										<span class="bootstrap-icons" aria-hidden="true"> <i class="fas fa-share-square"></i></span>
									</button></div>
								</div>

							</form>

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

export default Personal;	