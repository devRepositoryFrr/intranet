import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/soporte.css';
import '../../assets/js/soporte.js';
import React, { useState, useEffect } from 'react';
import Alert from '../../assets/js/Alerta.js';
import Axios from 'axios';
import { disabled_button, enabled_button } from '../../assets/js/botones'
function obtenerTipoSoporte() {


	var user = (JSON.parse(localStorage.getItem('credenciales')) == null) ? JSON.parse('[{"email":"notloged","nombre":""}]') : user = JSON.parse(localStorage.getItem('credenciales'));
	$.each(user[0], function (key, value) {
		$("#soporte_txt" + key).text(value);
	});

	$(".tipoSoporte").remove();
	var items = [];
	$("#soporte_cbotipo").append("<option class='tipoSoporte' value='0'>--Selecciona--</option>");
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/tipo_soporte", function (data) {
		$.each(data, function (key, val) {
			$("#soporte_cbotipo").append("<option class='tipoSoporte' value='" + val.id + "'>" + val.descripcion + "</option>");

		});
	});

}

let subject = "soportesistemas@conavi.gob.mx";
//let subject = "jmvargas@conavi.gob.mx";


export default function ModalSp() {
	useEffect(() => {
		limpiar();
		obtenerTipoSoporte();

		let botones = 1;
		$("#add-archivo").click(function () {
			botones = $("#botones").val();
			$("#d-sp" + botones).removeClass("hidden");

			if ($("#botones").val() >= 5) {
				$("#add-archivo").addClass("disabled");
				$("#add-archivo").prop("disabled", true);
			}
			botones++;
			$("#botones").val(botones);

		});

		$("#status").hide();
		var window_focus;

		$(window).focus(function () {
			window_focus = true;
		}).blur(function () {
			window_focus = false;
		});
		

		function ImageToBase64(input) {
			var img = $("#f-" + input).prop('files')[0];
			var reader = new FileReader();
			reader.onloadend = function () {
				$('#t-' + input).val(reader.result);
			}
			reader.readAsDataURL(img);
		}

		$(".files_").bind("click", function () {
			var id_ = this.id.toString().split("-");



			var loopFocus = setInterval(function () {
				if (window_focus) {
					clearInterval(loopFocus);
					if ($('#f-' + id_[1]).val() === '') {
						$('#d-' + id_[1]).css("background-color", "#b8925f");
						$('#s-' + id_[1]).text(" Cargar un archivo");
						$('#i-' + id_[1]).addClass("fa-file-upload");
						$('#i-' + id_[1]).removeClass("fa-check-circle");
					} else {
						$('#d-' + id_[1]).css("background-color", "#255d51");
						$('#s-' + id_[1]).text(" Archivo cargado");
						$('#i-' + id_[1]).addClass("fa-check-circle");
						$('#i-' + id_[1]).removeClass("fa-file-upload");
						ImageToBase64(id_[1]);
					}
				}
			}, 500);
		});


		$('#d-sp1').click(function () { $('#f-sp1')[0].click(); });
		$('#d-sp2').click(function () { $('#f-sp2')[0].click(); });
		$('#d-sp3').click(function () { $('#f-sp3')[0].click(); });
		$('#d-sp4').click(function () { $('#f-sp4')[0].click(); });
		$('#d-sp5').click(function () { $('#f-sp5')[0].click(); });


		function validar_ticket() {
			var des, tipo;
			let objSoporte = $("#frmSoporte").serializeToJSON();
			$.each(objSoporte, function (key, val) {
				des = val.txtdescripcion;
				tipo = val.cbotipo;
			});

			if (des != "" && tipo != "0") {
				enabled_button("btnGuardar-sp");
			} else {
				disabled_button("btnGuardar-sp");
			}
		}


		$("#soporte_txtdescripcion").keyup(function () {
			validar_ticket();
		});

		$("#soporte_cbotipo").change(function () {
			validar_ticket();
		});


	});





	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-sp").css("display", "none");
		$('html').css("overflow", "");
		$("#add-archivo").prop("disabled", false);
		$("#soporte_cbotipo option[value=0]").prop('selected', true);
		$("#soporte_txtdescripcion").val('');
		$("#add-archivo").removeClass("disabled");
		$("#add-archivo").prop("disabled", false);
		$("#botones").val("1")
		for (var i = 1; i < 6; i++) {
			$("#d-sp" + i).addClass("hidden");
		}
	}

	function getExtension(nombre) {

		let x = nombre.split(".");
		let i = x.length;
		console.log("some" + i)
		return x[i - 1];
	}
	const submitInsert = () => {
		var user = JSON.parse(localStorage.getItem('credenciales'));
		let ext1 = getExtension($("#f-sp1").val());
		let ext2 = getExtension($("#f-sp2").val());
		let ext3 = getExtension($("#f-sp3").val());
		let ext4 = getExtension($("#f-sp4").val());
		let ext5 = getExtension($("#f-sp5").val());
		Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nuevo_ticket', {
			usuario: user[0].email,
			id_soporte: $("#soporte_cbotipo").children("option:selected").val(),
			descripcion: $("#soporte_txtdescripcion").val()

		}).then(
			(response) => {
				if (response.data != "") {

					//const imageStr = fileToBase64(document.getElementById('f-sp1').files[0]);

					console.log($("#t-sp1").val().toString().replace("data:image/jpeg;base64,", ""));

					enviarEmail(
						/*aplicativo*/"INTRANET - CONAVI:",
						/*cuerpo*/"Tienes un nuevo ticket de <strong>" + user[0].nombre + "</strong>, si necesitas mas detalles puedes escribirle a <strong>" + user[0].email + "</strong>.",
						/*asunto*/"Asunto: <strong>" + $("#soporte_cbotipo").children("option:selected").text() + "</strong>.",
						/*mensaje*/
						"Descripción <strong>" + $("#soporte_txtdescripcion").val() + "</strong>.",
						/*modulo*/"Nuevo ticket",
						/*fotos*/
						$("#t-sp1").val().toString().replace("data:image/jpeg;base64,", "").replace("data:application/pdf;base64,", ""),
						$("#t-sp2").val().toString().replace("data:image/jpeg;base64,", "").replace("data:application/pdf;base64,", ""),
						$("#t-sp3").val().toString().replace("data:image/jpeg;base64,", "").replace("data:application/pdf;base64,", ""),
						$("#t-sp4").val().toString().replace("data:image/jpeg;base64,", "").replace("data:application/pdf;base64,", ""),
						$("#t-sp5").val().toString().replace("data:image/jpeg;base64,", "").replace("data:application/pdf;base64,", ""), ext1,ext2,ext3,ext4,ext5);

					limpiar();
					Alert("¡Registraste un nuevo ticket con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
				} else {
					Alert("<strong>Ocurrió un error</strong> al registrar este ticket.", "alertaOp alert alert-danger alert-dismissible");

				}
			},
		).catch(

			(err) => {
				limpiar();
				//console.log(err)
			});

	};

	const enviarEmail = (aplicativo, cuerpo, asunto, mensaje, modulo, img1, img2, img3, img4, img5, ext1, ext2, ext3, ext4, ext5) => {
		Axios.post("https://sistemaintegral.conavi.gob.mx:81/api/send_mailsp", {
	//	Axios.post("http://localhost:3001/api/send_mailsp", {
			aplicativo,
			cuerpo,
			asunto,
			mensaje,
			subject,
			modulo,
			img1,
			ext1,
			ext2,
			ext3,
			ext4,
			ext5,
			img2,
			img3,
			img4,
			img5
		});

	}



	return (
		<div id='content-sp' class='modal-content' style={{ display: "none", overflow: "hidden" }}>
			<input type="hidden" value="1" id="botones" />
			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Levantamiento de tickets</h4>
			</div>

			<div class='modal-body' style={{ height: 450, overflowX: "auto", overflowY: "auto", padding: 20 }}>
				<form id="frmSoporte">

					<p>Área: <strong><span name="soporte.txtarea" id="soporte_txtarea" retrieve="soporte_txtarea"></span></strong></p>
					<p>Solicitante: <strong><span name="soporte.txtnombre" id="soporte_txtnombre" retrieve="soporte_txtnombre"></span></strong></p>
					<p>Tipo de soporte:</p>
					<select id="soporte_cbotipo" name="soporte.cbotipo" retrieve="soporte_cbotipo" class="form-control">
					</select>
					<p>Descripción del problema:</p>
					<div>
						<label style={{ fontSize: 12 }}>Caracteres restantes: <span class="crt-count" style={{ fontSize: 12 }}>500</span></label>
						<textarea maxLength="500"
							name="soporte.txtdescripcion"
							id="soporte_txtdescripcion"
							retrieve="soporte_txtdescripcion"
							style={{ resize: "none" }} class='form-control bottom-buffer-x15 max'
						/*onChange={(e) => {
							if (e.target.value != "") {
								$("#btnGuardar-ntf").removeClass('disabled');
								$("#btnGuardar-ntf").prop('disabled', false);
							} else {
								$("#btnGuardar-ntf").addClass('disabled');
								$("#btnGuardar-ntf").prop('disabled', true);
							}
							setdbDescripcion(e.target.value);
						}}*/
						>

						</textarea>
					</div>



				</form>

				<button id="add-archivo" class="btn-default">
					<span class="glyphicon glyphicon-file"></span> Agregar un archivo
				</button>

				<div>
					<div id="d-sp1" class="file-select hidden">
						<i id="i-sp1" class="fas fa-file-upload"></i><span id="s-sp1"> Cargar un archivo</span>
						<input class="files_" accept="application/pdf, image/jpeg, image/png" id="f-sp1" type="file" style={{ display: "none" }}></input>

					</div>
					<input id="t-sp1" type="hidden"></input>

					<div id="d-sp2" class="file-select hidden">
						<i id="i-sp2" class="fas fa-file-upload"></i><span id="s-sp2"> Cargar un archivo</span>
						<input class="files_" accept="application/pdf, image/jpeg, image/png" id="f-sp2" type="file" style={{ display: "none" }}></input>

					</div>
					<input id="t-sp2" type="hidden"></input>
					<div id="d-sp3" class="file-select hidden">
						<i id="i-sp3" class="fas fa-file-upload"></i> <span id="s-sp3">Cargar un archivo</span>
						<input class="files_" accept="application/pdf,image/jpeg, image/png" id="f-sp3" type="file" style={{ display: "none" }}></input>

					</div>
					<input id="t-sp3" type="hidden"></input>
					<div id="d-sp4" class="file-select hidden">
						<i id="i-sp4" class="fas fa-file-upload"></i><span id="s-sp4"> Cargar un archivo</span>
						<input class="files_" accept="application/pdf,image/jpeg, image/png" id="f-sp4" type="file" style={{ display: "none" }}></input>

					</div>
					<input id="t-sp4" type="hidden"></input>
					<div id="d-sp5" class="file-select hidden">
						<i id="i-sp5" class="fas fa-file-upload"></i><span id="s-sp5"> Cargar un archivo</span>
						<input class="files_" accept="application/pdf,image/jpeg, image/png  " id="f-sp5" type="file" style={{ display: "none" }}></input>

					</div>
					<input id="t-sp5" type="hidden"></input>
				</div>

				<button id="btnGuardar-sp" class='disabled col-md-3 col-xs-12 btn-primary'
					style={{ marginRight: 10, marginBottom: 10 }}
					onClick={submitInsert}

				>Guardar</button>
				<button id="btnCerrar-sp" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
					onClick={limpiar}>Cancelar</button>

			</div>



		</div>
	);
}
