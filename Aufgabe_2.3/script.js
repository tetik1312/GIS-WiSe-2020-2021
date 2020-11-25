"use strict";
let options = document.getElementsByTagName("option");
options[0].addEventListener("change", viereckig);
options[1].addEventListener("change", rund);
options[2].addEventListener("change", dreieckig);
function viereckig(_e) {
    //
}
function rund(_e) {
    //
}
function dreieckig(_e) {
    //
}
let bild1 = document.getElementById("Viereck");
bild1.setAttribute("src", "../Aufgabe_2.3/Viereck.png");
let bild2 = document.getElementById("Dreieck");
bild2.setAttribute("src", "../Aufgabe_2.3/Dreieck.png");
let bild3 = document.getElementById("Kreis");
bild3.setAttribute("src", "../Aufgabe_2.3/Kreis.png");
function bestätigen(_e) {
    let parent = document.getElementById("fillThis");
    parent.innerHTML = "";
}
//# sourceMappingURL=script.js.map