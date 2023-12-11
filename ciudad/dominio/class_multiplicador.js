class multiplicadores {
	#multiplicador;

	constructor(partida, gobierno, imperio, ciudad,politicas,maravillas){
		this.#multiplicador = {
			"ALIMENTOS"		: (1+ciudad.poblacion*K_POBLACION),
			"AGUA"          : (1+ciudad.poblacion*K_POBLACION),
			"HIERRO"        : (1+ciudad.poblacion*K_POBLACION),
			"HERRAMIENTAS"  : (1+ciudad.poblacion*K_POBLACION),
			"ARMAS"         : (1+ciudad.poblacion*K_POBLACION),
			"PIEDRA"        : (1+ciudad.poblacion*K_POBLACION),
			"MADERA"        : (1+ciudad.poblacion*K_POBLACION),
			"BLOQUES"       : (1+ciudad.poblacion*K_POBLACION),
			"TABLAS"        : (1+ciudad.poblacion*K_POBLACION),
			"MITHRIL"       : (1+ciudad.poblacion*K_POBLACION),
			"PLATA"         : (1+ciudad.poblacion*K_POBLACION),
			"CRISTAL"       : (1+ciudad.poblacion*K_POBLACION),
			"RELIQUIAS"     : (1+ciudad.poblacion*K_POBLACION),
			"GEMAS"         : (1+ciudad.poblacion*K_POBLACION),
			"JOYAS"         : (1+ciudad.poblacion*K_POBLACION),
			"KARMA"			: (1+ciudad.poblacion*K_POBLACION),
			"MANA"			: (1+ciudad.poblacion*K_POBLACION),
			"ORO"			: (1+ciudad.impuestos/100),
			"RUTAS"         : 1,
			"FAMA"			: 1
		}
		const terrenoBonos = BONO_TERRENO[ciudad.terreno];
		if (terrenoBonos) {
		  for (let recurso in terrenoBonos) {
		    this.#multiplicador[recurso] *= terrenoBonos[recurso];
		  }
		}
		this.#bonoGobierno(gobierno);
		this.#bonoMaravilla(maravillas);
		this.#bonoPoliticas(politicas);
		this.#bonoImperio(imperio);
	}
	getMultiplicador(){
		return this.#multiplicador;
	}
	#bonoGobierno(gobierno){
		if (!gobierno){
			console.log("no gobierna esta region");
			return;
		}
		const gobiernoBonos = BONO_GOBIERNO[MAPAS[partida]][ciudad.region];
		if (!gobiernoBonos){
			console.log("esta region no tiene bonos de produccion");
			return;
		}
		for (const recurso in gobiernoBonos) {
		  this.#multiplicador[recurso] *= gobiernoBonos[recurso];
		}
	}
	#bonoMaravilla(maravillas){
		if(!maravillas)
			return;
		for (var i = 1; i <= maravillas.length; i++) {
			for (var lugar = 1; lugar <= 2; lugar++) {
				const maravillaBonos = BONO_MARAVILLAS["maravilla"+lugar];
				if(maravillaBonos)
					continue;
				for(let recurso in maravillaBonos)
					this.#multiplicador[recurso] *= 1+maravillaBonos[recurso]/lugar;
			}
		}
	}
	#bonoPoliticas(politicas){
		if(!politicas){
			console.log("no se han cargado politicas")
			return;
		}
		for(let key in politicas){
			if(politicas[key]==0||!BONO_POLITICAS[key])
				continue;
			for(let recurso in BONO_POLITICAS[key]){
				this.#multiplicador[recurso] *= 1+BONO_POLITICAS[key][recurso]*politicas[key];
			}
		}
	}
	#bonoImperio(imperio){
		if(!imperio){
			console.log("no se ha cargado imperio");
			return;
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
	}
}