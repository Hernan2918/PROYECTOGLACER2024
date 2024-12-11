function abrirModalRegistroVitroblockEntradas() {
    var modal = new bootstrap.Modal(document.getElementById('Entradas'));
    modal.show();
  }
  document.getElementById('btnentradas').addEventListener('click', function() {
    abrirModalRegistroVitroblockEntradas();
  });

  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('Entradas');

    modalSalidas.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const id_producto = button.getAttribute('data-id');
        const proveedor = button.getAttribute('data-proveedorV');
        const tipo = button.getAttribute('data-tipo');
        const medida = button.getAttribute('data-medidas');
        const producto = button.getAttribute('data-nombre');
        const categoria = button.getAttribute('data-categoria');
        
        console.log("Proveedor:", proveedor);
        console.log("Categoría:", categoria);
        modalSalidas.querySelector('#id_vitroblock').value = id_producto;
        modalSalidas.querySelector('#proveedoreV').value = proveedor;
        modalSalidas.querySelector('#medida').value = medida;
        modalSalidas.querySelector('#tipo').value = tipo;
        modalSalidas.querySelector('#producto').value = producto;
        modalSalidas.querySelector('#categorias').value = categoria;
    });
})