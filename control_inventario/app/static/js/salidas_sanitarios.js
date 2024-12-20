function abrirModalRegistroSanitariosSalidas() {
    var modal = new bootstrap.Modal(document.getElementById('Salidas'));
    modal.show();
  }
  document.getElementById('btnsalidas').addEventListener('click', function() {
    abrirModalRegistroSanitariosSalidas();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('Salidas');

    modalSalidas.addEventListener('show.bs.modal', function (event) {
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


document.addEventListener("DOMContentLoaded", function () {
  const modalElement = document.getElementById("Salidas");

  modalElement.addEventListener("hidden.bs.modal", function () {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());
  });
});