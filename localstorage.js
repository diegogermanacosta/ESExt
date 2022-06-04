var LOCAL_IMPERIO = "Imperio";
var LOCAL_RECURSO = "Recurso";
var LOCAL_CIUDADES = "Ciudades";
var LOCAL_POLITICAS= "Politicas";
var LOCAL_HEROES = "Heroes";
var LOCAL_PRODUCCION = "Produccion";
var LOCAL_ASEDIOS = "Asedios";
var LOCAL_VALOR = "Valor";
var LOCAL_POLITICAS = "Politicas";
var LOCAL_GOBERNANTES = "Gobernantes";
var LOCAL_FORMACIONES = "Formaciones";
var LOCAL_PACIFICO = "Pacifico";
var LOCAL_ATACAR = "Atacar";
var LOCAL_EFICIENCIA = "Eficiencia";
var LOCAL_CARGA = "Carga";

var LOCAL = {
	clean: function()
	{
		for(var key in localStorage)
		{
			if(key == LOCAL_ASEDIOS||key==LOCAL_FORMACIONES||key==LOCAL_ATACAR)
				continue;

			localStorage.removeItem(key);
		}
	},
	setValor: function(valor)
	{
		localStorage[LOCAL_VALOR] = valor;
	},
	getValor: function()
	{
		if(localStorage[LOCAL_VALOR] == undefined || localStorage[LOCAL_VALOR] == null)
			return 0;
		else
			return parseInt(localStorage[LOCAL_VALOR]);
	},
	setAsedio: function(asedio)
	{
		var newAsedios = new Array();

		var partida = GLOBAL.getPartida();

		if(localStorage[LOCAL_ASEDIOS] == undefined && localStorage[LOCAL_ASEDIOS] == null)
			localStorage[LOCAL_ASEDIOS] = "[]";

		if(localStorage[LOCAL_ASEDIOS] != undefined && localStorage[LOCAL_ASEDIOS] != null)
		 	currentAsedios = JSON.parse(localStorage[LOCAL_ASEDIOS]);

		var exists = false;
		for(var i = 0; i < currentAsedios.length; i++)
		{
			if(currentAsedios[i].idCiudad == asedio.idCiudad && currentAsedios[i].partida == partida)
			{
				exists = true;

				if(new Date(currentAsedios[i].fecha) <= new Date(asedio.fecha))
					newAsedios.push(asedio);
				else
					newAsedios.push(currentAsedios[i]);

				continue;
			}

			if(new Date(currentAsedios[i].fecha).timeElapsed() <= (_dayInMilisecond * 6))
				newAsedios.push(currentAsedios[i]);
		}

		if(!exists)
			newAsedios.push(asedio);

		localStorage[LOCAL_ASEDIOS] = JSON.stringify(newAsedios);

		GLOBAL.generateAsedios();
	},
	getAsedio: function(idCiudad)
	{
		var partida = GLOBAL.getPartida();

		if(localStorage[LOCAL_ASEDIOS] != undefined && localStorage[LOCAL_ASEDIOS] != null)
		 	currentAsedios = JSON.parse(localStorage[LOCAL_ASEDIOS]);
		else
			return null;

		for(var i = 0; i < currentAsedios.length; i++)
			if(currentAsedios[i].idCiudad == idCiudad && currentAsedios[i].partida == partida)
				return currentAsedios[i];
	},
	getAsedioByName: function(nombreCiudad)
	{
		var partida = GLOBAL.getPartida();

		if(localStorage[LOCAL_ASEDIOS] != undefined && localStorage[LOCAL_ASEDIOS] != null)
		 	currentAsedios = JSON.parse(localStorage[LOCAL_ASEDIOS]);
		else
			return null;

		for(var i = 0; i < currentAsedios.length; i++)
		{
			var temp = currentAsedios[i].ciudad.split("#")[0].trim();
			if(temp == nombreCiudad && currentAsedios[i].partida == partida)
				return currentAsedios[i];
		}
	},
	cleanAsedios: function()
	{
		if(localStorage[LOCAL_ASEDIOS] != undefined && localStorage[LOCAL_ASEDIOS] != null)
			var currentAsedios = JSON.parse(localStorage[LOCAL_ASEDIOS]);
		else
			return;

		var asediosMarcados = new Array();
		for(var i = 0; i < currentAsedios.length; i++)
		{
			if(currentAsedios[i].marcado)
				asediosMarcados.push(currentAsedios[i]);
		}

		localStorage[LOCAL_ASEDIOS] = JSON.stringify(asediosMarcados);
	},
	getAsedios: function()
	{
	  var partida = GLOBAL.getPartida();
		var asedios = [];
		if(localStorage[LOCAL_ASEDIOS] != undefined && localStorage[LOCAL_ASEDIOS] != null)
		 	currentAsedios = JSON.parse(localStorage[LOCAL_ASEDIOS]);
		else
			return asedios;

		for(var i = 0; i < currentAsedios.length; i++)
			if(currentAsedios[i].marcado && currentAsedios[i].partida == partida)
				asedios.push(currentAsedios[i]);

		asedios = asedios.sort(function(a,b){ return new Date(a.fecha) >= new Date(b.fecha); })

		// var now = new Date();
		// for(var i = 0; i < asedios.length; i++)
		// {
		// 	if(asedios[i].marcado && new Date(asedios[i].fecha) > now)
		// 		chrome.runtime.sendMessage({message: "addAsedio", asedio: asedios[i]}, function(response) { console.log("addAsedio - RECIBIDO") });
		// 	else
		// 		chrome.runtime.sendMessage({message: "removeAsedio", asedio: asedios[i]}, function(response) { console.log("removeAsedio - RECIBIDO") });
		// }

		return asedios;
	},
	setImperio: function(obj) {
		if(obj == undefined)
			return null;

		localStorage[LOCAL_IMPERIO] = JSON.stringify(obj);
		return obj;
	},
	getImperio: function() {
		if(localStorage[LOCAL_IMPERIO] == undefined || localStorage[LOCAL_IMPERIO] == null)
			return null;

		return JSON.parse(localStorage[LOCAL_IMPERIO]);
	},
	setCiudad: function(obj)
	{
		if(obj == undefined)
			return null;

		localStorage[LOCAL_CIUDADES] = JSON.stringify(obj);
		return obj;
	},
	getCiudad: function(){
		if(localStorage[LOCAL_CIUDADES] == undefined || localStorage[LOCAL_CIUDADES] == null)
			return null;

		return JSON.parse(localStorage[LOCAL_CIUDADES]);
	},
	setProduccion: function(obj)
	{
		if(obj == undefined)
			return null;

		localStorage[LOCAL_PRODUCCION] = JSON.stringify(obj);
		return obj;
	},
	getProduccion: function(){
		if(localStorage[LOCAL_PRODUCCION] == undefined || localStorage[LOCAL_PRODUCCION] == null)
			return null;

		return JSON.parse(localStorage[LOCAL_PRODUCCION]);
	},
	setHeroe: function(obj)
	{
		if(obj == undefined)
			return null;

		localStorage[LOCAL_HEROES] = JSON.stringify(obj);
		return obj;
	},
	getHeroe: function(){
		if(localStorage[LOCAL_HEROES] == undefined || localStorage[LOCAL_HEROES] == null)
			return null;

		return JSON.parse(localStorage[LOCAL_HEROES]);
	},
	setRecurso: function(obj) {
		if(obj == undefined)
			return null;

		localStorage[LOCAL_RECURSO] = JSON.stringify(obj);
		return obj;
	},
	getRecurso: function() {
		if(localStorage[LOCAL_RECURSO] == undefined || localStorage[LOCAL_RECURSO] == null)
			return null;

		return JSON.parse(localStorage[LOCAL_RECURSO]);
	},
	
	setPoliticas:function(obj){
		localStorage[LOCAL_POLITICAS] = JSON.stringify(obj);
	},
	getPoliticas:function(){
		if(localStorage[LOCAL_POLITICAS] == undefined || localStorage[LOCAL_POLITICAS] == null)
			return null;

	 	return JSON.parse(localStorage[LOCAL_POLITICAS]);
	},

	setGobernantes:function(obj){
		localStorage[LOCAL_GOBERNANTES] = JSON.stringify(obj);
	},
	getGobernantes:function(){
		if(localStorage[LOCAL_GOBERNANTES] == undefined || localStorage[LOCAL_GOBERNANTES] == null)
			return null;

	 	return JSON.parse(localStorage[LOCAL_GOBERNANTES]);
	},

	setFormaciones:function(obj){
		localStorage[LOCAL_FORMACIONES] = JSON.stringify(obj);
	},
	getFormaciones:function(){
		if(localStorage[LOCAL_FORMACIONES] == undefined || localStorage[LOCAL_FORMACIONES] == null)
			return null;

	 	return JSON.parse(localStorage[LOCAL_FORMACIONES]);
	},
		setPacifico:function(obj){
		localStorage[LOCAL_PACIFICO] = JSON.stringify(obj);
	},
	getPacifico:function(){
		if(localStorage[LOCAL_PACIFICO] == undefined || localStorage[LOCAL_PACIFICO] == null)
			return null;

	 	return JSON.parse(localStorage[LOCAL_PACIFICO]);
	},

	setAtaque:function(obj){
		localStorage[LOCAL_ATACAR] = JSON.stringify(obj);
	},

	getAtaques:function(){
		if(localStorage[LOCAL_ATACAR] == undefined || localStorage[LOCAL_ATACAR] == null)
			return null;

	 	return JSON.parse(localStorage[LOCAL_ATACAR]);
	},
	setEficiencia:function(obj){
		localStorage[LOCAL_EFICIENCIA] = JSON.stringify(obj);
	},

	getEficiencia:function(){
		if(localStorage[LOCAL_EFICIENCIA] == undefined || localStorage[LOCAL_EFICIENCIA] == null)
			return null;

	 	return JSON.parse(localStorage[LOCAL_EFICIENCIA]);
	},
	setCarga:function(obj){
		localStorage[LOCAL_CARGA] = JSON.stringify(obj);
	},

	getCarga:function(){
		if(localStorage[LOCAL_CARGA] == undefined || localStorage[LOCAL_CARGA] == null)
			return null;

	 	return JSON.parse(localStorage[LOCAL_CARGA]);
	}
};
