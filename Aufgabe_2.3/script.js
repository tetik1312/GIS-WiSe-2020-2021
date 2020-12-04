"use strict";
var Rakete;
(function (Rakete) {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    console.log(page);
    if (page == "index.html") {
        //Ausgewählte Objekte als Ausgabe in der Konsole
        let spitzeSelect = document.getElementById("spitze");
        for (let i = 0; i < Rakete.spitzenAuswahl.length; i++) {
            let newOptionElement = document.createElement("OPTION");
            newOptionElement.innerText = Rakete.spitzenAuswahl[i].form;
            newOptionElement.setAttribute("value", Rakete.spitzenAuswahl[i].bildurl);
            spitzeSelect.appendChild(newOptionElement);
        }
        let rumpfSelect = document.getElementById("rumpf");
        for (let i = 0; i < Rakete.rumpfAuswahl.length; i++) {
            let newOptionElement = document.createElement("OPTION");
            newOptionElement.innerText = Rakete.rumpfAuswahl[i].form;
            newOptionElement.setAttribute("value", Rakete.rumpfAuswahl[i].bildurl);
            rumpfSelect.appendChild(newOptionElement);
        }
        let antriebSelect = document.getElementById("antrieb");
        for (let i = 0; i < Rakete.antriebAuswahl.length; i++) {
            let newOptionElement = document.createElement("OPTION");
            newOptionElement.innerText = Rakete.antriebAuswahl[i].form;
            newOptionElement.setAttribute("value", Rakete.antriebAuswahl[i].bildurl);
            antriebSelect.appendChild(newOptionElement);
        }
        //Geänderte Auswahl
        spitzeSelect.addEventListener("change", spitzenAuswahlChanged);
        function spitzenAuswahlChanged(_e) {
            console.log(_e.target.value);
            localStorage.setItem("Spitze", _e.target.value);
            bild(localStorage.getItem("Spitze"));
        }
        rumpfSelect.addEventListener("change", rumpfAuswahlChanged);
        function rumpfAuswahlChanged(_e) {
            console.log(_e.target.value);
            localStorage.setItem("Rumpf", _e.target.value);
            bild(localStorage.getItem("Rumpf"));
        }
        antriebSelect.addEventListener("change", antriebAuswahlChanged);
        function antriebAuswahlChanged(_e) {
            console.log(_e.target.value);
            localStorage.setItem("Antrieb", _e.target.value);
            bild(localStorage.getItem("Antrieb"));
        }
        if (localStorage.getItem("Spitze") == null) {
            localStorage.setItem("Spitze", Rakete.spitzenAuswahl[0].bildurl);
        }
        spitzeSelect.value = localStorage.getItem("Spitze");
        if (localStorage.getItem("Rumpf") == null) {
            localStorage.setItem("Rumpf", Rakete.rumpfAuswahl[0].bildurl);
        }
        rumpfSelect.value = localStorage.getItem("Rumpf");
        if (localStorage.getItem("Antrieb") == null) {
            localStorage.setItem("Antrieb", Rakete.antriebAuswahl[0].bildurl);
        }
        antriebSelect.value = localStorage.getItem("Antrieb");
    }
    //Bild Ausgabe
    function bild(_imgString) {
        let spitzeImg = document.getElementById("SpitzeImg");
        spitzeImg.setAttribute("src", localStorage.getItem("Spitze"));
        let rumpfImg = document.getElementById("RumpfImg");
        rumpfImg.setAttribute("src", localStorage.getItem("Rumpf"));
        let antriebImg = document.getElementById("AntriebImg");
        antriebImg.setAttribute("src", localStorage.getItem("Antrieb"));
    }
    bild(localStorage.getItem("Spitze"));
    //Bestätigen Button um auf die nächste Seite zu kommen
    function bestätigeDeineAuswahl(_e) {
        let parent = document.getElementById("fillThis");
        parent.innerHTML = "";
    }
})(Rakete || (Rakete = {}));
//# sourceMappingURL=script.js.map