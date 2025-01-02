
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
          var modal = new bootstrap.Modal(document.getElementById('modalRegistroPor'));
          modal.show();
        }
        document.getElementById('registroProducto').addEventListener('click', function() {
          abrirModalRegistro();
        });
    


    
        document.addEventListener('DOMContentLoaded', function() {
            var editarProductoModal = document.getElementById('editarModalProductoMuros');
            editarProductoModal.addEventListener('show.bs.modal', function(event) {
                var button = event.relatedTarget;
                var id = button.getAttribute('data-id');
                var medida = button.getAttribute('data-medidas');
                var proveedor = button.getAttribute('data-proveedor');
                var producto = button.getAttribute('data-producto');
                var calidad = button.getAttribute('data-calidad');
                var existencias = button.getAttribute('data-existencias');
                var rotas = button.getAttribute('data-rotas');
                var precio = button.getAttribute('data-precio');
                var embalaje = button.getAttribute('data-embalaje');
                var ubicacion = button.getAttribute('data-ubicacion');
                var categoria = button.getAttribute('data-categoria');
        
                var inputId = editarProductoModal.querySelector('#editarproductoId');
                var inputMedida = editarProductoModal.querySelector('#medidaeditar');
                var inputProveedor = editarProductoModal.querySelector('#proveedoreditar');
                var inputproducto = editarProductoModal.querySelector('#productoeditar');
                var inputCalidad = editarProductoModal.querySelector('#calidadeditar');
                var inputExistencias = editarProductoModal.querySelector('#existenciaeditar');
                var inputRotas = editarProductoModal.querySelector('#rotaseditar');
                var inputPrecio = editarProductoModal.querySelector('#precioeditar');
                var inputEmbalaje = editarProductoModal.querySelector('#embalajeeditar');
                var inputUbicacion = editarProductoModal.querySelector('#ubicacioneditar');
                var inputCategoria = editarProductoModal.querySelector('#categoriaeditar');
        
                inputId.value = id;
                inputMedida.value = medida;
                inputproducto.value= producto;
                inputCalidad.value = calidad;
                inputExistencias.value = existencias;
                inputRotas.value = rotas;
                inputPrecio.value=precio;
                inputEmbalaje.value = embalaje;
                inputUbicacion.value = ubicacion;
                
                Array.from(inputProveedor.options).forEach(option => {
                    option.selected = option.value === proveedor;
                });
        
                Array.from(inputCategoria.options).forEach(option => {
                    option.selected = option.value === categoria;
                });
            });
        });
        


        
            document.addEventListener('DOMContentLoaded', function() {
                var eliminarModal = document.getElementById('eliminarM');
                eliminarModal.addEventListener('show.bs.modal', function (event) {
                    var button = event.relatedTarget;
                    var productoId = button.getAttribute('data-id');
                    var formEliminar = document.getElementById('formEliminar');
                    formEliminar.action = '/eliminar_muros/' + productoId;
                });
            });


            
            
                
                

                document.getElementById('Descargar').addEventListener('click', async function() {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();
                
                    // Agregar el logo
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
                
                        const response = await fetch('/obtener_todos_muros');
                        const productos = await response.json();
                
                        const rows = productos.map(producto => [
                            producto.medidas,
                            producto.proveedor_nombre,
                            producto.producto,
                            producto.calidad,
                            producto.existencias,
                            producto.rotas,
                            producto.precio,
                            producto.embalaje,
                            producto.ubicacion,
                            producto.categoria_nombre
                        ]);
                
                        doc.setFontSize(13);
                        doc.text('PRODUCTOS', 105, 15, { align: 'center' });
                        doc.setFontSize(10);
                        doc.text('DEPARTAMENTO: MUROS', 105, 23, { align: 'center' });
                        doc.setFontSize(13);
                        doc.text('GLACER Glamur Cerámico', 195, 15, { align: 'right' });
                        doc.setTextColor(220, 0, 0);
                        doc.text('Atlacomulco Vías', 195, 23, { align: 'right' });
                
                        doc.autoTable({
                            head: [['Medida', 'Proveedor', 'Nombre', 'Calidad', 'Existencia', 'Rotas', 'Precio', 'Embalaje', 'Ubicacion', 'Categoria']],
                            body: rows,
                            theme: 'grid',
                            styles: { halign: 'center' },
                            headStyles: { fillColor: [220, 0, 0] }, // Color verde
                            startY: 30 
                        });
            
                        doc.save('tabla_muros.pdf');
                    } else {
                        console.error("No se pudo cargar la imagen correctamente.");
                    }
                });
                

                document.getElementById("buscar").addEventListener("click", function() {
                    document.getElementById("buscarproducto").focus();
                });





                // FUNCION PARA LA VALIDACION DEL RESGISTRO DE FORMULARIO

                function validarFormularioproducto() {
                    var isValid = true;
                
                    var medida = document.getElementById('medida').value;
                    var medidaError = document.getElementById('medidaError');
                    var expresionme = /^\d{2}x\d{2,3}$/;
            
            
                     if (!expresionme.test(medida)) {
                        medidaError.textContent = 'Por favor, ingresa una medida valida, ejemplo 30x60.';
                        medidaError.style.display = 'block';
                        isValid = false;
                    } else {
                        medidaError.textContent = '';
                        medidaError.style.display = 'none';
                    }
            
                    var producto = document.getElementById('producto').value;
                    var productoError = document.getElementById('productoError');
                    var expresionpro = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(?:\s[A-Za-záéíóúüñ]+)*$/;
            
                     if (!expresionpro.test(producto)) {
                        productoError.textContent = 'Por favor, ingresa un nombre valido. Sin espacios.';
                        productoError.style.display = 'block';
                        isValid = false;
                    } else {
                        productoError.textContent = '';
                        productoError.style.display = 'none';
                    }
            
                    var calidad = document.getElementById('calidad').value;
                    var calidadError = document.getElementById('calidadError');
                    var expresioncal = /^[0-9]+[a-z]{2,3}$/;
            
                     if (!expresioncal.test(calidad)) {
                        calidadError.textContent = 'Por favor, ingresa una calidad correcta, primero un numero seguido de la abreviatura de ese número.';
                        calidadError.style.display = 'block';
                        isValid = false;
                    } else {
                        calidadError.textContent = '';
                        calidadError.style.display = 'none';
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
                    var expresionpre = /^\$[0-9]{1,10}$|^\$[0-9]{1,10} m2$/;
            
                     if (!expresionpre.test(precio)) {
                        precioError.textContent = 'Por favor, ingresa un precio iniciando con el símbolo $ y terminando con los m2.';
                        precioError.style.display = 'block';
                        isValid = false;
                    } else {
                        precioError.textContent = '';
                        precioError.style.display = 'none';
                    }
            
                    var embalaje = document.getElementById('embalaje').value;
                    var embalajeError = document.getElementById('embalajeError');
                    var expresionemb = /^[0-9]*\.?[0-9]+ CJ$/;
            
                     if (!expresionemb.test(embalaje)) {
                        embalajeError.textContent = 'Por favor, ingresa un número decimal seguido de "CJ". Sin espacios.';
                        embalajeError.style.display = 'block';
                        isValid = false;
                    } else {
                        embalajeError.textContent = '';
                        embalajeError.style.display = 'none';
                    }
            
            
                    var ubicacion = document.getElementById('ubicacion').value;
                    var ubicacionError = document.getElementById('ubicacionError');
                    var expresionubi = /^[A-Z](?:[a-zA-Z0-9áéíóúüñ]+(?:\s[a-zA-Z0-9áéíóúüñ]+)*)?$/;
            
                     if (!expresionubi.test(ubicacion)) {
                        ubicacionError.textContent = 'Por favor, ingresa la ubicación del producto. Sin múltiples espacios.';
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
                



                // FUNCION PARA LA VALIDACION DEL FORMULARIO DE ACTUALIZAR 


                function validarFormularioproductoAct() {
                    var isValid = true;
                
                    var medidaA = document.getElementById('medidaeditar').value;
                    var medidaErrorA = document.getElementById('medidaErrorA');
                    var expresionmeA = /^\d{2}x\d{2,3}$/;
            
            
                     if (!expresionmeA.test(medidaA)) {
                        medidaErrorA.textContent = 'Por favor, ingresa una medida valida, ejemplo 30x60.';
                        medidaErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        medidaErrorA.textContent = '';
                        medidaErrorA.style.display = 'none';
                    }
            
                    var productoA = document.getElementById('productoeditar').value;
                    var productoErrorA = document.getElementById('productoErrorA');
                    var expresionproA = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(?:\s[A-Za-záéíóúüñ]+)*$/;
            
                     if (!expresionproA.test(productoA)) {
                        productoErrorA.textContent = 'Por favor, ingresa un nombre valido. Sin espacios.';
                        productoErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        productoErrorA.textContent = '';
                        productoErrorA.style.display = 'none';
                    }
            
                    var calidadA = document.getElementById('calidadeditar').value;
                    var calidadErrorA = document.getElementById('calidadErrorA');
                    var expresioncalA = /^[0-9]+[a-z]{2,3}$/;
            
                     if (!expresioncalA.test(calidadA)) {
                        calidadErrorA.textContent = 'Por favor, ingresa una calidad correcta, primero un numero seguido de la abreviatura de ese número.';
                        calidadErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        calidadErrorA.textContent = '';
                        calidadErrorA.style.display = 'none';
                    }
            
                    var existenciaA = document.getElementById('existenciaeditar').value;
                    var existenciaErrorA = document.getElementById('existenciaErrorA');
                    var expresionexiA = /^[0-9]{1,10}$/;
            
                     if (!expresionexiA.test(existenciaA)) {
                        existenciaErrorA.textContent = 'Por favor, ingresa un número. Sin espacios.';
                        existenciaErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        existenciaErrorA.textContent = '';
                        existenciaErrorA.style.display = 'none';
                    }
            
                    var rotasA = document.getElementById('rotaseditar').value;
                    var rotasErrorA = document.getElementById('rotasErrorA');
                    var expresionerotA = /^[0-9]{1,10}$/;
            
                     if (!expresionerotA.test(rotasA)) {
                        rotasErrorA.textContent = 'Por favor, ingresa un número. Sin espacios.';
                        rotasErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        rotasErrorA.textContent = '';
                        rotasErrorA.style.display = 'none';
                    }
            
            
                    var precioA = document.getElementById('precioeditar').value;
                    var precioErrorA = document.getElementById('precioErrorA');
                    var expresionpreA = /^\$[0-9]{1,10}$|^\$[0-9]{1,10} m2$/;
            
                     if (!expresionpreA.test(precioA)) {
                        precioErrorA.textContent = 'Por favor, ingresa un precio iniciando con el símbolo $ y terminando con los m2.';
                        precioErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        precioErrorA.textContent = '';
                        precioErrorA.style.display = 'none';
                    }
            
                    var embalajeA = document.getElementById('embalajeeditar').value;
                    var embalajeErrorA = document.getElementById('embalajeErrorA');
                    var expresionembA = /^[0-9]*\.?[0-9]+ CJ$/;
            
                     if (!expresionembA.test(embalajeA)) {
                        embalajeErrorA.textContent = 'Por favor, ingresa un número decimal seguido de "CJ". Sin espacios.';
                        embalajeErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        embalajeErrorA.textContent = '';
                        embalajeErrorA.style.display = 'none';
                    }
            
            
                    var ubicacionA = document.getElementById('ubicacioneditar').value;
                    var ubicacionErrorA = document.getElementById('ubicacionErrorA');
                    var expresionubiA = /^[A-Z](?:[a-zA-Z0-9áéíóúüñ]+(?:\s[a-zA-Z0-9áéíóúüñ]+)*)?$/;
            
                     if (!expresionubiA.test(ubicacionA)) {
                        ubicacionErrorA.textContent = 'Por favor, ingresa la ubicación del producto. Sin múltiples espacios.';
                        ubicacionErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        ubicacionErrorA.textContent = '';
                        ubicacionErrorA.style.display = 'none';
                    }
            
            
            
                    var proveedorA = document.getElementById('proveedoreseditar').value;
                    var proveedorErrorA = document.getElementById('proveedoresErrorA');
                    if (proveedorA === "") {
                        proveedorErrorA.textContent = 'Por favor, selecciona un proveedor.';
                        proveedorErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        proveedorErrorA.textContent = '';
                        proveedorErrorA.style.display = 'none';
                    }
            
            
                    var categoriasA = document.getElementById('categoriaseditar').value;
                    var categoriasErrorA = document.getElementById('categoriasErrorA');
                    if (categoriasA === "") {
                        categoriasErrorA.textContent = 'Por favor, selecciona una categoría.';
                        categoriasErrorA.style.display = 'block';
                        isValid = false;
                    } else {
                        categoriasErrorA.textContent = '';
                        categoriasErrorA.style.display = 'none';
                    }
                    return isValid;
                }


                // SECCION DE PAGIANCION Y BUSQUEDA

                document.getElementById('search-input').addEventListener('input', function () {
                    const searchTerm = this.value.trim();
                    const page = 1; 
                    const perPage = 6; 
                    const url = `/consulta_muros?page=${page}&per_page=${perPage}&search=${encodeURIComponent(searchTerm)}`;
                
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
                            const tableRows = document.querySelectorAll('#product-table-body tr');

                            if (tableRows.length === 0) {
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
                    // Añade la clase "visible" a la tabla para activar la transición
                    const tabla = document.getElementById("TablaProductos");
                    tabla.classList.add("visible");
                });