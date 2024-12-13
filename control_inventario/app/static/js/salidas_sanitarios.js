function abrirModalRegistroSanitariosSalidas() {
    var modal = new bootstrap.Modal(document.getElementById('Salidas'));
    modal.show();
  }
  document.getElementById('btnsalidas').addEventListener('click', function() {
    abrirModalRegistroSanitariosSalidas();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('Salidas');

    // Evento que se dispara cuando se abre el modal
    modalSalidas.addEventListener('show.bs.modal', function (event) {
        // Botón que dispara el modal
        const button = event.relatedTarget;


        const id_producto = button.getAttribute('data-id');
        
        const proveedor = button.getAttribute('data-proveedor');
        const nombre = button.getAttribute('data-nombre');
        const categoria = button.getAttribute('data-categoria');
        console.log("Proveedor:", proveedor);
        console.log("Categoría:", categoria);
        modalSalidas.querySelector('#id_producto').value = id_producto;
        modalSalidas.querySelector('#proveedores').value = proveedor;
        modalSalidas.querySelector('#producto').value = nombre;
        modalSalidas.querySelector('#categorias').value = categoria;
    });
});
