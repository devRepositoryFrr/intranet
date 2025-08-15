import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/js/crt_max.js';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/datepicker.css';

import Alert from '../../assets/js/Alerta.js';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
import { useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { getUserCredenciales } from '../../utils/storage';


const user = getUserCredenciales();
    if (!user) {
      window.location.href = "/int/#/";
          }

export default function ModalNtf() {
	//setFechas
	const [dbfInicial, setdbfInicial] = useState(new Date());
	const [dbfFinal, setdbfFinal] = useState(new Date());
	const [dbDescripcion, setdbDescripcion] = useState("");

	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#txtDescripcion-ntf").val("");
		$(".crt-count").text("200");
		setdbfInicial(new Date());
		setdbfFinal(new Date());
		$("#content-ntf").css("display", "none");
		$("#btnGuardar-ntf").addClass('disabled');
		$("#btnGuardar-ntf").prop('disabled',true);
		$('html').css("overflow","");
	}

	const submitInsert = () => {

		Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nueva_notificacion', {
			dbfInicial: moment(dbfInicial).format('YYYY-MM-DD'),
			dbfFinal: moment(dbfFinal).format('YYYY-MM-DD'),
			dbDescripcion: dbDescripcion,

		}).then(
			(response) => {
				if (response.data != "") {
					limpiar();
					Alert("¡Registraste un evento nuevo con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
				} else {
					Alert("<strong>Ocurrió un error</strong> al registrar este evento.", "alertaOp alert alert-danger alert-dismissible");

				}
			},

		).catch(
			(err) => {
				//console.log(err)
			});
	};

	return (
		<div id='content-ntf' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Nueva notificación</h4>
			</div>
			<div class='modal-body' style={{ height: 450, overflowX: "auto", overflowY: "auto" }}>

				<p>Vigencia desde:</p>


				<FormControl>
					<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} >
						<KeyboardDatePicker class='form-control datepicker bottom-buffer-x15'
							style={{ borderStyle: 'solid', borderWidth: 1 }}
							disableToolbar
							variant='inline'
							format='dd/MM/yyyy'
							margin='normal'
							value={dbfInicial} onChange={setdbfInicial}
							KeyboardButtonProps={{
								'aria-label': 'change hour',
							}}
						/>
					</MuiPickersUtilsProvider>
				</FormControl>
				<p>Hasta desde:</p>
				<FormControl>
					<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} >
						<KeyboardDatePicker class='form-control datepicker bottom-buffer-x15'
							style={{ borderStyle: 'solid', borderWidth: 1 }}
							disableToolbar
							variant='inline'
							format='dd/MM/yyyy'
							margin='normal'
							value={dbfFinal}
							name='id_'
							onChange={setdbfFinal}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
				</FormControl>
				<p>Descripción:</p>




				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
					<textarea maxLength="200"
						id="txtDescripcion-ntf"
						style={{ resize: "none" }} class='form-control bottom-buffer-x15 max'
						onChange={(e) => {
							if (e.target.value != "") {
								$("#btnGuardar-ntf").removeClass('disabled');
								$("#btnGuardar-ntf").prop('disabled',false);
							} else {
								$("#btnGuardar-ntf").addClass('disabled');
								$("#btnGuardar-ntf").prop('disabled',true);
							}
							setdbDescripcion(e.target.value);
						}}
					>

					</textarea>
				</div>





				<button id="btnGuardar-ntf" class='disabled col-md-3 col-xs-12 btn-primary'
					style={{ marginRight: 10, marginBottom: 10 }}
					onClick={submitInsert}
				>Guardar</button>
				<button id="btnCerrar-ntf" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
				onClick={limpiar}>Cancelar</button>


			</div>
		</div>
	);
}