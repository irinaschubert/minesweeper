const $board = $('#board');

export default class Board{
    constructor(level = 2){
        this.createBoard($board, level);
    }

    createBoard(board, level = 2) {
        board.empty();

        if (level === 2){
            this.rows = 16;
            this.cols = 16;
        }else if (level===1){
            this.rows = 10;
            this.cols = 10;
        }else {
            this.rows = 26;
            this.cols = 26;
        }

        for (let i = 0; i < this.rows; i++) {
            const $row = $('<div>').addClass('row');
            for (let j = 0; j < this.cols; j++) {
                const $field = $('<div>')
                    .addClass('field hidden')
                    .attr('data-row', i)
                    .attr('data-col', j);
                if (Math.random() < 0.1) {
                    $field.addClass('mine');
                }
                $row.append($field);
            }
            board.append($row);
        }
    }

    getRows(){
        return this.rows;
    }

    getCols(){
        return this.cols;
    }
}

