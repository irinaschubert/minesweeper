/**
 Script.js
 Author: Irina Schubert
 Url: https://git.ffhs.ch/irina.schubert/fwebt_minesweeper.git
 */

'use strict';
// global variables
let openedCards = 0;
let flagCount = 0;
let numberOfMines;
let username = 'Dummy';
let boardWidth;
let boardHeight;
let numberOfFields;

// @description game timer
let second = 0;
let timerCounter = document.getElementById("timerCounter");
let interval;
function startTimer() {
    interval = setInterval(function () {
        timerCounter.innerHTML = second;
        second++;
    }, 1000);
}

let openField = function (event){
    let clickedElement = event.target;
    openedCards = openedCards + 1;
    //start timer on first click
    if(openedCards === 1){
        second = 0;
        startTimer();
    }
    clickedElement.classList.toggle("open");

    // Gewonnen?
    if(openedCards === (numberOfMines - numberOfMines)){
        alert(username + ", du hast gewonnen!");
        document.getElementById("winnersName").innerHTML = username;
        clearInterval(interval);
        document.getElementById("finalTime").innerHTML = timerCounter.innerHTML;
    }
    if(clickedElement.classList.contains("mine")){
        alert(username + ", du hast verloren!");
    }
};

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
};

function getLevel(){
    let selectedLevel = document.getElementById("levelSelection");
    return selectedLevel.options[selectedLevel.selectedIndex].value;
}

// @description shuffles fields
// @param {array}
// @returns shuffled array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function setupFields(level = 2){
    if (level === 2){
        boardWidth = 16;
        boardHeight = 26;
        numberOfFields = boardWidth*boardHeight;
        numberOfMines = 80;
    }else if (level===1){
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
    fields = shuffle(fields);
    // remove old classes from each card
    for (let i = 0; i < fields.length; i++){
        fields[i].classList.remove("open");
        fields[i].classList.remove("flagged");
        fields[i].classList.remove("mine");
    }
    // add event listeners to each field
    for (let i = 0; i < fields.length; i++){
        fields[i].addEventListener("click", openField);
        fields[i].addEventListener("contextmenu", markField);
        fields[i].setAttribute("id", i);
    }
    placeMines();
}

function placeMines(){
    let randomNumbers = [];
    while(randomNumbers.length < numberOfMines){
        let r = Math.floor(Math.random()*numberOfFields) + 1;
        if(randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }

    for(let i = 0; i < numberOfMines; i++){
        let randNum = randomNumbers[i];
        let mineField = document.getElementById(randNum);
        mineField.classList.toggle("mine");
    }
}

function initGame() {
    if(username===''){
        username = askForName();
    }
    resetValues();
    let level = getLevel();
    setupFields(level);
}

let resetValues = function(){
    flagCount = 0;
    showFlagCount();
    //reset timer
    second = 0;
    let timerCounter = document.getElementById("timerCounter");
    timerCounter.innerHTML = second;
    clearInterval(interval);
};

function askForName(){
    return String(prompt("Unter welchem Namen möchtest du spielen?"));
}

// @description initiates the game and fields when page is refreshed / loads
document.body.onload = initGame();

function startGame(){
    initGame();
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