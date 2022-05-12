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

function mensajes_process()
{
	$("#form_jugador").submit(function(){

			if($("#form_jugador label.error:visible").length == 0)
			{
				var id = $("#form_jugador #destino").val();
				var msj = "Mensaje enviado al imperio #" + id
				msj += "\n--------------------------------------\n"
				msj += cleanText($("#form_jugador #mensaje").val());
				msj += "\n--------------------------------------\n"

				$.ajax({
					method: "POST",
					url: "mensajes.php",
					async: false,
					data: "accion=enviarmensajejugador&destino=" + LOCAL.getImperio().idImperio + "&mensaje=" + msj,
					error: function(xmlHttpRequest, textStatus, errorThrown){
						console.log(xmlHttpRequest);
					}
				});
			}
	});

	$("#form_clan").submit(function(){

			if(LOCAL.getOpcion("mensajes") == false)
				return;

			if($("#form_clan label.error:visible").length == 0)
			{
				var id = $("#form_clan #destinoclan").val();
				var msj = "Mensaje enviado al clan " + id
				msj += "\n--------------------------------------\n"
				msj += cleanText($("#form_clan #mensaje").val());
				msj += "\n--------------------------------------\n"

				$.ajax({
					method: "POST",
					url: "mensajes.php",
					async: false,
					data: "accion=enviarmensajejugador&destino=" + LOCAL.getImperio().idImperio + "&mensaje=" + msj,
					error: function(xmlHttpRequest, textStatus, errorThrown){
						console.log(xmlHttpRequest);
					}
				});
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
