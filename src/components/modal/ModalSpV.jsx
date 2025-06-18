import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/listas.css';
import '../../assets/css/reservacion.css';
import '../../assets/js/reservacion.js';
import '../../assets/js/directorio.js';
import '../../assets/css/directorio.css';

export default function ModalSpV() {



	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-spV").css("display", "none");
		$('html').css("overflow", "");
	}



	return (
		<div id='content-spV' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Tus tickets levantados</h4>
			</div>




			<div class="row" >
				<div class="col-xs-4">
					<a class="reservacion bottom-buffer-x15">
						<span><i class="fas fa-ticket" style={{ fontSize: 50 }}></i></span>
						<span class="badge-lb"><p id="spV-counter" style={{ marginTop: 5 }}></p></span>
					</a>
				</div>
			
			</div>
			
			<div style={{ padding: 0 }} class='modal-body list-parent'>

				<div class="list-wrapper">
					<div class="user-parent">
						<ul class="list-spv">

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
