"use strict";
let formularForm = document.getElementById("formular-form");
let registerButton = document.getElementById("submit");
registerButton.addEventListener("click", submitToServer);
let url = "https://supernova22.herokuapp.com/";
//let url: string = "http://localhost:8100/";
async function submitToServer(_event) {
    let formData = new FormData(document.forms[0]);
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    console.log(url);
    let response = await fetch(url);
    let responseText = await response.text();
    console.log(response);
    await fetch(url + "?" + query.toString());
    alert("Response: " + responseText);
}
async function communicate(_url) {
    let response = await fetch(_url);
    console.log("Response", response);
}
function processData(_event) {
    console.log();
}
//# sourceMappingURL=script.js.map