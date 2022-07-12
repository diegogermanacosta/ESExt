function movertropas()
{
	var formaciones = new Array;
	if(LOCAL.getFormaciones()!=null)
		formaciones = LOCAL.getFormaciones();
	
	window.addEventListener("keydown", function (event) { 
		if (event.key=='q')
			cargarFormacion("o",$("#formacionesGuardadas").val());
	});

	window.addEventListener("keydown", function (event) { 
		if (event.key=='w')
			cargarFormacion("d",$("#formacionesGuardadas").val());
	});

	$(".lista2 tr").each(function(index, obj) {
		if(index == 0)
			return;

	  	if($(obj.children[0]).text()=="Total por niveles"||$(obj.children[0]).text()=="Nombre")
			return;
		
		creaBoton(obj,"guardarFormacion", function(){guardarFormacion(obj)});
	});

	$("body").append(`<a id="submit_tropas" style="display: none;" onclick="submit_page();">pedir tabla de tropas</a>`);
	document.getElementById("submit_tropas").click();
	actualizar();

	const elementToObserve = document.querySelector("#movera");

	// create a new instance of `MutationObserver` named `observer`,
	// passing it a callback function
	const observer = new MutationObserver(function() {
	    actualizar();
	});

	// passing it the element to observe, and the options object
	observer.observe(elementToObserve, {subtree: true, childList: true});

	function guardarFormacion(obj) 
	{
		let tropas= [];
		let nombre = window.prompt('ingrese el nombre de la formacion que desea Guardar');
		if(nombre==null)
			return;
		for (var i = 2; i<= 21; i++) 
		{
			tropas[i-2]=parseInt($(obj.children[i].querySelector("span")).text());
		}
		var selected = false;
		var _formacion=generarFormacion(nombre,tropas,selected)
		formaciones.push(_formacion);
		LOCAL.setFormaciones(formaciones);
		var obj = $("#formacionesGuardadas");
		if(obj!=null){
			obj.append(`<option id="formacion${_formacion["nombre"]}" value="${_formacion["nombre"]}">${_formacion["nombre"]}</option>`);
		}
	}

	function cargarFormacion(donde,nombre)
	{
		if(nombre!=0&&nombre!=null)
		{	var _n= document.querySelector("#movera > form > table.lista1.tabla_mt > tbody").children.length-1;
			for(index in formaciones){
				if(formaciones[index]["nombre"]==nombre){
					formaciones[index]["selected"] = true;
					for (var i = 1; i<= _n; i++) 
					{
							document.getElementById('tropa'+ donde + (i)).value=formaciones[index]["formacion"][i-1];
							if (donde=="o")
								actualizad(i);
							else
								actualizao(i);
					}
					document.getElementById("calcula").click();
				}
				else{
					formaciones[index]["selected"] = false;
				}
			}
			LOCAL.setFormaciones(formaciones);
		}
	}

	function borrarFormacion(nombre){
		for(index in formaciones){
				if(formaciones[index]["nombre"]==nombre){
					formaciones.splice(index,1);
					LOCAL.setFormaciones(formaciones);
					document.getElementById('formacion'+nombre).remove();
					return;
				}
			}
	}

	function generarFormacion(nombre,formacion,selected){
		return {
			"nombre": nombre,
			"formacion": formacion,
			"selected": selected
		}
		

	}

	function actualizar()
	{
		if($(".lista1 .tabla_mt").text().length!=0)
		{
			if($("#magiapura").text().length==0)
			{
				$(".lista1 .tabla_mt").append("<tr id=magiapura></tr>");
				$("#magiapura").append(`<td id="formaciones" ><select id=formacionesGuardadas><option value="0">- - Escoge - -</option></select></td>`);
				GLOBAL.crearBoton("#formaciones","Borrar",function(){borrarFormacion($("#formacionesGuardadas").val())});
				for(var i in formaciones)
				{
					$("#formacionesGuardadas").append(`<option id="formacion${formaciones[i]["nombre"]}" value="${formaciones[i]["nombre"]}">${formaciones[i]["nombre"]}</option>`);
					if(formaciones[i]["selected"])
						document.getElementById("formacionesGuardadas").value = formaciones[i]["nombre"];
				}
				$("#magiapura").append(`<td width="35%" id=cargaro>cargar origen</td>`);
				GLOBAL.crearBoton("#cargaro","Cargar",function(){cargarFormacion("o",$("#formacionesGuardadas").val())})
				$("#magiapura").append(`<td width="35%" id=cargard>cargar destino</td>`);
				GLOBAL.crearBoton("#cargard","Cargar",function(){cargarFormacion("d",$("#formacionesGuardadas").val())})
				$("#magiapura").append(`<a id="calcula" style="display: none;" onclick="calculapotencial();">calcula</a>`);
			}
		}
	}
	function actualizad(m) 
	{
        var input = document.getElementById('tropao' + m),
            max_tropa = parseInt(document.getElementById('tropainicialo' + m).value) + parseInt(document.getElementById('tropainiciald' + m).value);

        if (input.value.length == 0 || isNaN(input.value) || input.value < 0) {
            input.value = 0;
        } else if (input.value > max_tropa) {
            input.value = max_tropa;
        }
        var valor = max_tropa - parseInt(input.value);
        document.getElementById('tropad' + m).value = valor;
        $('.slider[data-tropa="' + m + '"]').parent().find('a').css('left', parseInt(valor * 100 / max_tropa) + '%');            
    }

    function actualizao(m) 
    {
        var input = document.getElementById('tropad' + m),
            max_tropa = parseInt(document.getElementById('tropainicialo' + m).value) + parseInt(document.getElementById('tropainiciald' + m).value);
        if (input.value.length == 0 || isNaN(input.value) || input.value < 0) {
            input.value = 0;
        } else if (input.value > max_tropa) {
            input.value = max_tropa;
        }
        document.getElementById('tropao' + m).value = max_tropa - parseInt(input.value);
        $('.slider[data-tropa="' + m + '"]').parent().find('a').css('left', parseInt(input.value * 100 / max_tropa) + '%');
    }




}

function creaBoton(obj,nombre,accion){
		//crear boton
		const button = document.createElement('button'); 
		button.type = 'button'; 
		button.innerText = nombre;
		button.onclick = accion;
		button.className= "boton-papiro";
		obj.appendChild(button);
		return button;
		//boton creado
	}
