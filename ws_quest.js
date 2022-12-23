$(".tabs").parent().after(document.getElementById("sumario"));
let quests = document.getElementById("vertodasquest");
if(quests!=null)
	quests.click();
GLOBAL.cargaHeroe();
GLOBAL.cargaImperio();