import PlayerDeck from "../../src/game/player-deck.js";
import Axie from "../../src/game/axie.js";
import {
  AxieTypeEnum,
  AxiePosition,
  getAxieTypeParts,
} from "../../src/game/data/data.js";
let playerDeck;
let axieBird;
let axiePlant;
let axieBeast;
beforeEach(() => {
  playerDeck = new PlayerDeck();
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
});

test("After initialization, player deck should have 24 cards in his deck, 8 cards from each axie, 4 unique cards from each axie.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);
  expect(playerDeck.cards.length).toBe(24);

  let cardsAxiePlant = playerDeck.cards.filter(
    (card) => card.owner == axiePlant.id
  );
  let cardsAxieBeast = playerDeck.cards.filter(
    (card) => card.owner == axieBeast.id
  );
  let cardsAxieBird = playerDeck.cards.filter(
    (card) => card.owner == axieBird.id
  );
  expect(cardsAxiePlant.length).toBe(8);
  expect(cardsAxieBeast.length).toBe(8);
  expect(cardsAxieBird.length).toBe(8);

  let cardsAxiePlantIdMap = {};
  let cardsAxieBeastIdMap = {};
  let cardsAxieBirdIdMap = {};
  cardsAxiePlant.forEach((card) => (cardsAxiePlantIdMap[card.id] = card));
  cardsAxieBeast.forEach((card) => (cardsAxieBeastIdMap[card.id] = card));
  cardsAxieBird.forEach((card) => (cardsAxieBirdIdMap[card.id] = card));
  expect(Object.keys(cardsAxiePlantIdMap).length).toBe(4);
  expect(Object.keys(cardsAxieBeastIdMap).length).toBe(4);
  expect(Object.keys(cardsAxieBirdIdMap).length).toBe(4);
});

test("After initialization, player deck should have 24 cards in his deck, each with an unique gameId", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize( axies);

  let ids = {};
  for (let i = 0; i < playerDeck.cards.length; i++) {
    playerDeck.cards.forEach((card) => (ids[card.gameId] = card));
  }
  expect(Object.keys(ids).length).toBe(playerDeck.cards.length);
});

test("After initialization, player deck should have 0 cards in his hand, cemetery and played.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);
  expect(playerDeck.hand.length).toBe(0);
  expect(playerDeck.cemetery.length).toBe(0);
  expect(playerDeck.played.length).toBe(0);
});

test("Deck should be shuffled correctly.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);
  let auxDeck = playerDeck.cards.slice();
  playerDeck.shuffleDeck();
  let newDeck = playerDeck.cards.slice();
  let equal = true;
  expect(auxDeck.length).toBe(newDeck.length);
  for (let i = 0; i < auxDeck.length; i++) {
    if (auxDeck[i].id !== newDeck[i].id) {
      equal = false;
      break;
    }
  }
  expect(equal).toBeFalsy();
});

test("Drawing cards from deck should function correctly.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);

  let drawAmount = 6;
  let previousDeckAmount = playerDeck.cards.length;
  playerDeck.drawCards(0);
  expect(playerDeck.cards.length).toBe(previousDeckAmount);
  expect(playerDeck.hand.length).toBe(0);

  playerDeck.drawCards(drawAmount);
  expect(playerDeck.cards.length).toBe(previousDeckAmount - drawAmount);
  expect(playerDeck.hand.length).toBe(drawAmount);
  previousDeckAmount = playerDeck.cards.length;

  playerDeck.drawCards(drawAmount);
  expect(playerDeck.cards.length).toBe(previousDeckAmount - drawAmount);
  expect(playerDeck.hand.length).toBe(drawAmount * 2);
  previousDeckAmount = playerDeck.cards.length;

  playerDeck.drawCards(drawAmount);
  expect(playerDeck.cards.length).toBe(previousDeckAmount - drawAmount);
  expect(playerDeck.hand.length).toBe(drawAmount * 3);
  previousDeckAmount = playerDeck.cards.length;

  playerDeck.drawCards(drawAmount);
  expect(playerDeck.cards.length).toBe(previousDeckAmount - drawAmount);
  expect(playerDeck.hand.length).toBe(drawAmount * 4);
  previousDeckAmount = playerDeck.cards.length;
});

test("Player deck should discard cards from hand if he already has 12 cards in hand.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);

  let drawAmount = 12;
  playerDeck.drawCards(drawAmount);
  expect(playerDeck.hand.length).toBe(drawAmount);
  expect(playerDeck.shouldDiscard()).toBeFalsy();
  playerDeck.drawCards(1);
  expect(playerDeck.shouldDiscard()).toBeTruthy();
  playerDeck.drawCards(12);
  expect(playerDeck.shouldDiscard()).toBe(13);
});

test("Player deck should discard cards from hand if he already has 12 cards in hand.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize( axies);

  let drawAmount = 12;
  playerDeck.drawCards(drawAmount);
  expect(playerDeck.hand.length).toBe(drawAmount);
  expect(playerDeck.shouldDiscard()).toBeFalsy();
  playerDeck.drawCards(1);
  expect(playerDeck.shouldDiscard()).toBeTruthy();
  playerDeck.drawCards(12);
  expect(playerDeck.shouldDiscard()).toBe(13);
});

test("When player deck plays cards, they should be removed from hand and land on cemetery.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);
  expect(playerDeck.hand.length).toBe(0);
  expect(playerDeck.cemetery.length).toBe(0);

  let drawAmount = 10;
  playerDeck.drawCards(drawAmount);
  for (let i = 0; i < 4; i++) {
    playerDeck.addCardToPlayed(playerDeck.hand[i].gameId);
  }
  let playedCards = playerDeck.playCards("oi");
  playerDeck.discardPlayedCards();
  expect(playedCards.length).toBe(4);
  expect(playerDeck.hand.length).toBe(6);
  expect(playerDeck.cemetery.length).toBe(4);
});

test("Can't play cards that aren't on your hand.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);
  playerDeck.drawCards(0);
  playerDeck.addCardToPlayed(1);
  playerDeck.addCardToPlayed(2);
  playerDeck.addCardToPlayed(3);
  let playedCards = playerDeck.playCards();
  expect(playedCards.length).toBe(0);

  playerDeck.drawCards(1);
  playerDeck.addCardToPlayed(1);
  playedCards = playerDeck.playCards();
  expect(playedCards.length).toBe(0);
});

test("After using all cards in deck, cemetery should be shuffled and added to deck on next draw.", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);
  playerDeck.drawCards(24);
  playerDeck.addCardToPlayed(1);
  playerDeck.addCardToPlayed(2);
  playerDeck.addCardToPlayed(3);
  playerDeck.addCardToPlayed(4);
  playerDeck.addCardToPlayed(5);
  let playedCards = playerDeck.playCards();
  playerDeck.discardPlayedCards();
  expect(playedCards.length).toBe(5);
  expect(playerDeck.cards.length).toBe(0);
  expect(playerDeck.cemetery.length).toBe(5);

  playerDeck.drawCards(1);
  expect(playerDeck.cemetery.length).toBe(0);
  expect(playerDeck.cards.length).toBe(4);
});

test("Axie can only play a maximum of four cards", () => {
  let axies = [axiePlant, axieBeast, axieBird];
  playerDeck.initialize(axies);
  playerDeck.drawCards(24);
  let cardsToPlay = playerDeck.hand.filter(card=>card.owner === axiePlant.id).map(card=> card.gameId);
  for(let i=0; i<cardsToPlay.length;i++){
    playerDeck.addCardToPlayed(cardsToPlay[i].gameId);
  }
  let playedCards = playerDeck.playCards();
  playerDeck.discardPlayedCards();
  expect(playedCards.length).toBe(0);
  expect(playerDeck.hand.length).toBe(24);
  expect(playerDeck.cemetery.length).toBe(0);
});