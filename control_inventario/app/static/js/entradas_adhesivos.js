function abrirModalRegistroAdsivosEntradas() {
    var modal = new bootstrap.Modal(document.getElementById('Entradas'));
    modal.show();
  }
  document.getElementById('btnentradas').addEventListener('click', function() {
    abrirModalRegistroAdsivosEntradas();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('Entradas');

    // Evento que se dispara cuando se abre el modal
    modalSalidas.addEventListener('show.bs.modal', function (event) {
        // Botón que dispara el modal
        const button = event.relatedTarget;


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
    });
});