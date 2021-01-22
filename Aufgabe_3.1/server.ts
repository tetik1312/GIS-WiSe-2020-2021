//importiert Http Modul 
import * as Http from "http";
import { MongoError } from "mongodb";

import { BaseUser, User, createUser, getUsers, LoginDetails, findUserByEmailAndPass } from "./db";

export namespace P_3_1Server {
    console.log("Starting server");

    //enviroment mit der Angabe der Portnummer von Heroku
    let port: number = Number(process.env.PORT);

    //wenn port nicht definiert ist (keiner von heroku zugewiesen wurde), wird port nr. 8100 aufgerufen
    if (!port) {
        port = 8100;
    }

    //server wird erstellt
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        console.log("request");

        if (_request.method === "POST") {
            let body: string = "";
            _request.on("data", (data) => {
                body += data;

                _request.on("end", async () => {
                    // post daten vom frontend ist ein objekt welches beliebige werte enthaelt
                    // obwohl wir den typ dafür definieren können, was wir haben
                    if (_request.url === "/login") {
                        const post: LoginDetails = JSON.parse(body);

                        // verwende try catch um einen fehler abzufangen, wenn etwas schief geht
                        findUserByEmailAndPass({ email: post.email, password: post.password })
                            .then((user: User | null) => {
                                let responseText: string = "";
                                if (user) {
                                    responseText = JSON.stringify(user);
                                } else {
                                    responseText = "User Not Found";
                                }

                                // sendet es mit erfolg
                                _response.write(responseText);
                                _response.end();
                            })
                            .catch((error: MongoError | Error) => {
                                // legt den statuscode fest, um zu definieren dass ein fehler vorliegt
                                _response.statusCode = 501;
                                _response.write(error.message);
                                _response.end();
                            });
                    } else {
                        const post: BaseUser = JSON.parse(body);

                        // verwende try catch um einen fehler abzufangen, wenn etwas schief geht
                        createUser(post)
                            .then((user: User) => {
                                // sendet es mit erfolg
                                _response.write(JSON.stringify(user));
                                _response.end();
                            })
                            .catch((error: MongoError | Error) => {
                                // legt den statuscode fest, um zu definieren dass ein fehler vorliegt
                                _response.statusCode = 501;
                                _response.write(error.message);
                                _response.end();
                            });
                    }
                });
            });
        } else if (_request.method === "GET") {
            getUsers()
                .then((users: User[]) => {
                    // sendet es mit erfolg
                    _response.write(JSON.stringify(users));
                    _response.end();
                })
                .catch((error: MongoError) => {
                    // legt den statuscode fest, um zu definieren dass ein fehler vorliegt
                    _response.statusCode = 501;
                    _response.write(error.message);
                    _response.end();
                });
        } else {
            _response.end();
        }
    }
}