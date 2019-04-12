/**
 minesweeper.js
 Author: Irina Schubert
 Url: https://git.ffhs.ch/irina.schubert/fwebt_minesweeper.git
 */

'use strict';
// global variables
let openedCards = 0;
let flagCount = 0;
let numberOfMines;
let username = 'Dummy';
const deck = document.getElementById("board");
const board = []
let boardWidth;
let boardHeight;
let numberOfFields;

// @description game timer
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

let openField = function (event){
    let clickedElement = event.target;
    openedCards = openedCards + 1;
    clickedElement.classList.toggle("open");

    // Gewonnen?
    if(openedCards == (numberOfMines - numberOfMines)){
        alert(username + ", du hast gewonnen!")
        document.getElementById("winnersName").innerHTML = username;
        clearInterval(interval);
        let finalTime = timer.innerHTML;
        document.getElementById("finalTime").innerHTML = finalTime;
    }
    if(clickedElement.classList.contains("mine")){
        alert(username + ", du hast verloren!")
    }
}

let markField = function (event){
    let clickedElement = event.target;
    if (clickedElement.classList.contains("flagged")) {
        clickedElement.classList.remove("flagged");
        flagsOneDown();
    }
    else if (!clickedElement.classList.contains("flagged")){
        clickedElement.classList.toggle("flagged");
        flagsOneUp();
    }
    else {
        return;
    }
}

function getLevel(){
    let selectedLevel = document.getElementById("levelSelection");
    let level = selectedLevel.options[selectedLevel.selectedIndex].value;
    return level;
}

function setupFields(level = 2){
    if (level == 2){
        boardWidth = 16;
        boardHeight = 26;
        numberOfFields = boardWidth*boardHeight;
        numberOfMines = 80;
    }else if (level==1){
        boardWidth = 16;
        boardHeight = 16;
        numberOfFields = boardWidth*boardHeight;
        numberOfMines = 10;
    }else {
        boardWidth = 26;
        boardHeight = 26;
        numberOfFields = boardWidth*boardHeight;
        numberOfMines = 150;
    }
    const boardElement = document.getElementById('board');
    // empty existing fields
    boardElement.innerHTML = "";
    for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            let cell = {};
            // Create a <div class="field"></div> and store it in the cell object
            cell.element = document.createElement('div');
            cell.element.setAttribute("class", "field" );
            // Add it to the board
            boardElement.appendChild(cell.element);
        }
    }
    let field = document.getElementsByClassName("field");
    let fields = [...field];
    //fields = shuffle(fields);
    // remove old classes from each card
    for (let i = 0; i < fields.length; i++){
        fields[i].classList.remove("open");
        fields[i].classList.remove("flagged");
    }
    // add event listeners to each field
    for (let i = 0; i < fields.length; i++){
        fields[i].addEventListener("click", openField);
        fields[i].addEventListener("contextmenu", markField);
        fields[i].setAttribute("id", i)
        //fields[i].style.backgroundColor = '#e6ffe6';
    }
    placeMines();
}

function placeMines(){
    let randomNumbers = []
    while(randomNumbers.length < numberOfMines){
        let r = Math.floor(Math.random()*numberOfFields) + 1;
        if(randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }
    for(let i = 0; i < numberOfMines; i++){
        let randNum = randomNumbers[i];
        let mineField = document.getElementById(randNum)
        //let mineField = $('.board').children().eq(fieldIndex);
        mineField.classList.toggle("mine");
    }
}

function initGame() {
    let level = getLevel();
    setupFields(level);
}

let resetValues = function(){
    flagCount = 0;
    showFlagCount();
}

function askForName(){
    return String(prompt("Unter welchem Namen möchtest du spielen?"));
}

// @description shuffles cards when page is refreshed / loads
document.body.onload = initGame();

function startGame(){
    if(username===''){
        username = askForName();
    }
    let selectedLevel = document.getElementById("levelSelection");
    let level = selectedLevel.options[selectedLevel.selectedIndex].value;
    resetValues();
    setupFields(level);
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

function flagsOneUp(){
    flagCount++;
    showFlagCount();
}

function flagsOneDown(){
    flagCount--;
    showFlagCount();
}

function showFlagCount(){
    document.getElementById("counter").innerHTML = flagCount;
}