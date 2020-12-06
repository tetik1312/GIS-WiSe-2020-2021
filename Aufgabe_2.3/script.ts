
namespace Rakete {
    export interface Raketenteil {
        form: string;
        preis: number;
        bildurl: string;
    }

    export interface Spitze extends Raketenteil { }

    export interface Rumpf extends Raketenteil { }

    export interface Antrieb extends Raketenteil { }


    let path: string = window.location.pathname;
    let page: string = path.split("/").pop();


    if (page == "index.html") {


        //Ausgewählte Objekte als Ausgabe in der Konsole
        let spitzeSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("spitze");

        for (let i: number = 0; i < spitzenAuswahl.length; i++) {
            let newOptionElement: HTMLOptionElement = <HTMLOptionElement>document.createElement("OPTION");
            newOptionElement.innerText = spitzenAuswahl[i].form;
            newOptionElement.setAttribute("value", spitzenAuswahl[i].bildurl);
            spitzeSelect.appendChild(newOptionElement);
        }

        let rumpfSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("rumpf");

        for (let i: number = 0; i < rumpfAuswahl.length; i++) {
            let newOptionElement: HTMLOptionElement = <HTMLOptionElement>document.createElement("OPTION");
            newOptionElement.innerText = rumpfAuswahl[i].form;
            newOptionElement.setAttribute("value", rumpfAuswahl[i].bildurl);
            rumpfSelect.appendChild(newOptionElement);
        }

        let antriebSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("antrieb");

        for (let i: number = 0; i < antriebAuswahl.length; i++) {
            let newOptionElement: HTMLOptionElement = <HTMLOptionElement>document.createElement("OPTION");
            newOptionElement.innerText = antriebAuswahl[i].form;
            newOptionElement.setAttribute("value", antriebAuswahl[i].bildurl);
            antriebSelect.appendChild(newOptionElement);
        }


        //Geänderte Auswahl
        spitzeSelect.addEventListener("change", spitzenAuswahlChanged);

        function spitzenAuswahlChanged(_e: Event): void {
            console.log((<HTMLOptionElement>_e.target).value);
            localStorage.setItem("Spitze", (<HTMLOptionElement>_e.target).value);
            bild(localStorage.getItem("Spitze"));
        }

        rumpfSelect.addEventListener("change", rumpfAuswahlChanged);

        function rumpfAuswahlChanged(_e: Event): void {
            console.log((<HTMLOptionElement>_e.target).value);
            localStorage.setItem("Rumpf", (<HTMLOptionElement>_e.target).value);
            bild(localStorage.getItem("Rumpf"));
        }

        antriebSelect.addEventListener("change", antriebAuswahlChanged);

        function antriebAuswahlChanged(_e: Event): void {
            console.log((<HTMLOptionElement>_e.target).value);
            localStorage.setItem("Antrieb", (<HTMLOptionElement>_e.target).value);
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

    //Bild Ausgabe

    function bild(_imgString: string): void {
        let spitzeImg: HTMLPictureElement = <HTMLPictureElement>document.getElementById("SpitzeImg");
        spitzeImg.setAttribute("src", localStorage.getItem("Spitze"));

        let rumpfImg: HTMLPictureElement = <HTMLPictureElement>document.getElementById("RumpfImg");
        rumpfImg.setAttribute("src", localStorage.getItem("Rumpf"));

        let antriebImg: HTMLPictureElement = <HTMLPictureElement>document.getElementById("AntriebImg");
        antriebImg.setAttribute("src", localStorage.getItem("Antrieb"));
    }
    bild(localStorage.getItem("Spitze"));



    if (page == "rakete.html") {

        bild(localStorage.getItem("SpitzeImg"));
        bild(localStorage.getItem("RumpfImg"));
        bild(localStorage.getItem("AntriebImg"));

        serverAnfrage("https://gis-communication.herokuapp.com");
    }



    async function serverAnfrage(_url: string): Promise<void> {
        let query: URLSearchParams = new URLSearchParams(localStorage);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let serverNachricht: ServerMessage = await response.json();
        let serverAntwort: HTMLElement = document.getElementById("serverAntwort");
        let text: HTMLParagraphElement = document.createElement("p");

        if (serverNachricht.message !== undefined) {
            text.innerText = serverNachricht.message;
        }
        if (serverNachricht.error !== undefined) {
            text.setAttribute("style", "color:red");
            text.innerText = serverNachricht.error;
        }
        serverAntwort.appendChild(text);
    }

    interface ServerMessage {
        message: string;
        error: string;
    }

//ich habe diesen Teil der Aufgabe nicht ganz hinbekommen
    jsonLaden("https://127.0.0.1:5500/Aufgabe_2.3/data.json");

    async function jsonLaden(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let data = await response.json();
        localStorage.setItem("dataSpitze", JSON.stringify(data.spitzeJSON));
        localStorage.setItem("dataRumpf", JSON.stringify(data.rumpfperJSON));
        localStorage.setItem("dataAntrieb", JSON.stringify(data.antriebJSON));

    }
    let spitze : Array<Spitze> = JSON.parse(localStorage.getItem("dataSpitze"));
    let rumpf : Array<Rumpf> = JSON.parse(localStorage.getItem("dataRumpf"));
    let antrieb : Array<Antrieb> = JSON.parse(localStorage.getItem("dataAntrieb"));

}