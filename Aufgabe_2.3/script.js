"use strict";
/*Aufgabe2*/
var Rakete;
(function (Rakete) {
    let spitze = document.getElementById("spitze");
    for (let i = 0; i < Rakete.spitzenAuswahl.length; i++) {
        let newOptionElement = document.createElement("OPTION");
        newOptionElement.innerText = Rakete.spitzenAuswahl[i].form;
        newOptionElement.setAttribute("value", Rakete.spitzenAuswahl[i].form + "_valueTag");
        spitze.appendChild(newOptionElement);
    }
    let rumpf = document.getElementById("rumpf");
    for (let i = 0; i < Rakete.rumpfAuswahl.length; i++) {
        let newOptionElement = document.createElement("OPTION");
        newOptionElement.innerText = Rakete.rumpfAuswahl[i].form;
        newOptionElement.setAttribute("value", Rakete.rumpfAuswahl[i].form + "_valueTag");
        rumpf.appendChild(newOptionElement);
    }
    let antrieb = document.getElementById("antrieb");
    for (let i = 0; i < Rakete.antriebAuswahl.length; i++) {
        let newOptionElement = document.createElement("OPTION");
        newOptionElement.innerText = Rakete.antriebAuswahl[i].form;
        newOptionElement.setAttribute("value", Rakete.antriebAuswahl[i].form + "_valueTag");
        antrieb.appendChild(newOptionElement);
    }
    spitze.addEventListener("change", spitzenAuswahlChanged);
    function spitzenAuswahlChanged(_e) {
        console.log(_e.target.value);
    }
    rumpf.addEventListener("change", rumpfAuswahlChanged);
    function rumpfAuswahlChanged(_e) {
        console.log(_e.target.value);
    }
    antrieb.addEventListener("change", antriebAuswahlChanged);
    function antriebAuswahlChanged(_e) {
        console.log(_e.target.value);
    }
    let bild1 = document.getElementById("Viereck");
    bild1.setAttribute("src", "../Aufgabe_2.3/Viereck.png");
    let bild2 = document.getElementById("Dreieck");
    bild2.setAttribute("src", "../Aufgabe_2.3/Dreieck.png");
    let bild3 = document.getElementById("Kreis");
    bild3.setAttribute("src", "../Aufgabe_2.3/Kreis.png");
    function bestätigeDeineAuswahl(_e) {
        let parent = document.getElementById("fillThis");
        parent.innerHTML = "";
    }
})(Rakete || (Rakete = {}));
//# sourceMappingURL=script.js.map