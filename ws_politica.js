var politicas ={
losdioses         : 0,
magiaarcana       : 0,
rituales          : 0,
cultodemoniaco    : 0,
arquitectura      : 0,
rutasdecontrabando: 0,
profundidadcuevas : 0,
esclavitud        : 0,
patriotismo       : 0,
serviciomilitar   : 0,
torturas          : 0,
aduanas           : 0,
naturaleza        : 0,
libertadpolitica  : 0,
burguesia         : 0,
gremios           : 0,
lamujer           : 0,
nobleza           : 0,
justicia          : 0,
medicina          : 0,
escuelas          : 0,
musica            : 0
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