/*Aufgabe 1*/
function a1(): void {
    let x: string = "Alles";
    console.log(x);
    func1();
    console.log("Logo!");
}

a1();

function func1(): void {
    console.log("Klar?");
}

/*Aufgabe 2*/
function a2(): void {
    let i: number = 9;

    do {
        console.log(i);
        i = i - 1;
    } while (i > 0);
}

a2();

/*Aufgabe 4*/
let x: string = "Hallo";
console.log(x);
func2(x);
console.log(x);
func3();
func4();
console.log(x);

function func2(y: string): void {
    y = "Bla";
    console.log(y);
}

function func3(): void {
    let x: string = "Blubb";
    console.log(x);
}

function func4(): void {
    x = "Test";
}

/*Aufgabe 5*/
namespace Aufgabe5 {
    let x: number = 6;
    let y: number = 3;


    function multiply(x: number, y: number): void {
        let z: number = x * y;

        console.log(z);
    }
    multiply(x, y);


    function max(x: number, y: number): void {
        if (x < y) {
            console.log(y);
        }
        else {
            console.log(x);
        }
    }
    max(x, y);
}

function schleife(): void {
    let i: number = 100;

    do {
        console.log(i);
        i = i - 1;
    } while (i > 0);
}
schleife();

/*Aufgabe 6a*/
namespace Aufgabe6 {
    string();
    number();
    fizzbuzz();
    chess();
    chess2(4, 4);

    function string(): void {
        let a: string = "";
        while (a.length < 7) {
            a = a + "#";
            console.log(a);
        }
    }
    /*Aufgabe 6b*/
    function number(): void {
        for (let i: number = 0; i < 100; i++) {
            if (i % 3 == 0) {
                console.log("Fizz");
            }
            else if (i % 5 == 0) {
                console.log("Buzz");
            }
            else {
                console.log(i);
            }
        }
    }
    function fizzbuzz(): void {
        for (let i: number = 0; i < 100; i++) {

            if (i % 3 == 0 && i % 5 == 0) {
                console.log("FizzBuzz");
            }
            else if (i % 3 == 0) {
                console.log("Fizz");
            }
            else if (i % 5 == 0) {
                console.log("Buzz");
            }
            else {
                console.log(1);
            }
        }
    }
    function chess(): string {
        let board: string = "";
        let zeichen: string = "";
        for (let laenge: number = 0; laenge < 8; laenge++) {
            for (let breite: number = 0; breite < 8; breite++) {
                if (zeichen == "#") {
                    board = board + " ";
                    zeichen = "";
                }
                else {
                    board = board + "#";
                    zeichen = "#";
                }
            }
            board = board + "/n";
            if (zeichen == "#") {
                zeichen = " ";
            }
            else {
                zeichen = "#";
            }
        }
        console.log(board);
        return board;
    }
    function chess2(x: number, y: number): string {
        let board: string = "";
        let zeichen: string = " ";
        for (let laenge: number = 0; laenge < x; laenge++) {
            for (let breite: number = 0; breite < y; breite++) {
                if (zeichen == "#") {
                    board = board + " ";
                    zeichen = " ";
                }
                else {
                    board = board + "#";
                    zeichen = "#";
                }
            }
            board = board + "/n";

            if (zeichen == "#") {
                zeichen = " ";
            }
            else {
                zeichen = "#";
            }
        }
        console.log(board);
        return board;
    }
}



