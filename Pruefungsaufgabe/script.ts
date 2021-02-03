namespace Chatter {
    let apiUrl: string = "https://supernova22.herokuapp.com/";
    //let apiUrl: string = "http://localhost:8100";

    interface IFormData<TValue> {
        // [key: string] bedeutet das der key im object ein beliebiger wert sein kann, wir definieren jedoch den type für den string
        // TValue übergeben wir wenn wir unsere IFormData interface verwenden
        // wir verwenden dieses interface in FormData, um sie an den server zu senden
        [key: string]: TValue;
    }

    interface User {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        age: number;
        users: string[];
    }

    interface Post {
        _id: string;
        userId: string;
        user: User;
        title: string;
        content: string;
        createdAt: Date;
    }

    const path: string = window.location.pathname;
    const page: string | undefined = path.split("/").pop();

    if (page === "index.html") {
        // holt sich alle posts wenn wir auf der index seite sind

        getAndRenderPosts();
    } else if (page === "users.html") {
        // holt sich alle users wenn wir auf der user seite sind

        getAndRenderUsers();
    }

    // definiert formularvariablen
    let signupForm: HTMLFormElement;
    let loginForm: HTMLFormElement;
    let postsForm: HTMLFormElement;
    let profileForm: HTMLFormElement;

    // wir warten bis das fenster geladen und das html gerendert ist, damit wir bei getElementById nicht 'undefined' bekommen
    window.addEventListener("load", onWindowLoad);

    // abhängig von der seite hängt das submit event mit den parametern an 
    function onWindowLoad(): void {
        // je nach dem welche seite geöffnet ist,
        // müssen wir unsere formulare definieren, den submit listener hinzufügen, und das default behaviour verhindern
        // das hinzufügen je nach der seite und die verschiedenen aktionen ausführen
        if (page === "signup.html") {
            // sign up formular per id erhalten
            signupForm = <HTMLFormElement>document.getElementById("signupForm");

            // fügt dem 'submit' listener hinzu, und verhindert das default verhalten und sendet die daten an den server
            signupForm.addEventListener("submit", function (event: Event) {
                submitToServer(event, signupForm, "/signup");
            });
        } else if (page === "login.html") {
            // erhält das log in formular per id
            loginForm = <HTMLFormElement>document.getElementById("loginForm");

            // fügt dem formular 'submit' listener hinzu und verhindert das default verhalten, und sendet daten an den server
            // hier übergeben wir 'loginUser' callback,
            // um ihn nach erfolgreicher anmeldung auf die index seite umzuleiten und seine daten auf localStorage zu setzen
            loginForm.addEventListener("submit", function (event: Event) {
                submitToServer(event, loginForm, "/login", loginUser);
            });
        } else if (page === "index.html") {
            // post formular erhalten per id
            postsForm = <HTMLFormElement>document.getElementById("postForm");

            // fügt dem formular 'submit' listener hinzu und verhindert das default verhalten
            // überprüft ob der user eingelogged ist, und sende dann die formulardaten an den server
            postsForm.addEventListener("submit", verifyUserAndCreatePost);

            // entferne das formular 'new post' wenn user nicht eingeloggt ist 
            const user: User | null = getLoggedInUser();

            if (!user) {
                document.getElementById("postFormWrapper")?.remove();
            }
        } else if (page === "profile.html") {
            // profil formular erhalten per id
            profileForm = <HTMLFormElement>document.getElementById("profileForm");

            // fügt dem formular 'submit' listener hinzu und verhindert das default verhalten und sendet die daten an den server
            profileForm.addEventListener("submit", updateProfile);

            const user: User | null = getLoggedInUser();

            if (!user) {
                // formular entfernen wenn der user nicht eingelogged ist
                document.getElementById("profileForm")?.remove();
            } else {
                // andernfalls sollte man default werte für den eingelogten user festlegen
                setProfileFormValues();
            }
        }
    }

    async function submitToServer(
        _event: Event,
        form: HTMLFormElement,
        url: string,
        callback?: Function | null
    ): Promise<void> {
        // verhindert default verhalten
        _event.preventDefault();

        // daten an server senden
        let data: IFormData<string> = getFormData(form);

        // sendet anfrage
        let response: Response = await sendPostRequest(url, data);

        // beendet anfrage
        await finalizeRequest(response, form, callback);
    }

    function getFormData(form: HTMLFormElement): IFormData<string> {
        // bekommen formData
        const formData: FormData = new FormData(form);

        const data: IFormData<string> = {};
        // schleifen die werte um sie dann dem 'data' object hinzuzufügen
        formData.forEach(function (value: FormDataEntryValue, key: string): void {
            data[key] = value.toString();
        });

        // die neu erstellten objekte werden mit einem wert zurückgegeben
        return data;
    }

    async function sendPostRequest(url: string, data: IFormData<string>): Promise<Response> {
        // sendet einen post mit der angegebenen URL und den angegebenen daten an den server
        let response: Response = await fetch(apiUrl + url, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            // daten werden zuerst stringifyed 
            body: JSON.stringify(data)
        });

        return response;
    }

    // schließt die anfrage ab, hier übergeben wir als antwort das formularelement und callback
    // callback ist ein optionaler parameter, eine funktion die bei erfolg ausgeführt werden muss
    // z.b verwenden wir die loginIn function als callback
    async function finalizeRequest(
        response: Response,
        form: HTMLFormElement,
        callback?: Function | null
    ): Promise<void> {
        // responsetext abrufen
        let responseText: string = await response.text();

        // alert 
        alert(responseText);

        if (response.status === 200) {
            // wenn anfrage erfolgreich ist, setz das formular zurück
            form.reset();

            // wenn die callback function übergeben wurde, führe sie aus
            if (callback) {
                callback(responseText);
            }
        }
    }

    // überprüfe ob user eingelogged ist und erstelle ggf neuen post
    async function verifyUserAndCreatePost(_event: Event): Promise<void> {
        // default verhindern
        _event.preventDefault();

        // user von localStorage abrufen
        const loggedInUser: User | null = getLoggedInUser();

        // wenn user nicht eingelogged ist - return 
        if (!loggedInUser) return;

        // hol die daten
        let data: IFormData<string> = getFormData(postsForm);
        // setzt die userId auf daten
        data.userId = loggedInUser._id;

        // sendet anfrage
        let response: Response = await sendPostRequest("/posts", data);

        // haben hier ein post object als antwort,
        // also rufen wir json() auf um das object zu erhalten
        const post: Post = await response.json();

        // dann rendern wir den post und setzen false als zweiten parameter, damit der post bereitgestellt wird
        // es wird an erster stelle in der liste stehen
        renderPost(post, false);

        // setzt das formular zurück um es zu reseten
        postsForm.reset();
    }

    // user profile aktualisieren wenn der user eingelogged ist
    async function updateProfile(_event: Event): Promise<void> {
        // default verhindern
        _event.preventDefault();

        // user von localStorage abrufen
        const loggedInUser: User | null = getLoggedInUser();

        // return wenn kein user gefunden wurde
        if (!loggedInUser) return;

        // daten bekommen
        let data: IFormData<string> = getFormData(profileForm);
        // id setzen
        data.userId = loggedInUser._id;

        let response: Response = await sendPostRequest("/profile", data);

        let responseText: string = await response.text();

        alert(responseText);

        // aktualisiere bei erfolg localStorage
        // wir werden hier ein updated user object als string für den erfolg erhalten
        // das ist erforderlich um die aktualisierte user info nach dem aktualisieren der seite beizubehalten
        if (response.status === 200) {
            setUser(responseText);
        }
    }

    // legt im profil formular default werte für den user fest
    function setProfileFormValues(): void {
        const loggedInUser: User | null = getLoggedInUser();

        // wenn user eingelogged ist, lege die werte so fest das sie mit seinen infos erstellt werden
        if (loggedInUser) {
            document.getElementById("fname")?.setAttribute("value", loggedInUser.firstName);
            document.getElementById("lname")?.setAttribute("value", loggedInUser.lastName);
            document.getElementById("email")?.setAttribute("value", loggedInUser.email);
            document.getElementById("age")?.setAttribute("value", loggedInUser.age.toString());
        }
    }

    // user info werden in local storage festgelegt und umgeleitet
    function loginUser(response: string): void {
        // setz den user auf localStorage
        setUser(response);

        // überprüft ob die id der seitenvariablen nicht undefined ist
        if (page) {
            window.location.href = path.replace(page, "index.html");
        }
    }

    // user info im localen storage festlegen
    function setUser(response: string): void {
        localStorage.setItem("user", response);
    }

    // holt sich posts vom backend und rendert alle via 'renderPost'
    async function getAndRenderPosts(): Promise<void> {
        // user abrufen falls vorhanden, um eingeloggte userId an server zu senden
        const loggedInUser: User | null = getLoggedInUser();

        // anfrage senden um posts zu erhalten, mit user id falls vorhanden
        let response: Response = await sendPostRequest("/get-posts", {
            userId: loggedInUser ? loggedInUser._id : ""
        });

        // holt sich alle posts
        let data: Post[] = await response.json();

        for (const post of data) {
            renderPost(post);
        }
    }

    // einen post rendern
    function renderPost(post: Post, append: boolean = true): void {
        // erstellt wrapper elememnt
        const newElement: HTMLDivElement = <HTMLDivElement>document.createElement("DIV");

        // erstellt den titel
        const titleElement: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h4");
        titleElement.innerText = post.title;

        // erstellt den content element
        const contentElement: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        contentElement.innerText = post.content;

        // footer erstellen
        const footer: HTMLDivElement = <HTMLDivElement>document.createElement("FOOTER");
        // autor festlegen
        footer.innerText =
            "Author: " +
            post.user.firstName +
            " " +
            post.user.lastName +
            " | " +
            "Date: " +
            new Date(post.createdAt).toLocaleDateString();

        // hängt alle childs in wrapper an
        newElement.appendChild(titleElement);
        newElement.appendChild(contentElement);
        newElement.appendChild(footer);

        newElement.classList.add("card");

        // fügt sign post element an die liste auf der seite an
        const container: HTMLElement | null = document.getElementById("posts");

        // wenn countainer gefunden wird - füge den anfang der liste hinzu oder stelle ihn an den anfang der liste 
        // ist abhängig vom 'append' parameter
        if (container) {
            if (append) {
                container.appendChild(newElement);
            } else {
                container.prepend(newElement);
            }
        }
    }

    // holt sich alle user und schleift diese um sie zu rendern
    async function getAndRenderUsers(): Promise<void> {
        // holt sich users vom server
        const response: Response = await fetch(apiUrl + "/users");

        // antwort in json konvertieren
        const data: User[] = await response.json();

        // schleife array und rendert dann nacheinander
        for (const user of data) {
            renderUser(user);
        }
    }

    function renderUser(user: User): void {
        // eingeloggten user erhalten um den button 'follow' anzuzeigen 
        const loggedInUser: User | null = getLoggedInUser();

        // wrapper element
        const newElement: HTMLDivElement = <HTMLDivElement>document.createElement("DIV");

        // title
        const titleElement: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h4");
        titleElement.innerText = user.firstName + " " + user.lastName;
        newElement.appendChild(titleElement);

        // wenn user eingelogged ist wird je nach aktuellem status der button follow/unfollow angezeigt
        if (loggedInUser) {
            // definiert ob der eingeloggte user dem user folgt den wir rendern
            // wir haben ein user array in unserem user object
            // wenn ein eingeloggedter user diesem user folgt befindet sich seine id im array
            // wir verwenden indexOf method um zu definieren ob die id im array vorhanden ist
            const following: boolean = loggedInUser.users && loggedInUser.users.indexOf(user._id) > -1;

            // erstellt den button
            const button: HTMLButtonElement = <HTMLButtonElement>document.createElement("BUTTON");
            // wenn der eingeloggte user demjenigen folgt den wir rendern -
            // setze den text auf 'Unfollow' und andernfalls auf 'Follow' 
            button.innerText = following ? "Unfollow" : "Follow";
            // fügt listener dem button hinzu, um follow/unfollow umzuschalten
            button.addEventListener("click", function (): void {
                toggleFollowUser(button, user._id, !following);
            });

            newElement.appendChild(button);
        }

        // fügt dem gesamten user element eine klasse für das styling hinzu
        newElement.classList.add("card");

        // hängt das wrapper element an die liste auf der seite an
        const container: HTMLElement | null = document.getElementById("users");
        if (container) {
            container.appendChild(newElement);
        }
    }

    // user kann follow/unfollow wenn einer eingeloggt ist
    
    // wir übergeben das buttonelement als ersten parameter, um den text je nach status zu ändern
    // followId ist die id des users dem er follow/unfollowed
    // toFollow parameter bedeutet das wir entweder dem user folgen oder ihn entfolgen
    async function toggleFollowUser(button: HTMLButtonElement, followId: string, toFollow = true): Promise<void> {
        const user: User | null = getLoggedInUser();

        // nicht eingeloggt, return
        if (!user) return;

        // daten zum senden setzen
        const data: IFormData<string> = {
            followId,
            userId: user._id
        };

        // wenn wir user folgen wollen- toFollow wird true sein,
        // bedeutet wir sollten eine anfrage an den pfad 'follow' senden
        // andernfalls sende die anfrage an den pfad 'unfollow' 
        const path: string = toFollow ? "follow" : "unfollow";

        const response: Response = await sendPostRequest("/users/" + path, data);

        // wir werden hier ein aktualisiertes user object als string für den erfolg halten
        // um den user und den user array im local storage zu aktualisieren
        // ist dies erforderlich um unsere aktualisierten zustände nach dem aktualisieren der seite beizubehalten
        const responseText: string = await response.text();

        if (response.status === 200) {
            // update user daten im local storage bei erfolg
            setUser(responseText);

            // änder den text des buttons abhänging vom aktuellen status
            button.innerText = toFollow ? "Unfollow" : "Follow";
        } else {
            alert(responseText);
        }
    }

    // eingeloggter user aus dem protokollierten storage abrufen
    function getLoggedInUser(): User | null {
        // get item aus local storage holen
        const loggedInUserString: string | null = localStorage.getItem("user");

        // wenn vorhanden json analysieren, andernfalls return null
        if (loggedInUserString) {
            return JSON.parse(loggedInUserString);
        } else {
            return null;
        }
    }
}