/**
 minesweeper.js
 Author: Irina Schubert
 Url: https://git.ffhs.ch/irina.schubert/fwebt_minesweeper.git
 */

'use strict';

// setup fields
let field = document.getElementsByClassName("field");
let fields = [...field];
// loop to add event listeners to each field
for (let i = 0; i < fields.length; i++){
   fields[i].addEventListener("click", displayField);
};

let displayField = function (){
   this.classList.toggle("open");
   this.classList.toggle("flagged");
}

const panel = document.querySelector(".panel");

function startGame() {
    askForName();
    for (var i= 0; i < level; i++){
      [].forEach.call(fields, function(item){
         panel.appendChild(item);
      });
   }
}

function clickField() {
    // check if field is a mine or if player wins, continue otherwise
    if(){
        // looseGame()
        } else if (){
        // winGame()
        }else{
        // continue
    }
};
       
function looseGame(){
    // open popup
}

function winGame(){
    // open popup
}

function countFlags(){    
    oneUp++;    
    counter.innerHTML = oneUp;
}

function restartGame(){
    //reset timer
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    startGame();
}

//game timer
//TODO: start timer on first click
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


