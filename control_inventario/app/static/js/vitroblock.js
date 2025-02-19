
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
          var modal = new bootstrap.Modal(document.getElementById('modalRegistroVitroblock'));
          modal.show();
        }
        document.getElementById('registroProducto').addEventListener('click', function() {
          abrirModalRegistro();
        });
    


    
        document.addEventListener('DOMContentLoaded', function() {
            var editarProductoModal = document.getElementById('editarModalProductoVitroblock');
            editarProductoModal.addEventListener('show.bs.modal', function(event) {
                var button = event.relatedTarget;
                
                var id = button.getAttribute('data-id');
                var proveedor = button.getAttribute('data-proveedor');
                var tipo = button.getAttribute('data-tipo');
                var medidas = button.getAttribute('data-medidas');
                var nombre = button.getAttribute('data-nombre');
                var existencias = button.getAttribute('data-existencias');
                var rotas = button.getAttribute('data-rotas');
                var precio = button.getAttribute('data-precio');
                var ubicacion = button.getAttribute('data-ubicacion');
                var categoria = button.getAttribute('data-categoria');
        
                var inputId = editarProductoModal.querySelector('#editarproductoId');
                var inputTipo = editarProductoModal.querySelector('#tipoeditar');
                var inputMedidas = editarProductoModal.querySelector('#medidaseditar');
                var inputNombre = editarProductoModal.querySelector('#nombreeditar');
                var inputExistencias = editarProductoModal.querySelector('#existenciaeditar');
                var inputRotas = editarProductoModal.querySelector('#rotaseditar');
                var inputPrecio = editarProductoModal.querySelector('#precioeditar');
                var inputUbicacion = editarProductoModal.querySelector('#ubicacioneditar');
                
                inputId.value = id;
                inputTipo.value = tipo;
                inputMedidas.value = medidas;
                inputNombre.value = nombre;
                inputExistencias.value = existencias;
                inputRotas.value = rotas;
                inputPrecio.value = precio;
                inputUbicacion.value = ubicacion;
                

                console.log('proveedor', proveedor),
                console.log('categoria', categoria)
                var inputProveedor = editarProductoModal.querySelector('#proveedoreseditar');
                Array.from(inputProveedor.options).forEach(option => {
                    option.selected = (option.value == proveedor);
                });
                
                var inputCategoria = editarProductoModal.querySelector('#categoriaseditar');
                Array.from(inputCategoria.options).forEach(option => {
                    option.selected = (option.value == categoria);
                });
            });
        });
        
        
        document.addEventListener('DOMContentLoaded', function() {
            var eliminarModal = document.getElementById('eliminarVitroblocks');
            eliminarModal.addEventListener('show.bs.modal', function (event) {
                var button = event.relatedTarget;
                var productoId = button.getAttribute('data-id');
                var formEliminar = document.getElementById('formEliminar');
                formEliminar.action = '/eliminar_vitroblocks/' + productoId;
            });
        });
        

                document.getElementById('Descargar').addEventListener('click', async function() {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();
                
                    const imgUrl1 = '/static/img/logov.jpeg';
                
                    async function getBase64ImageFromUrl(url) {
                        try {
                            const res = await fetch(url);
                            if (!res.ok) {
                                console.error('Error en la respuesta:', res.status, res.statusText);
                                throw new Error('Error al cargar la imagen');
                            }
                            const blob = await res.blob();
                            const reader = new FileReader();
                
                            return new Promise((resolve, reject) => {
                                reader.onloadend = () => resolve(reader.result); 
                                reader.onerror = reject; 
                                reader.readAsDataURL(blob);
                            });
                        } catch (error) {
                            console.error('Error al cargar la imagen:', error);
                            return null;
                        }
                    }
                
                    const imgData1 = await getBase64ImageFromUrl(imgUrl1);
                
                    if (imgData1) {
                        doc.addImage(imgData1, 'JPEG', 13, 6, 20, 20); 
                
                        const response = await fetch('/obtener_todos_vitroblocks');
                        const productos = await response.json();
                
                        const rows = productos.map(producto => [
                            producto.proveedor_nombre,
                            producto.tipo,
                            producto.medidas,
                            producto.nombre,
                            producto.existencias,
                            producto.rotas,
                            producto.precio,
                            producto.ubicacion,
                            producto.categoria_nombre
                        ]);
                
                        doc.setFontSize(13);
                        doc.text('PRODUCTOS', 105, 15, { align: 'center' });
                        doc.setFontSize(10);
                        doc.text('DEPARTAMENTO: VITROBLOCKS', 105, 23, { align: 'center' });
                        doc.setFontSize(13);
                        doc.text('GLACER Glamur Cerámico', 195, 15, { align: 'right' });
                        doc.setTextColor(220, 0, 0);
                        doc.text('Atlacomulco Vías', 195, 23, { align: 'right' });
                
                        doc.autoTable({
                            head: [['Proveedor', 'Tipo', 'Medidas', 'Nombre', 'Existencia', 'Rotas', 'Precio', 'Ubicación', 'Categoría']],
                            body: rows,
                            theme: 'grid',
                            styles: { halign: 'center', fontSize: 7 },
                            headStyles: { fillColor: [220, 0, 0] }, 
                            startY: 30 
                        });
                
                        doc.save('tabla_vitroblocks.pdf');
                    } else {
                        console.error("No se pudo cargar la imagen correctamente.");
                    }
                });
                
                document.getElementById("buscar").addEventListener("click", function() {
                    document.getElementById("buscarproducto").focus();
                });
                

                // SECCION DE VALIDACION DE FORMULARIO DE REGISTRO 

                function validarFormularioproducto() {
                    var isValid = true;
                
                    var medida = document.getElementById('medidas').value;
                    var medidaError = document.getElementById('medidasError');
                    var expresionme = /^\d{2,3}x\d{2,3}x\d{2,3}$/;


                    if (!expresionme.test(medida)) {
                        medidaError.textContent = 'Por favor, ingresa una medida valida, ejemplo 19x10x08.';
                        medidaError.style.display = 'block';
                        isValid = false;
                    } else {
                        medidaError.textContent = '';
                        medidaError.style.display = 'none';
                    }

                    var producto = document.getElementById('nombre').value;
                    var productoError = document.getElementById('nombreError');
                    var expresionpro = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(?:\s[A-Za-záéíóúüñ]+)*$/;

                    if (!expresionpro.test(producto)) {
                        productoError.textContent = 'Por favor, ingresa un nombre valido. Sin espacios.';
                        productoError.style.display = 'block';
                        isValid = false;
                    } else {
                        productoError.textContent = '';
                        productoError.style.display = 'none';
                    }

                    

                    var existencia = document.getElementById('existencia').value;
                    var existenciaError = document.getElementById('existenciaError');
                    var expresionexi = /^[0-9]{1,10}$/;

                    if (!expresionexi.test(existencia)) {
                        existenciaError.textContent = 'Por favor, ingresa un número. Sin espacios.';
                        existenciaError.style.display = 'block';
                        isValid = false;
                    } else {
                        existenciaError.textContent = '';
                        existenciaError.style.display = 'none';
                    }

                    var rotas = document.getElementById('rotas').value;
                    var rotasError = document.getElementById('rotasError');
                    var expresionerot = /^[0-9]{1,10}$/;

                    if (!expresionerot.test(rotas)) {
                        rotasError.textContent = 'Por favor, ingresa un número. Sin espacios.';
                        rotasError.style.display = 'block';
                        isValid = false;
                    } else {
                        rotasError.textContent = '';
                        rotasError.style.display = 'none';
                    }


                    var precio = document.getElementById('precio').value;
                    var precioError = document.getElementById('precioError');
                    var expresionpre = /^\$[0-9]{1,10}$/;

                    if (!expresionpre.test(precio)) {
                        precioError.textContent = 'Por favor, ingresa un precio iniciando con el símbolo $. Sin espacios.';
                        precioError.style.display = 'block';
                        isValid = false;
                    } else {
                        precioError.textContent = '';
                        precioError.style.display = 'none';
                    }


                    var ubicacion = document.getElementById('ubicacion').value;
                    var ubicacionError = document.getElementById('ubicacionError');
                    var expresionubi = /^[A-Z](?:[a-zA-Z0-9áéíóúüñ]+(?:\s[a-zA-Z0-9áéíóúüñ]+)*)?$/;

                    if (!expresionubi.test(ubicacion)) {
                        ubicacionError.textContent = 'Por favor, ingresa un número decimal seguido de "CJ". Sin espacios.';
                        ubicacionError.style.display = 'block';
                        isValid = false;
                    } else {
                        ubicacionError.textContent = '';
                        ubicacionError.style.display = 'none';
                    }


                    var proveedor = document.getElementById('proveedores').value;
                    var proveedorError = document.getElementById('proveedoresError');
                    if (proveedor === "") {
                        proveedorError.textContent = 'Por favor, selecciona un proveedor.';
                        proveedorError.style.display = 'block';
                        isValid = false;
                    } else {
                        proveedorError.textContent = '';
                        proveedorError.style.display = 'none';
                    }


                    var tipo = document.getElementById('tipo').value;
                    var tipoError = document.getElementById('tiposError');
                    if (tipo === "") {
                        tipoError.textContent = 'Por favor, selecciona un tipo de vitroblock.';
                        tipoError.style.display = 'block';
                        isValid = false;
                    } else {
                        tipoError.textContent = '';
                        tipoError.style.display = 'none';
                    }


                    var categorias = document.getElementById('categorias').value;
                    var categoriasError = document.getElementById('categoriasError');
                    if (categorias === "") {
                        categoriasError.textContent = 'Por favor, selecciona una categoría.';
                        categoriasError.style.display = 'block';
                        isValid = false;
                    } else {
                        categoriasError.textContent = '';
                        categoriasError.style.display = 'none';
                    }


                    return isValid;
                }


                // SECCION DE PAGINACION Y BUSQUEDA


                document.getElementById('search-input').addEventListener('input', function () {
                    const searchTerm = this.value.trim();
                    const page = 1; 
                    const perPage = 6; 
                    const url = `/consulta_vitroblocks?page=${page}&per_page=${perPage}&search=${encodeURIComponent(searchTerm)}`;
                
                    fetch(url)
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                
                            document.querySelector('#product-table-body').innerHTML = doc.querySelector('#product-table-body').innerHTML;
                
                            document.querySelector('.pagination').innerHTML = doc.querySelector('.pagination').innerHTML;
                
                            const noMatchesDiv = document.getElementById('noMatches');
                            const rows = document.querySelectorAll('#product-table-body tr');
                            if (rows.length === 0) {
                                noMatchesDiv.style.display = 'block';
                                noMatchesDiv.textContent = `No se encontraron coincidencias para: "${searchTerm}"`;
                            } else {
                                noMatchesDiv.style.display = 'none';
                            }
                        })
                        .catch(error => console.error('Error al realizar la búsqueda:', error));
                });


                // ESTILOS DE ICON
                
                document.addEventListener("DOMContentLoaded", function () {
                    const rutaActual = window.location.pathname; 
                    const menuIcon = document.getElementById("menu-icon");
                    const menuLinks = document.querySelectorAll(".menu-item"); 
                
                    menuLinks.forEach(link => {
                        link.addEventListener("click", function () {
                            menuIcon.classList.add("active");
                        });
                    });
                
                    const rutasValidas = [
                        "/consulta_productos",
                        "/consulta_muros",
                        "/consulta_adhesivos",
                        "/consulta_sanitarios",
                        "/consulta_tinacos",
                        "/consulta_vitroblocks"
                    ];
                
                    if (rutasValidas.includes(rutaActual)) {
                        menuIcon.classList.add("active");
                    }
                });
                

                document.addEventListener("DOMContentLoaded", function() {
                    const tabla = document.getElementById("TablaProductos");
                    tabla.classList.add("visible");
                });   

                    