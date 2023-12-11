function mensajes()
{
	GLOBAL.showOpcionesDisponibles();

  chrome.storage.sync.get({
    historialMensajes: true
  }, function(items) {
    if(items.historialMensajes)
      mensajes_process();
  });
}

function mensajes_process() {
    document.querySelector("#form_jugador").addEventListener("submit", function (event) {
        event.preventDefault();
        var errorLabels = document.querySelectorAll("#form_jugador label.error:visible");
        if (errorLabels.length === 0) {
            var id = document.querySelector("#form_jugador #destino").value;
            var msj = "Mensaje enviado al imperio #" + id + "\n--------------------------------------\n";
            msj += cleanText(document.querySelector("#form_jugador #mensaje").value);
            msj += "\n--------------------------------------\n";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "mensajes.php", false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send("accion=enviarmensajejugador&destino=" + LOCAL.getImperio().idImperio + "&mensaje=" + encodeURIComponent(msj));
        }
    });
    document.querySelector("#form_clan").addEventListener("submit", function (event) {
        event.preventDefault();
        if (!LOCAL.getOpcion("mensajes")) {
            return;
        }
        var errorLabels = document.querySelectorAll("#form_clan label.error:visible");
        if (errorLabels.length === 0) {
            var id = document.querySelector("#form_clan #destinoclan").value;
            var msj = "Mensaje enviado al clan " + id + "\n--------------------------------------\n";
            msj += cleanText(document.querySelector("#form_clan #mensaje").value);
            msj += "\n--------------------------------------\n";

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "mensajes.php", false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send("accion=enviarmensajejugador&destino=" + LOCAL.getImperio().idImperio + "&mensaje=" + encodeURIComponent(msj));
        }
    });
}


var cleanText = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );

  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }
      return ret.join( '' );
  }

})();
