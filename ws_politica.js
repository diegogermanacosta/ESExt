var politicas ={};
politicas.imperio= "nombre" ;
politicas.losdioses= new Array(30,0);
politicas.magiaarcana= new Array(30,0);
politicas.rituales= new Array(30,0);
politicas.cultodemoniaco= new Array(30,0);
politicas.arquitectura= new Array(30,0);
politicas.rutasdecontrabando= new Array(25,0);
politicas.profundidadcuevas= new Array(25,0);
politicas.esclavitud= new Array(25,0);
politicas.patriotismo= new Array(25,0);
politicas.serviciomilitar= new Array(25,0);
politicas.torturas=new Array(22,0);
politicas.aduanas=new Array(22,0);
politicas.naturaleza=new Array(22,0);
politicas.libertadpolitica= new Array(20,0);
politicas.burguesia= new Array(20,0);
politicas.gremios= new Array(20,0);
politicas.lamujer= new Array(16,0);
politicas.nobleza= new Array(15,0);
politicas.justicia= new Array(15,0);
politicas.medicina= new Array(15,0);
politicas.escuelas= new Array(15,0);
politicas.musica= new Array(15,0);

function politica()
{
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    $(".lista1 tr").each(function(index, obj) {
		  if(index == 0)
        return;

      if(obj.children.length < 3)
			  return;  

    var nombre = $(obj.children[1]).text().trim();
    nombre=nombre.split("Coste: ");
    var costo=parseInt(nombre[1].substring(0,nombre[1].indexOf(".")));
    nombre= removeAccents(nombre[0].toLowerCase().replaceAll(" ",""));
    politicas[nombre][1]=costo/politicas[nombre][0]-1;
    console.log(`${nombre} tiene ${politicas[nombre][1]} estrellas`);
    });
    politicas.imperio= LOCAL.getImperio()["nombre"];
    LOCAL.setPoliticas(politicas);
}
