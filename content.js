var _WS_INDEX = "/index.php";
var _WS_IMPERIO = "/tuimperio.php";
var _WS_CLANES = "/clanes.php";
var _WS_CLAN = "/clan.php";
var _WS_ULTIMOSATAQUES = "/ultimosataquestuyos.php";
var _WS_INFORMES = "/informes.php";
var _WS_INFORMESCLAN = "/informes_clan.php";
var _WS_ESPIONAJEASEDIO = "/espionaje_asedio.php";
var _WS_ESPIONAJEREGIONES = "/espionaje_regiones.php";
var _WS_ESPIONAJERECONQUISTA = "/espionaje_reconquista.php";
var _WS_ESPIONAJECONTRAATAQUE = "/espionaje_contraataque.php";
var _WS_ESCOGEROBJECTIVO = "/escogerobjetivo.php";
var _WS_ATACAR = "/atacar.php";
var _WS_COMERCIO = "/comercio.php";
var _WS_RUTASCOMERCIALES = "/rutascomerciales.php"
var _WS_RANKING = "/rankings.php"
var _WS_MENSAJES = "/mensajes.php"
var _WS_LOGIN = "/login.php"
var _WS_MOVERTROPAS = "/movertropas.php"
var _WS_GOBIERNO = "/gobierno.php"

function executeProcess(url){


	if(url.indexOf(_WS_INDEX) != -1)
	{
		console.log("jelow")
		LOCAL.clean();
		//API.wakeUp();
		if($(".cabecera:first").text().trim()=="MrCosmo"){
			var saludo = new Audio (chrome.runtime.getURL('base/juanca.mp3'));
			saludo.play();
		}
		return;
	}

	alwaysDo();

	if(url.indexOf(_WS_IMPERIO) != -1)
	{
		imperio();
		return;
	}

	GLOBAL.showSuscription();

	if(LOCAL.getImperio() == null)
		GLOBAL.showError("La extensión no genero los parametros iniciales, por favor navega a la pagina de tu <a href='/tuimperio.php'>Imperio</a>");

	if(url.indexOf(_WS_ESCOGEROBJECTIVO) != -1)
	{
		escogerobjetivo();
		return;
	}

	if(url.indexOf(_WS_RANKING) != -1)
	{
		ranking();
		return;
	}

	if(url.indexOf(_WS_MENSAJES) != -1)
	{
		mensajes();
		return;
	}

	if(url.indexOf(_WS_ATACAR) != -1)
	{
		atacar();
		return;
	}

	if(url.indexOf(_WS_COMERCIO) != -1)
	{
		comercio();
		return;
	}

	if(url.indexOf(_WS_CLANES) != -1)
	{
		clanes();
		return;
	}

	if(url.indexOf(_WS_CLAN) != -1)
	{
		clan();
		return;
	}

	if(url.indexOf(_WS_ULTIMOSATAQUES) != -1)
	{
		ultimoAtaques();
		return;
	}

	if(url.indexOf(_WS_INFORMES) != -1 || url.indexOf(_WS_INFORMESCLAN) != -1)
	{
		informes();
		return;
	}
	
	if(url.indexOf(_WS_LOGIN) != -1)
	{
		login();
		return;
	}

	if(url.indexOf(_WS_GOBIERNO) != -1)
	{
		gobierno();
		return;
	}

	if(url.indexOf(_WS_MOVERTROPAS) != -1)
	{
		movertropas();
		return;
	}

	if(url.indexOf(_WS_ESPIONAJEASEDIO) != -1 || url.indexOf(_WS_ESPIONAJEREGIONES) != -1
	|| url.indexOf(_WS_ESPIONAJERECONQUISTA) != -1 || url.indexOf(_WS_ESPIONAJECONTRAATAQUE) != -1)
	{
		informes_activos();
		return;
	}
};

executeProcess(document.URL);
