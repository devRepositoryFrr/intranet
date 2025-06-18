import $, { each } from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/datepicker.css';
import '../../assets/css/bitacora.css';

import Alert from '../../assets/js/Alerta.js';
import Axios from 'axios';





export default function ModalSac() {
	let subject = "gmiguel@conavi.gob.mx;jzenil@conavi.gob.mx;lecastrejon@conavi.gob.mx";
	//let subject = "lmmendoza@conavi.gob.mx";
	var user = JSON.parse(localStorage.getItem('credenciales'));

	const validar = (id, require) => {

		var do_ = true;

		if ($("#" + id).val().length < require) {
			$("#" + id + "-errorSAC").show();
			$("#alert-" + id + "-errorSAC").addClass("hidden");

			do_ = false;

		} else {

			$("#" + id + "-errorSAC").hide();
		}
		return do_;
	}

	const validarrd = (id) => {

		var do_ = true;

		if ($("#" + id).val().length < 0) {
			$("#" + id + "-errorSAC").show();
			$("#alert-" + id + "-errorSAC").addClass("hidden");

			do_ = false;



		} else {
			$("#" + id + "-errorSAC").hide();
			if (id = "ingresa_vehiculo") {
				
				if ($("#ingresa_vehiculo:checked").val() == "Si") {
					$(".ingresa_vehiculo").removeClass("hidden");
				} else {
					$(".ingresa_vehiculo").addClass("hidden");
					$("#datos_vehiculo").val("");
				}
			}
			
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
		var elementos = $(".errorSAC_s").map(function () {
			return this.id;
		}).get();

		for (var i = 0; i < elementos.length; i++) {
			//console.log(elementos[i])
			if ($("#" + elementos[i]).css("display") == "none") {

			}
			else {
				do_ = false;
				$("#" + elementos[i].replace("-errorSAC", "")).focus();

				//scroll(elementos[i].replace("-errorSAC", ""));
				break;
			}

		}

		return do_;
	}

	const submitInsert = () => {



		if (validaCampos()) {
			Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/solicitar_acceso', {
				cboUsuario_s: $("#cboUsuario_s").val(),
				cargo_s:  user[0].puesto,
				area:  user[0].area,
				nombre_visitante: $("#nombre_visitante").val(),
				tipo_personal: $("#tipo_personal").val(),
				fecha_visita: $("#fecha_visita").val(),
				ingresa_vehiculo: $("#ingresa_vehiculo:checked").val(),
				datos_vehiculo: $("#datos_vehiculo").val(),
				area_visita: $("#area_visita").val(),
				email_visitante: $("#email_visitante").val(),
				celular_visitante: $("#celular_visitante").val(),
				observaciones: $("#observaciones_s").val()

			}).then(
				(response) => {


					
					if (response.data != "") {
						var vehiculo = ""
						if ($("#ingresa_vehiculo:checked").val() == "Si") {
							vehiculo = "<p><span style='color:#821b3f'>●Datos del vehículo (Marca, Submarca, placas y color): </span><strong>" + $("#datos_vehiculo").val() + "</strong></p>";
						} else {

						}

						Alert("¡Solicitud realizada con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");

						enviarEmail(
						/*aplicativo*/"INTRANET - CONAVI:",
						/*cuerpo*/"Nueva solicitud de <strong>" + user[0].nombre + "</strong> para el acceso de <strong>" + $("#nombre_visitante").val() + "</strong>. Si necesitas más detalles puedes escribirle al solicitante a:" +
							"<p><span style='color:#821b3f'>●</span><strong>" + user[0].email + "</strong></p>" +
							"<p><span style='color:#821b3f'>●Telefono del solicitante: </span><strong>" + $("#celular_visitante").val() + "</strong></p>" +
							"<p><span style='colo:#821b3f'>●Cargo del solicitante: </span><strong>" + user[0].puesto + "</strong></p>" +
							"<p><span style='colo:#821b3f'>●Area del solicitante: </span><strong>" + user[0].area + "</strong></p>" +

						/*asunto*/"<p style='text-align:center'><strong>**Datos adicionales**</strong></p>",
							/*mensaje*/
							"<p><span style='colo:#821b3f'>●Nombre del visitante del solicitante: </span><strong>" +$("#nombre_visitante").val() + "</strong></p>" +
							"<p><span style='color:#821b3f'>●Fecha y hora de la visita: </span><strong>" + $("#fecha_visita").val().replace("T", " ") + "Hrs </strong></p>" +
							"<p><span style='color:#821b3f'>●Área y piso que visita: </span><strong>" + $("#area_visita").val() + "</strong></p>" +
						//	"<p><span style='color:#821b3f'>●Es personal: </span><strong>" + $("#tipo_personal").val() + "</strong></p>" + 
							vehiculo ,

							//"<p style='text-align:justify'>De ser necesario, puedes contactar al visitante con los siguientes medios de contacto:</p>" +
							//"<p><span style='color:#821b3f'>●E-mail: </span><strong>" + $("#email_visitante").val() + "</strong></p>" 
							

							"<p style='margin-top:20px'>Observaciones:<p>" +
							"<p style='margin-top:20px'>" + $("#observaciones_s").val() + "<p>"+
							"<p style='text-align:center'><span style='color:#821b3f'></span><strong>Nota</strong></p>"+
							"<p><span style='color:#821b3f'>●</span><strong>" + $("#nota_1").text() + "</strong></p>",



						/*modulo*/"Nueva solicitud de acceso",
							/*fotos*/
							$("#t-sp1").val(),
							$("#t-sp2").val(),
							$("#t-sp3").val(),
							$("#t-sp4").val(),
							$("#t-sp5").val());
						limpiar();
					} else {
						Alert("<strong>Ocurrió un errorSAC</strong> al realizar esta solicitud.", "alertaOp alert alert-danger alert-dismissible");

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
		$("#content-sac").css("display", "none");
		$('html').css("overflow", "");
		$(".errorSAC").show();
		$(".text").val("");
		$(".check").prop("checked", false);

	}



	return (
		<div id='content-sac' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Solicitar acceso</h4>
			</div>
			<div class='modal-body' style={{ height: 450, overflowX: "auto", overflowY: "auto" }}>
				<p>Usuario:</p>
				<select class="form-control" id="cboUsuario_s">

				</select>

				{/*<p class="top-buffer-x25">Cargo del solicitante:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
					<textarea maxLength="200" minLength="1"
						id="cargo_s"
						placeholder="Especifica tu cargo"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="cargo_s-errorSAC" class="errorSAC_s errorSAC" for="cargo_s" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Área del solicitante:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
					<textarea maxLength="200" minLength="1"
						id="area"
						placeholder="Especifica tu área"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="area-errorSAC" class="errorSAC_s errorSAC" for="area" >Campo requerido *</label>
				</div>
				<p class="top-buffer-x25">Correo electrónico del solicitante:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>100</span></label>
					<textarea maxLength="100" minLength="1"
						id="email_visitante"
						placeholder="Especifica el correo electrónico del solicitante"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="email_visitante-errorSAC" class="errorSAC_s errorSAC" for="email_visitante" >Campo requerido *</label>
				</div>*/}
				<p class="top-buffer-x25">Telefono de contacto del solicitante:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>10</span></label>
					<textarea maxLength="10" minLength="10"
						id="celular_visitante"
						placeholder="Especifica el número telefonico del solicitante"
						style={{ resize: "none" }} class='form-control  max text numonly'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="celular_visitante-errorSAC" class="errorSAC_s errorSAC" for="celular_visitante" >Campo requerido *</label>
				</div>


				<p class="top-buffer-x25">Nombre del visitante del solicitante:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>150</span></label>
					<textarea maxLength="150" minLength="1"
						id="nombre_visitante"
						placeholder="Especifica el nombre del visitante del solicitante"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="nombre_visitante-errorSAC" class="errorSAC_s errorSAC" for="nombre_visitante" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Fecha y hora de la visita:</p>
				<div>
					<input type="datetime-local" class="form-control datetime text" id="fecha_visita" minLength="1"
						onChange={(e) => validar(e.target.id, e.target.minLength)}></input><br />
					<label id="fecha_visita-errorSAC" class="errorSAC_s errorSAC" for="fecha_visita" >Campo requerido *</label>
				</div>
				<p class="top-buffer-x25">Área y piso que visita:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>150</span></label>
					<textarea maxLength="150" minLength="1"
						id="area_visita"
						placeholder="Especifica área y piso que visita"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="area_visita-errorSAC" class="errorSAC_s errorSAC" for="area_visita" >Campo requerido *</label>
				</div>

				
				<p class="top-buffer-x25">Ingresa con vehículo:</p>
				<div class="text-justify">
					<input class="check" id="ingresa_vehiculo" type="radio" name="tipo_personal" value="Si"
						onChange={(e) => validarrd(e.target.id)} /> Si (esta sujeto a disponibilidad de espacios de estacionamiento)<br />
					<input class="check" id="ingresa_vehiculo" type="radio" name="tipo_personal" value="No"
						onChange={(e) => validarrd(e.target.id)} /> No<br />
					<label id="ingresa_vehiculo-errorSAC" class="errorSAC_s errorSAC" for="ingresa_vehiculo" >Campo requerido *</label>
				</div>
				<div class="ingresa_vehiculo hidden">
					<p class="top-buffer-x25">Datos del vehículo (Marca, submarca, placas y color):</p>
					<div>
						<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>150</span></label>
						<textarea maxLength="150" minLength="1"
							id="datos_vehiculo"
							placeholder="Especifica los datos del vehículo"
							style={{ resize: "none" }} class='form-control  max text'
							onChange={(e) => validar(e.target.id, e.target.minLength)}
						>
						</textarea>
						<label id="datos_vehiculo-errorSAC" class="errorSAC_s errorSAC ingresa_vehiculo hidden" for="datos_vehiculo" >Campo requerido *</label>
					</div>
				</div>
				<p class="top-buffer-x25">Observaciones:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
					<textarea maxLength="200" minLength="1"
						id="observaciones_s"
						placeholder="Especifica tus observaciones"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>

				</div>
				<br></br>
				<div  class="alert alert-info" style={{ textAlign: "justify" }}>
					<p class="p-center"><strong>Nota:</strong></p>
					<p id="nota_1">Para brindar el servicio de acceso de manera eficiente, <strong>se deberá solicitar con 1 día hábil de anticipación, en un horario de 09:00 a 19:00 horas;</strong> asimismo, se informa que no se permitirá el acceso los fines de semana, si no está plenamente justificado por el jefe inmediato del personal que acudirá; siempre y cuando se trate de temas de trabajo, además de enviar invariablemente la solicitud en tiempo y forma.</p>
				</div>

{/*
				<p class="top-buffer-x25">Es personal:</p>
				<div>
					<input class="check" id="tipo_personal" type="radio" name="tipo_personal" value="interno"
						onChange={(e) => validarrd(e.target.id)} /> Interno<br />
					<input class="check" id="tipo_personal" type="radio" name="tipo_personal" value="externo"
						onChange={(e) => validarrd(e.target.id)} /> Externo<br />
					<label id="tipo_personal-errorSAC" class="errorSAC_s errorSAC" for="tipo_personal" >Campo requerido *</label>
				</div>
*/}
																	
			<div class="row top-buffer bottom-buffer-x15">
					<button id="btnGuardar-sac" class='col-md-3 col-xs-12 btn-primary'
						style={{ marginRight: 10, marginBottom: 10 }}
						onClick={submitInsert}
					>Guardar</button>
					<button id="btnCerrar-sac" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
						onClick={limpiar}>Cancelar</button>
				</div>

			</div>
		</div>
	);
}