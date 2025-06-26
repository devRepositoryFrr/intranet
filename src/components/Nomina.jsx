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
var table;
var d;
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


function getAreas() {
	$(".opt_area").remove();
	$.getJSON(api_cnfg + "/api/getAreas/", function (data) {
		$.each(data, function (key, val) {
			$("#cmbArea").append('<option class="opt_area" value="' + val.id + '">' + val.descripcion + '</option>')
		});
	});
}

function consultar() {
	let area = $("#cmbArea").val();
	let mes = $("#cmbMes").val();
	//console.log(area,"-",mes)
	//Agrupamiento Master Detail
	if (area != 0 || mes != 0) {

		Axios.get(api_cnfg + "/api/getAsistencias/" + area + "/" + mes).then((res) => {
			const data = res.data;

			const result = Object.entries(data.reduce((acc, { nombre, asistencia, fecha, entrada, salida, incidencia, area }) =>
				(acc[nombre] = [...(acc[nombre] || []), { nombre, asistencia, fecha, entrada, salida, incidencia, area }], acc)
				, {})).map(([key, value]) => ({ nombre: key, asistencia: value }));

			//console.log(result);

			$.each(result, function (key, val) {
				$.each(val.asistencia, function (i, a) {
					//console.log(a.asistencia)

					if (a.asistencia == "Sistema")
						a.incidencia = "Falta";
				});
			});
			json = result;
			//table.clear().destroy();

			table = $("#tblAsistencia").DataTable({
				bDestroy: true,
				columns: [
					{
						className: 'dt-control',
						orderable: false,
						data: null,
						defaultContent: '',
					}, { data: "nombre" },
				],
				data: result,
				order: [[1, 'asc']],
				language: lang


			});
			// Add event listener for opening and closing details
			$('#tblAsistencia tbody')
				.off('click')
				.on('click', 'td.dt-control', function () {
					var tr = $(this).closest('tr');
					var row = table.row(tr);

					if (row.child.isShown()) {
						//console.log('close child');
						// This row is already open - close it
						row.child.hide();
						tr.removeClass('shown');
					}
					else {
						// Open this row
						//console.log('open child');
						row.child(format(row.data())).show();
						tr.addClass('shown');
					}
				});
		});
		$("#btnExport").show();

	}



}

// Formatting function for row details - modify as you need
function format(d) {
	let color = '';
	var dataHeader = '';
	dataHeader += '<table class="table table-responsive table-detail" id="tDetail">' +
		'<thead><tr>' +
		'<th>Asistencia</th>' +
		'<th>Fecha</th>' +
		'<th>Entrada</th>' +
		'<th>Salida</th>' +
		'<th>Incidencia</th>' +
		'</tr></thead>';
	var dataRow = '';
	$.each(d.asistencia, function (index, a) {
		//let color = semaforo(a.fecha_termino);
		//console.log(a)
		var status = a.incidencia;
		if (status != '') color = 'table-danger';
		if (a.entrada == null) a.entrada = '-';
		if (a.salida == null) a.salida = '-';
		dataRow +=
			'<tbody><tr class="' + color + '">' +
			'<td>' + a.asistencia + '</td>' +
			'<td>' + a.fecha + '</td>' +
			'<td>' + a.entrada + '</td>' +
			'<td>' + a.salida + '</td>' +
			'<td>' + a.incidencia + '</td>' +
			'</tr>';
	});
	//console.log(dataRow)
	return (
		dataHeader +
		dataRow + '</tbody>' +
		'</table>'
	);
}


const exportar = async () => {
	//console.log(json)
	if (json !== undefined) {
		const jsonP = JSON.stringify(json);
		//console.log(jsonP)
		const customConfig = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const result = await Axios.post(api_cnfg + "/api/getReporte", jsonP, {
			responseType: 'blob', headers: {
				'Content-Type': 'application/json'
			}
		},).then((response) => {
			FileDownload(response.data, 'report.xlsx');
		});;
	}
}



function Nomina(props) {

	useEffect(() => {

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
			getAreas();
		}

	});

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
						<li class="active"><Link class="nav-link">Nómina</Link></li>
					</ol>

					<div class="flotante" style={{ right: 0, zIndex: 20 }}>
						<div class="stat">
							<span id="visitas" class="stat-count"><i class="fas fa-spinner fa-spin"></i></span>
							<p class="stat-detail">Visitantes</p>
						</div>
					</div>

					<div class="row">
						<h2>Consulta</h2>
						<hr class="red"></hr>
					</div>
					<button id="btnBuscar" class='btn-primary pull-right' type="button" style={{ marginLeft: "5px" }} onClick={consultar}><i class="fa fa-search" aria-hidden="true"></i> Buscar</button>
					<button id="btnExport" class='btn-default pull-right' type="button" onClick={exportar}><i class="fa fa-cloud-download" aria-hidden="true"></i> Descargar</button>
					<div class="row top-buffer">
						<div class="form-group col-md-6">
							<label class="control-label" for="cmbArea">Ejercicio Fiscal:</label>
							<select class="input-sm form-control" id="cmbArea">
								<option value="0">--SELECCIONA--</option>
							</select>
						</div>

						<div class="form-group  col-md-6">
							<label class="control-label" for="cmbMes">Mes:</label>
							<select class="input-sm form-control" id="cmbMes">
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
					<div style={
						{ overflow: "auto" }
					}>
						<table class="display" style={{ "width": "100%" }} id="tblAsistencia">
							<thead>
								<tr>
									<th class="red-text">Detalle</th>
									<th class="red-text">Nombre</th>
								</tr>
							</thead>
						</table>
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

export default Nomina;