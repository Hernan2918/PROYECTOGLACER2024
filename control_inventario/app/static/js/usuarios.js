
document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('home-link');
    const subcategories = document.getElementById('subcategories');
    // const pisosLink = document.getElementById('pisos-link');
    // const subcategoriasPisos = document.querySelector('.subcategorias_pisos');
    // const adLink = document.getElementById('ad-link');
    // const subcategoriasAd = document.querySelector('.subcategorias_ad');
    // const murosLink = document.getElementById('muros-link');
    // const subcategoriasMuros = document.querySelector('.subcategorias_muros');

    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        subcategories.style.display = subcategories.style.display === "block" ? "none" : "block";
    });

    // pisosLink.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     const isVisible = subcategoriasPisos.style.display === 'block';
    //     subcategoriasPisos.style.display = isVisible ? 'none' : 'block';
    //     subcategoriasAd.style.display = 'none'; 
    //     subcategoriasMuros.style.display = 'none'; 
    // });

    // murosLink.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     const isVisible = subcategoriasMuros.style.display === 'block';
    //     subcategoriasMuros.style.display = isVisible ? 'none' : 'block';
    //     subcategoriasPisos.style.display = 'none'; 
    //     subcategoriasAd.style.display = 'none'; 
    // });

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
          var modal = new bootstrap.Modal(document.getElementById('modalRegistroUsrs'));
          modal.show();
        }
        document.getElementById('registroUsuario').addEventListener('click', function() {
          abrirModalRegistro();
        });
    
        

        


        
            document.addEventListener('DOMContentLoaded', function() {
                var eliminarModal = document.getElementById('eliminarU');
                eliminarModal.addEventListener('show.bs.modal', function (event) {
                    var button = event.relatedTarget;
                    var productoId = button.getAttribute('data-id');
                    var formEliminar = document.getElementById('formEliminar');
                    formEliminar.action = '/eliminar_usuario/' + productoId;
                });
            });
            

           


            $(document).ready(function(){
                $("#buscarproducto").on("keyup", function() {
                    var value = $(this).val();
                    var noMatch = true;
            
                    if (value === "") {
                        $("#tabla_productos tbody tr").show();
                        $("#noMatches").hide();
                        return;
                    }
            
                    if (value.trim() === "") {
                        $("#tabla_productos tbody tr").hide();
                        $("#noMatches").show();
                        return;
                    }
            
                    $("#tabla_productos tbody tr").filter(function() {
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
            
            

            document.addEventListener("DOMContentLoaded", function () {
                const rutaActual = window.location.pathname; 
                const iconoEntradas = document.getElementById("icon-usuarios");
                
                if (rutaActual === "/consulta_usuarios") {
                  iconoEntradas.classList.add("active");
                }
              });  


              document.addEventListener("DOMContentLoaded", function() {
                const tabla = document.getElementById("TablaProductos");
                tabla.classList.add("visible");
            });   






            document.getElementById('search-input').addEventListener('input', function () {
                const searchTerm = this.value.trim();
                const page = 1; 
                const perPage = 6; 
                const url = `/consulta_usuarios?page=${page}&per_page=${perPage}&search=${encodeURIComponent(searchTerm)}`;
            
                fetch(url)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const newTableBody = doc.querySelector('#product-table-body').innerHTML;
                        const newPagination = doc.querySelector('.pagination').innerHTML;
            
            
                        document.querySelector('#product-table-body').innerHTML = newTableBody;
                        document.querySelector('.pagination').innerHTML = newPagination;
            
                        const noMatchesDiv = document.getElementById('noMatches');
                        const tableBody = document.querySelector('#product-table-body');
                        if (tableBody.children.length === 0) {
                            noMatchesDiv.style.display = 'block';
                            noMatchesDiv.textContent = `No se encontraron coincidencias para: "${searchTerm}"`;
                        } else {
                            noMatchesDiv.style.display = 'none';
                        }
                    })
                    .catch(error => console.error('Error al realizar la búsqueda:', error));
            });
            