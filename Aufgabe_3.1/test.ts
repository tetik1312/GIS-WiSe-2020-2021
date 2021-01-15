namespace Test {
    document
        .getElementById("selectElement")
        .addEventListener("click", async () => {
            let response: Response = await fetch(
                "https://mongodbnetbrowser.herokuapp.com/?u=TestAsyas&p=Program2020&a=cluster0.q7enn.mongodb.net&n=Test&c=Students");

            console.log("Response", await response.text());
        });

}