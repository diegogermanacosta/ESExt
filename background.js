chrome.pageAction.onClicked.addListener(
	function(tab) {
		if (tab.url && tab.url.indexOf('https://www.empire-strike.com/') === 0)
			chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});

// Show page action icon in omnibar.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab ) {
	if (tab.url && tab.url.indexOf('https://www.empire-strike.com/') === 0)
		chrome.pageAction.show(tabId);
});

// ------------- EXPERIMENTAL ------------- //

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.message == "addAsedio")
	  	addAsedio(request.asedio);
		if (request.message == "removeAsedio")
			removeAsedio(request.asedio);
});

var asedios = {};
var notificaciones = {};

setInterval(checkAsedio, 1000 * 60);

function checkAsedio()
{
	var now = new Date();
	for(var key in asedios) {
	  if(asedios[key] == null)
			continue;

		var asedio = asedios[key];
		var horaNotificacion = (new Date(asedio.fecha)).addMinutes(-5);
		var horaAsedio = new Date(asedio.fecha);
		if(horaNotificacion <= now)
		{
			if(notificaciones[key] == undefined || notificaciones[key] == null || now > notificaciones[key])
			{
				var minutos = parseInt((horaAsedio - now) / 60 / 1000);
				notificaciones[key] = horaAsedio;
				sendNotification("En menos " + minutos + " minutos estará disponible para atacar la ciudad: " + asedio.ciudad);
			}

			asedios[key] = null;
		}
	}
}

Date.prototype.addMinutes = function(h) {
   this.setTime(this.getTime() + (h * 60 * 1000));
   return this;
}

function addAsedio(asedio)
{
	asedios[asedio.idCiudad + "_" + asedio.partida] = asedio;
}

function removeAsedio(asedio)
{
	asedios[asedio.idCiudad + "_" + asedio.partida] = null;
}

function sendNotification(msg)
{
	var notificationOptions = {
		title: "Asedio",
		message: msg,
		type: "basic",
		iconUrl: "icon.png"
	};

	chrome.notifications.create("", notificationOptions, function(){ console.log("Done!")})
}
