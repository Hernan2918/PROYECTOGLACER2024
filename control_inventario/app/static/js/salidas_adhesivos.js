function abrirModalRegistroAdhesivosSalida() {
    var modal = new bootstrap.Modal(document.getElementById('SalidasAdhesivos'));
    modal.show();
  }
  document.getElementById('btnsalidas').addEventListener('click', function() {
    abrirModalRegistroAdhesivosSalida();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('SalidasAdhesivos');

    modalSalidas.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;

        if (button){
          const id_producto = button.getAttribute('data-id');
          const medida = button.getAttribute('data-color');
          const proveedor = button.getAttribute('data-proveedor');
          const kilogramos = button.getAttribute('data-kilogramos');
          const categoria = button.getAttribute('data-categoria');
          console.log("Proveedor:", proveedor);
          console.log("Categoría:", categoria);
          modalSalidas.querySelector('#id_producto').value = id_producto;
          modalSalidas.querySelector('#color').value = medida;
          modalSalidas.querySelector('#proveedores').value = proveedor;
          modalSalidas.querySelector('#Kilogramos').value = kilogramos;
          modalSalidas.querySelector('#categorias').value = categoria;

        }
        
    });
});


document.addEventListener("DOMContentLoaded", function () {
  const modalElement = document.getElementById("SalidasAdhesivos");

  modalElement.addEventListener("hidden.bs.modal", function () {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());
  });
});