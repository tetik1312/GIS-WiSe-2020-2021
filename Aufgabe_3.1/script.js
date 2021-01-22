"use strict";
var Kapitelaufgabe;
(function (Kapitelaufgabe) {
    let url = "https://supernova22.herokuapp.com/";
    //let url: string = "http://localhost:8100/";
    // definiert html elemente, kann entweder das element sein oder undefined, abhänging von der seite 
    let signupForm;
    let getUsersButton;
    let loginForm;
    // wir warten bis das fenster geladen hat und das html übertragen wurde, sodass wir kein 'underfined' für getElementById bekommen
    window.addEventListener("load", onWindowLoad);
    function onWindowLoad() {
        console.log("load");
        signupForm = document.getElementById("signupForm");
        if (signupForm) {
            signupForm.addEventListener("submit", signup);
        }
        getUsersButton = document.getElementById("getUsers");
        if (getUsersButton) {
            getUsersButton.addEventListener("click", getUsers);
        }
        loginForm = document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", login);
        }
    }
    async function signup(_event) {
        // verhindert das nichterfüllen 
        _event.preventDefault();
        const formData = new FormData(signupForm);
        const data = {};
        // wir schleifen die werte um diese dem 'data' objekt hinzuzufügen
        formData.forEach(function (value, key) {
            data[key] = value.toString();
        });
        console.log(data);
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseText = await response.text();
        console.log(response);
        alert(responseText);
    }
    async function login(_event) {
        // verhindert das nichterfüllen der handlungsweise
        _event.preventDefault();
        const formData = new FormData(loginForm);
        const data = {};
        // wir schleifen die werte um diese dem 'data' objekt hinzuzufügen
        formData.forEach(function (value, key) {
            data[key] = value.toString();
        });
        console.log(data);
        const response = await fetch(url + "login", {
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseText = await response.text();
        console.log(response);
        alert(responseText);
    }
    async function getUsers() {
        // holt sich die user vom server
        const response = await fetch(url);
        // die antwort in json konvertieren
        const data = await response.json();
        // array schleife und übertraegt es einer nach dem anderen
        for (const user of data) {
            renderUser(user);
        }
    }
    function renderUser(user) {
        // wrapper element
        const newElement = document.createElement("DIV");
        // title
        const titleElement = document.createElement("h4");
        titleElement.innerText = user.firstName + " " + user.lastName;
        newElement.appendChild(titleElement);
        // hängt das wrapper element an die liste auf der seite 
        const container = document.getElementById("users");
        if (container) {
            container.appendChild(newElement);
        }
    }
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=script.js.map