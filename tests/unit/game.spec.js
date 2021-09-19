import Game from "../../src/game/game.js";
import Player from "../../src/game/player.js";
import Axie from "../../src/game/axie.js";
import {
  AxieTypeEnum,
  AxiePosition,
  getAxieTypeParts,
} from "../../src/game/data/data.js";
let player1;
let axieBird;
let axiePlant;
let axieBeast;
let player2;
let axieAquatic;
let axieReptile;
let axieBug;
let game;
beforeEach(() => {
  axieBird = new Axie();
  axiePlant = new Axie();
  axieBeast = new Axie();
  axieBird.initialize(
    1,
    AxiePosition.LEFT,
    AxieTypeEnum.BIRD,
    getAxieTypeParts(AxieTypeEnum.BIRD)
  );
  axieBeast.initialize(
    2,
    AxiePosition.CENTER,
    AxieTypeEnum.BEAST,
    getAxieTypeParts(AxieTypeEnum.BEAST)
  );
  axiePlant.initialize(
    3,
    AxiePosition.RIGHT,
    AxieTypeEnum.PLANT,
    getAxieTypeParts(AxieTypeEnum.PLANT)
  );
  let axiesP1 = [axiePlant, axieBeast, axieBird];

  axieAquatic = new Axie();
  axieReptile = new Axie();
  axieBug = new Axie();
  axieAquatic.initialize(
    4,
    AxiePosition.LEFT,
    AxieTypeEnum.AQUATIC,
    getAxieTypeParts(AxieTypeEnum.AQUATIC)
  );
  axieReptile.initialize(
    5,
    AxiePosition.CENTER,
    AxieTypeEnum.REPTILE,
    getAxieTypeParts(AxieTypeEnum.REPTILE)
  );
  axieBug.initialize(
    6,
    AxiePosition.RIGHT,
    AxieTypeEnum.BUG,
    getAxieTypeParts(AxieTypeEnum.BUG)
  );
  let axiesP2 = [axieAquatic, axieReptile, axieBug];
  player1 = new Player();
  player2 = new Player();
  player1.initialize(1, axiesP1);
  player2.initialize(2, axiesP2);
  game = new Game();
});

test("After initializing, game should have two valid players", () => {
  game.initialize(player1, player2);
  expect(game.player1).toBeTruthy();
  expect(game.player2).toBeTruthy();
});

test("Game shuffles deck, gives 3 energy and 6 cards on the first round to each player.", () => {
  game.initialize(player1, player2);
  game.beginRound();
  expect(game.player1.energy).toBe(3);
  expect(game.player2.energy).toBe(3);
  expect(game.player1.deck.hand.length).toBe(6);
  expect(game.player2.deck.hand.length).toBe(6);
  expect(game.player1.deck.cards.length).toBe(18);
  expect(game.player2.deck.cards.length).toBe(18);
});

test("Game gives 2 energy and 3 cards at the start of every round (after the first round) to each player", () => {
  game.initialize(player1, player2);
  game.beginRound();
  expect(game.player1.energy).toBe(3);
  expect(game.player2.energy).toBe(3);
  
  game.beginDiscardPhase();
  game.endDiscardPhase();
  game.beginChoosingPhase();
  game.endChoosingPhase();
  expect(game.player1.energy).toBe(5);
  expect(game.player2.energy).toBe(5);
  expect(game.player1.deck.hand.length).toBe(9);
  expect(game.player2.deck.hand.length).toBe(9);
  expect(game.player1.deck.cards.length).toBe(15);
  expect(game.player2.deck.cards.length).toBe(15);
});

test("Increase round after every round end.", () => {
  game.initialize(player1, player2);
  expect(game.round).toBe(1);

  game.beginDiscardPhase();
  game.endDiscardPhase();
  game.beginChoosingPhase();
  game.endChoosingPhase();
  
  expect(game.round).toBe(2);
});

test("Game ends at start of the round if one of the players has no more axies alive", () => {
  game.initialize(player1, player2);
  expect(game.round).toBe(1);
  
  game.beginRound();
  game.beginChoosingPhase();
  
  game.player1.axies = game.player1.axies.map((axie) => {
    axie.dead = true;
    return axie;
  });
  game.endChoosingPhase();
  expect(game.player1.isDead()).toBeTruthy();
  expect(game.finished).toBeTruthy();
  expect(game.winner).toBeTruthy();
});

test("Game ends (as a draw) at start of the round if both players have no more axies alive", () => {
  game.initialize(player1, player2);
  expect(game.round).toBe(1);

  game.beginRound();
  game.beginChoosingPhase();
  game.player2.axies = game.player2.axies.map((axie) => {
    axie.dead = true;
    return axie;
  });
  game.player1.axies = game.player1.axies.map((axie) => {
    axie.dead = true;
    return axie;
  });
  game.endChoosingPhase();
  expect(game.player1.isDead()).toBeTruthy();
  expect(game.player2.isDead()).toBeTruthy();
  expect(game.finished).toBeTruthy();
  expect(game.winner).toBeFalsy()
});

test("Game ends (as a draw) at start of the round if both players have no more axies alive", () => {
  game.initialize(player1, player2);
  expect(game.round).toBe(1);

  game.beginRound();
  game.beginChoosingPhase();
  game.player2.axies = game.player2.axies.map((axie) => {
    axie.dead = true;
    return axie;
  });
  game.player1.axies = game.player1.axies.map((axie) => {
    axie.dead = true;
    return axie;
  });
  game.endChoosingPhase();
  expect(game.player1.isDead()).toBeTruthy();
  expect(game.player2.isDead()).toBeTruthy();
  expect(game.finished).toBeTruthy();
  expect(game.winner).toBeFalsy()
});
