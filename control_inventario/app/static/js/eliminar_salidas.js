document.addEventListener('DOMContentLoaded', function() {
    var eliminarModal = document.getElementById('eliminarSalidas');
    eliminarModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var productoId = button.getAttribute('data-id');
        var formEliminar = document.getElementById('formEliminar');
        formEliminar.action = '/eliminar_producto_salidas/' + productoId;
    });
  });


// ACTUALIZAR SALIDAS

document.addEventListener('DOMContentLoaded', function() {
    var editarProductoModal = document.getElementById('editarModalSalida');
    editarProductoModal.addEventListener('show.bs.modal', function(event) {
        var button = event.relatedTarget;
        var id = button.getAttribute('data-id');
        var nombre = button.getAttribute('data-nombre');
        var salida = button.getAttribute('data-salida');
        var fecha = button.getAttribute('data-fecha');
        var destino = button.getAttribute('data-destino');
        var estatus = button.getAttribute('data-estatus');
        
        var inputId = editarProductoModal.querySelector('#editarSalidaId');
        var inputNombre = editarProductoModal.querySelector('#nombreA');
        var inputSalida = editarProductoModal.querySelector('#salidaA');
        var inputFecha = editarProductoModal.querySelector('#fechaA');
        var inputDestino = editarProductoModal.querySelector('#destinoA');
        var inputEstatus = editarProductoModal.querySelector('#estatusA');
        
        inputId.value = id;
        inputNombre.value = nombre;
        inputSalida.value = salida;
        inputFecha.value = fecha;
        inputDestino.value = destino;
        inputEstatus.value = estatus;
        
    });
});




// DESCARGAR POR FECHAS

document.getElementById('DescargarPorFechas').addEventListener('click', async function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const fechaInicioInput = document.getElementById('fechaInicio').value;
    const fechaFinInput = document.getElementById('fechaFin').value;

    if (!fechaInicioInput || !fechaFinInput) {
        alert('Por favor, selecciona las fechas de inicio y fin.');
        return;
    }

    const fechaInicio = new Date(fechaInicioInput);
    const fechaFin = new Date(fechaFinInput);

    if (fechaInicio > fechaFin) {
        alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
        return;
    }

    const url = `/obtener_salidas_por_fechas?inicio=${fechaInicioInput}&fin=${fechaFinInput}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Error en la solicitud:', response.statusText);
            alert('Hubo un problema al obtener los datos.');
            return;
        }

        const productos = await response.json();

        function formatFecha(fecha) {
            const date = new Date(fecha);
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
            const day = String(date.getUTCDate()).padStart(2, '0'); 
            return `${year}-${month}-${day}`;
        }

        const rows = productos.map((salida) => [
            salida.nombre,
            salida.salida,
            formatFecha(salida.fecha),
            salida.destino,
            salida.estatus,
        ]);

        const imgUrl = '/static/img/logov.jpeg';
        const imgData = await getBase64ImageFromUrl(imgUrl);
        if (imgData) {
            doc.addImage(imgData, 'JPEG', 13, 6, 20, 20);
        }

        doc.setFontSize(13);
        doc.text('LISTA DE SALIDAS', 105, 15, { align: 'center' });
        doc.text('GLACER Glamur Cerámico', 195, 15, { align: 'right' });
        doc.setTextColor(220, 0, 0);
        doc.text('Atlacomulco Vías', 195, 23, { align: 'right' });

        doc.autoTable({
            head: [['Nombre', 'Salida', 'Fecha', 'Destino', 'Estatus']],
            body: rows,
            theme: 'grid',
            styles: { halign: 'center', fontSize: 7 },
            headStyles: { fillColor: [220, 0, 0] },
            startY: 30,
        });

        doc.save(`salidas_${fechaInicioInput}_a_${fechaFinInput}.pdf`);
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        alert('Ocurrió un error al generar el PDF.');
    }
});

async function getBase64ImageFromUrl(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error('Error en la respuesta:', res.status, res.statusText);
            throw new Error('Error al cargar la imagen');
        }
        const blob = await res.blob();
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
        return null;
    }
}


document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.trim();
    const page = 1; 
    const perPage = 6; 
    const url = `/salidas?page=${page}&per_page=${perPage}&search=${encodeURIComponent(searchTerm)}`;

    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newTableBody = doc.querySelector('#product-table-body').innerHTML;
            const newPagination = doc.querySelector('.pagination').innerHTML;


            document.querySelector('#product-table-body').innerHTML = newTableBody;
            document.querySelector('.pagination').innerHTML = newPagination;

            const noMatchesDiv = document.getElementById('noMatches');
            const tableBody = document.querySelector('#product-table-body');
            if (tableBody.children.length === 0) {
                noMatchesDiv.style.display = 'block';
                noMatchesDiv.textContent = `No se encontraron coincidencias para: "${searchTerm}"`;
            } else {
                noMatchesDiv.style.display = 'none';
            }
        })
        .catch(error => console.error('Error al realizar la búsqueda:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    const rutaActual = window.location.pathname; 
    const iconoEntradas = document.getElementById("icono-salidas");
    
    if (rutaActual === "/salidas") {
      iconoEntradas.classList.add("active");
    }
  });



  document.addEventListener("DOMContentLoaded", function() {
    const tabla = document.getElementById("TablaProductos");
    tabla.classList.add("visible");
});   