function getImperio(){
	let info = $("#contenido .titulo").html().trim().toUpperCase();
	info = info.replace("TU IMPERIO: ", "");
	info = info.split("#");
	return { 
		id     : parseInt(info[1]),
		nombre : info[0].trim()
	}
}
function getValor(){
	return parseInt($($(".valor")).html().replace(".", ""));
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

	let idReducido = indiceBelico
	let count = 0;
	while(15 <= idReducido){
		count++;
		idReducido = idReducido - 0.1*(100-idReducido);
	}
}
function isPacifico(indiceBelico){
	return (indiceBelico<=15&&getValor()>500);
}
function mostrarBelico(indiceBelico,ibAlPaso,count){
	if(isPacifico(indiceBelico)){	
		let iconoP=`<span id="icono_pacifico"> <img src="//images.empire-strike.com/archivos/icon_paz.gif" width="15" height="15" align="absmiddle" hspace="2" title="Eres un imperio Pacífico"></span>`;
		$("#datos>tbody>tr:eq(4)").append(`<td><b>IB al paso:</b> ${ibAlPaso}%${iconoP}</td>`);
	}
	else
		$("#datos>tbody>tr:eq(4)").append(`<td><b>IB al paso:</b> ${ibAlPaso}%, necesitas ${count} paso(s) para volver a pacifico</td>`);
	
}
function cargaCiudades(){
	document.querySelectorAll(".lista2:not(:first) tr").forEach(function(index, obj){
	if(index == 0||obj.children.length < 16 ||  obj.children.length > 17)
		return;
}
function getCiudad(){
	let sinRutas = obj.children.length == 16 ? 1 : 0;
	return{
		idCiudad       : $(obj.children[0]).text().trim();
		nombre         : $(obj.children[2]).text().trim();
		region         : $(obj.children[3]).text().trim().replace("#","");
		poblacion      : $(obj.children[4]).text().trim().replace(/\./g,"");
		oro            : $(obj.children[7]).text().trim().replace(/\./g,"");
		recursos       : $(obj.children[8]).text().trim().replace(/\./g,"");
		edificios      : $(obj.children[9]).text().trim();
		fama           : parseInt(obj.children[5].innerText.trim().substring(0, 3));
		moral          : $(obj.children[14 - sinRutas]).text().trim().replace("%","");
		defensa        : $(obj.children[1].children[0]).attr("src");//.replace("https://images.empire-strike.com/archivos/sistemas_defensivos/25/","").replace(".jpg","");
		proteccion     : $(obj.children[15 - sinRutas]).text().trim();
		tropas         : $(obj.children[12 - sinRutas]).text().trim().replace(/\./g,"");
	}
}