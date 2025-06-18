import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/listas.css';
import '../../assets/css/reservacion.css';
import '../../assets/js/reservacion.js';

export default function ModalBt() {



	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-lb").css("display", "none");
		$("#btnGuardar-lb").addClass('disabled');
		$("#btnGuardar-lb").prop('disabled',true);
		$('html').css("overflow", "");
	}



	return (
		<div id='content-lb' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Tus salas reservadas</h4>
			</div>

			<a class="reservacion bottom-buffer-x15">
				<span><i class="fas fa-users" style={{ fontSize: 50 }}></i></span>
				<span class="badge-lb"><p id="lb-counter"></p></span>
			</a>

			<div class='modal-body list-parent'>

				<div class="lb-list">

				</div>

			</div>
			<div style={{ padding: 40 }}>
				<button id="btnCerrar-lb" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
					onClick={limpiar}>Salir</button>
			</div>

		</div>
	);
}
