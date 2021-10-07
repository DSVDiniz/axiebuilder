import Player from "../../src/game/player.js";
import Axie from "../../src/game/axie.js";
import {
  AxieTypeEnum,
  AxiePosition,
  getAxieTypeParts,
} from "../../src/game/data/data.js";
let player;
let axieBird;
let axiePlant;
let axiePlant2;
let axieBeast;
beforeEach(() => {
  player = new Player();
  axieBird = new Axie();
  axiePlant = new Axie();
  axiePlant2 = new Axie();
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
  axiePlant2.initialize(
    3,
    AxiePosition.CENTER,
    AxieTypeEnum.PLANT,
    getAxieTypeParts(AxieTypeEnum.PLANT)
  );
});

test("After initializing, player id should be != 0", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  player.initialize(1, axies);
  expect(player.id).not.toBe(0);

  player.initialize(0, axies);
  expect(player.id).not.toBe(0);
});

test("Energy should start as 0 and 0 <= x <= 10", () => {
  expect(player.energy).toBe(0);
  player.setEnergy(-1);
  expect(player.energy).not.toBe(-1);
  player.setEnergy(11);
  expect(player.energy).not.toBe(11);
  player.setEnergy(5);
  expect(player.energy).toBe(5);
});

test("Adding energy should respect the energy maximum and minimum (0 <= x <= 10)", () => {
  expect(player.energy).toBe(0);
  player.addEnergy(-1);
  expect(player.energy).not.toBe(-1);
  player.addEnergy(11);
  expect(player.energy).not.toBe(11);
  player.addEnergy(5);
  expect(player.energy).toBe(5);
  player.addEnergy(-2);
  expect(player.energy).toBe(3);
});

test("After initialization, player should only have 3 Axies", () => {
  let axies = [];
  player.initialize(1, axies);
  expect(player.axies.length).toBe(0);

  axies = [axiePlant, axieBeast, axieBird];
  player.initialize(1, axies);
  expect(player.axies.length).toBe(3);

  axies = [axiePlant, axieBeast];
  player.initialize(1, axies);
  expect(player.axies.length).toBe(0);

  axies = [axiePlant, axieBeast, axieBird, axieBird];
  player.initialize(1, axies);
  expect(player.axies.length).toBe(0);
});

test("After initialization, each axie should have a different id", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  player.initialize(1, axies);
  let ids = {};
  player.axies.forEach((axie) => (ids[axie.id] = axie));
  expect(Object.keys(ids).length).toBe(3);

  axies = [axiePlant, axiePlant2, axieBird];
  player.initialize(1, axies);
  expect(player.axies.length).toBe(0);
});

test("After initialization, each axie should be in a different position", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  player.initialize(1, axies);
  expect(player.axies.length).toBe(3);
});

test("Can't play cards if you don't have energy.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  player.initialize(1, axies);

  player.deck.drawCards(1);
  player.deck.addCardToPlayed(1);
  let playedCards = player.deck.playCards();
  expect(playedCards.length).toBe(0);
});
