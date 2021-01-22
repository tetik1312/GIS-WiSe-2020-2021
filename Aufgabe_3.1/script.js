"use strict";
var Kapitelaufgabe;
(function (Kapitelaufgabe) {
    // let url: string = "https://supernova22.herokuapp.com/";
    let url = "http://localhost:8100/";
    // definiert html elemente, kann entweder das element sein oder undefined, abhänging von der seite 
    let signupForm;
    let getUsersButton;
    let loginForm;
    // we wait for window to load and html to render, so we wont get underfined on getElementById
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
        // prevent default behaviour
        _event.preventDefault();
        const formData = new FormData(signupForm);
        const data = {};
        // we loop our values to add them to 'data' object
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
        // prevent default behaviour
        _event.preventDefault();
        const formData = new FormData(loginForm);
        const data = {};
        // we loop our values to add them to 'data' object
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
        // get users from server
        const response = await fetch(url);
        // conver response to json
        const data = await response.json();
        // loop array and render one by one
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
        // append wrapper element to list on page
        const container = document.getElementById("users");
        if (container) {
            container.appendChild(newElement);
        }
    }
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=script.js.map