var _NONE = 0;
var _ASEDIO = 1;
var _REGIONES = 2;
var _RECONQUISTA = 3;

var _INFORME = 1;
var _INFORMECOMPARTIDO = 2;

function alwaysDo()
{
	//GLOBAL.checkNews();
	//GLOBAL.updateRecursos();
	//GLOBAL.getCode();
	var botonaZong = new Audio (chrome.extension.getURL('base/button.mpeg'));
	var accion = function(){botonaZong.play()}; 
	var botonazo = GLOBAL.crearBoton("#subcabecera","Apretame este Boton", accion);
}

var GLOBAL = {
	showError: function(msg, time)	{
		$("#contenido").prepend("<div class='mensajeError'>" + msg + "</div>");

		if(time != undefined)
		{
			setTimeout(function(){
			 	$("#contenido").find(".mensajeOk").each(function(index, obj){ if($(obj).text() == msg) $(obj).remove() });
			}, time * 1000);
		}
	},
	showInfo: function(msg, time) {
		$("#contenido").prepend("<div class='mensajeOk'>" + msg + "</div>");

		if(time != undefined)
		{
			setTimeout(function(){
			 	$("#contenido").find(".mensajeOk").each(function(index, obj){ if($(obj).text() == msg) $(obj).remove() });
			}, time * 1000);
		}
	},
	showMessage: function(msg, time) {
		$("#contenido").prepend("<div class='mensajeInfo'>" + msg + "</div>");

		if(time != undefined)
		{
			setTimeout(function(){
			 	$("#contenido").find(".mensajeOk").each(function(index, obj){ if($(obj).text() == msg) $(obj).remove() });
			}, time * 1000);
		}
	},
	showAntiBlock: function(msg, time)	{
		$("#contenido").prepend("<div class='mensajeError'>Debido a que el sitio recientemente se cambio a HTTPS, esto involucra nuevos mecanismos de seguridad que no son compatibles con la extension. Para que la extension vuelva a funcionar es necesario desactivar el mecanismo de seguridad indicado en la imagen. <p></p><img src='http://www.empirestrikeextension.com/images/extension/habilitacion.png' style='padding-top: 10px'/></div>");
	},
	showConsole: function(data)
	{
		console.error("EXTENSION EXCEPTION\n" + data.responseText);
	},
	getPartida: function() {
		return $($("#_infopartida").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[1]).text().trim().replace("(Ronda ","").replace(")","").split(" ")[0];
	},
	getRonda: function() {
		return parseInt($($("#_infopartida").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[1]).text().trim().replace("(Ronda ","").replace(")","").split(" ")[1]);
	},
	getFechaFin: function() {
		return $("#_infopartida .fecha_local").text();
	},
	getHorasProteccion: function() {
		return parseInt($($("#_infopartida").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[4]).text().trim().substring(0,2));
	},
	showOpcionesDisponibles: function() {
		$("<div style='position: absolute; border-radius: 5px; border: 2px solid #35771F; padding: 5px; margin: 10px'><b>PRESIONA EL ICONO DE LA EXTENSIÓN PARA VER LAS OPCIONES DISPONIBLES</b></div>").insertBefore("#subcabecera");
	},
	crearBoton: function(donde,nombre,accion){
		//crear boton
		const button = document.createElement('button'); 
		button.type = 'button'; 
		button.innerText = nombre;
		button.onclick = accion;
		button.className= "boton-papiro";
		document.querySelector(donde).appendChild(button);
		return button;
		//boton creado
	},
	crearVinculo: function(donde,texto,accion){
		const a = document.createElement('a');
		a.onclick = accion;
		a.text = texto;
		document.querySelector(donde).appendChild(a);
		return a;
	},
	checkNews: function()
	{
		API.getNews(function(data){
			if(data == null)
				return;

			var manifestExtension = chrome.runtime.getManifest();
			if(manifestExtension.version != data.Version)
				GLOBAL.showMessage("Nueva versión disponible de la extensión. <a target='_blank' href='" + url + "/ActualizacionManual'>¿Como la actualizo?</a> <a target='_blank' href='" + url + "/Release/" + data.Version.replace(".","_") + "'>¿Que hay de nuevo?</a>");

			//if(data.Mensajes.length > 0)
				//$("#notificaciones").append("<a style='padding-left: 28px;padding-bottom: 14px; background: url(" + chrome.extension.getURL('base/puzzle.png') + "); background-size: 28px;'><span id='g_sucesos' data-r='0'>0</span></a>");
		});
	},
	showSuscription: function ()
	{
		if(LOCAL.getImperio() == null)
			return;

		if(LOCAL.getImperio().premium == true)
			return;

		GLOBAL.showMessage("Prueba la version PREMIUM! </br>Mira las novedades en <a href='http://www.empirestrikeextension.com/#premium' target='_blank'>www.empirestrikeextension.com</a>");
	},
	showNews: function ()
	{

	},
	getCode: function()
	{
		API.getCodigo();
	},
	updateRecursos: function()	{
		if(LOCAL.getImperio() == null)
			return;

		if($("#g_turnos").length == 0)
			return;

		var updateRecurso = true;
		if(LOCAL.getRecurso() != null)
		{
			var turnos = parseInt($("#g_turnos").html().replace(/\./g,""));
			if(LOCAL.getRecurso().turnos == turnos)
				updateRecurso = false;
		}

		if(updateRecurso)
			API.setRecurso(LOCAL.getImperio().guidImperio, GLOBAL.getPartida(), GLOBAL.getRonda(),
						parseInt($("#g_turnos").html().replace(/\./g,"")),
						parseInt($("#g_mana").html().replace(/\./g,"")),
						parseInt($("#g_karma").html().replace(/\./g,"")),
						parseInt($("#g_oro").html().replace(/\./g,"")),
						parseInt($("#g_alimentos").html().replace(/\./g,"")),
						parseInt($("#g_agua").html().replace(/\./g,"")),
						parseInt($("#g_hierro").html().replace(/\./g,"")),
						parseInt($("#g_piedra").html().replace(/\./g,"")),
						parseInt($("#g_madera").html().replace(/\./g,"")),
						parseInt($("#g_mithril").html().replace(/\./g,"")),
						parseInt($("#g_plata").html().replace(/\./g,"")),
						parseInt($("#g_gemas").html().replace(/\./g,"")),
						parseInt($("#g_herramientas").html().replace(/\./g,"")),
						parseInt($("#g_bloques").html().replace(/\./g,"")),
						parseInt($("#g_tablas").html().replace(/\./g,"")),
						parseInt($("#g_reliquias").html().replace(/\./g,"")),
						parseInt($("#g_joyas").html().replace(/\./g,"")),
						parseInt($("#g_cristal").html().replace(/\./g,"")),
						parseInt($("#g_armas").html().replace(/\./g,"")),
						parseInt($("#g_rubies").html().replace(/\./g,"")));
	},
	generateAsedios : function()
	{
		return false;
	}
}

function moveAsedios(e){
  var div = document.getElementById('asedios');
  div.style.position = 'absolute';
  div.style.top = (parseInt(e.clientY) - 20) + 'px';
  div.style.left = (parseInt(e.clientX) - 20) + 'px';
}

function desmarcarAsedio(idCiudad)
{
	var asedio = LOCAL.getAsedio(idCiudad);

	$(".marcarAsedio_" + idCiudad).each(function(index, obj){
			$(obj).css("color", "#006400");
			$(obj).text("[Marcar]");
	})

	asedio.marcado = false;
	LOCAL.setAsedio(asedio);
}
