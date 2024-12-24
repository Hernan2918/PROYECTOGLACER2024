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




    function validarFormularioSalidasAdhesivos() {
        var isValid = true;
      
        var entrada = document.getElementById('salida').value;
        var entradaError = document.getElementById('salidaErrorAD');
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
        var fechaError = document.getElementById('fechaSalidaErrorAD');
        var fechaActual = new Date().toISOString().split('T')[0];
        
        if (fecha === "") {
            fechaError.textContent = 'Por favor, selecciona una fecha.';
            fechaError.style.display = 'block';
            isValid = false;
        } else if (fecha < fechaActual) {
            fechaError.textContent = 'La fecha no puede ser menor a la fecha actual.';
            fechaError.style.display = 'block';
            isValid = false;
        }else if (fecha > fechaActual) {
            fechaError.textContent = 'La fecha no puede ser mayor a la fecha actual.';
            fechaError.style.display = 'block';
            isValid = false;
        }
         else {
            fechaError.textContent = '';
            fechaError.style.display = 'none';
        }
      
        var destino = document.getElementById('destino').value;
        var destinoError = document.getElementById('destinoSalidaErrorAD');
        var expresiondes = /^[A-Z](?:[a-zA-Z0-9áéíóúüñ]+(?:\s[a-zA-Z0-9áéíóúüñ]+)*)?$/;

         if (!expresiondes.test(destino)) {
            destinoError.textContent = 'Por favor, ingresa un destino correcto. Sin múltiples espacios.';
            destinoError.style.display = 'block';
            isValid = false;
        } else {
            destinoError.textContent = '';
            destinoError.style.display = 'none';
        }



        var estatus = document.getElementById('estatus').value;
        var estatusError = document.getElementById('estatusSalidaErrorAD');
        if (estatus === "") {
            estatusError.textContent = 'Por favor, selecciona un estatus.';
            estatusError.style.display = 'block';
            isValid = false;
        } else {
            estatusError.textContent = '';
            estatusError.style.display = 'none';
        }
      
        return isValid;
      }
