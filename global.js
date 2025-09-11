var _NONE = 0;
var _ASEDIO = 1;
var _REGIONES = 2;
var _RECONQUISTA = 3;
var _INFORME = 1;
var _INFORMECOMPARTIDO = 2;

function alwaysDo() {
	var elementoLista = document.createElement("li");
	elementoLista.innerHTML = `<li><a href="ultimosataques.php">Ataques recibidos</a></li>`;
	document.querySelector("#sinfo  ul").children[2].innerHTML = `<a href="ultimosataquestuyos.php">Ataques realizados</a>`;
	document.querySelector("#sinfo  ul").children[2].after(elementoLista);
	cargaImperio();
	executeProcess(document.URL);
}

var GLOBAL = {
	showError: function(msg, time) {
		var mensajeError = document.createElement("div");
		mensajeError.className = "mensajeError";
		mensajeError.innerHTML = msg;
		document.getElementById("contenido").prepend(mensajeError);

		if(time != undefined) {
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
	showConsole: function(data) {
		console.error("EXTENSION EXCEPTION\n" + data.responseText);
	},
	getPartida: function() {
		return document.querySelector("#_infopartida").innerText.split("\n")[2].split("(")[0].trim()
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
	},/*
	crearBoton: function(donde,nombre,accion) {
		//crear boton
		const button = document.createElement('button'); 
		button.type = 'button'; 
		button.innerText = nombre;
		button.onclick = accion;
		button.className= "boton-papiro";
		document.querySelector(donde).appendChild(button);
		return button;
		//boton creado
	},*/
	crearVinculo: function(donde,texto,accion) {
		const a = document.createElement('a');
		a.onclick = accion;
		a.text = texto;
		document.querySelector(donde).appendChild(a);
		return a;
	},
	getRecurso: function() {
		return{
			TURNOS: 	    parseInt(document.querySelector("#g_turnos").innerHTML.replace(/\./g,"")),
			MANA: 		    parseInt(document.querySelector("#g_mana").innerHTML.replace(/\./g,"")),
			KARMA: 		    parseInt(document.querySelector("#g_karma").innerHTML.replace(/\./g,"")),
			ORO: 		    parseInt(document.querySelector("#g_oro").innerHTML.replace(/\./g,"")),
			ALIMENTOS: 	    parseInt(document.querySelector("#g_alimentos").innerHTML.replace(/\./g,"")),
			AGUA: 		    parseInt(document.querySelector("#g_agua").innerHTML.replace(/\./g,"")),
			HIERRO: 	    parseInt(document.querySelector("#g_hierro").innerHTML.replace(/\./g,"")),
			PIEDRA: 	    parseInt(document.querySelector("#g_piedra").innerHTML.replace(/\./g,"")),
			MADERA: 	    parseInt(document.querySelector("#g_madera").innerHTML.replace(/\./g,"")),
			MITHRIL: 	    parseInt(document.querySelector("#g_mithril").innerHTML.replace(/\./g,"")),
			PLATA: 		    parseInt(document.querySelector("#g_plata").innerHTML.replace(/\./g,"")),
			GEMAS: 		    parseInt(document.querySelector("#g_gemas").innerHTML.replace(/\./g,"")),
			HERRAMIENTAS: 	parseInt(document.querySelector("#g_herramientas").innerHTML.replace(/\./g,"")),
			BLOQUES: 	    parseInt(document.querySelector("#g_bloques").innerHTML.replace(/\./g,"")),
			TABLAS: 	    parseInt(document.querySelector("#g_tablas").innerHTML.replace(/\./g,"")),
			RELIQUIAS: 	    parseInt(document.querySelector("#g_reliquias").innerHTML.replace(/\./g,"")),
			JOYAS:    	    parseInt(document.querySelector("#g_joyas").innerHTML.replace(/\./g,"")),
			CRISTAL: 	    parseInt(document.querySelector("#g_cristal").innerHTML.replace(/\./g,"")),
			ARMAS:  	    parseInt(document.querySelector("#g_armas").innerHTML.replace(/\./g,"")),
			RUBIES: 	    parseInt(document.querySelector("#g_rubies").innerHTML.replace(/\./g,""))
		}
	},
	gobiernoRegion : function(region){
		if(LOCAL.getGobernantes()&&LOCAL.getImperio())
			return LOCAL.getGobernantes()[region]==LOCAL.getImperio().clan;
		else{
			console.log("no se puede calcular gobernante de la region, pero para mi es tu señora");
			return false;
		}
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