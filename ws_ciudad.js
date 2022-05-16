


var N_clan=0;
var partida= GLOBAL.getPartida();
switch(partida) {
  case 'KENARON':
    N_clan=20;
    break;
  case 'GARDIS':
  case 'ZULA':
    N_clan=10;
    break;
  case 'NUMIAN':
    N_clan=5
    break;
  case 'FANTASY':
    N_clan=3;
    break;
  default:
    console.log("error fufu32: el nombre de la partida no coincide");
}
var produccion = {};

//VALORES MINIMOS DE COMPRA
var minimos = {};
minimos.HIERRO = 8;
minimos.RELIQUIAS = 40;
minimos.CRISTAL = 25;
minimos.JOYAS = 25;
minimos.HERRAMIENTAS = 15;
minimos.ARMAS = 20;
minimos.MITHRIL = 20;
minimos.GEMAS = 20;
minimos.PLATA = 15;
minimos.PIEDRA = 6;
minimos.BLOQUES = 10;
minimos.MADERA = 5;
minimos.TABLAS = 10;
minimos.ALIMENTOS = 3;
minimos.AGUA = 3;


var masRentable=99990;
var masRentableI=99990;
var edificios = new Array();
var aux;

function ciudad()
{ 
  document.getElementById('flotante').style.left="35%";
  var pobla= $("#poblacionciudad").html().trim();
  pobla= pobla  .replace(".", "");
  pobla=parseInt(pobla)/1000;
  //k_P = multiplicador Pacifico
  var k_P = 1
  if (LOCAL.getPacifico())
    k_P=1.2;
  var k_Karma = 1;
  var k_piedra = 1;
  var k_bloques = 1;
  var k_madera = 1;
  var k_agua = 1;
  var k_alimento = 1;
  var k_plata = 1;
  var k_hierro = 1;
  var k_mithril = 1;
  var k_tablas = 1;
  var k_oro = 1;

  if(LOCAL.getPoliticas()!=null)
  {
    let politicas= LOCAL.getPoliticas();
    k_Karma=1+0.05*politicas.losdioses[1];
    k_piedra = 1+0.02*(politicas.arquitectura[1]+politicas.esclavitud[1]);
    k_bloques= 1+0.02*politicas.arquitectura[1];
    k_madera= 1+0.02*(politicas.esclavitud[1]/2+politicas.naturaleza[1]);
    k_agua=1+0.01*politicas.lamujer[1];
    k_tablas=1+0.02*politicas.naturaleza[1];
    k_alimento=1+0.01*politicas.lamujer[1];
    k_plata=1+0.02*politicas.profundidadcuevas[1];
    k_hierro=(1+0.02*politicas.profundidadcuevas[1])*(1+0.02*politicas.esclavitud[1]);
    k_mithril=1+0.01*politicas.profundidadcuevas[1];
    k_oro = (1+(0.02*politicas.burguesia[1]))*(1-(0.02*politicas.aduanas[1]))*(1-(0.02*politicas.nobleza[1]));

  }

  var pBase=1;
  //Valores de produccion base de cada edificio
  
  produccion.castillo=0;
  produccion.muralla=0;
  produccion.armeria=0;
  produccion.foso=0;
  produccion.cuartel=0;
  produccion.torremagica=0;
  produccion.universidad=0;
  produccion.santuario=0;
  produccion.templo=76*N_clan*4.66*(1+0.0029*pobla)*k_Karma;
  produccion.mercado=620*k_P*k_oro;
  produccion.mercadonegro=1200*k_P*k_oro;
  produccion.minaoro=700*k_P*k_oro;
  produccion.minaplata=85*minimos.PLATA*(1+0.0029*pobla)*k_plata;
  produccion.minahierro=130*minimos.HIERRO*(1+0.0029*pobla)*k_hierro;
  produccion.minapiedra=175*minimos.PIEDRA*(1+0.0029*pobla)*k_piedra;
  produccion.minamithril=63*minimos.MITHRIL*(1+0.0029*pobla)*k_mithril;
  produccion.aserradero=238*minimos.MADERA*(1+0.0029*pobla)*k_madera;
  produccion.cultivos=200*minimos.ALIMENTOS*(1+0.0029*pobla)*k_alimento;
  produccion.yacimientos=65*minimos.GEMAS*(1+0.0029*pobla);
  produccion.pozos=175*minimos.AGUA*(1+0.0029*pobla)*k_agua;
  produccion.taller=130*minimos.HERRAMIENTAS*(1+0.0029*pobla);
  produccion.forjahierro=78*minimos.ARMAS*(1+0.0029*pobla);
  produccion.forjamithril=30*minimos.RELIQUIAS*(1+0.0029*pobla);
  produccion.joyeria=50*minimos.JOYAS*(1+0.0029*pobla);
  produccion.camaracristal=55*minimos.CRISTAL*(1+0.0029*pobla);
  produccion.cantera=105*minimos.BLOQUES*(1+0.0029*pobla)*k_bloques;
  produccion.carpinteria=115*minimos.TABLAS*(1+0.0029*pobla)*k_tablas;
  produccion.monumentos=(5000+LOCAL.getValor())/3;
  produccion.acueducto=200*minimos.AGUA*(1+0.0029*pobla)*k_agua;
  produccion.almacen=175*minimos.ALIMENTOS*(1+0.0029*pobla)*k_alimento;
  produccion.coliseo=0;
  produccion.burdeles=0;
  produccion.escuela=0;


  //CALCULO EFICIENCIA EN TERRENO
  var subtitulo=$(".subtitulo").text();
  var inicioCadena=subtitulo.indexOf(":")+2;
  var finCadeba=subtitulo.indexOf(";")
  var terreno= subtitulo.substring(inicioCadena,finCadeba);
  var region= parseInt(subtitulo.split("#")[1]);
  switch(terreno) {
    case 'Llanura':
      produccion.cultivos=produccion.cultivos*1.8;
      produccion.almacen=produccion.almacen*1.8;
      break;
    case 'Bosque':
      produccion.aserradero=produccion.aserradero*2;
      break;
    case 'Montaña':
      produccion.minahierro=produccion.minahierro*1.4;
      produccion.minamithril=produccion.minamithril*1.3;
      break;
    case 'Río':
      produccion.pozos=produccion.pozos*2.4;
      produccion.acueducto=produccion.acueducto*2.4;
      break;
    case 'Costa':
      produccion.cultivos=produccion.cultivos*1.6;
      produccion.almacen=produccion.almacen*1.6;
      break;
    case 'Colina':
      produccion.minapiedra=produccion.minapiedra*1.6;
      produccion.yacimientos=produccion.yacimientos*1.3;
      break;
  }
  //fin CALCULO EFICIENCIA EN TERRENO
  if(LOCAL.getGobernantes()!=null)
    if(LOCAL.getGobernantes()[region]==LOCAL.getImperio()["clan"])
    {
       switch(region){
        case 1:
          produccion.almacen=produccion.almacen*3;
          produccion.cultivos=produccion.cultivos*3;
          break;
        case 4:
          produccion.aserradero=produccion.aserradero*2;
          produccion.carpinteria=produccion.carpinteria*2;
          break;
        case 5:
          produccion.minaoro=produccion.minaoro*2;
          produccion.mercado=produccion.mercado*2;
          produccion.mercadonegro=produccion.mercadonegro*2;
          break;
        case 6:
          produccion.monumentos=produccion.monumentos*1.5;
          break;
        case 10:
          produccion.taller=produccion.taller*2;
          produccion.minahierro=produccion.minahierro*2;
          break;
        case 11:
          produccion.aserradero=produccion.aserradero*2;
          produccion.acueducto=produccion.acueducto*2;
          produccion.pozos=produccion.pozos*2;
          break;
        case 12:
          produccion.aserradero=produccion.aserradero*3;
          break;
        case 14:
          produccion.forjahierro=produccion.forjahierro*2;
          produccion.minahierro=produccion.minahierro*2;
        break;
        case 15:
          produccion.minamithril=produccion.minamithril*2;
          produccion.forjamithril=produccion.forjamithril*2;
          break;
        case 17:
          produccion.minapiedra=produccion.minapiedra*3;
          break;
        case 20:
          produccion.acueducto=produccion.acueducto*3;
          produccion.pozos=produccion.pozos*3;
          break;
        case 23:
          produccion.yacimientos=produccion.yacimientos*3;
          break;
        case 26:
          produccion.minaplata=produccion.minaplata*2;
          produccion.joyeria=produccion.joyeria*2;
          break;
        case 28:
          produccion.templo=produccion.templo*1.5;
          break;
        case 29:
          produccion.minapiedra=produccion.minapiedra*2;
          produccion.cantera=produccion.cantera*2;
          break;
        case 30:
          produccion.joyeria=produccion.joyeria*1.5;
          produccion.minaplata=produccion.minaplata*1.5;
          produccion.yacimientos=produccion.yacimientos*1.5;
          produccion.camaracristal=produccion.camaracristal*1.5;
          break;
      }
    }
  if (LOCAL.getImperio()!=null)
    if(LOCAL.getImperio()["raza"]=="Humanos")
    { 
      console.log("soy Humanos");
      console.log(produccion.joyeria);
      produccion.joyeria=produccion.joyeria*2;
      console.log(produccion.joyeria);
      produccion.forjamithril=produccion.forjamithril*2;
    }
  //GLOBAL.showOpcionesDisponibles();

  chrome.storage.sync.get({
    construcciones: true
  }, function(items) {

    if(items.construcciones)
      ciudad_process();
  });
}

function ciudad_process()
{
  if($(".c .nome").length == 0)
    return;

  UTIL.injectCode( function()
  {
    $("body").append("<input id='valoresEdificio' type=hidden value=" + JSON.stringify(__edificio) + " />");
    $("body").append("<input id='recursosActuales' type=hidden value=" + JSON.stringify(imp) + " />");
  });

  var costosIniciales = JSON.parse($("#valoresEdificio").val());
  var recursosActuales = JSON.parse($("#recursosActuales").val());
  var recursosUsados = JSON.parse($("#recursosActuales").val());
  var edificiosConstruidos = new Array();

  ciudad_cleanUsados(recursosUsados);

  UTIL.injectCode(function(){
    $("#valoresEdificio").remove();
    $("#recursosActuales").remove();
  });

  
  $(".c .nome").each(function(index, obj){
    var nombre = $(obj).text().trim().replace(" ","").replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u").toLowerCase();
    edificios.push(nombre);
    edificiosConstruidos.push(-1)
  });
  var costosTotales = new Array();

  for(var i = 0; i < edificios.length; i++)
  {
    var oroInicial = costosIniciales[i][0];
    var materialInicial = costosIniciales[i][1];
    var nombreRecurso = costosIniciales[i][2];
    var renta = renta_edif_base(oroInicial,materialInicial,nombreRecurso.toUpperCase(),edificios[i]);
    var costo = new Array();
    for (var j=1; j <=10; j++)
    {
    costo.push({ oro: ciudad_calcular(oroInicial, j), material: ciudad_calcular(materialInicial, j), recurso: nombreRecurso, rentabilidad: renta*j});
    }
    costosTotales.push(costo);
  }
  ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
  $(".estrella").each(function(index, obj){
     $(obj).mouseenter(function(){ ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); });
     $(obj).click(function(){ 
       masRentable=99990;
      ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); 
      ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); });
  });

  $(".elim").each(function(index, obj){
     $(obj).click(function(){ ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos); });
    //  $(obj).hover(function(){ ciudad_recalcular(costosTotales, recursosActuales, recursosUsados); });
  });

  $(".edificios img:not(.estrella):not(.elim):not(._ayuda):not(.ayuda)").each(function(index, obj){
      var id = obj.id;
      var estrella = parseInt(id.replace("edificio_estrella_", ""));
      var edificio = Math.floor(estrella / 10);
      var nroEdificio = estrella % 10;

      if(nroEdificio > edificiosConstruidos[edificio])
        edificiosConstruidos[edificio] = nroEdificio;
  });

  ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
}

function ciudad_cleanUsados(recursosUsados)
{
  for(var key in recursosUsados)
    recursosUsados[key] = 0;
}

function ciudad_recalcular(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos)
{
  ciudad_cleanUsados(recursosUsados);

  if($("#panel").html() == "")
  {
    ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
    return;
  }

  var costeOro = parseInt($("#panel #costeoro").html().trim());
  recursosUsados["ORO"] = costeOro;

  $("#panel [id*='coste']:not(#costeoro)").each(function(index, obj){
    var nombre = obj.id.replace("coste", "");
    var costo = parseInt($(obj).html().trim());
    recursosUsados[nombre.toUpperCase()] = costo;
  });

  ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos);
}

function ciudad_estrellas(costosTotales, recursosActuales, recursosUsados, edificiosConstruidos)
{
  $(".estrella").each(function(index, obj){

    if(obj.src == "https://images.empire-strike.com/v2/interfaz/estrella-amarilla.png" ||
       obj.src == "https://images.empire-strike.com/v2/interfaz/estrella-roja.png")
      return;

    var id = obj.id;
    var estrella = parseInt(id.replace("edificio_estrella_",""));
    var edificio = Math.floor(estrella/10);
    var nroEdificio = estrella % 10;
    var s = $(this).data('attr').split(',');
    var multiplicador=parseFloat(s[3]);

    var costoOro = costosTotales[edificio][nroEdificio].oro*multiplicador;
    var costoMat = costosTotales[edificio][nroEdificio].material*multiplicador;
    var recurso = costosTotales[edificio][nroEdificio].recurso.toUpperCase();
    var renta = costosTotales[edificio][nroEdificio].rentabilidad;
    
    var edificioContruid = edificiosConstruidos[edificio];
    var construidoOro = edificioContruid == -1 ? 0 : costosTotales[edificio][edificioContruid].oro*multiplicador;
    var construidoMat = edificioContruid == -1 ? 0 : costosTotales[edificio][edificioContruid].material*multiplicador;

    if((recursosActuales["ORO"] - recursosUsados["ORO"]) >= (costoOro - construidoOro) && (recursosActuales[recurso] - recursosUsados[recurso]) >= (costoMat - construidoMat))
      {obj.src = chrome.extension.getURL('base/estrella-verde.png');
        if(renta<=masRentable)
          {
            masRentable=renta;
            obj.src = chrome.extension.getURL('base/estrella-azul.png');
          }
      } 
    else
    {
      obj.src = "https://images.empire-strike.com/v2/interfaz/estrella-vacia.png";
      if(renta<=masRentableI&&renta<masRentable)
      {
        masRentableI=renta;
        obj.src = chrome.extension.getURL('base/estrella-blanca.png');
      }
    }
      
  });
  console.log("la rentabilidad mas alta es de: "+masRentable);
}

function ciudad_calcular(inicio, estrella)
{
  var result = 0;
  for(var i = 0; i <= estrella; i++)
    result += inicio * i;

  return result;
}

function renta_edif_base (costoOro,costoMat,recurso,nombre)
{ var politic=1;
  var region=1;
  var renta=99999;
  if(produccion[nombre]>0)
  {
  var costo=costoOro+costoMat*minimos[recurso];
  renta=costo/produccion[nombre];
  }
  return renta;
}

function renta_edif_hoy ()
{
  return 0;
}