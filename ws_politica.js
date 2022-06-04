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
        var contador= 0;
        for (var i = 0; i < 10; i++) {
            if(obj.children[4].children[i].src=="https://images.empire-strike.com/v2/interfaz/estrella-roja.png")
                contador=contador+1;
            else
                i=10;
        }
        nombre=nombre.split("Coste: ");
        nombre= removeAccents(nombre[0].toLowerCase().replace(" ","").replace(" ",""));
        politicas[nombre][1]=contador;
        console.log(`${nombre} tiene ${politicas[nombre][1]} estrellas`);
    });
    politicas.imperio= LOCAL.getImperio()["nombre"];
    LOCAL.setPoliticas(politicas);
    GLOBAL.cargaImperio();
}
