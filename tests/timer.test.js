import * as board from "../js/board.mjs";
import * as script from "../js/script.mjs";

// Set all module functions to jest.fn
jest.mock("../js/board.mjs");

test("calls createBoard(board, 2)", () => {
    script.start();
    expect(board.createBoard).toHaveBeenCalledWith("board", 2);
});
