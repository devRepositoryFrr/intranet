////////////////////////////////////////////////////////////////// Librerías importadas

import $ from 'jquery'; 
import "datatables.net-dt/css/dataTables.dataTables.min.css"; 
import "datatables.net-dt/js/dataTables.dataTables"; 
import 'datatables.net'; 
import '../../assets/css/scroll.css'; 
import '../../assets/css/modal.css'; 
import '../../assets/css/content.css'; 
import '../../assets/css/listas.css'; 
import '../../assets/css/reservacion.css'; 
import '../../assets/css/emergente.css'; 
import '../../assets/css/datepicker.css'; 
import '../../assets/js/jquery.serializeToJSON.js'; 
import '../../assets/js/soporte.js'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserCredenciales } from '../../utils/storage';

var api_cnfg = "https://sistemaintegral.conavi.gob.mx:81";
//var api_cnfg = "http://localhost:3001";
var nomina;
const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-cn").css("display", "none");
		$('html').css("overflow", "");
	}
  var lang = {
	"sProcessing": "Procesando...",
	"sLengthMenu": "Mostrar _MENU_ registros",
	"sZeroRecords": "No se encontraron resultados",
	"sEmptyTable": "Ningún dato disponible en esta tabla",
	"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
	"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix": "",
	"sSearch": "Buscar:",
	"sUrl": "",
	"sInfoThousands": ",",
	"sLoadingRecords": "Cargando...",
	"oPaginate": {
		"sFirst": "Primero",
		"sLast": "Último",
		"sNext": "Siguiente",
		"sPrevious": "Anterior"
	},
	"oAria": {
		"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
	}
};
const DownloadZip = async () => {

    try {
      // Realiza la petición POST al endpoint de tu backend
      // Ahora enviamos el baseFileName en el cuerpo de la solicitud (como un objeto JSON)
      const response = await axios.post(
        api_cnfg + "/api/downNomina/" , // La URL no necesita el parámetro en la ruta ahora
        { nomina: nomina }, // Datos enviados en el cuerpo de la solicitud "2024_1_11_14_00800197"
        {
          responseType: 'blob', // **MUY IMPORTANTE**: Esperamos una respuesta binaria (ZIP)
        }
      );

      // Si la petición es exitosa, se procede a la descarga del archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nomina+'.zip'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Mejor usar removeChild en el body directamente
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error al descargar el archivo ZIP:', err);
      
    } finally {
    }
  };
export default function ModalCn() { 
  //const [nomina, setData] = useState(null);
   
useEffect(() => {
  const user = getUserCredenciales();

  // ⚡ Manejo seguro
  const empleado = user?.[0]?.num_empleado
    ? user[0].num_empleado.toString().padStart(8, "0")
    : null;

  if (!empleado) {
    // si no hay usuario válido, redirigir
    window.location.href = "/int/#/";
    return;
  }
    //console.log(empleado)
  //var data ={}; // {"name":"nominas","type":"directory","children":[{"name":"2024","type":"directory","children":[{"name":"PDF_11_14","type":"directory","children":[{"name":"2024_1_11_14_00800197.Pdf","type":"file"},{"name":"2024_1_11_14_00800198.Pdf","type":"file"},{"name":"2024_1_11_14_00800200.Pdf","type":"file"},{"name":"2024_1_11_14_00800201.Pdf","type":"file"},{"name":"2024_1_11_14_00800203.Pdf","type":"file"},{"name":"2024_1_11_14_00800207.Pdf","type":"file"}]},{"name":"XML_11_14","type":"directory","children":[{"name":"2024_1_11_14_00800197.xml","type":"file"},{"name":"2024_1_11_14_00800198.xml","type":"file"},{"name":"2024_1_11_14_00800200.xml","type":"file"},{"name":"2024_1_11_14_00800201.xml","type":"file"},{"name":"2024_1_11_14_00800203.xml","type":"file"},{"name":"2024_1_11_14_00800207.xml","type":"file"}]}]},{"name":"2025","type":"directory","children":[{"name":"PDF_11_14","type":"directory","children":[{"name":"2025_1_11_14_00800197.Pdf","type":"file"},{"name":"2025_1_11_14_00800198.Pdf","type":"file"},{"name":"2025_1_11_14_00800200.Pdf","type":"file"},{"name":"2025_1_11_14_00800201.Pdf","type":"file"},{"name":"2025_1_11_14_00800203.Pdf","type":"file"},{"name":"2025_1_11_14_00800207.Pdf","type":"file"}]},{"name":"XML_11_14","type":"directory","children":[{"name":"2025_1_11_14_00800197.xml","type":"file"},{"name":"2025_1_11_14_00800198.xml","type":"file"},{"name":"2025_1_11_14_00800200.xml","type":"file"},{"name":"2025_1_11_14_00800201.xml","type":"file"},{"name":"2025_1_11_14_00800203.xml","type":"file"},{"name":"2025_1_11_14_00800207.xml","type":"file"}]}]}]};
   const getNomina = async () => {
    try {
        // Asegúrate de que 'empleado' y 'api_cnfg' estén definidos en tu ámbito
        // const empleado = '00800197'; // Ajusta según tu necesidad, si viene de otro lado
        // const api_cnfg = 'http://localhost:3000'; // Ajusta a tu configuración real

        const res = await axios.get(api_cnfg + "/api/lstNominaEmp/" + empleado);
        let data = res.data; // Aquí está tu estructura de directorio JSON

        //console.log(JSON.stringify(data));

        // Inicializar/Reinicializar DataTable.
        // Es mejor inicializarla una única vez en el DOM Ready y luego solo usar clear/rows.add/draw.
        let dataTable;
        if ($.fn.DataTable.isDataTable('#archivosTable')) {
            dataTable = $('#archivosTable').DataTable();
            dataTable.clear().draw(); // Limpia la tabla existente
        } else {
            dataTable = $('#archivosTable').DataTable({
                language: lang,
                searching: false, // Puedes ajustar estas opciones de DataTable
                paging: false,
                info: false,
                columns: [ // Define tus columnas aquí para evitar advertencias de DataTables
                    { title: "Archivo", data: "archivo" },
                    { title: "Extensión", data: "extension" },
                    { title: "Año", data: "anio" },
                    { title: "Tipo", data: "tipo" },
                    { title: "Periodo", data: "periodo" },
                    // Añade más columnas si las tienes en tu objeto 'files'
                ]
            });
        }

        const tipoLabels = {
            "1": "Ordinario",
            "11": "Extraordinario"
        };

        const anioSelect = $('#anioSelect');
        const tipoSelect = $('#tipoSelect');
        const periodoSelect = $('#periodoSelect');
        const btnDown = $("#btnDown");

        // --- Limpieza inicial y estado ---
        anioSelect.empty().append('<option value="" selected disabled>Selecciona un Año</option>');
        tipoSelect.empty().append('<option value="" selected disabled>Selecciona tipo</option>');
        periodoSelect.empty().append('<option value="" selected disabled>Selecciona periodo</option>');
        tipoSelect.prop('disabled', true);
        periodoSelect.prop('disabled', true);
        btnDown.hide();

        // --- Validar la estructura de datos principal ---
        if (Object.keys(data).length === 0 || !data.children) {
            //console.log("No hay datos de nóminas para mostrar o la estructura es inválida.");
            // Opcional: Mostrar un mensaje en la UI
            // $('#mensajesUsuario').text('No se encontraron nóminas disponibles.');
            return; // Salir de la función si no hay datos válidos
        }

        // --- Llenado del select de Año ---
        const availableYears = new Set();
        data.children.forEach(yearDir => {
            // Verifica que sea un directorio de año válido (ej. "2024") y que tenga hijos (periodos)
            if (yearDir.type === 'directory' && /^\d{4}$/.test(yearDir.name) && yearDir.children) {
                // Iterar sobre los directorios de periodo (PDF_XX_YY) dentro de este año
                yearDir.children.forEach(periodDir => {
                    // CLAVE: Si este directorio de periodo TIENE ARCHIVOS dentro, entonces el año es válido
                    if (periodDir.children && periodDir.children.length > 0) {
                        availableYears.add(yearDir.name); // Añade el año
                    }
                });
            }
        });

        // Agrega solo los años que tienen archivos encontrados
        Array.from(availableYears).sort().forEach(year => {
            anioSelect.append(`<option value="${year}">${year}</option>`);
        });

        // --- Event Listeners para los selects ---
        // Desvincular eventos previos para evitar múltiples ejecuciones si la función se llama de nuevo
        anioSelect.off('change');
        tipoSelect.off('change');
        periodoSelect.off('change');

        // Evento: Año seleccionado
        anioSelect.on('change', function () {
            const selectedYear = $(this).val();

            // Resetear selects de tipo y periodo al cambiar el año
            tipoSelect.prop('disabled', false).empty().append('<option value="" selected disabled>Selecciona tipo</option>');
            periodoSelect.prop('disabled', true).empty().append('<option value="" selected disabled>Selecciona periodo</option>');
            btnDown.hide(); // Ocultar botón de descarga
            dataTable.clear().draw(); // Limpiar tabla

            if (!selectedYear) return; // Si no hay año seleccionado, no hacer nada más

            const yearDir = data.children.find(d => d.name === selectedYear);
            if (!yearDir || !yearDir.children) return;

            const uniqueTipos = new Set();
            // Regex para extraer el indicador de tipo y la segunda parte del periodo de los nombres de directorio
            const periodDirRegex = /^(PDF|XML)_(\d{1,2})_(\d{1,2})$/;

            yearDir.children.forEach(periodDir => {
                const match = periodDir.name.match(periodDirRegex);
                // CLAVE: Solo si el directorio de periodo coincide con el regex Y TIENE ARCHIVOS dentro
                if (match && periodDir.children && periodDir.children.length > 0) {
                    const typeIndicator = match[2]; // Captura el '1' o '11'
                    uniqueTipos.add(typeIndicator);
                }
            });

            Array.from(uniqueTipos).sort().forEach(tipo => {
                tipoSelect.append(`<option value="${tipo}">${tipoLabels[tipo] || 'Tipo ' + tipo}</option>`);
            });
        });

        // Evento: Tipo seleccionado
        tipoSelect.on('change', function () {
            const selectedYear = anioSelect.val();
            const selectedTipo = $(this).val();

            // Resetear select de periodo al cambiar el tipo
            periodoSelect.prop('disabled', false).empty().append('<option value="" selected disabled>Selecciona periodo</option>');
            btnDown.hide(); // Ocultar botón de descarga
            dataTable.clear().draw(); // Limpiar tabla

            if (!selectedYear || !selectedTipo) return;

            const yearDir = data.children.find(d => d.name === selectedYear);
            if (!yearDir || !yearDir.children) return;

            const uniquePeriodos = new Set();
            const periodDirRegex = /^(PDF|XML)_(\d{1,2})_(\d{1,2})$/;

            yearDir.children.forEach(periodDir => {
                const match = periodDir.name.match(periodDirRegex);
                // CLAVE: Si el directorio de periodo coincide con el regex, con el TIPO seleccionado, Y TIENE ARCHIVOS
                if (match && match[2] === selectedTipo && periodDir.children && periodDir.children.length > 0) {
                    const firstPeriodPart = match[3]; // La segunda parte del periodo (ej. '10' de 'PDF_1_10')
                    const fullPeriod = `${selectedTipo}_${firstPeriodPart}`; // Reconstruye el periodo completo como "1_10"
                    uniquePeriodos.add(fullPeriod);
                }
            });

            // Ordenar periodos para mejor UX (ej. "1_1" antes de "1_10")
            const sortedPeriodos = Array.from(uniquePeriodos).sort((a, b) => {
                const [aType, aNum] = a.split('_').map(Number);
                const [bType, bNum] = b.split('_').map(Number);
                if (aType !== bType) return aType - bType; // Ordenar primero por tipo (1 o 11)
                return aNum - bNum; // Luego por el número del periodo
            });

            sortedPeriodos.forEach(periodo => {
                periodoSelect.append(`<option value="${periodo}">${periodo}</option>`);
            });
        });

        // Evento: Periodo seleccionado
        periodoSelect.on('change', function () {
            const selectedYear = anioSelect.val();
            const selectedTipo = tipoSelect.val();
            const selectedPeriodo = $(this).val(); // Será el periodo completo, ej. "1_10"

            btnDown.hide(); // Ocultar botón de descarga
            dataTable.clear().draw(); // Limpiar tabla

            if (!selectedYear || !selectedTipo || !selectedPeriodo) return;

            const yearDir = data.children.find(d => d.name === selectedYear);
            if (!yearDir || !yearDir.children) return;

            let files = [];
            // Regex para encontrar el directorio de período específico (ej. PDF_1_10 o XML_11_14)
            // Necesitamos el segundo grupo de dígitos del periodo para reconstruir el nombre del directorio
            const periodParts = selectedPeriodo.split('_');
            const typeForDir = periodParts[0]; // Esto es el "tipo" (1 o 11)
            const secondPartForDir = periodParts[1]; // Esto es la segunda parte del periodo (ej. 10 de 1_10)

            const periodDirNamePattern = new RegExp(`^(PDF|XML)_${typeForDir}_${secondPartForDir}$`);


            yearDir.children.forEach(d => {
                const match = d.name.match(periodDirNamePattern);
                // CLAVE: Si el directorio coincide con el patrón del periodo seleccionado Y TIENE ARCHIVOS
                if (match && d.children && d.children.length > 0) {
                    // ¡Importante! Asegurarse de que el match es exacto para el periodo seleccionado
                    // Esto ya lo asegura el regex, pero la validación d.children es la clave
                    d.children.forEach(file => {
                        // Asegurarse de que es un archivo y no un subdirectorio vacío
                        if (file.type === 'file') {
                            files.push({
                                archivo: file.name,
                                extension: file.name.split('.').pop(),
                                anio: selectedYear,
                                tipo: tipoLabels[selectedTipo] || 'Tipo ' + selectedTipo,
                                periodo: selectedPeriodo,
                                name: file.name.split('.').shift(), // Nombre base del archivo
                            });
                        }
                    });
                }
            });

            dataTable.rows.add(files).draw(); // Añade y dibuja los archivos encontrados

            // Mostrar el botón de descarga solo si se encontraron archivos
            if (files.length > 0) {
                btnDown.show();
                nomina = files[0].name;
            } else {
                btnDown.hide();
            }
        });

    } catch (err) {
        console.error('Error al obtener la lista de nóminas:', err);
        // Manejar el error en la UI (ej. mensaje de error)
        $('#anioSelect, #tipoSelect, #periodoSelect').prop('disabled', true);
        $('#btnDown').hide();
        // $('#mensajesUsuario').text('Error al cargar las nóminas. Intente de nuevo más tarde.');
    }
};
  
    getNomina();

	}, []);
      return (
        <div id='content-cn' class='modal-content' style={{ display: "none", overflow: "hidden" }}>
			<div class='modal-header'>
				<h4 id='titulo-modal' style={{ fontWeight: 300 }}>Archivos de Nómina</h4>
			</div>
			<div class='modal-body' style={{ overflowX: "auto", overflowY: "auto", padding: 20 }}>
				<div class="row mb-3">
  <div class="col-md-4">
    <label class="form-label">Año</label>
    <select id="anioSelect" class="form-control">
      <option selected disabled>Selecciona un año</option>
    </select>
  </div>
  <div class="col-md-4">
    <label class="form-label">Tipo</label>
    <select id="tipoSelect" class="form-control" disabled>
      <option selected disabled>Selecciona tipo</option>
    </select>
  </div>
  <div class="col-md-4">
    <label class="form-label">Periodo</label>
    <select id="periodoSelect" class="form-control" disabled>
      <option selected disabled>Selecciona periodo</option>
    </select>
  </div>
</div>
<table id="archivosTable" class="display" style={{width:"100%"}}>
  <thead>
    <tr>
      <th>Archivo</th>
      <th>Extensión</th>
      <th>Año</th>
      <th>Tipo</th>
      <th>Periodo</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
<button id="btnDown" class='col-md-3 col-xs-12  btn-primary pull-right' type="button" onClick={DownloadZip} style={{display:"none"}}>Descargar ZIP</button>
<button class='col-md-3 col-xs-12  btn-default pull-right' type="button" onClick={limpiar}>Cancelar</button>
					</div>
				</div>
  ); 
}
