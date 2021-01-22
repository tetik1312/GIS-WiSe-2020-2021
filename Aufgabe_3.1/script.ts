namespace Kapitelaufgabe {
    interface User {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        age: number;
    }

    interface IFormData<TValue> {
        // [key: string] bedeutet das der schlüssel im objekt ein beliebiger wert sein kann, aber wir definieren den type für string
        // TValue übergeben wir wenn wir unsere IFormData interface verwenden
        // wir verwenden dieses interface in FormData, um sie an den server zu senden
        [key: string]: TValue;
    }

    let url: string = "http://supernova22.herokuapp.com/";
    //let url: string = "http://localhost:8100/";

    // definiert html elemente, kann entweder das element sein oder undefined, abhänging von der seite 
    let signupForm: HTMLFormElement | undefined;
    let getUsersButton: HTMLButtonElement | undefined;
    let loginForm: HTMLFormElement | undefined;

    // wir warten bis das fenster geladen hat und das html übertragen wurde, sodass wir kein 'underfined' für getElementById bekommen
    window.addEventListener("load", onWindowLoad);

    function onWindowLoad(): void {
        console.log("load");
        signupForm = <HTMLFormElement>document.getElementById("signupForm");
        if (signupForm) {
            signupForm.addEventListener("submit", signup);
        }

        getUsersButton = <HTMLButtonElement>document.getElementById("getUsers");
        if (getUsersButton) {
            getUsersButton.addEventListener("click", getUsers);
        }

        loginForm = <HTMLFormElement>document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", login);
        }
    }

    async function signup(_event: Event): Promise<void> {
        // verhindert das nichterfüllen 
        _event.preventDefault();

        const formData: FormData = new FormData(signupForm);

        const data: IFormData<string> = {};
        // wir schleifen die werte um diese dem 'data' objekt hinzuzufügen
        formData.forEach(function (value: FormDataEntryValue, key: string): void {
            data[key] = value.toString();
        });

        console.log(data);

        const response: Response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseText: string = await response.text();
        console.log(response);
        alert(responseText);
    }

    async function login(_event: Event): Promise<void> {
        // verhindert das nichterfüllen der handlungsweise
        _event.preventDefault();

        const formData: FormData = new FormData(loginForm);

        const data: IFormData<string> = {};
        // wir schleifen die werte um diese dem 'data' objekt hinzuzufügen
        formData.forEach(function (value: FormDataEntryValue, key: string): void {
            data[key] = value.toString();
        });

        console.log(data);

        const response: Response = await fetch(url + "login", {
            method: "POST",
            body: JSON.stringify(data)
        });

        const responseText: string = await response.text();

        console.log(response);
        alert(responseText);
    }

    async function getUsers(): Promise<void> {
        // holt sich die user vom server
        const response: Response = await fetch(url);

        // die antwort in json konvertieren
        const data: User[] = await response.json();

        // array schleife und übertraegt es einer nach dem anderen
        for (const user of data) {
            renderUser(user);
        }
    }

    function renderUser(user: User): void {
        // wrapper element
        const newElement: HTMLDivElement = <HTMLDivElement>document.createElement("DIV");

        // title
        const titleElement: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h4");
        titleElement.innerText = user.firstName + " " + user.lastName;
        newElement.appendChild(titleElement);

        // hängt das wrapper element an die liste auf der seite 
        const container: HTMLElement | undefined = document.getElementById("users");
        if (container) {
            container.appendChild(newElement);
        }
    }
}