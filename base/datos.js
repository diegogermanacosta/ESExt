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
	"TURNOS"        : 56000*GLOBAL.getClanCantidad()/12*GLOBAL.getClanCantidad()+1
}

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
	"TURNOS"        : 56000*GLOBAL.getClanCantidad()/(12*GLOBAL.getClanCantidad()+1)
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
	"almacen"       : [175,"ALIMENTOS"]
}

const COSTOS_INICIALES = {
	"castillo"      : [4000,200,"ARMAS"],
	"muralla"       : [2500,600,"BLOQUES"],
	"armeria"       : [1200,150,"ARMAS"],
	"foso"          : [2500,300,"HERRAMIENTAS"],
	"cuartel"       : [3000,200,"HIERRO"],
	"torremagica"   : [1800,150,"CRISTAL"],
	"universidad"   : [1300,200,"PLATA"],
	"santuario"     : [700,100,"MITHRIL"],
	"templo"        : [2000,250,"MITHRIL"],
	"mercado"       : [600,1000,"ALIMENTOS"],
	"mercadonegro"  : [600,150,"JOYAS"],
	"minaoro"       : [600,400,"MADERA"],
	"minaplata"     : [700,400,"MADERA"],
	"minahierro"    : [600,500,"MADERA"],
	"minapiedra"    : [600,400,"MADERA"],
	"minamithril"   : [2000,800,"MADERA"],
	"aserradero"    : [900,500,"ALIMENTOS"],
	"cultivos"      : [500,1200,"AGUA"],
	"yacimientos"   : [800,200,"HERRAMIENTAS"],
	"pozos"         : [600,300,"PIEDRA"],
	"taller"        : [800,200,"HIERRO"],
	"forjahierro"   : [1200,200,"HERRAMIENTAS"],
	"forjamithril"  : [3000,250,"HERRAMIENTAS"],
	"joyeria"       : [1800,200,"HERRAMIENTAS"],
	"camaracristal" : [1300,400,"PIEDRA"],
	"cantera"       : [600,200,"HERRAMIENTAS"],
	"carpinteria"   : [800,500,"MADERA"],
	"monumentos"    : [1500,300,"PIEDRA"],
	"acueducto"     : [1200,300,"BLOQUES"],
	"almacen"       : [600,250,"TABLAS"],
	"coliseo"       : [1500,400,"BLOQUES"],
	"burdeles"      : [900,300,"TABLAS"],
	"escuela"       : [1500,300,"TABLAS"]
}

function getKpobla(pobla){
	let k_pobla=1/337524.1
	return 1+pobla*k_pobla
}