function abrirModalRegistroProductosSalidas() {
    var modal = new bootstrap.Modal(document.getElementById('Salidas'));
    modal.show();
  }
  document.getElementById('btnsalidas').addEventListener('click', function() {
    abrirModalRegistroProductosSalidas();
  });

  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('Salidas');

    modalSalidas.addEventListener('show.bs.modal', function (event) {
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
        modalSalidas.querySelector('#proveedores').value = proveedor;
        modalSalidas.querySelector('#producto').value = producto;
        modalSalidas.querySelector('#calidad').value = calidad;
        modalSalidas.querySelector('#categorias').value = categoria;
    });
});



