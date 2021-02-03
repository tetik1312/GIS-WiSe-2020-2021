/*Aufgabe 1a*/
function min(): void {
    let x: number = 10;
    let y: number = 100;
    let z: number = 30;
    console.log(x, y, z);
}
min();

/*Aufgabe 1c*/
interface Student {
    name: string;
    matrikelnummer: number;
    studiengang: string;
}

let s1: Student = { name: "Max", matrikelnummer: 246380, studiengang: "MIB" };

let s2: Student = { name: "Fred", matrikelnummer: 265472, studiengang: "OMB" };

let s3: Student = { name: "Anna", matrikelnummer: 254261, studiengang: "MKB" };

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
function getContext(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myFirstCanvas");
    const context: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");

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

