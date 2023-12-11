function getImperio(){
	let titulo = document.querySelector("#contenido .titulo").innerHTML.trim().toUpperCase();
	let imperio = titulo.replace("TU IMPERIO: ", "").split("#");
	return { 
		id     : parseInt(imperio[1]),
		nombre : imperio[0].trim()
	}
}
function getValor(){
	return parseInt(document.querySelector(".valor").innerHTML.replace(".", ""));
}
function getRaza(){
	return document.querySelectorAll("#datos td")[2].innerHTML;
}
function getClan(){
	let clan = ""
	if(document.querySelectorAll("#datos td")[5].innerText.length==3)
		clan = document.querySelectorAll("#datos td")[5].innerText;
	return clan;
}
function getIndiceBelico(){
	return parseFloat(document.querySelectorAll("#datos td")[14].innerText.split('%')[0].replace(',','.').trim());
}
function calculaBelico(indiceBelico){
	let ibReducidoAlPaso = 0.1*(100-indiceBelico);
	let ibAlPaso = (indiceBelico - ibReducidoAlPaso).toFixed(1);
	if(ibAlPaso < 0)
		ibAlPaso = 0;

	let ibReducido = indiceBelico
	let count = 0;
	while(15 <= ibReducido){
		count++;
		ibReducido = ibReducido - 0.1*(100-ibReducido);
	}
	return {
		"indiceBelico": indiceBelico,
		"ibAlPaso"	  : ibAlPaso,
		"diasBelico"  : count
	}
}
function isPacifico(indiceBelico,valorImperio){
	return (indiceBelico<=15&&valorImperio>500);
}
function mostrarBelico(calculaBelico){
	{indiceBelico,ibAlPaso,diasBelico} = calculaBelico;
	let elemento = document.querySelector('#datos>tbody>tr:nth-child(5)');
	if(isPacifico(indiceBelico)){	
		let iconoP= `<span id="icono_pacifico">
						<img src="//images.empire-strike.com/archivos/icon_paz.gif" width="15" height="15" align="absmiddle" hspace="2" title="Eres un imperio Pacífico">
					 </span>`;
		elemento.append(`<td><b>IB al paso:</b> ${ibAlPaso}%${iconoP}</td>`);
	}
	else
		elemento.append(`<td>
							<b>IB al paso:</b> 
							${ibAlPaso}%, necesitas ${diasBelico} paso(s) para volver a pacifico
						</td>`);
	
}
function cargaCiudades(){
	document.querySelectorAll(".lista2")[1].querySelectorAll("tbody tr").map(function(index, obj){
		let sinRutas = obj.children.length == 16 ? 1 : 0;
		return{
			idCiudad       : obj.children[0].innerText().trim();
			nombre         : obj.children[2].innerText().trim();
			region         : obj.children[3].innerText().trim().replace("#","");
			poblacion      : obj.children[4].innerText().trim().replace(/\./g,"");
			oro            : obj.children[7].innerText().trim().replace(/\./g,"");
			recursos       : obj.children[8].innerText().trim().replace(/\./g,"");
			edificios      : obj.children[9].innerText().trim();
			fama           : parseInt(obj.children[5].innerText.trim().substring(0, 3));
			moral          : obj.children[14 - sinRutas].innerText().trim().replace("%","");
			defensa        : obj.children[1].children[0].attr("src");
			proteccion     : obj.children[15 - sinRutas].innerText().trim();
			tropas         : obj.children[12 - sinRutas].innerText().trim().replace(/\./g,"");
		}
	}
}
function cargaHeroes(){
	document.querySelectorAll(".lista2")[0].querySelectorAll("tbody tr").map(function(index, obj){
		return {
			nombre    : obj.querySelector("strong").innerText.trim();
			link      : obj.querySelector("a").href;
			clase     : obj.children[2].innerText.trim();
			nivel     : parseInt(obj.children[1].innerText.replace(nombre, "").replace("N", "").trim());
			ataque    : obj.children[5].innerText.trim();
			defensa   : obj.children[6].innerText.trim();
			daño      : obj.children[7].innerText.trim();
			vida      : obj.children[8].innerText.trim();
			velocidad : obj.children[9].innerText.trim();
			moral     : obj.children[10].innerText.trim();
			energia   : obj.children[11].innerText.trim();
			habilidad : obj.children[13].innerText.trim();
			victorias : obj.children[15].innerText.trim();
			region    : obj.children[4].innerText.trim().replace("#", "");
			tropas    : obj.children[14].innerText.trim();
		}
	}
}