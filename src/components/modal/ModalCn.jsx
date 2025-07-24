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
import JSZip from 'jszip';
import axios from 'axios';

//var api_cnfg = "https://sistemaintegral.conavi.gob.mx:81";
var api_cnfg = "http://localhost:3001";

const limpiar = () => {
		$("#modal").css("display", "none");
		$("#content-cn").css("display", "none");
		$('html').css("overflow", "");
	}

export default function ModalCn() { 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getNomina() {
      try {
        const response = await axios.get(api_cnfg + "/api/listDirs/"); // Replace with your API endpoint
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getNomina(); // Call the async function
  }, []); // Empty dependency array ensures it runs only on mount
useEffect(() => {
		const data = {
  "name": "nominas",
  "type": "directory",
  "children": [
    {
      "name": "2024",
      "type": "directory",
      "children": [
        {
          "name": "PDF_11_14",
          "type": "directory",
          "children": [
            { "name": "2024_1_11_14_00800197.Pdf", "type": "file" },
            { "name": "2024_1_11_14_00800198.Pdf", "type": "file" }
          ]
        },
        {
          "name": "XML_11_14",
          "type": "directory",
          "children": [
            { "name": "2024_1_11_14_00800197.xml", "type": "file" },
            { "name": "2024_1_11_14_00800198.xml", "type": "file" }
          ]
        }
      ]
    },
    {
      "name": "2025",
      "type": "directory",
      "children": [
        {
          "name": "PDF_1_13",
          "type": "directory",
          "children": [
            { "name": "2025_1_1_13_00800197.Pdf", "type": "file" }
          ]
        },
        {
          "name": "XML_1_13",
          "type": "directory",
          "children": [
            { "name": "2025_1_1_13_00800197.xml", "type": "file" }
          ]
        }
      ]
    }
  ]
};
const anioSelect = document.getElementById("anioSelect");
const tipoSelect = document.getElementById("tipoSelect");
const periodoSelect = document.getElementById("periodoSelect");
const archivoContent = document.getElementById("archivoContent");
//const verArchivosBtn = document.getElementById("verArchivosBtn");

// Inicializa tabla
let dataTable = $('#archivosTable').DataTable();

const tipoLabels = {
  "1": "Ordinario",
  "11": "Extraordinario"
};


// Llenar años
data.children.forEach(dir => {
  $('#anioSelect').append(`<option value="${dir.name}">${dir.name}</option>`);
});

// Evento: Año seleccionado
$('#anioSelect').on('change', function () {
  const year = $(this).val();
  $('#tipoSelect').prop('disabled', false).html('<option selected disabled>Selecciona tipo</option>');
  $('#periodoSelect').prop('disabled', true).html('<option selected disabled>Selecciona periodo</option>');

  const yearDir = data.children.find(d => d.name === year);
  const tipos = new Set();

  yearDir.children.forEach(d => {
    const parts = d.name.split('_');
    if (parts.length === 3) tipos.add(parts[1]);
  });

  tipos.forEach(tipo => {
    $('#tipoSelect').append(`<option value="${tipo}">${tipoLabels[tipo] || 'Tipo ' + tipo}</option>`);
  });
});

// Evento: Tipo seleccionado
$('#tipoSelect').on('change', function () {
  const year = $('#anioSelect').val();
  const tipo = $(this).val();
  $('#periodoSelect').prop('disabled', false).html('<option selected disabled>Selecciona periodo</option>');

  const yearDir = data.children.find(d => d.name === year);
  const periodos = new Set();

  yearDir.children.forEach(d => {
    const parts = d.name.split('_');
    if (parts[1] === tipo) {
      periodos.add(parts[2]);
    }
  });

  periodos.forEach(periodo => {
    $('#periodoSelect').append(`<option value="${periodo}">${periodo}</option>`);
  });
});

// Evento: Periodo seleccionado
$('#periodoSelect').on('change', function () {
  const year = $('#anioSelect').val();
  const tipo = $('#tipoSelect').val();
  const periodo = $(this).val();

  const yearDir = data.children.find(d => d.name === year);

  let files = [];

  yearDir.children.forEach(d => {
    const parts = d.name.split('_');
    if (parts[1] === tipo && parts[2] === periodo) {
      d.children.forEach(file => {
        files.push({
          archivo: file.name,
          extension: file.name.split('.').pop(),
          anio: year,
          tipo: tipoLabels[tipo] || 'Tipo ' + tipo,
          periodo: periodo
        });
      });
    }
  });

  // Actualizar tabla
  dataTable.clear();
  dataTable.rows.add(files.map(f => [f.archivo, f.extension, f.anio, f.tipo, f.periodo]));
  dataTable.draw();
});


	});
if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
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
<button id="btnCerrar-s" class='col-md-3 col-xs-12  btn-default pull-right' type="button" onClick={limpiar}>Cancelar</button>
					</div>
				</div>
  ); 
}
