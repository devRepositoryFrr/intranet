import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import '../../assets/css/listas.css';
import '../../assets/css/menu-list.css';







export default function ModalDt() {



	const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-ce").css("display", "none");
		$('html').css("overflow", "");
	}



	return (
		<div id='content-ce' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Comité de ética</h4>
			</div>

			
			<div style={{ padding: 0 }} class='modal-body list-parent-nt'>

				<div class="list-wrapper">
					<div class="user-parent">
						<ul style={{marginLeft:25,marginRight:25, marginTop:15}} id="menu-ce" class="menu">

						</ul>
					</div>

				</div>


			</div>
			<div style={{ padding: 40 }}>
				<button id="btnCerrar-ce" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
					onClick={limpiar}>Salir</button>
			</div>

		</div>
	);
}
