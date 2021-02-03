"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
// importiert Http Module
const Http = require("http");
const mongodb_1 = require("mongodb");
const Post_1 = require("./Post");
const User_1 = require("./User");
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
                // post data from front is an object which contain any values
                // though we can define the type for oath we have
                const post = JSON.parse(body);
                if (url === "/signup") {
                    // if url is signup, we should register a user
                    User_1.createUser({
                        firstName: post.firstName,
                        lastName: post.lastName,
                        email: post.email,
                        password: post.password,
                        age: post.age
                    })
                        .then(() => {
                        // send success
                        endResponse(_response, "User created");
                    })
                        .catch((error) => {
                        // on error catch error and send it to front
                        onError(_response, error);
                    });
                }
                else if (url === "/profile") {
                    // update profile with recieved user id
                    User_1.updateProfile(post.userId, {
                        firstName: post.firstName,
                        lastName: post.lastName,
                        email: post.email,
                        age: post.age,
                        password: post.password
                    })
                        .then((data) => {
                        // stringify array to string to send to front, as our response header is text
                        // we could also set response header to send json instead
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/login") {
                    // try to login user with email and password
                    User_1.findUserByEmailAndPass(post.email, post.password)
                        .then((data) => {
                        if (data) {
                            // stringify array to string to send to front, as our response header is text
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
                    // create a new post with userId recieved
                    Post_1.createPost(post.userId, {
                        title: post.title,
                        content: post.content
                    })
                        .then((data) => {
                        // stringify array to string to send to front, as our response header is text
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/get-posts") {
                    // get all posts of user and followed users, if userId exists
                    Post_1.getPosts(post.userId)
                        .then((data) => {
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/users/follow") {
                    // follow user by followId recieved, userId is id of logged in user
                    User_1.follow(post.userId, post.followId)
                        .then((data) => {
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else if (url === "/users/unfollow") {
                    // unfollow user by followId recieved, userId is id of logged in user
                    User_1.unfollow(post.userId, post.followId)
                        .then((data) => {
                        endResponse(_response, JSON.stringify(data));
                    })
                        .catch((error) => {
                        onError(_response, error);
                    });
                }
                else {
                    // if any url didnt match, resolve response
                    _response.end();
                }
            });
        }
        else if (method === "GET") {
            // if we recieved get method
            if (url === "/users") {
                // get list of all users
                User_1.getUsers()
                    .then((data) => {
                    // stringify array to string to send to front, as our response header is text
                    endResponse(_response, JSON.stringify(data));
                })
                    .catch((error) => {
                    onError(_response, error);
                });
            }
            else {
                // if routes dont match resolve response
                _response.end();
            }
        }
        else {
            // if method dont match resolve response
            _response.end();
        }
    }
    function onError(_response, error) {
        console.log(error);
        let responseText = "";
        // check if error is passed, the error is a MongoError.
        // error.code === 11000 means attempt to insert duplicate value
        // in out case we set email as unique field
        if (error && error instanceof mongodb_1.MongoError && error.code === 11000) {
            responseText = "Email already in use";
        }
        else {
            // some other error occured
            responseText = "An error occured";
        }
        endResponse(_response, responseText, true);
    }
    function endResponse(_response, responseText, isError = false) {
        // set header
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // if isError is passed and its true, we should set status to 501
        if (isError) {
            _response.statusCode = 501;
        }
        else {
            _response.statusCode = 200;
        }
        // set text and end
        _response.write(responseText);
        _response.end();
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map