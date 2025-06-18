import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/listas.css';
import '../../assets/css/menu-list.css';







export default function ModalDt() {



	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-pl").css("display", "none");
		$('html').css("overflow", "");
	}



	return (
		<div id='content-pl' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' class="titulo-modal" style={{ fontWeight: 300 }}>Programa de labores</h4>
			</div>


			<div style={{ padding: 0 }} class='modal-body list-parent-nt'>

				<div class="list-wrapper">
					<div class="user-parent">
						<ul style={{ marginLeft: 25, marginRight: 25, marginTop: 15 }} id="menu-pl" class="menu">

						</ul>

						<div style={{ padding: 40 }}>
						<button id="btnCerrar-pl" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
							onClick={limpiar}>Salir</button>
					</div>
					</div>
					
				</div>


			</div>


		</div>
	);
}
