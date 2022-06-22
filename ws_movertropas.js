function movertropas()
{
	var formaciones = new Array;
	if(LOCAL.getFormaciones()!=null)
		formaciones = LOCAL.getFormaciones();
	
	window.addEventListener("keydown", function (event) { 
		if (event.key=='1'){
			actualizar();
		}
	});


	$(".lista2 tr").each(function(index, obj) {
		if(index == 0)
			return;

	  	if($(obj.children[0]).text()=="Total por niveles"||$(obj.children[0]).text()=="Nombre")
			return;
		
		console.log($(obj.children[0]).text());
		console.log(obj.children.length);
		creaBoton(obj,"guardarFormacion", function(){guardarFormacion(obj)});
	});
	var actualiza= function(){actualizar()}
	var boton = GLOBAL.crearBoton(".boton_tropas_wrapper","Actualizar",actualiza)
	boton.id= "botonazo";
	function guardarFormacion(obj) 
	{
		let _formacion= [];
		let nombre = window.prompt('ingrese el nombre de la formacion que desea Guardar');
		for (var i = 2; i<= 21; i++) 
		{
			_formacion[i-2]=parseInt($(obj.children[i].querySelector("span")).text());
		}
		formaciones.push(generarFormacion(nombre,_formacion));
		LOCAL.setFormaciones(formaciones);
	}

	function cargarFormacion(donde,nombre)
	{
		if(nombre!=0)
		{	var _n= document.querySelector("#movera > form > table.lista1.tabla_mt > tbody").children.length-1;
			for(index in formaciones)
				if(formaciones[index]["nombre"]==nombre)
					for (var i = 1; i<= _n; i++) 
					{
							console.log('tropa'+ donde + (i+1))
							document.getElementById('tropa'+ donde + (i)).value=formaciones[index]["formacion"][i-1];
							if (donde=="o")
								actualizad(i);
							else
								actualizao(i);
					}
		}
	}

	function generarFormacion(nombre,formacion){
		return {
			"nombre": nombre,
			"formacion": formacion
		}
		

	}

	function actualizar()
	{
		if($("#movera").text().length!=0)
		{
			console.log("Habemus lista")
			if($("#magiapura").text().length==0)
			{
				$(".lista1 .tabla_mt").append("<tr id=magiapura></tr>");
				$("#magiapura").append(`<td ><select id=formacionesGuardadas><option value="0">- - Escoge - -</option></select></td>`);
				for(var i in formaciones)
				{
					$("#formacionesGuardadas").append(`<option value="${formaciones[i]["nombre"]}">${formaciones[i]["nombre"]}</option>`);
				}
				if(document.getElementById('formacionesGuardadas').children.length>1)
					document.getElementById('formacionesGuardadas').value=formaciones[0]["nombre"];
				$("#magiapura").append(`<td width="35%" id=cargaro>cargar origen</td>`);
				GLOBAL.crearBoton("#cargaro","Cargar",function(){cargarFormacion("o",$("#formacionesGuardadas").val())})
				$("#magiapura").append(`<td width="35%" id=cargard>cargar destino</td>`);
				GLOBAL.crearBoton("#cargard","Cargar",function(){cargarFormacion("d",$("#formacionesGuardadas").val())})
			}
			else
				console.log("a la cabida ni gilada");
		}
		else
			console.log("tu vieja en tanga")

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
	document.querySelector("#datos > tbody > tr:nth-child(5) > td:nth-child(3)")