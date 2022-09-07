if(document.querySelector(".barra_porcentaje").innerText=="100%")
	document.getElementById("submit_realizar_quest").click();
else{
	if (LOCAL.getHeroe()!=null){
	var Heroes = LOCAL.getHeroe()
	for (var i = 0; i < Heroes.length; i++){
		if(Heroes[i].link==location.href){
			Heroes[i].cargada=true;
			LOCAL.setHeroe(Heroes);
		}
	}
	//GLOBAL.cargaHeroe();
}
	GLOBAL.cargaImperio();}
