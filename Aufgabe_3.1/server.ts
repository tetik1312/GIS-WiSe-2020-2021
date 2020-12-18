//importiert Http Modul 
import * as Http from "http";

export namespace P_3_1Server {
    console.log("Starting server");
    //enviroment mit der Angabe der Portnummer von Heroku
    let port: number = Number(process.env.PORT);
    //wenn port nicht definiert ist (keiner von heroku zugewiesen wurde), wird port nr. 8100 aufgerufen
    if (!port)
        port = 8100;

    //server wird erstellt    
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        console.log(_request.url);
        _response.end();
        //ein neuer Header wird erstellt und dort das request auf einer neuen Seite ausgegeben
    }
}