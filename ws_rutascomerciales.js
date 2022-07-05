//Cargar Multiplicado de gobernante de region
var multiplicadorRutas = "x2";     //Valor por defecto para Gardis, Kenaron y Fantasy
if (GLOBAL.getPartida()=='ZULA'||GLOBAL.getPartida()=='NUMIAN')
    multiplicadorRutas = "x3";

//Almacenar Ciudades con bono de region segun Mapa  
var ciudadConBonoRegion = [];
if (LOCAL.getGobernantes()!=null)
  ciudadConBonoRegion = getCiudadesBonoRegion();
else                               //Agrega mensaje para cargar gobernantes si no esta cargado
  GLOBAL.showError("La extensión no genero los parametros iniciales, por favor navega a la pagina de <a href='/gobierno.php'>Mapa/Gobierno</a>");

//Cargar Multiplicado de Politicas de Contrabando
var multiplicadorPolitica=1;       //Valor por defecto sin Politicas cargadas.
if (LOCAL.getPoliticas()!=null)
  multiplicadorPolitica=1+0.06*LOCAL.getPoliticas().rutasdecontrabando;
else                               //Agrega mensaje para cargar politicas si no esta cargado
  GLOBAL.showError("La extensión no genero los parametros iniciales, por favor navega a la pagina de <a href='/politica.php'>Politicas</a>");

//Recorre tabla ciudades fila por fila.
$(".lista1 tr").each(function(index, obj){
  
  if(index == 0)                   //Fila de titulos, agrega nombre de partida y salta de fila.
  {
    $(obj.children[1]).append("<span style='color: #990000'>("+GLOBAL.getPartida().substring(0,3)+")</span>");
    return
  }

  if(obj.children.length != 7)     //Si la fila no tiene 7 columnas, no es una fila de ciudad, salta de fila.
    return;

  //Carga datos de ciudad
  var idCiudad = parseInt($(obj.children[0]).text());
  var nombre = $(obj.children[1]).text();
  var poblacion = parseInt($(obj.children[2]).text().replace(".",""));
  var edificios = parseInt($(obj.children[3]).text());
  
  //Calcula e imprime de oro ideal
  var oroideal=parseInt((3000+poblacion/10+edificios*30)*1.44*multiplicadorPolitica);
  $(obj.children[1]).append("<span style='color: #990000; font-weight: bold'>("+oroideal+")</span>");
  
  //Si la ciudad tiene bono de region, imprime
  for (i in ciudadConBonoRegion) {
    if(ciudadConBonoRegion[i]==$(obj.children[0]).text())
      $(obj.children[1]).append("<span style='color: #001199; font-weight: bold'>"+multiplicadorRutas+"</span>");
  }
});

//fin de implementacion e inicio lista de funciones

function esRegionRutas(region){
  switch (GLOBAL.getPartida()){
    case 'KENARON':
    case 'GARDIS':
      if(region==9||region==13||region==27){  
        return true;
      }
      break;
    case 'ZULA':
    case 'NUMIAN':
      if(region==9){
        return true;
      }
      break;
    case 'FANTASY':
      if(region==6||region==13){
        return true;
      }
      break;
    default:
      return false;
  }
}

function getCiudadesBonoRegion(){
  //carga ciudades;
  let ciudades = LOCAL.getImperio().ciudades;
  let ciudadesConBono = [];
  for (var i = ciudades.length - 1; i >= 0; i--) {
    let miClan = LOCAL.getImperio()["clan"];
    let region = ciudades[i].region;
    let gobernanteRegion = LOCAL.getGobernantes();
    if (gobernanteRegion[ciudades[i].region]==miClan&&esRegionRutas(ciudades[i].region)){
      ciudadesConBono.push(ciudades[i].idCiudad);
    }
  }
  return ciudadesConBono;
}

