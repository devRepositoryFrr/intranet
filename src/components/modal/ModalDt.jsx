import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/listas.css';
import '../../assets/css/directorio.css';
import '../../assets/js/directorio.js';
import React, { useState, useEffect } from 'react';




export default function ModalDt() {

	useEffect(() => {
		$(document).on("click", ".list-item", function() {
			var element = $(this).attr('id');
			
			if ($(".list-detail").css("display") == "none") {
				setTimeout(function() {
					$('#' + element).find(".list-detail").toggleClass('active-dt');
				}, 400);
	
				setTimeout(function() {
					$('#' + element).find(".list-detail").toggleClass('hidden');
				}, 100);
			} else {
				setTimeout(function() {
					$('#' + element).find(".list-detail").toggleClass('hidden');
				}, 400);
	
				setTimeout(function() {
					$('#' + element).find(".list-detail").toggleClass('active-dt');
				}, 100);
	
	
			}
	
	
	
	
		});
	
		$("#txtBuscar-dt").keyup(function () {
			var filter = $(this).val();
			$(".list-dt li").each(function () {
				if ($(this).text().search(new RegExp(filter, "i")) < 0) {
					$(this).hide();
				} else {
					$(this).show()
				}
			});
		});
	});


	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-dt").css("display", "none");
		$("#btnGuardar-dt").addClass('disabled');
		$("#btnGuardar-dt").prop('disabled', true);
		$('html').css("overflow", "");
	}



	return (
		<div id='content-dt' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Directorio</h4>
			</div>

			<div class="row" >
				<div class="col-xs-4">
					<a class="directorio">
						<span><i class="fas fa-users" style={{ fontSize: 50 }}></i></span>
						<span class="badge-dt"><p id="dt-counter"></p></span>
					</a>
				</div>
				<div class="col-xs-8" style={{ paddingTop: 20, paddingRight: 40 }}>

					<input style={{marginBottom:0}} id="txtBuscar-dt" class="form-control" type="text" placeholder="Buscar usuario, puesto, etc..."></input>
				</div>
			</div>
			<div style={{paddingRight: 40,    textAlign: "end" }}>
				<span><i class="fas fa-file-download red-ic bottom-buffer-x15" style={{ fontSize: 30 }}></i></span>
			</div>



			<div style={{ padding: 0 }} class='modal-body list-parent'>

				<div class="list-wrapper">
					<div class="user-parent">
						<ul class="list-dt">

						</ul>
					</div>

				</div>


			</div>
			<div style={{ padding: 40 }}>
				<button id="btnCerrar-dt" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
					onClick={limpiar}>Salir</button>
			</div>

		</div>
	);
}
