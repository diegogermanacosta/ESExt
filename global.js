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
		botonaZong.play();
	}; 
	var botonazo = GLOBAL.crearBoton("#subcabecera","Apretame este Boton", accion);
	botonazo.style = "height: 35px"
	var iframe= document.createElement("iframe");
	var elementoLista = document.createElement("li");
	elementoLista.innerHTML = `<li><a href="ultimosataques.php">Ataques recibidos</a></li>`;
	document.querySelector("#sinfo  ul").children[2].innerHTML = `<a href="ultimosataquestuyos.php">Ataques realizados</a>`;
	document.querySelector("#sinfo  ul").children[2].after(elementoLista);
	cargaImperio()
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
		return document.querySelector("#_infopartida").innerText.split("\n")[2].split("(")[0].trim()
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
		return document.querySelector("#_infopartida").innerText.split("\n")[2].split("(")[1].trim().replace("Ronda ","").replace(")","")
	},
	getFechaFin: function() {
		return document.querySelector("#_infopartida .fecha_local").innerText;
	},
	getHorasProteccion: function() {
		return document.querySelector("#_infopartida").innerText.split("\n")[5].trim()
	},
	showOpcionesDisponibles: function() {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.borderRadius = "5px";
    div.style.border = "2px solid #35771F";
    div.style.padding = "5px";
    div.style.margin = "10px";
    div.innerHTML = "<b>PRESIONA EL ICONO DE LA EXTENSIÓN PARA VER LAS OPCIONES DISPONIBLES</b>";

    var subcabecera = document.getElementById("subcabecera");
    subcabecera.parentNode.insertBefore(div, subcabecera);
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
		});
	},
	getCode: function()
	{
		API.getCodigo();
	},
	updateRecursos: function()	{
		if(LOCAL.getImperio() == null)
			return;

		if(document.querySelector("#g_turnos").innerText.length == 0)
			return;

		var updateRecurso = true;
		if(LOCAL.getRecurso() != null)
		{
			var turnos = parseInt(document.querySelector("#g_turnos").innerHTML().replace(/\./g,""));
			if(LOCAL.getRecurso().turnos == turnos)
				updateRecurso = false;
		}

		if(updateRecurso)
			API.setRecurso(LOCAL.getImperio().guidImperio, GLOBAL.getPartida(), GLOBAL.getRonda(),
						parseInt(document.querySelector("#g_turnos").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_mana").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_karma").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_oro").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_alimentos").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_agua").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_hierro").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_piedra").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_madera").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_mithril").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_plata").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_gemas").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_herramientas").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_bloques").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_tablas").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_reliquias").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_joyas").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_cristal").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_armas").InnerHTML.replace(/\./g,"")),
						parseInt(document.querySelector("#g_rubies").InnerHTML.replace(/\./g,"")));
	},
	gobiernoRegion : function(region){
		if(LOCAL.getGobernantes()&&LOCAL.getImperio())
			return LOCAL.getGobernantes()[region]==LOCAL.getImperio().clan;
		else{
			console.log("no se puede calcular gobernante de la region, pero para mi es tu señora");
			return false;
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

function desmarcarAsedio(idCiudad) {
    var asedio = LOCAL.getAsedio(idCiudad);
    document.querySelectorAll(".marcarAsedio_" + idCiudad).forEach(function (obj) {
        obj.style.color = "#006400";
        obj.textContent = "[Marcar]";
    });
    asedio.marcado = false;
    LOCAL.setAsedio(asedio);
}