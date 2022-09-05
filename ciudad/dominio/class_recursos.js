class recursosClass {
	#recursosActuales;
	#variacionRecursos;
	constructor(recursos){
		this.#recursosActuales  = recursos;
		this.#variacionRecursos = this.getCeroRecursos();
	}
	setVariacionRecursos(recursos){
		this.#variacionRecursos = this.getCeroRecursos();
		if(recursos!=null)
			for(var key in recursos)
				this.#variacionRecursos[key] =recursos[key];
	}
	getCeroRecursos(){
		let ceroRecursos = {};
		for(var key in this.#recursosActuales){
			ceroRecursos[key] = 0;
		}
		return ceroRecursos;
	}
	getRecursos(){
		let recursosDisponibles = {};
		for(var key in this.#recursosActuales){
			recursosDisponibles[key] = this.#recursosActuales[key] + this.#variacionRecursos[key];
		}
		return recursosDisponibles;
	}
}