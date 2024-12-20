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


document.addEventListener("DOMContentLoaded", function () {
  const modalElement = document.getElementById("Entradas");

  modalElement.addEventListener("hidden.bs.modal", function () {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());
  });
});



    function validarFormularioEntradasTinacos() {
        var isValid = true;
      
        var entrada = document.getElementById('entrada').value;
        var entradaError = document.getElementById('entradaErrorTI');
        var expresionent = /^[0-9]{1,10}$/;
      
         if (!expresionent.test(entrada)) {
            entradaError.textContent = 'Por favor, ingresa un número. Sin espacios.';
            entradaError.style.display = 'block';
            isValid = false;
        } else {
            entradaError.textContent = '';
            entradaError.style.display = 'none';
        }
      
        var fecha = document.getElementById('fecha').value;
        var fechaError = document.getElementById('fechaEntradaError');
        var fechaActual = new Date().toISOString().split('T')[0];
        
        if (fecha === "") {
            fechaError.textContent = 'Por favor, selecciona una fecha.';
            fechaError.style.display = 'block';
            isValid = false;
        } else if (fecha < fechaActual) {
            fechaError.textContent = 'La fecha no puede ser menor a la fecha actual.';
            fechaError.style.display = 'block';
            isValid = false;
        } else if (fecha > fechaActual) {
            fechaError.textContent = 'La fecha no puede ser mayor a la fecha actual.';
            fechaError.style.display = 'block';
            isValid = false;
        }else {
            fechaError.textContent = '';
            fechaError.style.display = 'none';
        }
      
      
        return isValid;
      }
