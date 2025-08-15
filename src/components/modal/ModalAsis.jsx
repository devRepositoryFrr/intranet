import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/soporte.css';
import '../../assets/js/soporte.js';
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "datatables.net-dt/js/dataTables.dataTables"
import { asistencia } from '../Inicio.jsx';
import React, { useState, useEffect } from 'react';
import Alert from '../../assets/js/Alerta.js';
import Axios from 'axios';
import { disabled_button, enabled_button } from '../../assets/js/botones'
import { da } from 'date-fns/locale';
import { getUserCredenciales } from '../../utils/storage';
const user = getUserCredenciales();
function obtenerTipoSoporte() {
	//var user = (JSON.parse(localStorage.getItem('credenciales'))==null)?JSON.parse('[{"email":"notloged","nombre":""}]'):user=JSON.parse(localStorage.getItem('credenciales'));
	$.each(user[0], function (key, value) {
		$("#asist_txt" + key).text(value);
		$("#Sasist_txt" + key).text(value);
	});
	$(".tipoSoporte").remove();

}
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
let subject = "soportesistemas@conavi.gob.mx";
//let subject = "lmmendoza@conavi.gob.mx";

function getAsis() {
	//var user = JSON.parse(localStorage.getItem('credenciales'));
	let mes = $("#cmbMes").val();
	//console.log(mes)
	//$('#tblAsis').DataTable().clear().destroy();
	Axios.get(api_cnfg + "/api/getDataAsis/" + user[0].email + "/" + mes).then((res) => {
		let data = res.data;
		$.each(data, function (index, a) {
			if (a.tipo_asist == "Sistema") a.incidencia = "Falta";
			if (a.entrada == null) a.entrada = '-';
			if (a.salida == null) a.salida = '-';
		});
		json = data;
		console.log(data)
		dt = $("#tblAsis").DataTable({
			"destroy": true,
			"bDestroy": true,
			"colReorder": true,
			scrollCollapse: true,
			scrollY: '50vh',
			"paging": true, // disable paging
			pageLength: 5,
			"deferRender": true, // enable virtual scrolling
			"fixedHeader": true,
			"bInfo": false, // hide paging info
			"createdRow": function (row, data, dataIndex) {
				var status = data.incidencia;
				if (status != '') $(row).addClass('table-danger');
			},
			data: data,

			columns: [
				{ data: "id" },
				{ data: "tipo_asist" },
				{ data: "fecha" },
				{ data: "entrada" },
				{ data: "salida" },
				{ data: "incidencia" },
				//{ data: "comentarios" },
				//{ data: "justifica" },
			],
			columnDefs: [
				{
					target: 0,
					visible: false,
					searchable: false
				}],
			language: lang


		});

		//console.log("tabla: ",dt)
	});

}

export default function ModalAsis() {
	const [ipAddress, setIPAddress] = useState('')
	const [country, setCountry] = useState('')
	const [latitude, setLatitude] = useState('')
	const [longitude, setLongitude] = useState('')
	const [date, setDate] = useState(new Date());
	var options = { hour12: false };

	useEffect(() => {
		const user = getUserCredenciales();
   		 if (!user) {
    		  window.location.href = "/int/#/";
     		 return;
  			 }
		fetch('https://geolocation-db.com/json/')
			.then(response => response.json())
			.then(data => {
				setIPAddress(data.IPv4)
				setCountry(data.country_name)
				setLatitude(data.latitude)
				setLongitude(data.longitude)
			})
		limpiar();
		obtenerTipoSoporte();
		$("#cmbMes").change(function () { // get the selected file from the input
			getAsis();
		});
		var timer = setInterval(() => setDate(new Date()), 1000)
		return function cleanup() {
			clearInterval(timer)
		}
	}, []);

	$("#status").hide();
	var window_focus;

	$(window).focus(function () {
		window_focus = true;
	}).blur(function () {
		window_focus = false;
	});
	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-asis").css("display", "none");
		$('html').css("overflow", "");
		$("#asist_cbotipo option[value=0]").prop('selected', true);
		$("#cmbMes option[value=0]").prop('selected', true);
		$('#tblAsis').DataTable().clear().destroy();
	}

	const chMes = () => {
		const d = new Date();
		//console.log(d)
		let month = d.getMonth() + 1;
		let mes = $("#cmbMes").val(month);
		getAsis();
	}
	const submitInsert = () => {
		var tipoe = $("#asist_cbotipo").children("option:selected").val();
		if (ipAddress == "201.96.171.158" & tipoe != 0) {
			//var user = JSON.parse(localStorage.getItem('credenciales'));
			Axios.post(api_cnfg + '/api/reg_ent', {
				usuario: user[0].email,
				tipo_asist: tipoe,
				entrada: $("#asist_txtdateE").text(),
				latitud: latitude,
				longitud: longitude,
				ip: ipAddress

			}).then(
				(response) => {
					if (response.data[0].en == "0") {
						limpiar();
						asistencia();
						Alert("¡Registraste tú entrada con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
					} else if (response.data[0].en >= "1") {
						Alert("<strong>Ya cuentas</strong> con registro de entrada", "alertaOp alert alert-danger alert-dismissible");
					}

					else {
						Alert("<strong>Ocurrió un error</strong> al registrar tú entrada", "alertaOp alert alert-danger alert-dismissible");

					}
				},
			).catch(

				(err) => {
					limpiar();
					//console.log(err)
				});
		}
		else {
			Alert("<strong>Ocurrió un error</strong> al registrar tú entrada", "alertaOp alert alert-danger alert-dismissible");
		}
	};

	const timeDiff = () => {
		let time1 = date.toLocaleTimeString("en-US", { hour12: false });
		let time2 = "19:00";

		// given a time value as a string in 24 hour format
		// create a Date object using an arbitrary date part,
		// specified time and UTC timezone

		let date1 = new Date(`2000-01-01T${time1}Z`);
		let date2 = new Date(`2000-01-01T${time2}Z`);

		// the following is to handle cases where the times are on the opposite side of
		// midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM

		if (date1 < date2) {
			

		let diff = date2 - date1;
		console.log(diff / 1000 / 60 / 60);
		}
	}
	const submitSal = () => {
		let diff = timeDiff();
		let anticipada = false;
		//if(diff <= 0 || anticipada){
		if (ipAddress == "201.96.171.158") {
			//var user = JSON.parse(localStorage.getItem('credenciales'));
			Axios.post(api_cnfg + "/api/reg_sal", {
				usuario: user[0].email,
				salida: $("#asist_txtdateS").text(),
				latitud: latitude,
				longitud: longitude,
				ip: ipAddress

			}).then(
				(response) => {
					//console.log("salida ", response.data[0].en)
					if (response.data[0].en != "0" && response.data[0].en != "-1") {
						limpiar();
						asistencia();
						Alert("¡Registraste tú salida con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
					} else if (response.data[0].en == "0") {
						Alert("<strong>No cuentas</strong> con registro de entrada", "alertaOp alert alert-danger alert-dismissible");
					} else if (response.data[0].en == "-1") {
						Alert("<strong>Ya cuentas</strong> con registro de salida", "alertaOp alert alert-danger alert-dismissible");
					}

					else {
						Alert("<strong>Ocurrió un error</strong> al registrar tú salida", "alertaOp alert alert-danger alert-dismissible");

					}
				},
			).catch(

				(err) => {
					limpiar();
					//console.log(err)
				});
		}
		else {
			Alert("<strong>Ocurrió un error</strong> al registrar tú entrada", "alertaOp alert alert-danger alert-dismissible");
		}
	/*}else{
		diff = true;
		Alert("<strong>¿Deseas registrar</strong> tu salida anticipada?"+
			"<button id='btnOkS' class='col-md-3 col-xs-12 btn-primary pull-right' type='button' onClick={submitSal}>Aceptar</button>", "alertaOp alert alert-warning alert-dismissible");
	}*/
	};
	return (
		<div id='content-asis' class='modal-content' style={{ display: "none", overflow: "hidden" }}>
			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Control de Asistencia</h4>
			</div>
			<div class='modal-body masis' style={{ overflowX: "auto", overflowY: "auto", padding: 20 }}>
				<ul class="nav nav-tabs">
					<li class="active"><a data-toggle="tab" href=".tab-01">Checar Entrada</a></li>
					<li><a data-toggle="tab" href=".tab-02">Checar Salida</a></li>
					<li><a data-toggle="tab" href=".tab-03" onClick={chMes}>Control de Asistencia</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane active tab-01" id="tab-01">
						<form id="frmAsis">
							<div>
								<p>Área: <strong><span name="asist.txtarea" id="asist_txtarea" retrieve="asist_txtarea"></span></strong></p>
								<p>Usuario: <strong><span name="asist.txtnombre" id="asist_txtnombre" retrieve="asist_txtnombre"></span></strong></p>
								<p>Fecha y Hora: <strong><span name="asist.txtdateE" id="asist_txtdateE" retrieve="asist_txtdateE">{date.toLocaleDateString('en-CA')} {date.toLocaleTimeString("en-US", { hour12: false })}</span></strong></p>

							</div>
							<div>
								<p>Tipo Asistencia:</p>
								<select id="asist_cbotipo" name="asist.cbotipo" retrieve="asist_cbotipo" class="form-control">
									<option value="0">--SELECCIONA--</option>
									<option value="1">Oficina</option>
									<option value="2">Remoto</option>
								</select>
							</div>
						</form>
						<button id="btnGuardar-e" class='col-md-3 col-xs-12 btn-primary pull-right' type="button" onClick={submitInsert}>Guardar</button>
						<button id="btnCerrar-e" class='col-md-3 col-xs-12  btn-default pull-right' type="button" onClick={limpiar}>Cancelar</button>
					</div>
					<div class="tab-pane tab-02" id="tab-02">

						<form id="frmAsisS">
							<div>
								<p>Área: <strong><span name="Sasist.txtarea" id="Sasist_txtarea" retrieve="Sasist_txtarea"></span></strong></p>
								<p>Usuario: <strong><span name="Sasist.txtnombre" id="Sasist_txtnombre" retrieve="Sasist_txtnombre"></span></strong></p>
								<p>Fecha y Hora: <strong><span name="asist.txtdateS" id="asist_txtdateS" retrieve="asist_txtdateS">{date.toLocaleDateString('en-CA')} {date.toLocaleTimeString("en-US", { hour12: false })}</span></strong></p>

							</div>
						</form>
						<button id="btnGuardar-s" class='col-md-3 col-xs-12 btn-primary pull-right' type="button" onClick={submitSal}>Guardar</button>
						<button id="btnCerrar-s" class='col-md-3 col-xs-12  btn-default pull-right' type="button" onClick={limpiar}>Cancelar</button>
						{/*<div>
<p>Your IP Address is: {ipAddress}</p>
<p>Your country is: {country}</p>
<p>Your latitude is: {latitude}</p>
<p>Your longitude is: {longitude}</p>
</div>*/}
					</div>
					<div class="tab-pane tab-03" id="tab-03">
						<div class="form-group">
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

						<table class="table" id="tblAsis" style={{ width: "100%" }}>
							<thead>
								<tr class="">
									<th id="" class="red-text">Id</th>
									<th id="" class="red-text">Asistencia</th>
									<th id="" class="red-text">Fecha</th>
									<th id="" class="red-text">Entrada</th>
									<th id="" class="red-text">Salida</th>
									<th id="" class="red-text">Incidencia</th>
									{//<th id="" class="red-text">Comentarios</th>
										//<th id="" class="red-text">Justifica</th>
									}

								</tr>
							</thead>
							<tbody></tbody>
						</table>
						<button id="btnCerrar-c" class='col-md-3 col-xs-12  btn-default pull-right' type="button" onClick={limpiar}>Cancelar</button>
					</div>
				</div>
			</div>
		</div>
	);
}
