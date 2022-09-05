function getDataCiudad(){
	let subtitulo    = document.querySelector(".subtitulo").innerText;
	let titulo       = document.querySelector(".tituloimperio").innerText.split("#");
	let inicioCadena = subtitulo.indexOf(":")+2;
	let finCadeba    = subtitulo.indexOf(";");
	return {
		idCiudad  : parseInt(titulo[1]),
		poblacion : parseInt(document.getElementById("poblacionciudad").innerText.trim().replace(".", "")),
		terreno   : subtitulo.substring(inicioCadena,finCadeba),
		region    : parseInt(subtitulo.split("#")[1]),
		impuestos : parseInt(document.getElementById("impuestoactual").innerText.replace("%",""))
	}
}
function getEstado(){
	return{
		moral       : parseInt(document.getElementById("moralciudad").innerText),
		corrupcion  : parseInt(document.getElementById("estado_corrupcion").innerText),
		felicidad   : parseInt(document.getElementById("estado_felicidad").innerText),
		higiene     : parseInt(document.getElementById("estado_higiene").innerText),
		desempleo   : parseInt(document.getElementById("estado_desempleo").innerText),
		religion    : parseInt(document.getElementById("estado_religion").innerText),
		cultura     : parseInt(document.getElementById("estado_cultura").innerText)
	}
}
function construirConTecla(tecla){
	window.addEventListener("keydown", function (event){ 
		if (event.key==tecla)
			document.getElementById("frm_edificios").submit();
	});
}
function setStyle(){
	//coloco boton de construccion al centro
	document.getElementById('flotante').style.left="35%";
}

function getRecursosUsados(){
	if(document.getElementById("panel").innerText == "")
		return;
	let recursosUsados = {};
	recursosUsados["ORO"]= -parseInt(document.querySelector("#panel #costeoro").innerText.trim());
	document.querySelectorAll("#panel [id*='coste']:not(#costeoro)").forEach(function callback(obj , index){
		let nombre = obj.id.replace("coste", "");
		recursosUsados[nombre.toUpperCase()] = -parseInt(obj.innerHTML.trim());
	});
	return recursosUsados;
}

function comparar ( a, b ){ return a[2] - b[2]; }
