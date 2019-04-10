/**
 minesweeper.js
 Author: Irina Schubert
 Url: https://git.ffhs.ch/irina.schubert/fwebt_minesweeper.git
 */

'use strict';

// global variables
/*const deck = document.getElementById("deck");
let matchedCard = document.getElementsByClassName("match");
*/
var openedCards = [];
let flagCount = 0;
let numberOfMines = 2;
let username = '';


function askForName(){
    return String(prompt("Unter welchem Namen möchtest du spielen?"));
}

function startGame(){
    username = askForName();
    let selectedLevel = document.getElementById("levelSelection");
    let level = selectedLevel.options[selectedLevel.selectedIndex].value;
    resetValues();
    setupFields(level);
    //reset timer
    //second = 0;
    //minute = 0;
    //hour = 0;
    //var timer = document.querySelector(".timer");
    //timer.innerHTML = "0 mins 0 secs";
    //clearInterval(interval);
}

function reStartGame(){
    let selectedLevel = document.getElementById("levelSelection");
    let level = selectedLevel.options[selectedLevel.selectedIndex].value;
    resetValues();
    setupFields(level);
}

let resetValues = function(){
    numberOfMines = 2;
    flagCount = 0;
    showFlagCount();
}

// setup fields
let setupFields = function (level = 2) {
    let field = document.getElementsByClassName("field");
    let fields = [...field];
    /*fields = shuffle(fields);
    // add event listeners to each field
    for (let i = 0; i < fields.length; i++){
        deck.innerHTML = "";
        [].forEach.call(fields, function(item) {
            deck.appendChild(item);
        });
        fields[i].classList.remove("show", "open", "match", "disabled");
    }*/
    for (let i = 0; i < fields.length; i++){
        fields[i].addEventListener("click", openField);
        fields[i].addEventListener("contextmenu", markField);
        fields[i].setAttribute("id", i)
        fields[i].style.backgroundColor = '#e6ffe6';
    }
}

let openField = function (){
    //TODO check if mine, if yes: lost
    openedCards.push(this);
    if(openedCards[openedCards.length-1].type == "mine"){
        alert(username + ", du hast verloren!")
    } else {
        document.getElementById(this.id).style.backgroundColor = '#ffffff';
    }
}

let markField = function (){
    let currentBackgroundColor = getStyle(document.getElementById(this.id), 'background-color')
    if(currentBackgroundColor == hexToRGB("#e6ffe6")){
        document.getElementById(this.id).style.backgroundColor = '#ff33cc';
        flagsOneUp();
    }
    else if (currentBackgroundColor == hexToRGB("#c9ffc9")){
        document.getElementById(this.id).style.backgroundColor = '#ff33cc';
        flagsOneUp();
    }
    else if (currentBackgroundColor == hexToRGB('#ff33cc')) {
        document.getElementById(this.id).style.backgroundColor = '#e6ffe6';
        flagsOneDown();
    }
    else {
        return;
    }
}

function getStyle(element,styleProp) {
    if (element.currentStyle){
        return element.currentStyle[styleProp];
    }
    return document.defaultView.getComputedStyle(element,null)[styleProp];
}

function flagsOneUp(){
    flagCount++;
    showFlagCount();
    // Ziel erreicht?
    if(flagCount == numberOfMines){
        // TODO check if won
        alert(username + ", du hast gewonnen!")
        document.getElementById("newscore").innerHTML = username;
    }
}

function flagsOneDown(){
    flagCount--;
    showFlagCount();
}

function showFlagCount(){
    document.getElementById("counter").innerHTML = flagCount;
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToRGB(h) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }
    return "rgb("+ +r + ", " + +g + ", " + +b + ")";
}

/*
function startGame(level=2) {
    askForName();
    for (var i= 0; i < level; i++){
        [].forEach.call(fields, function(item){
            panel.appendChild(item);
        });
    }
}*/
