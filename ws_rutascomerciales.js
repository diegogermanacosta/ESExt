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
var rutas = new Array();
//Recorre tabla ciudades fila por fila.
document.querySelectorAll(".lista1 tr").forEach(function callback(obj , index){
  
  if(index == 0)                   //Fila de titulos, agrega nombre de partida y salta de fila.
  {
    obj.children[1].innerHTML+="<span style='color: #990000'>("+GLOBAL.getPartida().substring(0,3)+")</span>";
    return
  }

  if(obj.children.length != 7)     //Si la fila no tiene 7 columnas, no es una fila de ciudad, salta de fila.
    return;

  //Carga datos de ciudad
  var idCiudad = parseInt(obj.children[0].innerText);
  var nombre = obj.children[1].innerText;
  var poblacion = parseInt(obj.children[2].innerText.replace(".",""));
  var edificios = parseInt(obj.children[3].innerText);
  
  //Calcula e imprime de oro ideal
  var oroideal=parseInt((3000+poblacion/10+edificios*30)*1.44*multiplicadorPolitica);
  obj.children[1].innerHTML+="<span style='color: #990000; font-weight: bold'>("+oroideal+")</span>";
  //Si la ciudad tiene bono de region, imprime
  for (i in ciudadConBonoRegion) {
    if(ciudadConBonoRegion[i]==obj.children[0].innerText)
      obj.children[1].innerHTML+="<span style='color: #001199; font-weight: bold'>"+multiplicadorRutas+"</span>";
  }
  if(LOCAL.getImperio()==null)
    return;
  rutas.push({
      "idCiudad": idCiudad,
      "ciudad": nombre,
      "poblacion": poblacion,
      "edificios": edificios,
      "imperio" : LOCAL.getImperio().nombre,
      "partida": GLOBAL.getPartida(),
      "ronda": GLOBAL.getRonda(),
      "fecha": new Date().formatDate()
    });
});

rutasComerciales_populate(rutas);
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

function rutasComerciales_populate(data)
{

    console.log(data)
  document.querySelectorAll(".lista1 tbody tr").forEach(function callback(obj , index){
    if(obj.children.length != 7)    //Si la fila no tiene 7 columnas, no es una fila de ciudad, salta de fila.
      return;
    var rutaIndex = calculaRuta(rutas[index/2],data)
    console.log(rutaIndex)
    //RUTA 1
    if(data.length > 0)
    {
      var ruta = obj.children[0].innerText;
      var nameRuta1 = "input[name=ruta1-" + ruta + "]";
      var nameRuta2 = "input[name=ruta2-" + ruta + "]";
      var ruta1 = data[rutaIndex[0].index];
      var ruta2 = data[rutaIndex[1].index];
      if (document.querySelector(nameRuta2).value==ruta1.idCiudad||document.querySelector(nameRuta1).value==ruta2.idCiudad){
        ruta1= ruta2;
        ruta2= data[rutaIndex[0].index];
      }
      obj.children[4].innerHTML+= rutasComerciales_generateIcon(ruta + "A", ruta1);
      obj.children[4].querySelectorAll("img").forEach(function callback(obj , index){
        obj.addEventListener("click" , function(){
          document.querySelector(nameRuta1).value=ruta1.idCiudad;
        });
      });
    }
    //RUTA 2
    if(data.length > 1)
    {
      obj.children[5].innerHTML+=rutasComerciales_generateIcon(ruta + "B", ruta2);
      obj.children[5].querySelectorAll("img").forEach(function callback(obj , index){
        obj.addEventListener("click" , function(){
          document.querySelector(nameRuta2).value=ruta2.idCiudad;
        });
      });
    }
  });
  UTIL.injectCode("base/ayuda.js");
}

function rutasComerciales_generateIcon(idCiudad, idRuta)
{
  return "<img src='https://images.empire-strike.com/archivos/icon_ciudad2.gif' class='ayudaExt' style='padding-left: 10px' width='13' height='15' data-tooltip-type='html' data-tooltip-html='#_tabciu" + idCiudad + "'> " + rutasComerciales_generateTablaCiudades(idCiudad, idRuta);
}

function rutasComerciales_generateTablaCiudades(idCiudad, idRuta)
{
  var tabla = "<div id='_tabciu" + idCiudad + "' style='display: none;'><table><tbody>";
  tabla += "<tr style='height: 20px'>";
  tabla += "<td colspan='3'><b>" + idRuta.ciudad + "</b> - " + idRuta.imperio + "</td>";
  tabla += "</tr>";
  tabla += "<tr style='height: 20px'>";
  tabla += "<td style='width: 60px'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_poblacion.png' height='16' width='16'> " + idRuta.poblacion + "</td>";
  tabla += "<td style='width: 60px'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_ciudad.gif' height='16' width='16'> " + idRuta.edificios + "</td>";
  tabla += "<td style='text-align: right;'>Hace " + idRuta.fecha + "</td>";
  tabla += "</tr>";
  tabla += "<tr style='height: 20px'>";
  tabla += "<td colspan='3' style='color:#990000'><b>Click para asignar la ciudad como ruta</b></td>";
  tabla += "</tr>";
  tabla += "</tbody></table></div>";

  return tabla;
}

function calculaRuta(ciudad,listaCiudades){
  
  var rutasCiudad = new Array;
  oroideal=parseInt((3000+ciudad.poblacion/10+ciudad.edificios*30)*1.44*multiplicadorPolitica);
  for (var i = 0; i < listaCiudades.length; i++) {

    if(listaCiudades[i].idCiudad==ciudad.idCiudad){
      continue
    }
    let rutaCiudad  = {
      index   : 0,
      valor   : 0
    }
    let pobla                  = 0;
    let edificios              = 0;
    let multiplicadorCiudad    = multiplicadorPolitica;
    rutaCiudad.index           = i;

    pobla = menor(listaCiudades[i].poblacion,ciudad.poblacion)
    edificios = menor(listaCiudades[i].edificios,ciudad.edificios)

    if( Math.abs( listaCiudades[i].poblacion - ciudad.poblacion)<=5000)
      multiplicadorCiudad     *= 1.2;
    if( Math.abs( listaCiudades[i].edificios - ciudad.edificios)<=20)
      multiplicadorCiudad     *= 1.2;

    rutaCiudad.valor=parseInt((3000+pobla/10+edificios*30)*multiplicadorCiudad);

    if(rutasCiudad.length<2){
      rutasCiudad.push(rutaCiudad);
      continue;
    }
    if(rutasCiudad[1].valor==oroideal&&rutasCiudad[0].valor==oroideal){
      return rutasCiudad;
    }
    let j = 0;
    if(rutasCiudad[1].valor<rutasCiudad[0].valor){
      j=1;
    }

    if(rutasCiudad[j].valor<rutaCiudad.valor){
      rutasCiudad[j] = rutaCiudad;
    }
  }
  return rutasCiudad;
}

function menor(a,b){
  if (a<b)
    return a;
  else
    return b;
}