function getDataCiudad(elemento){
	let subtitulo    = elemento.querySelector(".subtitulo").innerText;
	let titulo       = elemento.querySelector(".tituloimperio").innerText.split("#");
	let inicioCadena = subtitulo.indexOf(":")+2;
	let finCadeba    = subtitulo.indexOf(";");
	return {
		idCiudad  : parseInt(titulo[1]),
		poblacion : parseInt(elemento.getElementById("poblacionciudad").innerText.trim().replace(".", "")),
		terreno   : subtitulo.substring(inicioCadena,finCadeba),
		region    : parseInt(subtitulo.split("#")[1]),
		impuestos : parseInt(elemento.getElementById("impuestoactual").innerText.replace("%",""))
	}
}
function getEstado(elemento){
	return{
		moral       : parseInt(elemento.getElementById("moralciudad").innerText),
		corrupcion  : parseInt(elemento.getElementById("estado_corrupcion").innerText),
		felicidad   : parseInt(elemento.getElementById("estado_felicidad").innerText),
		higiene     : parseInt(elemento.getElementById("estado_higiene").innerText),
		desempleo   : parseInt(elemento.getElementById("estado_desempleo").innerText),
		religion    : parseInt(elemento.getElementById("estado_religion").innerText),
		cultura     : parseInt(elemento.getElementById("estado_cultura").innerText)
	}
}
function construirConTecla(tecla){
	window.addEventListener("keydown", function (event){ 
		if (event.key==tecla)
			document.getElementById("frm_edificios").submit();
	});
}
function setStyle(){
	//coloco boton de construccion al centro
	document.getElementById('flotante').style.left="35%";
}
function setEdificador(){
	let interfaz = document.createElement("table")
	interfaz.innerHTML = 
	    `<tbody>
	        <tr>
	            <td class="cabecera">
	                <span>Construir Edificios</span>
	            </td>
	        </tr>
	        <tr>
	            <td class="contenido" align="absmiddle">
	                <input id="autoBuild" type="number" class="text" size="6">
	                <span width="20" class="sprite-recurso flechita"></span>
	                <button name="Submit" value="Construir Edificios" onclick="return submitForm_edificios();" style="margin-top: 2px;">
                    	Construir <img src="//images.empire-strike.com/archivos/icon_ciudad5.gif" border="0" alt="⌂" align="absmiddle" width="14" height="14">
	                </button>
	                <img id="clean" src="//images.empire-strike.com/v2/iconos/icon_quitar.png" title="Eliminar selección">
	            </td>
	        </tr>
	        <tr>
	            <td class="pie"></td>
	        </tr>
	    </tbody>`
	interfaz.className="minipapiro";
	document.getElementById("contenido").prepend(interfaz)
}

function getRecursosUsados(elemento){
	if(elemento.getElementById("panel").innerText == "")
		return;
	let recursosUsados = {};
	recursosUsados["ORO"]= -parseInt(elemento.querySelector("#panel #costeoro").innerText.trim());
	elemento.querySelectorAll("#panel [id*='coste']:not(#costeoro)").forEach(function callback(obj , index){
		let nombre = obj.id.replace("coste", "");
		recursosUsados[nombre.toUpperCase()] = -parseInt(obj.innerHTML.trim());
	});
	return recursosUsados;
}
function getEdificiosSeleccionados() {
	let casitas = 0;
	for (let i = 0; i < edificiosConstruidos.length; i++) {
		var seleccionados	 = document.getElementById("xx_txt_costo_edificio_estrella_seleccionada_" + i).value;
		if (seleccionados>-1)
			casitas += seleccionados - edificiosConstruidos[i];
	}
	return casitas;
}
function mostrarCasitas(casitas){
	if (document.getElementById("casitas")==null){
		document.getElementById("panel").innerHTML += 
			`<span id="casitas" style="white-space: nowrap">
				&nbsp;
				<span class="sprite-recurso absmiddle">
		        	<img style="width: 15px;height: 13px" src="//images.empire-strike.com/v2/iconos/icon_ciudad.gif" >
		        </span>
		        <span>${casitas}</span>
		    </span>`;
	}
	if(casitas==0){
		document.getElementById("casitas").remove();
	}
}
function getEdificiosSeleccionados() {
	let estrellasAmarillas         = 0;
	for (let i = 0; i < 33; i++) {
		let edificiosSeleccionados   = document.getElementById("xx_txt_costo_edificio_estrella_seleccionada_" + i).value;
		let edificiosConstruidos     = document.getElementById("txt_edificio_ya_compradas_" + i).value;
		if (edificiosSeleccionados>-1)
			estrellasAmarillas += edificiosSeleccionados - edificiosConstruidos;
	}
	return estrellasAmarillas;
}

function comparar ( a, b ){ return a[2] - b[2]; }
