import Board from "../js/board.js";

describe("board", () => {

    it("create board with correct size according to level", () => {
        let board_l1 = new Board(1);
        let board_l2 = new Board(2);
        let board_l3 = new Board(3);
        expect(board_l1.cols).toBe(10);
        expect(board_l1.rows).toBe(10);
        expect(board_l2.cols).toBe(16);
        expect(board_l2.rows).toBe(16);
        expect(board_l3.cols).toBe(26);
        expect(board_l3.rows).toBe(26);

    });

    it("setup of board is correct", () => {
        let board_l1 = new Board(1);
        let board_l2 = new Board(2);
        let board_l3 = new Board(3);
        expect(board_l1.getRows()).toBe(10);
        expect(board_l1.getCols()).toBe(10);
        expect(board_l1.getRows()).toBe(10);
        expect(board_l1.getCols()).toBe(10);
        expect(board_l1.getRows()).toBe(10);
        expect(board_l1.getCols()).toBe(10);
    });
});