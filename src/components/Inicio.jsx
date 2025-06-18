import $, { each } from 'jquery';

import { Link } from "react-router-dom";
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'
import React, { useState, useEffect } from 'react';
import ModalNtf from './modal/ModalNtf';
import ModalBt from './modal/ModalBt';
import ModalLb from './modal/ModalLb';
import ModalSac from './modal/ModalSac';
import ModalSvh from './modal/ModalSvh';
import ModalDt from './modal/ModalDt';
import ModalSp from './modal/ModalSp';
import ModalSpV from './modal/ModalSpV';
import ModalNt from './modal/ModalNt';
import ModalCe from './modal/ModalCe';
import ModalSnaM from './modal/ModalSnaM';
import ModalPl from './modal/ModalPl';
import ModalAsis from './modal/ModalAsis';
import dat from 'dat.gui';
import Alerta from './Alerta';
import { disabled_button, enabled_button } from '../assets/js/botones'
import '../assets/css/scroll.css';
import '../assets/css/navbar.css';
import '../assets/css/modal.css';
import '../assets/css/content.css';
import '../assets/css/notificacion.css';
import '../assets/css/datepicker.css';
import '../assets/css/emergente.css';
import audio from '../assets/ntf/ntf.wav';
import id from 'date-fns/esm/locale/id/index.js';

import Alert from '../assets/js/Alerta.js';
import Axios from 'axios';
import SystemsGalery from './SystemsGalery';


let modulo = "Inicio";
let tries = 0;
var _currentTime = new Date()
//redirect
const scroll = (id) => {
	try {
		let el = document.getElementById(id);
		el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
	} catch (e) { }


}

const validarPsw = () => {

	var do_ = true

	if ($("#n_password").val() == "") {
		$(".error-psw").text('El campo "Nueva contraseña" es obligatorio');
		$(".error-psw").removeClass("hidden");
		$("#n_password").focus();

		do_ = false;
		return false;
	} else if ($("#n_password_c").val() == "") {
		$(".error-psw").text('El campo "Confirmar contraseña" es obligatorio');
		$(".error-psw").removeClass("hidden");
		$("#n_password_c").focus();
		do_ = false;
		return false;
	} else if ($("#n_password_c").val() != $("#n_password").val()) {
		$(".error-psw").text('Las contraseñas no coinciden');
		$(".error-psw").removeClass("hidden");
		$("#n_password").focus();
		do_ = false;
		return false;
	} else {
		$(".error-psw").addClass("hidden");
	}

	return do_;
}


const submitPsw = () => {
	if (validarPsw()) {

		var user_ = JSON.parse(localStorage.getItem('credenciales'));
		Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/cambio_contrasena', {

			password: $("#n_password").val(),
			email: user_[0].email,
		}).then(
			(response) => {

				if (response.data != "") {
					Alert("¡Actualizaste tu contraseña con<strong> éxito</strong>!", "alertaOp alert alert-success alert-dismissible");
					$(".modal-psw").css("display", "none");
					localStorage.setItem('flag', "[{\"cambio\":\"1\"}]");
				} else {
					Alert("<strong>Ocurrió un error</strong> al actualizar tu contraseña.", "alertaOp alert alert-danger alert-dismissible");

				}
			},
		).catch(

			(err) => {
				alert();
				//console.log(err)
			});
	} else {

	}


};

function juridico() {
	scroll("bread");
	window.location.href = "/int/#/Juridico";
}

function difusion() {
	scroll("bread");
	window.location.href = "/int/#/Galeria";
}

function comeri() {
	var user_ = JSON.parse(localStorage.getItem('credenciales'));
	scroll("bread");
	window.location.href = "/int/#/Comeri";
	$("#cboUsuario_pn").append("<option value='" + user_[0].email + "'>" + user_[0].nombre + "</option>");
}

function obtenerDirectorio(tipo) {


	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_directorio/" + tipo, function (data) {

		var items = [];

console.log(data);

		$.each(data, function (key, val) {

			let url = "https://sistemaintegral.conavi.gob.mx:81/int/foto_personal/" + val.email + ".jpg"


			items.push(
				"<li id='dt" + key + "' class='list-item'> " +
				"<div style={{}}> " +
				//"<img class='list-item-image " + val.genero + "' /> " +
				"<img class='list-item-image' src='" + url + "'/> " +
				"</div> " +
				"<div class='list-item-content'> " +
				"<h4 class='h4'>" + val.nombre + "</h4> " +
				"<p class='p'>" + val.identi + "</p> " +
				"<div class='hidden box-dt list-detail'> " +
				"<p id='ext' class='p ln'><strong>Ext.: </strong>" + val.extension + "</p> " +
				"<p id='area' class='p ln'><strong>Área: </strong> " + val.area + "</p> " +
				"<p id='cargo' class='p ln'><strong>Cargo: </strong> " + val.puesto + "</p> " +
				"<p id='mail' class='p ln'><strong>E-mail: </strong> " + val.email + "</p> " +
				//"<img class='list-item-image-xl' alt='_Sin fotogafía' src='" + url + "'></img>" +
				"</div> " +
				"</div> " +
				"</li> ");

		});

		$(".list-item").remove();
		$(".list-dt").append(items);
		$('#dt-counter').text(items.length);


	});

}

function obtenerReservaciones() {

	var user = JSON.parse(localStorage.getItem('credenciales'));

	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_reservaciones/" + user[0].email, function (data) {
		var items = [];
		$.each(data, function (key, val) {
			items.push("<div style='padding:10px; text-align:'center'' class='list-lb'><div class='hidden' id='dv" + val.id + "'><i id='a" + val.id + "' class='fas fa-check-circle conf box'></i><i id='c" + val.id + "' class='fas fa-times-circle  canc box'></i></div><i id='d" + val.id + "'  class='fas fa-minus-circle  del '></i>" + val.detalle + "</div>");
		});
		$(".list-lb").remove();
		$(".lb-list").append(items);
		$('#lb-counter').text(items.length);
	});

}

function obtenerTitulosNt() {
	$(".enlace-nt").remove();
	$(".t-nt").remove();
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_nt/T", function (data) {
		var items = [];
		$.each(data, function (key, val) {
			items.push(
				"<li class='t-nt titulos-nt" + val.id_bloque + "'><input type='checkbox' name='list' id='nt-title-" + val.id_bloque + "' /><label for='nt-title-" + val.id_bloque + "'>" + val.descripcion + "</label><ul class='interior interior" + val.id_bloque + "'></ul></li>"
			);
		});

		$("#menu").append(items);
		addEnlacesNt();
	});

}

function addEnlacesNt() {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_nt/L", function (data) {

		$.each(data, function (key, val) {
			if (val.subtitulo == "X") {
				$(".interior" + val.id_bloque).append(
					"<li id='nt-link-" + val.id + "'><strong>" + val.descripcion + "</strong></li>");
			} else {
				$(".interior" + val.id_bloque).append(
					"<li><a id='nt-link-" + val.id + "' class='enlace enlace-nt' href='../int/" + val.ubicacion + "' target='_blank'>" + val.descripcion + "</a></li>");
			}

		});



	});

}

function obtenerTitulosCe() {
	$(".enlace-ce").remove();
	$(".t-ce").remove();
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_ce/T", function (data) {
		var items = [];

		$.each(data, function (key, val) {
			items.push(
				"<li class='t-ce titulos-ce" + val.id_bloque + "'><input type='checkbox' name='list' id='ce-title-" + val.id_bloque + "' /><label for='ce-title-" + val.id_bloque + "'>" + val.descripcion + "</label><ul class='interior interior" + val.id_bloque + "'></ul></li>"
			);
		});

		$("#menu-ce").append(items);
		addEnlacesCe();
	});

}

function addEnlacesCe() {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_Ce/L", function (data) {

		$.each(data, function (key, val) {
			if (val.subtitulo == "X") {
				$(".interior" + val.id_bloque).append(
					"<li id='ce-link-" + val.id + "'><strong>" + val.descripcion + "</strong></li>");
			} else {
				$(".interior" + val.id_bloque).append(
					"<li><a id='ce-link-" + val.id + "' class='enlace enlace-ce' href='../int/" + val.ubicacion + "' target='_blank'>" + val.descripcion + "</a></li>");
			}

		});



	});

}

function obtenerTitulosPl(bloque) {

	$(".enlace-pl").remove();
	$(".t-pl").remove();
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_pl/T/" + bloque, function (data) {
		//$.getJSON("http://localhost:3001/api/titulos_pl/T/"+bloque, function (data) {
		var items = [];

		$.each(data, function (key, val) {
			items.push(
				"<li class='t-pl titulos-pl" + val.id_bloque + "'><input type='checkbox' name='list' id='pl-title-" + val.id_bloque + "' /><label for='pl-title-" + val.id_bloque + "'>" + val.descripcion + "</label><ul class='interior interior" + val.id_bloque + "'></ul></li>"
			);
		});

		$("#menu-pl").append(items);
		addEnlacesPl(bloque);
	});

}

function addEnlacesPl(bloque) {
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/titulos_pl/L/" + bloque, function (data) {
		//$.getJSON("http://localhost:3001/api/titulos_pl/L/"+bloque, function (data) {
		$.each(data, function (key, val) {
			if (val.subtitulo == "X") {
				$(".interior" + val.id_bloque).append(
					"<li id='pl-link-" + val.id + "'><strong>" + val.descripcion + "</strong></li>");
			} else {
				$(".interior" + val.id_bloque).append(
					"<li><a id='pl-link-" + val.id + "' class='enlace enlace-pl' href='../int/" + val.ubicacion + "' target='_blank'>" + val.descripcion + "</a></li>");
			}

		});



	});

}

function obtenerTipoSoporte() {
	$(".tipoSoporte").remove();
	var items = [];
	$("#soporte_cbotipo").append("<option class='tipoSoporte' value='0'>--Selecciona--</option>");
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/tipo_soporte", function (data) {
		$.each(data, function (key, val) {
			$("#soporte_cbotipo").append("<option class='tipoSoporte' value='" + val.id + "'>" + val.descripcion + "</option>");

		});
	});

}

function obtenerStatusTicket() {
	var user = JSON.parse(localStorage.getItem('credenciales'));

	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_tickets/" + user[0].email, function (data) {
		var items = [];
		$.each(data, function (key, val) {
			var icon = "";
			switch (val.id_status) {
				case "P":
					icon = "fas fa-history"
					break;
				case "A":
					icon = "fas fa-sync-alt"
					break;
				case "C":
					icon = "fas fa-check-double"
					break;
				case "R":
					icon = "fas fa-times"
			}
			items.push(
				"<li id='spv" + key + "' class='list-item'> " +
				"<div class='stat-" + val.id_status + "'> " +
				"<i style='width:64px;height:64px;;font-size: 30px;color: #fff;margin-top: 17px;' class='" + icon + "'></i>" +
				"</div> " +
				"<div class='list-item-content'> " +
				"<h4 class='h4'>" + val.id_soporte + "</h4> " +
				"<p class='p'>" + val.fecha + "</p> " +
				"<div class='hidden box-dt list-detail'> " +
				"<p id='descripcion' class='p ln'><strong>Status: </strong>" + val.status + "</p> " +
				"<p id='descripcion' class='p ln'><strong>Asignado a: </strong>" + val.asignacion + "</p> " +
				"<p id='descripcion' class='p ln'><strong>Descripcion del problema: </strong>" + val.descripcion + "</p> " +
				"<p id='descripcion' class='p ln'><strong>Fecha de cierre: </strong>" + val.fecha_cierre + "</p> " +
				"</div> " +
				"</div> " +
				"</li> ");
		});
		$(".list-item").remove();
		$(".list-spv").append(items);
		$('#spV-counter').text(items.length);
	});

}



const jqu = () => {

	function obtenerNotificaciones() {

		if ($("body").hasClass("Inicio") == true) {
			$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_notificaciones", function (data) {

				var items = [];

				$.each(data, function (key, val) {
					if (val.tipo == "bth") {
						items.push("<p class='ntf'><span class='red-ic fas fa-birthday-cake'></span> " + val.descripcion + " </p>");
					} else if (val.tipo == "btr") {
						items.push("<p class='ntf'><span class='red-ic fas fa-users'></span> " + val.descripcion + " </p>");
					} else {

						items.push("<p class='ntf'><span class='red-ic fas fa-comment-dots'></span> " + val.descripcion + " </p>");
					}
				});


				if (ntf_counter !== items.length) {
					$(".ntf").remove();
					ntf_counter = items.length;
					$(".ntf-list").append(items);
					$('#ntf-counter').text(items.length);
					n.play();
					ntf_anima();

				} else {


				}

			});

			$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/ver_visitas", function (data) {

				var items = [];

				$.each(data, function (key, val) {
					var num = val.visitas;
					$("#visitas").text(Number(num).toLocaleString('en'));

				});

			});

		}
	}

	let ntf_counter = 0;
	let interaction = 0;

	var n = new Audio(audio);

	obtenerNotificaciones();

	setInterval(obtenerNotificaciones, 20000);
	if (tries == 0) {

		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/cumple_mes", function (data) {

			$.each(data, function (key, val) {
				$("#cumple-mes").append(val.des);

			});

		});
		tries = 1;
	}
	$("#ntf-close").click(function () {

	});


	$.fn.rotate = function (degrees, step, current) {
		var self = $(this);
		current = current || 0;
		step = step || 5;
		current += step;
		self.css({
			'-webkit-transform': 'rotate(' + current + 'deg)',
			'-moz-transform': 'rotate(' + current + 'deg)',
			'-ms-transform': 'rotate(' + current + 'deg)',
			'transform': 'rotate(' + current + 'deg)',

		},

		);
		if (current != degrees) {
			setTimeout(function () {
				self.rotate(degrees, step, current);
			}, 30);
		}
	};

	function ntf_anima() {
		$(".fa-bell, .badge").rotate(360);


	}

}

const ntf_open = () => {
	$(".ntf-box").css("display", "block");
	$(".ntf-box").animate({
		'opacity': '1',
		'margin-left': '0'
	}, 500);


}

const ntf_close = () => {
	$(".ntf-box").animate({
		'opacity': '0',
		'margin-left': '-50%',
	}, 500);
	setTimeout(function () { $(".ntf-box").css("display", "none"); }, 500);
}

function UpperFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const load = () => {

	//var refreshIntervalId = setInterval(() => {
	const script = document.createElement("script");
	script.id = "fmwk_gob";
	script.src = "https://framework-gb.cdn.gob.mx/gobmx.js";
	script.async = true;
	document.body.appendChild(script);
	var fnac = "";
	var user = JSON.parse(localStorage.getItem('credenciales'));
	var flag = JSON.parse(localStorage.getItem('flag'));
	$.each(user, function (key, val) {
		$("#usr").text(val.nombre);

		var d = new Date();

		var month = d.getMonth() + 1;
		var day = d.getDate();

		var output = d.getFullYear() + '-' +
			(month < 10 ? '0' : '') + month + '-' +
			(day < 10 ? '0' : '') + day;


		fnac = (new Date).getFullYear() + val.fecha_nacimiento.toString().substring(4, 10);

		if (fnac == output) {
			let cad = $("#usr").text().split(" ");

			$("#fire").removeClass("hidden")
			$("#brth").text("Feliz Cumpleaños " + UpperFirst(cad[cad.length - 1].toLowerCase()));
			firework();
		}

	});
	$.each(flag, function (key_, val_) {
		if (val_.cambio == "0") {
			$(".modal-psw").css("display", "block");

		} else {

		}
	});
	if ($('#navbarMainCollapse').length != 0) {
		//clearInterval(refreshIntervalId);
		$("#fmwk_gob").remove();
	} else {
		$("#fmwk_gob").remove();
	}

	var Permisos = [];
	var Modulos = [];
	var user = JSON.parse(localStorage.getItem('credenciales'));

	$.each(user, function (key, val) {
		Permisos = val.permisos.split(",");
		Modulos = val.modulos.split(",");
	});

	for (var i = 0; i < Modulos.length; i++) {

		if (Permisos.toString().match(Modulos[i])) {

		} else {
			$("#" + Modulos[i]).remove();
		}

	}
	$(".loading").addClass("hidden");
	//}, 400);

	$("html, body").removeClass("gbColor");
	$("body").addClass("Inicio");



}

const soporte = () => {
	window.location.href = "/int/#/Soporte";

}



const out = () => {
	$(".navbar").remove();
	$(".main-footer").remove();

	$("#slideshow-container").remove();
	$("body").removeClass("Inicio");
	localStorage.clear();
	window.location.href = "/int/#/";

}

//modales

//snam
const open_snam = () => {
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-snam").css("display", "block");
}

//nueva notificación
const add_ntf = () => {
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-ntf").css("display", "block");

}

//nueva reservación de sala
const add_bt = () => {
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-bt").css("display", "block");

	var user = JSON.parse(localStorage.getItem('credenciales'));
	$("#cboUsuario").append("<option value='" + user[0].email + "'>" + user[0].nombre + "</option>");

}

//liberar sala
const add_lb = () => {
	obtenerReservaciones();
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-lb").css("display", "block");
}

const add_sac = () => {
	var user = JSON.parse(localStorage.getItem('credenciales'));
	$("#cboUsuario_s").append("<option value='" + user[0].email + "'>" + user[0].nombre + "</option>");


	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-sac").css("display", "block");
}

const add_svh = () => {
	var user = JSON.parse(localStorage.getItem('credenciales'));
	$("#cboUsuario_v").append("<option value='" + user[0].email + "'>" + user[0].nombre + "</option>");

	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-svh").css("display", "block");
}


const add_asis = (tipo) => {

	var user = JSON.parse(localStorage.getItem('credenciales'));
	disabled_button("btnGuardar-sp");
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-asis").css("display", "block");

	//$.each(user[0], function (key, value) {
	//	$("#soporte_txt" + key).text(value);
	//});

	//obtenerTipoSoporte();
}

//abrir normateca
const open_nt = () => {
	obtenerTitulosNt();
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-nt").css("display", "block");
}

//abrir comité de ética 
const open_ce = () => {
	obtenerTitulosCe();
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-ce").css("display", "block");
}

//abrir programa de labores
const open_pl = (bloque, titulo) => {
	obtenerTitulosPl(bloque);
	$(".titulo-modal").text(titulo)
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-pl").css("display", "block");
}

const open_pl_all = () => {
	open_pl("6", "Programa Anual");
	open_pl("7", "Programa de Labores");
}

//abrir directorio
const open_dt = (tipo) => {

	$(".list-item").remove();
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-dt").css("display", "block");
	obtenerDirectorio(tipo);
}

//abrir nuevo ticket
const open_nticket = (tipo) => {

	var user = JSON.parse(localStorage.getItem('credenciales'));
	disabled_button("btnGuardar-sp");
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-sp").css("display", "block");

	//$.each(user[0], function (key, value) {
	//	$("#soporte_txt" + key).text(value);
	//});

	//obtenerTipoSoporte();
}

//ver tickets capturados
const open_vticket = (tipo) => {
	obtenerStatusTicket();
	$("#modal").css("display", "block");
	$('html').css("overflow", "hidden");
	$("#content-spV").css("display", "block");

}

function firework() {
	(function () {

		var Fireworks = function () {
			/*=============================================================================*/
			/* Utility
			/*=============================================================================*/
			var self = this;
			var rand = function (rMi, rMa) { return ~~((Math.random() * (rMa - rMi + 1)) + rMi); }
			var hitTest = function (x1, y1, w1, h1, x2, y2, w2, h2) { return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1); };
			window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1E3 / 60) } }();

			/*=============================================================================*/
			/* Initialize
			/*=============================================================================*/
			self.init = function () {
				self.dt = 0;
				self.oldTime = Date.now();
				self.canvas = document.createElement('canvas');
				self.canvasContainer = $('#canvas-container');

				var canvasContainerDisabled = document.getElementById('canvas-container');
				self.canvas.onselectstart = function () {
					return false;
				};

				self.canvas.width = self.cw = 2000;
				self.canvas.height = self.ch = 400;

				self.particles = [];
				self.partCount = 1000;
				self.fireworks = [];
				self.mx = self.cw / 2;
				self.my = self.ch / 2;
				//color
				self.currentHue = 10;
				self.partSpeed = 5;
				self.partSpeedVariance = 10;
				self.partWind = 50;
				self.partFriction = 5;
				self.partGravity = 1;
				self.hueMin = 150;
				self.hueMax = 200;
				self.fworkSpeed = 2;
				self.fworkAccel = 4;
				self.hueVariance = 30;
				self.flickerDensity = 20;
				self.showShockwave = false;
				self.showTarget = true;
				self.clearAlpha = 25;

				self.canvasContainer.append(self.canvas);
				self.ctx = self.canvas.getContext('2d');
				self.ctx.lineCap = 'round';
				self.ctx.lineJoin = 'round';
				self.lineWidth = 1;
				self.bindEvents();
				self.canvasLoop();

				self.canvas.onselectstart = function () {
					return false;
				};

			};

			/*=============================================================================*/
			/* Particle Constructor
			/*=============================================================================*/
			var Particle = function (x, y, hue) {
				this.x = x;
				this.y = y;
				this.coordLast = [
					{ x: x, y: y },
					{ x: x, y: y },
					{ x: x, y: y }
				];
				this.angle = rand(0, 360);
				this.speed = rand(((self.partSpeed - self.partSpeedVariance) <= 0) ? 1 : self.partSpeed - self.partSpeedVariance, (self.partSpeed + self.partSpeedVariance));
				this.friction = 1 - self.partFriction / 100;
				this.gravity = self.partGravity / 2;
				this.hue = rand(hue - self.hueVariance, hue + self.hueVariance);
				this.brightness = rand(50, 80);
				this.alpha = rand(40, 100) / 100;
				this.decay = rand(10, 50) / 1000;
				this.wind = (rand(0, self.partWind) - (self.partWind / 2)) / 25;
				this.lineWidth = self.lineWidth;
			};

			Particle.prototype.update = function (index) {
				var radians = this.angle * Math.PI / 180;
				var vx = Math.cos(radians) * this.speed;
				var vy = Math.sin(radians) * this.speed + this.gravity;
				this.speed *= this.friction;

				this.coordLast[2].x = this.coordLast[1].x;
				this.coordLast[2].y = this.coordLast[1].y;
				this.coordLast[1].x = this.coordLast[0].x;
				this.coordLast[1].y = this.coordLast[0].y;
				this.coordLast[0].x = this.x;
				this.coordLast[0].y = this.y;

				this.x += vx * self.dt;
				this.y += vy * self.dt;

				this.angle += this.wind;
				this.alpha -= this.decay;

				if (!hitTest(0, 0, self.cw, self.ch, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2) || this.alpha < .05) {
					self.particles.splice(index, 1);
				}
			};

			Particle.prototype.draw = function () {
				var coordRand = (rand(1, 3) - 1);
				self.ctx.beginPath();
				self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
				self.ctx.lineTo(Math.round(this.x), Math.round(this.y));
				self.ctx.closePath();
				self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
				self.ctx.stroke();

				if (self.flickerDensity > 0) {
					var inverseDensity = 50 - self.flickerDensity;
					if (rand(0, inverseDensity) === inverseDensity) {
						self.ctx.beginPath();
						self.ctx.arc(Math.round(this.x), Math.round(this.y), rand(this.lineWidth, this.lineWidth + 3) / 2, 0, Math.PI * 2, false)
						self.ctx.closePath();
						var randAlpha = rand(50, 100) / 100;
						self.ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + randAlpha + ')';
						self.ctx.fill();
					}
				}
			};

			/*=============================================================================*/
			/* Create Particles
			/*=============================================================================*/
			self.createParticles = function (x, y, hue) {
				var countdown = self.partCount;
				while (countdown--) {
					self.particles.push(new Particle(x, y, hue));
				}
			};

			/*=============================================================================*/
			/* Update Particles
			/*=============================================================================*/
			self.updateParticles = function () {
				var i = self.particles.length;
				while (i--) {
					var p = self.particles[i];
					p.update(i);
				};
			};

			/*=============================================================================*/
			/* Draw Particles
			/*=============================================================================*/
			self.drawParticles = function () {
				var i = self.particles.length;
				while (i--) {
					var p = self.particles[i];
					p.draw();
				};
			};

			/*=============================================================================*/
			/* Firework Constructor
			/*=============================================================================*/
			var Firework = function (startX, startY, targetX, targetY) {
				this.x = startX;
				this.y = startY;
				this.startX = startX;
				this.startY = startY;
				this.hitX = false;
				this.hitY = false;
				this.coordLast = [
					{ x: startX, y: startY },
					{ x: startX, y: startY },
					{ x: startX, y: startY }
				];
				this.targetX = targetX;
				this.targetY = targetY;
				this.speed = self.fworkSpeed;
				this.angle = Math.atan2(targetY - startY, targetX - startX);
				this.shockwaveAngle = Math.atan2(targetY - startY, targetX - startX) + (90 * (Math.PI / 180));
				this.acceleration = self.fworkAccel / 100;
				this.hue = self.currentHue;
				//brillo del fuego
				this.brightness = rand(50, 80);
				//opacidad del fuego
				this.alpha = rand(50, 100) / 100;
				this.lineWidth = self.lineWidth;
				this.targetRadius = 1;
			};

			Firework.prototype.update = function (index) {
				self.ctx.lineWidth = this.lineWidth;



				var vx = Math.cos(this.angle) * this.speed,
					vy = Math.sin(this.angle) * this.speed;
				this.speed *= 1 + this.acceleration;
				this.coordLast[2].x = this.coordLast[1].x;
				this.coordLast[2].y = this.coordLast[1].y;
				this.coordLast[1].x = this.coordLast[0].x;
				this.coordLast[1].y = this.coordLast[0].y;
				this.coordLast[0].x = this.x;
				this.coordLast[0].y = this.y;

				if (self.showTarget) {
					if (this.targetRadius < 8) {
						this.targetRadius += .25 * self.dt;
					} else {
						this.targetRadius = 1 * self.dt;
					}
				}

				if (this.startX >= this.targetX) {
					if (this.x + vx <= this.targetX) {
						this.x = this.targetX;
						this.hitX = true;
					} else {
						this.x += vx * self.dt;
					}
				} else {
					if (this.x + vx >= this.targetX) {
						this.x = this.targetX;
						this.hitX = true;
					} else {
						this.x += vx * self.dt;
					}
				}

				if (this.startY >= this.targetY) {
					if (this.y + vy <= this.targetY) {
						this.y = this.targetY;
						this.hitY = true;
					} else {
						this.y += vy * self.dt;
					}
				} else {
					if (this.y + vy >= this.targetY) {
						this.y = this.targetY;
						this.hitY = true;
					} else {
						this.y += vy * self.dt;
					}
				}

				if (this.hitX && this.hitY) {
					var randExplosion = rand(0, 9);
					self.createParticles(this.targetX, this.targetY, this.hue);
					self.fireworks.splice(index, 1);
				}
			};

			Firework.prototype.draw = function () {
				self.ctx.lineWidth = this.lineWidth;

				var coordRand = (rand(1, 3) - 1);
				self.ctx.beginPath();
				self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
				self.ctx.lineTo(Math.round(this.x), Math.round(this.y));
				self.ctx.closePath();
				self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
				self.ctx.stroke();

				if (self.showTarget) {
					self.ctx.save();
					self.ctx.beginPath();
					self.ctx.arc(Math.round(this.targetX), Math.round(this.targetY), this.targetRadius, 0, Math.PI * 2, false)
					self.ctx.closePath();
					self.ctx.lineWidth = 1;
					self.ctx.stroke();
					self.ctx.restore();
				}

				if (self.showShockwave) {
					self.ctx.save();
					self.ctx.translate(Math.round(this.x), Math.round(this.y));
					self.ctx.rotate(this.shockwaveAngle);
					self.ctx.beginPath();
					self.ctx.arc(0, 0, 1 * (this.speed / 5), 0, Math.PI, true);
					self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + rand(25, 60) / 100 + ')';
					self.ctx.lineWidth = this.lineWidth;
					self.ctx.stroke();
					self.ctx.restore();
				}
			};

			/*=============================================================================*/
			/* Create Fireworks
			/*=============================================================================*/
			self.createFireworks = function (startX, startY, targetX, targetY) {
				self.fireworks.push(new Firework(startX, startY, targetX, targetY));
			};

			/*=============================================================================*/
			/* Update Fireworks
			/*=============================================================================*/
			self.updateFireworks = function () {
				var i = self.fireworks.length;
				while (i--) {
					var f = self.fireworks[i];
					f.update(i);
				};
			};

			/*=============================================================================*/
			/* Draw Fireworks
			/*=============================================================================*/
			self.drawFireworks = function () {
				var i = self.fireworks.length;
				while (i--) {
					var f = self.fireworks[i];
					f.draw();
				};
			};

			/*=============================================================================*/
			/* Events
			/*=============================================================================*/
			self.bindEvents = function () {




			}

			/*=============================================================================*/
			/* Clear Canvas
			/*=============================================================================*/
			self.clear = function () {
				self.particles = [];
				self.fireworks = [];
				self.ctx.clearRect(0, 0, self.cw, self.ch);
			};

			/*=============================================================================*/
			/* Delta
			/*=============================================================================*/
			self.updateDelta = function () {
				var newTime = Date.now();
				self.dt = (newTime - self.oldTime) / 16;
				self.dt = (self.dt > 5) ? 5 : self.dt;
				self.oldTime = newTime;
			}

			/*=============================================================================*/
			/* Main Loop
			/*=============================================================================*/
			self.canvasLoop = function () {
				window.requestAnimFrame(self.canvasLoop, self.canvas);
				self.updateDelta();
				self.ctx.globalCompositeOperation = 'destination-out';
				self.ctx.fillStyle = 'rgba(0,0,0,' + self.clearAlpha / 100 + ')';
				self.ctx.fillRect(0, 0, self.cw, self.ch);
				self.ctx.globalCompositeOperation = 'lighter';
				self.updateFireworks();
				self.updateParticles();
				self.drawFireworks();
				self.drawParticles();
			};

			self.init();

			var initialLaunchCount = 10;
			while (initialLaunchCount--) {
				setTimeout(function () {
					self.fireworks.push(new Firework(self.cw / 2, self.ch, rand(50, self.cw - 50), rand(50, self.ch / 2) - 50));
				}, initialLaunchCount * 200);
			}

		}

		/*=============================================================================*/
		/* GUI
		/*=============================================================================*/
		var guiPresets = {

			"preset": "Default",
			"remembered": {
				"Default": {
					"0": {
						"fworkSpeed": 2,
						"fworkAccel": 4,
						"showShockwave": false,
						"showTarget": true,
						"partCount": 30,
						"partSpeed": 5,
						"partSpeedVariance": 10,
						"partWind": 50,
						"partFriction": 5,
						"partGravity": 1,
						"flickerDensity": 20,
						"hueMin": 150,
						"hueMax": 200,
						"hueVariance": 30,
						"lineWidth": 1,
						"clearAlpha": 25
					}
				},
				"Anti Gravity": {
					"0": {
						"fworkSpeed": 4,
						"fworkAccel": 10,
						"showShockwave": true,
						"showTarget": false,
						"partCount": 150,
						"partSpeed": 5,
						"partSpeedVariance": 10,
						"partWind": 10,
						"partFriction": 10,
						"partGravity": -10,
						"flickerDensity": 30,
						"hueMin": 0,
						"hueMax": 360,
						"hueVariance": 30,
						"lineWidth": 1,
						"clearAlpha": 50
					}
				},
				"Battle Field": {
					"0": {
						"fworkSpeed": 10,
						"fworkAccel": 20,
						"showShockwave": true,
						"showTarget": true,
						"partCount": 200,
						"partSpeed": 30,
						"partSpeedVariance": 5,
						"partWind": 0,
						"partFriction": 5,
						"partGravity": 0,
						"flickerDensity": 0,
						"hueMin": 20,
						"hueMax": 30,
						"hueVariance": 10,
						"lineWidth": 1,
						"clearAlpha": 40
					}
				},
				"Mega Blast": {
					"0": {
						"fworkSpeed": 3,
						"fworkAccel": 3,
						"showShockwave": true,
						"showTarget": true,
						"partCount": 500,
						"partSpeed": 50,
						"partSpeedVariance": 5,
						"partWind": 0,
						"partFriction": 0,
						"partGravity": 0,
						"flickerDensity": 0,
						"hueMin": 0,
						"hueMax": 360,
						"hueVariance": 30,
						"lineWidth": 20,
						"clearAlpha": 20
					}
				},
				"Nimble": {
					"0": {
						"fworkSpeed": 10,
						"fworkAccel": 50,
						"showShockwave": false,
						"showTarget": false,
						"partCount": 120,
						"partSpeed": 10,
						"partSpeedVariance": 10,
						"partWind": 100,
						"partFriction": 50,
						"partGravity": 0,
						"flickerDensity": 20,
						"hueMin": 0,
						"hueMax": 360,
						"hueVariance": 30,
						"lineWidth": 1,
						"clearAlpha": 80
					}
				},
				"Slow Launch": {
					"0": {
						"fworkSpeed": 2,
						"fworkAccel": 2,
						"showShockwave": false,
						"showTarget": false,
						"partCount": 200,
						"partSpeed": 10,
						"partSpeedVariance": 0,
						"partWind": 100,
						"partFriction": 0,
						"partGravity": 2,
						"flickerDensity": 50,
						"hueMin": 0,
						"hueMax": 360,
						"hueVariance": 20,
						"lineWidth": 4,
						"clearAlpha": 10
					}
				},
				"Perma Trail": {
					"0": {
						"fworkSpeed": 4,
						"fworkAccel": 10,
						"showShockwave": false,
						"showTarget": false,
						"partCount": 150,
						"partSpeed": 10,
						"partSpeedVariance": 10,
						"partWind": 100,
						"partFriction": 3,
						"partGravity": 0,
						"flickerDensity": 0,
						"hueMin": 0,
						"hueMax": 360,
						"hueVariance": 20,
						"lineWidth": 1,
						"clearAlpha": 0
					}
				}
			},
			"closed": true,
			"folders": {
				"Fireworks": {
					"preset": "Default",
					"closed": false,
					"folders": {}
				},
				"Particles": {
					"preset": "Default",
					"closed": true,
					"folders": {}
				},
				"Color": {
					"colorA": '#FF00B4',
					"colorB": '#22CBFF',

				},
				"Other": {
					"preset": "Default",
					"closed": true,
					"folders": {}
				}
			}
		};

		var fworks = new Fireworks();
		var gui = new dat.GUI({
			autoPlace: false,
			load: guiPresets,
			preset: 'Default'
		});
		var customContainer = document.getElementById('gui');
		//customContainer.appendChild(gui.domElement);

		var guiFireworks = gui.addFolder('Fireworks');
		guiFireworks.add(fworks, 'fworkSpeed').min(1).max(10).step(1);
		guiFireworks.add(fworks, 'fworkAccel').min(0).max(50).step(1);
		guiFireworks.add(fworks, 'showShockwave');
		guiFireworks.add(fworks, 'showTarget');


		var guiParticles = gui.addFolder('Particles');
		guiParticles.add(fworks, 'partCount').min(0).max(500).step(1);
		guiParticles.add(fworks, 'partSpeed').min(1).max(100).step(1);
		guiParticles.add(fworks, 'partSpeedVariance').min(0).max(50).step(1);
		guiParticles.add(fworks, 'partWind').min(0).max(100).step(1);
		guiParticles.add(fworks, 'partFriction').min(0).max(50).step(1);
		guiParticles.add(fworks, 'partGravity').min(-20).max(20).step(1);
		guiParticles.add(fworks, 'flickerDensity').min(0).max(50).step(1);

		var guiColor = gui.addFolder('Color');

		guiColor.add(fworks, 'hueMin').min(0).max(360).step(1);
		guiColor.add(fworks, 'hueMax').min(0).max(360).step(1);
		guiColor.add(fworks, 'hueVariance').min(0).max(180).step(1);

		var guiOther = gui.addFolder('Other');
		guiOther.add(fworks, 'lineWidth').min(1).max(20).step(1);
		guiOther.add(fworks, 'clearAlpha').min(0).max(100).step(1);
		guiOther.add(fworks, 'clear').name('Clear');

		gui.remember(fworks);

	})();

}


export function asistencia() {
	$('body').on('click', '#asist_', function () {
		add_asis();
	});
	var user_ = (JSON.parse(localStorage.getItem('credenciales'))==null)?JSON.parse('[{"email":"notloged","nombre":""}]'):user_=JSON.parse(localStorage.getItem('credenciales'));
	const email = user_[0].email;
	const d = new Date().toLocaleDateString('en-CA');
	const h = new Date().toLocaleTimeString("en-US", { hour12: false });
	//console.log(email)
	$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/todAsis/" + email + "/" + d, function (data) {

		var items = [];
		//console.log(data)
		if (data.length != 0) {
			$.each(data, function (key, val) {
				var ent = val.entrada;
				var sal = val.salida;
				//console.log("salida ",sal)
				$("#asistencia").removeClass("basis").css("textAlign", "left").html('<table class="table"><thead><tr><th>Entrada</th><th>Salida</th></tr></thead><tbody><tr><td>' + ent + '</td><td>' + sal + '</td></tr></tbody></table>');
			});
		} else if (h <= "10:00:59") {
			$("#asistencia").addClass("basis").css("textAlign", "").html('<a class = "white" id="asist_" fontSize: 400 }}><i class="fas fa-user-check top-buffer-x15"> </i></a>');
		} else {
			$("#asistencia").removeClass("basis").css("textAlign", "left").html('<table class="table"><thead><tr><th>Entrada</th><th>Salida</th></tr></thead><tbody><tr><td>-</td><td>-</td></tr></tbody></table>');
		}
	});
}

function Inicio(props) {
	const isLogged = localStorage.getItem('credenciales');
	let datos = JSON.parse(isLogged);
	useEffect(() => {


		asistencia();
		//firework()
		if (!isLogged) {
			out();

		} else {
			
			if (datos[0].expires == null || Date.parse(datos[0].expires) < Date.parse(_currentTime)) {
				out();
			} else {
				jqu();
				load();
			}
		}

		setTimeout(() => {
			$("#canvas-container").remove()

		}, 4000)
	});


	return (
		<div className="Inicio">
			<header>
				<center id="fire" class="hidden">
					<div class="wrapper" style={{ position: "fixed", left: "0", right: "0" }} id="canvas-container">
						<div class="feliz">
							<p id="brth" class="blink fantasy">Feliz Cumpleaños</p>
						</div>
					</div>
				</center>


				<div class="loading">
					<i class="gold fa fa-spin fa-bahai loading-icon"> </i>
				</div>

				<div class="modal-psw">
					<div class="modal-psw-content">
						<div class='modal-header'>
							<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Actualiza tu contraseña</h4>
						</div>

						<div class='modal-body' style={{ overflowX: "auto", overflowY: "auto" }}>

							<div>
								<small>Nueva contraseña</small>
								<input id="n_password" type="password" class="form-control" placeholder="Define tu nueva contraseña" autoComplete="new-password" ></input>

							</div>
							<div>
								<small>Confirmar contraseña</small>
								<input id="n_password_c" type="password" class="form-control" placeholder="Confirma tu nueva contraseña" autoComplete="new-password" ></input>
								<small class="error error-psw hidden"></small>
							</div>

							<button onClick={submitPsw} class="top-buffer btn btn-primary">Actualizar contraseña</button>
						</div>



					</div>
				</div>
				<Accesibilidad />
				<Alerta />
				<GaleriaHeader />

				<div class="flotante stat-mes cumple-mes" style={{ right: 0, zIndex: 20 }}>
					<span id="cumple-mes" class="stat-count-mes">

					</span>
					<p class="stat-detail-mes">Cumpleaños del mes</p>
				</div>
				{<div id="f-asis" class="flotante ctrl-asis" style={{ right: 0, zIndex: 20 }}>
					<div class="stat-asis">
						<span id="asistencia" class="stat-counta"><i class="fas fa-spinner fa-spin"></i></span>
						<p class="stat-detail">Asistencia</p>
					</div>
				</div>}
				<div class="flotante" style={{ right: 0, zIndex: 20 }}>
					<div class="stat">
						<span id="visitas" class="stat-count"><i class="fas fa-spinner fa-spin"></i></span>
						<p class="stat-detail">Visitantes</p>
					</div>
				</div>



				<div id="cont" class="container">
					<p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>

					<ol id="bread" class="breadcrumb">
						<li><a href=""><i class="icon icon-home"></i></a></li>
						<li class="active"><Link class="nav-link">Inicio</Link></li>
					</ol>

					<div id="modal" class="modal">
						<ModalNtf />
						<ModalBt />
						<ModalLb />
						<ModalSac />
						<ModalSvh />
						<ModalDt />
						<ModalSp />
						<ModalSpV />
						<ModalNt />
						<ModalCe />
						<ModalSnaM />
						<ModalPl />
						{<ModalAsis />}
					</div>

					<div>

						<a onClick={ntf_open} class="notification bottom-buffer-x15">
							<span><i class="fas fa-bell" style={{ fontSize: 50 }}></i></span>
							<span class="badge"><p id="ntf-counter">0</p></span>
						</a>

						<div class="ntf-box">
							<div style={{ height: 20, position: "relative" }}>
								<div style={{ textAlign: "end", position: "absolute", right: 0, margin: 5 }}>
									<span onClick={ntf_close} id="ntf-close"><i class="far fa-times-circle red" style={{ textAlign: "end", cursor: 'pointer' }}></i></span>
								</div>
								<div style={{ textAlign: "start", position: "absolute", left: 0, margin: 5 }}>
									<span><i onClick={add_ntf} id="add-ntf" class="fas fa-plus-circle red" style={{ cursor: 'pointer', fontSize: 20 }} ></i></span><h10> Notificaciones diarias </h10>
									<hr style={{ marginTop: 1 }} class="red"></hr>
								</div>
							</div>
							<div class="ntf-list"></div>
						</div>
					</div>
					<div class="row"><div class="col-md-12">
					<a href="https://declaranet.gob.mx/" target={"_blank"}>
								<img class="dnet9 img-responsive" />

							</a>
						</div></div>
						<br></br>
					<SystemsGalery />
					<div class="top-buffer"></div>
					<div class="row" style={{ textAlign: "center", alignItems: "center" }}>
						<div class="col-md-6 enlace" style={{ padding: 30 }}>
							<strong><h10>Misión - Visión</h10></strong>
							<hr class="red"></hr>
							<a>
								<img class="mision-vision img-responsive"/>
							</a>
						{/*	<a href="../int/docs/mision.png" target={"_blank"}>
								<img class="mision img-responsive" />
							</a>*/}
						</div>

						<div class="col-md-6 enlace" style={{ padding: 30 }}>
							<strong><h10>Valores</h10></strong>
							<hr class="red"></hr>
							<a>
							<img class="valores img-responsive"/>
							</a>
						{/*	<a href="../int/docs/mision.png" target={"_blank"}>
								<img class="vision img-responsive" />
							</a>*/}
						</div>
					</div>
					<div ></div><strong><h10>Proceso de renovación del Comité de Ética y de Conflictos de  Interés de la CONAVI</h10></strong>
					<hr class="red"></hr>
					<div class="cepci-vot bottom-buffer">
						<div class="">
							<a href="https://sistemaintegral.conavi.gob.mx:81/int/#/cepci" target={"_blank"}><img width={650} class="img-responsive" src="https://sistemaintegral.conavi.gob.mx:81/int/cepci_conv.png"></img></a>
						</div>
					</div>

					<div ></div><strong><h10>Programa Nacional de Combate a la Corrupción y la Impunidad y de Mejora de la Gestión Pública 2019-2024</h10></strong>
					<hr class="red"></hr>
					<div class="cepci-vot bottom-buffer">
						<div class="col-md-4">
							<img width={650} class="img-responsive" src="https://sistemaintegral.conavi.gob.mx:81/int/oic/IMPUNIDAD4jun-01.png"></img>
						</div>
						<div class="col-md-4">
							<img width={650} class="img-responsive" src="https://sistemaintegral.conavi.gob.mx:81/int/oic/IMPUNIDAD4jun-02.png"></img>
						</div>
						<div class="col-md-4">
							<img width={650} class="img-responsive" src="https://sistemaintegral.conavi.gob.mx:81/int/oic/IMPUNIDAD4jun-03.png"></img>
						</div>
					</div>

					<div class="row" style={{ textAlign: "center", alignItems: "center" }}>
						<div class="col-md-6 enlace" style={{ padding: 30 }}>
							<strong><h10>#TodosDeclaramosGobMX</h10></strong>
							<hr class="red"></hr>
							<a href="https://declaranet.gob.mx/" target={"_blank"}>
								<img class="dnet9 img-responsive" />
							</a>
						</div>

						{/*<div class="col-md-6 enlace" style={{ padding: 30 }}>
							<strong><h10>Resultados (ECCO) 2023</h10></strong>
							<hr class="red"></hr>
							<a href="../int/docs/RESULTADOS_ECCO_2023_Y_PTCCO_2024.pdf" target={"_blank"}>
								<img class="ecco img-responsive" />
							</a>
	</div>*/}
						<div class="col-md-6 enlace" style={{ padding: 30 }}>
							<strong><h10>Resultados (ECCO) 2023</h10></strong>
							<hr class="red"></hr>
							<a href="../int/docs/RESULTADOS ECCO 2023 Y PTCCO 2024.pdf" target={"_blank"}>
								<img class="ecco img-responsive" />
							</a>
						</div>
					</div>

					<div class="row" style={{ textAlign: "center", alignItems: "center" }}>
						<a href="../int/cedn/CEDN.jpg" target="_blank">
							<div class="col-md-6  enlace" style={{ padding: 30 }}>
								<h10>Comunicado de la CEDN</h10>
								<hr class="red"></hr>
								<img class="cedn img-page img-responsive" />
							</div>
						</a>
						<div onClick={open_snam} id="open-snam" class="col-md-6 enlace" style={{ padding: 30 }}>
							<div >
								<h10>Sistema Nacional Anticorrupción (SNA)</h10>
								<hr class="red"></hr>
							</div>
							<img class="sna img-page img-responsive" />
						</div>
					</div>




					<div class="row top-buffer bottom-buffer" style={{ textAlign: "center" }}>
						<div class="col-md-6" style={{ padding: 30 }}>
							<div >
								<h10>Cultura Organizacional</h10>
								<hr class="red"></hr>
							</div>
							<video style={{ width: "100%", marginTop: 20 }} playsinline="playsinline" loop="loop" controls>
								<source src='../int/videos/Video_Cultura_Organizacional.mp4' type="video/mp4" />
							</video>
						</div>
						<div class="col-md-6" style={{ padding: 30 }}>
							<div >
								<h10>Innovación</h10>
								<hr class="red"></hr>
							</div>
							<video style={{ width: "100%", marginTop: 20 }} playsinline="playsinline" loop="loop" controls>
								<source src='../int/videos/Video_Innovacion.mp4' type="video/mp4" />
							</video>
						</div>
					</div>



					<div id="operativos">
						<h2>Módulos operativos</h2>
						<hr class="red"></hr>

						<div class="row">
							<Link id="adms-usr" to="/Personal">
								<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
									<div class="card">
										<i class="gold fas fa-user-friends" style={{ fontSize: 40 }}> </i>
										<p class="card-tittle red">Administración de personal</p>

									</div>
								</div>
							</Link>

							<Link id="adms-post" to="/Candidatos">
								<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
									<div class="card">
										<i class="gold fas fa-user-graduate" style={{ fontSize: 40 }}> </i>
										<p class="card-tittle red">Candidatos</p>

									</div>
								</div>
							</Link>

							<Link id="adms-doc" to="/Documentos">
								<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
									<div class="card">
										<i class="gold fas fa-folder-open" style={{ fontSize: 40 }}> </i>
										<p class="card-tittle red">Administración de documentos</p>

									</div>
								</div>
							</Link>

							<Link id="adms-mat" to="/RecursosMateriales">
								<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
									<div class="card">

										<i class="gold fas fa-chart-pie" style={{ fontSize: 40 }}> </i>
										<p class="card-tittle red">Administración de recursos</p>

									</div>
								</div>
							</Link>

							<Link id="adms-crenapo" to="/ConsultaRenapo">
								<div class="col-md-3 bottom-buffer">
									<div class="card">
										<i class="gold fas fa-id-card top-buffer-x15" style={{ fontSize: 40 }}> </i>

										<p class="card-tittle red">Consultas masivas a RENAPO</p>

									</div>
								</div>
							</Link>
						</div>

					</div>

					<h2>Aplicaciones</h2>
					<hr class="red"></hr>

					<div class="row top-buffer">

						<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
							<div class="card">
								<img class="st" />
								<p class="card-tittle red">Soporte técnico</p>
								<div class="dropdown-content-sp">
									<div onClick={open_nticket} class="option-dropdown-sp sp1">
										<i class="fas fa-ticket-alt"></i>
										<p>Levantar Ticket</p>
									</div>
									<div onClick={open_vticket} class="option-dropdown-sp sp2">
										<i class="fas fa-clock"></i>
										<p>Solicitudes Pendientes</p>
									</div>
									<div onClick={soporte} id="open-tickets" class="option-dropdown-sp sp3">
										<i class="fas fa-user-clock"></i>
										<p>Asignar tickets</p>
									</div>



								</div>
							</div>
						</div>




						<div class="col-md-3 bottom-buffer dropdown-dt dropbtn-dt">
							<div class="card">
								<img class="dt" />
								<p class="card-tittle red">Directorio</p>
								<div class="dropdown-content-dt">
									<div onClick={(e) => open_dt(e.target.id)} id="1" class="option-dropdown-dt">
										<i id="1" class="fas fa-sitemap"></i>
										<p id="1">Estructura</p>
									</div>
									{/* <div onClick={(e) => open_dt(e.target.id)} id="2" class="option-dropdown-dt">
										<i class="fas fa-id-badge" id="2"></i>
										<p id="2">Prestadores de servicios</p>
									</div> */}

								</div>
							</div>
						</div>

						<div class="col-md-3 bottom-buffer">
							{/*<a href="https://docs.google.com/forms/d/1rOcQn2NfTaR1zwRVjTgFFfIAO7y3NwQI0piwfyhUfT4/viewform?edit_requested=true#response=ACYDBNgau7ttvIOvjheSp_1Dqggz9_d_guq7t21f1xtSvWBBUxPK7AUmf73W3CIV-leO36U" target={"_blank"}>*/}
							<div onClick={add_bt} id="add-bt" class="card">
								<img class="ba" />
								<p class="card-tittle red">Reservar sala</p>

							</div>
							{/*</a>*/}
						</div>

						<div onClick={add_lb} id="add-lb" class="col-md-3 bottom-buffer">
							<div class="card">
								<img class="lb" />
								<p class="card-tittle red">Liberar Salas Reservadas</p>

							</div>
						</div>


						<div onClick={add_sac} id="add-sac" class="col-md-3 bottom-buffer">
							<div class="card">
								<img class="sac" />
								<p class="card-tittle red">Solicitud de acceso</p>

							</div>
						</div>

						<div onClick={add_svh} id="add-shv" class="col-md-3 bottom-buffer">
							<div class="card">
								<img class="shv" />
								<p class="card-tittle red">Solicitud de vehículo</p>

							</div>
						</div>
						{<div onClick={add_asis} id="add-asis" class="col-md-3 bottom-buffer">
							<div class="card">
								<i class="gold fas fa-user-check top-buffer-x15" style={{ fontSize: 40 }}> </i>
								<p class="card-tittle red">Asistencia</p>

							</div>
						</div>}
						<Link id="adms-vpost" to="/CandidatosVisor">
							<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp ">
								<div class="card">
									<i class="gold fas fa-user-graduate top-buffer-x15" style={{ fontSize: 40 }}> </i>
									<p class="card-tittle red">Candidatos</p>

								</div>
							</div>
						</Link>

					</div>

					<h2>Comisión nacional de vivienda</h2>
					<hr class="red"></hr>

					<div class="row top-buffer">

						<div onClick={open_nt} id="open-nt" class="col-md-3 bottom-buffer">
							<div class="card">
								<img class="nt" />
								<p class="card-tittle red">Normateca</p>

							</div>
						</div>

						{/* <div onClick={(e) => open_pl("7","Programa Anual")} id="open-pl" class="col-md-3 bottom-buffer"> */}
						<div onClick={(e) => open_pl_all()} id="open-pl" class="col-md-3 bottom-buffer">
							<div class="card">

								<i class="gold fas fa-books" style={{ fontSize: 40 }}></i>
								<p class="card-tittle red">Programa Anual</p>
							</div>
						</div>

						<div onClick={(e) => open_pl("3", "Informes de Autoevaluación")} id="open-pl" class="col-md-3 bottom-buffer">
							<div class="card">

								<i class="gold fas fa-file-search" style={{ fontSize: 40 }}></i>
								<p class="card-tittle red">Informes de Autoevaluación</p>

							</div>
						</div>

						<div onClick={(e) => open_pl("4", "Matriz de Riesgos")} id="open-pl" class="col-md-3 bottom-buffer">
							<div class="card">
								<i class="gold fas fa-engine-warning" style={{ fontSize: 40 }}></i>
								<p class="card-tittle red">Matriz de Riesgos</p>

							</div>
						</div>

						<div class="col-md-3 bottom-buffer  dropdown-dt dropbtn-dt">

							<div class="card eo-l">


								<img class="eo" />
								<p class="card-tittle red">Estructura orgánica</p>


								<div class="dropdown-content-dt" style={{ overflow: "scroll", height: 400 }}>
									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/1. ORGANIGRAMA ESTRUCTURA BÁSICA.PPTX"><div class="option-dropdown-dt plados">

										<p>ESTRUCTURA BÁSICA</p>
									</div>
									</a>

									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/2. ORGANIGRAMA DG.PPTX"><div class="option-dropdown-dt plados">

										<p>DG</p>
									</div>
									</a>

									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/3. ORGANIGRAMA OPERACIÓN 1.pptx"><div class="option-dropdown-dt plados">

										<p>OPERACIÓN</p>
									</div>
									</a>

									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/4. ORGANIGRAMA OPERACIÓN 2.pptx"><div class="option-dropdown-dt plados">

										<p>OPERACIÓN 1</p>
									</div>
									</a>

									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/5. ORGANIGRAMA OPERACIÓN 3.pptx"><div class="option-dropdown-dt plados">

										<p>OPERACIÓN 2</p>
									</div>
									</a>

									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/6. ORGANIGRAMA JURÍDICO.PPTX"><div class="option-dropdown-dt plados">

										<p>JURÍDICO 3</p>
									</div>
									</a>

									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/7. ORGANIGRAMA PROSPECTIVA.PPTX"><div class="option-dropdown-dt plados">

										<p>PROSPECTIVA</p>
									</div>
									</a><a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/8. ORGANIGRAMA SGAF.PPTX"><div class="option-dropdown-dt plados">

										<p>SGAF</p>
									</div>
									</a>

									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/9. ORGANIGRAMA CGA.PPTX"><div class="option-dropdown-dt plados">

										<p>CGA</p>
									</div>
									</a>

									<a href="https://sistemaintegral.conavi.gob.mx:81/int/RV_ORGANIGRAMAS/10. ORGANIGRAMA OIC.PPTX"><div class="option-dropdown-dt plados">

										<p>OIC</p>
									</div>
									</a>
								</div>
							</div>
						</div>
						<div onClick={open_ce} id="open-ce" class="col-md-3 bottom-buffer">
							<div class="card">
								<img class="ce" />
								<p class="card-tittle red">Comité de ética </p>
							</div>
						</div>

						<div onClick={comeri} id="open-cm" class="col-md-3 bottom-buffer">
							<div class="card">
								<img class="cm" />
								<p class="card-tittle red">COMERI</p>

							</div>
						</div>
					</div>

					<h2>Áreas</h2>
					<hr class="red"></hr>

					<div class="row top-buffer">

						<div id="" class="col-md-3 bottom-buffer hidden">

							<div onClick={difusion} class="card">
								<img class="dfn" />
								<p class="card-tittle red">Difusión</p>

							</div>

						</div>

						<div id="" class="col-md-3 bottom-buffer">

							<div onClick={juridico} class="card">
								<i class="gold fas fa-balance-scale top-buffer-x15" style={{ fontSize: 40 }}> </i>
								<p class="card-tittle red">Jurídico</p>

							</div>

						</div>

						<Link id="" to="/Adquisiciones">
							<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
								<div class="card">

									<i class="gold fas fa-hand-holding-box top-buffer-x15" style={{ fontSize: 40 }}> </i>
									<p class="card-tittle red">Adquisiciones</p>

								</div>
							</div>
						</Link>

						<Link id="" to="/IgualdadSustantiva">
							<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
								<div class="card">

									<i class="gold fas fa-venus-mars top-buffer-x15" style={{ fontSize: 40 }}> </i>
									<p class="card-tittle red">Igualdad Sustantiva</p>

								</div>
							</div>
						</Link>

						<Link id="" to="/Sistemas">
							<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
								<div class="card">

									<i class="gold fas fa-computer-classic top-buffer-x15" style={{ fontSize: 40 }}> </i>
									<p class="card-tittle red">Sistemas</p>

								</div>
							</div>
						</Link>
						<Link id="ctrl-asis" to="/CtrlAsistencia">
							<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp">
								<div class="card">

									<i class="gold fas fa-calendar-check top-buffer-x15" style={{ fontSize: 40 }}> </i>
									<p class="card-tittle red">Control de Asistencia</p>

								</div>
							</div>
						</Link>
						<Link id="" to="/VideosASF">
							<div class="col-md-3 bottom-buffer dropdown-sp dropbtn-sp" title="Dirección de Planeación y Evaluación Institucional">
								<div class="card">

									<i class="gold fas fa-building top-buffer-x15" style={{ fontSize: 40 }}> </i>
									<p class="card-tittle red">Control Interno</p>

								</div>
							</div>
						</Link>

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

export default Inicio;