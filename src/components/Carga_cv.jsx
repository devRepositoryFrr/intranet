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
var is_restrict = "";

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
		let user = JSON.parse(localStorage.getItem('credenciales'));

		$.each(user, function (key, val) {
			email=val.nombre;
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

const submitFile = (path) => {
	var formData = new FormData();

	formData.append("file", $("#file")[0].files[0]);
	formData.append("path", path+".pdf");
	
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/upload_', formData, {
	//Axios.post('http://localhost:3001/api/upload_', formData, {

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

};

const submitInsert = (nombre, genero, escolaridad, experiencia, created_by, path) => {
	let do_ = true;
	Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/send_candidatos', {
	//Axios.post('http://localhost:3001/api/send_candidatos', {
		nombre: nombre,
		genero: genero,
		escolaridad: escolaridad,
		experiencia: experiencia,
		created_by: email,
		path: path


	}).then(
		(response) => {
			if (response.data != "") {
				Alerta_("¡Registraste un nuevo un nuevo candidato con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
				submitFile("candidatos/" + path + "")
				$("#pst_nombre").val("");
				$("#pst_genero").val("0").change();
				$("#pst_escolaridad").val("");
				$("#pst_experiencia").val("0").change();
				$("#file").val("");
			} else {
				Alerta_("<strong>Ocurrió un error</strong> al registrar este candidato.", "alertaOp alert alert-danger alert-dismissible");
				do_ = false;
			}
		},
	).catch(

		(err) => {

			//console.log(err)
		});
	return do_;
};

function validar_campos() {
	let pst_nombre = $("#pst_nombre").val();
	let pst_genero = $("#pst_genero option:selected").val();
	let pst_escolaridad = $("#pst_escolaridad").val();
	let pst_experiencia = $("#pst_experiencia option:selected").val();

	let file = pst_nombre.replaceAll(" ","_") + "_" + pst_genero + "_" + pst_escolaridad.replaceAll(".","").replaceAll(" ","_");
	console.log(file)
	if ($("#pst_nombre").val() == "") {
		$("#pst_nombre").focus();
		return;
	}
	if ($("#pst_genero option:selected").val() == "0") {
		$("#pst_genero").focus();
		return;
	}
	if ($("#pst_escolaridad").val() == "") {
		$("#pst_escolaridad").focus();
		return;
	}
	if ($("#pst_experiencia option:selected").val() == "0") {
		$("#pst_experiencia").focus();
		return;
	}
	if ($("#file").val() == "") {
		$("#file").focus();
		return;
	}

	submitInsert(pst_nombre, pst_genero, pst_escolaridad, pst_experiencia, "", file)

}


function CargaCV(props) {


	useEffect(() => {

		const isLogged = localStorage.getItem('credenciales');

		var Permisos = [];
		var Modulos = [];
		var user = JSON.parse(localStorage.getItem('credenciales'));

		$.each(user, function (key, val) {
			Permisos = val.permisos.split(",");
			Modulos = val.modulos.split(",");
		});


		for (var i = 0; i < Modulos.length; i++) {

			if (Permisos.toString().match(Modulos[i])) {

			} else {
				$("." + Modulos[i]).remove();

				if (Modulos[i] == "adms-post") {
					inicio();
				}
			}

		}

		if (is_restrict == "SI") {
			out();
		}
		if (!isLogged) {
			out();
		} else if (isLogged) {
			load();
		}
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
						<li class="active"><Link class="nav-link">Carga de candidatos</Link></li>
					</ol>
					<div id="send" class="hidden flotante send" style={{ right: 50, zIndex: 9999 }}>
						<div class="bottom-buffer" style={{ cursor: "pointer" }}>
							<i class="fas fa-paper-plane"></i>
						</div>
					</div>


					<div>

						<div class="col-md-6"><small>Nombre del candidato <strong class="pst_nombre req">*</strong></small><input type="text" class="form-control" id="pst_nombre" name="frm.pst_nombre" placeholder="Nombre del candidato" /></div>
						<div class="col-md-6"><small>Género candidato <strong class="pst_genero req">*</strong></small><select class="form-control" id="pst_genero" name="frm.pst_genero" >
							<option value="0">--Seleccione--</option>
							<option value="H">Hombre</option>
							<option value="M">Mujer</option>


						</select></div>
						<div class="col-md-6"><small>Escolaridad del candidato <strong class="pst_escolaridad req">*</strong></small><input type="text" class="form-control" id="pst_escolaridad" name="frm.pst_escolaridad" placeholder="Escolaridad del candidato" /></div>

						<div class="col-md-6"><small>Años de experiencia del candidato <strong class="pst_experiencia req">*</strong></small><select class="form-control" id="pst_experiencia" name="frm.pst_experiencia" >
							<option value="0">--Seleccione--</option>
							<option value="1">1 año</option>
							<option value="2">2 años</option>
							<option value="3">3 años</option>
							<option value="4">4 años</option>
							<option value="5">5 años</option>
							<option value="6">6 años</option>
							<option value="7">7 años</option>
							<option value="8">8 años</option>
							<option value="9">9 años</option>
							<option value="10">10 años</option>
							<option value="11">11 años</option>
							<option value="12">12 años o más</option>

						</select></div>
						<div class="col-md-12"><small>Documento CV<strong class="documento req">*</strong></small><input class="form-control" id="file" type="file" accept="application/pdf" name="file" /></div>
						<div class="col-md-4 top-buffer">
							<div class="input-group">
								<button onClick={validar_campos} class="btn-primary btn">Subir</button>
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


export default CargaCV;