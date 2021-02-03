"use strict";
/*Aufgabe 1a*/
function min() {
    let x = 10;
    let y = 100;
    let z = 30;
    console.log(x, y, z);
}
min();
let s1 = { name: "Max", matrikelnummer: 246380, studiengang: "MIB" };
let s2 = { name: "Fred", matrikelnummer: 265472, studiengang: "OMB" };
let s3 = { name: "Anna", matrikelnummer: 254261, studiengang: "MKB" };
console.log(s1.name, s1.matrikelnummer, s1.studiengang);
console.log(s2.name, s2.matrikelnummer, s2.studiengang);
console.log(s3.name, s3.matrikelnummer, s3.studiengang);
/*Aufgabe 2
let arr: number[] = [10, 20, 30];
let arrback: number[] = backwards(arr);
console.log(arr);
console.log(arrback);
console.log(join(arr, [15, 25, 35]));
*/
/*Aufgabe 3*/
function getContext() {
    const canvas = document.getElementById("myFirstCanvas");
    const context = canvas.getContext("2d");
    context.lineWidth = 10;
    context.strokeRect(75, 140, 150, 110);
    context.fillRect(130, 190, 40, 60);
    context.beginPath();
    context.moveTo(50, 140);
    context.lineTo(150, 60);
    context.lineTo(250, 140);
    context.closePath();
    context.stroke();
}
getContext();
//# sourceMappingURL=script.js.map