import $, { each } from 'jquery';
import Accesibilidad from './Accesibilidad'
import GaleriaHeader from './GaleriaHeader'
import { Link } from "react-router-dom";
import Axios from 'axios';
import Alerta from './Alerta';
import Alerta_ from '../assets/js/Alerta';
import { useEffect } from 'react';
//import '../assets/css/checks.css'

var num_empleado = "";

const inicio = () => {
	window.location.href = "/int/#/Inicio";
}

const ancho = window.screen.width;

const out = () => {
	$(".navbar").remove();
	$(".main-footer").remove();
	$("#slideshow-container").remove();
	$("body").removeClass("Inicio");
	localStorage.clear();
	window.location.href = "/int/#/";
}

const get_etica = () => {
	num_empleado = $("#_num_empleado_").val();
	$(".loading").removeClass("hidden");
	$(".busca").remove();
	$(".eval").append(
		'<h2>Instrumento Participativo, actualización del Código de Conducta</h2>' +
		'<hr class="red"></hr>' +
		'<blockquote><p style="text-align: justify">Para el adecuado ejercicio del servicio público, es importante contar con un ambiente laboral apropiado que incida de forma directa e indirecta en la sociedad; por ello, es de suma importancia que las personas servidoras públicas rijan su actuar con base en los cuatro valores del servicio público que establece el Código de Ética de la Administración Pública Federal (respeto, liderazgo, cooperación, cuidado del entorno cultural y ecológico); adicionalmente la <a style="text-decoration: underline !important;" href="https://www.gob.mx/sfp/documentos/guia-para-la-elaboracion-del-codigo-de-conducta-en-las-dependencias-y-entidades-de-la-administracion-publica-federal" target="_blank">“Guía para la elaboración del Código de Conducta en las dependencias y entidades de la Administración Pública Federal”</a> de la Secretaría de la Función Pública, indica que las instituciones pueden proponer valores propios en su Código de Conducta.</p></blockquote>' +
		'<div class="panel panel-default">' +
		'<div class="panel-heading"><h3 style="text-align: justify">Te invitamos a elegir los valores que consideres acordes con la <a style="text-decoration: underline !important;" href="https://www.gob.mx/conavi/que-hacemos" target="_blank">Visión</a> de la Comisión Nacional de Vivienda</h3></div>' +
		'<div class="panel-body">' + 
		'<div class="checkbox" style="text-align: justify"><label for="v1opcion1"><input type="checkbox" name="valor1" id="v1opcion1" value="1" /> Respeto a las tradiciones: Para la Comisión es importante que en la ejecución de las acciones de vivienda se considere en todo momento el respeto por las diversas visiones del mundo, así como por los saberes, las prácticas materiales, sociales y culturales heredadas de generaciones anteriores para el hábitat.</label></div>' +
		'<div class="checkbox" style="text-align: justify"><label for="v1opcion2"><input type="checkbox" name="valor1" id="v1opcion2" value="2" /> Empatía: El personal de la Comisión, así como los participantes de los programas presupuestarios, deberán comprometerse a actuar con empatía; es decir, con una colaboración afectiva en una realidad ajena, reconociendo a las otras personas como similares en derechos.</label></div>' +
		'<div class="checkbox" style="text-align: justify"><label for="v1opcion3"><input type="checkbox" name="valor1" id="v1opcion3" value="3" /> Respeto a la Identidad Cultural: En todo momento, el personal de la Comisión procurará contemplar en las propuestas normativas y operativas el respeto de los valores, las tradiciones, los símbolos, las creencias y los modos de vida que funcionen como elementos de cohesión social de la población atendida por los programas presupuestarios.</label></div>' +
		'<div class="checkbox" style="text-align: justify"><label for="v1opcion4"><input type="checkbox" name="valor1" id="v1opcion4" value="4"/> Participación: La Comisión impulsará a través del diseño y operación de sus programas presupuestarios, la participación comprometida e informada de la ciudadanía en el alcance del derecho humano a una vivienda adecuada.</label></div>' +
		'</div></div>' +
		'<div class="panel panel-default">' +
		'<div class="panel-heading"><h3>Riesgos Éticos</h3></div>' +
		'<div class="panel-body">' + 
		'<blockquote><p style="text-align: justify">Los riesgos éticos son elementos valorativos que representan una posible situación de dificultad, nos sirven para dar un marco de referencia ante un posible peligro. Aunque algunas condiciones generan implicaciones sociales de carácter neutral, los riesgos permiten anticipar los impactos. El Código de Ética de la Administración Pública Federal(Secretaría de la Función Pública, 2022) en su artículo 20 define los riesgos éticos como aquellas situaciones en las que potencialmente pudiera haber un acto de corrupción al transgredirse principios, valores o reglas de integridad durante las labores específicas de las diversas áreas que componen la dependencia o entidad, y que deberán ser detectados a partir del diagnóstico para la elaboración del Código de Conducta. A continuación te compartimos varios riesgos éticos que se han detectado para la Conavi, te pedimos que nos ayudes a clasificar desde tu percepción su frecuencia de riesgo, es decir, qué tan probable es que suceda, así como qué tan grave consideras que es que sucedan.</p></blockquote>' +
		'</div></div>' +
		'<div class="panel panel-default">' +
		'<div class="panel-heading"><h3>Riesgo 1</h3></div>' +
		'<div class="panel-body">' + 
		'<blockquote><p style="text-align: justify">Personas servidoras públicas que, desempeñando su trabajo, incumplen con los objetivos, responsabilidades y facultades conferidas a su cargo, en detrimento del objetivo y misión institucional.</p></blockquote>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Muy improbable que ocurra</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo1a" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo1a" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo1a" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo1a" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo1a" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy probable que ocurra</p>' +
		'</div>' +
		'</div>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Sería poco grave suceda el riesgo</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo1b" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo1b" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo1b" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo1b" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo1b" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy grave que suceda el riesgo</p>' +
		'</div></div>' +
		'</div></div>' +
		'<div class="panel panel-default">' +
		'<div class="panel-heading"><h3>Riesgo 2</h3></div>' +
		'<div class="panel-body">' + 
		'<blockquote><p style="text-align: justify">Personas servidoras públicas, interactuando con sus pares y con sus superiores jerárquicos, sin la disposición, el respeto mutuo y cooperación efectiva; así como sin el reconocimiento del trabajo realizado.</p></blockquote>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Muy improbable que ocurra</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo2a" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo2a" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo2a" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo2a" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo2a" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy probable que ocurra</p>' +
		'</div>' +
		'</div>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Sería poco grave suceda el riesgo</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo2b" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo2b" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo2b" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo2b" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo2b" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy grave que suceda el riesgo</p>' +
		'</div></div>' +
		'</div></div>' +
		'<div class="panel panel-default">' +
		'<div class="panel-heading"><h3>Riesgo 3</h3></div>' +
		'<div class="panel-body">' + 
		'<blockquote><p style="text-align: justify">Personas servidoras públicas vulneradas por conductas de hostigamiento y acoso sexual.</p></blockquote>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Muy improbable que ocurra</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo3a" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo3a" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo3a" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo3a" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo3a" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy probable que ocurra</p>' +
		'</div>' +
		'</div>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Sería poco grave suceda el riesgo</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo3b" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo3b" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo3b" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo3b" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo3b" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy grave que suceda el riesgo</p>' +
		'</div></div>' +
		'</div></div>' +
		'<div class="panel panel-default">' +
		'<div class="panel-heading"><h3>Riesgo 4</h3></div>' +
		'<div class="panel-body">' + 
		'<blockquote><p style="text-align: justify">Participantes externos de los programas (prestadores de servicios, entidades ejecutoras, proveedores de servicios, entre otros) desempeñando sus actividades de forma deficiente y/o negligente, en detrimento del patrimonio de la institución y de la población beneficiaria, por la aplicación limitada de mecanismos preventivos y de control sobre su actuación.<p></blockquote>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Muy improbable que ocurra</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo4a" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo4a" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo4a" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo4a" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo4a" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy probable que ocurra</p>' +
		'</div>' +
		'</div>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Sería poco grave suceda el riesgo</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo4b" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo4b" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo4b" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo4b" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo4b" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy grave que suceda el riesgo</p>' +
		'</div></div>' +
		'</div></div>' +
		'<div class="panel panel-default">' +
		'<div class="panel-heading"><h3>Riesgo 5</h3></div>' +
		'<div class="panel-body">' + 
		'<blockquote><p style="text-align: justify">Personas servidoras públicas vulneradas por un ambiente laboral no adecuado.</p></blockquote>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Muy improbable que ocurra</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo5a" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo5a" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo5a" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo5a" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo5a" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy probable que ocurra</p>' +
		'</div>' +
		'</div>' +
		'<div class="row">' +
		'<div class="col-md-4">' +
		'<p class="text-center">Sería poco grave suceda el riesgo</p>' +
		'</div><div class="col-md-4">' +
		'<div class="row"><div class="col-md-2">1</div><div class="col-md-2">2</div><div class="col-md-2">3</div><div class="col-md-2">4</div><div class="col-md-2">5</div></div>' +
		'<div class="row"><div class="col-md-2"><input type="radio" name="riesgo5b" value="1" /></div><div class="col-md-2"><input type="radio" name="riesgo5b" value="2" /></div><div class="col-md-2"><input type="radio" name="riesgo5b" value="3" /></div><div class="col-md-2"><input type="radio" name="riesgo5b" value="4" /></div><div class="col-md-2"><input type="radio" name="riesgo5b" value="5" /></div></div>' +
		'</div><div class="col-md-4">' +
		'<p class="text-center">Muy grave que suceda el riesgo</p>' +
		'</div></div>' +
		'</div></div>');

	$("#loading").remove();
	$("#send").removeClass("hidden");
}

const send_evaluacion = () => {

	let Valor1 = new Array;
	let Etica_1_1 = "";
	let Etica_1_2 = "";
	let Etica_2_1 = "";
	let Etica_2_2 = "";
	let Etica_3_1 = "";
	let Etica_3_2 = "";
	let Etica_4_1 = "";
	let Etica_4_2 = "";
	let Etica_5_1 = "";
	let Etica_5_2 = "";

	$('input[name="valor1"]').each(function (){
		if($(this).prop("checked") == true){
			Valor1.push($(this).val());
		}
	});

	$('input[name="riesgo1a"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_1_1 = $(this).val();
		}
	});

	$('input[name="riesgo1b"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_1_2 = $(this).val();
		}
	});

	$('input[name="riesgo2a"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_2_1 = $(this).val();
		}
	});

	$('input[name="riesgo2b"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_2_2 = $(this).val();
		}
	});

	$('input[name="riesgo3a"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_3_1 = $(this).val();
		}
	});

	$('input[name="riesgo3b"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_3_2 = $(this).val();
		}
	});

	$('input[name="riesgo4a"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_4_1 = $(this).val();
		}
	});

	$('input[name="riesgo4b"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_4_2 = $(this).val();
		}
	});

	$('input[name="riesgo5a"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_5_1 = $(this).val();
		}
	});

	$('input[name="riesgo5b"]').each(function (){
		if($(this).prop("checked") == true){
			Etica_5_2 = $(this).val();
		}
	});

	if (Valor1 != "" &&
		Etica_1_1 != "" &&
		Etica_1_2 != "" &&
		Etica_2_1 != "" &&
		Etica_2_2 != "" &&
		Etica_3_1 != "" &&
		Etica_3_2 != "" &&
		Etica_4_1 != "" &&
		Etica_4_2 != "" &&
		Etica_5_1 != "" &&
		Etica_5_2 != "") {

		Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/send_etica', {
			num_empleado: num_empleado,
			eval_1  : Valor1,
			eval_1_1: Etica_1_1,
			eval_1_2: Etica_1_2,
			eval_2_1: Etica_2_1,
			eval_2_2: Etica_2_2,
			eval_3_1: Etica_3_1,
			eval_3_2: Etica_3_2,
			eval_4_1: Etica_4_1,
			eval_4_2: Etica_4_2,
			eval_5_1: Etica_5_1,
			eval_5_2: Etica_5_2,

		}).then(
			(response) => {

				if (response.data == "ok") {
					$("#send").remove();
					Alerta_("<p class='p-center' style='z-index:999999'>Tu evaluación <strong>fue recibida</strong></p>", "alertaOp alert alert-success");
					setInterval(() => {
						window.location.href = "/int/#/Inicio";
					}, 2000);
				} else {
					Alerta_("<p class='p-center' style='z-index:999999'>ocurrió un error <strong>al recibir tu evaluación</strong> </p>", "alertaOp alert alert-danger");
				}
			},

		).catch(
			(err) => {
				//console.log(err)
			});
	} else {
		Alerta_("<p class='p-center' style='z-index:999999'>Debes responder <strong>todas los preguntas</strong> </p>", "alertaOp alert alert-warning");
	}
};

const get_empleado = () => {
	if(!isNaN($("#_num_empleado_").val()) && $("#_num_empleado_").val() > 0){
		$.getJSON("https://sistemaintegral.conavi.gob.mx:81/api/get_user_etica/" + $("#_num_empleado_").val(), function (data) {
			$.each(data, function (key, val) {
				$.each(val, function (id, valor) {
					if (valor == "inexistente") {
						Alerta_("<p class='p-center' style='z-index:999999'>Este numero de empleado <strong>no está  asignado</strong> a ningún servidor público</p>", "alertaOp alert alert-warning");
					} else if (valor == "calificado") {
						Alerta_("<p class='p-center' style='z-index:999999'>Ya emitiste tu evaluación, <strong>Gracias!</strong></p>", "alertaOp alert alert-warning");
						$("#_num_empleado_").val('');
						setInterval(() => {
							window.location.href = "/int/#/Inicio";
						}, 2000);
					} else {
						get_etica();
					}
				});
			});
		});
	}else{
		Alerta_("<p class='p-center' style='z-index:999999'>Número de empleado incorrecto</p>", "alertaOp alert alert-warning");
		$("#_num_empleado_").val('');
	}
}

function Etica(props) {
	useEffect(() => {
		const script = document.createElement("script");
		script.id = "fmwk_gob";
		script.src = "https://framework-gb.cdn.gob.mx/gobmx.js";
		script.async = true;
		document.head.appendChild(script);

		$(".loading").addClass("hidden");
		$("html, body").removeClass("gbColor");
	});

	return (
		<div className="Inicio">
			<header>
				<div id="loading" class="loading">
					<i class="gold fa fa-spin fa-bahai loading-icon"> </i>
				</div>
				<Alerta />
				<GaleriaHeader />
				<div id="cont" class="container">
					<p style={{ textAlign: "end" }}><span><i class="fas fa-user-alt gold"></i><strong style={{ paddingLeft: 8, paddingRight: 8 }} id="usr"></strong></span><span onClick={out} class="gold" style={{ cursor: "pointer" }}>/ Salir<i class="fas fa-sign-out-alt"></i></span></p>
					<ol id="bread" class="breadcrumb">
						<li><a href=""><i class="icon icon-home"></i></a></li>
						<li class="enlace" onClick={inicio}>Inicio</li>
						<li class="active"><Link class="nav-link">Actualización del Código de Conducta</Link></li>
					</ol>
					<div id="send" class="hidden flotante send" style={{ right: ancho * 0.1, zIndex: 9999 }}>
						<div class="bottom-buffer" style={{ cursor: "pointer" }}>
							<i onClick={send_evaluacion} class="fas fa-paper-plane"></i>
						</div>
					</div>
					<div class="eval">
						<div class="busca">
							<small>Introduce tu número de empleado para acceder a la encuesta</small>
							<input id="_num_empleado_" class="form-control"></input>
							<button onClick={get_empleado} class="btn btn-primary" type="button">
								<span class="glyphicon glyphicon-search"></span>
								Buscar
							</button>
						</div>
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

export default Etica;