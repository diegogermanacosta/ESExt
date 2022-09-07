function canjearFama(cantidadMinimaFama){
	console.log(cantidadMinimaFama)
	document.querySelector("#ltratados").click();
	let famaCiudad       = parseInt(document.querySelector("#famaciudad").innerText);
	let cantidadTratados = parseInt((famaCiudad-cantidadMinimaFama)/30);
	console.log(cantidadTratados)
	if (cantidadTratados<=0){
		location.replace("canjearfama.php?id="+LOCAL.getCiudad()[LOCAL.getCanjes().ciudad].idCiudad)
		return
	}
	document.querySelector("#tratados > select").value = cantidadTratados;
	document.querySelector("#submitcanjearfama").click();
}

var interfaz = document.createElement("table")
interfaz.innerHTML = `<tbody><tr><td class="cabecera"><span>Fama Minima</span></td></tr><tr><td class="contenido" align="absmiddle"><input id="famaMinima" type="number" class="text" size="6"><span width="20" class="sprite-recurso flechita"></span><button name="Submit" id="butonFama" style="margin-top: 2px;">
                    <nobr>Canjear Fama <img src="//images.empire-strike.com/archivos/icon_ciudad5.gif" border="0" alt="Construir edificios" align="absmiddle" width="14" height="14"></nobr>
                </button></td></tr><tr><td class="pie"></td></tr></tbody>`
interfaz.className="minipapiro";
document.getElementById("contenido").prepend(interfaz)
var autoBuild = document.getElementById("autoBuild");
document.getElementById("butonFama").onclick = function(){
	let canjes = {
		famaMinima  : parseInt(document.getElementById("famaMinima").value),
		ciudad      : 0
	}
	LOCAL.setCanjes(canjes);
	canjearFama(parseInt(document.getElementById("famaMinima").value))
}

if(LOCAL.getCanjes()!=null){
	let canjes = LOCAL.getCanjes()
	if(canjes.ciudad==LOCAL.getCiudad().length){
		localStorage.removeItem("Canjes");
		location.replace("tuimperio.php"); 
	}
	if(("?id="+LOCAL.getCiudad()[canjes.ciudad].idCiudad)==location.search){
		canjes.ciudad++
		LOCAL.setCanjes(canjes)
		canjearFama(canjes.famaMinima)
	}
	else
		location.replace("canjearfama.php?id="+LOCAL.getCiudad()[canjes.ciudad].idCiudad)
}