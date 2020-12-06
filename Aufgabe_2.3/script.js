"use strict";
var Rakete;
(function (Rakete) {
    let path = window.location.pathname;
    let page = path.split("/").pop();
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
    //ich habe diesen Teil der Aufgabe nicht ganz hinbekommen
    jsonLaden("https://127.0.0.1:5500/Aufgabe_2.3/data.json");
    async function jsonLaden(_url) {
        let response = await fetch(_url);
        let data = await response.json();
        localStorage.setItem("dataSpitze", JSON.stringify(data.spitzeJSON));
        localStorage.setItem("dataRumpf", JSON.stringify(data.rumpfperJSON));
        localStorage.setItem("dataAntrieb", JSON.stringify(data.antriebJSON));
    }
    let spitze = JSON.parse(localStorage.getItem("dataSpitze"));
    let rumpf = JSON.parse(localStorage.getItem("dataRumpf"));
    let antrieb = JSON.parse(localStorage.getItem("dataAntrieb"));
})(Rakete || (Rakete = {}));
//# sourceMappingURL=script.js.map