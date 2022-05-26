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
		"defensor": new Array()
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
	LOCAL.setAtaque(ataque);
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
