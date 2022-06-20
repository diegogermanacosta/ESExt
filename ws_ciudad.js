class edificio{
	constructor(id){
		this.id = id;
		this.nombre=null;
		this.construido=-1;
		this.costosIniciales=null;
		this.produccion=0;
		this.seleccionado=-1;
	}
}
var dataCiudad= new Array();
var produccionCiudad        = {};
var masRentable             = 99990;
var masRentableI            = 99990;
var rBase					= 1;
var kTurnos					= 4000;
var k_P						= 1;
var terreno;

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

var pobla = document.getElementById("poblacionciudad").innerText.trim();
pobla = pobla  .replace(".", "");
pobla = parseInt(pobla);

function ciudad(){
	

	window.addEventListener("keydown", function (event) { 
		if (event.key==' '){
			document.getElementById("frm_edificios").submit();
		}
	});
	document.getElementById('flotante').style.left="35%";
	
	var _edificios= parseInt($(document.querySelector("#contenido > div.ciudad_info > div:nth-child(3) > span")).text());

	
	if (LOCAL.getPacifico())
	    k_P = 1.2;

	if(LOCAL.getPoliticas()!=null){
		let politicas  = LOCAL.getPoliticas();
		    multiplicador.KARMA    = 1+0.05*politicas.losdioses[1];
		    multiplicador.MANA     = 1+0.05*politicas.magiaarcana[1];
		    multiplicador.PIEDRA   = 1+0.02*(politicas.arquitectura[1]+politicas.esclavitud[1]);
		    multiplicador.BLOQUES  = 1+0.02*politicas.arquitectura[1];
		    multiplicador.MADERA   = 1+0.02*(politicas.esclavitud[1]/2+politicas.naturaleza[1]);
		    multiplicador.AGUA     = 1+0.01*politicas.lamujer[1];
		    multiplicador.TABLAS   = 1+0.02*politicas.naturaleza[1];
		    multiplicador.ALIMENTOS= 1+0.01*politicas.lamujer[1];
		    multiplicador.PLATA    = 1+0.02*politicas.profundidadcuevas[1];
		    multiplicador.HIERRO   = (1+0.02*politicas.profundidadcuevas[1])*(1+0.02*politicas.esclavitud[1]);
		    multiplicador.MITHRIL  = 1+0.01*politicas.profundidadcuevas[1];
		    multiplicador.ORO      = (1+(0.02*politicas.burguesia[1]))*(1-(0.02*politicas.aduanas[1]))*(1-(0.02*politicas.nobleza[1]));
	}

	if (LOCAL.getImperio().clan==null)
		rBase=0;
	//Valores de produccion base de cada edificio
	
	//CALCULO EFICIENCIA EN TERRENO
	var subtitulo    = $(".subtitulo").text();
	var inicioCadena = subtitulo.indexOf(":")+2;
	var finCadeba    = subtitulo.indexOf(";")
	terreno      = subtitulo.substring(inicioCadena,finCadeba);
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
	var felicidad = 1;
	if(document.querySelector("#acciones_ciudad_wrapper > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1) > div").children.length!=2)
		if(document.querySelector("#acciones_ciudad_wrapper > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1) > div").children[2].textContent.split(':')[0]=='Felicidad')
			felicidad = 1.2;
	$("#tablaproduccion tr").each(function(index,obj){
		switch(index){
			case 0:
				produccionCiudad.turnos       = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
				produccionCiudad.hierro       = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
				produccionCiudad.herramientas = parseInt($(obj.children[5]).text().replace(/\./g,"").trim());
				produccionCiudad.armas        = parseInt($(obj.children[7]).text().replace(/\./g,"").trim());
			break;
			case 1:
				produccionCiudad.mana    = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
				produccionCiudad.piedra  = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
				produccionCiudad.bloques = parseInt($(obj.children[5]).text().replace(/\./g,"").trim());
			break;
			case 2:
				produccionCiudad.karma  = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
				produccionCiudad.madera = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
				produccionCiudad.tablas = parseInt($(obj.children[5]).text().replace(/\./g,"").trim());
			break;
			case 3:
				produccionCiudad.oro       = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
				produccionCiudad.mithril   = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
				produccionCiudad.reliquias = parseInt($(obj.children[5]).text().replace(/\./g,"").trim());
			break;
			case 4:
				produccionCiudad.alimentos = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
				produccionCiudad.plata     = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
				produccionCiudad.joyas     = parseInt($(obj.children[5]).text().replace(/\./g,"").trim());
			break;
			case 5:
				produccionCiudad.agua    = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
				produccionCiudad.gemas   = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
				produccionCiudad.cristal = parseInt($(obj.children[5]).text().replace(/\./g,"").trim());
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
		var idCiudad = parseInt($(".tituloimperio").text().split("#")[1]);
		for (var i = 0; i < ciudades.length; i++){
			if(ciudades[i].idCiudad==idCiudad){
				ciudades[i].cargada=true;
				LOCAL.setCiudad(ciudades);
			}
		}
	}
	GLOBAL.cargaImperio();
}

function renta_edif_base (costoOro,costoMat,recurso,nombre){
	var costo = costoOro + costoMat * MINIMOS[recurso];
	var produccion = PRODUCCION_BASE[nombre];
	
	if(produccion!=null)
		return  (costo / (produccion[0]*MINIMOS[produccion[1]]*multiplicador[produccion[1]] ));
	else
		return costo;
}
var edificiosConstruidos = new Array();
var costosTotales = new Array();

function ciudad_process(){
	if($(".c .nome").length == 0)
		return;
	UTIL.injectCode("base/setvalueedif.js");
	setTimeout(() => {
		//Time out para la lectura de los edificios
		var costosIniciales      = JSON.parse($("#valoresEdificio").val());
		var recursosActuales     = JSON.parse($("#recursosActuales").val());
		var recursosUsados       = JSON.parse($("#recursosActuales").val());
		edificiosConstruidos = new Array();
		ciudad_cleanUsados(recursosUsados);
		var edificios = new Array();
		$(".c .nome").each(function(index, obj){
			var nombre = $(obj).text().trim().replace(" ","").replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u").toLowerCase();
			edificios.push(nombre);
			edificiosConstruidos.push(-1)
		});
		costosTotales = new Array();
		for(var i = 0; i < edificios.length; i++){
			var oroInicial      = costosIniciales[i][0];
			var materialInicial = costosIniciales[i][1];
			var nombreRecurso   = costosIniciales[i][2];
			var renta           = renta_edif_base(oroInicial,materialInicial,nombreRecurso.toUpperCase(),edificios[i]);
			var costo           = new Array();
			for (var j=1; j <=10; j++){
				costo.push({ oro: ciudad_calcular(oroInicial, j), material: ciudad_calcular(materialInicial, j), recurso: nombreRecurso, rentabilidad: renta*j});
			}
			costosTotales.push(costo);
		}

		ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
		$(".estrella").each(function(index, obj){
			$(obj).mouseenter(function(){
				ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); 
			});
			$(obj).click(function(){ 
				masRentable = 99990
				ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); 
				ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
			});
		});

		$(".elim").each(function(index, obj){
			$(obj).click(function(){ ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); });
		//  $(obj).hover(function(){ ciudad_recalcular(costosTotales, recursosActuales, recursosUsados); });
		});
		$(".edificios img:not(.estrella):not(.elim):not(._ayuda):not(.ayuda)").each(function(index, obj){
			var id          = obj.id;
			var estrella    = parseInt(id.replace("edificio_estrella_", ""));
			var edificio    = Math.floor(estrella / 10);
			var nroEdificio = estrella % 10;

			if(nroEdificio > edificiosConstruidos[edificio])
				edificiosConstruidos[edificio] = nroEdificio;
		});

		ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
	},200);
}

function ciudad_cleanUsados(recursosUsados){
	for(var key in recursosUsados)
		recursosUsados[key] = 0;
}

function ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos){
	ciudad_cleanUsados(recursosUsados);
	if($("#panel").html() == ""){
		ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
		return;
	}
	var costeOro = parseInt($("#panel #costeoro").html().trim());
	recursosUsados["ORO"] = costeOro;

	$("#panel [id*='coste']:not(#costeoro)").each(function(index, obj){
		var nombre = obj.id.replace("coste", "");
		var costo = parseInt($(obj).html().trim());
		recursosUsados[nombre.toUpperCase()] = costo;
	});
	ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
}

function ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos){
	$(".estrella").each(function(index, obj){
		if(obj.src == "https://images.empire-strike.com/v2/interfaz/estrella-roja.png"){
			return;
		}
		
		var estrella      = parseInt(obj.id.replace("edificio_estrella_",""));
		var edificio      = Math.floor(estrella/10);
		var nroEdificio   = estrella % 10;
		
		if (obj.src == "https://images.empire-strike.com/v2/interfaz/estrella-amarilla.png") {
			if(nroEdificio > edificiosConstruidos[edificio])
				edificiosConstruidos[edificio] = nroEdificio;
			return
		}

		var s             	= $(this).data('attr').split(',');
		var multiplicador 	= parseInt(s[3]);
		var costoOro 		= costosTotales[edificio][nroEdificio].oro*multiplicador;
		var costoMat 		= costosTotales[edificio][nroEdificio].material*multiplicador;
		var recurso  		= costosTotales[edificio][nroEdificio].recurso.toUpperCase();
		var renta    		= costosTotales[edificio][nroEdificio].rentabilidad;

		var edificioContruid = edificiosConstruidos[edificio];
		var construidoOro    = edificioContruid = -1 ? 0 : costosTotales[edificio][edificioContruid].oro*multiplicador;
		var construidoMat    = edificioContruid = -1 ? 0 : costosTotales[edificio][edificioContruid].material*multiplicador;

		if((recursosActuales["ORO"] - recursosUsados["ORO"]) >= (costoOro - construidoOro) && (recursosActuales[recurso] - recursosUsados[recurso]) >= (costoMat - construidoMat)){
			obj.src = chrome.runtime.getURL('base/estrella-verde.png');
			if(renta<=masRentable){
				masRentable=renta;
				obj.src = chrome.runtime.getURL('base/estrella-azul.png');
			}
		}else{
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

function get_clan_cantidad(partida){
	switch(partida) {
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
}
ciudad();
