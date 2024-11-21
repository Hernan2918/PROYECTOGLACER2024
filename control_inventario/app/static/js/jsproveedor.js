
document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('home-link');
    const subcategories = document.getElementById('subcategories');
    // const pisosLink = document.getElementById('pisos-link');
    // const subcategoriasPisos = document.querySelector('.subcategorias_pisos');
    // const adLink = document.getElementById('ad-link');
    // const subcategoriasAd = document.querySelector('.subcategorias_ad');
    // const murosLink = document.getElementById('muros-link');
    // const subcategoriasMuros = document.querySelector('.subcategorias_muros');

    // Maneja el clic en "HOME"
    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        subcategories.style.display = subcategories.style.display === "block" ? "none" : "block";
    });

    // Maneja el clic en "PISOS"
    // pisosLink.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     const isVisible = subcategoriasPisos.style.display === 'block';
    //     subcategoriasPisos.style.display = isVisible ? 'none' : 'block';
    //     subcategoriasAd.style.display = 'none'; // Cierra subcategorías de "Muros"
    //     subcategoriasMuros.style.display = 'none'; // Cierra subcategorías de "Adhesivos"
    // });

    // Maneja el clic en "MUROS"
    // murosLink.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     const isVisible = subcategoriasMuros.style.display === 'block';
    //     subcategoriasMuros.style.display = isVisible ? 'none' : 'block';
    //     subcategoriasPisos.style.display = 'none'; // Cierra subcategorías de "Pisos"
    //     subcategoriasAd.style.display = 'none'; // Cierra subcategorías de "Adhesivos"
    // });

    // Maneja el clic en "ADHESIVOS"
    // adLink.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     const isVisible = subcategoriasAd.style.display === 'block';
    //     subcategoriasAd.style.display = isVisible ? 'none' : 'block';
    //     subcategoriasPisos.style.display = 'none'; // Cierra subcategorías de "Pisos"
    //     subcategoriasMuros.style.display = 'none'; // Cierra subcategorías de "Muros"
    // });

    // Cierra subcategorías y el menú de categorías al hacer clic fuera
    document.addEventListener('click', function (event) {
        if (!homeLink.contains(event.target) && !subcategories.contains(event.target)) {
            subcategories.style.display = 'none'; // Oculta el menú de categorías
        }

        // if (!pisosLink.contains(event.target) && !subcategoriasPisos.contains(event.target)) {
        //     subcategoriasPisos.style.display = 'none'; // Oculta subcategorías de "Pisos"
        // }

        // if (!adLink.contains(event.target) && !subcategoriasAd.contains(event.target)) {
        //     subcategoriasAd.style.display = 'none'; // Oculta subcategorías de "Adhesivos"
        // }

        // if (!murosLink.contains(event.target) && !subcategoriasMuros.contains(event.target)) {
        //     subcategoriasMuros.style.display = 'none'; // Oculta subcategorías de "Muros"
        // }
    });
});

        
   


   
        function abrirModalRegistro() {
          var modal = new bootstrap.Modal(document.getElementById('modalRegistroProveedor'));
          modal.show();
        }
        document.getElementById('registroProveedor').addEventListener('click', function() {
          abrirModalRegistro();
        });

        
        $(document).ready(function(){
            $("#buscarproveedor").on("keyup", function() {
                var value = $(this).val();
                var noMatch = true;
        
                if (value === "") {
                    $("#tabla_proveedores tbody tr").show();
                    $("#noMatches").hide();
                    return;
                }
        
                if (value.trim() === "") {
                    $("#tabla_proveedores tbody tr").hide();
                    $("#noMatches").show();
                    return;
                }
        
                $("#tabla_proveedores tbody tr").filter(function() {
                    var match = $(this).text().toLowerCase().indexOf(value.trim().toLowerCase()) > -1;
                    $(this).toggle(match);
                    if (match) noMatch = false;
                });
        
                if (noMatch) {
                    $("#noMatches").show();
                } else {
                    $("#noMatches").hide();
                }
            });
        });
        

        document.getElementById('foto').addEventListener('change', function(event) {
            const file = event.target.files[0];
            const preview = document.getElementById('preview');
        
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    preview.src = e.target.result; // Establece la fuente de la imagen a la cargada
                    preview.style.display = 'block'; // Muestra la imagen
                }
        
                reader.readAsDataURL(file); // Lee el archivo como una URL de datos
            } else {
                preview.src = ""; // Reinicia la fuente si no hay archivo
                preview.style.display = 'none'; // Oculta la imagen
            }
        });
        



        document.addEventListener('DOMContentLoaded', function() {
            var editarProveedorModal = document.getElementById('editarModalProveedor');
        
            editarProveedorModal.addEventListener('show.bs.modal', function(event) {
                var button = event.relatedTarget; 
                var id = button.getAttribute('data-id');
                var nombre = button.getAttribute('data-nombre');
                var telefono = button.getAttribute('data-telefono');
                var correo = button.getAttribute('data-correo');
                var direccion = button.getAttribute('data-direccion');
                var foto = button.getAttribute('data-foto');
        
                
                editarProveedorModal.querySelector('#editarproveedorId').value = id;
                editarProveedorModal.querySelector('#nombreeditar').value = nombre;
                editarProveedorModal.querySelector('#telefonoeditar').value = telefono;
                editarProveedorModal.querySelector('#correoeditar').value = correo;
                editarProveedorModal.querySelector('#direccioneditar').value = direccion;
        
                
                const previeweditar = editarProveedorModal.querySelector('#previeweditar');
                if (foto) {
                    previeweditar.src = "/static/uploads/" + foto; 
                    previeweditar.style.display = 'block'; 
                } else {
                    previeweditar.src = ""; 
                    previeweditar.style.display = 'none';
                }
            });
        
            // Manejador para la vista previa de la nueva imagen
            document.getElementById('fotoeditar').addEventListener('change', function(event) {
                const file = event.target.files[0];
                const previeweditar = document.getElementById('previeweditar');
        
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previeweditar.src = e.target.result; // Establece la fuente de la imagen a la cargada
                        previeweditar.style.display = 'block'; // Muestra la imagen
                    }
                    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
                } else {
                    previeweditar.src = ""; // Reinicia la fuente si no hay archivo
                    previeweditar.style.display = 'none'; // Oculta la imagen
                }
            });
        });
        


        document.addEventListener('DOMContentLoaded', function() {
            var eliminarModal = document.getElementById('eliminarProveedor');
            eliminarModal.addEventListener('show.bs.modal', function (event) {
                var button = event.relatedTarget;
                var proveedorId = button.getAttribute('data-id');
                var formEliminar = document.getElementById('formEliminarPro');
                formEliminar.action = '/eliminar_proveedor/' + proveedorId;
            });
        });
        
        document.getElementById("buscar2").addEventListener("click", function() {
            document.getElementById("buscarproveedor").focus();
        });


        // FUNCION DE VALIDACION PARA EL REGSITRO DE UN PROVEEFOR


        function validarFormularioProveedor() {
            var isValid = true;
            
            var nombre = document.getElementById('nombre').value;
            var nombreError = document.getElementById('nombreError');
            var expresionnom = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?:\s[a-záéíóúüñ]+)?$/;
    
            if (!expresionnom.test(nombre)){
                nombreError.textContent = 'Por favor ingresa un nombre de proveedor valido';
                nombreError.style.display = 'block';
                isValid = false;
            }else{
                nombreError.textContent = '';
                nombreError.style.display = 'none';
            }
    
    
            var telefono = document.getElementById('telefono').value;
            var telefonoError = document.getElementById('telefonoError');
            var expresiontel = /^\d{10}$/;
    
            if (!expresiontel.test(telefono)){
                telefonoError.textContent = 'Por favor ingresa un numero telefonico valido, debe contener 10 digitos';
                telefonoError.style.display = 'block';
                isValid = false;
            }else{
                telefonoError.textContent = '';
                telefonoError.style.display = 'none';
            }
    
            var correo = document.getElementById('correo').value;
            var correoError = document.getElementById('correoError');
            var expresioncor = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
            if (!expresioncor.test(correo)){
                correoError.textContent = 'Por favor ingresa correo valido, debe contener un arroba y una terminación como .com';
                correoError.style.display = 'block';
                isValid = false;
            }else{
                correoError.textContent = '';
                correoError.style.display = 'none';
            }
    
            var direccion = document.getElementById('direccion').value;
            var direccionError = document.getElementById('direccionError');
            var expresiondic = /^[a-zA-Z0-9\s.,#-]+,\s?\d+(,\s?\d+)?\s*,\s?\d{5}$/;
    
            if (!expresiondic.test(direccion)){
                direccionError.textContent = 'Por favor ingresa una dirección correcta, ejemplo Av. Insurgentes Sur 123, Col. Roma, 06760.';
                direccionError.style.display = 'block';
                isValid = false;
            }else{
                direccionError.textContent = '';
                direccionError.style.display = 'none';
            }
    
    
            var foto = document.getElementById('foto').value;
            var fotoError = document.getElementById('fotoError');
            if (foto === "") {
                fotoError.textContent = 'Por favor, selecciona una imagen.';
                fotoError.style.display = 'block';
                isValid = false;
            } else {
                fotoError.textContent = '';
                fotoError.style.display = 'none';
            }
    
    
            return isValid
                
    
        }

        // FUNCION PARA LA VALIDACION DE LA ACTUALIZACION DE UN PROVEEDOR

        function validarFormularioProveedorA() {
            var isValid = true;
            
            var nombreA = document.getElementById('nombreeditar').value;
            var nombreErrorA = document.getElementById('nombreErrorA');
            var expresionnomA = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?:\s[a-záéíóúüñ]+)?$/;
    
            if (!expresionnomA.test(nombreA)){
                nombreErrorA.textContent = 'Por favor ingresa un nombre de proveedor valido';
                nombreErrorA.style.display = 'block';
                isValid = false;
            }else{
                nombreErrorA.textContent = '';
                nombreErrorA.style.display = 'none';
            }
    
    
            var telefonoA = document.getElementById('telefonoeditar').value;
            var telefonoErrorA = document.getElementById('telefonoErrorA');
            var expresiontelA = /^\d{10}$/;
    
            if (!expresiontelA.test(telefonoA)){
                telefonoErrorA.textContent = 'Por favor ingresa un numero telefonico valido, debe contener 10 digitos';
                telefonoErrorA.style.display = 'block';
                isValid = false;
            }else{
                telefonoErrorA.textContent = '';
                telefonoErrorA.style.display = 'none';
            }
    
            var correoA = document.getElementById('correoeditar').value;
            var correoErrorA = document.getElementById('correoErrorA');
            var expresioncorA = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
            if (!expresioncorA.test(correoA)){
                correoErrorA.textContent = 'Por favor ingresa correo valido, debe contener un arroba y una terminación como .com';
                correoErrorA.style.display = 'block';
                isValid = false;
            }else{
                correoErrorA.textContent = '';
                correoErrorA.style.display = 'none';
            }
    
            var direccionA = document.getElementById('direccioneditar').value;
            var direccionErrorA = document.getElementById('direccionErrorA');
            var expresiondicA = /^[a-zA-Z0-9\s.,#-]+,\s?\d+(,\s?\d+)?\s*,\s?\d{5}$/;
    
            if (!expresiondicA.test(direccionA)){
                direccionErrorA.textContent = 'Por favor ingresa una dirección correcta, ejemplo Av. Insurgentes Sur 123, Col. Roma, 06760.';
                direccionErrorA.style.display = 'block';
                isValid = false;
            }else{
                direccionErrorA.textContent = '';
                direccionErrorA.style.display = 'none';
            }
    
    
    
            return isValid
                
    
        }

           
                