function comercio()
{	
	let oroRaza;
	if (LOCAL.getImperio().raza == null) {
	    alert("Raza no identificada, por favor ve a 'Tu Imperio' para actualizar la información.");
	    return;
	}
	switch (LOCAL.getImperio().raza) {
	    case "Humanos":
	        oroRaza = 100000;
	        break;

	    case "Elfos oscuros":
	        oroRaza = 28000;
	        break;

	    default:
	        oroRaza = 40000;
	        break;
	}
	let valoresVenta = {};
	document.querySelectorAll(".lista1 tr").forEach(function (obj, index) {
	    if (index === 0 || obj.children.length < 3) {
	        return;
	    }

	    let nombre = obj.children[0].textContent.trim().toUpperCase();
	    let venta = parseInt(obj.children[3].textContent.trim());
	    let compra = parseInt(obj.children[2].textContent.trim());

	    valoresVenta[nombre] = venta;

	    let difCompra = compra - MINIMOS[nombre];
	    if (difCompra === 0) {
	        obj.children[2].innerHTML += "<img src='https://images.empire-strike.com/v2/iconos/icon_correcto.png' alt='Precio óptimo' title='Precio óptimo'>";
	    } else {
	        obj.children[2].innerHTML += `<span style='font-size:11px'><b style='color:#990000'>+${difCompra}</b></span>`;
	    }

	    let difVenta = venta - MAXIMOS[nombre];
	    if (difVenta === 0) {
	        obj.children[3].innerHTML += "<img src='https://images.empire-strike.com/v2/iconos/icon_correcto.png' alt='Precio óptimo' title='Precio óptimo'>";
	    } else {
	        obj.children[3].innerHTML += `<span style='font-size:11px'><b style='color:#990000'>${difVenta}</b></span>`;
	    }
	    obj.children[2].innerHTML += `<span style='font-size:11px'> = <b id='bc${nombre}'></b></span>`;
	    obj.children[3].innerHTML += `<span style='font-size:11px'> = <b id='bv${nombre}'></b></span>`;
	    document.getElementById(nombre.toLowerCase()).onkeyup = function () {
	        compraJusta(oroRaza);
	    };
	    let text = `<a style='color:#394060 ; text-decoration: none' id='c${nombre}' onclick="document.getElementById('${nombre.toLowerCase()}').value = parseInt(this.textContent.trim()) + parseInt('0' + document.getElementById('${nombre.toLowerCase()}').value); document.getElementById('a${nombre.toLowerCase()}').value='comprar'; calculaoro();">0</a>`;
	    document.getElementById('bc' + nombre).innerHTML = text;
	    document.getElementById('c' + nombre).onclick = function () {
	        compraJusta(oroRaza);
	    };
	    text = `<a style='color:#394060 ; text-decoration: none' id='v${nombre}' onclick="document.getElementById('${nombre.toLowerCase()}').value = parseInt(this.textContent.trim()) + parseInt('0' + document.getElementById('${nombre.toLowerCase()}').value); document.getElementById('a${nombre.toLowerCase()}').value='vender'; calculaoro();">0</a>`;
	    document.getElementById('bv' + nombre).innerHTML = text;
	    document.getElementById('v' + nombre).onclick = function () {
	        compraJusta(oroRaza);
	    };
	});
	document.querySelector('#btn_venderTodo').onclick = function(){ compraJusta(oroRaza)};
	let selectRecurso = "";
	let selectVenta = 0;
	document.querySelectorAll("[name=recurso] option").forEach(function (obj) {
	    let text = obj.textContent.toUpperCase();
	    let recurso = "";
	    let cantidad = "";
	    for (let rec in valoresVenta) {
	        if (text.indexOf(rec) !== -1) {
	            recurso = rec;
	            cantidad = text.replace(rec, "");
	            break;
	        }
	    }
	    cantidad = parseInt(cantidad.trim().replace(".", ""));
	    if (valoresVenta[recurso.toUpperCase()] * cantidad > selectVenta) {
	        selectRecurso = recurso;
	        selectVenta = valoresVenta[recurso] * cantidad;
	    }
	});
	document.querySelector(".cont_mejora").insertAdjacentHTML(
	    "beforeend",
	    "<span style='color: #990000; font-weight: bold'>Canje óptimo de rubíes para vender basado en el comercio actual: " +
	        selectRecurso +
	        " = " +
	        selectVenta.toLocaleString("es") +
	        " <span class='sprite-recurso oro absmiddle' title='Oro'></span></span>"
	);
}

function compraJusta(oroRaza) 
{
	var turnosGastados     = parseInt(document.getElementById("turnos").value);
	var	oroGanado          = parseInt(document.getElementById("cobrar").value.replaceAll(".",""));
	var	oroGastado         = parseInt(document.getElementById("pagar").value.replaceAll(".",""));
	var OroTurno           = oroRaza * turnosGastados;
	var OroSumaGastoGanado = oroGanado+oroGastado;
	var difOro             = OroTurno-OroSumaGastoGanado;
	var difCompra          = 0;
	var difVenta           = 0;
	
	document.querySelector(".lista1 tr").forEach(function(index, obj) 
	{	
		if(index == 0)
			return;
		
	  	if(obj.children.length < 3)
			return;		
		var nombre = obj.children[0].innerText.trim().toUpperCase();
		var venta = parseInt(obj.children[3].innerText.trim());
		var compra = parseInt(obj.children[2].innerText.trim());
		if(difOro!=0){
			difOro            += -1;
			difCompra          = Math.trunc(difOro/compra);			
			difVenta           = Math.trunc(difOro/venta);
		}
		document.querySelector('#c'+nombre).innerText = difCompra;
		document.querySelector('#v'+nombre).innerText = difVenta;
	});
}

function reset()
{
	document.querySelector(".lista1 tr").forEach(function(index, obj) 
	{	
		if(index == 0)
			return;
		
	  	if(obj.children.length < 3)
			return;
		var nombre = obj.children[0].innerText().trim();
		document.querySelector('#c'+nombre).innerText = 0;
		document.querySelector('#v'+nombre).innerText = 0;
	});
}