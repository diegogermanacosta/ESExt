//Cargar Multiplicado de gobernante de region
var multiplicadorBase = 1;
document.querySelector("tfoot tr").children[0].innerHTML = "<span id='multiplicadores' style='color: #001199; font-weight: bold'></span>"
var multiplicadorGobernante = 2; 
if (GLOBAL.getPartida()=='ZULA'||GLOBAL.getPartida()=='NUMIAN')
  multiplicadorGobernante = 3;
if(LOCAL.getImperio()!=null&&LOCAL.getImperio().pacifico){
  multiplicadorBase *=1.2
  document.getElementById("multiplicadores").innerText = "Bonos: Pacifico=x1.2";
}
if(LOCAL.getClan()!=null){
  maraRutas(LOCAL.getClan().maravilla1,1);
  maraRutas(LOCAL.getClan().maravilla2,2);
}

//Almacenar Ciudades con bono de region segun Mapa  
var ciudadConBonoRegion = [];
if (LOCAL.getGobernantes()!=null)
  ciudadConBonoRegion = getCiudadesBonoRegion();
else                               //Agrega mensaje para cargar gobernantes si no esta cargado
  GLOBAL.showError("La extensión no genero los parametros iniciales, por favor navega a la pagina de <a href='/gobierno.php'>Mapa/Gobierno</a>");

//Cargar Multiplicado de Politicas de Contrabando
var multiplicadorPolitica=1;       //Valor por defecto sin Politicas cargadas.
if (LOCAL.getPoliticas()==null) //Agrega mensaje para cargar politicas si no esta cargado
  GLOBAL.showError("La extensión no genero los parametros iniciales, por favor navega a la pagina de <a href='/politica.php'>Politicas</a>");
else if(LOCAL.getPoliticas().rutasdecontrabando!=null)
    multiplicadorPolitica=1+0.06*LOCAL.getPoliticas().rutasdecontrabando;
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
  var poblacion = parseInt(obj.children[2].innerText.replace(".",""));
  var edificios = parseInt(obj.children[3].innerText);
  if(obj.children[1].innerText.length>7){
    obj.children[1].querySelector("a").innerText = obj.children[1].innerText.substring(0,5)+"..."
  }
  var nombre = obj.children[1].innerText;
  obj.children[1].innerHTML+="<span style='color: #990000; font-weight: bold'>("+oroIdeal({"poblacion": poblacion,"edificios": edificios})+")</span>";
  //Si la ciudad tiene bono de region, imprime
  let color = "#001199";
  let multiplicadorRutas = multiplicadorBase;
  for (i in ciudadConBonoRegion) {
    if(ciudadConBonoRegion[i]==obj.children[0].innerText){
      multiplicadorRutas *= multiplicadorGobernante;
      color = "#991199";
    }
  }
  obj.children[1].innerHTML+="<span id=multiplicadorCiudad"+obj.children[0].innerText+" style='color: "+color+"; font-weight: bold'>x"+multiplicadorRutas.toFixed(1)+"</span>";
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
      "fecha": new Date()
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
  let ciudades = LOCAL.getCiudad();
  let ciudadesConBono = [];
  for (let i = ciudades.length - 1; i >= 0; i--) {
    let miClan = LOCAL.getImperio()["clan"];
    let region = ciudades[i].region;
    let gobernanteRegion = LOCAL.getGobernantes();
    if ( gobernanteRegion[region]==miClan && esRegionRutas(region) ){
      ciudadesConBono.push(ciudades[i].idCiudad);
    }
  }
  return ciudadesConBono;
}
function rutasComerciales_populate(data){
  document.querySelectorAll(".lista1 tbody tr").forEach(function callback(obj , index){
    if(obj.children.length != 7)    //Si la fila no tiene 7 columnas, no es una fila de ciudad, salta de fila.
      return;
    var rutasCiudad = calculaRuta(rutas[index/2],data)
    //RUTA 1
    if(data.length > 0)
    {
      var idCiudad = obj.children[0].innerText;
      var nameRuta1 = "input[name=ruta1-" + idCiudad + "]";
      var nameRuta2 = "input[name=ruta2-" + idCiudad + "]";
      if (document.querySelector(nameRuta2).value==rutasCiudad[0].idCiudad||document.querySelector(nameRuta1).value==rutasCiudad[1].idCiudad){
        let aux = rutasCiudad[0];
        rutasCiudad[0]   = rutasCiudad[1];
        rutasCiudad[1]   = aux;
      }
      obj.children[4].appendChild( rutasComerciales_generateIcon(idCiudad , 1 ));
      obj.children[4].appendChild(rutasComerciales_generateTablaCiudades(idCiudad, 1, rutasCiudad[0]));
      obj.children[4].querySelector(".ayudaExt").addEventListener("click" , function(){
        document.querySelector(nameRuta1).value=rutasCiudad[0].idCiudad;
        document.querySelector(nameRuta1).onblur
      });
    }
    //RUTA 2
    if(data.length > 1)
    {
      obj.children[5].appendChild( rutasComerciales_generateIcon(idCiudad , 2 ));
      obj.children[5].appendChild( rutasComerciales_generateTablaCiudades(idCiudad, 2, rutasCiudad[1]));
      obj.children[5].querySelector(".ayudaExt").addEventListener("click" , function(){
        document.querySelector(nameRuta2).value=rutasCiudad[1].idCiudad;
        document.querySelector(nameRuta2).onblur
      });
    }
  });
}

function rutasComerciales_generateIcon(cityId, index) {
  let icon = document.createElement('img');
  icon.src = 'https://images.empire-strike.com/archivos/icon_ciudad2.gif';
  icon.classList.add('ayudaExt');
  icon.style.paddingLeft = '10px';
  icon.width = 13;
  icon.height = 15;
  icon.setAttribute('data-tooltip-type', 'html');
  icon.setAttribute('data-tooltip-html', `#_tabciu${cityId}_${index}`);
  return icon;
}

function rutasComerciales_generateTablaCiudades(idCiudad, index, idRuta) {
  const oroActualElement = document.getElementById(`${idCiudad}_bruta${index}`);
  const oroActual = parseInt(oroActualElement.innerText.replace(".", ""));
  const diferenciaOro = idRuta.valor - oroActual;

  const createTableCell = (content, colspan = 1, style = {}) => {
    const cell = document.createElement('td');
    cell.colSpan = colspan;
    Object.assign(cell.style, style);
    cell.innerHTML = content;
    return cell;
  };

  const createTableRow = (cells, height) => {
    const row = document.createElement('tr');
    row.style.height = height ? `${height}px` : 'auto';
    cells.forEach((cell) => row.appendChild(cell));
    return row;
  };

  const tabla          = document.createElement('div');
  tabla.id             = `_tabciu${idCiudad}_${index}`;
  tabla.style          = ' position: absolute; z-index: 3000; border: 1px solid #111; background-color: #eee; padding: 5px; opacity: .9; border-radius: 5px; box-shadow: 3px 3px 1em #000';
  tabla.style.display  = 'none';
  tabla.style.position = 'absolute';


  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  tbody.appendChild(createTableRow([createTableCell(`<b>${idRuta.ciudad}</b> - ${idRuta.imperio}`, 3)]));
  tbody.appendChild(createTableRow([
    createTableCell(`<img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_poblacion.png' height='16' width='16'> ${idRuta.poblacion}`, 1, { width: '60px' }),
    createTableCell(`<img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_ciudad.gif' height='16' width='16'> ${idRuta.edificios}`, 1, { width: '60px' }),
    createTableCell(`Hace ${parseInt((new Date().getTime() - idRuta.fecha.getTime()) / 3600000)} Horas`, 1, { textAlign: 'right' })
  ], 20));

  tbody.appendChild(createTableRow([createTableCell(`<b>Produccion: </b>+${idRuta.valor}`, 3)], 20));

  const cell4Content = `<b>Diferencia: </b><span class='sprite-recurso oro absmiddle'></span>`;
  const diferenciaStyle = diferenciaOro > 0 ? { color: '#990000', fontWeight: 'bolder' } : { color: '#000' };
  const cell4 = createTableCell(cell4Content, 3, diferenciaStyle);
  cell4.innerHTML += diferenciaOro > 0 ? ` +<b>${diferenciaOro}</b>` : `${diferenciaOro}`;
  cell4.innerHTML += `<span style='color: #001199; font-weight: bold'>(${parseInt(diferenciaOro * parseFloat(document.getElementById(`multiplicadorCiudad${idCiudad}`).innerText.replace("x", "")))})</span>`;
  tbody.appendChild(createTableRow([cell4], 20));

  const cell5Style = { color: diferenciaOro > 0 ? '#990000' : '#000' };
  tbody.appendChild(createTableRow([createTableCell(`<b>Click para asignar la ciudad como ruta</b>`, 3, cell5Style)], 20));

  table.appendChild(tbody);
  tabla.appendChild(table);

  return tabla;
}

function calculaRuta(ciudad,listaCiudades){
  var rutasCiudad = new Array;
  for (var i = 0; i < listaCiudades.length; i++) {
    let rutaCiudad  = listaCiudades[i];
    if(rutaCiudad.idCiudad==ciudad.idCiudad){
      continue
    }
    let multiplicadorCiudad    = multiplicadorPolitica;
    let pobla = menor(rutaCiudad.poblacion,ciudad.poblacion)
    let edificios = menor(rutaCiudad.edificios,ciudad.edificios)
    if( Math.abs( rutaCiudad.poblacion - ciudad.poblacion)<=5000)
      multiplicadorCiudad     *= 1.2;
    if( Math.abs( rutaCiudad.edificios - ciudad.edificios)<=20)
      multiplicadorCiudad     *= 1.2;
    rutaCiudad.valor=parseInt((3000+pobla/10+edificios*30)*multiplicadorCiudad);
    if(rutasCiudad.length<2){
      rutasCiudad.push(rutaCiudad);
      continue;
    }
    if(rutasCiudad[1].valor==oroIdeal(ciudad)&&rutasCiudad[0].valor==oroIdeal(ciudad)){
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

function oroIdeal(ciudad){
  return parseInt((3000+ciudad.poblacion/10+ciudad.edificios*30)*1.44*multiplicadorPolitica);
} 

function maraRutas(maravilla,lugar){
  if(maravilla==null)
    return;
  if("Gran Puerto Mercantil"==maravilla){
    multiplicadorBase *= 1+0.25/lugar;
    if(document.getElementById("multiplicadores").innerText.length>0)
      document.getElementById("multiplicadores").innerText += " -";
    else
      document.getElementById("multiplicadores").innerText += "Bonos:"
    document.getElementById("multiplicadores").innerText += " Maravilla=x"+ (1+0.25/lugar).toFixed(2);
  }
}

document.querySelectorAll('.ayudaExt').forEach(function(element) {
  element.addEventListener('mouseover', function() {
    showTooltip(element);
  });

  element.addEventListener('mouseout', function() {
    hideTooltip(element);
  });
});

function showTooltip(element) {
  const tooltipId = element.getAttribute('data-tooltip-html')
  document.querySelector(tooltipId).style.display = "block"
}

function hideTooltip(element) {
  const tooltipId = element.getAttribute('data-tooltip-html')
  document.querySelector(tooltipId).style.display = "none";
}