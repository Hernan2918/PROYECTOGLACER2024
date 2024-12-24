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
        modalEntradas.querySelector('#medidaE').value = medida;
        modalEntradas.querySelector('#proveedoresE').value = proveedor;
        modalEntradas.querySelector('#productoE').value = producto;
        modalEntradas.querySelector('#calidadE').value = calidad;
        modalEntradas.querySelector('#categoriasE').value = categoria;
    });
  });
  

  document.addEventListener("DOMContentLoaded", function () {
    const modalElement = document.getElementById("Entradas");
  
    modalElement.addEventListener("hidden.bs.modal", function () {
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());
    });
  });






    function validarFormularioEntradasMurosF() {
        var isValid = true;
      
        var entrada = document.getElementById('entrada').value;
        var entradaError = document.getElementById('EntradaErrorMU');
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
      
    

 