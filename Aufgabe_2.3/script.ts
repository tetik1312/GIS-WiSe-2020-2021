/*Aufgabe2*/
namespace Rakete {
    export interface Raketenteile {
        form: string;
        preis: number;
    }

    export interface Spitze extends Raketenteile { }

    export interface Rumpf extends Raketenteile { }

    export interface Antrieb extends Raketenteile { }
}


let options: HTMLCollectionOf<HTMLOptionElement> = document.getElementsByTagName("option");

options[0].addEventListener("change", viereckig);
options[1].addEventListener("change", rund);
options[2].addEventListener("change", dreieckig);

function viereckig(_e: Event): void {
    //
}

function rund(_e: Event): void {
    //
}

function dreieckig(_e: Event): void {
    //
}


let bild1: HTMLPictureElement = <HTMLPictureElement>document.getElementById("Viereck");
bild1.setAttribute("src", "../Aufgabe_2.3/Viereck.png");

let bild2: HTMLPictureElement = <HTMLPictureElement>document.getElementById("Dreieck");
bild2.setAttribute("src", "../Aufgabe_2.3/Dreieck.png");

let bild3: HTMLPictureElement = <HTMLPictureElement>document.getElementById("Kreis");
bild3.setAttribute("src", "../Aufgabe_2.3/Kreis.png");



function bestätigen(_e: Event): void {
    let parent: HTMLDivElement = <HTMLDivElement>document.getElementById("fillThis");
    parent.innerHTML = "";
}