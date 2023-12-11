function ranking()
{
	var valorActual = LOCAL.getValor();
	var minimoValor = Math.floor(valorActual / 2);
	var maximoValor = valorActual * 2;
	var tolerancia = 300;
	if(valorActual == 0)
			return;
	document.querySelectorAll(".lista2:first tr").forEach(function (obj, index) {
	    if (index === 0) {
	        return;
	    }
	    if (obj.children.length < 4) {
	        return;
	    }
	    var valor = parseInt(obj.children[4].querySelector("span").textContent.replace(".", ""));
	    var enRango = valor >= minimoValor && valor <= maximoValor;

	    if (enRango) {
	        obj.children[1].insertAdjacentHTML("beforeend", "<span style='color: #006400; padding-left: 5px'>[En rango]</span>");
	    } else {
	        obj.children[1].insertAdjacentHTML("beforeend", "<span style='color: #990000; padding-left: 5px'>[Fuera de rango]</span>");
	    }
	});
}
