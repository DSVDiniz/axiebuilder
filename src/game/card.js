import { CardAttackType, AxieTypeEnum } from "./data/data";
export default class Card {
  id = 0;
  parts = [];
  attackType = CardAttackType.RANGED;
  element = AxieTypeEnum.AQUATIC;
  name = "Card Name";
  cost = 0;
  dmg = 120;
  shield = 60;
  description = "Card description";
  image = "";
  owner = {};
  constructor(card) {
    this.id = card.id;
    this.parts = card.parts;
    this.attackType = card.attackType;
    this.element = card.element;
    this.name = card.name;
    this.cost = card.cost;
    this.dmg = card.dmg;
    this.shield = card.shield;
    this.description = card.description;
    this.image = card.image;
  }
  isAquatic() {
    return this.element === AxieTypeEnum.AQUATIC;
  }
  isBeast() {
    return this.element === AxieTypeEnum.BEAST;
  }
  isBug() {
    return this.element === AxieTypeEnum.BUG;
  }
  isBird() {
    return this.element === AxieTypeEnum.BIRD;
  }
  isPlant() {
    return this.element === AxieTypeEnum.PLANT;
  }
  isReptile() {
    return this.element === AxieTypeEnum.REPTILE;
  }
  isMech() {
    return this.element === AxieTypeEnum.MECH;
  }
  isDawn() {
    return this.element === AxieTypeEnum.DAWN;
  }
  isDusk() {
    return this.element === AxieTypeEnum.DUSK;
  }
}
