if(document.querySelector(".barra_porcentaje").innerText=="100%")
	document.getElementById("submit_realizar_quest").click();
else if(LOCAL.getHeroe()!=null){
	let Heroes = LOCAL.getHeroe()
	for (let i = 0; i < Heroes.length; i++){
		if(Heroes[i].link==location.href){
			Heroes[i].cargada=true;
			LOCAL.setHeroe(Heroes);
		}
	}
	if (LOCAL.getHeroe()!=null){
			var heroes = LOCAL.getHeroe();
			var count=0;
			for (var i = heroes.length - 1; i >= 0; i--){
				if(!heroes[i].cargada){
					location.replace(heroes[i].link);
					return
				}
			}
		}
		else
			location.replace("tuimperio.php");
}
