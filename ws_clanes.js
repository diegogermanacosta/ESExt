function clanes()
{
	// if($("#imperios tr").length == 0)
	// 	return;

	if(LOCAL.getImperio() == null)
		return;

	var nombreClan = "";

	if($("#datosclan tr:first td").length >= 2)
		nombreClan = $($("#datosclan tr:first td")[2]).html().match(/\(...\)/g)[0].replace("(","").replace(")","");

	var imperios = new Array();

	imperios.push({
		"guid": LOCAL.getImperio().guidImperio,
		"partida": GLOBAL.getPartida(),
		"ronda": GLOBAL.getRonda(),
		"clan": nombreClan
	});

	$("#imperios tr").each(function(index, obj) {
		if(index == 0)
			return;

		var nombre = $(obj.children[1]).text().trim();
		var isLider = $(obj.children[1]).css("font-weight") == "bold";
		var id = parseInt(nombre.split("#")[1]);

		if(!isNaN(id))
			imperios.push({
				"idImperio": id,
				"partida": GLOBAL.getPartida(),
				"ronda": GLOBAL.getRonda()
			});
	});

	API.getClan(imperios, clanes_updateInformation);
}

function clanes_updateInformation(data)
{
	if(data == null)
		return;

	if(recursos.length == 0)
	{
		GLOBAL.showError("La extensión no actualizo el clan al que pertences, por favor navega a la pagina de tu <a href='/tuimperio.php'>Imperio</a>");
		return;
	}

	for(var i = 0; i < data.length; i++)
		$($("#i" + data[i].id).children()[1]).append(clanes_generateIconRecursos(data[i]));

	for(var i = 0; i < data.length; i++)
		if(data[i].ciudades.length > 0)
			$($("#i" + data[i].id).children()[3]).append(clanes_generateIconCiudades(data[i]));

	for(var i = 0; i < data.length; i++)
		if(data[i].heroes.length > 0)
			$($("#i" + data[i].id).children()[4]).append(clanes_generateIconHeroe(data[i]));

	UTIL.injectCode("ayuda.js");
}

function clanes_generateIconRecursos(data)
{
	return "<img src='" + chrome.runtine.getURL('base/list.png') + "' class='ayuda ayudaExt' style='padding-left: 10px' width='13' height='13' data-tooltip-type='html' data-tooltip-html='#_tabrec" + data.id + "'> " + clanes_generateTablaRecursos(data.recurso);
}

function clanes_generateIconCiudades(data)
{
	return "<img src='" + chrome.runtine.getURL('base/house.png') + "' class='ayuda ayudaExt' style='padding-left: 10px' width='13' height='13' data-tooltip-type='html' data-tooltip-html='#_tabciu" + data.id + "'> " + clanes_generateTablaCiudades(data);
}

function clanes_generateIconHeroe(data)
{
	return "<img src='" + chrome.runtine.getURL('base/hero.png') + "' class='ayuda ayudaExt' style='padding-left: 10px' width='13' height='13' data-tooltip-type='html' data-tooltip-html='#_tabhero" + data.id + "'> " + clanes_generateTablaHeroe(data);
}

function clanes_generateTablaHeroe(data)
{
	var tabla = "<div id='_tabhero" + data.id + "' style='display: none;'><table><tbody>";

	for(var i = 0; i < data.heroes.length; i++)
	{
		var heroe = data.heroes[i];
		tabla += "<tr><td colspan='9'><table style='margin-top: 5px'><tr>";
		tabla += "<td width='70'>" + heroe.clase + "</td>";
		tabla += "<td width='200'><img src='https://images.empire-strike.com/archivos/level_up.gif' style='margin-right: 10px' width='13' height='15' />" + heroe.nombre + "</td>";
		tabla += "</tr></table></td></tr>";
	}

	tabla += "</tbody></table></div>";

	return tabla;
}

function clanes_generateTablaCiudades(data)
{
	var tabla = "<div id='_tabciu" + data.id + "' style='display: none;'><table><tbody>";

	for(var i = 0; i < data.ciudades.length; i++)
	{
		var ciudad = data.ciudades[i];
		tabla += "<tr><td colspan='9'><table style='margin-top: 5px'><tr>";
		tabla += "<td width='70'>Región #" + ciudad.region + "</td>";
		tabla += "<td width='200'><img src='https://images.empire-strike.com/archivos/icon_ciudad2.gif' style='margin-right: 10px' width='13' height='15' />" + ciudad.nombre + " #" + ciudad.idCiudad + "</td>";
		// if(ciudad.poblacion != null)
		// {
		// 	tabla += "<td width='60'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_poblacion.png' height='16' width='16'> " + ciudad.poblacion + "</td>";
		// 	tabla += "<td width='60'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/fama.png' height='16' width='16'> " + ciudad.fama + "</td>";
		// 	tabla += "<td width='20' style='text-align: right'>" + ciudad.moral + "</td>";
		// }
		// else
		// 	tabla += "<td with='60' style='font-size: 9px'>Sin información</td>";

		tabla += "</tr></table></td></tr>";
	}

	tabla += "</tbody></table></div>";

	return tabla;
}

function clanes_generateTablaRecursos(data)
{
	var tabla = "<div id='_tabrec" + data.id + "' style='display: none;'><table><tbody>";
	tabla += "<tr height='15'><td width='10'><span class='sprite-recurso turnos' title='Turnos'></span></td><td width='150' id='g_turnos' >" + data.turnos + "</td>";
	tabla += "<td width='10'><span class='sprite-recurso karma' title='Karma'></span></td><td width='150' id='g_karma' >" + data.karma + "</td></tr>";
	tabla += "<tr height='15'><td width='10'><span class='sprite-recurso oro' title='Oro'></span></td><td width='150' id='g_oro' >" + data.oro + "</td>";
	tabla += "<td width='10'><span class='sprite-recurso mana' title='Mana'></span></td><td width='150' id='g_mana' >" + data.mana +"</td></tr>";
	tabla += "<tr height='15'><td colspan='4'>" + "Actualizado hace " + data.horas + "</td></tr>";
	tabla += "</tbody></table></div>";
	return tabla;
}
