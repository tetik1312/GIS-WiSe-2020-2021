"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
//importiert Http Modul 
const Http = require("http");
const db_1 = require("./db");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server");
    //enviroment mit der Angabe der Portnummer von Heroku
    let port = Number(process.env.PORT);
    //wenn port nicht definiert ist (keiner von heroku zugewiesen wurde), wird port nr. 8100 aufgerufen
    if (!port) {
        port = 8100;
    }
    //server wird erstellt
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log("request");
        if (_request.method === "POST") {
            let body = "";
            _request.on("data", (data) => {
                body += data;
                _request.on("end", async () => {
                    // post data from front is an object which contain any values
                    // though we can define the type for oath we have
                    if (_request.url === "/login") {
                        const post = JSON.parse(body);
                        // use try catch to catch an error if something goes wrong
                        db_1.findUserByEmailAndPass({ email: post.email, password: post.password })
                            .then((user) => {
                            let responseText = "";
                            if (user) {
                                responseText = JSON.stringify(user);
                            }
                            else {
                                responseText = "User Not Found";
                            }
                            // send success
                            _response.write(responseText);
                            _response.end();
                        })
                            .catch((error) => {
                            // set status code to define that we have an error
                            _response.statusCode = 501;
                            _response.write(error.message);
                            _response.end();
                        });
                    }
                    else {
                        const post = JSON.parse(body);
                        // use try catch to catch an error if something goes wrong
                        db_1.createUser(post)
                            .then((user) => {
                            // send success
                            _response.write(JSON.stringify(user));
                            _response.end();
                        })
                            .catch((error) => {
                            // set status code to define that we have an error
                            _response.statusCode = 501;
                            _response.write(error.message);
                            _response.end();
                        });
                    }
                });
            });
        }
        else if (_request.method === "GET") {
            db_1.getUsers()
                .then((users) => {
                // send success
                _response.write(JSON.stringify(users));
                _response.end();
            })
                .catch((error) => {
                // set status code to define that we have an error
                _response.statusCode = 501;
                _response.write(error.message);
                _response.end();
            });
        }
        else {
            _response.end();
        }
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map