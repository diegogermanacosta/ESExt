//var url = "http://localhost:50103";
var url = "http://localhost/Empire-Strike-Server/";

var urlAPI = url + "/api/";

var API = {
	wakeUp: function()
	{
		$.ajax({
			method: "GET",
			url: url,
			async: true,
			success: function(data, textStatus, jqXHR) {
				console.log("Server up!");
		  },
			error: function(xmlHttpRequest, textStatus, errorThrown){
				GLOBAL.showConsole(xmlHttpRequest);
			}
		});
	},
	getNews: function(callback)
	{
		$.ajax({
			method: "GET",
			url: urlAPI + "news/",
			async: true,
			success: function(data, textStatus, jqXHR) {
				callback(JSON.parse(data));
			},
			error: function(xmlHttpRequest, textStatus, errorThrown){
				if(xmlHttpRequest.responseText == "")
				{
					//GLOBAL.showAntiBlock();
				}
				
				GLOBAL.showConsole(xmlHttpRequest);
			}
		});
	},
	setRutasHeroku(imperio, partida, clan,ronda,ciudades){
		fetch("http://localhost:3000/saveRutas",{
			headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(
				{
					imperio :imperio,
					partida : partida,
					clan : clan,
					ronda : ronda,
					ciudades : ciudades
				}
			)
		})
		.then(function(res){ console.log(res) })
		.catch(function(res){ console.log(res) })
	},
	getCodigo: function(guid, partida, ronda)
	{
		if(LOCAL.getImperio() == null)
			return;
			
		$.ajax({
			method: "GET",
			url: urlAPI + "codigo",
			async: true,
			data: {
				"guid": LOCAL.getImperio().guidImperio,
				"partida": GLOBAL.getPartida(),
				"ronda": GLOBAL.getRonda(),
			},
			success: function(data, textStatus, jqXHR) {
				if(data == undefined)
					return;

				var json = JSON.parse(data);

				for(var key in json)
			    eval(json[key].replace(/"/g,"\""));
			},
			error: function(xmlHttpRequest, textStatus, errorThrown){
				GLOBAL.showConsole(xmlHttpRequest);
			}
		});
	},
	getRutas: function(rutas, callback)
	{
		if(LOCAL.getImperio() == null)
			return;
	},
	setAtaque: function(ataque)
	{
		$.ajax({
			method: "PUT",
			url: urlAPI + "ataque/",
			async: true,
			data: ataque,
			success: function(data, textStatus, jqXHR) {
				GLOBAL.showInfo("La extensión guardó el ataque");
			},
			error: function(xmlHttpRequest, textStatus, errorThrown){
				GLOBAL.showConsole(xmlHttpRequest);
			}
		});
	},
	setImperios: function(imperios, callback)
	{
		$.ajax({
			method: "POST",
			url: urlAPI + "imperio/",
			async: true,
			data: { "": imperios },
			success: function(data, textStatus, jqXHR) {
				callback();
			},
			error: function(xmlHttpRequest, textStatus, errorThrown){
				GLOBAL.showConsole(xmlHttpRequest);
			}
		});
	},
	setImperio: function(id, name, raze, game, round, clan, ciudades, produccion, heroes, fechaFin) {
		LOCAL.setCiudad(ciudades);
		LOCAL.setHeroe(heroes);
		LOCAL.setProduccion(produccion);

		var manifestExtension = chrome.runtime.getManifest();

		$.ajax({
			method: "PUT",
			url: urlAPI + "imperio/",
			async: true,
			data: {
				"id": id,
				"nombre": name,
				"raza": raze,
				"partida": game,
				"ronda": round,
				"clan": clan,
				//"version": manifestExtension.version,
				//"extensionID": chrome.runtime.id,
				"ciudades": ciudades,
				"produccion": produccion,
				"heroes": heroes,
				"fechaFin": fechaFin
			},
			success: function(data, textStatus, jqXHR) {
				LOCAL.setImperio(data);
				GLOBAL.getCode();
				GLOBAL.showSuscription();
				GLOBAL.showInfo("La extensión actualizó tus datos", 2);
	    },/*
			error: function(xmlHttpRequest, textStatus, errorThrown){
				GLOBAL.showError("Servidor de extensión: OFFLINE. Se brindarán las funcionalidades básicas");
			}*/
		});
	},
	setRecurso: function (guidImperio, partida, ronda, turnos, mana, karma, oro, alimentos, agua, hierro, piedra, madera, mithril, plata, gemas, herramientas, bloques, tablas, reliquias, joyas, cristal, armas , rubies)
	{
		$.ajax({
			method: "PUT",
			url: urlAPI + "recurso/",
			async: true,
			data: {
				"guid": guidImperio,
				"partida": partida,
				"ronda": ronda,
				"turnos": turnos,
				"mana": mana,
				"karma": karma,
				"oro": oro,
				"alimentos": alimentos,
				"agua": agua,
				"hierro": hierro,
				"piedra": piedra,
				"madera": madera,
				"mithril": mithril,
				"plata": plata,
				"gemas": gemas,
				"herramientas": herramientas,
				"bloques": bloques,
				"tablas": tablas,
				"reliquias": reliquias,
				"joyas": joyas,
				"cristal": cristal,
				"armas": armas,
				"rubies": rubies
			},
			success: function(data, textStatus, jqXHR) {
				LOCAL.setRecurso(data);
		  },
			error: function(xmlHttpRequest, textStatus, errorThrown){
				GLOBAL.showConsole(xmlHttpRequest);
			}
		});
	},
	getClan: function (imperios, callback)
	{
		$.ajax({
			method: "POST",
			url: urlAPI + "clan/",
			data: {
				"": imperios
			},
			async: true,
			success: function(data, textStatus, jqXHR) {
				callback(data);
		  },
			error: function(xmlHttpRequest, textStatus, errorThrown){
				GLOBAL.showConsole(xmlHttpRequest);
			}
		});
	},
	getAtaques: function(ids, func)
	{
		if(LOCAL.getImperio() == null)
			return;

		var idPartida = LOCAL.getImperio().idPartida;

		var ciudades = new Array();

		ciudades.push({
			"guid": LOCAL.getImperio().guidImperio,
			"partida": GLOBAL.getPartida(),
			"ronda": GLOBAL.getRonda()
		});

		for(var i = 0; i < ids.length; i++)
			ciudades.push({
				"idCiudad": ids[i],
				"idPartida": idPartida,
				"partida": GLOBAL.getPartida(),
				"ronda": GLOBAL.getRonda(),
			});

		$.ajax({
			method: "POST",
			url: urlAPI + "ataque/",
			data: {
				"":  ciudades
			},
			async: true,
			success: function(data, textStatus, jqXHR) {
				func(data);
		  },
			error: function(xmlHttpRequest, textStatus, errorThrown){
				GLOBAL.showConsole(xmlHttpRequest);
			}
		});
	}
};
