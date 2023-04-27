class estrellas {
	puedoconstruir(idEdificio,edificios,estrella,recursosActuales){
		let edificio      = edificios[idEdificio];
		let recurso       = edificio.getCosto()["recurso"]
		let costoOro      = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["oro"];
		let costoRecurso  = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["cantidadRecurso"];
		if (costoOro>recursosActuales["ORO"]||costoRecurso>recursosActuales[recurso]||this.requisitoEstrella(idEdificio,edificios,estrella,recursosActuales))
			return false;
		else{
			return true;
		}
	}
	costoEstrella(construido,estrella){
		let costo = 0;
		for(let i = (construido+1); i <= estrella; i++)
			costo += i;
		return costo;
	}
	requisitoEstrella(idEdificio,edificios,estrella,recursosActuales){
		if(EDIFICIOS_REQUERIDOS[idEdificio]==null)
			return false;
		if(estrella>edificios[EDIFICIOS_REQUERIDOS[idEdificio]].getConstruido())
			return true;
		return false;
	}
}