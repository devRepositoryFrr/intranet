import $ from 'jquery';
import '../assets/css/Alerta.css';





export default function Alerta() {

	return (
		<div>
			<div id="alerta" class="alertaOp alert alert-warning alert-dismissible" >
				<strong>¡Precaución!</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</div>
		</div>
	);
}
