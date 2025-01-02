// BUSQUEDA Y PAGINADO

document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.trim();
    const page = 1; 
    const perPage = 6; 
    const url = `/entradas?page=${page}&per_page=${perPage}&search=${encodeURIComponent(searchTerm)}`;

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




document.addEventListener('DOMContentLoaded', function() {
    var eliminarModal = document.getElementById('eliminarEntradas');
    eliminarModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var productoId = button.getAttribute('data-id');
        var formEliminar = document.getElementById('formEliminar');
        formEliminar.action = '/eliminar_producto_entradas/' + productoId;
    });
  });



  document.addEventListener("DOMContentLoaded", function () {
    const rutaActual = window.location.pathname; 
    const iconoEntradas = document.getElementById("icono-entradas");
    
    if (rutaActual === "/entradas") {
      iconoEntradas.classList.add("active");
    }
  });
  

  document.addEventListener("DOMContentLoaded", function() {
    const tabla = document.getElementById("TablaProductos");
    tabla.classList.add("visible");
});   