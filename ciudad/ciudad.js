construirConTecla(" ");
setStyle();
//lista elementos de edificio: 0-32 = seleciona edificio || 0 = nombre, 1 = borrar, 2-11 = estrellas
var listaElementosEdificios = document.querySelectorAll(".c .nome");
var edificios               = new Array();
var estrella                = new estrellas();
var ciudad                  = null;
var recursos                = null;
var tablaEficiencia         = [];

UTIL.injectCode("base/setvalueedif.js");
setTimeout(() => {
	let recursosActuales    = JSON.parse(document.getElementById("recursosActuales").value);
	//cargo datos de ciudad
		recursos            = new recursosClass(recursosActuales);
	let multiplicador       = new multiplicadores(GLOBAL.getPartida(),GLOBAL.gobiernoRegion(),LOCAL.getImperio(),getDataCiudad(),LOCAL.getPoliticas(),LOCAL.getClan());
	listaElementosEdificios.forEach(function callback(obj , index){
		let nombre          = obj.innerText.trim().replace(" ","").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		let construido      = parseInt(document.getElementById("txt_edificio_ya_compradas_"+index).value) + 1;
		edificios.push(new edificioclass(nombre,construido,COSTOS_INICIALES,PRODUCCION_BASE,multiplicador.getMultiplicador()));
		setElementoEdificio(index);
	});
	tablaEficiencia.sort(comparar);
	console.log(tablaEficiencia);
	ciudad                  = new ciudadclass(getDataCiudad(),edificios,getEstado(),GLOBAL.gobiernoRegion());
	calculaEstrellas()
	cargaCiudad()
},200);

function calculaEstrellas(){
	for (let i = 0; i < edificios.length; i++) {
		estrellaVerde(i);
	}
}
function estrellaVerde(idEdificio){
	let elementos = listaElementosEdificios[idEdificio].children;
	for (let i = 2; i < elementos.length; i++){
		if(elementos[i].src == "https://images.empire-strike.com/v2/interfaz/estrella-roja.png"||elementos[i].src == "https://images.empire-strike.com/v2/interfaz/estrella-amarilla.png"){
			continue;
		}
		if (estrella.puedoconstruir(edificios[idEdificio],i-1,recursos.getRecursos()))
			elementos[i].src = chrome.runtime.getURL('base/estrella-verde.png');
		else
			elementos[i].src = "https://images.empire-strike.com/v2/interfaz/estrella-vacia.png";
	}
}
function setElementoEdificio(idEdificio){
	let elementoEdificio = listaElementosEdificios[idEdificio];
	elementoEdificio.addEventListener("mouseout" , function(){
		estrellaVerde(idEdificio);
		if(idEdificio>0)
			estrellaVerde(idEdificio-1);
		estrellaAzul();
	});
	setClicks(elementoEdificio.children[1],idEdificio);
	elementoEdificio.querySelectorAll(".estrella").forEach(function callback(obj){
		let estrella = parseInt(obj.dataset.attr.split(',')[1])+1;
		tablaEficiencia.push([idEdificio , estrella , edificios[idEdificio].getRentabilizacion(MINIMOS,estrella,2)])
		setClicks(obj,idEdificio);
		obj.addEventListener("mouseover",function(){
			estrellaVerde(idEdificio);
			estrellaAzul();
		});
	});
}
function cargaCiudad(){
	if (LOCAL.getCiudad()==null)
		return
	let ciudades = LOCAL.getCiudad()
	let idCiudad = parseInt(document.querySelector(".tituloimperio").innerText.split("#")[1]);
	for (let i = 0; i < ciudades.length; i++){
		if(ciudades[i].idCiudad != idCiudad)
			continue;
		ciudades[i].cargada = true;
		ciudades[i].data    = ciudad.getData();
		LOCAL.setCiudad(ciudades);
	}
}
function setClicks(elemento,idEdificio){
	elemento.addEventListener("click",function(){
		let seleccionados = parseInt(document.getElementById("xx_txt_costo_edificio_estrella_seleccionada_"+idEdificio).value) + 1;
		edificios[idEdificio].setSeleccionado(seleccionados);
		recursos.setVariacionRecursos(getRecursosUsados());
		calculaEstrellas();
		estrellaAzul()
	});
}

function estrellaAzul(){
	let blue = false;
	let i    = 0;
	while(!blue&&i<tablaEficiencia.length){
		let idEdificio = tablaEficiencia[i][0];
		let edificio   = edificios[idEdificio];
		let numeroEstrella   = tablaEficiencia[i][1];
		let obj        = listaElementosEdificios[idEdificio].children[numeroEstrella+1];
		if (estrella.puedoconstruir(edificio,numeroEstrella,recursos.getRecursos())&&edificio.getConstruido()<numeroEstrella){
			obj.src = chrome.runtime.getURL('base/estrella-azul.png');
			blue = true
		}
		i++;
	}
}