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

	var botonaZong = new Audio (chrome.runtime.getURL("base/button.mpeg"));
	var accion = function()
	{
		let carga = {
			mode : true,
			type : "imperio",
			init : location.href
		};
		LOCAL.setCarga(carga);
		GLOBAL.cargaImperio();
		if(!LOCAL.getCarga())
			botonaZong.play();
	}; 
	var botonazo = GLOBAL.crearBoton("#subcabecera","Apretame este Boton", accion);
	botonazo.style = "height: 35px"
	var iframe= document.createElement("iframe");
	var elementoLista = document.createElement("li");
	elementoLista.innerHTML = `<li><a href="ultimosataques.php">Ataques recibidos</a></li>`;
	document.querySelector("#sinfo  ul").children[2].innerHTML = `<a href="ultimosataquestuyos.php">Ataques realizados</a>`;
	document.querySelector("#sinfo  ul").children[2].after(elementoLista);
}

var GLOBAL = {
	showError: function(msg, time)	{
		var mensajeError = document.createElement("div");
		mensajeError.className = "mensajeError";
		mensajeError.innerHTML = msg;
		document.getElementById("contenido").prepend(mensajeError);

		if(time != undefined)
		{
			setTimeout(function(){
			 	document.getElementById("contenido").querySelector(".mensajeOk").forEach(function callback(obj , index){ 
			 		if(obj.innerText == msg) 
			 			obj.remove() 
			 	});
			}, time * 1000);
		}
	},
	showInfo: function(msg, time) {
		var mensajeOk = document.createElement("div");
		mensajeOk.className = "mensajeOk";
		mensajeOk.innerHTML = msg;
		document.getElementById("contenido").prepend(mensajeOk);

		if(time != undefined)
		{
			setTimeout(function(){
			 	document.getElementById("contenido").querySelector(".mensajeOk").forEach(function callback(obj , index){ 
			 		if(obj.innerText == msg)
			 			obj.remove() 
			 	});
			}, time * 1000);
		}
	},
	showMessage: function(msg, time) {
		var mensajeInfo = document.createElement("div");
		mensajeInfo.className = "mensajeInfo";
		mensajeInfo.innerHTML = msg;
		document.getElementById("contenido").prepend(mensajeInfo);

		if(time != undefined)
		{
			setTimeout(function(){
			 	document.getElementById("contenido").querySelector(".mensajeOk").forEach(function callback(obj , index){ 
			 		if(obj.innerText == msg)
			 			obj.remove() 
			 	});
			}, time * 1000);
		}
	},
	showConsole: function(data)
	{
		console.error("EXTENSION EXCEPTION\n" + data.responseText);
	},
	getPartida: function() {
		return $($("#_infopartida").contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[1]).text().trim().replace("(Ronda ","").replace(")","").split(" ")[0];
	},
	getClanCantidad: function() {
		switch(GLOBAL.getPartida()) {
			case 'KENARON':
				return 20;
			case 'GARDIS':
			case 'ZULA':
				return 10;
			case 'NUMIAN':
				return 5;
			case 'FANTASY':
				return 3;
			default:
				return 0;
		}
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
				//$("#notificaciones").append("<a style='padding-left: 28px;padding-bottom: 14px; background: url(" + chrome.runtime.getURL('base/puzzle.png') + "); background-size: 28px;'><span id='g_sucesos' data-r='0'>0</span></a>");
		});
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
	gobiernoRegion : function(region){
	return LOCAL.getGobernantes()[region]==LOCAL.getImperio().clan;
	},
	cargaImperio : function(){
		if(LOCAL.getCarga()==null)
			return;
		if(LOCAL.getCarga()["mode"]&&LOCAL.getCarga()["type"]=="imperio"){
			if(LOCAL.getImperio()==null){
				location.replace("tuimperio.php");
				return;
			}
			if(LOCAL.getPoliticas()==null){
				location.replace("politica.php");
				return;
			}
			if(LOCAL.getGobernantes()==null){
				location.replace("gobierno.php");
				return;
			}
			if(LOCAL.getClan()==null&&LOCAL.getImperio().clan!=''){
				location.replace("clan.php?sclan="+LOCAL.getImperio().clan);
				return;
			}
			if(location.href!=LOCAL.getCarga()["init"])
				location.replace(LOCAL.getCarga()["init"]);
			localStorage.removeItem("Carga")
		}
	},
	cargaHeroe : function(){
		if (LOCAL.getHeroe()!=null){
			var heroes = LOCAL.getHeroe();
			var count=0;
			for (var i = heroes.length - 1; i >= 0; i--){
				if(!heroes[i].cargada){
					location.replace(heroes[i].link);
					return
				}
			}
		}
		else
			location.replace("tuimperio.php");
	},
	cargaCiudad : function(){
		if (LOCAL.getCiudad()!=null){
			var ciudades = LOCAL.getCiudad();
			var count=0;
			for (var i = ciudades.length - 1; i >= 0; i--){
				if(!ciudades[i].cargada){
					location.replace("ciudad.php?id="+ciudades[i].idCiudad);
					return
				}
			}
		}
		else
			location.replace("tuimperio.php");
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
