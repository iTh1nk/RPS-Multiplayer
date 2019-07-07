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

var spCounter1 = 0;
var spCounter2 = 0;

var rpsRockOwn = "<img src='./assets/images/rock.png' class='imgRpsPlay'>";
var rpsPaperOwn = "<img src='./assets/images/paper.png' class='imgRpsPlay'>";
var rpsScissorOwn = "<img src='./assets/images/scissor.png' class='imgRpsPlay'>";
var rpsRockOpp = "<img src='./assets/images/rock.png' class='imgRpsPlay'>";
var rpsPaperOpp = "<img src='./assets/images/paper.png' class='imgRpsPlay'>";
var rpsScissorOpp = "<img src='./assets/images/scissor.png' class='imgRpsPlay'>";

var winloseDecider = function() {
    
}

$(document).ready(function () {

    $("#joinOwn").on("click", function () {
        event.preventDefault();
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
        event.preventDefault();
        var name = "player2";
        var rps = "";

        database.ref("/player2").set({
            name: name,
            rps: rps,
            win: 0,
            loss: 0,
        })

    })

    $("#rockOwn").on("click", function() {
        $("#rpsPlayOwn").html(rpsRockOwn);
    })
    $("#paperOwn").on("click", function() {
        $("#rpsPlayOwn").html(rpsPaperOwn);
    })
    $("#scissorOwn").on("click", function() {
        $("#rpsPlayOwn").html(rpsScissorOwn);
    })

    database.ref("/player1").on("value", function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.child("name").exists()) {
            $("#displayOwn").attr("style", "visibility: visible");
            var name = snapshot.val().name;
            $("#player1").text(name)
            $("#joinOwn").html("Ready!");
        }
    })

    database.ref("/player2").on("value", function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.child("name").exists()) {
            $("#displayOpp").attr("style", "visibility: visible");
            var name = snapshot.val().name;
            $("#player2").text(name)
            $("#joinOpp").html("Ready!");
        }
    })

    database.ref().on("child_removed", function(snapshot) {
        var buttonBack = "<a class='waves-effect waves-red white btn' style='color: black;'>JOIN</a>"
        $("#displayOwn").attr("style", "visibility: hidden");
        $("#displayOpp").attr("style", "visibility: hidden");
        $("#player1").text("Waiting...")
        $("#joinOwn").html(buttonBack);
        $("#player2").text("Waiting...")
        $("#joinOpp").html(buttonBack);
    })

    $("#infoClear").on("click", function () {
        database.ref().remove();
        location.reload();
    })

})