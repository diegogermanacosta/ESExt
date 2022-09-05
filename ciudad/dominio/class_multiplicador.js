class multiplicadores {
	#multiplicador;
	constructor(partida, gobierno, imperio, ciudad,politicas,maravillas){
		this.#multiplicador = {
			"ALIMENTOS"		: (1+ciudad.poblacion*K_POBLACION)*(1+0.01*politicas.lamujer),
			"AGUA"          : (1+ciudad.poblacion*K_POBLACION)*(1+0.01*politicas.lamujer),
			"HIERRO"        : (1+ciudad.poblacion*K_POBLACION)*(1+0.02*politicas.profundidadcuevas)*(1+0.02*politicas.esclavitud),
			"HERRAMIENTAS"  : (1+ciudad.poblacion*K_POBLACION),
			"ARMAS"         : (1+ciudad.poblacion*K_POBLACION),
			"PIEDRA"        : (1+ciudad.poblacion*K_POBLACION)*(1+0.02*(politicas.arquitectura+politicas.esclavitud)),
			"MADERA"        : (1+ciudad.poblacion*K_POBLACION)*(1+0.01*(politicas.esclavitud+2*politicas.naturaleza)),
			"BLOQUES"       : (1+ciudad.poblacion*K_POBLACION)*(1+0.02*politicas.arquitectura),
			"TABLAS"        : (1+ciudad.poblacion*K_POBLACION)*(1+0.02*politicas.naturaleza),
			"MITHRIL"       : (1+ciudad.poblacion*K_POBLACION)*(1+0.01*politicas.profundidadcuevas),
			"PLATA"         : (1+ciudad.poblacion*K_POBLACION)*(1+0.02*politicas.profundidadcuevas),
			"CRISTAL"       : (1+ciudad.poblacion*K_POBLACION),
			"RELIQUIAS"     : (1+ciudad.poblacion*K_POBLACION),
			"GEMAS"         : (1+ciudad.poblacion*K_POBLACION),
			"JOYAS"         : (1+ciudad.poblacion*K_POBLACION),
			"KARMA"			: (1+ciudad.poblacion*K_POBLACION)*(1+0.05*politicas.losdioses),
			"MANA"			: (1+ciudad.poblacion*K_POBLACION)*(1+0.05*politicas.magiaarcana),
			"ORO"			: (1+ciudad.impuestos/100)*(1+(0.02*politicas.burguesia))*(1-(0.02*politicas.aduanas))*(1-(0.02*politicas.nobleza)),
			"RUTAS"         : 1+0.06*politicas.rutasdecontrabando,
			"FAMA"			: 1
		}
		if(imperio.raza=="Humanos"){
			this.#multiplicador.JOYAS           *= 2;
			this.#multiplicador.RELIQUIAS       *= 2;
		}
		if (imperio.pacifico){
			this.#multiplicador.RUTAS           *= 1.2;
			this.#multiplicador.FAMA            *= 1.2;
			this.#multiplicador.ORO             *= 1.2; 
		}
		switch(ciudad.terreno) {
			case 'Llanura': 
				this.#multiplicador.ALIMENTOS   *= 1.8;
				break;
			case 'Bosque': 
				this.#multiplicador.MADERA   	*= 2;
				break;
			case 'Montaña': 
				this.#multiplicador.HIERRO  	*= 1.4;
				this.#multiplicador.MITHRIL 	*= 1.3;
				break;
			case 'Río': 
				this.#multiplicador.AGUA 		*= 2.4;
				break;
			case 'Costa': 
				this.#multiplicador.ALIMENTOS   *= 1.6;
				break;
			case 'Colina': 
				this.#multiplicador.PIEDRA  	*= 1.6;
				this.#multiplicador.GEMAS		*= 1.3;
				break;
			case 'Volcán':
				this.#multiplicador.MANA        *= 1.2;
				break;
			case 'Montaña Nevada':
				this.#multiplicador.ALIMENTOS   *= 0.85;
				this.#multiplicador.CRISTAL     *= 2;
				break;
			case 'Bosque Profundo':
				this.#multiplicador.MADERA      *= 1.6;
				this.#multiplicador.TABLAS      *= 1.3;
				break;
			case 'Lago':
				this.#multiplicador.KARMA       *= 1.1;
				this.#multiplicador.ALIMENTOS   *= 1.3;
				this.#multiplicador.AGUA        *= 1.3;
				break;
		}
		if (gobierno){
			switch (partida){
				case 'KENARON':
				case 'GARDIS':
					switch(ciudad.region){
						case 1:
							this.#multiplicador.ALIMENTOS 	*= 3;
							break;
						case 2:
							this.#multiplicador.MANA		*= 2;
							break;
						case 4:
							this.#multiplicador.MADERA    	*= 2;
							this.#multiplicador.TABLAS    	*= 2;
							break;
						case 5:
							this.#multiplicador.ORO       	*= 2;
							break;
						case 6:
							this.#multiplicador.FAMA      	*= 1.5;
							break;
						case 10:
							this.#multiplicador.HERRAMIENTAS*= 2;
							this.#multiplicador.HIERRO		*= 2;
							break;
						case 11:
							this.#multiplicador.MADERA 		*= 2;
							this.#multiplicador.AGUA  		*= 2;
							break;
						case 12:
							this.#multiplicador.MADERA 		*= 3;
							break;
						case 14:
							this.#multiplicador.ARMAS		*= 2;
							this.#multiplicador.HIERRO		*= 2;
							break;
						case 15:
							this.#multiplicador.MITHRIL  	*= 2;
							this.#multiplicador.RELIQUIAS 	*= 2;
							break;
						case 17:
							this.#multiplicador.PIEDRA		*= 3;
							break;
						case 20:
							this.#multiplicador.AGUA  		*= 3;
							break;
						case 23:
							this.#multiplicador.GEMAS  		*= 3;
							break;
						case 26:
							this.#multiplicador.PLATA  		*= 2;
							this.#multiplicador.JOYAS		*= 2;
							break;
						case 28:
							this.#multiplicador.KARMA		*= 1.5;
							break;
						case 29:
							this.#multiplicador.PIEDRA      *= 2;
							this.#multiplicador.BLOQUES	 	*= 2;
							break;
						case 30:
							this.#multiplicador.PLATA		*= 1.5;
							this.#multiplicador.GEMAS		*= 1.5;
							this.#multiplicador.JOYAS		*= 1.5;
							this.#multiplicador.CRISTAL	 	*= 1.5;
							break;
						case 9:
						case 13:
						case 27:
							this.#multiplicador.RUTAS       *= 2;
						break;
					}
				break;
				case 'ZULA':
				case 'NUMIAN':
					switch(ciudad.region){ 
						case 1:
							this.#multiplicador.ARMAS		*= 2;
							this.#multiplicador.HERRAMIENTAS*= 2;
							break;
						case 5:
							this.#multiplicador.PIEDRA  	*= 2.5;
							this.#multiplicador.BLOQUES	 	*= 2.5;
							break;
						case 6:
							this.#multiplicador.KARMA		*= 2;
							break;
						case 7:
							this.#multiplicador.MADERA    	*= 3;
							this.#multiplicador.TABLAS    	*= 3;
							break;
						case 9:
							this.#multiplicador.RUTAS       *= 3;
							break;
						case 11:
							this.#multiplicador.ALIMENTOS 	*= 2;
							this.#multiplicador.AGUA		*= 2;
							break;
						case 11:
							this.#multiplicador.ALIMENTOS 	*= 1.5;
							this.#multiplicador.AGUA		*= 1.5;
							break;
						case 16:
							this.#multiplicador.FAMA		*= 1.5;
							break;
					}
				case 'FANTASY':
					switch(ciudad.region){
						case 11:
							this.#multiplicador.FAMA		*= 1.5/0.9;
							break;
						case 12:
							this.#multiplicador.ORO 		*= 1.5;
							this.#multiplicador.MADERA   	*= 2;
							break;
						case 13:
							this.#multiplicador.KARMA		*= 1.2;
							this.#multiplicador.MANA		*= 1.2;
						case 6:
							this.#multiplicador.RUTAS       *= 2;
						break;
						case 7:							
							this.#multiplicador.MANA		*= 2;
							break;
						case 15:
							this.#multiplicador.KARMA		*= 2;
							break;
					}
				break;
			}
			this.#bonoMaravilla(maravillas)
		}
	}
	getMultiplicador(){
		return this.#multiplicador;
	}
	#bonoMaravilla(maravillas){
		if(maravillas==null)
			return;
		for (var lugar = 1; lugar <= 2; lugar++) {
			switch(maravillas["maravilla"+lugar]){
				case "Escalera del destino":
					this.#multiplicador.BLOQUES      *= 1+0.08/lugar;
				    this.#multiplicador.MADERA       *= 1+0.08/lugar;
				    this.#multiplicador.AGUA         *= 1+0.08/lugar;
				    this.#multiplicador.TABLAS       *= 1+0.08/lugar;
				    this.#multiplicador.ALIMENTOS    *= 1+0.08/lugar;
				    this.#multiplicador.PLATA        *= 1+0.08/lugar;
				    this.#multiplicador.HIERRO       *= 1+0.08/lugar;
				    this.#multiplicador.MITHRIL      *= 1+0.08/lugar;
				    this.#multiplicador.HERRAMIENTAS *= 1+0.08/lugar;
				    this.#multiplicador.PIEDRA       *= 1+0.08/lugar;
				    this.#multiplicador.ARMAS        *= 1+0.08/lugar;
				    this.#multiplicador.JOYAS        *= 1+0.08/lugar;
				    this.#multiplicador.CRISTAL      *= 1+0.08/lugar;
				    this.#multiplicador.GEMAS        *= 1+0.08/lugar;
					this.#multiplicador.RELIQUIAS    *= 1+0.08/lugar;
					break;
				case "Gran Puerto Mercantil":
					this.#multiplicador.RUTAS        *= 1.25/lugar;
					break;
				case "Estatua coloso":
					this.#multiplicador.FAMA         *= 1.25/lugar;
					break;
			}
		}
	}
}