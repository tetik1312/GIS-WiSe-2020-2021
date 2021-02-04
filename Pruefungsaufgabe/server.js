"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
// importiert Http Module
const Http = require("http");
const mongodb_1 = require("mongodb");
const post_1 = require("./post");
const user_1 = require("./user");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server");
    //enviroment mit der Angabe der Portnummer von Heroku
    let port = Number(process.env.PORT);
    //wenn port nicht definiert ist (keiner von heroku zugewiesen wurde), wird port nr. 8100 aufgerufen
    if (!port)
        port = 8100;
    // server wird erstellt
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening on port: " + port);
    }
    function handleRequest(_request, _response) {
        const { method, url } = _request;
        if (method === "POST") {
            let body = "";
            _request.on("data", (data) => {
                body += data;
            });
            _request.on("end", async () => {
                // post data vom front ist ein object das beliebige Werte enthält
                // obwohl wir den typ für das definieren können, was wir haben
                const post = JSON.parse(body);
                if (url === "/signup") {
                    // wenn die url signup ist, sollte es einen benutzer registrieren
                    user_1.createUser({
                        firstName: post.firstName,
                        lastName: post.lastName,
                        email: post.email,
                        password: post.password,
                        age: post.age
                    })
                        .then(() => {
                        // sende success
                        endResponse(_response, "User created");
                    })
                        .catch((error) => {
                        // bei error, error abfangen und zum front schicken
                        onError(_response, error);
                    });
                }
                else if (url === "/profile") {
                    // profil mit erhaltener user id updaten
                    user_1.updateProfile(post.userId, {
                        firstName: post.firstName,
                        lastName: post.lastName,
                        email: post.email,
                        age: post.age,
                        password: post.password
                    })
                        .then((data) => {
                        // stringify array zu string, um es zum front zu senden, da der response header text ist
                        // wir könnten auch den response header so einstellen das stattdessen json gesendet wird
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/login") {
                    // versucht den user mit email und password einzuloggen
                    user_1.findUserByEmailAndPass(post.email, post.password)
                        .then((data) => {
                        if (data) {
                            // stringify array zu string um es zum frontend zu senden, da der response header text ist
                            endResponse(_response, JSON.stringify(data));
                        }
                        else {
                            endResponse(_response, "User not found", true);
                        }
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/posts") {
                    // create einen neuen post mit der empfangenen userId 
                    post_1.createPost(post.userId, {
                        title: post.title,
                        content: post.content
                    })
                        .then((data) => {
                        // stringify array zu string um es zum front zu senden, da der response header text ist
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/get-posts") {
                    // get posts von usern und den gefolgten usern, wenn eine userId vorhanden ist
                    post_1.getPosts(post.userId)
                        .then((data) => {
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/users/follow") {
                    // followed den user durch followId, userId ist die id des logged in users
                    user_1.follow(post.userId, post.followId)
                        .then((data) => {
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/users/unfollow") {
                    // unfollow den user von der followId die empfangen wurde, userId ist id vom eingeloggten user
                    user_1.unfollow(post.userId, post.followId)
                        .then((data) => {
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else {
                    // wenn eine url nicht übereinstimmt, löse die antwort auf 
                    _response.end();
                }
            });
        }
        else if (method === "GET") {
            // warten bis antwort emfangen haben dann GET method
            if (url === "/users") {
                // liste aller user abrufen
                user_1.getUsers()
                    .then((data) => {
                    // stringify array zu string um zum frontend zu senden, da die response header text ist
                    endResponse(_response, JSON.stringify(data));
                })
                    .catch((error) => {
                    onError(_response, error);
                });
            }
            else {
                // wenn die routen nicht übereinstimmen dann die antwort auflösen
                _response.end();
            }
        }
        else {
            // wenn method nicht überseinstimmt antwort auflösen
            _response.end();
        }
    }
    function onError(_response, error) {
        console.log(error);
        let responseText = "";
        // überprüfuen ob error übergeben wurde, der error ist ein MongoError.
        // error.code === 11000 bedeutet den versuch einen doppelten wert einzufügen
        // in dem fall wird die email als eindeutiges feld festgelegt
        if (error && error instanceof mongodb_1.MongoError && error.code === 11000) {
            responseText = "Email already in use";
        }
        else {
            // ein anderer error ist aufgetreten
            responseText = "An error occured";
        }
        endResponse(_response, responseText, true);
    }
    function endResponse(_response, responseText, isError = false) {
        // header setzen
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // wenn isError übergeben wurde und true ist, sollten wir den status auf 501 setzen
        if (isError) {
            _response.statusCode = 501;
        }
        else {
            _response.statusCode = 200;
        }
        // text setzen und beenden
        _response.write(responseText);
        _response.end();
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map