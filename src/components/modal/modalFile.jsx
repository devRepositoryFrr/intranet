import $ from 'jquery';
import '../../assets/css/scroll.css';
import '../../assets/css/modal.css';
import '../../assets/css/content.css';
import { useEffect } from 'react';
import Axios from 'axios';
import Alerta_ from '../../assets/js/Alerta.js';
import { getUserCredenciales } from '../../utils/storage';


const submitFile = () => {
    

    var formData = new FormData();

    formData.append("file", $("#nuevo_archivo")[0].files[0]);
    formData.append("path", $("#path").val());
    Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(
        (response) => {
            Alerta_("¡Modificación<strong> exitosa</strong>!", "alertaOp alert alert-success alert-dismissible");
            limpiar();
            window.location.reload("/int/#/Documentos");
        },
    ).catch(

        (err) => {

            //console.log(err)
        });

};

const submitUpdate = (tabla, id) => {
    let do_ = true;
    let archivo = "";
    let file = $('#nuevo_archivo')[0].files[0]

    if ($('#nuevo_archivo').val() == "") {
        archivo = $('#nuevo_archivo').val()
    } else {
        archivo = $("#path").val()+"/" + file.name;
    }
    Axios.post('https://sistemaintegral.conavi.gob.mx:81/api/update_doc', {
        tabla: $("#tabla_actual").val(),
        id: $("#id_file").val(),
        descripcion: $("#nombre_actual").val(),
        archivo: archivo,

    }).then(
        (response) => {
            if (response.data != "") {


                if (archivo == "") {
                    Alerta_("¡Modificación<strong> exitosa</strong>!", "alertaOp alert alert-success alert-dismissible");
                    limpiar();
                    window.location.reload("/int/#/Documentos");
                } else {
                    submitFile();
                }
            } else {
                Alerta_("<strong>Ocurrió un error</strong> al realizar esta modificación.", "alertaOp alert alert-danger alert-dismissible");
                do_ = false;
            }
        },
    ).catch(

        (err) => {

            //console.log(err)
        });
    return do_;
};

const limpiar = () => {
    $("#modal").css("display", "none");
    $("#content-upd").css("display", "none");
    $('html').css("overflow", "");
    $("#id_file").val("");
    $("#nombre_actual").val("");
    $("#tabla_actual").val("");
    $("#ruta_actual").val("");
    $("#nueva_actual").val("");
    
}


export default function ModalDt() {


    useEffect(() => {
        const user = getUserCredenciales();
         if (!user) {
         window.location.href = "/int/#/";
          return;
         }

    });

    return (
        <div id='content-upd' class='modal-content' style={{ display: "none", overflow: "hidden" }}>

            <div class='modal-header'>
                <h4 id='titulo-modal' style={{ fontWeight: 300 }}>Modificación de documentos</h4>
            </div>

            <div class="row" >

            </div>

            <div style={{ padding: 20 }} class='modal-body list-parent'>
                <input type="hidden" id="path" class="form-control" />
                <input type="hidden" id="id_file" class="form-control" />
                <input type="hidden" id="tabla_actual" class="form-control" />
                <input type="hidden" id="ruta_actual" class="form-control" />
                <small>Nombre de archivo</small>
                <input id="nombre_actual" class="form-control" />

                <small>Reemplazar documento</small>
                <input id="nuevo_archivo" class="form-control" type="file" />
            </div>

            <div style={{ padding: 40 }}>
                <button id="btnGuardar" class='col-md-3 col-xs-12 btn-primary'
                    onClick={submitUpdate}
                    style={{ marginRight: 10, marginBottom: 10 }}


                >Guardar</button>
                <button id="btnCerrar" class='col-md-3 col-xs-12  btn-default bottom-buffer-x15'
                    onClick={limpiar}
                >Cancelar</button>

            </div>

        </div>
    );
}
