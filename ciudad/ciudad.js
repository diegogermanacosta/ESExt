import {ciudad}          from 'class_ciudad.js';
import {edificio}        from 'class_edificio.js';
import {multiplicadores} from 'class_multiplicador';

//construir edifico con barra espaciadora
window.addEventListener("keydown", function (event) { 
	if (event.key==' '){
		document.getElementById("frm_edificios").submit();
	}
});
//coloco boton de construccion al centro
document.getElementById('flotante').style.left="35%";
//lista elementos de edificio: 0-32 = seleciona edificio || 0 = nombre, 1 = borrar, 2-11 = estrellas
var listaElementosEdificios = document.querySelectorAll(".c .nome");

//cargo datos de ciudad
var multiplicador = new multiplicadores(GLOBAL.getPartida(),gobiernoRegion(),getDataImperio(),getDataCiudad(),LOCAL.getPoliticas())
var edificios     = new Array();
listaElementosEdificios.forEach(function callback(obj , index){
	let nombre = obj.innerText.trim().replace(" ","").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	let construido = document.getElementById("txt_edificio_ya_compradas_"+index).value + 1;
	edificios.push(new edificio(index,nombre,construido,costosIniciales,produccionBase,multiplicador));
});
var ciudad = new ciudad;
function getDataCiudad(){
	let subtitulo    = document.querySelector(".subtitulo").innerText;
	let inicioCadena = subtitulo.indexOf(":")+2;
	let finCadeba    = subtitulo.indexOf(";");
	return {
		idCiudad  : parseInt(document.querySelector(".tituloimperio").innerText.split("#")[1]),
		poblacion : parseInt(document.getElementById("poblacionciudad").innerText.trim().replace(".", "")),
		terreno   : subtitulo.substring(inicioCadena,finCadeba),
		region    : parseInt(subtitulo.split("#")[1]),
		impuestos : parseInt(document.getElementById("impuestoactual").innerText.replace("%",""))
	}
}

function getDataImperio(){
	return {
		raza      : LOCAL.getImperio().raza,
		pacifico  : LOCAL.getImperio().pacifico
	}
}

function gobiernoRegion(){
	return LOCAL.getGobernantes()[getDataCiudad().region]==LOCAL.getImperio().clan;
}