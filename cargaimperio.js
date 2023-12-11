function cargaImperio() {
	if(LOCAL.getPoliticas()==null){
		cargaFantasma(location.origin+"/politica.php",getPoliticas,LOCAL.setPoliticas)
	}
	if(LOCAL.getGobernantes()==null){
		cargaFantasma(location.origin+"/gobierno.php",getGobiernantes,LOCAL.setGobernantes)
	}
	if(LOCAL.getClan()==null&&LOCAL.getImperio().clan!=''){
		let urlClan = location.origin+"/clan.php?sclan="+LOCAL.getImperio().clan;
		cargaFantasma(urlClan,getMaravillas,LOCAL.setClan)
	}
}
function cargaFantasma(url,funcionLectura,funcionCarga){
	fetch(url)
	  .then(response => {
	    // Verifica si la solicitud fue exitosa (código de estado 200)
	    if (response.status === 200) {
	      return response.text(); // Obtiene el contenido HTML como texto
	    } else {
	      throw new Error('Error en la solicitud');
	    }
	  })
	  .then(html => {
	    // Parsea el HTML y extrae información
	    const parser = new DOMParser();
	    const doc = parser.parseFromString(html, 'text/html');
	    // Utiliza métodos DOM para acceder y extraer datos
	    funcionCarga(funcionLectura(doc));
	    return funcionLectura(doc);
	  })
	  .catch(error => {
	    console.error('Ocurrió un error al hacer la solicitud HTTP:', error);
	  });
}
function getMaravillas(doc){
	var miClan = {
		maravilla1: null,
		maravilla2: null
	}
	if(doc.getElementById("_ayudam1")==null)
		return miClan;
	miClan.maravilla1 = doc.querySelector("#_ayudam1 h3").innerText;

	if(doc.getElementById("_ayudam2")==null)
		return miClan;
	miClan.maravilla2 = doc.querySelector("#_ayudam2 h3").innerText;
	return miClan;
}
function getGobiernantes(doc){
	let gobernantes=[];
	let n_regiones=0;
	switch (GLOBAL.getPartida())
	{
		case 'KENARON':
		case 'GARDIS':
			n_regiones= 30;
			break;
		case 'ZULA':
		case 'NUMIAN':
			n_regiones=16;
			break;
		case 'FANTASY':
			n_regiones=15;
	}
	for( i=1 ; i<=n_regiones ; i++)
	{
		gobernantes[i]= doc.getElementById("region"+i).innerText.trim().substring(0,3);
		
	}
	return gobernantes;
}
function getPoliticas(doc){
    let politica = {};
    doc.querySelectorAll(".lista1 tr").forEach(function callback(obj, index) {
        if(index == 0||obj.children.length < 3)
            return;
        let contador= 0;
        for (let i = 0; i < 10; i++) {
            if(obj.children[4].children[i].src=="https://images.empire-strike.com/v2/interfaz/estrella-roja.png")
                contador=contador+1;
            else
                break;
        }
        let nombre = obj.children[1].innerText.trim().split("Coste: ");
        politica[normalizar(nombre[0])]=contador;
    });
    return politica;
}
//borra tildes, espacios, y transforma en minusculas.
function normalizar(str){
   return str.toLowerCase().replaceAll(" ","").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}