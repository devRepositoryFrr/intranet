import React from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Inicio from "./components/Inicio.jsx";
import Soporte from "./components/Soporte.jsx";
import Sesion from "./components/Sesion.jsx";
import Documentos  from "./components/Documentos.jsx";
import Personal  from "./components/Personal.jsx";
import Galeria  from "./components/Galeria.jsx";
import Juridico  from "./components/Juridico.jsx";
import Comeri  from "./components/Comeri.jsx";
import Renapo  from "./components/renapo.jsx";
import RecursosMateriales from "./components/RecursosMateriales.jsx";
import Cuestionarios from "./components/cuestionarios.jsx";
import Adquisiciones from "./components/Adquisiciones.jsx";
import IgualdadSustantiva from "./components/IgualdadSustantiva.jsx";
import Cepci from "./components/cepci.jsx";
import Carga_cv from "./components/Carga_cv.jsx";
import Visor_cv from "./components/Visor_cv.jsx";
import Sistemas from "./components/Sistemas.jsx";
import ConsultaRenapo from "./components/ConsultaRenapo.jsx";
import CtrlAsistencia from "./components/CtrlAsistencia.jsx";
import Nomina from "./components/modal/ModalCn.jsx";
import { Link, withRouter } from "react-router-dom";
import Etica from "./components/etica.jsx";
import CtrlAcceso from "./components/CtrlAcceso.jsx";
import CtrlVehicular from "./components/CtrlVehicular.jsx";

function App() {
	return (
		<div className="App">

			<HashRouter >
				<Switch>
					<Route exact path='/' render={({ location }) => <Redirect to={'/Sesion'} />} />
					<Route path="/Inicio" exact component={() => <Inicio />} />
					<Route path="/Sesion" exact component={() => <Sesion />} />
					<Route path="/Soporte" exact component={() => <Soporte />} />
					<Route path="/Documentos" exact component={() => <Documentos />} />
					<Route path="/Personal" exact component={() => <Personal />} />
					<Route path="/Galeria" exact component={() => <Galeria />} />
					<Route path="/Juridico" exact component={() => <Juridico />} />
					<Route path="/Comeri" exact component={() => <Comeri />} />
					<Route path="/Renapo" exact component={() => <Renapo />} />
					<Route path="/RecursosMateriales" exact component={() => <RecursosMateriales />} />
					<Route path="/Cuestionarios" exact component={() => <Cuestionarios />} />
					<Route path="/Adquisiciones" exact component={() => <Adquisiciones />} />
					<Route path="/IgualdadSustantiva" exact component={() => <IgualdadSustantiva />} />
					<Route path="/Cepci" exact component={() => <Cepci />} />
					<Route path="/Candidatos" exact component={() => <Carga_cv />} />
					<Route path="/CandidatosVisor" exact component={() => <Visor_cv />} />
					<Route path="/Sistemas" exact component={() => <Sistemas />} />
					<Route path="/ConsultaRenapo" exact component={() => <ConsultaRenapo />} />
					<Route path="/CtrlAsistencia" exact component={() => <CtrlAsistencia />} />
					<Route path="/ModalCn" exact component={() => <Nomina />} />
					<Route path="/CtrlAcceso" exact component={() => <CtrlAcceso />} />
					<Route path="/CtrlVehicular" exact component={() => <CtrlVehicular />} />
				</Switch>
			</HashRouter>



		</div>

	);
}


export default App;
