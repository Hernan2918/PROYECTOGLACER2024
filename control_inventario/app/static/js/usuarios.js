
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
                    // Obtén el valor del input sin eliminar los espacios al inicio y al final
                    var value = $(this).val();
                    var noMatch = true;
            
                    // Si el input está vacío, muestra todas las filas y oculta el mensaje de "sin coincidencias"
                    if (value === "") {
                        $("#tabla_productos tbody tr").show();
                        $("#noMatches").hide();
                        return;
                    }
            
                    // Si el input contiene solo espacios, oculta todas las filas y muestra el mensaje "sin coincidencias"
                    if (value.trim() === "") {
                        $("#tabla_productos tbody tr").hide();
                        $("#noMatches").show();
                        return;
                    }
            
                    // Filtra las filas en función del texto ingresado
                    $("#tabla_productos tbody tr").filter(function() {
                        var match = $(this).text().toLowerCase().indexOf(value.trim().toLowerCase()) > -1;
                        $(this).toggle(match);
                        if (match) noMatch = false;
                    });
            
                    // Muestra el mensaje si no hubo coincidencias; oculta si las hubo
                    if (noMatch) {
                        $("#noMatches").show();
                    } else {
                        $("#noMatches").hide();
                    }
                });
            });
            
            
