/*
 inspired by: https://github.com/codyseibert/js-minesweeper
 script.js
 Author: Irina Schubert
 Url: https://git.ffhs.ch/irina.schubert/fwebt_minesweeper.git
 */

'use strict';

const $board = $('#board');
const $timerCounter = $('#timerCounter');
const $flagCounter = $('#counter');
const $levelSelection = $('#levelSelection');
let rows;
let cols;
let username = 'Dummy';

// @description game timer
let interval;
function startTimer() {
    let second = 0;
    interval = setInterval(function () {
        $timerCounter.html(second.toString());
        second++;
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    startTimer();
}

function stopTimer(){
    clearInterval(interval);
}

function createBoard(level = 2) {
    if (level === 2){
        rows = 16;
        cols = 16;
    }else if (level===1){
        rows = 10;
        cols = 10;
    }else {
        rows = 26;
        cols = 26;
    }
    $board.empty();
    for (let i = 0; i < rows; i++) {
        const $row = $('<div>').addClass('row');
        for (let j = 0; j < cols; j++) {
            const $field = $('<div>')
                .addClass('field hidden')
                .attr('data-row', i)
                .attr('data-col', j);
            if (Math.random() < 0.1) {
                $field.addClass('mine');
            }
            $row.append($field);
        }
        $board.append($row);
    }
}

function getLevel(){
    return parseInt($levelSelection.val());
}

let resetValues = function(){
    updateFlagCount();
    resetTimer();
};

function start() {
    if(username===''){
        username = askForName();
    }
    resetValues();
    let level = getLevel();
    console.log(level);
    createBoard(level);
}

function askForName(){
    return String(prompt("Mit welchem Namen möchtest du spielen?"));
}

function updateFlagCount(){
    $flagCounter.html($('.field.flagged').length);
}

function gameOver(isWin) {
    stopTimer();
    let message = null;
    let icon = null;
    if (isWin) {
        message = 'YOU WON!';
        icon = 'fa fa-thumbs-up';
    } else {
        message = 'YOU LOST!';
        icon = 'fa fa-bolt';
    }
    $('.field.mine').append(
        $('<i>').addClass(icon)
    );
    $('.field:not(.mine)')
        .html(function() {
            const $cell = $(this);
            const count = getMineCount(
                $cell.data('row'),
                $cell.data('col'),
            );
            return count === 0 ? '' : count;
        });
    $('.field.hidden').removeClass('hidden');
    setTimeout(function() {
        alert(message);
        start();
    }, 1000);
}

function reveal(oi, oj) {

    const seen = {};

    function helper(i, j) {
        if (i >= rows || j >= cols || i < 0 || j < 0) return;
        const key = `${i} ${j}`;
        if (seen[key]) return;
        const $cell = $(`.field.hidden[data-row=${i}][data-col=${j}]`);
        const mineCount = getMineCount(i, j);
        if (!$cell.hasClass('hidden') || $cell.hasClass('mine')) {
            return;
        }
        $cell.removeClass('hidden');
        $cell.removeClass('flagged');
        // show number of mines around
        if (mineCount) {
            $cell.text(mineCount);
            return;
        }
        // if no mine is around, reveal all adjacent fields which are not mines
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                helper(i + di, j + dj);
            }
        }
    }
    helper(oi, oj);
    updateFlagCount();
}

// get number of mines in adjacent fields
function getMineCount(i, j) {
    let count = 0;
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= rows || nj >= cols || nj < 0 || ni < 0) continue;
            const $cell = $(`.field.hidden[data-row=${ni}][data-col=${nj}]`);
            if ($cell.hasClass('mine')) count++;
        }
    }
    return count;
}

$board.on('click', '.field.hidden', function() {
    const $cell = $(this);
    const row = $cell.data('row');
    const col = $cell.data('col');

    if ($cell.hasClass('mine')) {
        gameOver(false);
    } else {
        reveal(row, col);
        //if only mines are left hidden: win
        const isGameOver = $('.field.hidden').length === $('.field.mine').length;
        if (isGameOver) gameOver(true);
    }
});

$board.on('contextmenu', '.field.hidden', function(event) {
    event.preventDefault();
    let clickedElement = event.target;
    if (clickedElement.classList.contains("flagged")) {
        clickedElement.classList.remove("flagged");
        updateFlagCount();
    }
    else if (!clickedElement.classList.contains("flagged")){
        clickedElement.classList.toggle("flagged");
        updateFlagCount();
    }
});

start();