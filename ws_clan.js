





function clan()
{
	if (LOCAL.getImperio()==null)
		return
	var siglas = document.querySelector("#contenido > table > tbody > tr:nth-child(1) > td").innerText.split("(")[1].replace(")","");
	if (LOCAL.getImperio().clan==siglas) {
		LOCAL.setClan(cargarClan());
		GLOBAL.cargaImperio();
	}
 	var valorActual = LOCAL.getValor();
	var minimoValor = Math.floor(valorActual / 2);
	var maximoValor = valorActual * 2;
	var tolerancia = 300;

	if(valorActual == 0)
			return;

	$(".lista1 tr").each(function(index, obj){

		if(index == 0)
			return;

		var valor = parseInt($(obj.children[2]).html().replace(".", ""));
		var enRango = valor >= minimoValor && valor <= maximoValor;

		var diferenciaMinima = valor - minimoValor;
		var diferenciaMaxima = maximoValor - valor;
		var mensaje;
		var subMensaje = "";

		if(Math.abs(diferenciaMinima) <= tolerancia)
		{
			if(diferenciaMinima > 0)
				subMensaje = "<br>a " + Math.abs(diferenciaMinima) + " puntos de salir";
			else
				subMensaje = "<br>-" + Math.abs(diferenciaMinima) + " puntos para entrar";
		}

		if(Math.abs(diferenciaMaxima) <= tolerancia)
		{
			if(diferenciaMaxima > 0)
				subMensaje = "<br>a " + Math.abs(diferenciaMaxima) + " puntos de salir";
			else
				subMensaje = "<br>+" + Math.abs(diferenciaMaxima) + " puntos para entrar";
		}

		if(enRango)
			mensaje = "<br><span style='color: #006400'>[En rango]</span>" + subMensaje;
		else
			mensaje = "<br><span style='color: #990000'>[Fuera de rango]</span>" + subMensaje;

		$(obj.children[2]).append("<span style='font-size: 11px'><b>" + mensaje + "</b></span>")
	})
}

function cargarClan(){
	
	var miClan = {
		maravilla1: null,
		maravilla2: null
	}
	if(document.getElementById("_ayudam1")==null)
		return miClan;
	miClan.maravilla1 = document.querySelector("#_ayudam1 h3").innerText;

	if(document.getElementById("_ayudam2")==null)
		return miClan;
	miClan.maravilla2 = document.querySelector("#_ayudam2 h3").innerText;
	return miClan;
}