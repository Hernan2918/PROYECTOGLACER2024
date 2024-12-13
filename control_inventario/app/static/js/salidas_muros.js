function abrirModalRegistroMurosSalidas() {
    var modal = new bootstrap.Modal(document.getElementById('Salidas'));
    modal.show();
  }
  document.getElementById('btnsalidas').addEventListener('click', function() {
    abrirModalRegistroMurosSalidas();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('Salidas');

    // Evento que se dispara cuando se abre el modal
    modalSalidas.addEventListener('show.bs.modal', function (event) {
        // Botón que dispara el modal
        const button = event.relatedTarget;


        const id_producto = button.getAttribute('data-id');
        const medida = button.getAttribute('data-medidas');
        const proveedor = button.getAttribute('data-proveedor');
        const producto = button.getAttribute('data-producto');
        const calidad = button.getAttribute('data-calidad');
        const categoria = button.getAttribute('data-categoria');
        console.log("Proveedor:", proveedor);
        console.log("Categoría:", categoria);
        modalSalidas.querySelector('#id_producto').value = id_producto;
        modalSalidas.querySelector('#medida').value = medida;
        modalSalidas.querySelector('#proveedoresmu').value = proveedor;
        modalSalidas.querySelector('#producto').value = producto;
        modalSalidas.querySelector('#calidad').value = calidad;
        modalSalidas.querySelector('#categoriasMuros').value = categoria;
    });
});
