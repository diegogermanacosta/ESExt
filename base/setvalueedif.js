var inputEdif = document.createElement("input");
inputEdif.setAttribute("id","valoresEdificio")
inputEdif.setAttribute("type","hidden");
inputEdif.setAttribute("value",JSON.stringify(__edificio));
var inputImp = document.createElement("input");
inputImp.setAttribute("id","recursosActuales")
inputImp.setAttribute("type","hidden");
inputImp.setAttribute("value",JSON.stringify(imp));
document.querySelector("body").appendChild(inputEdif);
document.querySelector("body").appendChild(inputImp);
