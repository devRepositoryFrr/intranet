import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/listas.css';
import '../../assets/css/directorio.css';
import '../../assets/js/directorio.js';
import { disabled_button, enabled_button } from '../../assets/js/botones.js';

import { useEffect } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
import { useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import Alert from '../../assets/js/Alerta';






export default function ModalSpa() {
	
	const [txt_fecha_cierre, settxt_fecha_cierre] = useState(new Date());

	const onDateChange = (txt_fecha_cierre, value) => {
		settxt_fecha_cierre(txt_fecha_cierre);
	};


	const limpiar = () => {
		$("#cbo_id_status").val("");
		$("#soporte_txtdescripcion").val("");
		$("#modal").css("display", "none");
		$("#content-spa").css("display", "none");
		$("#btnGuardar-spa").addClass('disabled');
		$("#btnGuardar-spa").prop('disabled', true);
		$('html').css("overflow", "");
	}

	const submitAsignacion = () => {
		var user = JSON.parse(localStorage.getItem('credenciales'));

		Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/asignar_ticket', {
			usuario: user[0].email,
			id: $("#lbl_id").text()

		}).then(
			(response) => {
				if (response.data != "") {
					limpiar();
					Alert("¡Se te ha <strong> asginado</strong> un nuevo ticket!", "alertaOp alert alert-success alert-dismissible");
				} else {
					Alert("<strong>Ocurrió un error</strong> al asignar este ticket.", "alertaOp alert alert-danger alert-dismissible");

				}
			},
		).catch(

			(err) => {
				limpiar();
				//console.log(err)
			});

	};

	const submitCierre = () => {

		var user = JSON.parse(localStorage.getItem('credenciales'));

		Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/cerrar_ticket', {
			fecha_cierre: moment(txt_fecha_cierre).format('YYYY-MM-DD'),
			observacion: $("#soporte_txtdescripcion").val(),
			status: $("#cbo_id_status").children("option:selected").val(),
			id: $("#lbl_id").text()

		}).then(
			(response) => {
				if (response.data != "") {
					limpiar();
					Alert("¡Haz <strong> cerrado</strong> un nuevo ticket!", "alertaOp alert alert-success alert-dismissible");
				} else {
					Alert("<strong>Ocurrió un error</strong> al cerrar este ticket.", "alertaOp alert alert-danger alert-dismissible");

				}
			},
		).catch(

			(err) => {
				limpiar();
				console.log(err)
			});

	};

	const ValidarCampos = () => {
		if ($("#soporte_txtdescripcion").val() != "" &&
			$("#cbo_id_status").children("option:selected").val() != "") {
			enabled_button("btnCerrado-spa_");

		} else {
			disabled_button("btnCerrado-spa_");

		}
	}

	useEffect(() => {
		disabled_button("btnCerrado-spa_");
	});

	return (
		<div id='content-spa' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Detalle del ticket</h4>
			</div>

			<div class='modal-body' style={{ padding: 20, height: 500, overflowX: "auto", overflowY: "auto" }}>
				<strong id="lbl_id" class="hidden"></strong>
				<p>Fecha: <strong id="lbl_fecha"></strong></p>
				<p>Usuario: <strong id="lbl_nombre"></strong></p>
				<p>Email: <strong id="lbl_usuario"></strong></p>
				<p>Área: <strong id="lbl_area"></strong></p>
				<p>Tipo de soporte: <strong id="lbl_id_soporte"></strong></p>
				<p>Descripción: <strong id="lbl_descripcion"></strong></p>
				<p>Status: <strong id="lbl_status"></strong></p>
				<select
					onChange={ValidarCampos}
					class="form-control" id="cbo_id_status">
					<option value="">--Selecciona--</option>
					<option value="C">Cerrado</option>
					<option value="R">Rechazado</option>
				</select>
				<p>Fecha de cierre: <strong id="lbl_fecha_cierre"></strong></p>
				<div id="datetimepicker_spa">
					<FormControl id="datepi">
						<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} >
							<KeyboardDatePicker class='form-control datepicker bottom-buffer-x15'
								style={{ borderStyle: 'solid', borderWidth: 1 }}
								disableToolbar
								variant='inline'
								format='dd/MM/yyyy'
								margin='normal'
								value={txt_fecha_cierre}
								onChange={onDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change hour',
								}}
							/>
						</MuiPickersUtilsProvider>
					</FormControl>
				</div>
				<p>Observación: <strong id="lbl_observacion"></strong></p>
				<div id="observacion">
					<label style={{ fontSize: 12 }}>Caracteres restantes: <span class="crt-count" style={{ fontSize: 12 }}>500</span></label>
					<textarea
						onChange={ValidarCampos}
						maxLength="500"
						name="soporte.txtdescripcion"
						id="soporte_txtdescripcion"
						retrieve="soporte_txtdescripcion"
						style={{ resize: "none" }} class='form-control bottom-buffer-x15 max'

					>

					</textarea>
				</div>
			</div>
			<div class="modal-footer">
					<button id="btnCerrado-spa_"  class='disable col-md-3 col-xs-12 btn-primary'
						style={{ marginRight: 10, marginBottom: 10 }}
						onClick={submitCierre}
					>Cerrar</button>

					<button id="btnAsignar-spa" class='col-md-3 col-xs-12 btn-primary'
						style={{ marginRight: 10, marginBottom: 10 }}
						onClick={submitAsignacion}
					>Asignar</button>

					<button id="btnCerrar-spa" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
						onClick={limpiar}>Salir</button>

				</div>

		</div>
	);
}
