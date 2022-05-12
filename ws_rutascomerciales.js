function rutasComerciales()
{
  var rutas = new Array();
  var k_politica=1
  var miClan=LOCAL.getImperio()["clan"];
  var gobernante = LOCAL.getGobernantes();
  var rutasx2 = [];
  if (gobernante==null){
    $(".tabs").append(`<a style='color: #990000; font-weight: bold;font-size:26px; text-decoration: none' href="gobierno.php">¡¡¡CARGA MAPA/GOBIERNO GUAMPUDO CONCIENTE DEL ORTO!!!</a>`)
  }
  else
   if(gobernante[9]==miClan||gobernante[13]==miClan||gobernante[27]==miClan)
      {
        let ciudades = LOCAL.getCiudad();
        for (var i = ciudades.length - 1; i >= 0; i--) 
        {
          let region= ciudades[i].region;
          if (gobernante[region]==miClan);
            if(region==9||region==13||region==27)
              rutasx2.push(ciudades[i].idCiudad);
        }
      }
    for (var i = rutasx2.length - 1; i >= 0; i--) 
      {
        console.log(rutasx2[i]);
      }

  if (LOCAL.getPoliticas()!=null)
    var k_politica=1+0.06*LOCAL.getPoliticas().rutasdecontrabando[1];
  else
    $(".tabs").append(`<a style='color: #990000; font-weight: bold;font-size:26px; text-decoration: none' href="politica.php">¡¡¡CARGA LAS POLITICAS FORRO HIJO DE MIL PUTA!!!</a>`);
  $(".lista1 tr").each(function(index, obj)
  {
    if(index == 0)
    {
      $(obj.children[1]).append("<span style='color: #990000; font-weight: bold'>("+GLOBAL.getPartida().substring(0,3)+")");
      return
    }

    if(obj.children.length != 7)
      return;

    var idCiudad = parseInt($(obj.children[0]).text());
    var nombre = $(obj.children[1]).text();
    var poblacion = parseInt($(obj.children[2]).text().replace(".",""));
    var edificios = parseInt($(obj.children[3]).text());
    var oroideal=parseInt((3000+poblacion/10+edificios*30)*1.44*k_politica);
    $(obj.children[1]).append("<span style='color: #990000; font-weight: bold'>("+oroideal+")");
    if(rutasx2!=null)
    {
      for (var i = rutasx2.length - 1; i >= 0; i--) 
      {
        if(rutasx2[i]==$(obj.children[0]).text())
          $(obj.children[1]).append("<span style='color: #001199; font-weight: bold'>X2");
      }
    }
      
    obj.id = "ruta_" + idCiudad;

    rutas.push({
      "idCiudad": idCiudad,
      "nombre": nombre,
      "poblacion": poblacion,
      "edificios": edificios,
      "partida": GLOBAL.getPartida(),
      "ronda": GLOBAL.getRonda()
    });
  });

  API.getRutas(rutas, rutasComerciales_populate);
}

function rutasComerciales_populate(data)
{
  for(var i = 0; i < data.length; i++)
  {
    var ruta = data[i];

    $("#ruta_" + ruta.idCiudad).each(function(index, obj){
      //RUTA 1
      if(ruta.ciudades.length > 0)
      {
        var nameRuta1 = "input[name=ruta1-" + ruta.idCiudad + "]";
        var valRuta1 = ruta.ciudades[0].idCiudad;
        $(obj.children[4]).append(rutasComerciales_generateIcon(ruta.idCiudad + "A", ruta.ciudades[0], ruta.ciudades[2], ruta.ciudades[4]));
        $(obj.children[4]).find("img").click(function(){
          $(nameRuta1).val(valRuta1);
        });
      }
      //RUTA 2
      if(ruta.ciudades.length > 1)
      {
        var nameRuta2 = "input[name=ruta2-" + ruta.idCiudad + "]";
        var valRuta2 = ruta.ciudades[1].idCiudad;
        $(obj.children[5]).append(rutasComerciales_generateIcon(ruta.idCiudad + "B", ruta.ciudades[1], ruta.ciudades[3], ruta.ciudades[5]));
        $(obj.children[5]).find("img").click(function(){
          $(nameRuta2).val(valRuta2);
        });
      }
    });
  }

  UTIL.injectCode(function() {
		$('.ayudaExt').tooltip();
	});
}

function rutasComerciales_generateIcon(idCiudad, ciudad1, ciudad2, ciudad3)
{
  return "<img src='https://images.empire-strike.com/archivos/icon_ciudad2.gif' class='ayudaExt' style='padding-left: 10px' width='13' height='15' data-tooltip-type='html' data-tooltip-html='#_tabciu" + idCiudad + "'> " + rutasComerciales_generateTablaCiudades(idCiudad, ciudad1, ciudad2, ciudad3);
}

function rutasComerciales_generateTablaCiudades(idCiudad, ciudad1, ciudad2, ciudad3)
{
  var tabla = "<div id='_tabciu" + idCiudad + "' style='display: none;'><table><tbody>";
	tabla += "<tr style='height: 20px'>";
  tabla += "<td colspan='3'><b>" + ciudad1.ciudad + "</b> - " + ciudad1.imperio + "</td>";
  tabla += "</tr>";
  tabla += "<tr style='height: 20px'>";
	tabla += "<td style='width: 60px'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_poblacion.png' height='16' width='16'> " + ciudad1.poblacion + "</td>";
	tabla += "<td style='width: 60px'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_ciudad.gif' height='16' width='16'> " + ciudad1.edificios + "</td>";
  tabla += "<td style='text-align: right;'>Hace " + ciudad1.fecha + "</td>";
  tabla += "</tr>";
  tabla += "<tr style='height: 20px'>";
  tabla += "<td colspan='3' style='color:#990000'><b>Click para asignar la ciudad como ruta</b></td>";
  tabla += "</tr>";

  if(ciudad2 != undefined && ciudad3 != undefined)
  {
    tabla += "<tr style='height: 20px'>";
    tabla += "<td colspan='3'><u>Ciudades secundarias</u></td>";
    tabla += "</tr>";
  }

  if(ciudad2 != undefined)
  {
    tabla += "<tr style='height: 20px'>";
    tabla += "<td colspan='3'><b>" + ciudad2.ciudad + "</b> - " + ciudad2.imperio + "</td>";
    tabla += "</tr>";
    tabla += "<tr style='height: 20px'>";
  	tabla += "<td style='width: 60px'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_poblacion.png' height='16' width='16'> " + ciudad2.poblacion + "</td>";
  	tabla += "<td style='width: 60px'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_ciudad.gif' height='16' width='16'> " + ciudad2.edificios + "</td>";
    tabla += "<td style='text-align: right;'>Hace " + ciudad2.fecha + "</td>";
    tabla += "</tr>";
  }

  if(ciudad3 != undefined)
  {
    tabla += "<tr style='height: 20px'>";
    tabla += "<td colspan='3'><b>" + ciudad3.ciudad + "</b> - " + ciudad3.imperio + "</td>";
    tabla += "</tr>";
    tabla += "<tr style='height: 20px'>";
    tabla += "<td style='width: 60px'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_poblacion.png' height='16' width='16'> " + ciudad3.poblacion + "</td>";
    tabla += "<td style='width: 60px'><img align='absmiddle' src='https://images.empire-strike.com/v2/iconos/icon_ciudad.gif' height='16' width='16'> " + ciudad3.edificios + "</td>";
    tabla += "<td style='text-align: right;'>Hace " + ciudad3.fecha + "</td>";
    tabla += "</tr>";
  }

	tabla += "</tbody></table></div>";

	return tabla;
}
