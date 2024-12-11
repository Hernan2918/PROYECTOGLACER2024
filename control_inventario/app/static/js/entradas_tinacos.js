function abrirModalRegistroTinacosEntradas() {
    var modal = new bootstrap.Modal(document.getElementById('Entradas'));
    modal.show();
  }
  document.getElementById('btnentradas').addEventListener('click', function() {
    abrirModalRegistroTinacosEntradas();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('Entradas');

    modalSalidas.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;


        const id_producto = button.getAttribute('data-id');
        
        const proveedor = button.getAttribute('data-proveedor');
        const nombre = button.getAttribute('data-nombre');
        const litros = button.getAttribute('data-litros');
        const color = button.getAttribute('data-color');
        const categoria = button.getAttribute('data-categoria');
        console.log("Proveedor:", proveedor);
        console.log("Categoría:", categoria);
        modalSalidas.querySelector('#id_producto').value = id_producto;
        modalSalidas.querySelector('#proveedores').value = proveedor;
        modalSalidas.querySelector('#producto').value = nombre;
        modalSalidas.querySelector('#litros').value = litros;
        modalSalidas.querySelector('#color').value = color;
        modalSalidas.querySelector('#categorias').value = categoria;
    });
});
