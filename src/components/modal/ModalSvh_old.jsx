import $, { each } from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/datepicker.css';
import '../../assets/css/bitacora.css';

import Alert from '../../assets/js/Alerta.js';

import Axios from 'axios';
import { useEffect } from 'react';





export default function ModalSvh() {
	let subject = "iemejia@conavi.gob.mx;jzenil@conavi.gob.mx;lecastrejon@conavi.gob.mx;gmiguel@conavi.gob.mx";
	//let subject = "lmmendoza@conavi.gob.mx";


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



		let puesto_a = $('#Jefe_v').find('option:selected').attr('puesto');
		let nombre_a = $('#Jefe_v').find('option:selected').attr('nombre');
		let email_a = $('#Jefe_v').find('option:selected').attr('email');


		if (validaCampos()) {
			Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/solicitud_vehiculo', {

				cboUsuario_v: $("#cboUsuario_v").val(),
				cargo_v: $("#cargo_v").val(),
				area_v: $("#area_v").val(),
				telefono_v: $("#telefono_v").val(),
				descripcion_ruta_v: $("#descripcion_ruta_v").val(),
				numero_personas_v: $("#numero_personas_v").val(),
				personal_manejo_v: $("#personal_manejo_v:checked").val(),
				fecha_inicio_v: $("#fecha_inicio_v").val(),
				fecha_termino_v: $("#fecha_termino_v").val(),
				observacion_ruta_v: $("#observacion_ruta_v").val()

			}).then(
				(response) => {


					var user = JSON.parse(localStorage.getItem('credenciales'));
					if (response.data != "") {

						var numero_personas = ""
						if ($("#numero_personas_v:checked").val() == "Si") {
							numero_personas = "<p><span style='color:#821b3f'>●Número de personas: </span><strong>" + $("#numero_personas_v").val() + "</strong></p>";
						} else {

						}
						Alert("¡Solicitud realizada con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");

						enviarEmail(
						/*aplicativo*/"INTRANET - CONAVI:",
						/*cuerpo*/"Nueva solicitud de vehículo de <strong>" + user[0].nombre + "</strong>  Si necesitas más detalles puedes escribirle al solicitante a:" +
							"<p><span style='color:#821b3f'>●</span><strong>" + user[0].email + "</strong></p>" +
							"<p><span style='color:#821b3f'>●</span><strong>" + $("#telefono_v").val() + "</strong></p>" +

							"<p><span style='color:#821b3f'>Solicitud autorizada por: </span><strong>" + nombre_a + "</strong></p>" +
							"<p><span style='color:#821b3f'>Email: </span><strong>" + email_a + "</strong></p>" +
							"<p><span style='color:#821b3f'>Puesto: </span><strong>" + puesto_a + "</strong></p>" +

							/*asunto*/"<p style='text-align:center'><strong>**Datos adicionales**</strong></p>",
							/*mensaje*/
							"<p><span style='color:#821b3f'>●Descripción de la ruta: </span><strong>" + $("#descripcion_ruta_v").val() + "</strong></p>" +
							"<p><span style='color:#821b3f'>●¿Requiere personal de manejo?: </span><strong>" + $("#personal_manejo_v:checked").val() + "</strong></p>" +
							"<p><span style='color:#821b3f'>●Fecha de inicio: </span><strong>" + $("#fecha_inicio_v").val() + "</strong></p>" +
							"<p><span style='color:#821b3f'>●Fecha de termino: </span><strong>" + $("#fecha_termino_v").val() + "</strong></p>" +
							numero_personas,
							"<p style='margin-top:20px'>Observaciones de la ruta:<p>" +
							"<p style='margin-top:20px'>" + $("#observacion_ruta_v").val() + "<p>",
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
		$("#Jefe_v option[value='0']").prop('selected', true);
		$(".check").prop("checked", false);

	}


	useEffect(() => {
		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/get_datos_puestos", function (respuesta) {
			console.log(respuesta)
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
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Solicitar acceso</h4>
			</div>
			<div class='modal-body' style={{ height: 450, overflowX: "auto", overflowY: "auto" }}>
				<p>Usuario:</p>
				<select class="form-control" id="cboUsuario_v">

				</select>
				<div>
					<p class="top-buffer-x25">Solicitud autorizada por:</p>
					<select class="form-control" id="Jefe_v"
						onChange={(e) => validarCmb(e.target.id)}>
						<option value="0">--SELECCIONA--</option>
					</select>
					<label id="Jefe_v-errorVH" class="errorVH_v errorVH" for="Jefe_v" >Campo requerido *</label>
				</div>
				<p class="top-buffer-x25">Cargo del solicitante:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
					<textarea maxLength="200" minLength="1"
						id="cargo_v"
						placeholder="Especifica tu cargo"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="cargo_v-errorVH" class="errorVH_v errorVH" for="cargo_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Área del solicitante:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>200</span></label>
					<textarea maxLength="200" minLength="1"
						id="area_v"
						placeholder="Especifica tu área"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="area_v-errorVH" class="errorVH_v errorVH" for="area_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Teléfono de contacto:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>10</span></label>
					<textarea maxLength="10" minLength="10"
						id="telefono_v"
						placeholder="Especifica tu numero telefónico"
						style={{ resize: "none" }} class='form-control  max text numonly'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="telefono_v-errorVH" class="errorVH_v errorVH" for="telefono_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Descripción de la ruta (traslado ó comisión):</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>250</span></label>
					<textarea maxLength="250" minLength="1"
						id="descripcion_ruta_v"
						placeholder="Especifica la descripción de la ruta"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="descripcion_ruta_v-errorVH" class="errorVH_v errorVH" for="descripcion_ruta_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Número de personas:</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>2</span></label>
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

				<p class="top-buffer-x25">Fecha de inicio del servicio:</p>
				<div>
					<input type="date" class="form-control datetime text" id="fecha_inicio_v" minLength="1"
						onChange={(e) => validar(e.target.id, e.target.minLength)}></input><br />
					<label id="fecha_inicio_v-errorVH" class="errorVH_v errorVH" for="fecha_inicio_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Fecha de termino del servicio:</p>
				<div>
					<input type="date" class="form-control datetime text" id="fecha_termino_v" minLength="1"
						onChange={(e) => validar(e.target.id, e.target.minLength)}></input><br />
					<label id="fecha_termino_v-errorVH" class="errorVH_v errorVH" for="fecha_termino_v" >Campo requerido *</label>
				</div>

				<p class="top-buffer-x25">Observaciones (ruta terracería, ruta pavimentada, etc...):</p>
				<div>
					<label style={{ fontSize: 12 }}>Carateres restantes: <span class="crt-count" style={{ fontSize: 12 }}>500</span></label>
					<textarea maxLength="500" minLength="1"
						id="observacion_ruta_v"
						placeholder="Especifica observaciones"
						style={{ resize: "none" }} class='form-control  max text'
						onChange={(e) => validar(e.target.id, e.target.minLength)}
					>
					</textarea>
					<label id="observacion_ruta_v-errorVH" class="errorVH_v errorVH" for="observacion_ruta_v" >Campo requerido *</label>
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