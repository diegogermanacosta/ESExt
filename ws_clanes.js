function clanes() {
    if (LOCAL.getImperio() == null) {
        return;
    }

    let nombreClan = "";
    if (document.querySelectorAll("#datosclan tr:first td").length >= 2) {
        nombreClan = document.querySelectorAll("#datosclan tr:first td")[2].innerHTML.match(/\(...\)/g)[0].replace("(", "").replace(")", "");
    }

    let imperios = [{
        "guid": LOCAL.getImperio().guidImperio,
        "partida": GLOBAL.getPartida(),
        "ronda": GLOBAL.getRonda(),
        "clan": nombreClan
    }];

    document.querySelectorAll("#imperios tr").forEach(function (obj, index) {
        if (index === 0) {
            return;
        }
        let nombre = obj.children[1].textContent.trim();
        let isLider = window.getComputedStyle(obj.children[1]).fontWeight === "bold";
        let id = parseInt(nombre.split("#")[1]);

        if (!isNaN(id)) {
            imperios.push({
                "idImperio": id,
                "partida": GLOBAL.getPartida(),
                "ronda": GLOBAL.getRonda()
            });
        }
    });
    API.getClan(imperios, clanes_updateInformation);
}

function clanes_updateInformation(data) {
    if (data == null) {
        return;
    }
    if (recursos.length === 0) {
        GLOBAL.showError("La extensión no actualizo el clan al que perteneces, por favor navega a la página de tu <a href='/tuimperio.php'>Imperio</a>");
        return;
    }
    for (let i = 0; i < data.length; i++) {
        document.querySelector("#i" + data[i].id + " > :nth-child(2)").appendChild(clanes_generateIconRecursos(data[i]));
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].ciudades.length > 0) {
            document.querySelector("#i" + data[i].id + " > :nth-child(4)").appendChild(clanes_generateIconCiudades(data[i]));
        }
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].heroes.length > 0) {
            document.querySelector("#i" + data[i].id + " > :nth-child(5)").appendChild(clanes_generateIconHeroe(data[i]));
        }
    }
    UTIL.injectCode("ayuda.js");
}

function clanes_generateIconRecursos(data)
{
	return "<img src='" + chrome.runtime.getURL('base/list.png') + "' class='ayuda ayudaExt' style='padding-left: 10px' width='13' height='13' data-tooltip-type='html' data-tooltip-html='#_tabrec" + data.id + "'> " + clanes_generateTablaRecursos(data.recurso);
}

function clanes_generateIconCiudades(data)
{
	return "<img src='" + chrome.runtime.getURL('base/house.png') + "' class='ayuda ayudaExt' style='padding-left: 10px' width='13' height='13' data-tooltip-type='html' data-tooltip-html='#_tabciu" + data.id + "'> " + clanes_generateTablaCiudades(data);
}

function clanes_generateIconHeroe(data)
{
	return "<img src='" + chrome.runtime.getURL('base/hero.png') + "' class='ayuda ayudaExt' style='padding-left: 10px' width='13' height='13' data-tooltip-type='html' data-tooltip-html='#_tabhero" + data.id + "'> " + clanes_generateTablaHeroe(data);
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
