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
	"FAMA"			: (5000+LOCAL.getValor())/3
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
	"FAMA"			: (5000+LOCAL.getValor())/3
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
	"castillo"      : [4000,200,"armas"],
	"muralla"       : [2500,600,"bloques"],
	"armeria"       : [1200,150,"armas"],
	"foso"          : [2500,300,"herramientas"],
	"cuartel"       : [3000,200,"hierro"],
	"torremagica"   : [1800,150,"cristal"],
	"universidad"   : [1300,200,"plata"],
	"santuario"     : [700,100,"mithril"],
	"templo"        : [2000,250,"mithril"],
	"mercado"       : [600,1000,"alimentos"],
	"mercadonegro"  : [600,150,"joyas"],
	"minaoro"       : [600,400,"madera"],
	"minaplata"     : [700,400,"madera"],
	"minahierro"    : [600,500,"madera"],
	"minapiedra"    : [600,400,"madera"],
	"minamithril"   : [2000,800,"madera"],
	"aserradero"    : [900,500,"alimentos"],
	"cultivos"      : [500,1200,"agua"],
	"yacimientos"   : [800,200,"herramientas"],
	"pozos"         : [600,300,"piedra"],
	"taller"        : [800,200,"hierro"],
	"forjahierro"   : [1200,200,"herramientas"],
	"forjamithril"  : [3000,250,"herramientas"],
	"joyeria"       : [1800,200,"herramientas"],
	"camaracristal" : [1300,400,"piedra"],
	"cantera"       : [600,200,"herramientas"],
	"carpinteria"   : [800,500,"madera"],
	"monumentos"    : [1500,300,"piedra"],
	"acueducto"     : [1200,300,"bloques"],
	"almacen"       : [600,250,"tablas"],
	"coliseo"       : [1500,400,"bloques"],
	"burdeles"      : [900,300,"tablas"],
	"escuela"       : [1500,300,"tablas"]
}

function getKpobla(pobla){
	let k_pobla=1/337524.1
	return 1+pobla*k_pobla
}