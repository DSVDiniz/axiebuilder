import {
  AxiePosition,
  AxieBaseStats,
  AxiePartBaseStats,
  AxieTypeEnum,
  AxiePartType,
  MarketplaceLink,
  Cards,
} from "./data/data";
export default class AxieClass {
  id = 0;
  name = "";
  type = AxieTypeEnum.AQUATIC;
  dead = false;
  maxHealth = 0;
  currentHealth = 0;
  shield = 0;

  inLastStand = false;
  maxLastStandBars = 0;
  currentLastStandBars = 0;

  statusEffects = [];
  health = 0;
  speed = 0;
  morale = 0;
  skill = 0;
  position = AxiePosition.CENTER;
  cards = {};
  parts = {};
  owner = null;
  constructor() {}
  initialize(id, position, type, parts) {
    if (id === 0) return;
    this.id = id;
    this.position = position;
    this.setType(type);
    this.setParts(parts);
    this.maxHealth = this.getInGameHealth();
    this.currentHealth = this.maxHealth;
    this.maxLastStandBars = this.getLastStandBars();
    this.currentLastStandBars = this.maxLastStandBars;
    this.dead = false;
    this.inLastStand = false;
    this.shield = 0;
  }
  getInGameHealth() {
    return this.health * 6 + 150;
  }
  getLastStandBars() {
    // 0= 24
    // 1= 27, 30? 32?
    // 2= 33,34,35,36,37,39 40,41,43,44 47
    // 3= 49,56,59,61
    if (this.morale <= 24) return 0;
    if (this.morale <= 33) return 1;
    if (this.morale <= 47) return 2;
    return 3;
  }
  heal(heal) {
    if (this.inLastStand || this.dead) {
      return;
    } else {
      let newHP = this.currentHealth + heal;
      this.setCurrentHealth(newHP);
    }
  }
  hurt(dmg) {
    let postShieldDMG = this.shield - dmg;
    this.setShield(postShieldDMG);
    let newHP = this.currentHealth + (postShieldDMG < 0 ? postShieldDMG : 0);

    let lastStand = false;
    if (newHP < 0) lastStand = this.enterLastStand(postShieldDMG);
    this.setCurrentHealth(newHP);
    if (this.currentHealth <= 0) {
      if (lastStand) {
        this.inLastStand = true;
      } else {
        this.die();
      }
    }
  }
  inflictBloodMoonDamage(dmg) {
    let newHP = this.currentHealth - dmg;
    this.setCurrentHealth(newHP);
    if (this.currentHealth <= 0) {
      this.die();
    }
  }
  setShield(amount) {
    if (amount < 0) this.shield = 0;
    else this.shield = amount;
  }
  setCurrentHealth(amount) {
    if (amount >= this.maxHealth) this.currentHealth = this.maxHealth;
    else if (amount < 0) this.currentHealth = 0;
    else this.currentHealth = amount;
  }
  hurtLastStand() {
    this.currentLastStandBars--;
    if (this.currentLastStandBars <= 0) {
      this.die();
    }
  }
  die() {
    this.shield = 0;
    this.currentHealth = 0;
    this.currentLastStandBars = 0;
    this.dead = true;
    this.inLastStand = false;
  }
  enterLastStand(dmg) {
    return -dmg - this.currentHealth < (this.currentHealth * this.morale) / 100;
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
    let currentParts = Object.values(this.parts);
    for (let part of currentParts) {
      this.parts[part.type] = part;
      let stats = AxiePartBaseStats[part.axieType];
      this.addStats(stats);
    }
  }
  setParts(partsList) {
    this.parts = {};
    for (let part of partsList) {
      this.parts[part.type] = part;
      let stats = AxiePartBaseStats[part.axieType];
      this.addStats(stats);
      if (part.card != null) {
        this.cards[part.card] = Cards[part.card];
        this.cards[part.card].owner = this.id;
      }
    }
  }
  getMarketplaceLink() {
    let link = MarketplaceLink;
    let first = true;
    if (Object.values(this.parts).length > 0) link += "axie?";
    for (let part of Object.values(this.parts)) {
      let typeName = Object.keys(AxiePartType)[part.type].toLowerCase();
      let partName = this.parsePartName(part.name);
      if (first) {
        link += `part=${typeName}-${partName}`;
        first = false;
      } else {
        link += `&part=${typeName}-${partName}`;
      }
    }
    return link;
  }
  parsePartName(partName) {
    return partName.toLowerCase().replace(/ /g, "-");
  }
  isValid() {
    return (
      this.id >= 0 &&
      this.type >= AxieTypeEnum.AQUATIC &&
      this.type <= AxieTypeEnum.REPTILE &&
      this.maxHealth >= 0 &&
      this.currentHealth >= 0 &&
      this.shield >= 0 &&
      this.maxLastStandBars >= 0 &&
      this.currentLastStandBars >= 0 &&
      this.health >= 0 &&
      this.speed >= 0 &&
      this.morale >= 0 &&
      this.skill >= 0 &&
      this.position >= AxiePosition.UP_LEFT &&
      this.position <= AxiePosition.DOWN_RIGHT &&
      Object.values(this.cards).length === 4 &&
      Object.values(this.parts).length === 6
    );
  }
}
