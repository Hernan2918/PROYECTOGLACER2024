document.addEventListener('DOMContentLoaded', function() {
    var eliminarModal = document.getElementById('eliminarSalidas');
    eliminarModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var productoId = button.getAttribute('data-id');
        var formEliminar = document.getElementById('formEliminar');
        formEliminar.action = '/eliminar_producto_salidas/' + productoId;
    });
  });