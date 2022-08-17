class ciudad {
	constructor(dataCiudad,edificios,poblacion,estado,impuestos,gobierno){
	//dataCiudad contiene datos invariables como ID, Nombre, Region y Terreno.
		this.#dataCiudad    = dataCiudad;
		this.#edificios     = edificios;
		this.#poblacion     = poblacion;
		this.#estado        = estado;
		this.#impuestos     = impuestos;
		this.#gobierno      = gobierno;
		this.#multiplicador = calculaMultiplicador();
	}
	getEdificios(){
		return edificios;
	}
	
}