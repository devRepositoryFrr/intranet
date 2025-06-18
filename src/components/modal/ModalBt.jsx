import $, { each } from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/datepicker.css';
import '../../assets/css/bitacora.css';

import Alert from '../../assets/js/Alerta.js';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
import { useState } from 'react';
import Axios from 'axios';
import moment from 'moment';




export default function ModalBt() {
	var mail_ =(JSON.parse(localStorage.getItem('credenciales'))==null)?JSON.parse('[{"email":"notLoged","nombre":""}]'):mail_ = JSON.parse(localStorage.getItem('credenciales'));
	
		
	
	const minDate = new Date(new Date().getTime());
	let subject = "soportesistemas@conavi.gob.mx;jzenil@conavi.gob.mx;jvirtom@conavi.gob.mx;brsotelo@conavi.gob.mx;" + mail_[0].email;
	//let subject = "lmmendoza@conavi.gob.mx";
	let cboHinicio = "";
	let cboHtermino = "";
	let dbcboSala = "";
	const [dbfInicial, setdbfInicial] = useState(new Date());

	const validar = (id, require) => {
		var do_ = true;
		if ($("#" + id).val().length < require) {
			$("#" + id + "-errorBT").show();
			$("#alert-" + id + "-errorBT").addClass("hidden");

			do_ = false;

		} else {
			$("#" + id + "-errorBT").hide();
		}
		return do_;
	}


	const enviarEmail = (aplicativo, cuerpo, asunto, mensaje, modulo, img1, img2, img3, img4, img5) => {
		Axios.post("https://sistemaintegral.conavi.gob.mx:81/api/send_mail", {
			aplicativo,
			cuerpo,
			asunto,
			mensaje,
			subject,
			modulo,
			img1,
			img2,
			img3,
			img4,
			img5
		});

	}

	const validaCampos = () => {

		var do_ = true

		var elementos = $(".errorBT").map(function () {
			return this.id;
		}).get();

		for (var i = 0; i < elementos.length; i++) {
			if (elementos[i] !== "") {
				if ($("#" + elementos[i]).css("display") == "none") {

				}
				else {
					do_ = false;
					alert(elementos[i])
					$("#" + elementos[i].replace("-errorBT", "")).focus();
					//scroll(elementos[i].replace("-errorBT", ""));
					break;
				}

			}
		}


		return do_;
	}

	const submitInsert = () => {



		if (validaCampos()) {
			Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/solicitar_sala', {

				dbUsuario: $("#cboUsuario").children("option:selected").val(),
				dbfInicial: moment(dbfInicial).format('YYYY-MM-DD'),
				cboHinicio: $("#cboHinicio").val(),
				cboHtermino: $("#cboHtermino").val(),
				dbcboSala: "0",
				laptop: $("#laptop:checked").val(),
				proyector: $("#proyector:checked").val(),
				agua: $("#agua:checked").val(),
				sonido: $("#sonido:checked").val(),
				estenografia: $("#estenografia:checked").val(),
				acrilicos: $("#acrilicos:checked").val(),
				virtual: $("#virtual:checked").val(),
				cargo: "",
				telefono: $("#telefono").val(),
				titulo_evento: $("#titulo_evento").val(),
				numero_asistentes: $("#asistentes").val(),
				institucion: $("#institucion").val(),
				observaciones: $("#observaciones").val()

			}).then(
				(response) => {
					var lp = "Laptop: No";
					var py = "Proyector: No";
					var ag = "Agua: No";
					var sd = "Sonido: No";
					var en = "Estenografía: No";
					var ac = "Acrílicos: No";
					var vt = "Conexión virtual: No";

					if ($("#laptop:checked").val() == "1") {
						lp = "Laptop: Si";
					}

					if ($("#proyector:checked").val() == "1") {
						py = "Proyector: Si";
					}

					if ($("#agua:checked").val() == "1") {
						ag = "Agua: Si";
					}

					if ($("#sonido:checked").val() == "1") {
						sd = "Sonido: Si";
					}

					if ($("#estenografia:checked").val() == "1") {
						en = "Estenografía: Si";
					}

					if ($("#acrilicos:checked").val() == "1") {
						ac = "Acrílicos: Si";
					}

					if ($("#virtual:checked").val() == "1") {
						vt = "Conexión virtual: Si";
					}


					var user = JSON.parse(localStorage.getItem('credenciales'));
					if (response.data != "") {

						Alert("¡Reservaste una sala con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");

						enviarEmail(
						/*aplicativo*/"INTRANET - CONAVI:",
						/*cuerpo*/"Nueva solicitud de <strong>" + user[0].nombre.toUpperCase() + "</strong> adscrito al área <strong>" + user[0].area.toUpperCase() + "</strong> cómo <strong>" + user[0].puesto.toUpperCase() + "</strong>, para el día <strong>" + moment(dbfInicial).format('YYYY-MM-DD') + " de " + $("#cboHinicio").children("option:selected").text() + " a " + $("#cboHtermino").children("option:selected").text() + " </strong>, con capacidad para <strong>" + $("#asistentes").val() + "</strong> personas, donde será celebrada la reunión '<strong>" + $("#titulo_evento").val() + "</strong>', con integrantes de <strong>" + $("#institucion").val() + "</strong>. Si necesitas más detalles puedes escribirle al solicitante a:" +
							"<p><span style='color:#821b3f'>●</span><strong>" + user[0].email + "</strong></p>" +
							"<p><span style='color:#821b3f'>●</span><strong>" + $("#telefono").val() + "</strong></p>",
						/*asunto*/"<p style='text-align:center'><strong>**Servicios adicionales**</strong></p>",
							/*mensaje*/
							"<p><span style='color:#821b3f'>●</span>" + lp + "</p>" +
							"<p><span style='color:#821b3f'>●</span>" + py + "</p>" +
							"<p><span style='color:#821b3f'>●</span>" + ag + "</p>" +
							"<p><span style='color:#821b3f'>●</span>" + sd + "</p>" +
							"<p><span style='color:#821b3f'>●</span>" + en + "</p>" +
							"<p><span style='color:#821b3f'>●</span>" + ac + "</p>" +
							"<p><span style='color:#821b3f'>●</span>" + vt + "</p>" +
							"<p style='margin-top:20px'>Observaciones:<p>" +
							"<p style='margin-top:20px'>" + $("#observaciones").val() + "<p>",
						/*modulo*/"Nueva solicitud de sala",
							/*fotos*/
							$("#t-sp1").val(),
							$("#t-sp2").val(),
							$("#t-sp3").val(),
							$("#t-sp4").val(),
							$("#t-sp5").val());
						limpiar();
					} else {
						Alert("<strong>Ocurrió un error</strong> al reservar esta sala.", "alertaOp alert alert-danger alert-dismissible");

					}
				},

			).catch(
				(err) => {
					//console.log(err)
				});
		}
	};

	const onDateChange = (dbfInicial, value) => {



		setdbfInicial(dbfInicial);

		verHorarios(dbfInicial);

	};


	const DefHorarios = () => {

		var items = [];
		$(".horarios").remove();
		if ($("#cboSala").val() != 0) {
			items.push("<option class='horarios' value='0'>--Selecciona una hora--</option>");
			items.push("<option class='horarios' value='1'>9:00 hrs</option>");
			items.push("<option class='horarios' value='2'>9:30 hrs</option>");
			items.push("<option class='horarios' value='3'>10:00 hrs</option>");
			items.push("<option class='horarios' value='4'>10:30 hrs</option>");
			items.push("<option class='horarios' value='5'>11:00 hrs</option>");
			items.push("<option class='horarios' value='6'>11:30 hrs</option>");
			items.push("<option class='horarios' value='7'>12:00 hrs</option>");
			items.push("<option class='horarios' value='8'>12:30 hrs</option>");
			items.push("<option class='horarios' value='9'>13:00 hrs</option>");
			items.push("<option class='horarios' value='10'>13:30 hrs</option>");
			items.push("<option class='horarios' value='11'>14:00 hrs</option>");
			items.push("<option class='horarios' value='12'>14:30 hrs</option>");
			items.push("<option class='horarios' value='13'>15:00 hrs</option>");
			items.push("<option class='horarios' value='14'>15:30 hrs</option>");
			items.push("<option class='horarios' value='15'>16:00 hrs</option>");
			items.push("<option class='horarios' value='16'>16:30 hrs</option>");
			items.push("<option class='horarios' value='17'>17:00 hrs</option>");
			items.push("<option class='horarios' value='18'>17:30 hrs</option>");
			items.push("<option class='horarios' value='19'>18:00 hrs</option>");
			items.push("<option class='horarios' value='20'>18:30 hrs</option>");
			items.push("<option class='horarios' value='21'>19:00 hrs</option>");
			$(".sHorarios").append(items);
		}
	};

	const verHorarios = (date) => {

		if ($("#cboSala").val() == 0) {
			$("#cboSala-errorBT").show();


		} else {
			$("#cboSala-errorBT").hide();
		}

		DefHorarios();

		dbcboSala = $("#cboSala").children("option:selected").val();

		Axios.get('https://sistemaintegral.conavi.gob.mx:81/api/ver_horarios_bitacora/' + dbcboSala + '/' + moment(date).format('YYYY-MM-DD'), {


		}).then(
			(response) => {
				each(response.data, function (key, val) {
					var pos = 0;
					for (var i = val.horario_desde; i <= val.horario_hasta; i++) {
						pos = $("#cboHinicio").children("option[value=" + i + "]").val()
						if (pos >= val.horario_desde && pos < val.horario_hasta) {
							$("#cboHinicio").children("option[value=" + i + "]").hide();

						}
						if (pos > val.horario_desde && pos < val.horario_hasta) {

							$("#cboHtermino").children("option[value=" + i + "]").hide();
						}


					}
				});
			},

		).catch(
			(err) => {

				//console.log(err)
			});
	};

	const quitarHoraInicial = () => {
		if ($("#cboHinicio").val() == 0) {
			$("#cboHinicio-errorBT").show();


		} else {
			$("#cboHinicio-errorBT").hide();
		}

		$("option").removeClass("ocultar-horarios");
		if ($("#cboHinicio").children("option:selected").val() != 0) {
			$("#cboHtermino").prop("disabled", false);
			cboHinicio = $("#cboHinicio").children("option:selected").val();
			//console.log("INICIO:"+cboHinicio);
			for (var i = cboHinicio; i <= 21; i++) {

				if ($("#cboHtermino").children("option[value=" + i + "]").css('display') == 'none') {
					var hide = $("#cboHtermino").children("option[value=" + i + "]").val();

					for (var i_ = hide; i_ <= 21; i_++) {
						$("#cboHtermino").children("option[value=" + i_ + "]").addClass("ocultar-horarios");
					}


					break;
				} else {

				}

				for (var i_ = 0; i_ <= 21; i_++) {

					if ($("#cboHtermino").children("option[value=" + i_ + "]").val() == 9) {

					}
					if (cboHinicio - 1 >= $("#cboHtermino").children("option[value=" + i_ + "]").val()) {
						$("#cboHtermino").children("option[value=" + cboHinicio + "]").addClass("ocultar-horarios");
						$("#cboHtermino").children("option[value=" + i_ + "]").addClass("ocultar-horarios");
					}
				}

			}
		} else {
			$("#cboHtermino").prop("disabled", true);
		}


	}

	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#cboHinicio option[value=0]").prop('selected', true);
		$("#cboHtermino option[value=0]").prop('selected', true);
		$("#cboSala option[value=0]").prop('selected', true);
		$("#cboUsuario option[value=0]").prop('selected', true);
		setdbfInicial(new Date());
		$("#content-bt").css("display", "none");
		$("#cboHtermino").prop("disabled", true);
		$('html').css("overflow", "");
		$("#laptop:checked").prop("checked", false);
		$("#proyector:checked").prop("checked", false);
		$("#agua:checked").prop("checked", false);
		$("#sonido:checked").prop("checked", false);
		$("#estenografia:checked").prop("checked", false);
		$("#acrilicos:checked").prop("checked", false);
		$("#virtual:checked").prop("checked", false);

		$("#telefono").val("");
		$("#titulo_evento").val("");
		$("#asistentes").val("");
		$("#institucion").val("");
		$("#observaciones").val("");
		$("#cargo-errorBT").css("display", "block");
		$("#telefono-errorBT").css("display", "block");
		$("#titulo_evento-errorBT").css("display", "block");
		$("#asistentes-errorBT").css("display", "block");
		$("#cboSala-errorBT").css("display", "block");
		$("#cboHinicio-errorBT").css("display", "block");
		$("#cboHtermino-errorBT").css("display", "block");
		$("#institucion-errorBT").css("display", "block");
	}



	return (
		<div id='content-bt' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Solicitar sala</h4>
			</div>
			<div class='modal-body' style={{ height: 450, overflowX: "auto", overflowY: "auto" }}>
				<p>Usuario:</p>
				<select class="form-control " id="cboUsuario">

				</select>


				<p class="top-buffer-x25">¿Número celular?</p>
				<div>
					<input maxLength="10" minLength="10"
						id="telefono"
						placeholder="Especifica tu número celular"
						style={{ resize: "none" }} class='form-control  max numonly'
						onChange={(e) => validar(e.target.id, e.target.maxLength)}
					>
					</input>
					<label id="telefono-errorBT" class="error" for="telefono" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Nombre del evento:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>100</span></label>
					<textarea maxLength="100" minLength="1"
						id="titulo_evento"
						placeholder="Especifica el titulo"
						style={{ resize: "none" }} class='form-control  max'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="titulo_evento-errorBT" class="error" for="titulo_evento" >Campo requerido *</label>
				</div>
				<p class="top-buffer-x25">Número de asistentes al evento:</p>
				<input id="asistentes" class="form-control max numonly" placeholder="Digita el numero de asistentes"
					maxLength="3"
					minLength="1"
					onChange={(e) => validar(e.target.id, e.target.minLength)} />

				<label id="asistentes-errorBT" class="error" for="asistentes" >Campo requerido *</label>



				<p class="top-buffer-x25">Fecha del evento:</p>
				<FormControl id="datepi">
					<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} >
						<KeyboardDatePicker class='form-control datepicker '
							style={{ borderStyle: 'solid', borderWidth: 1 }}
							disableToolbar
							variant='inline'
							format='dd/MM/yyyy'
							margin='normal'
							minDate={minDate}
							value={dbfInicial}
							onChange={onDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change hour',
							}}
						/>
					</MuiPickersUtilsProvider>
				</FormControl>


				<p class="top-buffer-x25">Hora de inicio:</p>
				<select onChange={quitarHoraInicial} class="form-control  sHorarios" id="cboHinicio">
					<option class='horarios' value='0'>--Selecciona una hora--</option>
					<option class='horarios' value='1'>9:00 hrs</option>
					<option class='horarios' value='2'>9:30 hrs</option>
					<option class='horarios' value='3'>10:00 hrs</option>
					<option class='horarios' value='4'>10:30 hrs</option>
					<option class='horarios' value='5'>11:00 hrs</option>
					<option class='horarios' value='6'>11:30 hrs</option>
					<option class='horarios' value='7'>12:00 hrs</option>
					<option class='horarios' value='8'>12:30 hrs</option>
					<option class='horarios' value='9'>13:00 hrs</option>
					<option class='horarios' value='10'>13:30 hrs</option>
					<option class='horarios' value='11'>14:00 hrs</option>
					<option class='horarios' value='12'>14:30 hrs</option>
					<option class='horarios' value='13'>15:00 hrs</option>
					<option class='horarios' value='14'>15:30 hrs</option>
					<option class='horarios' value='15'>16:00 hrs</option>
					<option class='horarios' value='16'>16:30 hrs</option>
					<option class='horarios' value='17'>17:00 hrs</option>
					<option class='horarios' value='18'>17:30 hrs</option>
					<option class='horarios' value='19'>18:00 hrs</option>
					<option class='horarios' value='20'>18:30 hrs</option>
					<option class='horarios' value='21'>19:00 hrs</option>
				</select>
				<label id="cboHinicio-errorBT" class="error" for="cboHinicio" >Campo requerido *</label>

				<p class="top-buffer-x25">Hora de termino:</p>
				<select disabled onChange={(e) => {

					if ($("#cboHtermino").val() == 0) {
						$("#cboHtermino-errorBT").show();


					} else {
						$("#cboHtermino-errorBT").hide();
					}


					if (e.target.value != "0") {
						$("#btnGuardar-bt").removeClass('disabled');
						$("#btnGuardar-bt").prop('disabled', false);
					} else {
						$("#btnGuardar-bt").addClass('disabled');
						$("#btnGuardar-bt").prop('disabled', true);
					}
				}}
					class="form-control  sHorarios" id="cboHtermino">
					<option class='horarios' value='0'>--Selecciona una hora--</option>
					<option class='horarios' value='1'>9:00 hrs</option>
					<option class='horarios' value='2'>9:30 hrs</option>
					<option class='horarios' value='3'>10:00 hrs</option>
					<option class='horarios' value='4'>10:30 hrs</option>
					<option class='horarios' value='5'>11:00 hrs</option>
					<option class='horarios' value='6'>11:30 hrs</option>
					<option class='horarios' value='7'>12:00 hrs</option>
					<option class='horarios' value='8'>12:30 hrs</option>
					<option class='horarios' value='9'>13:00 hrs</option>
					<option class='horarios' value='10'>13:30 hrs</option>
					<option class='horarios' value='11'>14:00 hrs</option>
					<option class='horarios' value='12'>14:30 hrs</option>
					<option class='horarios' value='13'>15:00 hrs</option>
					<option class='horarios' value='14'>15:30 hrs</option>
					<option class='horarios' value='15'>16:00 hrs</option>
					<option class='horarios' value='16'>16:30 hrs</option>
					<option class='horarios' value='17'>17:00 hrs</option>
					<option class='horarios' value='18'>17:30 hrs</option>
					<option class='horarios' value='19'>18:00 hrs</option>
					<option class='horarios' value='20'>18:30 hrs</option>
					<option class='horarios' value='21'>19:00 hrs</option>
				</select>
				<label id="cboHtermino-errorBT" class="error" for="cboHtermino" >Campo requerido *</label>

				<p class="top-buffer-x25">Institución u organización con quien sera tu evento:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
					<textarea maxLength="200"
						id="institucion"
						placeholder="Especifica la institución u organización"
						style={{ resize: "none" }} class='form-control max'
						minLength="1"
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="institucion-errorBT" class="error" for="institucion" >Campo requerido *</label>
				</div>
				<p class="top-buffer-x25">Observaciones:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>500</span></label>
					<textarea maxLength="500"
						id="observaciones"
						placeholder="Especifica tus observaciones"
						style={{ resize: "none" }} class='form-control max'
						minLength="1"
					>
					</textarea>
				</div>

				<p class="top-buffer-x25">Servicios adicionales:</p>
				<div class="row text-center">

					<div class="col-md-3">
						<small>Laptop</small><br />
						<input id="laptop" value="1" type="checkbox" />

					</div>

					<div class="col-md-3">
						<small>Proyector</small><br />
						<input id="proyector" value="1" type="checkbox" />
					</div>

					<div class="col-md-3">
						<small>Agua</small><br />
						<input id="agua" value="1" type="checkbox" />
					</div>

					<div class="col-md-3">
						<small>Sonido</small><br />
						<input id="sonido" value="1" type="checkbox" />
					</div>

					<div class="col-md-3">
						<small>Estenografía</small><br />
						<input id="estenografia" value="1" type="checkbox" />
					</div>

					<div class="col-md-3">
						<small>Acrilicos</small><br />
						<input id="acrilicos" value="1" type="checkbox" />
					</div>

					<div class="col-md-3">
						<small>Conexión Virtual</small><br />
						<input id="virtual" value="1" type="checkbox" />
					</div>

				</div>








				<div class="row top-buffer bottom-buffer-x15">
					<button id="btnGuardar-bt" class='col-md-3 col-xs-12 btn-primary'
						style={{ marginRight: 10, marginBottom: 10 }}
						onClick={submitInsert}
					>Guardar</button>
					<button id="btnCerrar-bt" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
						onClick={limpiar}>Cancelar</button>
				</div>

			</div>
		</div>
	);
}