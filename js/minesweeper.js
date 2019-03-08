/**
 minesweeper.js
 Author: Irina Schubert
 Url: https://git.ffhs.ch/irina.schubert/fwebt_minesweeper.git
 */

'use strict';

function startGame() {
    myGameArea.start();
}

let myGameArea = {
    
}

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