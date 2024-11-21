// Variables globales
let currentPage = 1;
const recordsPerPage = 6;
let filteredRecords = [];

// Obtener los registros de la tabla
const tableRows = document.querySelectorAll('#product-table-body tr');
const tableContainer = document.querySelector('.table-container');
const noResultsMessage = document.getElementById('noMatches');
const tableBody = document.getElementById('product-table-body');

// Función para mostrar los registros según la página
function showPage(page) {
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    const recordsToDisplay = filteredRecords.length > 0 ? filteredRecords : Array.from(tableRows);

    recordsToDisplay.forEach((row, index) => {
        row.style.display = index >= startIndex && index < endIndex ? '' : 'none';
    });

    updatePagination(recordsToDisplay);
}

// Función para actualizar los números de la paginación
function updatePagination(recordsToDisplay) {
    const totalPages = Math.ceil(recordsToDisplay.length / recordsPerPage);
    const paginationNumbers = document.getElementById('pagination-numbers');
    paginationNumbers.innerHTML = ''; // Limpiar números anteriores

    // Agregar el botón de la primera página si es necesario
    if (currentPage > 2) {
        addPageButton(1);
        if (currentPage > 3) {
            addEllipsis();
        }
    }

    // Mostrar las páginas alrededor de la página actual
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        addPageButton(i, i === currentPage);
    }

    // Agregar el botón de la última página si es necesario
    if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
            addEllipsis();
        }
        addPageButton(totalPages);
    }
}

function addPageButton(pageNumber, isActive = false) {
    const pageButton = document.createElement('span');
    pageButton.textContent = pageNumber;
    pageButton.classList.add('pagination-number');
    if (isActive) {
        pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
        currentPage = pageNumber;
        showPage(currentPage);
    });
    const paginationNumbers = document.getElementById('pagination-numbers');
    paginationNumbers.appendChild(pageButton);
}

function addEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    ellipsis.classList.add('ellipsis');
    const paginationNumbers = document.getElementById('pagination-numbers');
    paginationNumbers.appendChild(ellipsis);
}

// Función para avanzar de página
function nextPage() {
    const recordsToDisplay = filteredRecords.length > 0 ? filteredRecords : Array.from(tableRows);
    if (currentPage < Math.ceil(recordsToDisplay.length / recordsPerPage)) {
        currentPage++;
        showPage(currentPage);
    }
}

// Función para retroceder de página
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

// Configurar los botones de avanzar y retroceder
document.getElementById('Pagina_sig').addEventListener('click', nextPage);
document.getElementById('prev-page').addEventListener('click', prevPage);

// Función para realizar la búsqueda
document.getElementById('search-input').addEventListener('input', function () {
    const input = document.getElementById('search-input').value.trim();
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]*$/;

    if (!regex.test(input) && input !== "") {
        noResultsMessage.textContent = "Entrada no válida";
        noResultsMessage.style.display = 'block';
        filteredRecords = [];
        updatePagination([]);
        showPage(1);
        tableBody.style.display = 'none';
        return;
    } else {
        noResultsMessage.style.display = 'none';
    }

    filteredRecords = [];
    tableRows.forEach((row) => {
        const columns = row.getElementsByTagName('td');
        const matchFound = Array.from(columns).some((col) =>
            col.textContent.toLowerCase().includes(input.toLowerCase())
        );

        if (matchFound) {
            filteredRecords.push(row);
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    if (filteredRecords.length === 0) {
        noResultsMessage.textContent = `No hay coincidencias de: ${input}`;
        noResultsMessage.style.display = 'block';
        tableBody.style.display = 'none';
    } else {
        noResultsMessage.style.display = 'none';
        tableBody.style.display = 'table-row-group';
    }

    currentPage = 1;
    showPage(currentPage);
});

// Inicializar la primera página
showPage(currentPage);
