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
  game.beginRound();
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
  expect(game.winners).toBeTruthy();
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
  expect(game.winner).toBeFalsy();
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
  expect(game.winner).toBeFalsy();
});

test("After round 10, players should be damaged by bloodmoon", () => {
  game.initialize(player1, player2);
  game.beginRound();
  while (game.round !== 10) {
    game.endChoosingPhase();
  }
  expect(game.round).toBe(10);
  let healthValuesP1 = game.player1.axies.map((axie) => axie.currentHealth);
  let healthValuesP2 = game.player2.axies.map((axie) => axie.currentHealth);
  game.endChoosingPhase();
  let healthValuesP1After = game.player1.axies.map(
    (axie) => axie.currentHealth
  );
  let healthValuesP2After = game.player2.axies.map(
    (axie) => axie.currentHealth
  );
  for (let i = 0; i < healthValuesP1.length; i++) {
    expect(healthValuesP1[i]).not.toBe(healthValuesP1After[i]);
    expect(healthValuesP2[i]).not.toBe(healthValuesP2After[i]);
  }
});

test("Axie turn order should be calculated correctly", () => {
  game.initialize(player1, player2);
  expect(game.turnOrder.length).toBe(0);
  game.beginRound();
  expect(game.turnOrder.length).toBe(6);
  let speeds = game.turnOrder.map((axie) => axie.speed);
  let speedSorted = speeds.sort();
  for (let i = 0; i < speeds.length; i++) {
    expect(speeds[i] === speedSorted[i]).toBeTruthy();
  }
});

let expectedTopRow = [
  AxiePosition.RIGHT,
  AxiePosition.UP_RIGHT,
  AxiePosition.DOWN_RIGHT,
  AxiePosition.CENTER,
  AxiePosition.UP_LEFT,
  AxiePosition.DOWN_LEFT,
  AxiePosition.LEFT,
];

let initializeAxiesForTargetingTests = (axiePositions) => {
  let defenders = [];
  for (let i = 0; i < axiePositions.length; i++) {
    let axie = new Axie();
    axie.initialize(
      i,
      axiePositions[i],
      AxieTypeEnum.BIRD,
      getAxieTypeParts(AxieTypeEnum.BIRD)
    );
    defenders.push(axie);
  }
  for (let i = 0; i < defenders.length; i++) {
    defenders[i].position = axiePositions[i];
  }
  return defenders;
};

test("Top left axies should choose their targets correctly", () => {
  let axiePositions = Object.values(AxiePosition);
  let defenders = initializeAxiesForTargetingTests(axiePositions);
  for (let i = 0; i < axiePositions.length; i++) {
    let target = game.getTargetDependingOnAttackerPosition(
      AxiePosition.UP_LEFT,
      defenders
    );
    expect(target.position).toBe(expectedTopRow[i]);
    for (let j = 0; j < defenders.length; j++) {
      if (defenders[j].id === target.id) {
        defenders[j].die();
      }
    }
  }
});

test("Top right axies should choose their targets correctly", () => {
  let axiePositions = Object.values(AxiePosition);
  let defenders = initializeAxiesForTargetingTests(axiePositions);
  for (let i = 0; i < axiePositions.length; i++) {
    let target = game.getTargetDependingOnAttackerPosition(
      AxiePosition.UP_RIGHT,
      defenders
    );
    expect(target.position).toBe(expectedTopRow[i]);
    for (let j = 0; j < defenders.length; j++) {
      if (defenders[j].id === target.id) {
        defenders[j].die();
      }
    }
  }
});

let expectedCenterRow = [
  AxiePosition.RIGHT,
  -1,
  -1,
  AxiePosition.CENTER,
  -2,
  -2,
  AxiePosition.LEFT,
];

test("Center row axies should choose their targets correctly", () => {
  let axiePositions = Object.values(AxiePosition);
  let defenders = initializeAxiesForTargetingTests(axiePositions);
  for (let i = 0; i < axiePositions.length; i++) {
    let target = game.getTargetDependingOnAttackerPosition(
      AxiePosition.UP_RIGHT,
      defenders
    );
    if (expectedCenterRow[i] === -1) {
      expect(
        target.position == AxiePosition.DOWN_RIGHT ||
          target.position == AxiePosition.UP_RIGHT
      ).toBeTruthy();
    } else if (expectedCenterRow[i] === -2) {
      expect(
        target.position == AxiePosition.DOWN_LEFT ||
          target.position == AxiePosition.UP_LEFT
      ).toBeTruthy();
    } else {
      expect(target.position).toBe(expectedCenterRow[i]);
    }

    for (let j = 0; j < defenders.length; j++) {
      if (defenders[j].id === target.id) {
        defenders[j].die();
      }
    }
  }
});

let expectedBottomRow = [
  AxiePosition.RIGHT,
  AxiePosition.DOWN_RIGHT,
  AxiePosition.UP_RIGHT,
  AxiePosition.CENTER,
  AxiePosition.DOWN_LEFT,
  AxiePosition.UP_LEFT,
  AxiePosition.LEFT,
];

test("Bottom left axies should choose their targets correctly", () => {
  let axiePositions = Object.values(AxiePosition);
  let defenders = initializeAxiesForTargetingTests(axiePositions);
  for (let i = 0; i < axiePositions.length; i++) {
    let target = game.getTargetDependingOnAttackerPosition(
      AxiePosition.DOWN_LEFT,
      defenders
    );
    expect(target.position).toBe(expectedBottomRow[i]);
    for (let j = 0; j < defenders.length; j++) {
      if (defenders[j].id === target.id) {
        defenders[j].die();
      }
    }
  }
});

test("Bottom right axies should choose their targets correctly", () => {
  let axiePositions = Object.values(AxiePosition);
  let defenders = initializeAxiesForTargetingTests(axiePositions);
  for (let i = 0; i < axiePositions.length; i++) {
    let target = game.getTargetDependingOnAttackerPosition(
      AxiePosition.DOWN_RIGHT,
      defenders
    );
    expect(target.position).toBe(expectedBottomRow[i]);
    for (let j = 0; j < defenders.length; j++) {
      if (defenders[j].id === target.id) {
        defenders[j].die();
      }
    }
  }
});


test.only("Attacking (P1) axie cards should damage defending axie (P2)", () => {
  debugger;
  game.initialize(player1, player2);
  game.beginRound();
  game.beginDiscardPhase();
  game.endDiscardPhase();

  let axieHealthP2 = game.player2.axies.reduce((acc,axieCurr) => {return acc +axieCurr.currentHealth},0);
  let cardsInHand = game.getCardsInHandP1();
  for(let i=0; i<cardsInHand.length;i++){
    if(cardsInHand[i].dmg > 0)
      game.chooseCard(game.player1.id,cardsInHand[i].id);
  }
  game.endChoosingPhase();

  let axieHealthP2After = game.player2.axies.reduce((acc,axieCurr) => {return acc +axieCurr.currentHealth},0);
  console.log(axieHealthP2);
  console.log(axieHealthP2After);
  expect(axieHealthP2).not.toBe(axieHealthP2After);
});

test("Attacking (P2) axie cards should damage defending axie (P1)", () => {
  game.initialize(player1, player2);
  game.beginRound();
  game.beginDiscardPhase();
  game.endDiscardPhase();

  let axieHealthP1 = game.player1.axies.reduce((acc,axieCurr) => {return acc +axieCurr.currentHealth},0);
  let cardsInHand = game.getCardsInHandP2();
  for(let i=0; i<cardsInHand.length;i++){
    if(cardsInHand.dmg > 0)
      game.chooseCardP2(cardsInHand[i]);
  }
  game.endChoosingPhase();

  let axieHealthP1After = game.player1.axies.reduce((acc,axieCurr) => {return acc +axieCurr.currentHealth},0);
  console.log(axieHealthP1);
  console.log(axieHealthP1After);
  expect(axieHealthP1).not.toBe(axieHealthP1After);
});