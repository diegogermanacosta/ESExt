function informes()
{
	LOCAL.cleanAsedios();
	var informes = new Array();
	$(".lista1 tr[id*='tr']").each(function(index, obj){

		var idReporte = obj.id.replace("tr","");
		var tipo = $(obj.children[0]).html().trim();
		var horario = $(obj.children[1]).html().trim();
		var haceDD = parseInt(horario.match(/\d?\dd/g) == null ? 0 : horario.match(/\d?\dd/g)[0].substring(0,2));
		var haceHH = parseInt(horario.match(/\d?\dh/g) == null ? 0 : horario.match(/\d?\dh/g)[0].substring(0,2));
		var haceMM = parseInt(horario.match(/\d?\dm/g) == null ? 0 : horario.match(/\d?\dm/g)[0].substring(0,2));

		informes.push({
			"idReporte": idReporte,
			"tipo": tipo,
			"haceDD": haceDD,
			"haceHH": haceHH,
			"haceMM": haceMM
		});
	});

	setInterval(function()
	{
		for(var i = 0; i < informes.length; i++)
		{
			var idReporte = "#d" + informes[i].idReporte;
			if($(idReporte).children().length == 0)
				continue;

			generateInforme(idReporte + " tr:not(.done):not(.extension)", informes[i].tipo, informes[i].haceDD, informes[i].haceHH, informes[i].haceMM);
		}
	}, 1000);
}

function informes_updateInformation(ataques)
{
	$("tr.getAtaque").each(function(index, obj)
	{
		var idCiudad = parseInt($(obj.children[0]).find("div").find("strong").html().split("#")[1]);

		if(ataques[idCiudad] == undefined || ataques[idCiudad].length == 0)
			return;

		$(obj.children[0]).find("div").append(generateHTMLTropasIcon(idCiudad, ataques[idCiudad]));

		$(obj).removeClass("getAtaque");
	});

	UTIL.injectCode(function() {
		$('.ayudaExt').tooltip();
	});
}

function generateInforme(selector, tipoInforme, haceDD, haceHH, haceMM)
{
	var ciudades = new Array();
	var endReport = false;
	$(selector).each(function(index, obj)
	{
		$(obj).addClass("done")

		if(endReport)
			return;

		if(index == 0)
			return;

		if($(obj.children[0]).html().trim() == "Héroe" || $(obj.children[0]).html().trim() == "Héroe atacado")
		{
			endReport = true;
			return;
		}

		$(obj).addClass("getAtaque")

		var positionAtaque, positionTropas;
		var positionPorcentaje, positionCiudad;
		var positionMarcar, positionRegion;
		switch(tipoInforme.toUpperCase())
		{
			case "ASEDIO":
			case "RECONQUISTA":
			case "CONTRAATAQUE":
				positionAtaque = obj.children[5];
				positionTropas = obj.children[2];
				positionPorcentaje = obj.children[1];
				positionCiudad = obj.children[0];
				positionMarcar = obj.children[4];
				positionRegion = obj.children[3];
			break;
			case "REGIONES":
				positionAtaque = obj.children[7];
				positionTropas = obj.children[6];
				positionPorcentaje = obj.children[2];
				positionCiudad = obj.children[0];
				positionMarcar = obj.children[8];
				positionRegion = $(obj.parentElement.parentElement.parentElement).find("h2");
			break;
		}

		var horaAtaque = $(positionAtaque).text().trim();
		if(horaAtaque == "Sin info" || horaAtaque == "En protección")
			return;

		if($(positionPorcentaje).html().trim().replace(",",".").replace("%","") == "Fuera de Rango")
			return;

		var region = parseInt($(positionRegion).html().trim().split("#")[1]);
		var imperio = $(positionCiudad).text().split("Ciudad")[0].trim();
		var ciudad = $(positionCiudad).find("div").find("strong").html() + " #" + region;
		var poblacion = (parseFloat($(positionCiudad).text().split("Población:")[1]) / 1000).toFixed(1) + "k";
		var idCiudad = parseInt($(positionCiudad).find("div").find("strong").html().split("#")[1]);
		ciudades.push(idCiudad);

		obj.id = "ciudad_" + idCiudad

		var asedio = LOCAL.getAsedio(idCiudad);
		var marcado = asedio != null && asedio.marcado;
		
		if(GLOBAL.generateAsedios())
		{
			$(positionMarcar).append("<b><a class='marcarAsedio_" + idCiudad + "' style='font-size: 13px; text-decoration: none; color: " + (marcado ? "#990000" : "#006400") + "'>" + (marcado ? "[Desmarcar]" : "[Marcar]") + "</a></b>");
			$(positionMarcar).find("a").click(function(){ marcarAsedio(idCiudad); });
		}

		var porcentaje = parseFloat($(positionPorcentaje).html().trim().replace(",",".").replace("%",""));
		if(porcentaje > 2)
			$(positionPorcentaje).html("<b style='color:#990000'>" + porcentaje.toString().replace(".",",") + "%</b>");

		var tropas = parseInt($(positionTropas).text().trim());
		tropas = tropas < 500 ? "2500" : Math.floor(tropas / 0.9).toString();

		$(positionTropas).append("<br><span style='font-size:11px'><b style='color:#990000'>" + tropas + "</b></span>");

		var dd = parseInt(horaAtaque.match(/\d?\dd/g) == null ? 0 : horaAtaque.match(/\d?\dd/g)[0].substring(0,2));
		var hh = parseInt(horaAtaque.match(/\d?\dh/g) == null ? 0 : horaAtaque.match(/\d?\dh/g)[0].substring(0,2));
		var mm = parseInt(horaAtaque.match(/\d?\dm/g) == null ? 0 : horaAtaque.match(/\d?\dm/g)[0].substring(0,2));

		var proxAtaque = new Date();
		proxAtaque = proxAtaque.addDays(-dd);
		proxAtaque = proxAtaque.addHours(-hh);
		proxAtaque = proxAtaque.addMinutes(-mm);
		proxAtaque = proxAtaque.addHours(GLOBAL.getHorasProteccion());

		proxAtaque = proxAtaque.addDays(-haceDD);
		proxAtaque = proxAtaque.addHours(-haceHH);
		proxAtaque = proxAtaque.addMinutes(-haceMM);

		if(proxAtaque > new Date())
			$(positionAtaque).append("<br><span style='font-size:11px'>Atacar a las <b>" + proxAtaque.formatDate() + "</b></span>");
		else
		{
			if(proxAtaque.timeElapsed() <= _dayInMilisecond)
				$(positionAtaque).append("<br><span style='font-size:11px'>Sin prot. hace <b style='color:#990000'>" + UTIL.formatTime(proxAtaque.timeElapsed()) + "</b></span>");
			else
				$(positionAtaque).append("<br><span style='font-size:11px; color:#990000'><b>Sin protección</b></span>");
		}

		addAsedio(imperio, ciudad, idCiudad, poblacion, porcentaje, tropas, proxAtaque, asedio == null ? false : asedio.marcado);
	});

	if(ciudades.length != 0)
		API.getAtaques(ciudades, informes_updateInformation);
}

function informes_activos()
{
	LOCAL.cleanAsedios();
	var url = document.URL;
	var tipoInforme = "";

	if(url.indexOf(_WS_ESPIONAJEASEDIO) != -1)
	 	tipoInforme = "ASEDIO";
  else if(url.indexOf(_WS_ESPIONAJEREGIONES) != -1)
		tipoInforme = "REGIONES";
	else if(url.indexOf(_WS_ESPIONAJERECONQUISTA) != -1)
		tipoInforme = "RECONQUISTA";
	else if(url.indexOf(_WS_ESPIONAJECONTRAATAQUE) != -1)
		tipoInforme = "CONTRAATAQUE";

	generateInforme(".lista1 tr", tipoInforme, 0, 0, 0)
}

function marcarAsedio(idCiudad)
{
	var asedio = LOCAL.getAsedio(idCiudad);

  var marcado = $(".marcarAsedio_" + idCiudad).first().text() == "[Desmarcar]";
	$(".marcarAsedio_" + idCiudad).each(function(index, obj){
		if(marcado)
		{
			$(obj).css("color", "#006400");
			$(obj).text("[Marcar]");
		}
		else
		{
			$(obj).css("color", "#990000");
			$(obj).text("[Desmarcar]");
		}
	})

	asedio.marcado = !marcado;
	LOCAL.setAsedio(asedio);
}

function addAsedio(imperio, ciudad, idCiudad, poblacion, porcentaje, tropas, proxAtaque, marcado)
{
	LOCAL.setAsedio({
		"imperio": imperio,
		"ciudad": ciudad,
		"idCiudad": idCiudad,
		"poblacion": poblacion,
		"porcentaje": porcentaje,
		"tropas": tropas,
		"hora": proxAtaque.formatDate(),
		"fecha": proxAtaque,
		"marcado": marcado,
		"partida": GLOBAL.getPartida()
	});
}
