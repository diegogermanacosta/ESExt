//minimos de compra
const MINIMOS = {
	"ALIMENTOS"		: 3,
	"AGUA"          : 3,
	"HIERRO"        : 8,
	"HERRAMIENTAS"  : 15,
	"ARMAS"         : 20,
	"PIEDRA"        : 6,
	"MADERA"        : 5,
	"BLOQUES"       : 10,
	"TABLAS"        : 10,
	"MITHRIL"       : 20,
	"PLATA"         : 15,
	"CRISTAL"       : 25,
	"RELIQUIAS"     : 40,
	"GEMAS"         : 20,
	"JOYAS"         : 25,
	"ORO"			: 1,
	"FAMA"			: (5000+LOCAL.getValor())/3,
	"TURNOS"        : 56000*GLOBAL.getClanCantidad()/12*GLOBAL.getClanCantidad()+1,
	"KARMA"         : 70/15*GLOBAL.getClanCantidad(),
	"MANA"          : 15
}
//maximos de venta
const MAXIMOS = {
	"ALIMENTOS"		: 3,
	"AGUA"          : 3,
	"HIERRO"        : 10,
	"HERRAMIENTAS"  : 21,
	"ARMAS"         : 28,
	"PIEDRA"        : 8,
	"MADERA"        : 6,
	"BLOQUES"       : 12,
	"TABLAS"        : 12,
	"MITHRIL"       : 28,
	"PLATA"         : 21,
	"CRISTAL"       : 37,
	"RELIQUIAS"     : 60,
	"GEMAS"         : 28,
	"JOYAS"         : 37,
	"ORO"			: 1,
	"FAMA"			: (5000+LOCAL.getValor())/3,
	"TURNOS"        : 56000*GLOBAL.getClanCantidad()/(12*GLOBAL.getClanCantidad()+1),
	"KARMA"         : 70/15*GLOBAL.getClanCantidad(),
	"MANA"          : 15
}
//valores de recursos
const CIERRE = {
	"ALIMENTOS"		: 3,
	"AGUA"          : 3,
	"HIERRO"        : 13,
	"HERRAMIENTAS"  : 20,
	"ARMAS"         : 30,
	"PIEDRA"        : 8,
	"MADERA"        : 7,
	"BLOQUES"       : 14,
	"TABLAS"        : 14,
	"MITHRIL"       : 30,
	"PLATA"         : 20,
	"CRISTAL"       : 37,
	"RELIQUIAS"     : 60,
	"GEMAS"         : 30,
	"JOYAS"         : 37,
	"ORO"			: 1.5,
	"FAMA"			: (5000+LOCAL.getValor())/3*1.5,
	"TURNOS"        : 56000*GLOBAL.getClanCantidad()/(12*GLOBAL.getClanCantidad()+1),
	"KARMA"         : 70/15*GLOBAL.getClanCantidad(),
	"MANA"          : 15
}
const PRODUCCION_BASE = {
	"torremagica"   : [75,"MANA"],
	"templo"        : [75,"KARMA"],
	"mercado"       : [620,"ORO"],
	"mercadonegro"  : [1200,"ORO"],
	"minaoro"       : [700,"ORO"],
	"minaplata"     : [85,"PLATA"],
	"minahierro"    : [130,"HIERRO"],
	"minapiedra"    : [175,"PIEDRA"],
	"minamithril"   : [62.5,"MITHRIL"],
	"aserradero"    : [237.5,"MADERA"],
	"cultivos"      : [200,"ALIMENTOS"],
	"yacimientos"   : [65,"GEMAS"],
	"pozos"         : [175,"AGUA"],
	"taller"        : [85,"HERRAMIENTAS"],
	"forjahierro"   : [80,"ARMAS"],
	"forjamithril"  : [30,"RELIQUIAS"],
	"joyeria"       : [50,"JOYAS"],
	"camaracristal" : [55,"CRISTAL"],
	"cantera"       : [105,"BLOQUES"],
	"carpinteria"   : [115,"TABLAS"],
	"monumentos"    : [1,"FAMA"],
	"acueducto"     : [200,"AGUA"],
	"almacen"       : [175,"ALIMENTOS"],
	"castillo"      : [0,"ORO"],
	"muralla"       : [0,"ORO"],
	"armeria"       : [0,"ORO"],
	"foso"          : [0,"ORO"],
	"cuartel"       : [0,"ORO"],
	"universidad"   : [0,"ORO"],
	"santuario"     : [0,"ORO"],
	"coliseo"       : [0,"ORO"],
	"burdeles"      : [0,"ORO"],
	"escuela"       : [0,"ORO"]
}
const COSTOS_INICIALES = {
	"castillo"      : {oro:4000,cantidadRecurso:200,recurso:"ARMAS"},
	"muralla"       : {oro:2500,cantidadRecurso:600,recurso:"BLOQUES"},
	"armeria"       : {oro:1200,cantidadRecurso:150,recurso:"ARMAS"},
	"foso"          : {oro:2500,cantidadRecurso:300,recurso:"HERRAMIENTAS"},
	"cuartel"       : {oro:3000,cantidadRecurso:200,recurso:"HIERRO"},
	"torremagica"   : {oro:1800,cantidadRecurso:150,recurso:"CRISTAL"},
	"universidad"   : {oro:1300,cantidadRecurso:200,recurso:"PLATA"},
	"santuario"     : {oro:700,cantidadRecurso:100,recurso:"MITHRIL"},
	"templo"        : {oro:2000,cantidadRecurso:250,recurso:"MITHRIL"},
	"mercado"       : {oro:600,cantidadRecurso:1000,recurso:"ALIMENTOS"},
	"mercadonegro"  : {oro:600,cantidadRecurso:150,recurso:"JOYAS"},
	"minaoro"       : {oro:600,cantidadRecurso:400,recurso:"MADERA"},
	"minaplata"     : {oro:700,cantidadRecurso:400,recurso:"MADERA"},
	"minahierro"    : {oro:600,cantidadRecurso:500,recurso:"MADERA"},
	"minapiedra"    : {oro:600,cantidadRecurso:400,recurso:"MADERA"},
	"minamithril"   : {oro:2000,cantidadRecurso:800,recurso:"MADERA"},
	"aserradero"    : {oro:900,cantidadRecurso:500,recurso:"ALIMENTOS"},
	"cultivos"      : {oro:500,cantidadRecurso:1200,recurso:"AGUA"},
	"yacimientos"   : {oro:800,cantidadRecurso:200,recurso:"HERRAMIENTAS"},
	"pozos"         : {oro:600,cantidadRecurso:300,recurso:"PIEDRA"},
	"taller"        : {oro:800,cantidadRecurso:200,recurso:"HIERRO"},
	"forjahierro"   : {oro:1200,cantidadRecurso:200,recurso:"HERRAMIENTAS"},
	"forjamithril"  : {oro:3000,cantidadRecurso:250,recurso:"HERRAMIENTAS"},
	"joyeria"       : {oro:1800,cantidadRecurso:200,recurso:"HERRAMIENTAS"},
	"camaracristal" : {oro:1300,cantidadRecurso:400,recurso:"PIEDRA"},
	"cantera"       : {oro:600,cantidadRecurso:200,recurso:"HERRAMIENTAS"},
	"carpinteria"   : {oro:800,cantidadRecurso:500,recurso:"MADERA"},
	"monumentos"    : {oro:1500,cantidadRecurso:300,recurso:"PIEDRA"},
	"acueducto"     : {oro:1200,cantidadRecurso:300,recurso:"BLOQUES"},
	"almacen"       : {oro:600,cantidadRecurso:250,recurso:"TABLAS"},
	"coliseo"       : {oro:1500,cantidadRecurso:400,recurso:"BLOQUES"},
	"burdeles"      : {oro:900,cantidadRecurso:300,recurso:"TABLAS"},
	"escuela"       : {oro:1500,cantidadRecurso:300,recurso:"TABLAS"}
}
const EDIFICIOS_REQUERIDOS = {
	"20": 13,
	"21": 13,
	"22": 15,
	"23": 12,
	"24": 18,
	"25": 14,
	"26": 16
}
const MAPAS = {
	KENARON: "GAIA",
	GARDIS:  "GAIA",
	ZULA:    "LEZA",
	NUMIAN:  "LEZA",
	FANTASY: "JADPIAN"
}
//Multiplicadores
const BONO_TERRENO = {
  'Llanura': { ALIMENTOS: 1.8 },
  'Bosque': { MADERA: 2 },
  'Montaña': { HIERRO: 1.4, MITHRIL: 1.3 },
  'Río': { AGUA: 2.4 },
  'Costa': { ALIMENTOS: 1.6 },
  'Colina': { PIEDRA: 1.6, GEMAS: 1.3 },
  'Volcán': { MANA: 1.2 },
  'Montaña Nevada': { ALIMENTOS: 0.85, CRISTAL: 2 },
  'Bosque Profundo': { MADERA: 1.6, TABLAS: 1.3 },
  'Lago': { KARMA: 1.1, ALIMENTOS: 1.3, AGUA: 1.3 }
};
const BONO_GOBIERNO = {
  GAIA: {
    '1':  { ALIMENTOS: 3 },
    '2':  { MANA: 2 },
    '4':  { MADERA: 2, TABLAS: 2 },
    '5':  { ORO: 2 },
    '6':  { FAMA: 1.5 },
    '9':  { RUTAS: 2 },
    '10': { HERRAMIENTAS: 2, HIERRO: 2 },
    '11': { MADERA: 2, AGUA: 2 },
    '12': { MADERA: 3 },
    '13': { RUTAS: 2 },
    '14': { ARMAS: 2, HIERRO: 2 },
    '15': { MITHRIL: 2, RELIQUIAS: 2 },
    '17': { PIEDRA: 3 },
    '20': { AGUA: 3 },
    '23': { GEMAS: 3 },
    '26': { PLATA: 2, JOYAS: 2 },
    '27': { RUTAS: 2 },
    '28': { KARMA: 1.5 },
    '29': { PIEDRA: 2, BLOQUES: 2 },
    '30': { PLATA: 1.5, GEMAS: 1.5, JOYAS: 1.5, CRISTAL: 1.5 }
  },
  LEZA: {
    '1':  { ARMAS: 2, HERRAMIENTAS: 2 },
    '5':  { PIEDRA: 2.5, BLOQUES: 2.5 },
    '6':  { KARMA: 2 },
    '7':  { MADERA: 3, TABLAS: 3 },
    '9':  { RUTAS: 3 },
    '11': { ALIMENTOS: 2, AGUA: 2 },
    '14': { ALIMENTOS: 1.5, AGUA: 1.5 },
    '16': { FAMA: 1.5 }
  },
  JADPIAN: {
    '6':  { RUTAS: 2 },
    '7':  { MANA: 2 },
    '11': { FAMA: 1.5 / 0.9 },
    '12': { ORO: 1.5, MADERA: 2 },
    '13': { KARMA: 1.2, MANA: 1.2 },
    '15': { KARMA: 2 }
  }
};
const BONO_POLITICAS = {
  lamujer: { ALIMENTOS: 0.01, AGUA: 0.01 },
  profundidadcuevas: { HIERRO: 0.02 },
  esclavitud: { HIERRO: 0.02, MADERA: 0.01 },
  arquitectura: { PIEDRA: 0.02, BLOQUES: 0.02 },
  naturaleza: { MADERA: 0.01, TABLAS: 0.02 },
  losdioses: { KARMA: 0.05 },
  magiaarcana: { MANA: 0.05 },
  burguesia: { ORO: 0.02 },
  aduanas: { ORO: -0.02 },
  nobleza: { ORO: -0.02 },
  rutasdecontrabando: { RUTAS: 0.06 }
};
const BONO_MARAVILLAS = {
  "Escalera del destino": {
    BLOQUES: 0.08,
    MADERA: 0.08,
    AGUA: 0.08,
    TABLAS: 0.08,
    ALIMENTOS: 0.08,
    PLATA: 0.08,
    HIERRO: 0.08,
    MITHRIL: 0.08,
    HERRAMIENTAS: 0.08,
    PIEDRA: 0.08,
    ARMAS: 0.08,
    JOYAS: 0.08,
    CRISTAL: 0.08,
    GEMAS: 0.08,
    RELIQUIAS: 0.08
  },
  "Gran Puerto Mercantil": {
    RUTAS: 0.25
  },
  "Estatua coloso": {
    FAMA: 0.25
  }
};
//Constante de aumento de produccion por habitante.
const K_POBLACION = 1/337524.1;