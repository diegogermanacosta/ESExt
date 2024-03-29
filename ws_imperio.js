//GUARDAR NOMBRE IMPERIO e ID
var info = document.querySelector("#contenido .titulo").innerHTML.trim().toUpperCase();
info = info.replace("TU IMPERIO: ", "");
info = info.split("#");
var id = parseInt(info[1]);
var nombre = info[0].trim();
// fin GUARDAR NOMBRE IMPERIO e ID

//CARGA VALOR
var valor = parseInt(document.querySelector(".valor").innerText.replace(".", ""));
if(valor > 0)
	LOCAL.setValor(valor);
//fin CARGA VALOR

var raza = $($("#datos tr td")[2]).html();
var clan = "";
if($($("#datos td")[5]).html().match(/\(...\)/g) != null && $($("#datos td")[5]).html().match(/\(...\)/g).length == 1)
	clan = $($("#datos td")[5]).html().match(/\(...\)/g)[0].replace("(","").replace(")","");

var ciudades = new Array();
var heroes = new Array();
var produccion = {};
var ib = document.querySelector("#datos > tbody > tr:nth-child(3)").outerText.replace('Índice Bélico','').split('%')[0].replace(',','.').trim();

//Formula 0.1*(100 - IB actual)
var ibReducidoAlPaso = 0.1*(100-ib);
var ibAlPaso = (ib - ibReducidoAlPaso).toFixed(1);
if(ibAlPaso < 0)
	ibAlPaso = 0;

var idReducido = parseFloat(ib);
var count = 1;
while(15 <= idReducido){
	idReducido = idReducido - 0.1*(100-idReducido);
	if(15 <= idReducido)
		count++;
}
var pacifico= false;
var descripcionIB = "";
if(raza=="Elfos oscuros"){
	descripcionIB = "Nunca vas a ser Pacifico porque los EOs son Todos Putos"
	if(ibAlPaso<20)
		ibAlPaso =20;
}
else
	if(LOCAL.getValor()<500)
		descripcionIB = `necesitas subir tu valor a 500 para ser pacifico`
	else if(ib>=15)
		descripcionIB = `necesitas ${count} paso(s) para volver a pacifico`
if(ib<=15&&LOCAL.getValor()>500){	
	var iconoP=`<span id="icono_pacifico"> <img src="//images.empire-strike.com/archivos/icon_paz.gif" width="15" height="15" align="absmiddle" hspace="2" title="Eres un imperio Pacífico"></span>`;
	document.querySelector("#datos > tbody > tr:nth-child(3)").innerHTML += (`<td id=ibcount><b>IB al paso:</b> ${ibAlPaso}%${iconoP}</td>`);
	pacifico=true;
}
else
	document.querySelector("#datos > tbody > tr:nth-child(3)").innerHTML += (`<td id=ibcount><b>IB al paso:</b> ${ibAlPaso}%, ${descripcionIB}</td>`);


LOCAL.setPacifico(pacifico);
// OBTENER CIUDADES
var famaProduccion = 0;
$(".lista2:not(:first) tr").each(function(index, obj){
	if(index == 0)
		return;
	if(obj.children.length < 16 ||  obj.children.length > 17)
		return;
	var sinRutas = obj.children.length == 16 ? 1 : 0;
	var idCiudad = $(obj.children[0]).text().trim();
	var nombre = $(obj.children[2]).text().trim();
	var region = $(obj.children[3]).text().trim().replace("#","");
	var poblacion = $(obj.children[4]).text().trim().replace(/\./g,"");
	var oro = $(obj.children[7]).text().trim().replace(/\./g,"");
	var recursos = $(obj.children[8]).text().trim().replace(/\./g,"");
	var edificios = $(obj.children[9]).text().trim();
	var fama = parseInt($(obj.children[5]).text().trim().substring(0, 3));
	var moral = $(obj.children[14 - sinRutas]).text().trim().replace("%","");
	var defensa = obj.children[1].children[0].children[1].src.replace("https://images.empire-strike.com/archivos/sistemas_defensivos/25/","").replace(".jpg","");
	var proteccion = $(obj.children[15 - sinRutas]).text().trim();
	var tropas = $(obj.children[12 - sinRutas]).text().trim().replace(/\./g,"");
	famaProduccion =famaProduccion + parseInt(obj.children[5].innerText.split("+")[1].trim());
	
	if(proteccion == "SP" || proteccion == "CU")
	{
		ciudades.push(imperio_generateCiudad(id, idCiudad, nombre, region, poblacion, edificios, oro, recursos, fama, moral, defensa, tropas, proteccion));
		return;
	}
	var hh = parseInt(proteccion.substring(0,2));
	var mm = parseInt(proteccion.substring(3,5));

	var saleProteccion = new Date();
	saleProteccion = saleProteccion.addHours(hh);
	saleProteccion = saleProteccion.addMinutes(mm);

	ciudades.push(imperio_generateCiudad(id, idCiudad, nombre, region, poblacion, edificios, oro, recursos, fama, moral, defensa, tropas, proteccion));
	$(obj.children[15 - sinRutas]).append("<br><span style='font-size:11px'><b style='color:#990000'>" + saleProteccion.formatDate() + "</b></span>");
});

produccion.fama = famaProduccion;

// OBTENER HEROES
document.querySelectorAll(".lista2")[0].querySelectorAll("tbody tr").forEach(function(obj){

	var nombre = obj.querySelector("strong").innerText.trim();
	var link = obj.querySelector("a").href;
	var clase = obj.children[2].innerText.trim();
	var nivel = parseInt(obj.children[1].innerText.replace(nombre, "").replace("N", "").trim());
	var ataque = obj.children[5].innerText.trim();
	var defensa = obj.children[6].innerText.trim();
	var daño = obj.children[7].innerText.trim();
	var vida = obj.children[8].innerText.trim();
	var velocidad = obj.children[9].innerText.trim();
	var moral = obj.children[10].innerText.trim();
	var energia = obj.children[11].innerText.trim();
	var habilidad = obj.children[13].innerText.trim();
	var victorias  = obj.children[15].innerText.trim();
	var region = obj.children[4].innerText.trim().replace("#", "");
	var tropas = obj.children[14].innerText.trim();

	heroes.push(imperio_generateHeroe(nombre, clase, nivel, ataque, defensa, daño, vida, velocidad, moral, energia, habilidad, victorias, region, tropas, link));

});

// OBTENER PRODUCCION
$("#cuadro_produccion .contenido table tr").each(function(index, obj){
	switch(index){
		case 0:
			produccion.turnos = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.hierro = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.herramientas = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			produccion.armas = parseInt($(obj.children[8]).text().replace(/\./g,"").trim());
			break;
		case 1:
			produccion.mana = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.piedra = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.bloques = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		case 2:
			produccion.karma = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.madera = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.tablas = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		case 3:
			produccion.oro = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.mithril = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.reliquias = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		case 4:
			produccion.alimentos = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.plata = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.joyas = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		case 5:
			produccion.agua = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.gemas = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.cristal = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		default:
			return
	}
});

if(LOCAL.getImperio() == null){
	var imperio = imperio_generateImperio(id, nombre, raza, GLOBAL.getPartida(), GLOBAL.getRonda(), clan, ciudades, produccion, heroes, GLOBAL.getFechaFin(),pacifico);
	LOCAL.setCiudad(ciudades);
	LOCAL.setHeroe(heroes);
	LOCAL.setProduccion(produccion);
	LOCAL.setImperio(imperio)
	API.setRutasHeroku(id,GLOBAL.getPartida(),clan,GLOBAL.getRonda(),ciudades)
	//API.setImperio(id, nombre, raza, GLOBAL.getPartida(), GLOBAL.getRonda(), clan, ciudades, produccion, heroes, GLOBAL.getFechaFin());
}
	else
{
	var update = false;
	var localCiudades = LOCAL.getCiudad();
	var localHeroes = LOCAL.getHeroe();
	var localProduccion = LOCAL.getProduccion();

	if(localCiudades != null && localCiudades.length != ciudades.length)
		update = true;
	else if(localHeroes != null && localHeroes.length != heroes.length)
		update = true;
	else
	{
		if(localHeroes != null && !update)
			for(var i = 0; i < heroes.length; i++)
			{
				var temp = heroes[i];
				var heroe = null;

				for(var j = 0; j < localHeroes.length; j++)
					if(localHeroes[j].nombre == temp.nombre && localHeroes[j].clase == temp.clase)
						{
								heroe = localHeroes[j];
								break;
						}
				if(heroe != null &&
					(temp.nivel != heroe.nivel || temp.victorias != heroe.victorias
						|| temp.habilidad != heroe.habilidad || temp.ataque != heroe.ataque
					 || temp.defensa != heroe.defensa  || temp.daño != heroe.daño || temp.tropas != heroe.tropas
					 || temp.region != heroe.region))
				{
					update = true;
					break;
				}
			}
		if(localCiudades != null && !update)
			for(var i = 0; i < ciudades.length; i++)
			{
				var temp = ciudades[i];
				var ciudad = null;

				for(var j = 0; j < localCiudades.length; j++)
					if(localCiudades[j].idCiudad == temp.idCiudad)
						{
								ciudad = localCiudades[j];
								break;
						}

				if(ciudad != null &&
					(temp.poblacion != ciudad.poblacion || temp.fama != ciudad.fama
						|| temp.moral != ciudad.moral || temp.tropas != ciudad.tropas
					 || temp.edificios != ciudad.edificios  || temp.oro != ciudad.oro))
				{
					update = true;
					break;
				}
			}
	}
	if(update)
		API.setImperio(id, nombre, raza, GLOBAL.getPartida(), GLOBAL.getRonda(), clan, ciudades, produccion, heroes, GLOBAL.getFechaFin());
}
function imperio_generateCiudad(idImperio, idCiudad, nombre, region, poblacion, edificios, oro, recursos, fama, moral, defensa, tropas, proteccion)
{
	return {
		"id": idImperio,
		"idCiudad": idCiudad,
		"nombre": nombre,
		"region": region,
		"poblacion": poblacion,
		"edificios": edificios,
		"oro": oro,
		"recursos": recursos,
		"fama": fama,
		"moral": moral,
		"defensa": defensa,
		"tropas": tropas,
		"proteccion": proteccion,
		"cargada": false,
		"data": null
	}
}

function imperio_generateHeroe(nombre, clase, nivel, ataque, defensa, daño, vida, velocidad, moral, energia, habilidad, victorias, region, tropas, link)
{
	return {
		"nombre" : nombre,
		"clase" : clase,
		"nivel" : nivel,
		"ataque" : ataque,
		"defensa" : defensa,
		"daño" : daño,
		"vida" : vida,
		"velocidad" : velocidad,
		"moral" : moral,
		"energia" : energia,
		"habilidad" : habilidad,
		"victorias" : victorias,
		"region" : region,
		"tropas" : tropas,
		"link"   : link
	}
}

function imperio_generateImperio(id, name, raze, game, round, clan, ciudades, produccion, heroes, fechaFin,pacifico)
{
	return {
				"id": id,
				"nombre": name,
				"raza": raze,
				"partida": game,
				"ronda": round,
				"clan": clan,
				"ciudades": ciudades,
				"produccion": produccion,
				"heroes": heroes,
				"fechaFin": fechaFin,
				"pacifico": pacifico
	}
}
