import {
  AxiePartType,
  getCardsList,
  getPartsList,
} from "../../src/game/data/data.js";

let parts;
let cards;
beforeEach(() => {
  parts = getPartsList();
  cards = getCardsList();
});

test("Parts data should be valid", () => {
  for (let part of parts) {
    let hasId = part.id != null;
    let hasType = part.type != null;
    let hasAxieType = part.axieType != null;
    let hasName = part.name != null;
    let hasCard = true;
    if (part.type !== AxiePartType.EARS && part.type !== AxiePartType.EYES) {
      hasCard = part.card != null;
    }
    expect(hasId && hasType && hasAxieType && hasName && hasCard).toBeTruthy();
  }
});

test("Card data should be valid", () => {
  for (let card of cards) {
    let hasId = card.id != null;
    let hasParts = card.parts != null;
    let hasAttackType = card.attackType != null;
    let hasAxieType = card.axieType != null;
    let hasName = card.name != null;
    let hasCost = card.cost != null;
    let hasDmg = card.dmg != null;
    let hasShield = card.shield != null;
    let hasDescription = card.description != null;
    let hasImage = card.image != null;
    let isCorrect =
      hasId &&
      hasParts &&
      hasAttackType &&
      hasAxieType &&
      hasName &&
      hasCost &&
      hasDmg &&
      hasShield &&
      hasDescription &&
      hasImage;
    if (isCorrect === false) {
      console.log(card);
    }
    expect(isCorrect).toBeTruthy();
  }
});
