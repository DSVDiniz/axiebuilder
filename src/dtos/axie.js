import {
  AxiePosition,
  AxieBaseStats,
  AxiePartBaseStats,
  AxieTypeEnum,
  AxiePartType,
} from "./data/data";
export default class AxieClass {
  id = 0;
  type = AxieTypeEnum.AQUATIC;
  health = 0;
  speed = 0;
  morale = 0;
  skill = 0;
  position = AxiePosition.CENTER;
  cards = {};
  parts = {};
  marketplaceLink="https://marketplace.axieinfinity.com/axie?";
  constructor(id) {
    this.setType(this.type);
    this.id = id;
  }
  getInGameHealth() {
    return this.health * 6 + 150;
  }
  getLastStandBars(){
    if(this.morale <= 37)
      return 1;
    else if(this.morale > 37 && this.morale <=47)
      return 2
    else 
    return 3;
  }
  getRpsBonus(opponentType){
    if(opponentType === this.type)
      return 1;
    if(this.getRPSAdvantage().includes(opponentType))
      return 1.15;
    else
      return 0.85;
  }
  getRPSAdvantage(){
    return AxieBaseStats[this.type].adv;
  }
  getRPSDisadvantage(){
    return AxieBaseStats[this.type].disadv;
  }
  setPosition(position) {
    this.position = position;
  }
  resetStats() {
    this.health = 0;
    this.speed = 0;
    this.morale = 0;
    this.skill = 0;
  }
  addStats(stats) {
    this.health += stats.health;
    this.speed += stats.speed;
    this.morale += stats.morale;
    this.skill += stats.skill;
  }
  setType(type) {
    this.type = type;
    let attributes = AxieBaseStats[type];
    this.resetStats();
    this.addStats(attributes);
  }
  setParts(parts) {
    this.parts = {};
    for(let part of parts){
      this.parts[part.part] = part;
    }
    this.addPartsAndCardsStats();
    this.setMarketplaceLink();
  }
  setCards(cards) {
    this.cards = {};
    for(let card of cards){
      this.cards[card.parts[0].part] = card;
      this.parts[card.parts[0].part] = card.parts[0];
    }
    this.addPartsAndCardsStats();
    this.setMarketplaceLink();
  }
  addPartsAndCardsStats() {
    this.setType(this.type);
    for (let card of Object.values(this.cards)) {
      let partElementType = card.parts[0].type;
      let stats = AxiePartBaseStats[partElementType];
      this.addStats(stats);
    }
    for (let part of Object.values(this.parts)) {
      let partElementType = part.type;
      let stats = AxiePartBaseStats[partElementType];
      this.addStats(stats);
    }
  }
  setMarketplaceLink() {
    this.marketplaceLink = "https://marketplace.axieinfinity.com/axie?";
    let first = true;
    for (let part of Object.values(this.parts)) {
      let typeName = Object.keys(AxiePartType)[part.part].toLocaleLowerCase();
      let partName = this.parsePartName(part.name);
      if (first) {
        this.marketplaceLink += `part=${typeName}-${partName}`;
        first = false;
      } else {
        this.marketplaceLink += `&part=${typeName}-${partName}`;
      }
    }
  }
  parsePartName(partName) {
    return partName.toLocaleLowerCase().replaceAll(" ", "-");
  }
  isAquatic() {
    return this.type === AxieTypeEnum.AQUATIC;
  }
  isBeast() {
    return this.type === AxieTypeEnum.BEAST;
  }
  isBug() {
    return this.type === AxieTypeEnum.BUG;
  }
  isBird() {
    return this.type === AxieTypeEnum.BIRD;
  }
  isPlant() {
    return this.type === AxieTypeEnum.PLANT;
  }
  isReptile() {
    return this.type === AxieTypeEnum.REPTILE;
  }
  isMech() {
    return this.type === AxieTypeEnum.MECH;
  }
  isDawn() {
    return this.type === AxieTypeEnum.DAWN;
  }
  isDusk() {
    return this.type === AxieTypeEnum.DUSK;
  }
}
