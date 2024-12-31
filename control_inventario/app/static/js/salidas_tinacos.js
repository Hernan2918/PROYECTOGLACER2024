function abrirModalRegistroTinacosSalidas() {
    var modal = new bootstrap.Modal(document.getElementById('Salidas'));
    modal.show();
  }
  document.getElementById('btnsalidas').addEventListener('click', function() {
    abrirModalRegistroTinacosSalidas();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modalSalidas = document.getElementById('Salidas');

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
        modalSalidas.querySelector('#proveedoresS').value = proveedor;
        modalSalidas.querySelector('#productoS').value = nombre;
        modalSalidas.querySelector('#litrosS').value = litros;
        modalSalidas.querySelector('#colorS').value = color;
        modalSalidas.querySelector('#categoriasS').value = categoria;
    });
});


document.addEventListener("DOMContentLoaded", function () {
  const modalElement = document.getElementById("Salidas");

  modalElement.addEventListener("hidden.bs.modal", function () {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());
  });
});



    function SalidasTinacoFormulario() {
        var isValid = true;
      
        var entrada = document.getElementById('salidaTINACO').value;
        var entradaError = document.getElementById('SalidaErrorTINACO');
        var expresionent = /^[0-9]{1,10}$/;
      
         if (!expresionent.test(entrada)) {
            entradaError.textContent = 'Por favor, ingresa un número. Sin espacios.';
            entradaError.style.display = 'block';
            isValid = false;
        } else {
            entradaError.textContent = '';
            entradaError.style.display = 'none';
        }
      
        var fecha = document.getElementById('fechaTINACO').value;
        var fechaError = document.getElementById('fechaSalidaErrorTINACO');
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
        }
        else {
            fechaError.textContent = '';
            fechaError.style.display = 'none';
        }
      
        var destino = document.getElementById('destinoTINACO').value;
        var destinoError = document.getElementById('destinoSalidaErrorTINACO');
        var expresiondes = /^[A-Z](?:[a-zA-Z0-9áéíóúüñ]+(?:\s[a-zA-Z0-9áéíóúüñ]+)*)?$/;

         if (!expresiondes.test(destino)) {
            destinoError.textContent = 'Por favor, ingresa un destino correcto. Sin múltiples espacios.';
            destinoError.style.display = 'block';
            isValid = false;
        } else {
            destinoError.textContent = '';
            destinoError.style.display = 'none';
        }



        var estatus = document.getElementById('estatusTINACO').value;
        var estatusError = document.getElementById('estatusSalidaErrorTINACO');
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
