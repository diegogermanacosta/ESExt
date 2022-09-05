class ciudadclass {
	#dataCiudad;
	#edificios;
	#poblacion;
	#estado;
	#impuestos;
	#gobierno;
	constructor(dataCiudad,edificios,estado,gobierno){
	//dataCiudad contiene datos invariables como ID, Region y Terreno.
		this.#dataCiudad    = dataCiudad;
		this.#edificios     = edificios;
		this.#poblacion     = dataCiudad.poblacion;
		this.#estado        = estado;
		this.#impuestos     = dataCiudad.impuestos;
		this.#gobierno      = gobierno;
	}
	getEdificios(){
		return edificios;
	}
	getData(){
		return {
			dataCiudad : this.#dataCiudad,
			edificios  : this.#edificios,
			poblacion  : this.#poblacion,
			estado     : this.#estado,
			impuestos  : this.#impuestos
		}

	}
	
}