// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC_ygRcOdad4Q879clNaiz-_d0rvP7lPmA",
    authDomain: "rps-multiplayer-7cd6a.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-7cd6a.firebaseio.com",
    projectId: "rps-multiplayer-7cd6a",
    storageBucket: "",
    messagingSenderId: "839229034713",
    appId: "1:839229034713:web:0b8f82c665d5b96d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(document).ready(function () {

    $("#joinOwn").on("click", function () {
        var name = "player1";
        var rps = "";

        database.ref("/player1").set({
            name: name,
            rps: rps,
            win: 0,
            loss: 0,
        })
    })

    $("#joinOpp").on("click", function () {
        var name = "player2";
        var rps = "";

        database.ref("/player2").set({
            name: name,
            rps: rps,
            win: 0,
            loss: 0,
        })
    })

    database.ref("/player1").on("value", function(snapshot) {
        console.log(snapshot);

        $("#joinOwn").html("");
    })

    database.ref("/player2").on("value", function(snapshot) {
        console.log(snapshot);

        $("#joinOpp").html("");
    })
})