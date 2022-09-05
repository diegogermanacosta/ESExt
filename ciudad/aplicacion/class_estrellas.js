class estrellas {
	puedoconstruir(edificio,estrella,recursosActuales){
		let recurso       = edificio.getCosto()["recurso"]
		let costoOro      = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["oro"];
		let costoRecurso  = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["cantidadRecurso"];
		if (costoOro>recursosActuales["ORO"]||costoRecurso>recursosActuales[recurso])
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
}