import Axie from "../../src/game/axie.js";
import {
  AxieBaseStats,
  AxiePartType,
  AxieTypeEnum,
  getPartsList,
  MarketplaceLink,
} from "../../src/game/data/data.js";

let axie;
let eyes;
let ears;
let back;
let horn;
let mouth;
let tail;
let correctParts;
let correctPartsAquatic;
let correctPartsBird;
let correctPartsPlant;
let correctPartsBeast;
let correctPartsReptile;
let allParts;
beforeEach(() => {
  axie = new Axie();
  allParts = getPartsList();
  eyes = allParts.find((part) => part.type == AxiePartType.EYES);
  ears = allParts.find((part) => part.type == AxiePartType.EARS);
  back = allParts.find((part) => part.type == AxiePartType.BACK);
  horn = allParts.find((part) => part.type == AxiePartType.HORN);
  mouth = allParts.find((part) => part.type == AxiePartType.MOUTH);
  tail = allParts.find((part) => part.type == AxiePartType.TAIL);
  correctParts = [eyes, ears, back, horn, mouth, tail];
  correctPartsBird = getAxieTypeParts(AxieTypeEnum.BIRD);
  correctPartsPlant = getAxieTypeParts(AxieTypeEnum.PLANT);
  correctPartsAquatic = getAxieTypeParts(AxieTypeEnum.AQUATIC);
  correctPartsBeast = getAxieTypeParts(AxieTypeEnum.BEAST);
  correctPartsReptile = getAxieTypeParts(AxieTypeEnum.REPTILE);
});

let getAxieTypeParts = (axieType) => {
  let parts = [];
  parts.push(allParts.find((part) => part.type == AxiePartType.EYES && part.axieType == axieType));
  parts.push(allParts.find((part) => part.type == AxiePartType.EARS && part.axieType == axieType));
  parts.push(allParts.find((part) => part.type == AxiePartType.BACK && part.axieType == axieType));
  parts.push(allParts.find((part) => part.type == AxiePartType.HORN && part.axieType == axieType));
  parts.push(allParts.find((part) => part.type == AxiePartType.MOUTH && part.axieType == axieType));
  parts.push(allParts.find((part) => part.type == AxiePartType.TAIL && part.axieType == axieType));
  return parts;
};

test("Axie should have a maximum of 6 parts.", () => {
  let parts = [];
  axie.setParts(parts);
  expect(Object.keys(axie.parts).length).toBe(parts.length);

  axie.setParts(correctParts);
  expect(Object.keys(axie.parts).length).toBe(correctParts.length);

  parts = [eyes, ears, back, horn, mouth, tail, tail];
  axie.setParts(parts);
  expect(Object.keys(axie.parts).length).not.toBe(parts.length);

  parts = [eyes, ears, back, horn, mouth];
  axie.setParts(parts);
  expect(Object.keys(axie.parts).length).toBe(parts.length);
});

test("Axie parts should all be different body parts.", () => {
  let parts = [eyes, eyes, eyes, eyes, eyes, eyes];
  axie.setParts(parts);
  expect(Object.keys(axie.parts).length).not.toBe(parts.length);
  parts = [eyes, ears, back, horn, mouth, tail];
  axie.setParts(parts);
  expect(Object.keys(axie.parts).length).toBe(parts.length);
});

test("Axie marketplace link should have a request parameter per part.", () => {
  axie.setParts([]);
  let link = axie.getMarketplaceLink().replace(MarketplaceLink, "");
  expect(link).toBe("");

  let parts = [eyes];
  axie.setParts(parts);
  link = axie
    .getMarketplaceLink()
    .replace(MarketplaceLink, "")
    .replace("axie?", "");
  let linkParts = link.replace("part=");
  expect(link.length).not.toBe(0);
  expect(linkParts.length).toBeGreaterThan(0);

  parts = [eyes, ears];
  axie.setParts(parts);
  link = axie
    .getMarketplaceLink()
    .replace(MarketplaceLink, "")
    .replace("axie?", "");
  linkParts = link.replace("&", "").split("part=");
  expect(link.length).not.toBe(0);
  expect(linkParts.length).toBe(parts.length + 1);

  parts = [eyes, ears, back];
  axie.setParts(parts);
  link = axie
    .getMarketplaceLink()
    .replace(MarketplaceLink, "")
    .replace("axie?", "");
  linkParts = link.replace("&", "").split("part=");
  expect(link.length).not.toBe(0);
  expect(linkParts.length).toBe(parts.length + 1);

  parts = [eyes, ears, back, horn];
  axie.setParts(parts);
  link = axie
    .getMarketplaceLink()
    .replace(MarketplaceLink, "")
    .replace("axie?", "");
  linkParts = link.replace("&", "").split("part=");
  expect(link.length).not.toBe(0);
  expect(linkParts.length).toBe(parts.length + 1);

  parts = [eyes, ears, back, horn, mouth];
  axie.setParts(parts);
  link = axie
    .getMarketplaceLink()
    .replace(MarketplaceLink, "")
    .replace("axie?", "");
  linkParts = link.replace("&", "").split("part=");
  expect(link.length).not.toBe(0);
  expect(linkParts.length).toBe(parts.length + 1);

  parts = [eyes, ears, back, horn, mouth, tail];
  axie.setParts(parts);
  link = axie
    .getMarketplaceLink()
    .replace(MarketplaceLink, "")
    .replace("axie?", "");
  linkParts = link.replace("&", "").split("part=");
  expect(link.length).not.toBe(0);
  expect(linkParts.length).toBe(parts.length + 1);
});

test("Part names should be parsed correctly.", () => {
  for (let i = 0; i < allParts.length; i++) {
    let parsedName = axie.parsePartName(allParts[i].name);
    let hasUppercase = /[A-Z]/.test(parsedName);
    let hasWhitespace = /[\w]/.test(parsedName);
    expect(hasUppercase && hasWhitespace).not.toBeTruthy();
    expect(parsedName.length > 0).toBeTruthy();
  }
});

test("Base stats should be correctly initialized based on axie type.", () => {
  let axieTypes = Object.values(AxieTypeEnum);
  for (let i = 0; i < axieTypes.length; i++) {
    axie.setType(axieTypes[i]);
    expect(axie.health).toBe(AxieBaseStats[axie.type].health);
    expect(axie.speed).toBe(AxieBaseStats[axie.type].speed);
    expect(axie.morale).toBe(AxieBaseStats[axie.type].morale);
    expect(axie.skill).toBe(AxieBaseStats[axie.type].skill);
  }
});

test("Axie stats should be correctly reset after calling resetstats.", () => {
  let axieTypes = Object.values(AxieTypeEnum);
  for (let i = 0; i < axieTypes.length; i++) {
    axie.setType(axieTypes[i]);
    axie.resetStats();
    expect(axie.health).toBe(0);
    expect(axie.speed).toBe(0);
    expect(axie.morale).toBe(0);
    expect(axie.skill).toBe(0);
  }
});

test("Morale bars should be correctly calculated.", () => {
  for (let i = 26; i < 61; i++) {
    axie.morale = i;
    expect(axie.getLastStandBars()).not.toBe(0);
    expect(axie.getLastStandBars()).not.toBe(4);
  }
});

test("Axie max health and current health should be initialized correctly.", () => {
  axie.initialize(AxieTypeEnum.AQUATIC, correctParts);
  expect(Object.values(axie.parts).length).toBe(6);

  axie.initialize(AxieTypeEnum.BIRD, correctPartsBird);
  expect(axie.getInGameHealth()).toBe(312);
  expect(axie.maxHealth).toBe(312);
  expect(axie.currentHealth).toBe(312);

  axie.initialize(AxieTypeEnum.PLANT, correctPartsPlant);
  expect(axie.getInGameHealth()).toBe(516);
  expect(axie.maxHealth).toBe(516);
  expect(axie.currentHealth).toBe(516);
});

test("Axie last stand bars should be initialized correctly.", () => {
  axie.initialize(AxieTypeEnum.AQUATIC, correctParts);
  expect(Object.values(axie.parts).length).toBe(6);

  axie.initialize(AxieTypeEnum.AQUATIC, correctPartsAquatic);
  expect(axie.getLastStandBars()).toBe(1);
  
  axie.initialize(AxieTypeEnum.REPTILE, correctPartsReptile);
  expect(axie.getLastStandBars()).toBe(2);

  axie.initialize(AxieTypeEnum.BEAST, correctPartsBeast);
  expect(axie.getLastStandBars()).toBe(3);
});

test("Axie should heal and lose health and shield correctly.", () => {
  axie.initialize(AxieTypeEnum.AQUATIC, correctPartsAquatic);
  axie.heal(100);
  expect(axie.currentHealth).toBe(axie.maxHealth);

  let damage = 100;
  let oldHP = axie.currentHealth;
  axie.hurt(damage);
  expect(axie.currentHealth).toBe(oldHP-damage);

  let newHeal = 30;
  axie.heal(newHeal);
  expect(axie.currentHealth).toBe(oldHP-damage+newHeal);

  let killingBlow = axie.currentHealth;
  axie.hurt(killingBlow);
  expect(axie.currentHealth).toBe(0);
  expect(axie.dead).toBeTruthy();

  axie.heal(newHeal);
  expect(axie.currentHealth).toBe(0);
  expect(axie.dead).toBeTruthy();

  axie.initialize(AxieTypeEnum.AQUATIC, correctPartsAquatic);
  let overkill = 999;
  axie.hurt(axie.currentHealth-1);
  axie.hurt(overkill);
  expect(axie.currentHealth).toBe(0);
  expect(axie.dead).toBeTruthy();

  axie.initialize(AxieTypeEnum.AQUATIC, correctPartsAquatic);
  oldHP = axie.currentHealth;
  axie.setShield(50);
  axie.hurt(axie.shield);
  expect(axie.currentHealth).toBe(oldHP);
  expect(axie.shield).toBe(0);

  oldHP = axie.currentHealth;
  axie.setShield(50);
  axie.hurt(axie.shield+50);
  expect(axie.currentHealth).toBe(oldHP-50);
  expect(axie.shield).toBe(0);

  axie.setShield(-50);
  expect(axie.shield).toBe(0);

  axie.setShield(999);
  expect(axie.shield).toBe(999);
});

test("Last stand should be triggered correctly.", () => {
  axie.initialize(AxieTypeEnum.AQUATIC, correctPartsAquatic);
  axie.hurt(axie.currentHealth+1);
  expect(axie.inLastStand).toBeTruthy();
  expect(axie.dead).not.toBeTruthy();

  axie.initialize(AxieTypeEnum.AQUATIC, correctPartsAquatic);
  axie.hurt(axie.currentHealth-1);
  expect(axie.inLastStand).not.toBeTruthy();
  expect(axie.dead).not.toBeTruthy();
});

test("Last stand bars should be removed correctly", () => {
  axie.initialize(AxieTypeEnum.AQUATIC, correctPartsAquatic);
  axie.hurt(axie.currentHealth+1);
  expect(axie.inLastStand).toBeTruthy();
  expect(axie.dead).not.toBeTruthy();
  expect(axie.currentLastStandBars).toBe(1);
  axie.hurtLastStand();
  expect(axie.currentLastStandBars).toBe(0);
  expect(axie.inLastStand).toBeFalsy();
  expect(axie.dead).toBeTruthy();

  axie.initialize(AxieTypeEnum.REPTILE, correctPartsReptile);
  axie.hurt(axie.currentHealth+1);
  expect(axie.inLastStand).toBeTruthy();
  expect(axie.dead).not.toBeTruthy();
  expect(axie.currentLastStandBars).toBe(2);
  axie.hurtLastStand();
  expect(axie.currentLastStandBars).toBe(1);
  expect(axie.inLastStand).not.toBeFalsy();
  expect(axie.dead).not.toBeTruthy();
  axie.hurtLastStand();
  expect(axie.currentLastStandBars).toBe(0);
  expect(axie.inLastStand).toBeFalsy();
  expect(axie.dead).toBeTruthy();


  axie.initialize(AxieTypeEnum.BEAST, correctPartsBeast);
  axie.hurt(axie.currentHealth+1);
  expect(axie.inLastStand).toBeTruthy();
  expect(axie.dead).not.toBeTruthy();
  expect(axie.currentLastStandBars).toBe(3);
  axie.hurtLastStand();
  expect(axie.currentLastStandBars).toBe(2);
  expect(axie.inLastStand).not.toBeFalsy();
  expect(axie.dead).not.toBeTruthy();
  axie.hurtLastStand();
  expect(axie.currentLastStandBars).toBe(1);
  expect(axie.inLastStand).not.toBeFalsy();
  expect(axie.dead).not.toBeTruthy();
  axie.hurtLastStand();
  expect(axie.currentLastStandBars).toBe(0);
  expect(axie.inLastStand).toBeFalsy();
  expect(axie.dead).toBeTruthy();
});
