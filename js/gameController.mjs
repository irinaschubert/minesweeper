import {Board} from "./board.mjs";
import {UsersController} from "./usersController.mjs";
import {resetTimer, stopTimer} from "./timeCounter.mjs";


const $timerCounter = $('#timerCounter');
const $flagCounter = $('#counter');
const $levelSelection = $('#levelSelection');

export class GameController {
    constructor() {
        this.usersController = new UsersController();

        let level = getLevel();
        this.board = new Board(level);
        addEventListenersToBoard(this.board);

        this.addExampleUser();
        this.setUserName();
    }


    startGame(){
        this.name = getUsername();
        this.resetValues();
        let level = getLevel();
        this.createBoard(level);

    }

    start() {
        if(this.username===''){
            this.username = this.setUserName();
        }
        resetValues();
        createBoard(getLevel());
    }

    addExampleUser() {
        this.exampleUserId = guid();
        this.usersController.addUser(this.exampleUserId, "Mustermann");
    }

    setUserName()  {
        this.username = askForName();
    }



}

function getLevel(){
    return parseInt($levelSelection.val());
}

let resetValues = function(){
    updateFlagCount();
    resetTimer();
};



function askForName(){
    return String(prompt("Mit welchem Namen möchtest du spielen?"));
}

function updateFlagCount(){
    $flagCounter.html($('.field.flagged').length);
}

function addEventListenersToBoard(board){
    board.on('click', '.field.hidden', function() {
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

    board.on('contextmenu', '.field.hidden', function(event) {
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

function gameOver(isWin) {
    stopTimer();
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