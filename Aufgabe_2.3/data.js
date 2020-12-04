"use strict";
var Rakete;
(function (Rakete) {
    Rakete.spitzenAuswahl = [
        { form: "Viereckig", preis: 0, bildurl: "Bilder/Spitzen/Viereck.png" },
        { form: "Rund", preis: 0, bildurl: "Bilder/Spitzen/Kreis.png" },
        { form: "Dreieckig", preis: 0, bildurl: "Bilder/Spitzen/Dreieck.png" }
    ];
    let mySpitze = Rakete.spitzenAuswahl;
    let myJSON = JSON.stringify(mySpitze);
    console.log(myJSON);
    Rakete.rumpfAuswahl = [
        { form: "Viereckig", preis: 0, bildurl: "Bilder/Ruempfe/Viereck.png" },
        { form: "Rund", preis: 0, bildurl: "Bilder/Ruempfe/Kreis.png" },
        { form: "Dreieckig", preis: 0, bildurl: "Bilder/Ruempfe/Dreieck.png" }
    ];
    let myRumpf = Rakete.rumpfAuswahl;
    let myJSON1 = JSON.stringify(myRumpf);
    console.log(myJSON1);
    Rakete.antriebAuswahl = [
        { form: "Viereckig", preis: 0, bildurl: "Bilder/Antriebe/Viereck.png" },
        { form: "Rund", preis: 0, bildurl: "Bilder/Antriebe/Kreis.png" },
        { form: "Dreieckig", preis: 0, bildurl: "Bilder/Antriebe/Dreieck.png" }
    ];
    let myAntrieb = Rakete.antriebAuswahl;
    let myJSON2 = JSON.stringify(myAntrieb);
    console.log(myJSON2);
})(Rakete || (Rakete = {}));
//# sourceMappingURL=data.js.map