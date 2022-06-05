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
	
	var maximos = {};
	maximos.Hierro = 10;
	maximos.Reliquias = 60;
	maximos.Cristal = 37;
	maximos.Joyas = 37;
	maximos.Herramientas = 21;
	maximos.Armas = 28;
	maximos.Mithril = 28;
	maximos.Gemas = 28;
	maximos.Plata = 21;
	maximos.Piedra = 8;
	maximos.Bloques = 12;
	maximos.Madera = 6;
	maximos.Tablas = 12;
	maximos.Alimentos = 3;
	maximos.Agua = 3;

	var minimos = {};
	minimos.Hierro = 8;
	minimos.Reliquias = 40;
	minimos.Cristal = 25;
	minimos.Joyas = 25;
	minimos.Herramientas = 15;
	minimos.Armas = 20;
	minimos.Mithril = 20;
	minimos.Gemas = 20;
	minimos.Plata = 15;
	minimos.Piedra = 6;
	minimos.Bloques = 10;
	minimos.Madera = 5;
	minimos.Tablas = 10;
	minimos.Alimentos = 3;
	minimos.Agua = 3;

	var valoresVenta = {};
	$(".lista1 tr").each(function(index, obj) {
		if(index == 0)
			return;

	  if(obj.children.length < 3)
			return;

		var nombre = $(obj.children[0]).text().trim();
		var venta = parseInt($(obj.children[3]).text().trim());
		var compra = parseInt($(obj.children[2]).text().trim());

		valoresVenta[nombre.toUpperCase()] = venta;		
		var difCompra = compra - minimos[nombre];
		if(difCompra == 0)
			$(obj.children[2]).append("<img src='https://images.empire-strike.com/v2/iconos/icon_correcto.png' alt='Precio óptimo' title='Precio óptimo'>");
		else
			$(obj.children[2]).append("<span style='font-size:11px'><b style='color:#990000'>+" + difCompra + "</b></span>");

		var difVenta = venta - maximos[nombre];
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
	var turnosGastados = document.getElementById("turnos").value;
	var	oroGanado = document.getElementById("cobrar").value;
	var	oroGastado = document.getElementById("pagar").value;
	$(".lista1 tr").each(function(index, obj) 
	{	
		if(index == 0)
			return;
		
	  	if(obj.children.length < 3)
			return;		
		var nombre = $(obj.children[0]).text().trim();
		var venta = parseInt($(obj.children[3]).text().trim());
		var compra = parseInt($(obj.children[2]).text().trim());
		var OroTurno = oroRaza * parseInt(turnosGastados);
		var OroSumaGastoGanado = parseInt(oroGanado)+parseInt(oroGastado);
		var difOro = parseInt(OroTurno)-parseInt(OroSumaGastoGanado);		
		var difCompra=0;
		var difVenta=0;
		if(difOro!=0)
		{
			difOro=difOro-1
			difCompra = Math.trunc(difOro/compra);			
			difVenta = Math.trunc(difOro/venta);
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
		console.log("contando");
		var nombre = $(obj.children[0]).text().trim();
		document.querySelector('#c'+nombre).innerText = 0;
		document.querySelector('#v'+nombre).innerText = 0;
	});
}