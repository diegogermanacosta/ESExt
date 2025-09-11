var _WS_INDEX                 = "/index.php";
var _WS_IMPERIO               = "/tuimperio.php";
var _WS_ULTIMOSATAQUES        = "/ultimosataquestuyos.php";
var _WS_INFORMES              = "/informes.php";
var _WS_INFORMESCLAN          = "/informes_clan.php";
var _WS_ESPIONAJEASEDIO       = "/espionaje_asedio.php";
var _WS_ESPIONAJEREGIONES     = "/espionaje_regiones.php";
var _WS_ESPIONAJERECONQUISTA  = "/espionaje_reconquista.php";
var _WS_ESPIONAJECONTRAATAQUE = "/espionaje_contraataque.php";
var _WS_ATACAR                = "/atacar.php";
var _WS_COMERCIO              = "/comercio.php";
var _WS_RUTASCOMERCIALES      = "/rutascomerciales.php"
var _WS_RANKING               = "/rankings.php"
var _WS_MENSAJES              = "/mensajes.php"
var _WS_LOGIN                 = "/login.php"
var _WS_POLITICAS             = "/politica.php"
var _WS_GOBIERNO              = "/gobierno.php"

function executeProcess(url){
	
	if(url.indexOf(_WS_INDEX) != -1)
	{
		LOCAL.clean();
		return;
	}

	alwaysDo();

	if(url.indexOf(_WS_RANKING) != -1)
	{
		ranking();
		return;
	}

	if(url.indexOf(_WS_POLITICAS) != -1)
	{
		LOCAL.setPoliticas(getPoliticas(document));
		return;
	}

	if(url.indexOf(_WS_GOBIERNO) != -1)
	{
		LOCAL.setGobernantes(getGobiernantes(document));
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

	if(url.indexOf(_WS_ESPIONAJEASEDIO) != -1 || url.indexOf(_WS_ESPIONAJEREGIONES) != -1
	|| url.indexOf(_WS_ESPIONAJERECONQUISTA) != -1 || url.indexOf(_WS_ESPIONAJECONTRAATAQUE) != -1)
	{
		informes_activos();
		return;
	}
};

executeProcess(document.URL);
