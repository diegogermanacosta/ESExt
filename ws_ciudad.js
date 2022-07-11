var edificio = {
	id: 				"id",
	nombre: 		 "value", 
	construido:      "value", 
	costosIniciales: "value", 
	produccion:      "value" 
	//#seleccionado:  -1;
}
var dataCiudad= new Array();
var ValorRecursos = MAXIMOS;
var produccionCiudad        = {};
var masRentable             = 99990;
var masRentableI            = 99990;
var rBase					= 30*2*1.44;
var k_Pacifico				= 1;

var multiplicador = {
	"ALIMENTOS"		: 1,
	"AGUA"          : 1,
	"HIERRO"        : 1,
	"HERRAMIENTAS"  : 1,
	"ARMAS"         : 1,
	"PIEDRA"        : 1,
	"MADERA"        : 1,
	"BLOQUES"       : 1,
	"TABLAS"        : 1,
	"MITHRIL"       : 1,
	"PLATA"         : 1,
	"CRISTAL"       : 1,
	"RELIQUIAS"     : 1,
	"GEMAS"         : 1,
	"JOYAS"         : 1,
	"KARMA"			: 1,
	"MANA"			: 1,
	"ORO"			: 1,
	"FAMA"			: 1
}
//tomo poblacion, quito espacios, punto de mil y parseo a entero
var pobla = parseInt(document.getElementById("poblacionciudad").innerText.trim().replace(".", ""));

//edifico con barra espaciadora
window.addEventListener("keydown", function (event) { 
	if (event.key==' '){
		document.getElementById("frm_edificios").submit();
	}
});

//coloco boton de construccion al centro
document.getElementById('flotante').style.left="35%";

if (LOCAL.getPacifico())
    k_Pacifico = 1.2;

if(LOCAL.getPoliticas()!=null){
	let politicas  = LOCAL.getPoliticas();
	    multiplicador.KARMA    = 1+0.05*politicas.losdioses;
	    multiplicador.MANA     = 1+0.05*politicas.magiaarcana;
	    multiplicador.PIEDRA   = 1+0.02*(politicas.arquitectura+politicas.esclavitud);
	    multiplicador.BLOQUES  = 1+0.02*politicas.arquitectura;
	    multiplicador.MADERA   = 1+0.01*(politicas.esclavitud+2*politicas.naturaleza);
	    multiplicador.AGUA     = 1+0.01*politicas.lamujer;
	    multiplicador.TABLAS   = 1+0.02*politicas.naturaleza;
	    multiplicador.ALIMENTOS= 1+0.01*politicas.lamujer;
	    multiplicador.PLATA    = 1+0.02*politicas.profundidadcuevas;
	    multiplicador.HIERRO   = (1+0.02*politicas.profundidadcuevas)*(1+0.02*politicas.esclavitud);
	    multiplicador.MITHRIL  = 1+0.01*politicas.profundidadcuevas;
	    multiplicador.ORO      = (1+(0.02*politicas.burguesia))*(1-(0.02*politicas.aduanas))*(1-(0.02*politicas.nobleza));
	    rBase				  *= 1+(0.06*politicas.rutasdecontrabando); 
}

//CALCULO EFICIENCIA EN TERRENO
var subtitulo    = document.querySelector(".subtitulo").innerText;
var inicioCadena = subtitulo.indexOf(":")+2;
var finCadeba    = subtitulo.indexOf(";")
var terreno      = subtitulo.substring(inicioCadena,finCadeba);
var region       = parseInt(subtitulo.split("#")[1]);
switch(terreno) {
	case 'Llanura': 
		multiplicador.ALIMENTOS *= 1.8;
		break;
	case 'Bosque': 
		multiplicador.MADERA 	*= 2;
		break;
	case 'Montaña': 
		multiplicador.HIERRO  	*= 1.4;
		multiplicador.MITHRIL 	*= 1.3;
		break;
	case 'Río': 
		multiplicador.AGUA 		*= 2.4;
		break;
	case 'Costa': 
		multiplicador.ALIMENTOS *= 1.6;
		break;
	case 'Colina': 
		multiplicador.PIEDRA  	*= 1.6;
		multiplicador.GEMAS		*= 1.3;
		break;
}
//fin CALCULO EFICIENCIA EN TERRENO
if(LOCAL.getGobernantes()!=null)
	if(LOCAL.getGobernantes()[region]==LOCAL.getImperio()["clan"]){
		switch (GLOBAL.getPartida()){
			case 'KENARON':
			case 'GARDIS':
				switch(region){
					case 1:
						multiplicador.ALIMENTOS 	*= 3;
						break;
					case 2:
						multiplicador.MANA			*= 2;
						break;
					case 4:
						multiplicador.MADERA    	*= 2;
						multiplicador.TABLAS    	*= 2;
						break;
					case 5:
						multiplicador.ORO       	*= 2;
						break;
					case 6:
						multiplicador.FAMA      	*= 1.5;
						break;
					case 10:
						multiplicador.HERRAMIENTAS	*= 2;
						multiplicador.HIERRO		*= 2;
						break;
					case 11:
						multiplicador.MADERA 		*= 2;
						multiplicador.AGUA  		*= 2;
						break;
					case 12:
						multiplicador.MADERA 		*= 3;
						break;
					case 14:
						multiplicador.ARMAS			*= 2;
						multiplicador.HIERRO		*= 2;
						break;
					case 15:
						multiplicador.MITHRIL  		*= 2;
						multiplicador.RELIQUIAS 	*= 2;
						break;
					case 17:
						multiplicador.PIEDRA		*= 3;
						break;
					case 20:
						multiplicador.AGUA  		*= 3;
						break;
					case 23:
						multiplicador.GEMAS  		*= 3;
						break;
					case 26:
						multiplicador.PLATA  		*= 2;
						multiplicador.JOYAS		 	*= 2;
						break;
					case 28:
						multiplicador.KARMA		 	*= 1.5;
						break;
					case 29:
						multiplicador.PIEDRA  		*= 2;
						multiplicador.BLOQUES	 	*= 2;
						break;
					case 30:
						multiplicador.PLATA		 	*= 1.5;
						multiplicador.GEMAS		 	*= 1.5;
						multiplicador.JOYAS		 	*= 1.5;
						multiplicador.CRISTAL	 	*= 1.5;
						break;
					case 9:
					case 13:
					case 27:
						rBase*=2;
					break;
				}
			break;
			case 'ZULA':
			case 'NUMIAN':
				switch(region){ 
					case 1:
						multiplicador.ARMAS			*= 2;
						multiplicador.HERRAMIENTAS	*= 2;
						break;
					case 5:
						multiplicador.PIEDRA  		*= 2.5;
						multiplicador.BLOQUES	 	*= 2.5;
						break;
					case 6:
						multiplicador.KARMA		 	*= 2;
						break;
					case 7:
						multiplicador.MADERA    	*= 3;
						multiplicador.TABLAS    	*= 3;
						break;
					case 9:
						rBase=rBase*3;
						break;
					case 11:
						multiplicador.ALIMENTOS 	*= 2;
						multiplicador.AGUA		 	*= 2;
						break;
					case 11:
						multiplicador.ALIMENTOS 	*= 1.5;
						multiplicador.AGUA		 	*= 1.5;
						break;
					case 16:
						multiplicador.FAMA		 	*= 1.5;
						break;
				}
			case 'FANTASY':
				switch(region){
					case 11:
						multiplicador.FAMA		 	*= 1.5/0.9;
						break;
					case 12:
						multiplicador.ORO 			*= 1.5;
						multiplicador.MADERA   		*= 2;
						break;
					case 13:
						multiplicador.KARMA			*=1.2;
						multiplicador.MANA			*=1.2;
					case 6:
						rBase*=2;
					break;
					case 7:							
						multiplicador.MANA			*=2;
						break;
					case 15:
						multiplicador.KARMA			*=2;
						break;
				}
			break;
		}
	}
if (LOCAL.getImperio()!=null)
	if(LOCAL.getImperio()["raza"]=="Humanos"){ 
		multiplicador.joyeria      = multiplicador.joyeria*2;
		multiplicador.forjamithril = multiplicador.forjamithril*2;
	}

if(document.querySelector("#acciones_ciudad_wrapper > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1) > div").children.length!=2)
	if(document.querySelector("#acciones_ciudad_wrapper > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1) > div").children[2].textContent.split(':')[0]=='Felicidad')
		for(index in multiplicador){
			multiplicador[index] *=1.2;
		}
document.querySelectorAll("#tablaproduccion tr").forEach(function callback(obj, index){
	switch(index){
		case 0:
			produccionCiudad.turnos       = parseInt(obj.children[1].innerText.replace(/\./g,"").trim());
			produccionCiudad.hierro       = parseInt(obj.children[3].innerText.replace(/\./g,"").trim());
			produccionCiudad.herramientas = parseInt(obj.children[5].innerText.replace(/\./g,"").trim());
			produccionCiudad.armas        = parseInt(obj.children[7].innerText.replace(/\./g,"").trim());
		break;
		case 1:
			produccionCiudad.mana    = parseInt(obj.children[1].innerText.replace(/\./g,"").trim());
			produccionCiudad.piedra  = parseInt(obj.children[3].innerText.replace(/\./g,"").trim());
			produccionCiudad.bloques = parseInt(obj.children[5].innerText.replace(/\./g,"").trim());
		break;
		case 2:
			produccionCiudad.karma  = parseInt(obj.children[1].innerText.replace(/\./g,"").trim());
			produccionCiudad.madera = parseInt(obj.children[3].innerText.replace(/\./g,"").trim());
			produccionCiudad.tablas = parseInt(obj.children[5].innerText.replace(/\./g,"").trim());
		break;
		case 3:
			produccionCiudad.oro       = parseInt(obj.children[1].innerText.replace(/\./g,"").trim());
			produccionCiudad.mithril   = parseInt(obj.children[3].innerText.replace(/\./g,"").trim());
			produccionCiudad.reliquias = parseInt(obj.children[5].innerText.replace(/\./g,"").trim());
		break;
		case 4:
			produccionCiudad.alimentos = parseInt(obj.children[1].innerText.replace(/\./g,"").trim());
			produccionCiudad.plata     = parseInt(obj.children[3].innerText.replace(/\./g,"").trim());
			produccionCiudad.joyas     = parseInt(obj.children[5].innerText.replace(/\./g,"").trim());
		break;
		case 5:
			produccionCiudad.agua    = parseInt(obj.children[1].innerText.replace(/\./g,"").trim());
			produccionCiudad.gemas   = parseInt(obj.children[3].innerText.replace(/\./g,"").trim());
			produccionCiudad.cristal = parseInt(obj.children[5].innerText.replace(/\./g,"").trim());
		break;
		default:
		return
	}
});
chrome.storage.sync.get({ construcciones: true }, function(items) {
	if(items.construcciones)
		ciudad_process();
});

if (LOCAL.getCiudad()!=null){
	var ciudades = LOCAL.getCiudad()
	var idCiudad = parseInt(document.querySelector(".tituloimperio").innerText.split("#")[1]);
	for (var i = 0; i < ciudades.length; i++){
		if(ciudades[i].idCiudad==idCiudad){
			ciudades[i].cargada=true;
			LOCAL.setCiudad(ciudades);
		}
	}
}
var edificiosConstruidos = new Array();
var costosTotales = new Array();

GLOBAL.cargaImperio();

function renta_edif_base (nroEstrella,nombre){
	var gastoTurnos     = 2;
	if(LOCAL.getImperio().raza=="Enanos")
		gastoTurnos     =  1;
	if(LOCAL.getPacifico())
		gastoTurnos    += -0.5;
	var costoTurnos     = gastoTurnos*ValorRecursos["TURNOS"];
	var edificio=COSTOS_INICIALES[nombre];
	var costo   = (edificio["oro"] + edificio["cantidadRecurso"] * ValorRecursos[edificio["recurso"]])*nroEstrella;
	var produccionEdif = 0;
	if(PRODUCCION_BASE[nombre]!=null){
		var recursoProducido = PRODUCCION_BASE[nombre][1];
		produccionEdif = PRODUCCION_BASE[nombre][0];
		produccionEdif= produccionEdif*ValorRecursos[recursoProducido]*multiplicador[recursoProducido]*getKpobla(pobla);
		}
	
	return (costo+costoTurnos)/(produccionEdif+rBase*k_Pacifico)-1;
}

function ciudad_process(){
	if(document.querySelector(".c .nome").length == 0)
		return;
	UTIL.injectCode("base/setvalueedif.js");
	setTimeout(() => {
		//Time out para la lectura de los edificios
		var costosIniciales      = JSON.parse(document.getElementById("valoresEdificio").value);
		var recursosActuales     = JSON.parse(document.getElementById("recursosActuales").value);
		var recursosUsados       = JSON.parse(document.getElementById("recursosActuales").value);
		edificiosConstruidos = new Array();

		ciudad_cleanUsados(recursosUsados);
		var edificios = new Array();
		document.querySelectorAll(".c .nome").forEach(function callback(obj , index){
			var nombre = obj.innerText.trim().replace(" ","").replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u").toLowerCase();
			edificios.push(nombre);
			edificiosConstruidos.push(-1)
		});
		for(var i = 0; i < edificios.length; i++){
			var oroInicial      = costosIniciales[i][0];
			var materialInicial = costosIniciales[i][1];
			var nombreRecurso   = costosIniciales[i][2];
			var costo           = new Array();
			for (var j=1; j <=10; j++){
				costo.push({ oro: ciudad_calcular(oroInicial, j), material: ciudad_calcular(materialInicial, j), recurso: nombreRecurso, rentabilidad: renta_edif_base(j,edificios[i])});
			}
			costosTotales.push(costo);
		}
		ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
		document.querySelectorAll(".estrella").forEach(function callback(obj , index){
			obj.addEventListener("mouseenter" , function(){
				ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); 
			});
			obj.addEventListener("click" , function(){ 
				masRentable = 99990;
				masRentableI = 99990;
				ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); 
				ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
				edificiosSeleccionados();
				console.log("la rentabilidad mas alta es de: "+masRentable)
			});
		});

		document.querySelectorAll(".elim").forEach(function callback(obj , index){
			obj.addEventListener("click", function(){ ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); edificiosSeleccionados(); });
		});
		document.querySelectorAll(".edificios img:not(.estrella):not(.elim):not(._ayuda):not(.ayuda)").forEach(function callback(obj , index){
			var id          = obj.id;
			var estrella    = parseInt(id.replace("edificio_estrella_", ""));
			var edificio    = Math.floor(estrella / 10);
			var nroEdificio = estrella % 10;

			if(nroEdificio > edificiosConstruidos[edificio])
				edificiosConstruidos[edificio] = nroEdificio;
		});
		valorCiudad()
		ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
	},200);
}

function ciudad_cleanUsados(recursosUsados){
	for(var key in recursosUsados)
		recursosUsados[key] = 0;
}

function ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos){
	ciudad_cleanUsados(recursosUsados);
	if(document.getElementById("panel").innerText == ""){
		ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
		return;
	}
	var costeOro = parseInt(document.querySelector("#panel #costeoro").innerText.trim());
	recursosUsados["ORO"]=costeOro;

	document.querySelectorAll("#panel [id*='coste']:not(#costeoro)").forEach(function callback(obj , index){
		var nombre = obj.id.replace("coste", "");
		var costo = parseInt(obj.innerHTML.trim());
		recursosUsados[nombre.toUpperCase()] = costo;
	});
	ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
}

function ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos){
	document.querySelectorAll(".estrella").forEach(function callback(obj , index){
		if(obj.src == "https://images.empire-strike.com/v2/interfaz/estrella-roja.png"||obj.src == "https://images.empire-strike.com/v2/interfaz/estrella-amarilla.png"){
			return;
		}
		
		var estrella      = parseInt(obj.id.replace("edificio_estrella_",""));
		var edificio      = Math.floor(estrella/10);
		var nroEdificio   = estrella % 10;
		var s             	= obj.dataset.attr.split(',');
		var multiplicadorR 	= parseFloat(s[3]);
		var costoOro 		= costosTotales[edificio][nroEdificio].oro*multiplicadorR;
		var costoMat 		= costosTotales[edificio][nroEdificio].material*multiplicadorR;
		var recurso  		= costosTotales[edificio][nroEdificio].recurso.toUpperCase();
		var renta    		= costosTotales[edificio][nroEdificio].rentabilidad*multiplicadorR;

		var edificioContruid = estaConstruido(edificio);
		var construidoOro    = edificioContruid == -1 ? 0 : costosTotales[edificio][edificioContruid].oro*multiplicadorR;
		var construidoMat    = edificioContruid == -1 ? 0 : costosTotales[edificio][edificioContruid].material*multiplicadorR;

		if((recursosActuales["ORO"] - recursosUsados["ORO"]) >= (costoOro - construidoOro) && (recursosActuales[recurso] - recursosUsados[recurso]) >= (costoMat - construidoMat)&&edifRequerido(edificio,nroEdificio)){
			obj.src = chrome.runtime.getURL('base/estrella-verde.png');
			if(renta<=masRentable){
				masRentable=renta;
				obj.src = chrome.runtime.getURL('base/estrella-azul.png');
			}
		}
		else{
			obj.src = "https://images.empire-strike.com/v2/interfaz/estrella-vacia.png";
			if(renta<=masRentableI&&renta<masRentable){
				masRentableI = renta;
				obj.src      = chrome.runtime.getURL('base/estrella-blanca.png');
			}
		}
	});
}

function ciudad_calcular(inicio, estrella){
	var result = 0;
	for(var i = 0; i <= estrella; i++)
		result += inicio * i;
	return result;
}

function edifRequerido(edificio,nroEdificio){
	switch(edificio){
		case 20:
		case 21:
			if (nroEdificio<=estaConstruido(13))
				return true;
			else
				return false;
			break;
		case 22:
			if (nroEdificio<=estaConstruido(15))
				return true;
			else
				return false;
			break;
		case 23:
			if (nroEdificio<=estaConstruido(12))
				return true;
			else
				return false;
			break;
		case 24:
			if (nroEdificio<=estaConstruido(18))
				return true;
			else
				return false;
			break;
		case 25:
			if (nroEdificio<=estaConstruido(14))
				return true;
			else
				return false;
			break;
		case 26:
			if (nroEdificio<=estaConstruido(16))
				return true;
			else
				return false;
			break;
		default:
			return true;

	}
}

function estaConstruido(id){
	var seleccionado	 = document.getElementById("xx_txt_costo_edificio_estrella_seleccionada_" + id).value;
	var construido   = edificiosConstruidos[id];
	if (seleccionado>construido)
		return seleccionado;
	else
		return construido;
}

function edificiosSeleccionados() {
	casitas = 0;
	for (var i = 0; i < edificiosConstruidos.length; i++) {
		var seleccionados	 = document.getElementById("xx_txt_costo_edificio_estrella_seleccionada_" + i).value;
		if (seleccionados>-1)
			casitas += seleccionados - edificiosConstruidos[i];
	}
	if (casitas!=0);
		document.getElementById("panel").innerHTML += `&nbsp;<nobr><span class="sprite-recurso absmiddle">
		                                               <img style="width: 15px;height: 13px" src="//images.empire-strike.com/v2/iconos/icon_ciudad.gif" >
		                                               </span><span>${casitas}</span></nobr>`
}

function valorCiudad(){
	valorCiudad = 0;
	for (var i = 0; i < costosTotales.length; i++) {
		if (edificiosConstruidos[i]!=-1){	
			var edificio = costosTotales[i][edificiosConstruidos[i]];
			costo = edificio["oro"] + edificio["material"] * ValorRecursos[edificio["recurso"].toUpperCase()];
			valorCiudad += costo;
		}
	
	}
	console.log("el valor de la ciudad es: "+valorCiudad);
}
