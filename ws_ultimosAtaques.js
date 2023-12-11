function ultimoAtaques()
{
	document.querySelectorAll(".lista1 tr td:nth-child(5)").forEach(function (obj, index) {
	    if (index === 0) {
	        return;
	    }
	    var value = obj.textContent.trim();
	    var proteccion = GLOBAL.getHorasProteccion();
	    var dd = parseInt(value.match(/\d?\dd/g) == null ? 0 : value.match(/\d?\dd/g)[0].substring(0, 2));
	    var hh = parseInt(value.match(/\d?\dh/g) == null ? 0 : value.match(/\d?\dh/g)[0].substring(0, 2));
	    var mm = parseInt(value.match(/\d?\dm/g) == null ? 0 : value.match(/\d?\dm/g)[0].substring(0, 2));
	    var proxAtaque = new Date();
	    proxAtaque = proxAtaque.addDays(-dd);
	    proxAtaque = proxAtaque.addHours(-hh);
	    proxAtaque = proxAtaque.addMinutes(-mm);
	    proxAtaque = proxAtaque.addHours(proteccion);
	    if (proxAtaque > new Date()) {
	        obj.insertAdjacentHTML("beforeend", "<br><span style='font-size:11px'>Atacar a las <b>" + proxAtaque.formatDate() + "</b></span>");
	    } else {
	        if (proxAtaque.timeElapsed() <= _dayInMilisecond) {
	            obj.insertAdjacentHTML("beforeend", "<br><span style='font-size:11px'>Sin prot. hace <b style='color:#990000'>" + UTIL.formatTime(proxAtaque.timeElapsed()) + "</b></span>");
	        } else {
	            obj.insertAdjacentHTML("beforeend", "<br><span style='font-size:11px'><b>Información obsoleta</b></span>");
	        }
	    }
	});

	var ciudades = new Array();

	document.querySelectorAll(".lista1 tr").forEach(function (obj, index) {
	    if (index === 0) {
	        return;
	    }
	    var idCiudad = parseInt(obj.children[1].querySelector("div strong").textContent.split("#")[1]);
	    var exists = false;
	    for (var i = 0; i < ciudades.length; i++) {
	        if (ciudades[i] == idCiudad) {
	            exists = true;
	            break;
	        }
	    }
	    if (!exists) {
	        ciudades.push(idCiudad);
	    }
	});

	if(ciudades.length != 0)
		API.getAtaques(ciudades, ultimoAtaques_updateInformation);
}

function ultimoAtaques_updateInformation(ataques) {
    document.querySelectorAll(".lista1 tr").forEach(function (obj, index) {
        if (index === 0) {
            return;
        }
        var idCiudad = parseInt(obj.children[1].querySelector("div strong").textContent.split("#")[1]);

        if (ataques[idCiudad] == undefined || ataques[idCiudad].length == 0) {
            return;
        }
        obj.children[1].querySelector("div strong").insertAdjacentHTML("beforeend", generateHTMLTropasIcon(idCiudad, ataques[idCiudad]));
    });
    UTIL.injectCode(function () {
        document.querySelectorAll('.ayudaExt').forEach(function (element) {
            element.addEventListener('mouseover', function () {
                // Lógica de tooltip (si es necesario) al pasar el ratón sobre '.ayudaExt'
            });
        });
    });
}


function generateHTMLTropasIcon(idCiudad, ataques)
{
	return "<img src='https://images.empire-strike.com/v2/iconos/icon_prepararataque.png' class='ayuda ayudaExt' style='padding-left: 10px' width='13' height='15' data-tooltip-type='html' data-tooltip-html='#_atk_" + idCiudad + "'>" + generateHTMLTropas(idCiudad, ataques);
}

function generateHTMLTropas(idCiudad, ataques)
{
	var tabla = "<table id='_atk_" + idCiudad + "' class='extension' style='display: none; border: 1px'><tbody>";
	for(var i = 0; i < ataques.length; i++)
	{
		var ataque = ataques[i];
		tabla += "<tr class='extension'><td colspan=5 style='padding: 5px;'>" + generateVictoryIcon(ataque.ganadorAtacante) + "ATACANTE: " + ataque.atacante + " (" + calculateMaxTropas(ataque.tropasAtacante) + " tropas)</td></tr>"
		for(var j = 0; j < ataque.tropasAtacante.length; j++)
			tabla += generateTropa(ataque.tropasAtacante[j], j != ataque.tropasAtacante.length - 1);

	  tabla += "<tr class='extension'><td colspan=5></td></tr>";

		tabla += "<tr class='extension'><td colspan=5 style='padding: 5px;'>" + generateVictoryIcon(!ataque.ganadorAtacante) + "DEFENSOR: " + ataque.defensor + " (" + calculateMaxTropas(ataque.tropasDefensor) + " tropas)</td></tr>";
		for(var j = 0; j < ataque.tropasDefensor.length; j++)
				tabla += generateTropa(ataque.tropasDefensor[j], j != ataque.tropasDefensor.length - 1);

		tabla += "<tr class='extension'><td colspan=5 style='padding: 5px; text-align: right'>Hace " + ataque.atacadoHace + "</td></tr>";
		tabla += "<tr class='extension'><td colspan=5 style='" + (i != ataques.length - 1 ? "border-bottom: grey solid 1px;" : "") + "'></td></tr>";
	}
	tabla += "</tbody></table>";

	return tabla;
}

function calculateMaxTropas(ataques)
{
	var sum = 0;
	for(var j = 0; j < ataques.length; j++)
		sum += ataques[j].inicio * ataques[j].nivel;
	return sum;
}

function generateVictoryIcon(isWinner)
{
	if(isWinner)
		return "<img src='https://images.empire-strike.com/v2/iconos/icon_correcto.png' alt='Ataque ganado' title='Ataque ganado'>";
	else
		return "<img src='https://images.empire-strike.com/v2/iconos/icon_incorrecto.png' alt='Ataque perdido' title='Ataque perdido'>";
}

function generateTropa(tropa, hasBR)
{
	var tabla = "<tr class='extension' style='font-size: 13px'><td style='width: 35px; padding-left: 10px'>N" + tropa.nivel + "</td><td style='width: 200px'>" + tropa.nombre.substring(0, 25) + "</td><td style='width: 50px'>" + tropa.inicio + "</td><td style='width: 25px;'>" + UTIL.padLeft(tropa.porcentaje, 2, "&nbsp;") + "%</td><td style='width: 50px; padding-left: 5px'>" + tropa.fin + "</td></tr>";
	return tabla;
}
