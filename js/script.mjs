/*
 inspired by: https://github.com/codyseibert/js-minesweeper
 script.mjs
 Author: Irina Schubert
 Url: https://git.ffhs.ch/irina.schubert/fwebt_minesweeper.git
 */

'use strict';

import Timer from "./timer.mjs";
import Board from "./board.mjs";
import FlagCounter from "./flagCounter.mjs";

const $timerCounter = $('#timerCounter');
const $board = $('#board');
const $flagCounter = $('#counter');
const $levelSelection = $('#levelSelection');
const $scoreElement = $('#score');

let username = 'Dummy';

let timer = new Timer();
let board = new Board();
let flagCounter = new FlagCounter($flagCounter);

function getLevel(){
    return parseInt($levelSelection.val());
}

let resetValues = function(){
    flagCounter.resetFlagCount();
    timer.resetTimer();
};

function start() {
    $levelSelection.on("change", start);
    $('.restart').on("click", start);
    if(username===''){
        username = askForName();
    }
    resetValues();
    board.createBoard($board, getLevel());
}

function askForName(){
    return String(prompt("Mit welchem Namen möchtest du spielen?"));
}



function gameOver(isWin) {
    timer.stopTimer();
    let message = null;
    let icon = null;
    if (isWin) {
        message = 'Gratuliere, ' +username + ', du hast gewonnen!';
        icon = 'fa fa-thumbs-up';
        const scoreElement = document.getElementById('score');
        let winner = {};
        winner.element = document.createElement('div');
        winner.element.setAttribute("class", "winner" );
        winner.element.innerHTML = username + ' ' + $timerCounter.text();
        scoreElement.appendChild(winner.element);
    } else {
        message = 'Du hast verloren!';
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
        if (i >= board.getRows() || j >= board.getCols() || i < 0 || j < 0) return;
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
    flagCounter.updateFlagCount();
}

// get number of mines in adjacent fields
function getMineCount(i, j) {
    let count = 0;
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= board.getRows() || nj >= board.getCols() || nj < 0 || ni < 0) continue;
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
        flagCounter.updateFlagCount();
    }
    else if (!clickedElement.classList.contains("flagged")){
        clickedElement.classList.toggle("flagged");
        flagCounter.updateFlagCount();
    }
});

window.addEventListener("load", start, false);