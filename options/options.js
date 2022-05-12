function saveOptions(option) {
  chrome.storage.sync.set({
		construcciones: document.getElementById('opt_construcciones').checked,
    historialMensajes: document.getElementById('opt_historialMensajes').checked
  }, function(items) {
    var status = document.getElementById('message');
    status.style.display = ''
    setTimeout(function() {
      status.style.display = 'none';
    }, 2 * 1000);
  });
}

function getOptions() {
	chrome.storage.sync.get({
    construcciones: true,
    historialMensajes: true
  }, function(items) {
    document.getElementById('opt_historialMensajes').checked = items.historialMensajes;
    document.getElementById('opt_construcciones').checked = items.construcciones;
  });
}

function restoreOptions() {
  getOptions();

  document.getElementById('opt_historialMensajes').addEventListener('click', saveOptions);
	document.getElementById('opt_construcciones').addEventListener('click', saveOptions);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
