function informes() {
    LOCAL.cleanAsedios();
    var informes = [];
    document.querySelectorAll(".lista1 tr[id*='tr']").forEach(function (obj) {
        var clan = 0;
        if (obj.children[0 + clan].innerHTML.trim().length > 20) {
            clan = 1;
        }
        var idReporte = obj.id.replace("tr", "");
        var tipo = obj.children[0 + clan].innerHTML.trim();
        var horario = obj.children[1 + clan].innerHTML.trim();
        var haceDD = parseInt(horario.match(/\d?\dd/g) == null ? 0 : horario.match(/\d?\dd/g)[0].substring(0, 2));
        var haceHH = parseInt(horario.match(/\d?\dh/g) == null ? 0 : horario.match(/\d?\dh/g)[0].substring(0, 2));
        var haceMM = parseInt(horario.match(/\d?\dm/g) == null ? 0 : horario.match(/\d?\dm/g)[0].substring(0, 2));

        informes.push({
            "idReporte": idReporte,
            "tipo": tipo,
            "haceDD": haceDD,
            "haceHH": haceHH,
            "haceMM": haceMM
        });
    });

    setInterval(function () {
        for (var i = 0; i < informes.length; i++) {
            var idReporte = "#d" + informes[i].idReporte;
            if (document.querySelector(idReporte).childElementCount === 0) {
                continue;
            }

            generateInforme(idReporte + " tr:not(.done):not(.extension)", informes[i].tipo, informes[i].haceDD, informes[i].haceHH, informes[i].haceMM);
        }
    }, 1000);
}

function informes_updateInformation(ataques) {
    document.querySelectorAll("tr.getAtaque").forEach(function (obj) {
        var idCiudad = parseInt(obj.children[0].querySelector("div strong").innerHTML.split("#")[1]);
        if (ataques[idCiudad] === undefined || ataques[idCiudad].length === 0) {
            return;
        }
        obj.children[0].querySelector("div").appendChild(generateHTMLTropasIcon(idCiudad, ataques[idCiudad]));
        obj.classList.remove("getAtaque");
    });
    UTIL.injectCode(function () {
        document.querySelectorAll('.ayudaExt').forEach(function (element) {
            element.setAttribute('data-tooltip', '');
            new Tooltip(element);
        });
    });
}

function generateInforme(selector, tipoInforme, haceDD, haceHH, haceMM) {
    var ciudades = [];
    var endReport = false;

    document.querySelectorAll(selector).forEach(function (obj, index) {
        obj.classList.add("done");

        if (endReport) {
            return;
        }

        if (obj.children[0].textContent.trim() === "Héroe" || obj.children[0].textContent.trim() === "Héroe atacado") {
            endReport = true;
            return;
        }

        if (index === 0) {
            return;
        }

        obj.classList.add("getAtaque");

        var positionAtaque, positionTropas;
        var positionPorcentaje, positionCiudad;
        var positionMarcar, positionRegion;

        switch (tipoInforme.toUpperCase()) {
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
                positionRegion = obj.closest('tbody').previousElementSibling.querySelector("h2");
                break;
        }

        var horaAtaque = positionAtaque.textContent.trim();
        if (horaAtaque === "Sin info" || horaAtaque === "En protección") {
            return;
        }

        if (positionPorcentaje.innerHTML.trim().replace(",", ".").replace("%", "") === "Fuera de Rango") {
            return;
        }

        var region = parseInt(positionRegion.innerHTML.trim().split("#")[1]);
        var imperio = positionCiudad.textContent.split("Ciudad")[0].trim();
        var ciudad = positionCiudad.querySelector("div strong").innerHTML + " #" + region;
        var poblacion = (parseFloat(positionCiudad.textContent.split("Población:")[1]) / 1000).toFixed(1) + "k";
        var idCiudad = parseInt(positionCiudad.querySelector("div strong").innerHTML.split("#")[1]);
        ciudades.push(idCiudad);

        obj.id = "ciudad_" + idCiudad;

        var asedio = LOCAL.getAsedio(idCiudad);
        var marcado = asedio != null && asedio.marcado;

        if (GLOBAL.generateAsedios()) {
            var marcarAsedioLink = document.createElement("a");
            marcarAsedioLink.classList.add("marcarAsedio_" + idCiudad);
            marcarAsedioLink.style.cssText = "font-size: 13px; text-decoration: none; color: " + (marcado ? "#990000" : "#006400");
            marcarAsedioLink.textContent = (marcado ? "[Desmarcar]" : "[Marcar]");
            marcarAsedioLink.onclick = function () {
                marcarAsedio(idCiudad);
            };
            positionMarcar.appendChild(document.createElement("b").appendChild(marcarAsedioLink));
        }

        var porcentaje = parseFloat(positionPorcentaje.innerHTML.trim().replace(",", ".").replace("%", ""));
        if (porcentaje > 2) {
            positionPorcentaje.innerHTML = "<b style='color:#990000'>" + porcentaje.toString().replace(".", ",") + "%</b>";
        }

        var tropas = parseInt(positionTropas.textContent.trim());
        tropas = tropas < 500 ? "2500" : Math.floor(tropas / 0.9).toString();

        positionTropas.innerHTML += "<br><span style='font-size:11px'><b style='color:#990000'>" + tropas + "</b></span>";

        var dd = parseInt(horaAtaque.match(/\d?\dd/g) == null ? 0 : horaAtaque.match(/\d?\dd/g)[0].substring(0, 2));
        var hh = parseInt(horaAtaque.match(/\d?\dh/g) == null ? 0 : horaAtaque.match(/\d?\dh/g)[0].substring(0, 2));
        var mm = parseInt(horaAtaque.match(/\d?\dm/g) == null ? 0 : horaAtaque.match(/\d?\dm/g)[0].substring(0, 2));

        var proxAtaque = new Date();
        proxAtaque = proxAtaque.addDays(-dd);
        proxAtaque = proxAtaque.addHours(-hh);
        proxAtaque = proxAtaque.addMinutes(-mm);
        proxAtaque = proxAtaque.addHours(GLOBAL.getHorasProteccion());
        proxAtaque = proxAtaque.addDays(-haceDD);
        proxAtaque = proxAtaque.addHours(-haceHH);
        proxAtaque = proxAtaque.addMinutes(-haceMM);

        if (proxAtaque > new Date()) {
            positionAtaque.innerHTML += "<br><span style='font-size:11px'>Atacar a las <b>" + UTIL.formatDate(proxAtaque) + "</b></span>";
        } else {
            if (proxAtaque.timeElapsed() <= _dayInMilisecond) {
                positionAtaque.innerHTML += "<br><span style='font-size:11px'>Sin prot. hace <b style='color:#990000'>" + UTIL.formatTime(proxAtaque.timeElapsed()) + "</b></span>";
            } else {
                positionAtaque.innerHTML += "<br><span style='font-size:11px; color:#990000'><b>Sin protección</b></span>";
            }
        }

        addAsedio(imperio, ciudad, idCiudad, poblacion, porcentaje, tropas, proxAtaque, asedio == null ? false : asedio.marcado);
    });

    if (ciudades.length !== 0) {
        API.getAtaques(ciudades, informes_updateInformation);
    }
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

function marcarAsedio(idCiudad) {
    var asedio = LOCAL.getAsedio(idCiudad);
    var marcado = document.querySelector(".marcarAsedio_" + idCiudad).textContent === "[Desmarcar]";
    document.querySelectorAll(".marcarAsedio_" + idCiudad).forEach(function (obj) {
        if (marcado) {
            obj.style.color = "#006400";
            obj.textContent = "[Marcar]";
        } else {
            obj.style.color = "#990000";
            obj.textContent = "[Desmarcar]";
        }
    });
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
