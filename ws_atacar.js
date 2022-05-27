function atacar()
{
	if(LOCAL.getImperio() == null)
		return;

	var ataque = {
		"guid": LOCAL.getImperio().guidImperio,
		"partida": GLOBAL.getPartida(),
		"ronda": GLOBAL.getRonda(),
		"nombreCiudad": $("#ataque-def #nombreheroed").html().trim(),
		"perdidasAtaque": parseInt($("#ataque-ata #perdidasheroe").html().trim().replace(".","").replace(",","")),
		"perdidasDefensa": parseInt($("#ataque-def #perdidasheroed").html().trim().replace(".","").replace(",","")),
		"atacante": new Array(),
		"defensor": new Array(),
		"bonus": new Array(),
		"round": new Array()
	};

	var asedio = LOCAL.getAsedioByName(ataque.nombreCiudad);
	if(asedio != null && asedio.marcado)
	{
			asedio.marcado = false;
			LOCAL.setAsedio(asedio);
	}

	$(".lista1 tr:has(td.atacante)").each(function(index, obj){
			var nivel = parseInt($($(obj.children[1]).contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[0]).text().trim().replace("N",""));
			var nombre = $(obj.children[1]).find("span").text();
			var inicio = parseInt($(obj.children[2]).html().trim());
			var porcentaje = parseInt($(obj.children[3]).html().trim().replace("%",""));
			var fin = parseInt($(obj.children[4]).html().trim());

			ataque.atacante.push(atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin));
	});

	$(".lista1 tr:has(td.defensor)").each(function(index, obj){
		var nivel = parseInt($($(obj.children[1]).contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[0]).text().trim().replace("N",""));
		var nombre = $(obj.children[1]).find("span").text();
		var inicio = parseInt($(obj.children[2]).html().trim());
		var porcentaje = parseInt($(obj.children[3]).html().trim().replace("%",""));
		var fin = parseInt($(obj.children[4]).html().trim());

		ataque.defensor.push(atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin));
	});

	$("#rra .bonus_ataque").each(function(index,obj){
		var bonus= obj.className + $(obj).text();
		console.log("tu bonus es: "+ bonus);
		ataque.bonus.push(bonus);
	});
	
	$("#rra .round").each(function(index,obj){
		console.log($(obj).text());
		ataque.round.push($(obj).text());
	});
	var ataques = new Array();
	if(LOCAL.getAtaques()!=null)
		ataques=LOCAL.getAtaques();
	ataques.push(ataque)
	LOCAL.setAtaque(ataques);
	//API.setAtaque(ataque);



}

function atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin)
{
	return {
		"nombre": nombre,
		"nivel": nivel,
		"inicio": inicio,
		"porcentaje": porcentaje,
		"fin": fin
	};
}
