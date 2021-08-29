import Game from "../../src/game/game.js";
import Player from "../../src/game/player.js";
let player1;
let player2;
let game;
beforeEach(() => {
  player1 = new Player();
  player2 = new Player();
  game = new Game();
  game.player1 = player1;
  game.player2 = player2;
});

test('Game should have two valid players before starting', () => {
  expect(game.player1).toBeTruthy();
  expect(game.player2).toBeTruthy();
});