import $, { each, error } from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/datepicker.css';
import '../../assets/css/bitacora.css';

import Alert from '../../assets/js/Alerta.js';

import Axios from 'axios';
import { useEffect } from 'react';
import { getUserCredenciales } from '../../utils/storage';



const user = getUserCredenciales();
const host = "https://sistemaintegral.conavi.gob.mx:81";
//const host = "http://localhost:3001";



export default function ModalSvh() {
	var mail_ = (JSON.parse(localStorage.getItem('credenciales'))==null)?JSON.parse('[{"email":"notloged","nombre":""}]'):mail_=JSON.parse(localStorage.getItem('credenciales'));
	

	//let subject = "csalgado@conavi.gob.mx ; gmiguel@conavi.gob.mx" + mail_[0].email + ";";
	let subject = "csalgado@conavi.gob.mx;gmiguel@conavi.gob.mx;rtorralba@conavi.gob.mx;" + mail_[0].email;
	
	


	const validar = (id, require) => {

		var do_ = true;

		if ($("#" + id).val().length < require) {
			$("#" + id + "-errorVH").show();
			$("#alert-" + id + "-errorVH").addClass("hidden");

			do_ = false;

		} else {

			$("#" + id + "-errorVH").hide();
		}
		return do_;
	}

	const validarrd = (id) => {

		var do_ = true;

		if ($("#" + id).val().length < 0) {
			$("#" + id + "-errorVH").show();
			$("#alert-" + id + "-errorVH").addClass("hidden");

			do_ = false;

		} else {

			$("#" + id + "-errorVH").hide();
		}
		return do_;
	}

	const validarCmb = (id) => {
		
		var do_ = true;
		if ($("#" + id).val() == 0) {
			$("#" + id + "-errorVH").show();
			do_ = false;

		} else {
			$("#" + id + "-errorVH").hide();
		}

		return do_;
	}

	const enviarEmail = (aplicativo, cuerpo, asunto, mensaje, modulo, img1, img2, img3, img4, img5) => {
		Axios.post(host + "/api/send_mail", {
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
		var elementos = $(".errorVH_v").map(function () {
			return this.id;
		}).get();

		for (var i = 0; i < elementos.length; i++) {
			//console.log(elementos[i])
			if ($("#" + elementos[i]).css("display") == "none") {

			}
			else {
				do_ = false;
				$("#" + elementos[i].replace("-errorVH", "")).focus();

				//scroll(elementos[i].replace("-errorVH", ""));
				break;
			}

		}

		return do_;
	}

	const submitInsert = () => {

		const d1 = new Date($("#fecha_inicio_v").val());
		const forma = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
		const formatoTime = forma.format(d1);

		//console.log(d.toLocaleDateString() + " " + formattedTime.toString());
		let fechai = d1.toLocaleDateString() + " " + formatoTime.toString();

		const d2 = new Date($("#fecha_termino_v").val());
		const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
		const formattedTime = formatter.format(d2);

		//console.log(d.toLocaleDateString() + " " + formattedTime.toString());
		let fechaf = d2.toLocaleDateString() + " " + formattedTime.toString();
		

		// var user = JSON.parse(localStorage.getItem('credenciales'));
		let puesto_a = $('#Jefe_v').find('option:selected').attr('puesto');
		let nombre_a = $('#Jefe_v').find('option:selected').attr('nombre');
		let email_a = $('#Jefe_v').find('option:selected').attr('email');

		//let fechai = $("#fecha_inicio_v").val().toString().replace("T", " ");
		//let fechaf = $("#fecha_termino_v").val().toString().replace("T", " ");

		if (validaCampos()) {
			Axios.post(host + '/api/solicitud_vehiculo', {

				usuario_v: user[0].email,
				telefono_v: $("#telefono_v").val(),
				motivo_solicitud_v: $("#motivo_solicitud_v").val(),
				descripcion_ruta_v: $("#descripcion_ruta_v").val(),
				numero_personas_v: $("#numero_personas_v").val(),
				personal_manejo_v: $("#personal_manejo_v:checked").val(),
				fecha_inicio_v: $("#fecha_inicio_v").val(),
				fecha_termino_v: $("#fecha_termino_v").val(),
				tipo_camino_v: $("#tipo_camino_v option:selected").val(),
				observacion_v: $("#observacion_v").val()

			}).then(
				(response) => {



					if (response.data != "") {

						let numero_personas = "<p><span style='color:#821b3f'>●Número de personas: </span><strong>" + $("#numero_personas_v").val() + "</strong></p>";

						Alert("¡Solicitud realizada con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");

						enviarEmail(
						/*aplicativo*/"INTRANET - CONAVI:",
						/*cuerpo*/"Nueva solicitud de vehículo de <strong>" + user[0].nombre + "</strong>.  Si necesitas más detalles puedes escribirle al solicitante a:" +
						"<p><span style='color:#821b3f'>●</span><strong>" + user[0].email + "</strong></p>" +
						"<p><span style='color:#821b3f'>Puesto: </span><strong>" + user[0].puesto + "</strong></p>" +
						"<p><span style='color:#821b3f'>Área: </span><strong>" + user[0].area + "</strong></p>" +
							"<p><span style='color:#821b3f'>●</span><strong>" + $("#telefono_v").val() + "</strong></p>" +
							/*asunto*/"<p style='text-align:center'><strong>**Datos adicionales**</strong></p>",
							/*mensaje*/
							"<p><span style='color:#821b3f'>●Motivo de la solicitud: </span><strong>" + $("#motivo_solicitud_v").val() + "</strong></p>" +
							"<p><span style='color:#821b3f'>●Lugar, ubicación o destino de la Comisión: </span><strong>" + $("#descripcion_ruta_v").val() + "</strong></p>" +
							"<p><span style='color:#821b3f'>●¿Requiere personal de manejo?: </span><strong>" + $("#personal_manejo_v:checked").val() + "</strong></p>" +
							"<p><span style='color:#821b3f'>●Fecha y hora de inicio: </span><strong>" + fechai + "</strong></p>" +
							"<p><span style='color:#821b3f'>●Fecha y hora de termino: </span><strong>" + fechaf + "</strong></p>" +
							"<p><span style='color:#821b3f'>●Tipo de camino: </span><strong>" + $("#tipo_camino_v option:selected").val() + "</strong></p>" +
							numero_personas ,
							"<p><span style='color:#821b3f'>●Observaciones:</span><strong>" + $("#observacion_v").val() + "</strong></p>" +
							"<p style='text-align:center'><span style='color:#821b3f'></span><strong>Nota</strong></p>"+
							"<p><span style='color:#821b3f'>●</span><strong>" + $("#nota1").text() + "</strong></p>"+
							"<p><span style='color:#821b3f'>●</span><strong>" + $("#nota_2").text() + "</strong></p>"+
							"<p><span style='color:#821b3f'>●</span><strong>" + $("#nota_3").text() + "</strong></p>",

						/*modulo*/"Nueva solicitud de vehículo",
							/*fotos*/
							$("#t-sp1").val(),
							$("#t-sp2").val(),
							$("#t-sp3").val(),
							$("#t-sp4").val(),
							$("#t-sp5").val());
						limpiar();
					} else {
						Alert("<strong>Ocurrió un errorVH</strong> al realizar esta solicitud.", "alertaOp alert alert-danger alert-dismissible");

					}
				},

			).catch(
				(err) => {
					//console.log(err)
				});
		}
	};

	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-svh").css("display", "none");
		$('html').css("overflow", "");
		$(".errorVH").show();
		$(".text").val("");
		$(".text").val("");
		$(".text").val("");
		$(".check").prop("checked", false);

	}

/*
	function maxdate() {
		var dtToday = new Date();

		var month = dtToday.getMonth() + 1;
		var day = dtToday.getDate();
		var year = dtToday.getFullYear();
		if (month < 10)
			month = '0' + month.toString();
		if (day < 10)
			day = '0' + day.toString();

		var maxDate = year + '-' + month + '-' + day;

		// or instead:
		// var maxDate = dtToday.toISOString().substr(0, 10);


		$('#fecha_inicio_v').attr('min', maxDate + " 00:00:00");
		$('#fecha_termino_v').attr('min', maxDate + " 00:00:00");
	}
*/
	useEffect(() => {
		const user = getUserCredenciales();
   		 if (!user) {
     		 window.location.href = "/int/#/";
    		  return;
  		  }

	//	maxdate();
		$.getJSON(host + "/api/get_datos_puestos", function (respuesta) {
			//console.log(respuesta)
			$.each(respuesta, function (key, valor) {
				//$.each(val, function (id, valor) {

				$("#Jefe_v").append("<option puesto='" + valor.puesto + "' nombre='" + valor.nombre + "' email='" + valor.email + "'>" + valor.nombre + "</option>");

				//});
			});
		});
	});

	return (
		<div id='content-svh' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Solicitar vehículo</h4>
			</div>
			<div class='modal-body' style={{ height: 450, overflowX: "auto", overflowY: "auto" }}>

				<p>Usuario:</p>
				<select class="form-control" id="cboUsuario_v">

				</select>

				<p class="top-buffer-x25">Teléfono de Contacto</p>
				<div>
					<label style={{ fontSize: 12 }}>Caracteres restantes: <span class="crt-count" style={{ fontSize: 12 }}>10</span></label>
					<textarea maxLength="10" minLength="10"
						id="telefono_v"
						placeholder="Especifica tu numero telefónico"
						style={{ resize: "none" }} class='form-control  max text numonly'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="telefono_v-errorVH" class="errorVH_v errorVH" for="telefono_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Motivo de la Solicitud:</p>
				<div>
					<label style={{ fontSize: 12 }}>Caracteres restantes: <span class="crt-count" style={{ fontSize: 12 }}>250</span></label>
					<textarea maxLength="250" minLength="1"
						id="motivo_solicitud_v"
						placeholder="Especifica el motivo de la solicitud"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="motivo_solicitud_v-errorVH" class="errorVH_v errorVH" for="motivo_solicitud_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Lugar, ubicación o destino de la Comisión:</p>
				<div>
					<label style={{ fontSize: 12 }}>Caracteres restantes: <span class="crt-count" style={{ fontSize: 12 }}>250</span></label>
					<textarea maxLength="250" minLength="1"
						id="descripcion_ruta_v"
						placeholder="Especifica el lugar, ubicación o destino de la Comisión"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="descripcion_ruta_v-errorVH" class="errorVH_v errorVH" for="descripcion_ruta_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Número de personas:</p>
				<div>
					<label style={{ fontSize: 12 }}>Caracteres restantes: <span class="crt-count" style={{ fontSize: 12 }}>2</span></label>
					<textarea maxLength="2" minLength="1"
						id="numero_personas_v"
						placeholder="Especifica el número de personas"
						style={{ resize: "none" }} class='form-control  max text numonly'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>

				</div>

				<p class="top-buffer-x25">Personal para manejo del vehículo (sujeto a disponibilidad):</p>
				<div>
					<input class="check" id="personal_manejo_v" type="radio" name="personal_manejo_v" value="Si"
						onChange={(e) => validarrd(e.target.id)} /> Si<br />
					<input class="check" id="personal_manejo_v" type="radio" name="personal_manejo_v" value="No"
						onChange={(e) => validarrd(e.target.id)} /> No<br />
					<label id="personal_manejo_v-errorVH" class="errorVH_v errorVH" for="personal_manejo_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Fecha y hora de inicio del servicio:</p>
				<div>
					<input type="datetime-local" class="form-control datetime text" id="fecha_inicio_v" minLength="1"
						onChange={(e) => validar(e.target.id, e.target.minLength)}

					></input><br />
					<label id="fecha_inicio_v-errorVH" class="errorVH_v errorVH" for="fecha_inicio_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Fecha y hora de termino del servicio:</p>
				<div>
					<input type="datetime-local" class="form-control datetime text" id="fecha_termino_v" minLength="1"
						onChange={(e) => validar(e.target.id, e.target.minLength)}></input><br />
					<label id="fecha_termino_v-errorVH" class="errorVH_v errorVH" for="fecha_termino_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Tipo de camino</p>
				<div>
					<select class="form-control" name="tipo_camino_v" id="tipo_camino_v"
					onChange={(e) => validarCmb(e.target.id, e.target.minLength)} >
					<option value="0">--SELECCIONA--</option>
						<option value="ASFALTO">Asfalto</option>
						<option value="TERRACERIA">Terracería</option>
					</select>
					
					<label id="tipo_camino_v-errorVH" class="errorVH_v errorVH" for="tipo_camino_v" >Campo requerido *</label> 
				</div>
				<p class="top-buffer-x25">Observaciones:</p>
				<div>
					<label style={{ fontSize: 12 }}>Caracteres restantes: <span class="crt-count" style={{ fontSize: 12 }}>250</span></label>
					<textarea maxLength="250" minLength="1"
						id="observacion_v"
						placeholder="Especifica observaciones"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="observacion_v-errorVH" class="errorVH_v errorVH" for="observacion_v" >Campo requerido *</label>
				</div>
				<br></br>
		
				<div  class="alert alert-info" style={{ textAlign: "justify" }}>
					<p class="p-center"><strong>Nota:</strong></p>
					<br></br>
					<p id="nota1">*Es importante recordarle que, <strong>LA SOLICITUD DEL VEHÍCULO DEBERÁ REALIZARSE CON 3 DÍAS HÁBILES DE ANTICIPACIÓN,</strong> en horario de<strong> 09:00 a 19:00 horas</strong> y <strong>SE LE ASIGNARÁ UN VEHÍCULO EN UN PLAZO de 24 horas.</strong></p>
					<br></br>
					<p id="nota_2">*<strong>Al inicio </strong>de cada servicio, <strong>SE DEBERÁ LLENAR LA BITÁCORA CON LOS DATOS DE LA COMISIÓN, ESCRIBIR EL KILOMETRAJE Y COMBUSTIBLE INICIAL</strong> (tomar foto) y deberá ser<strong> FIRMADA POR EL USUARIO</strong>, asimismo,<strong> al término</strong> de cada servicio, se <strong>DEBERÁ ESTACIONAR</strong> EN EL <strong>NÚMERO DEL TARJETÓN</strong> CORRESPONDIENTE Y<strong> ENTREGAR EL VEHÍCULO EN LAS MISMAS CONDICIONES EN QUE LE ES ENTREGADO</strong>, así como, la<strong> LLAVE DEL VEHÍCULO ASIGNADO</strong> en su caso,<strong> TARJETA(S) DE COMBUSTIBLE, ESCRIBIR EL KILOMETRAJE Y EL COMBUSTIBLE FINAL EN LA BITÁCORA.</strong></p>
					<br></br>
					<p id="nota_3">*POR FAVOR, se requiere <strong>CONFIRMAR LA RECEPCIÓN</strong> del CORREO ELECTRÓNICO DE LA SOLICITUD<strong> DE ASIGNACIÓN UNA HORA ANTES, DE LO CONTRARIO, NO SE CONTEMPLARÁ EL SERVICIO,</strong> asimismo, SI POR ALGUNA RAZÓN<strong> YA NO SE REQUIERE DEL SERVICIO, FAVOR DE NOTIFICARLO EN EL MISMO CORREO,</strong> PARA QUE SEA REASIGNADO A OTRA ÁREA SOLICITANTE.</p>
				</div>
				<div class="row top-buffer bottom-buffer-x15">
					<button id="btnGuardar-svh" class='col-md-3 col-xs-12 btn-primary'
						style={{ marginRight: 10, marginBottom: 10 }}
						onClick={submitInsert}
					>Guardar</button>
					<button id="btnCerrar-svh" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
						onClick={limpiar}>Cancelar</button>
				</div>

			</div>
		</div>
	);
}