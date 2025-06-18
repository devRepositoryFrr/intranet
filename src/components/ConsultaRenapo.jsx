import $, { each } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'
import { Link } from "react-router-dom";
import Axios from 'axios';
import Alerta from './Alerta';
import Alerta_ from '../assets/js/Alerta';
import { useEffect } from 'react';
import '../assets/css/checks.css'
import https from 'https'


var email = "";
var is_restrict = "";
Axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
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

function btn(xaction) {
	switch (xaction) {
		case "1":
			$("#curps").prop("disabled", true);
			$("#btnConsultar").text("");
			$("#btnConsultar").append('<i id="iConsultar" class="fad fa-spinner fa-pulse"></i>');
			$("#btnConsultar").prop("disabled", true);
			break;
		case "2":
			$("#btnConsultar").text("");
			$("#btnConsultar").append('Consultar');
			$("#btnConsultar").prop("disabled", false);
			$("#curps").prop("disabled", false);
			$("#curps").val("");
			break;

	}
}

function consulta() {

	let usr = JSON.parse(localStorage.getItem('credenciales'));

	let user = usr[0].email;

	var bodyFormData = new FormData();


	bodyFormData.append("user", user);
	bodyFormData.append("file", $("#file")[0].files[0]);




	console.log(bodyFormData)
	btn("1");

	const agent = new https.Agent({
		rejectUnauthorized: false
	});

	Axios.post('https://apisconavi.conavi.gob.mx:9090/API/RENAPO/consultacurpconavi',
		bodyFormData, {
		headers: { "Content-Type": "multipart/form-data" },
		httpsAgent: agent,
		responseType: 'blob'
	}
	).then(
		(response) => {
			if (response.data != "") {

				Alerta_("La consulta finalizo con<strong> éxito</strong>", "alertaOp alert alert-success alert-dismissible");


				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'CONSULTA RENAPO.xlsx'); //or any other extension
				document.body.appendChild(link);
				link.click();

			} else {
				Alerta_("<strong>Ocurrió un error</strong> al consultar.", "alertaOp alert alert-danger alert-dismissible");

			}
			btn("2");
		},
	).catch(

		(err) => {
			btn("2");
			console.log(err)
		});
}


function ConsultaRenapo(props) {
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
				if (Modulos[i] == "cns-renapo") {
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
						<li class="active"><Link class="nav-link">Consulta Masiva RENAPO</Link></li>
					</ol>

					<h3>Consulta Masiva RENAPO</h3>
					<hr class="red"></hr>
					<input id="file" type="file" class="form-control">

					</input>


					<button id="btnConsultar" onClick={consulta} class="btn btn-primary">Consultar</button>
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




export default ConsultaRenapo;