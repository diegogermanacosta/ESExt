function ranking()
{
	var valorActual = LOCAL.getValor();
	var minimoValor = Math.floor(valorActual / 2);
	var maximoValor = valorActual * 2;
	var tolerancia = 300;

	if(valorActual == 0)
			return;

	$(".lista2:first tr").each(function(index, obj){

		if(index == 0)
			return;

		if(obj.children.length < 4)
			return;

		var valor = parseInt($(obj.children[4]).find("span").html().replace(".", ""));
		var enRango = valor >= minimoValor && valor <= maximoValor;

		if(enRango)
			$(obj.children[1]).append("<span style='color: #006400; padding-left: 5px'>[En rango]</span>");
		else
			$(obj.children[1]).append("<span style='color: #990000; padding-left: 5px'>[Fuera de rango]</span>");
	})
}
