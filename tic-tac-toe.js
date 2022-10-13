"use strict";

window.onload = function(){

    var board = document.getElementById("board")
    var box = board.querySelectorAll('div')

    var win = document.getElementById("status")
    var winner = ""


    let counter = 0;

    let game_state = ["", "", "", "", "", "", "", "", ""];

    box.forEach(function(item)
    {
        //Set each div's class to square
        item.setAttribute("class", "square");

        //sets inner html of each div to ""
        item.innerHTML="";


        //Add click event listener to each square where X & O can be placed.
        item.addEventListener("click", function(){
            
            //if counter is even it is player 1's turn and if the box is still empty ""
            
            if(counter % 2 == 0 && this.innerHTML == "" )
            {
                //Place an X inside item
                item.innerHTML = "X";

                //set class of item to square X so it looks properly
                item.setAttribute("class", "square X");

                //Increment counter so that it becomes the other players turn
                counter++;
            
                game_state[Array.from(box).indexOf(item)] = "X";

            }

            else if(counter % 2 != 0 && this.innerHTML == "")
            {
                //Place an O inside item
                item.innerHTML = "O";

                //set class of item to square O so the css formats it properly
                item.setAttribute("class", "square O");

                counter++;

                game_state[Array.from(box).indexOf(item)] = "O";
            }

        });

        
        //Mouse event listener that changes div class to hover when mouse is over div 
        item.addEventListener("mouseover", function(){
            item.setAttribute("class", "hover");
        });

        //MOuse event listener that returns div to it's previous class
        item.addEventListener("mouseout", function(){
            
            if(item.innerHTML == "X"){
                item.setAttribute("class", "square X")
            }
            else if(item.innerHTML == "O"){
                item.setAttribute("class", "square O")
            }
            else{
                item.setAttribute("class", "square")
            }
        
        });


        let row_win = false;
        let col_win = false;
        let diagonal_win = false;

        board.onclick = function(){

            if(counter>4){
                //For loop to check each row
                for(var row_check = 0; row_check <= 6; row_check+=3){
                    //checks if rows are equal and in correct order
                    if(game_state[row_check] == game_state[row_check+1] && 
                        game_state[row_check+1] == game_state[row_check+1] &&
                        game_state[row_check+1] == game_state[row_check+2])
                        {
                            //checks that no div has an innerHtml of ""
                            if(game_state[row_check]!="" || game_state[row_check+1]!="" || game_state[row_check+1]!=""){
                                winner = game_state[row_check];
                                row_win = true;
                            }

                        }

                }

                //For loop to check each column

                for(var col_check = 0; col_check<=3; col_check++)
                {
                    if(game_state[col_check] == game_state[col_check+3] &&
                        game_state[col_check] == game_state[col_check+6] &&
                        game_state[col_check+3] == game_state[col_check+6])
                        {
                            if(game_state[col_check]!="" || game_state[col_check+1]!="" || game_state[col_check+1]!=""){
                                winner = game_state[col_check];

                                col_win = true;
                            }

                        }

                }



                //check if player woon from bottom left to top right
                if(game_state[2] == game_state[4] && 
                    game_state[2]== game_state[6] && 
                    game_state[4] == game_state[6])
                    {
                        winner = game_state[2];

                        diagonal_win = true;
                    }


                //check if player won from top left to bottom right
                if(game_state[0] == game_state[4] && 
                    game_state[0]== game_state[8] && 
                    game_state[4] == game_state[8])
                    {
                        winner = game_state[0];

                        diagonal_win = true;
                    }


            }

            //Checks if draw conditions have been met by ensuring
            //all indexes of game_state is filled & no found winning combination

            if(!row_win && !col_win && diagonal_win && !game_state.includes(""))
            {
                
                win.innerHTML = "Draw"
                win.setAttribute("class", "you-won")

            }

            //Checks if there is a winning condition. 
            if(row_win || col_win || diagonal_win)
            {
                //change div with class status inner html
                win.innerHTML = "Congratulations! "+ winner +" is the Winner!";
                //set attribute of win
                win.setAttribute("class", "you-won");

                //anti cheat no longer able to click more boxes after a winner
                //is declared
                board.style.pointerEvents = "none";

            }
        }

        //Get new game button through document
        var newGameButton = document.getElementById("game").getElementsByClassName("btn");

        newGameButton[0].addEventListener("clicl", function(){
            window.location.reload(true);
        });

    });



}