import Accesibilidad from './Accesibilidad'
import '../assets/css/navbar.css';
import '../assets/css/content.css';
import { Link, withRouter } from "react-router-dom";
//db ejemplo
import { useState } from 'react';
import Axios from 'axios';



//db ejemplo




function Construccion() {
	//db ejemplo
	const [campo1, setCampo1] = useState("");
	const [campo2, setCampo2] = useState("");


	const submitInsert = () => {
		Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/insert', {
			campo1: campo1, 
			campo2: campo2,
		}).then(() => {
			alert("inserta ok");
		});
	};
	//db ejemplo

	return (
		<div className="Construccion">
			<header>

				<Accesibilidad />

				<div id="cont" class="container">
					<ol class="breadcrumb">
						<li><Link class="nav-link" to="/Inicio"><i class="icon icon-home"></i></Link></li>
						<li class=""><Link class="nav-link" to="/Inicio">Inicio</Link></li>
						<li class="active"><Link class="nav-link" to="/Construccion">En construcción</Link></li>
					</ol>

					<div style={{}}>
						<h2 style={{ fontWeight: "bold" }}>Sitio en construcción…</h2>
						<hr class="red"></hr>
						<p class="p-text">Estamos trabajando para que esta página web esté disponible próximamente y poder presentarte nuestro nuevo diseño y nuestra nueva colección.</p>
						<img class="construccion-img img-responsive"></img>
						<button onClick={submitInsert}></button>

						<input onChange={(e) => {
							setCampo1(e.target.value);
						}}>

						</input>
						<input onChange={(e) => {
							setCampo2(e.target.value);
						}}>
						</input>

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

export default Construccion;