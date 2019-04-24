/**
 * Game logic inspired by: https://github.com/codyseibert/js-minesweeper
 * Author: Irina Schubert
 * Url: https://git.ffhs.ch/irina.schubert/fwebt_minesweeper.git
 */

'use strict';

import {GameController} from "./gameController.mjs";

let game = new GameController();

export function start(){
    game.start();
}

