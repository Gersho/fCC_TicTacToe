$(document).ready(function(){

  /*

 board
  678
  345
  012
  */

  // cross is -1, circle is +1
  //cross plays first

  // initial setup
  var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var score = [0, 0, 0]; // player, draw, cpu
  var playerSymbol = ""; // "X" or "O"
  var lineA;
  var lineB;
  var lineC;
  var colA;
  var colB;
  var colC;
  var diagA;
  var diagB;
  var turn;

  setNewGame();


  function setNewGame() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 0;
    playerSymbol = "";

    $("#tile0").html("<div class='tiles'></div>");
    $("#tile1").html("<div class='tiles'></div>");
    $("#tile2").html("<div class='tiles'></div>");
    $("#tile3").html("<div class='tiles'></div>");
    $("#tile4").html("<div class='tiles'></div>");
    $("#tile5").html("<div class='tiles'></div>");
    $("#tile6").html("<div class='tiles'></div>");
    $("#tile7").html("<div class='tiles'></div>");
    $("#tile8").html("<div class='tiles'></div>");

    $("#info").html("");
    $("#symbolSelect").html("");
    $("#middlepannel").html("Draw: "+score[1]);
    $("#leftpannel").html("Player: </br>"+score[0]);
    $("#rightpannel").html("CPU: </br>"+score[2]);
    $("#symbolSelect").html(
    "<div><p>Select Symbol </br> (<i class='fa fa-times'></i>goes first)</p></div><div id='cross' class='btn btn-secondary'><i class='fa fa-times'></i></div><div id='circle' class='btn btn-secondary'><i class='fa fa-circle-o'></i></div>"
    );



      $("#circle").on("click", function() {
      playerSymbol = "O";
      $("#symbolSelect").html("");
      console.log("clicked O Symbol");
      cpuTurn();

      return;
      });

      $("#cross").on("click", function() {
      playerSymbol = "X";
      $("#symbolSelect").html("");
      console.log("clicked X Symbol");
      playerTurn();

      return;
      });





  } // fin setNewGame

  function playerTurn() {

      $("#tile0").on("click", function() {
        if (board[0] === 0){
          fillTile(0);
          console.log("clicked tile0");
          checkResult("player");
          return;
        }
     });
      $("#tile1").on("click", function() {
        if (board[1] === 0){
          fillTile(1);
          console.log("clicked tile1");
          checkResult("player");
          return;
        }
     });
      $("#tile2").on("click", function() {
        if (board[2] === 0){
          fillTile(2);
          console.log("clicked tile2");
          checkResult("player");
          return;
        }
      });
      $("#tile3").on("click", function() {
        if (board[3] === 0){
          fillTile(3);
          console.log("clicked tile3");
          checkResult("player");
          return;
        }
      });
      $("#tile4").on("click", function() {
        if (board[4] === 0){
          fillTile(4);
          console.log("clicked tile4");
          checkResult("player");
          return;
        }
      });
      $("#tile5").on("click", function() {
        if (board[5] === 0){
          fillTile(5);
          console.log("clicked tile5");
          checkResult("player");
          return;
        }
     });
     $("#tile6").on("click", function() {
       if (board[6] === 0){
         fillTile(6);
         console.log("clicked tile6");
         checkResult("player");
         return;
       }
     });

     $("#tile7").on("click", function() {
       if (board[7] === 0){
         fillTile(7);
         console.log("clicked tile7");
         checkResult("player");
         return;
       }
      });

      $("#tile8").on("click", function() {
        if (board[8] === 0){
          fillTile(8);
          console.log("clicked tile8");
          checkResult("player");
          return;
        }
     });

  } //fin playerTurn

  function fillTile(tile) {

    if(playerSymbol === ""){return;}

      var target;
      target = "#tile";
      target += tile;



      switch (playerSymbol) {
        case "X":
          board[tile] = -1;
          $(target).html(
            "<div class='tiles'><i class='fa fa-times crossfix'></i></div>"
          );
          break;

        case "O":
          board[tile] = +1;
          $(target).html(
            "<div class='tiles'><i class='fa fa-circle-o circlefix'></i></div>"
          );
          break;
      } //fin switch

      return;

  } //fin fillTile

  function checkResult(lastPlay) { //"cpuWin" , "PlayerWin" or "neutral"
  if(playerSymbol === ""){return;}
    console.log("checkResult starting");
    console.log("board: " + board);
    var result = "neutral";
    lineA = board[6] + board[7] + board[8];
    lineB = board[3] + board[4] + board[5];
    lineC = board[0] + board[1] + board[2];
    colA = board[0] + board[3] + board[6];
    colB = board[1] + board[4] + board[7];
    colC = board[2] + board[5] + board[8];
    diagA = board[2] + board[4] + board[6];
    diagB = board[0] + board[4] + board[8];


    //if+3 circle win, if -3 cross win

    if (
      lineA == 3 ||
      lineB == 3 ||
      lineC == 3 ||
      colA == 3 ||
      colB == 3 ||
      colC == 3 ||
      diagA == 3 ||
      diagB == 3
    ) {
      console.log("circle wins");
      switch (playerSymbol) {
        case "X":
          result = "cpuWin";
          break;
        case "O":
          result = "playerWin";
          break;
          }
    } // fin if+3

    if (
      lineA == -3 ||
      lineB == -3 ||
      lineC == -3 ||
      colA == -3 ||
      colB == -3 ||
      colC == -3 ||
      diagA == -3 ||
      diagB == -3
    ) {
      console.log("cross wins");
      switch (playerSymbol) {
        case "X":
          result = "playerWin";
          break;
        case "O":
          result = "cpuWin";
          break;
      }
    } // fin if-3

    if (result !== "neutral"){
      console.log("early " + result +  " on turn " + turn);
      gameEnd(result);
      return;
    }


    if (turn == 8){
      console.log("last turn end: " + result);
      gameEnd(result);
      return;
    }

    console.log("end of turn" + turn)
    turn += 1;


    switch(lastPlay){
      case "player":
        cpuTurn();
        break;
      case "cpu":
        playerTurn();
        break;
        }


    return;
  } //fin checkResult

  function gameEnd(result) {
    playerSymbol = "";
    switch (result) {
      case "playerWin":
        $("#info").html("");
        $("#info").html("Congratulation ! You Win !");
        console.log("player is awarded 1 point");
        score[0] += 1;
        break;
      case "cpuWin":
        $("#info").html("");
        $("#info").html("Sorry, you lost !");
        console.log("cpu is awarded 1 point");
        score[2] += 1;
        break;
      case "neutral":
        $("#info").html("");
        $("#info").html("It's a draw !");
        console.log("neutral is awarded 1 point");
        score[1] += 1;
        break;
    }

    $("#symbolSelect").html("<p>That was fun, wasn't it ? </br></p><div id='playagain' class='btn btn-secondary'>Let's play again !</div>");

    $("#playagain").on("click", function(){
      $("#info").html("");
      $("#symbolSelect").html("");
      setNewGame();
    });

  } //fin gameEnd


  function cpuTurn(){

    //START random version

    console.log("cpuTurn starting(random version)");
    var freeTiles = [];
    board.forEach(function(value, index){
      if(value === 0){freeTiles.push(index);}
    });
    console.log("freeTiles: " + freeTiles.toString());
    var randChoice = getRandomInt(0, freeTiles.length);
    console.log("random:" + randChoice);
    var chosenTile = freeTiles[randChoice];
    console.log("chosenTile:" + chosenTile);
    cpuTile(chosenTile);
    checkResult("cpu");

    //END random version




  }  //fin cpuTurn



  function getRandomInt(min, max) { //part of cpuTurn random version
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


  function cpuTile(tile) {
    console.log("cpuTile starting for tile: " + tile);
    var target;
    target = "#tile";
    target += tile;

    switch (playerSymbol) {
      case "O":
        board[tile] = -1;
        $(target).html("<div class='tiles'><i class='fa fa-times crossfix'></i></div>");
        break;

      case "X":
        board[tile] = +1;
        $(target).html(
          "<div class='tiles'><i class='fa fa-circle-o circlefix'></i></div>"
        );
        break;
    } //fin switch
    return;
  }


}) // fin doc ready