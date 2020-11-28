/*Aufgabe2*/
namespace Rakete {
    export interface Raketenteil {
        form: string;
        preis: number;
        bildurl: string;
    }

    export interface Spitze extends Raketenteil { }

    export interface Rumpf extends Raketenteil { }

    export interface Antrieb extends Raketenteil { }



    let spitze: HTMLSelectElement = <HTMLSelectElement>document.getElementById("spitze");

    for (let i: number = 0; i < spitzenAuswahl.length; i++) {
        let newOptionElement: HTMLOptionElement = <HTMLOptionElement>document.createElement("OPTION");
        newOptionElement.innerText = spitzenAuswahl[i].form;
        newOptionElement.setAttribute("value", spitzenAuswahl[i].form + "_valueTag");
        spitze.appendChild(newOptionElement);
    }

    let rumpf: HTMLSelectElement = <HTMLSelectElement>document.getElementById("rumpf");

    for (let i: number = 0; i < rumpfAuswahl.length; i++) {
        let newOptionElement: HTMLOptionElement = <HTMLOptionElement>document.createElement("OPTION");
        newOptionElement.innerText = rumpfAuswahl[i].form;
        newOptionElement.setAttribute("value", rumpfAuswahl[i].form + "_valueTag");
        rumpf.appendChild(newOptionElement);
    }

    let antrieb: HTMLSelectElement = <HTMLSelectElement>document.getElementById("antrieb");

    for (let i: number = 0; i < antriebAuswahl.length; i++) {
        let newOptionElement: HTMLOptionElement = <HTMLOptionElement>document.createElement("OPTION");
        newOptionElement.innerText = antriebAuswahl[i].form;
        newOptionElement.setAttribute("value", antriebAuswahl[i].form + "_valueTag");
        antrieb.appendChild(newOptionElement);
    }

    spitze.addEventListener("change", spitzenAuswahlChanged);

    function spitzenAuswahlChanged(_e: Event) {
        console.log((<HTMLHeadingElement>_e.target).value);
    }

    rumpf.addEventListener("change", rumpfAuswahlChanged);

    function rumpfAuswahlChanged(_e: Event) {
        console.log((<HTMLHeadingElement>_e.target).value);
    }

    antrieb.addEventListener("change", antriebAuswahlChanged);

    function antriebAuswahlChanged(_e: Event) {
        console.log((<HTMLHeadingElement>_e.target).value);
    }


    let bild1: HTMLPictureElement = <HTMLPictureElement>document.getElementById("Viereck");
    bild1.setAttribute("src", "../Aufgabe_2.3/Viereck.png");

    let bild2: HTMLPictureElement = <HTMLPictureElement>document.getElementById("Dreieck");
    bild2.setAttribute("src", "../Aufgabe_2.3/Dreieck.png");

    let bild3: HTMLPictureElement = <HTMLPictureElement>document.getElementById("Kreis");
    bild3.setAttribute("src", "../Aufgabe_2.3/Kreis.png");



    function bestätigeDeineAuswahl(_e: Event): void {
        let parent: HTMLDivElement = <HTMLDivElement>document.getElementById("fillThis");
        parent.innerHTML = "";
    }
}