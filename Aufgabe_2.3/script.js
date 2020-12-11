"use strict";
var Rakete;
(function (Rakete) {
    let spitzenAuswahl;
    let rumpfAuswahl;
    let antriebAuswahl;
    let path = window.location.pathname;
    let page = path.split("/").pop();
    function seitenAufbau() {
        if (page == "index.html") {
            //Ausgewählte Objekte als Ausgabe in der Konsole
            let spitzeSelect = document.getElementById("spitze");
            for (let i = 0; i < spitzenAuswahl.length; i++) {
                let newOptionElement = document.createElement("OPTION");
                newOptionElement.innerText = spitzenAuswahl[i].form;
                newOptionElement.setAttribute("value", spitzenAuswahl[i].bildurl);
                spitzeSelect.appendChild(newOptionElement);
            }
            let rumpfSelect = document.getElementById("rumpf");
            for (let i = 0; i < rumpfAuswahl.length; i++) {
                let newOptionElement = document.createElement("OPTION");
                newOptionElement.innerText = rumpfAuswahl[i].form;
                newOptionElement.setAttribute("value", rumpfAuswahl[i].bildurl);
                rumpfSelect.appendChild(newOptionElement);
            }
            let antriebSelect = document.getElementById("antrieb");
            for (let i = 0; i < antriebAuswahl.length; i++) {
                let newOptionElement = document.createElement("OPTION");
                newOptionElement.innerText = antriebAuswahl[i].form;
                newOptionElement.setAttribute("value", antriebAuswahl[i].bildurl);
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
                localStorage.setItem("Spitze", spitzenAuswahl[0].bildurl);
            }
            spitzeSelect.value = localStorage.getItem("Spitze");
            if (localStorage.getItem("Rumpf") == null) {
                localStorage.setItem("Rumpf", rumpfAuswahl[0].bildurl);
            }
            rumpfSelect.value = localStorage.getItem("Rumpf");
            if (localStorage.getItem("Antrieb") == null) {
                localStorage.setItem("Antrieb", antriebAuswahl[0].bildurl);
            }
            antriebSelect.value = localStorage.getItem("Antrieb");
        }
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
    if (page == "rakete.html") {
        bild(localStorage.getItem("SpitzeImg"));
        bild(localStorage.getItem("RumpfImg"));
        bild(localStorage.getItem("AntriebImg"));
        serverAnfrage("https://gis-communication.herokuapp.com");
    }
    async function serverAnfrage(_url) {
        let query = new URLSearchParams(localStorage);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let serverNachricht = await response.json();
        let serverAntwort = document.getElementById("serverAntwort");
        let text = document.createElement("p");
        if (serverNachricht.message !== undefined) {
            text.innerText = serverNachricht.message;
        }
        if (serverNachricht.error !== undefined) {
            text.setAttribute("style", "color:red");
            text.innerText = serverNachricht.error;
        }
        serverAntwort.appendChild(text);
    }
    jsonLaden("data.json");
    async function jsonLaden(_url) {
        let response = await fetch(_url);
        let data = await response.json();
        spitzenAuswahl = data.spitzeListe;
        rumpfAuswahl = data.rumpfListe;
        antriebAuswahl = data.antriebListe;
        seitenAufbau();
    }
    /*let spitzenAuswahl: Array<Spitze> = JSON.parse(localStorage.getItem("spitzeListe"));
    let rumpfAuswahl: Array<Rumpf> = JSON.parse(localStorage.getItem("rumpfListe"));
    let antriebAuswahl: Array<Antrieb> = JSON.parse(localStorage.getItem("antriebListe"));*/
})(Rakete || (Rakete = {}));
//# sourceMappingURL=script.js.map