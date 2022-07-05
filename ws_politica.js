var politicas ={};
politicas.losdioses         = 0;
politicas.magiaarcana       = 0;
politicas.rituales          = 0;
politicas.cultodemoniaco    = 0;
politicas.arquitectura      = 0;
politicas.rutasdecontrabando= 0;
politicas.profundidadcuevas = 0;
politicas.esclavitud        = 0;
politicas.patriotismo       = 0;
politicas.serviciomilitar   = 0;
politicas.torturas          = 0;
politicas.aduanas           = 0;
politicas.naturaleza        = 0;
politicas.libertadpolitica  = 0;
politicas.burguesia         = 0;
politicas.gremios           = 0;
politicas.lamujer           = 0;
politicas.nobleza           = 0;
politicas.justicia          = 0;
politicas.medicina          = 0;
politicas.escuelas          = 0;
politicas.musica            = 0;
  
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
            break;
    }
    nombre=nombre.split("Coste: ");
    nombre= borrarAcentos(nombre[0].toLowerCase().replace(" ","").replace(" ",""));
    politicas[nombre]=contador;
});
LOCAL.setPoliticas(politicas);
GLOBAL.cargaImperio();

function borrarAcentos(str){
   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}