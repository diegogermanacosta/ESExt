var formaciones = LOCAL.getFormaciones() || [];

window.addEventListener("keydown", function(event) {
    if (event.key === 'q')
        cargarFormacion("o", document.getElementById("formacionesGuardadas").value);
});

window.addEventListener("keydown", function(event) {
    if (event.key === 'w')
        cargarFormacion("d", document.getElementById("formacionesGuardadas").value);
});

document.querySelectorAll(".lista2 tr").forEach(function(obj, index) {
    if (index === 0 || obj.children[0].textContent === "Total por niveles" || obj.children[0].textContent === "Nombre")
        return;
    creaBoton(obj, "guardarFormacion", function() {
        guardarFormacion(obj);
    });
});

document.body.insertAdjacentHTML("beforeend", "<a id='submit_tropas' style='display: none;' onclick='submit_page();'>pedir tabla de tropas</a>");
document.getElementById("submit_tropas").click();
actualizar();

const elementToObserve = document.querySelector("#movera");
const observer = new MutationObserver(function() {
    actualizar();
});

observer.observe(elementToObserve, { subtree: true, childList: true });

function guardarFormacion(obj) {
    let tropas = [];
    let nombre = window.prompt('Ingrese el nombre de la formación que desea guardar', GLOBAL.getPartida().substring(0, 3) + "_" + obj.children[1].innerText);

    if (nombre === null) {
        return;
    }

    for (var i = 2; i <= 21; i++) {
        tropas[i - 2] = parseInt(obj.children[i].querySelector("span").textContent);
    }

    let _formacion = generarFormacion(nombre, tropas, false);
    formaciones.push(_formacion);
    LOCAL.setFormaciones(formaciones);
    let objSelect = document.getElementById("formacionesGuardadas");

    if (objSelect !== null) {
        let option = document.createElement("option");
        option.id = "formacion" + _formacion["nombre"];
        option.value = _formacion["nombre"];
        option.textContent = _formacion["nombre"];
        objSelect.appendChild(option);
    }
}

function cargarFormacion(donde,nombre){
	if(nombre!=0&&nombre!=null){	
		var _n= document.querySelector("#movera > form > table.lista1.tabla_mt > tbody").children.length-1;
		for(index in formaciones){
			if(formaciones[index]["nombre"]==nombre){
				formaciones[index]["selected"] = true;
				for (var i = 1; i<= _n; i++) 
				{
						document.getElementById('tropa'+ donde + (i)).value=formaciones[index]["formacion"][i-1];
						if (donde=="o")
							actualizarTropas(i,"d");
						else
							actualizarTropas(i,"o");
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

function actualizar() {
    if (document.querySelector(".lista1 .tabla_mt").textContent.length == 0){
    	return
    }
    let magiapura = document.getElementById("magiapura")
    if (magiapura!=null&&magiapura.textContent.length != 0){
    	return
    }
        magiapura = document.createElement("tr");
        magiapura.id = "magiapura";
        document.querySelector(".lista1 .tabla_mt").appendChild(magiapura);

        let formacionesTd = document.createElement("td");
        formacionesTd.id = "formaciones";
        magiapura.appendChild(formacionesTd);

        let selectFormaciones = document.createElement("select");
        selectFormaciones.id = "formacionesGuardadas";
        formacionesTd.appendChild(selectFormaciones);

        let defaultOption = document.createElement("option");
        defaultOption.value = "0";
        defaultOption.textContent = "- - Escoge - -";
        selectFormaciones.appendChild(defaultOption);

        GLOBAL.crearBoton("#formaciones", "Borrar", function () { borrarFormacion(selectFormaciones.value); });

        for (let i in formaciones) {
            let option = document.createElement("option");
            option.id = "formacion" + formaciones[i]["nombre"];
            option.value = formaciones[i]["nombre"];
            option.textContent = formaciones[i]["nombre"];

            selectFormaciones.appendChild(option);

            if (formaciones[i]["selected"]) {
                selectFormaciones.value = formaciones[i]["nombre"];
            }
        }

        let cargaroTd = document.createElement("td");
        cargaroTd.width = "35%";
        cargaroTd.id = "cargaro";
        magiapura.appendChild(cargaroTd);
        cargaroTd.textContent = "cargar origen";

        GLOBAL.crearBoton("#cargaro", "Cargar", function () { cargarFormacion("o", selectFormaciones.value); });

        let cargardTd = document.createElement("td");
        cargardTd.width = "35%";
        cargardTd.id = "cargard";
        magiapura.appendChild(cargardTd);
        cargardTd.textContent = "cargar destino";

        GLOBAL.crearBoton("#cargard", "Cargar", function () { cargarFormacion("d", selectFormaciones.value); });
        magiapura.insertAdjacentHTML("beforeend" , "<a id='calcula' style='display: none;' onclick='calculapotencial();'>calcula</a>");
}

function actualizarTropas(m, direccion) {
    var input = document.getElementById('tropa' + direccion + m),
        maxTropas = parseInt(document.getElementById('tropainicialo' + m).value) + parseInt(document.getElementById('tropainiciald' + m).value);

    if (input.value.length == 0 || isNaN(input.value) || input.value < 0) {
        input.value = 0;
    } else if (input.value > maxTropas) {
        input.value = maxTropas;
    }

    var valor = (direccion === 'o') ? maxTropas - parseInt(input.value) : parseInt(input.value);
    
    document.getElementById('tropa' + ((direccion === 'o') ? 'd' : 'o') + m).value = valor;
    $('.slider[data-tropa="' + m + '"]').parent().find('a').css('left', parseInt(valor * 100 / maxTropas) + '%');
}

function creaBoton(obj,nombre,accion){
	const button = document.createElement('button'); 
	button.type = 'button'; 
	button.innerText = nombre;
	button.onclick = accion;
	button.className= "boton-papiro";
	obj.appendChild(button);
	return button;
}
