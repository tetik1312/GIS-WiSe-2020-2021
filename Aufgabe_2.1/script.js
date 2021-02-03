"use strict";
/*Aufgabe 1*/
function a1() {
    let x = "Alles";
    console.log(x);
    func1();
    console.log("Logo!");
}
a1();
function func1() {
    console.log("Klar?");
}
/*Aufgabe 2*/
function a2() {
    let i = 9;
    do {
        console.log(i);
        i = i - 1;
    } while (i > 0);
}
a2();
/*Aufgabe 4*/
let x = "Hallo";
console.log(x);
func2(x);
console.log(x);
func3();
func4();
console.log(x);
function func2(y) {
    y = "Bla";
    console.log(y);
}
function func3() {
    let x = "Blubb";
    console.log(x);
}
function func4() {
    x = "Test";
}
/*Aufgabe 5*/
var Aufgabe5;
(function (Aufgabe5) {
    let x = 6;
    let y = 3;
    function multiply(x, y) {
        let z = x * y;
        console.log(z);
    }
    multiply(x, y);
    function max(x, y) {
        if (x < y) {
            console.log(y);
        }
        else {
            console.log(x);
        }
    }
    max(x, y);
})(Aufgabe5 || (Aufgabe5 = {}));
function schleife() {
    let i = 100;
    do {
        console.log(i);
        i = i - 1;
    } while (i > 0);
}
schleife();
/*Aufgabe 6a*/
var Aufgabe6;
(function (Aufgabe6) {
    string();
    number();
    fizzbuzz();
    chess();
    chess2(4, 4);
    function string() {
        let a = "";
        while (a.length < 7) {
            a = a + "#";
            console.log(a);
        }
    }
    /*Aufgabe 6b*/
    function number() {
        for (let i = 0; i < 100; i++) {
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
    function fizzbuzz() {
        for (let i = 0; i < 100; i++) {
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
    function chess() {
        let board = "";
        let zeichen = "";
        for (let laenge = 0; laenge < 8; laenge++) {
            for (let breite = 0; breite < 8; breite++) {
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
    function chess2(x, y) {
        let board = "";
        let zeichen = " ";
        for (let laenge = 0; laenge < x; laenge++) {
            for (let breite = 0; breite < y; breite++) {
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
})(Aufgabe6 || (Aufgabe6 = {}));
//# sourceMappingURL=script.js.map