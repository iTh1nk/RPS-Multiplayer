
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

var selector = 0;
var sPlayer = 0;

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

$(document).ready(function () {

    //Player1 join game
    $("#joinOwn").on("click", function (event) {
        event.preventDefault();
        $("#chatbox").attr("style", "visibility: visible");
        $("#joinOpp").html("Wait for Player2...");
        sPlayer = 1;

        database.ref("/player1").set({
            name: "Player1",
            rps: "",
            rpsImg: "",
            spPlayCounter1: 0,
            win: 0,
            loss: 0,
            selector: 1,
        })



        $("#displayOwn").attr("style", "visibility: visible");

    })
    //Player2 join game
    $("#joinOpp").on("click", function (event) {
        event.preventDefault();
        $("#chatbox").attr("style", "visibility: visible");
        $("#joinOwn").html("Wait for Player1...");
        sPlayer = 2;

        database.ref("/player2").set({
            name: "Player2",
            rps: "",
            rpsImg: "",
            spPlayCounter2: 0,
            win: 0,
            loss: 0,
            selector: 1,
        })



        $("#displayOpp").attr("style", "visibility: visible");

    })

    //Player1 play process choose
    $("#rockOwn").on("click", function () {
        $("#displayOwn").attr("style", "visibility: hidden");
        $("#displayOwn0").html("Waiting for Player2 response...")
        database.ref("/player1").update({
            spPlayCounter1: 1,
            rps: "rock",
        })
    })
    $("#paperOwn").on("click", function () {
        $("#displayOwn").attr("style", "visibility: hidden");
        $("#displayOwn0").text("Waiting for Player2 response...")
        database.ref("/player1").update({
            spPlayCounter1: 1,
            rps: "paper",
        })
    })
    $("#scissorOwn").on("click", function () {
        $("#displayOwn").attr("style", "visibility: hidden");
        $("#displayOwn0").text("Waiting for Player2 response...")
        database.ref("/player1").update({
            spPlayCounter1: 1,
            rps: "scissor",
        })
    })
    //Player2 play process choose
    $("#rockOpp").on("click", function () {
        $("#displayOpp").attr("style", "visibility: hidden");
        $("#displayOpp0").text("Waiting for Player1 response...")
        database.ref("/player2").update({
            spPlayCounter2: 1,
            rps: "rock",
        })
    })
    $("#paperOpp").on("click", function () {
        $("#displayOpp").attr("style", "visibility: hidden");
        $("#displayOpp0").text("Waiting for Player1 response...")
        database.ref("/player2").update({
            spPlayCounter2: 1,
            rps: "paper",
        })
    })
    $("#scissorOpp").on("click", function () {
        $("#displayOpp").attr("style", "visibility: hidden");
        $("#displayOpp0").text("Waiting for Player1 response...")
        database.ref("/player2").update({
            spPlayCounter2: 1,
            rps: "scissor",
        })
    })

    //Chat box
    $("#submit").on("click", function () {
        var input = $("#input_text").val();
        if (sPlayer === 1) {
            database.ref("/chat").push({
                name: "Player1",
                input: input,
            })
        } else if (sPlayer === 2) {
            database.ref("/chat").push({
                name: "Player2",
                input: input,
            })
        }
        $("#input_text").val("");
    })
    //all palyer firebase standby
    database.ref().on("value", function (snapshot) {
        if (snapshot.child("player1/spPlayCounter1").exists() && snapshot.child("player2/spPlayCounter2").exists()) {
            spPlayCounter1 = snapshot.val().player1.spPlayCounter1;
            spPlayCounter2 = snapshot.val().player2.spPlayCounter2;
            $("#rpsPlayOwn").html(snapshot.val().player1.rpsImg);
            $("#rpsPlayOpp").html(snapshot.val().player2.rpsImg);
        }
        if (snapshot.child("player1/selector").exists() && snapshot.child("player2/selector").exists()) {
            $("#joinOwn").html("Ready!");
            $("#joinOpp").html("Ready!");
        }

        //starts win lose deciding process if both player made decision
        if (spPlayCounter1 === 1 && spPlayCounter2 === 1) {
            if (sPlayer === 1) {
                $("#displayOwn").attr("style", "visibility: visible");

            } else if (sPlayer === 2) {
                $("#displayOpp").attr("style", "visibility: visible");

            }
            var playedMarker1 = snapshot.val().player1.rps;
            var playedMarker2 = snapshot.val().player2.rps;
            //if else decide who won, lost, or tied
            if (playedMarker1 === "rock" && playedMarker2 === "rock") {
                $("#playResult").html("Tied!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                database.ref("/player1").update({
                    rpsImg: rpsRockOwn,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsRockOpp,
                    spPlayCounter2: 0,
                })
            } else if (playedMarker1 === "rock" && playedMarker2 === "paper") {
                $("#playResult").html("Player2 Won!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                winCounterOpp++;
                database.ref("/player1").update({
                    rpsImg: rpsRockOwn,
                    win: winCounterOwn,
                    loss: winCounterOpp,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsPaperOpp,
                    win: winCounterOpp,
                    loss: winCounterOwn,
                    spPlayCounter2: 0,
                })
            } else if (playedMarker1 === "rock" && playedMarker2 === "scissor") {
                $("#playResult").html("Player1 Won!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                winCounterOwn++;
                database.ref("/player1").update({
                    rpsImg: rpsRockOwn,
                    win: winCounterOwn,
                    loss: winCounterOpp,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsScissorOpp,
                    win: winCounterOpp,
                    loss: winCounterOwn,
                    spPlayCounter2: 0,
                })
            } else if (playedMarker1 === "paper" && playedMarker2 === "paper") {
                $("#playResult").html("Tied!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                database.ref("/player1").update({
                    rpsImg: rpsPaperOwn,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsPaperOpp,
                    spPlayCounter2: 0,
                })
            } else if (playedMarker1 === "paper" && playedMarker2 === "scissor") {
                $("#playResult").html("Player2 Won!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                winCounterOpp++;
                database.ref("/player1").update({
                    rpsImg: rpsPaperOwn,
                    win: winCounterOwn,
                    loss: winCounterOpp,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsScissorOpp,
                    win: winCounterOpp,
                    loss: winCounterOwn,
                    spPlayCounter2: 0,
                })
            } else if (playedMarker1 === "scissor" && playedMarker2 === "scissor") {
                $("#playResult").html("Tied!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                database.ref("/player1").update({
                    rpsImg: rpsScissorOwn,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsScissorOpp,
                    spPlayCounter2: 0,
                })
            } else if (playedMarker1 === "paper" && playedMarker2 === "rock") {
                $("#playResult").html("Player1 Won!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                winCounterOwn++;
                database.ref("/player1").update({
                    rpsImg: rpsPaperOwn,
                    win: winCounterOwn,
                    loss: winCounterOpp,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsRockOpp,
                    win: winCounterOpp,
                    loss: winCounterOwn,
                    spPlayCounter2: 0,
                })
            } else if (playedMarker1 === "scissor" && playedMarker2 === "paper") {
                $("#playResult").html("Player1 Won!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                winCounterOwn++;
                database.ref("/player1").update({
                    rpsImg: rpsScissorOwn,
                    win: winCounterOwn,
                    loss: winCounterOpp,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsPaperOpp,
                    win: winCounterOpp,
                    loss: winCounterOwn,
                    spPlayCounter2: 0,
                })
            } else if (playedMarker1 === "scissor" && playedMarker2 === "rock") {
                $("#playResult").html("Player2 Won!");
                $("#displayOwn0").html("");
                $("#displayOpp0").html("");
                winCounterOpp++;
                database.ref("/player1").update({
                    rpsImg: rpsScissorOwn,
                    win: winCounterOwn,
                    loss: winCounterOpp,
                    spPlayCounter1: 0,
                })
                database.ref("/player2").update({
                    rpsImg: rpsRockOpp,
                    win: winCounterOpp,
                    loss: winCounterOwn,
                    spPlayCounter2: 0,
                })
            }
        }

    })
    //player1 firebase standby
    database.ref("/player1").on("value", function (snapshot) {
        if (snapshot.child("win").exists()) {
            winCounterOwn = snapshot.val().win;
        }
        if (snapshot.child("name").exists()) {

            var name = snapshot.val().name;
            $("#player1").text(name);
            $("#joinOwn").html("Ready!");

            $("#winCounter1").html(snapshot.val().win)
            $("#loseCounter1").html(snapshot.val().loss)
        }

    })
    //player2 firebase stanby
    database.ref("/player2").on("value", function (snapshot) {
        if (snapshot.child("win").exists()) {
            winCounterOpp = snapshot.val().win;
        }
        if (snapshot.child("name").exists()) {

            var name = snapshot.val().name;
            $("#player2").text(name);
            $("#joinOpp").html("Ready!");

            $("#winCounter2").html(snapshot.val().win);
            $("#loseCounter2").html(snapshot.val().loss);
        }
    })
    //chat box firebase standby
    database.ref("/chat").on("child_added", function (childSnapshot) {
        var trTag = $("<tr>").append(
            $("<td>").text(childSnapshot.val().name + ": " + childSnapshot.val().input)
        )
        $("#tbody").prepend(trTag);
    })
    //reset all html tag after database erased
    database.ref().on("child_removed", function (snapshot) {
        var buttonBack = "<a class='waves-effect waves-red white btn' style='color: black;'>JOIN</a>"
        $("#displayOwn").attr("style", "visibility: hidden");
        $("#displayOpp").attr("style", "visibility: hidden");
        $("#player1").text("Waiting...");
        $("#joinOwn").html(buttonBack);
        $("#player2").text("Waiting...");
        $("#joinOpp").html(buttonBack);
        $("#winCounter1").html("");
        $("#winCounter2").html("");
        $("#loseCounter1").html("");
        $("#loseCounter2").html("");
        $("#rpsPlayOwn").html("");
        $("#rpsPlayOpp").html("");
        $("#playResult").html("");
        location.reload();
    })
    //eastern egg to erase whole firebase data
    $("#infoClear").on("click", function () {
        database.ref().remove();
    })

})