document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.trim();
    const page = 1; 
    const perPage = 6; 
    const url = `/consulta_productos?page=${page}&per_page=${perPage}&search=${encodeURIComponent(searchTerm)}`;

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









