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

var spPlayCounter1 = 0;
var spPlayCounter2 = 0;

var playedMarker1 = 0;
var playedMarker2 = 0;

var winCounterOwn = 0;
var loseCounterOwn = 0;
var winCounterOpp = 0;
var loseCounterOpp = 0;

var rpsRockOwn = "<img src='./assets/images/rock.png' class='imgRpsPlay'>";
var rpsPaperOwn = "<img src='./assets/images/paper.png' class='imgRpsPlay'>";
var rpsScissorOwn = "<img src='./assets/images/scissor.png' class='imgRpsPlay'>";
var rpsRockOpp = "<img src='./assets/images/rock.png' class='imgRpsPlay'>";
var rpsPaperOpp = "<img src='./assets/images/paper.png' class='imgRpsPlay'>";
var rpsScissorOpp = "<img src='./assets/images/scissor.png' class='imgRpsPlay'>";

var winloseDecider = function () {
    if (playedMarker1 === "rock" && playedMarker2 === "rock") {
        $("#playResult").html("Tied!");
        $("#rpsPlayOwn").html(rpsRockOwn);
        $("#rpsPlayOpp").html(rpsRockOpp);
    }
    if (playedMarker1 === "rock" && playedMarker2 === "paper") {
        $("#playResult").html("Player2 Won!");
        winCounterOpp++;
        $("#winCounter2").html(winCounterOpp);
        $("#loseCounter1").html(winCounterOpp);
        $("#rpsPlayOwn").html(rpsRockOwn);
        $("#rpsPlayOpp").html(rpsPaperOpp);
    }
    if (playedMarker1 === "rock" && playedMarker2 === "scissor") {
        $("#playResult").html("Player1 Won!");
        winCounterOwn++
        $("#rpsPlayOwn").html(rpsRockOwn);
        $("#rpsPlayOpp").html(rpsScissorOpp);
    }
    if (playedMarker1 === "paper" && playedMarker2 === "paper") {
        $("#playResult").html("Tied!");
        $("#rpsPlayOwn").html(rpsPaperOwn);
        $("#rpsPlayOpp").html(rpsPaperOpp);
    }
    if (playedMarker1 === "paper" && playedMarker2 === "scissor") {
        $("#playResult").html("Player2 Won!");
        winCounterOpp++;
        $("#rpsPlayOwn").html(rpsPaperOwn);
        $("#rpsPlayOpp").html(rpsScissorOpp);
    }
    if (playedMarker1 === "scissor" && playedMarker2 === "scissor") {
        $("#playResult").html("Tied!");
        $("#rpsPlayOwn").html(rpsScissorOwn);
        $("#rpsPlayOpp").html(rpsScissorOpp);
    }
    if (playedMarker1 === "paper" && playedMarker2 === "rock") {
        $("#playResult").html("Player1 Won!");
        winCounterOwn++
        $("#rpsPlayOwn").html(rpsPaperOwn);
        $("#rpsPlayOpp").html(rpsRockOpp);
    }
    if (playedMarker1 === "scissor" && playedMarker2 === "paper") {
        $("#playResult").html("Player1 Won!");
        winCounterOwn++
        $("#rpsPlayOwn").html(rpsScissorOwn);
        $("#rpsPlayOpp").html(rpsPaperOpp);
    }
    if (playedMarker1 === "scissor" && playedMarker2 === "rock") {
        $("#playResult").html("Player2 Won!");
        winCounterOpp++;
        $("#rpsPlayOwn").html(rpsScissorOwn);
        $("#rpsPlayOpp").html(rpsRockOpp);
    }
}

var resetRound = function () {
    spPlayCounter1 = 0;
    spPlayCounter2 = 0;
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

    $("#rockOwn").on("click", function () {
        spPlayCounter1++;
        playedMarker1 = "rock";
        if (spPlayCounter1 === spPlayCounter2) {
            winloseDecider();
            resetRound();
        }
    })
    $("#paperOwn").on("click", function () {
        spPlayCounter1++;
        playedMarker1 = "paper";
        if (spPlayCounter1 === spPlayCounter2) {
            winloseDecider();
            resetRound();
        }
    })
    $("#scissorOwn").on("click", function () {
        spPlayCounter1++;
        playedMarker1 = "scissor";
        if (spPlayCounter1 === spPlayCounter2) {
            winloseDecider();
            resetRound();
        }
    })

    $("#rockOpp").on("click", function () {
        spPlayCounter2++;
        playedMarker2 = "rock";
        if (spPlayCounter2 === spPlayCounter1) {
            winloseDecider();
            resetRound();
        }
    })
    $("#paperOpp").on("click", function () {
        spPlayCounter2++;
        playedMarker2 = "paper";
        if (spPlayCounter2 === spPlayCounter1) {
            winloseDecider();
            resetRound();
        }
    })
    $("#scissorOpp").on("click", function () {
        spPlayCounter2++;
        playedMarker2 = "scissor";
        if (spPlayCounter2 === spPlayCounter1) {
            winloseDecider();
            resetRound();
        }
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

    database.ref().on("child_removed", function (snapshot) {
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