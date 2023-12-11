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
			for(let key in recursos)
				this.#variacionRecursos[key] =recursos[key];
	}
	getCeroRecursos(){
		let ceroRecursos = {};
		for(let key in this.#recursosActuales){
			ceroRecursos[key] = 0;
		}
		return ceroRecursos;
	}
	getRecursos(){
		let recursosDisponibles = {};
		for(let key in this.#recursosActuales){
			recursosDisponibles[key] = this.#recursosActuales[key] + this.#variacionRecursos[key];
		}
		return recursosDisponibles;
	}
}