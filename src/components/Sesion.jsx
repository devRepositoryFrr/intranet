import $, { each } from 'jquery';
import '../assets/css/login.css';
import Alerta_ from '../components/Alerta';
import Alerta from '../assets/js/Alerta.js';
import '../assets/js/jquery.serializeToJSON'
import { useEffect } from 'react';
import Axios from 'axios';
const isLogged = localStorage.getItem('credenciales');
const load = () => {
    $("html, body").addClass("gbColor");
}

const visita = (email) => {
    Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/nueva_visita', {

        email: email,

    }).then(
        (response) => {

        },

    ).catch(
        (err) => {
            //console.log(err)
        });
}



const color = '#a2ccb6';


const isesion = () => {
    var usr = "";
    var pwd = "";
    let objSoporte = $('#frm-sesion').serializeToJSON();
    //console.log(objSoporte);
    $.each(objSoporte, function (key, val) {
        usr = val.txtUsr;
        pwd = val.txtPwd;
    });

    var url = "https://sistemaintegral.conavi.gob.mx:81/api/sesion";
    //var url = "http://localhost:3001/api/sesion";


    Axios.post(url, {

        usr: usr,
        psw: pwd,

    }).then(
        (response) => {
            //console.log(response.data)
            $.each(response.data, function (key, val) {
                if (val.nombre == "INEXISTENTE") {

                    Alerta("<p style='text-align: justify'><strong>El nombre de usuario o la contraseña son incorrectos.</strong> Comprueba que no esté activada la tecla Bloq Mayús y vuelve a introducir el nombre de usuario y contraseña.</p>", "alertaOp alert alert-warning");
                } else {
                    visita(usr);
                    
                    localStorage.setItem('credenciales', JSON.stringify(response.data));
                    if (pwd == "1ntr@n3t.cnv") {
                        localStorage.setItem('flag', "[{\"cambio\":\"0\"}]");
                    } else {
                        localStorage.setItem('flag', "[{\"cambio\":\"1\"}]");
                    }

                    window.location.href = "/int/#/Inicio";

                }
            });
        },

    ).catch(
        (err) => {
            //console.log(err)
        });
}


function Sesion(props) {
    useEffect(() => {
        load();
        /*if (Date.parse(_objCredenciales.expires) < Date.parse(currentTime)) {
            window.location.href = "pmv_2025/#/Sesion"
            localStorage.removeItem("credenciales_pmv_2025");
        }*/
    }, []);


    return (

        <div className="Sesion" class="background">
            <header>
                <div class="container bottom-buffer top-buffer">
                    <Alerta_ />
                    <div>
                        <div class="">
                            <div class="wallpaper floatl"></div>
                        </div>
                        <div class="">
                            <div class="login floatr">

                                <form id="frm-sesion">
                                    <span><h1 style={{ fontSize: 80 }} class="icon-cnv"></h1></span>
                                    <p class="bottom-buffer-x15"><strong>Intranet de la Comisión Nacional de Vivienda</strong></p>
                                    <p class="bottom-buffer-x15"><strong>Inicio de sesión</strong></p>
                                    <p style={{ textAlign: "start" }}>Usuario</p>
                                    <input type="text" id="txtUsr" name="login.txtUsr" class="form-control bottom-bufferx-15" placeholder="Ingresa tu usuario"></input>
                                    <p style={{ textAlign: "start" }}>Contraseña</p>
                                    <input type="password" id="txtPwd" name="login.txtPwd" class="form-control bottom-buffer-x15" placeholder="Ingresa tu contraseña"></input>

                                </form>

                                <button onClick={isesion} id="btnLogin" class="btn btn-gold bottom-buffer-x15">Iniciar sesión</button>

                            </div>
                        </div>

                    </div>

                </div>
            </header>
        </div>
    );
}

export default Sesion;