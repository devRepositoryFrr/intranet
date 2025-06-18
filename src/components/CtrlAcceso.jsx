import $, { each, valHooks } from 'jquery';
import Accesibilidad from './Accesibilidad.js'
import GaleriaHeader from './GaleriaHeader.js'
import { useEffect } from 'react';
import Axios from 'axios';
import Alerta from './Alerta.jsx';
import '../assets/css/scroll.css';
import '../assets/css/navbar.css';
import '../assets/css/modal.css';
import '../assets/css/content.css';
import '../assets/css/notificacion.css';
import '../assets/css/listas.css';
import '../assets/css/datepicker.css';
import '../assets/css/emergente.css';
import '../assets/js/soporte.js';
import '../assets/js/jquery.serializeToJSON.js'
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "datatables.net-dt/js/dataTables.dataTables"
import 'datatables.net-buttons-dt'
import Alerta_ from '../assets/js/Alerta.js';

import { Redirect, Link, useHistory } from "react-router-dom";
import Inicio from './Inicio.jsx';
const FileDownload = require('js-file-download');
var xlsx = require("xlsx");
var user = '';
var api_cnfg = "https://sistemaintegral.conavi.gob.mx:81";
//var api_cnfg = "http://localhost:3001";
var dt = null;
var json;
var lang = {
	"sProcessing": "Procesando...",
	"sLengthMenu": "Mostrar _MENU_ registros",
	"sZeroRecords": "No se encontraron resultados",
	"sEmptyTable": "Ningún dato disponible en esta tabla",
	"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
	"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix": "",
	"sSearch": "Buscar:",
	"sUrl": "",
	"sInfoThousands": ",",
	"sLoadingRecords": "Cargando...",
	"oPaginate": {
		"sFirst": "Primero",
		"sLast": "Último",
		"sNext": "Siguiente",
		"sPrevious": "Anterior"
	},
	"oAria": {
		"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
	}
};

function tabla(json) {
	dt = $("#tblAcceso").DataTable({
		"destroy": true,
		"bDestroy": true,
		"colReorder": true,
		scrollCollapse: true,
		scrollY: '50vh',
		"paging": true, // disable paging
		pageLength: 5,
		"deferRender": true, // enable virtual scrolling
		"fixedHeader": true,
		"bInfo": false,

		data: json,
		columns: [

			//{data: 'Folio'},
			{ data: 'Fecha' },
			{ data: 'Email' },
			{ data: 'Nombre' },
			{ data: 'Cargo_del_solicitante' },
			{ data: 'Nombre_del_visitante' },
			{ data: 'Fecha_de_visita' },
			{ data: 'Area_de_visita' },
			//{data: 'Area_del_solicitante'},
			//{data: 'Tipo_de_personal'},
			//{data: 'Ingresa_con_vehiculo'},
			//{data: 'Datos_del_vehiculo'},
			//	{data: 'Email_del_visitante'},
			// {data: 'Celular_del_visitante'},
			//{data: 'Observaciones'}       
		],
		language: lang


	});
}

function getAcceso() {
	var user = JSON.parse(localStorage.getItem('credenciales'));
	let mes = $("#cmbMes").val();
	//console.log("acceso")
	//console.log(mes)

	Axios.get(api_cnfg + "/api/CtrlAcceso").then((res) => {
		json = res.data[0];
		$.each(res.data, function (index, a) {
			//console.log(a[1])
			//json = a
		});
		console.log(json);
		tabla(json)



		

		//console.log("tabla: ",dt)
	});



}

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

		user = JSON.parse(localStorage.getItem('credenciales'));
		//console.log(user);
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
	$("#btnExport").hide();
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







function CtrlAcceso(props) {

	useEffect(() => {
		//console.log("Entro")
		getAcceso();
		visita($("#usr").text());
		let el = document.getElementById("bread");
		el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

		const isLogged = localStorage.getItem('credenciales');

		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_visitas_igsu", function (data) {

			var items = [];

			$.each(data, function (key, val) {
				var num = val.visitas;
				$("#visitas").text(Number(num).toLocaleString('en'));

			});

		});



		if (!isLogged) {

			out();

		} else if (isLogged) {
			load();

		}

	});
	const limpiar = () => {

		$("#content-asis").css("display", "none");
		$('html').css("overflow", "");
		$("#cmbMes option[value=0]").prop('selected', true);
		$('#tblAcceso').DataTable().clear().destroy();
	}
	const chMes = () => {

		const d = new Date();
		//console.log(d)
		let month = d.getMonth() + 1;
		let mes = $("#cmbMes").val();
		let jsonFilt;

		jsonFilt = $(json).filter(function (i, n) {
			return n.mes == mes;
		});
         if(mes==0){
			tabla(json)
		 }else{
			tabla(jsonFilt)
		 }
		
		

		console.log(jsonFilt);

		//getAcceso();
	}





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
						<li class="active"><Link class="nav-link">Control de Acceso</Link></li>
					</ol>

					<div class="flotante" style={{ right: 0, zIndex: 20 }}>
						<div class="stat">
							<span id="visitas" class="stat-count"><i class="fas fa-spinner fa-spin"></i></span>
							<p class="stat-detail">Visitantes</p>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label class="control-label" for="cmbMes">Mes:</label>
							<select class="input-sm form-control" id="cmbMes"
								onChange={(e) => chMes(e.target.id)}>
								<option value="0">--SELECCIONA--</option>
								<option value="1">Enero</option>
								<option value="2">Febrero</option>
								<option value="3">Marzo</option>
								<option value="4">Abril</option>
								<option value="5">Mayo</option>
								<option value="6">Junio</option>
								<option value="7">Julio</option>
								<option value="8">Agosto</option>
								<option value="9">Septiembre</option>
								<option value="10">Octubre</option>
								<option value="11">Noviembre</option>
								<option value="12">Diciembre</option>
							</select>

						</div>
					</div>

					<a href='https://sistemaintegral.conavi.gob.mx:81/api/rep_materiales/sp_get_Sacceso' target={"_blank"} type='button' ><i class="fa fa-download btn btn-primary pull-right " aria-hidden="true" ></i></a>


					<table class="table-bordered table-detail  center " id="tblAcceso" style={{ width: "100%" }} >
						<thead>
							<tr class="">

								<th>Fecha</th>
								<th>Email</th>
								<th>Nombre</th>
								<th>Cargo del solicitante</th>
								<th>Nombre del visitante</th>
								<th>Fecha de visita</th>
								<th>Area de visita</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
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

export default CtrlAcceso;