class elementoEdificioClass{
	#elementoEdificio;
	#edificio;
	constructor(elementoEdificio){
		this.#elementoEdificio = elementoEdificio;
		elementoEdificio.addEventListener("mouseout" , function(){
			estrellaVerde(idEdificio);
			if(idEdificio>0)
				estrellaVerde(idEdificio-1);
		});
		elementoEdificio.forEach(function callback(elemento,idEdificio){
			elemento.addEventListener("click",function(){
				let seleccionados = parseInt(document.getElementById("xx_txt_costo_edificio_estrella_seleccionada_"+idEdificio).value) + 1;
				this.#edificio.setSeleccionado(seleccionados);
				recursos.setVariacionRecursos(getRecursosUsados());
				calculaEstrellas();
			});
		});
		elementoEdificio.querySelectorAll(".estrella").forEach(function callback(obj , index){
			setClicks(obj,idEdificio);
			obj.addEventListener("mouseover",function(){
				estrellaVerde(idEdificio);
			});
		});

	}
	setComportamientoElemento(elemento,callback){
		console.log("puto el que lee");
	}
	setComportamientoEstrella(elemento,callback){
		console.log("puto el que lee");
	}
	setComportamientoClick(elemento,callback){
		console.log("puto el que lee");
	}
}