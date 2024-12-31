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
        modalSalidas.querySelector('#proveedoreE').value = proveedor;
        modalSalidas.querySelector('#medidaE').value = medida;
        modalSalidas.querySelector('#tipoE').value = tipo;
        modalSalidas.querySelector('#productoE').value = producto;
        modalSalidas.querySelector('#categoriasE').value = categoria;
    });
})

document.addEventListener("DOMContentLoaded", function () {
  const modalElement = document.getElementById("Entradas");

  modalElement.addEventListener("hidden.bs.modal", function () {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());
  });
});