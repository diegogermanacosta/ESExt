function escogerobjetivo()
{
	var imperios = new Array();
	var ciudades = new Array();

	window.addEventListener("keydown", function (event) 
	{ 
		console.log(event)
		if (event.key==' '){
		  document.getElementById("form_tropas").submit();
		}
	});





	document.querySelector(".c_obj.ciudades.c_obj_v .lista2.escogerobjetivo.sortable tbody:has(tr.impar)>tr").forEach(function (fila) {
	    var idCiudad = parseInt(fila.children[0].querySelector("a").innerHTML.split("#")[1]);

	    var asedio = LOCAL.getAsedio(idCiudad);
	    if (asedio != null && asedio.marcado) {
	        fila.children[0].querySelector("a").style.color = "#990000";
	    }

	    var nombreCiudad = fila.children[0].querySelector("a").innerHTML.split("#")[0].trim();
	    var region = parseInt(fila.children[2].innerHTML.trim().split("#")[1]);
	    var idImperio = parseInt(fila.children[1].innerHTML.trim().split("#")[1]);
	    var nombreImperio = fila.children[1].innerHTML.trim().split("#")[0].trim();
	    var clan = fila.children[3].innerHTML.trim();
	    var raza = fila.children[5].innerHTML.trim();

	    var exists = ciudades.includes(idCiudad);
	    if (!exists) {
	        ciudades.push(idCiudad);
	    }

	    var imperio = imperios.find(function (imp) {
	        return imp.id == idImperio;
	    });

	    if (imperio == null) {
	        imperio = escogerobjetivo_generateImperio(idImperio, nombreImperio, raza, clan);
	        escogerobjetivo_generateCiudad(imperio, idCiudad, nombreCiudad, region);
	        imperios.push(imperio);
	    } else {
	        escogerobjetivo_generateCiudad(imperio, idCiudad, nombreCiudad, region);
	    }
	});

	if(imperios.length != 0)
		API.setImperios(imperios, function() { API.getAtaques(ciudades, escogerobjetivo_updateInformation) });
}

function escogerobjetivo_updateInformation(ataques)
{
	document.querySelector(".c_obj.ciudades.c_obj_v .lista2.escogerobjetivo.sortable tbody:has(tr.impar)>tr").forEach(function (fila) {
	    var idCiudad = parseInt(fila.children[0].querySelector("a").innerHTML.split("#")[1]);

	    if (!ataques[idCiudad] || ataques[idCiudad].length === 0) {
	        return;
	    }

	    var linkCiudad = fila.children[0].querySelector("a");
	    var iconoTropas = generateHTMLTropasIcon(idCiudad, ataques[idCiudad]);
	    linkCiudad.appendChild(iconoTropas);
	});

	UTIL.injectCode(function() {
		document.querySelector('.ayudaExt').tooltip();
	});
}

function escogerobjetivo_generateImperio(id, nombre, raza, clan) {
	return {
		"id": id,
		"nombre": nombre,
		"raza": raza,
		"partida": GLOBAL.getPartida(),
		"ronda": GLOBAL.getRonda(),
		"clan": clan,
		"ciudades": new Array()
	};
}

function escogerobjetivo_generateCiudad(imperio, idCiudad, nombre, region) {
	imperio.ciudades.push({
		"idImperio": imperio.id,
		"partida": GLOBAL.getPartida(),
		"ronda": GLOBAL.getRonda(),
		"idCiudad": idCiudad,
		"nombre": nombre,
		"region": region
	});
}
