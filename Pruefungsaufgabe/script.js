"use strict";
var Chatter;
(function (Chatter) {
    //let apiUrl: string = "http://supernova22.herokuapp.com/";
    let apiUrl = "http://localhost:8100";
    const path = window.location.pathname;
    const page = path.split("/").pop();
    if (page === "index.html") {
        // get all posts if we're on index page
        getAndRenderPosts();
    }
    else if (page === "users.html") {
        // get all users if we're on users page
        getAndRenderUsers();
    }
    // define forms variables
    let signupForm;
    let loginForm;
    let postsForm;
    let profileForm;
    // we wait for window to load and html to render, so we wont get underfined on getElementById
    window.addEventListener("load", onWindowLoad);
    // depending on the page attach submit event with params
    function onWindowLoad() {
        // here depending of which page is opened,
        // we need to define our forms, add submit listener, prevent its default behaviour
        // add depending on the page make various actions
        if (page === "signup.html") {
            // get sign up form
            signupForm = document.getElementById("signupForm");
            // add 'submit' lister to the form, prevent default and send data to server
            signupForm.addEventListener("submit", function (event) {
                submitToServer(event, signupForm, "/signup");
            });
        }
        else if (page === "login.html") {
            // get log in form
            loginForm = document.getElementById("loginForm");
            // add 'submit' lister to the form, prevent default and send data to server
            // here we pass 'loginUser' callback,
            // to redirect him on index page upon successfully login and set his data to localStorage
            loginForm.addEventListener("submit", function (event) {
                submitToServer(event, loginForm, "/login", loginUser);
            });
        }
        else if (page === "index.html") {
            // get post form
            postsForm = document.getElementById("postForm");
            // add 'submit' lister to the form, prevent default
            // check if user is logged in, then submit the form data to server
            postsForm.addEventListener("submit", verifyUserAndCreatePost);
            // remove 'new post' form if user is not logged in
            const user = getLoggedInUser();
            if (!user) {
                document.getElementById("postFormWrapper")?.remove();
            }
        }
        else if (page === "profile.html") {
            // get profile form
            profileForm = document.getElementById("profileForm");
            // add 'submit' lister to the form, prevent default and send data to server
            profileForm.addEventListener("submit", updateProfile);
            const user = getLoggedInUser();
            if (!user) {
                // remove form if user is not logged in
                document.getElementById("profileForm")?.remove();
            }
            else {
                // otherwise we should set default values to form for logged in user
                setProfileFormValues();
            }
        }
    }
    async function submitToServer(_event, form, url, callback) {
        // prevent default behaiour
        _event.preventDefault();
        // get data to submit to server
        let data = getFormData(form);
        // send the request
        let response = await sendPostRequest(url, data);
        // finish request
        await finalizeRequest(response, form, callback);
    }
    function getFormData(form) {
        // we get formData
        const formData = new FormData(form);
        const data = {};
        // we loop our values to add them to 'data' object
        formData.forEach(function (value, key) {
            data[key] = value.toString();
        });
        // and return newly created object with values
        return data;
    }
    async function sendPostRequest(url, data) {
        // send post to reuest to the server with provided url and data
        let response = await fetch(apiUrl + url, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            // stringify data first
            body: JSON.stringify(data)
        });
        return response;
    }
    // finalise our request, here we pass in response, form element and callback
    // callback is an optional param, its a function to be excecuted upon success
    // for example loginIn function we use as callback
    async function finalizeRequest(response, form, callback) {
        // get reponse text
        let responseText = await response.text();
        // alert
        alert(responseText);
        if (response.status === 200) {
            // if request is sucessful reset form
            form.reset();
            // if callback function was passed, excecute it
            if (callback) {
                callback(responseText);
            }
        }
    }
    // check if user is logged in and create new post if so
    async function verifyUserAndCreatePost(_event) {
        // prevent default
        _event.preventDefault();
        // get user from localStorage
        const loggedInUser = getLoggedInUser();
        // if user is not logged in - return
        if (!loggedInUser)
            return;
        // get the data
        let data = getFormData(postsForm);
        // set userId to data
        data.userId = loggedInUser._id;
        // send request
        let response = await sendPostRequest("/posts", data);
        // we have post object in response here,
        // so we call json() to get the object
        const post = await response.json();
        // then we render the post and set false as second param, so the post will prepend
        // it will be first in the list
        renderPost(post, false);
        // reset the form to clear it
        postsForm.reset();
    }
    // update user profile if user is logged in
    async function updateProfile(_event) {
        // prevent default behaviout
        _event.preventDefault();
        // get user from localStorage
        const loggedInUser = getLoggedInUser();
        // return if no user found
        if (!loggedInUser)
            return;
        // get data
        let data = getFormData(profileForm);
        // set id
        data.userId = loggedInUser._id;
        let response = await sendPostRequest("/profile", data);
        let responseText = await response.text();
        alert(responseText);
        // on success, update localStorage
        // we will get updated user object here as string on success
        // this is needed to keep our updated user info after page was refreshed
        if (response.status === 200) {
            setUser(responseText);
        }
    }
    // in profile form, set default values for user
    function setProfileFormValues() {
        const loggedInUser = getLoggedInUser();
        // if user is logged in, set values to form with his info
        if (loggedInUser) {
            document.getElementById("fname")?.setAttribute("value", loggedInUser.firstName);
            document.getElementById("lname")?.setAttribute("value", loggedInUser.lastName);
            document.getElementById("email")?.setAttribute("value", loggedInUser.email);
            document.getElementById("age")?.setAttribute("value", loggedInUser.age.toString());
        }
    }
    // set user info in local storage and redirect
    function loginUser(response) {
        // set user to localStorage
        setUser(response);
        // see if page variable id not undefined
        if (page) {
            window.location.href = path.replace(page, "index.html");
        }
    }
    // set user info in local storage
    function setUser(response) {
        localStorage.setItem("user", response);
    }
    // get posts from back and render all via 'renderPost'
    async function getAndRenderPosts() {
        // get user if exists, to send logged in userId to server
        const loggedInUser = getLoggedInUser();
        // send request to get posts, with user id if exists
        let response = await sendPostRequest("/get-posts", {
            userId: loggedInUser ? loggedInUser._id : ""
        });
        // get all posts
        let data = await response.json();
        for (const post of data) {
            renderPost(post);
        }
    }
    // render a single post
    function renderPost(post, append = true) {
        // create wrapper elememnt
        const newElement = document.createElement("DIV");
        // create title
        const titleElement = document.createElement("h4");
        titleElement.innerText = post.title;
        //  create content element
        const contentElement = document.createElement("p");
        contentElement.innerText = post.content;
        // create footer
        const footer = document.createElement("FOOTER");
        // set author
        footer.innerText =
            "Author: " +
                post.user.firstName +
                " " +
                post.user.lastName +
                " | " +
                "Date: " +
                new Date(post.createdAt).toLocaleDateString();
        // append all childs in wrapper
        newElement.appendChild(titleElement);
        newElement.appendChild(contentElement);
        newElement.appendChild(footer);
        newElement.classList.add("card");
        // append sing post elemnt to list on page
        const container = document.getElementById("posts");
        // if countainer is found - append or prepend to the beggining of the list
        // depending on the `append` param
        if (container) {
            if (append) {
                container.appendChild(newElement);
            }
            else {
                container.prepend(newElement);
            }
        }
    }
    // get all users and loop to render them
    async function getAndRenderUsers() {
        // get users from server
        const response = await fetch(apiUrl + "/users");
        // conver response to json
        const data = await response.json();
        // loop array and render one by one
        for (const user of data) {
            renderUser(user);
        }
    }
    function renderUser(user) {
        // get logged in user, to shouw 'follow' button is user is logged in
        const loggedInUser = getLoggedInUser();
        // wrapper element
        const newElement = document.createElement("DIV");
        // title
        const titleElement = document.createElement("h4");
        titleElement.innerText = user.firstName + " " + user.lastName;
        newElement.appendChild(titleElement);
        // if user is logged in show follow/unfollow button depending on current status
        if (loggedInUser) {
            // define if logged in user if following the user that we are rendering
            // we have users array in our user object
            // if logged in user if following this user, his id will be in the array
            // we use indexOf method to define if id exists in the array
            const following = loggedInUser.users && loggedInUser.users.indexOf(user._id) > -1;
            // create the button
            const button = document.createElement("BUTTON");
            // if logged in user is following the one we're rendering -
            // set text 'Unfollow', and 'Follow' otherwise
            button.innerText = following ? "Unfollow" : "Follow";
            // add listener to button, to toggle follow/unfollow
            button.addEventListener("click", function () {
                toggleFollowUser(button, user._id, !following);
            });
            newElement.appendChild(button);
        }
        // add class to the whole user element, for styling
        newElement.classList.add("card");
        // append wrapper element to list on page
        const container = document.getElementById("users");
        if (container) {
            container.appendChild(newElement);
        }
    }
    // follow/unfollow user if one is slogged in
    // we call this function 'toggle', because depending on the current state, we either will follow or unfollow user
    // we pass in button element as first param, to change the text depending on the state
    // followId is the id of the user to follow/unfollow
    // toFollow param means either we should follow the user, or unsubscribe from him
    async function toggleFollowUser(button, followId, toFollow = true) {
        const user = getLoggedInUser();
        // not logged in, return
        if (!user)
            return;
        // set data to send
        const data = {
            followId,
            userId: user._id
        };
        // if we want to follow user- toFollow will be true,
        // means we should send request to 'follow' path
        // otherwise send request to 'unfollow' path
        const path = toFollow ? "follow" : "unfollow";
        const response = await sendPostRequest("/users/" + path, data);
        // we will get updated user object here as string on success
        // to update user and users array in the local storage
        // this is needed to keep our updated states after page was refreshed
        const responseText = await response.text();
        if (response.status === 200) {
            // update users data in local storage on success
            setUser(responseText);
            // change button text dependsing on current state
            button.innerText = toFollow ? "Unfollow" : "Follow";
        }
        else {
            alert(responseText);
        }
    }
    // get logged in user from logged storage
    function getLoggedInUser() {
        // get item from storage
        const loggedInUserString = localStorage.getItem("user");
        // parse to json if exists, otherwise return null
        if (loggedInUserString) {
            return JSON.parse(loggedInUserString);
        }
        else {
            return null;
        }
    }
})(Chatter || (Chatter = {}));
//# sourceMappingURL=script.js.map