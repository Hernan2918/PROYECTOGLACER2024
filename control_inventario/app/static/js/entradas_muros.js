function abrirModalRegistroMurosentradas() {
    var modal = new bootstrap.Modal(document.getElementById('Entradas'));
    modal.show();
  }
  document.getElementById('btnentradas').addEventListener('click', function() {
    abrirModalRegistroMurosentradas();
  });
  
  
  document.addEventListener('DOMContentLoaded', function () {
    const modalEntradas = document.getElementById('Entradas');
  
    modalEntradas.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const id_producto = button.getAttribute('data-id');
        const medida = button.getAttribute('data-medidas');
        const proveedor = button.getAttribute('data-proveedor');
        const producto = button.getAttribute('data-producto');
        const calidad = button.getAttribute('data-calidad');
        const categoria = button.getAttribute('data-categoria');
        
       
        modalEntradas.querySelector('#id_producto').value = id_producto;
        modalEntradas.querySelector('#medida').value = medida;
        modalEntradas.querySelector('#proveedores').value = proveedor;
        modalEntradas.querySelector('#producto').value = producto;
        modalEntradas.querySelector('#calidad').value = calidad;
        modalEntradas.querySelector('#categorias').value = categoria;
    });
  });
  