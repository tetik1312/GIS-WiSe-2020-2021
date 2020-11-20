/*Aufgabe2*/
interface Kopf {
    kopfform: string;
    kopffarbe: string;
    preis?: number;
}

interface Rumpf {
    rumpfformh: string;
    rumpffarbe: string;
    preis?: number;
}

interface Beine {
    beinform: string;
    beinfarbe: string;
    preis?: number;
}


function draw(): void { 
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    const context: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");

    context.lineWidth = 10;
    
    context.strokeRect(50, 100, 150, 110);
    context.fillStyle = "red";
    context.fillRect(130, 190, 40, 60);
    context.beginPath();
    context.moveTo(50, 140);
    context.lineTo(150, 60);
    context.lineTo(250, 140);
    context.closePath();
    context.stroke();
}
draw();





let button: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByTagName("button");

button[0].addEventListener("click", bestätigen);

function div(_e: Event): void {
    let div: HTMLDivElement = document.createElement("div");
    document.getElementById("fillThis")?.appendChild(div);
}

function bestätigen(_e: Event): void {
    let parent: HTMLDivElement = <HTMLDivElement>document.getElementById("fillThis");
    parent.innerHTML = "";
}

