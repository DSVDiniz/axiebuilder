import { CardAttackType, AxieTypeEnum } from "./data/data";
export default class Card {
  gameId = 0;
  id = 0;
  parts = [];
  attackType = CardAttackType.RANGED;
  axieType = AxieTypeEnum.AQUATIC;
  name = "Card Name";
  cost = 0;
  dmg = 120;
  shield = 60;
  description = "Card description";
  image = "";
  owner = null;
  constructor(card) {
    this.id = card.id;
    this.parts = card.parts;
    this.attackType = card.attackType;
    this.axieType = card.axieType;
    this.name = card.name;
    this.cost = card.cost;
    this.dmg = card.dmg;
    this.shield = card.shield;
    this.description = card.description;
    this.image = card.image;
  }
}
