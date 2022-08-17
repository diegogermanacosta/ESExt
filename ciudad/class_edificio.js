class edificio {
	constructor(id, nombre, construido, costosIniciales, produccionBase, multiplicador){
		this.#id                 = id;
		this.#nombre             = nombre;
		this.#construido         = construido;
		this.#costosIniciales    = costosIniciales[nombre];
		this.#produccion         = produccionBase[nombre][0]*multiplicador[this.#produccion[1]];
		this.#recusoProducido    = produccionBase[nombre][1];
	}
	getProduccion(){
		return this.#produccion[0];
	}
	getId(){
		return this.#id;
	}
	getNombre(){
		return this.#nombre;
	}
	getConstruido(){
		return this.#construido;
	}
	getRentabilizacion(valorRecursos,numeroEstrella,gastoTurnos,bonoParaRutas){
		let costoRecurso = this.#costosIniciales["cantidadRecurso"]*valorRecursos[this.#costosIniciales["recurso"]]*numeroEstrella;
		let costoOro     = this.#costosIniciales["oro"]*valorRecursos["ORO"]*numeroEstrella;
		let costoTurnos  = gastoTurnos*valorRecursos["TURNOS"];
		let produccion   = this.#produccion*valorRecursos[this.#recusoProducido];
		return (costo+costoTurnos+costoOro)/(produccion+bonoParaRutas);
	}
}