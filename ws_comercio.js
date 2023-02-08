function comercio()
{	
	var oroRaza=0;
	if(LOCAL.getImperio().raza == null)	{
		
		alert("Raza no identificada, por favor ve a 'Tu Imperio' para actualizar la información.");
		return;
	}
	
	if 	(LOCAL.getImperio().raza == "Humanos") 
	{
		oroRaza=100000;
	}
	else if (LOCAL.getImperio().raza == "Elfos oscuros")
	{
		oroRaza=28000;
	}
	else
	{
		oroRaza=40000;
	}
	var valoresVenta = {};
	$(".lista1 tr").each(function(index, obj) {
		if(index == 0)
			return;

	  if(obj.children.length < 3)
			return;

		var nombre = $(obj.children[0]).text().trim().toUpperCase();
		var venta = parseInt($(obj.children[3]).text().trim());
		var compra = parseInt($(obj.children[2]).text().trim());

		valoresVenta[nombre] = venta;		
		var difCompra = compra - MINIMOS[nombre];
		if(difCompra == 0)
			$(obj.children[2]).append("<img src='https://images.empire-strike.com/v2/iconos/icon_correcto.png' alt='Precio óptimo' title='Precio óptimo'>");
		else
			$(obj.children[2]).append("<span style='font-size:11px'><b style='color:#990000'>+" + difCompra + "</b></span>");

		var difVenta = venta - MAXIMOS[nombre];
		if(difVenta == 0)
		{
			$(obj.children[3]).append("<img src='https://images.empire-strike.com/v2/iconos/icon_correcto.png' alt='Precio óptimo' title='Precio óptimo'>");
		}
		else
		{
			$(obj.children[3]).append("<span style='font-size:11px'><b style='color:#990000'>" + difVenta + "</b></span>");
		}	
		$(obj.children[2]).append(`<span style='font-size:11px'> = <b id='bc${nombre}'></b></span>`);

		$(obj.children[3]).append(`<span style='font-size:11px'> = <b id='bv${nombre}'></b></span>`);

		document.querySelector('#'+nombre.toLowerCase()).onkeyup = function(){ compraJusta(oroRaza)};
		var text = `<a style='color:#394060 ; text-decoration: none' id='c${nombre}' onclick="$('#${nombre.toLowerCase()}').val(parseInt(this.text.trim())+parseInt('0'+$('#${nombre.toLowerCase()}').val())); $('#a${nombre.toLowerCase()}').val('comprar'); calculaoro();">0</a>`;
		document.querySelector('#bc'+nombre).innerHTML = text;
		document.querySelector('#c'+nombre).onclick = function(){ compraJusta(oroRaza)};
		text = `<a style='color:#394060 ; text-decoration: none' id='v${nombre}' onclick="$('#${nombre.toLowerCase()}').val(parseInt(this.text.trim())+parseInt('0'+$('#${nombre.toLowerCase()}').val())); $('#a${nombre.toLowerCase()}').val('vender'); calculaoro();">0</a>`;
		document.querySelector('#bv'+nombre).innerHTML = text;
		document.querySelector('#v'+nombre).onclick = function(){ compraJusta(oroRaza)};

	});
	document.querySelector('#btn_venderTodo').onclick = function(){ compraJusta(oroRaza)};
	var selectRecurso = "";
	var selectVenta = 0;
	$("[name=recurso] option").each(function(index, obj){
		var text = ($(obj).text()).toUpperCase();		
		var recurso = "";
		var cantidad = "";		
		for(var rec in valoresVenta){
		   if(text.indexOf(rec) != -1)
		   {	
				recurso = rec;			
				cantidad = text.replace(rec, "");
				break;
			}
		}
		cantidad = parseInt(cantidad.trim().replace(".", ""));
		if(valoresVenta[recurso.toUpperCase()] * cantidad > selectVenta)
		{
			selectRecurso = recurso;			
			selectVenta = valoresVenta[recurso] * cantidad;			
		}
	});
	$(".cont_mejora").append("<span style='color: #990000; font-weight: bold'>Canje óptimo de rubíes para vender basado en el comercio actual: " + selectRecurso + " = " + selectVenta.toLocaleString('es') + " <span class='sprite-recurso oro absmiddle' title='Oro'></span></span>")
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
	
	$(".lista1 tr").each(function(index, obj) 
	{	
		if(index == 0)
			return;
		
	  	if(obj.children.length < 3)
			return;		
		var nombre = $(obj.children[0]).text().trim().toUpperCase();
		var venta = parseInt($(obj.children[3]).text().trim());
		var compra = parseInt($(obj.children[2]).text().trim());
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
	$(".lista1 tr").each(function(index, obj) 
	{	
		if(index == 0)
			return;
		
	  	if(obj.children.length < 3)
			return;
		var nombre = $(obj.children[0]).text().trim();
		document.querySelector('#c'+nombre).innerText = 0;
		document.querySelector('#v'+nombre).innerText = 0;
	});
}