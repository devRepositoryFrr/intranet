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
		<div id='content-snam' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Manual sobre el Sistema Nacional Anticorrupción.</h4>
			</div>

			
			<div style={{ padding: 20, height:350 }} class='modal-body list-parent-nt'>
				<p>Servidores Públicos Federales</p>
				<h4>¿QUÉ ES EL SISTEMA NACIONAL ANTICORRUPCIÓN (SNA)?</h4>
				<p class="p-text">En atención a lo previsto en el artículo 113 Constitucional, el SNA es una instancia de coordinación entre distintas autoridades federales y locales, encargadas de la prevención, detección y sanción de responsabilidades administrativas y hechos de corrupción, así como de la fiscalización y control de recursos públicos, en el cual participa la ciudadanía a través de un Comité. Coordinación que se ha establecido a nivel Constitucional y legal, con el objeto de combatir de manera más eficaz el fenómeno de la corrupción en el servicio público y que incluye mecanismos de colaboración, intercambio de información y diseño de políticas integrales en la materia, aplicables a las autoridades que lo integran.</p>
				<a href="../int/sna/Manual_SNA.pdf" target="_blank"><p class="p-text">Conoce aquí el Manual sobre el Sistema Nacional Anticorrupción.</p></a>
				
			</div>
			<div style={{ padding: 40 }}>
				<button id="btnCerrar-ce" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
					onClick={limpiar}>Salir</button>
			</div>

		</div>
	);
}
