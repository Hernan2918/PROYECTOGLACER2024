function abrirModalRegistroAdsivosEntradas() {
    var modal = new bootstrap.Modal(document.getElementById('EntradasAdhesivos'));
    modal.show();
  }
  document.getElementById('btnentradas').addEventListener('click', function() {
    abrirModalRegistroAdsivosEntradas();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modalEntradas = document.getElementById('EntradasAdhesivos');

    modalEntradas.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;


        if (button){
          const id_productoEntrada = button.getAttribute('data-idEntrada');
          const medidaEntrada = button.getAttribute('data-colorEntrada');
          const proveedorEntrada = button.getAttribute('data-proveedorEntrada');
          const kilogramosEntrada = button.getAttribute('data-kilogramosEntrada');
          const categoriaEntrada = button.getAttribute('data-categoriaEntrada');
        
          modalEntradas.querySelector('#id_producto').value = id_productoEntrada;
          modalEntradas.querySelector('#color').value = medidaEntrada;
          modalEntradas.querySelector('#proveedores').value = proveedorEntrada;
          modalEntradas.querySelector('#Kilogramos').value = kilogramosEntrada;
          modalEntradas.querySelector('#categorias').value = categoriaEntrada;

        }

        
    });
});


document.addEventListener("DOMContentLoaded", function () {
  const modalElement = document.getElementById("EntradasAdhesivos");

  modalElement.addEventListener("hidden.bs.modal", function () {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());
  });
});



