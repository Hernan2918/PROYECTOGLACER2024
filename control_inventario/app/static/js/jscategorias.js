
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
          var modal = new bootstrap.Modal(document.getElementById('modalRegistroCategorias'));
          modal.show();
        }
        document.getElementById('registroCategoria').addEventListener('click', function() {
          abrirModalRegistro();
        });
    


    
        
        


        
            document.addEventListener('DOMContentLoaded', function() {
                var eliminarModal = document.getElementById('eliminarC');
                eliminarModal.addEventListener('show.bs.modal', function (event) {
                    var button = event.relatedTarget;
                    var categoriaId = button.getAttribute('data-id');
                    var formEliminar = document.getElementById('formEliminar');
                    formEliminar.action = '/eliminar_categoria/' + categoriaId;
                });
            });
            


            document.addEventListener('DOMContentLoaded', function() {
                var editarProveedorModal = document.getElementById('editarModalCategoria');
            
                editarProveedorModal.addEventListener('show.bs.modal', function(event) {
                    var button = event.relatedTarget; 
                    var id = button.getAttribute('data-id');
                    var nombre = button.getAttribute('data-nombre');
                    var descripcion = button.getAttribute('data-descripcion');
                    
                    editarProveedorModal.querySelector('#editarcategoriaId').value = id;
                    editarProveedorModal.querySelector('#nombreeditar').value = nombre;
                    editarProveedorModal.querySelector('#descripcioneditar').value = descripcion;
                    
                });
            });

           
                

                
                

                


                // FUNCION PARA VALIDAR EL REGISTRO DE CATEGORIAS

                function validarFormularioCategoria() {
                    var isValid = true;
                    
                    var nombre = document.getElementById('nombre').value;
                    var nombreError = document.getElementById('nombreError');
                    var expresionnom = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(?:\s[A-Za-záéíóúüñ]+)*$/;
            
                    if (!expresionnom.test(nombre)){
                        nombreError.textContent = 'Por favor ingresa un nombre de categoría valido.';
                        nombreError.style.display = 'block';
                        isValid = false;
                    }else{
                        nombreError.textContent = '';
                        nombreError.style.display = 'none';
                    }
            
            
                    var descripcion = document.getElementById('descripcion').value;
                    var descripcionError = document.getElementById('descripcionError');
                    var expresiondes = /^[A-Z](?:[a-zA-Z0-9,.áéíóúüñ]+(?:\s[a-zA-Z0-9,.áéíóúüñ]+)*)?$/;
            
                    if (!expresiondes.test(descripcion)){
                        descripcionError.textContent = 'Por favor ingresa una descripción correcta, no debe contener multiples espacios.';
                        descripcionError.style.display = 'block';
                        isValid = false;
                    }else{
                        descripcionError.textContent = '';
                        descripcionError.style.display = 'none';
                    }
            
            
                    return isValid
                        
            
                }


                // FUNCION PARA VALIDAR LA ACTUALIZACION DE UNA CATEGORIA

                function validarFormularioCategoriA() {
                    var isValid = true;
                    
                    var nombreA = document.getElementById('nombreeditar').value;
                    var nombreErrorA = document.getElementById('nombreErrorA');
                    var expresionnomA = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(?:\s[A-Za-záéíóúüñ]+)*$/;
            
                    if (!expresionnomA.test(nombreA)){
                        nombreErrorA.textContent = 'Por favor ingresa un nombre de categoría valido.';
                        nombreErrorA.style.display = 'block';
                        isValid = false;
                    }else{
                        nombreErrorA.textContent = '';
                        nombreErrorA.style.display = 'none';
                    }
            
            
                    var descripcionA = document.getElementById('descripcioneditar').value;
                    var descripcionErrorA = document.getElementById('descripcionErrorA');
                    var expresiondesA = /^[A-Z](?:[a-zA-Z0-9,.áéíóúüñ]+(?:\s[a-zA-Z0-9,.áéíóúüñ]+)*)?$/;
            
                    if (!expresiondesA.test(descripcionA)){
                        descripcionErrorA.textContent = 'Por favor ingresa una descripción correcta, no debe contener multiples espacios.';
                        descripcionErrorA.style.display = 'block';
                        isValid = false;
                    }else{
                        descripcionErrorA.textContent = '';
                        descripcionErrorA.style.display = 'none';
                    }
            
                    return isValid
                        
            
                }


                // FUNCION PARA EL PAGINADO Y BUSQUEDA

                document.getElementById('search-input').addEventListener('input', function () {
                    const searchTerm = this.value.trim();
                    const page = 1; 
                    const perPage = 6; 
                    const url = `/consulta_categorias?page=${page}&per_page=${perPage}&search=${encodeURIComponent(searchTerm)}`;
            
                    fetch(url)
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
            
                            document.querySelector('#category-table-body').innerHTML = doc.querySelector('#category-table-body').innerHTML;
            
                            document.querySelector('.pagination').innerHTML = doc.querySelector('.pagination').innerHTML;
            
                            const noMatchesDiv = document.getElementById('noMatches');
                            const rows = document.querySelectorAll('#category-table-body tr');
                            if (rows.length === 0) {
                                noMatchesDiv.style.display = 'block';
                                noMatchesDiv.textContent = `No se encontraron coincidencias para: "${searchTerm}"`;
                            } else {
                                noMatchesDiv.style.display = 'none';
                            }
                        })
                        .catch(error => console.error('Error al realizar la búsqueda:', error));
                });

                document.addEventListener("DOMContentLoaded", function () {
                    const rutaActual = window.location.pathname; 
                    const iconoEntradas = document.getElementById("icon-categorias");
                    
                    if (rutaActual === "/consulta_categorias") {
                      iconoEntradas.classList.add("active");
                    }
                  });

                  document.addEventListener("DOMContentLoaded", function() {
                    const tabla = document.getElementById("Tabla");
                    tabla.classList.add("visible");
                });   