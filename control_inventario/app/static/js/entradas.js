function abrirModalRegistro() {
  var modal = new bootstrap.Modal(document.getElementById('modalRegistroEntradas'));
  modal.show();
}
document.getElementById('btnentradas').addEventListener('click', function() {
  abrirModalRegistro();
});