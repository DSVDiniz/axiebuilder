import { AxiePosition, GameState,AxieBaseStats } from "./data/data.js";
export default class Game {
  round = 0;
  player1 = null;
  player2 = null;
  finished = false;
  winners = null;
  gameState = null;
  turnOrder = [];
  constructor() {}
  initialize(player1, player2) {
    if (!player1 || !player2) return;
    this.player1 = player1;
    this.player2 = player2;
    this.round = 1;
  }
  beginRound() {
    this.gameState = GameState.ROUND_START;
    if (this.decideWinner()) return false;
    this.turnOrder = this.decideTurnOrder(
      this.player1.axies,
      this.player2.axies
    );
    if (this.round === 1) {
      this.setPlayersEnergy(3);
      this.shufflePlayersDecks();
      this.givePlayersCardsFromDeck(6);
    } else {
      this.addPlayersEnergy(2);
      this.givePlayersCardsFromDeck(3);
    }
    return true;
  }
  beginDiscardPhase() {
    this.gameState = GameState.BEGIN_DISCARD_PHASE;
    let p1ShouldDiscard = this.player1.shouldDiscard();
    let p2ShouldDiscard = this.player2.shouldDiscard();
    if (p1ShouldDiscard || p2ShouldDiscard) {
      return [p1ShouldDiscard, p2ShouldDiscard];
    } else {
      return [];
    }
  }
  endDiscardPhase() {
    this.gameState = GameState.END_DISCARD_PHASE;
    this.beginChoosingPhase();
  }
  beginChoosingPhase() {
    this.gameState = GameState.BEGIN_CHOOSING_PHASE;
  }
  endChoosingPhase() {
    this.gameState = GameState.END_CHOOSING_PHASE;
    return this.startBattlePhase();
  }
  startBattlePhase() {
    this.gameState = GameState.START_BATTLE_PHASE;
    let axiesInOrder = this.decideTurnOrder(
      this.player1.axies,
      this.player2.axies
    );
    this.applyPreEffects(); //nitro leap
    for (let i = 0; i < axiesInOrder.length; i++) {
      let attacker = axiesInOrder[i];
      let cards = this.getAttackerCards(attacker);
      for (let j = 0; j < cards.length; j++) {
        
        let effects = this.applyCardPreEffecs(cards[i]);

        let defender = this.chooseTarget(effects, attacker);
        this.inflictDamage(attacker, defender, cards[i]);

        this.applyCardPostEffects(cards[i]);
      }
    }
    this.applyPostEffects(axiesInOrder);
    return this.endBattlePhase();
  }

  getAttackerCards(attacker) {
    return this.getPlayedCards(attacker.owner).filter(
      (card) => (card.owner = attacker.id)
    );
  }

  applyPreEffects() {}
  applyCardPreEffecs() {}
  chooseTarget(effects, attacker) {
    let defenders = this.getDefenders(attacker.owner);
    if (effects && effects.length > 0) {
      //change target effect
    } else {
      this.getTargetDependingOnAttackerPosition(attacker.position, defenders);
    }
  }

  getDefenders(ownerId) {
    if (ownerId === this.player1.id) {
      return this.player2.axies;
    } else {
      return this.player1.axies;
    }
  }
  getTargetDependingOnAttackerPosition(attackerPosition, defenders) {
    if (this.isInCenterRow(attackerPosition)) {
      return this.getCenterAttackerTarget(defenders);
    } else {
      return this.getTopOrBottomAttackerTarget(attackerPosition, defenders);
    }
  }
  getCenterAttackerTarget(defenders) {
    let attackOrder = [
      AxiePosition.RIGHT,
      AxiePosition.CENTER,
      AxiePosition.LEFT,
    ];
    let rightUpDownAmount = defenders.filter(
      (axie) =>
        axie.position === AxiePosition.UP_RIGHT ||
        (axie.position === AxiePosition.DOWN_RIGHT && !axie.dead)
    );
    let leftUpDownAmount = defenders.filter(
      (axie) =>
        axie.position === AxiePosition.UP_LEFT ||
        (axie.position === AxiePosition.DOWN_LEFT && !axie.dead)
    );
    for (let j = 0; j < attackOrder.length; j++) {
      for (let i = 0; i < defenders.length; i++) {
        if (defenders[i].dead) continue;
        if (defenders[i].position === attackOrder[j]) {
          return defenders[i];
        } else if (rightUpDownAmount.length > 0) {
          this.chooseTargetRandomly(rightUpDownAmount);
        } else if (leftUpDownAmount.length > 0) {
          this.chooseTargetRandomly(leftUpDownAmount);
        }
      }
    }
  }
  getTopOrBottomAttackerTarget(attackerPosition, defenders) {
    let attackOrder = [];
    if (this.isInTopRow(attackerPosition)) {
      attackOrder = [
        AxiePosition.RIGHT,
        AxiePosition.UP_RIGHT,
        AxiePosition.DOWN_RIGHT,
        AxiePosition.CENTER,
        AxiePosition.UP_LEFT,
        AxiePosition.DOWN_LEFT,
        AxiePosition.LEFT,
      ];
    } else if (this.isInBottomRow(attackerPosition)) {
      attackOrder = [
        AxiePosition.RIGHT,
        AxiePosition.DOWN_RIGHT,
        AxiePosition.UP_RIGHT,
        AxiePosition.CENTER,
        AxiePosition.DOWN_LEFT,
        AxiePosition.UP_LEFT,
        AxiePosition.LEFT,
      ];
    }
    for (let j = 0; j < attackOrder.length; j++) {
      for (let i = 0; i < defenders.length; i++) {
        if (defenders[i].dead) continue;
        if (attackOrder[j] === defenders[i].position) return defenders[i];
      }
    }
    return null;
  }
  chooseTargetRandomly(axies) {
    if (axies.length === 1) {
      return axies[0];
    } else {
      return Math.random() > 0.5 ? axies[0] : axies[1];
    }
  }
  isInCenterRow(position) {
    return (
      position === AxiePosition.CENTER ||
      position === AxiePosition.LEFT ||
      position === AxiePosition.RIGHT
    );
  }
  isInBottomRow(position) {
    return (
      position === AxiePosition.DOWN_LEFT ||
      position === AxiePosition.DOWN_RIGHT
    );
  }
  isInTopRow(position) {
    return (
      position === AxiePosition.UP_LEFT || position === AxiePosition.UP_RIGHT
    );
  }

  inflictDamage(attacker, defender, card) {
    let damage = this.calculateDamageBonuses(
      attacker.type,
      defender.type,
      card
    );
    console.log(defender.currentHealth);
    defender.hurt(damage);
    console.log(defender.currentHealth);
  }

  calculateDamageBonuses(attackerType, defenderType, card) {
    let axieTypeBonus = attackerType === card.axieType ? 1.1 : 1.0;
    let cardTypeBonus = 1.0;
    let rpsTypeBonus = this.getRpsTypeBonus(attackerType, defenderType);
    return axieTypeBonus * cardTypeBonus * rpsTypeBonus * card.dmg;
  }
  calculateDamageBonusesWithChain(attackerType, attackerSkill, defenderType, card) {
    let axieTypeBonus = attackerType === card.axieType ? 1.1 : 1.0;
    let cardTypeBonus = 1.0;
    let rpsTypeBonus = this.getRpsTypeBonus(attackerType, defenderType);
    let auxDamage = axieTypeBonus * cardTypeBonus * rpsTypeBonus * card.dmg;
    return (auxDamage * attackerSkill) / 500 + auxDamage;
  }

  getRpsTypeBonus(attackerType, defenderType) {
    let hasAdvantage =
      AxieBaseStats[attackerType].adv.find(defenderType) != null;
    let hasDisadvantage =
      AxieBaseStats[attackerType].disadv.find(defenderType) != null;
    return hasAdvantage ? 1.15 : hasDisadvantage ? 0.85 : 1.0;
  }

  applyCardPostEffects() {}

  applyPostEffects(axies) {
    if (this.round >= 10) {
      this.inflictBloodMoonDamage(axies, this.round);
    }
  }

  inflictBloodMoonDamage(axies, round) {
    let bloodmoonDMG = 30 * (round - 10) + 50;
    for (let i = 0; i < axies.length; i++) {
      axies[i].inflictBloodMoonDamage(bloodmoonDMG, true);
    }
  }
  endBattlePhase() {
    this.gameState = GameState.END_BATTLE_PHASE;
    return this.endRound();
  }
  endRound() {
    this.gameState = GameState.END_ROUND;
    this.round++;
    return this.beginRound();
  }

  decideTurnOrder(p1Axies, p2Axies) {
    let axies = p1Axies.concat(p2Axies);
    return axies
      .sort((a, b) => this.compareFastest(a, b))
      .filter((axie) => !axie.dead);
  }

  compareFastest(axie1, axie2) {
    // Highest Speed attacks first
    // Lowest HP attacks first
    // Highest Skill attacks first
    // Highest Morale attacks first
    // else random
    let speed = this.compareValue("speed", axie1, axie2);
    if (speed != null) return speed;
    let health = this.compareValue("currentHealth", axie1, axie2);
    if (health != null) return health;
    let skill = this.compareValue("skill", axie1, axie2);
    if (skill != null) return skill;
    let morale = this.compareValue("morale", axie1, axie2);
    if (morale != null) return morale;
    let random = Math.random();
    if (random > 0.5) return -1;
    else return 1;
  }

  compareValue(valueKey, axie1, axie2) {
    if (axie1[valueKey] < axie2[valueKey]) {
      return 1;
    } else if (axie1[valueKey] > axie2[valueKey]) {
      return -1;
    } else {
      return 0;
    }
  }

  decideWinner() {
    let defeatedPlayers = this.getDefeatedPlayers();
    if (defeatedPlayers.length === 0) {
      return false;
    } else if (defeatedPlayers.length === 1) {
      this.winners = defeatedPlayers[0];
      this.finished = true;
    } else if (defeatedPlayers.length === 2) {
      this.winners = null;
      this.finished = true;
    }
    return true;
  }

  getDefeatedPlayers() {
    let defeatedPlayers = [];
    if (this.player1.isDead()) defeatedPlayers.push(this.player1);
    if (this.player2.isDead()) defeatedPlayers.push(this.player2);
    return defeatedPlayers;
  }

  addPlayersEnergy(energy) {
    this.player1.addEnergy(energy);
    this.player2.addEnergy(energy);
  }
  setPlayersEnergy(energy) {
    this.player1.setEnergy(energy);
    this.player2.setEnergy(energy);
  }
  shufflePlayersDecks() {
    this.player1.deck.shuffleDeck();
    this.player2.deck.shuffleDeck();
  }
  givePlayersCardsFromDeck(amount) {
    this.player1.deck.drawCards(amount);
    this.player2.deck.drawCards(amount);
  }
  getPlayedCards(playerId) {
    if (this.player1.id === playerId) {
      console.log(this.player1.deck.played);
      return this.player1.deck.played;
    } else {
      return this.player2.deck.played;
    }
  }
  chooseCard(playerId, cardId) {
    if (this.gameState !== GameState.BEGIN_CHOOSING_PHASE) return;
    if (this.player1.id === playerId) {
      this.player1.addCardToPlayed(cardId);
    } else {
      this.player2.addCardToPlayed(cardId);
    }
  }
  removeCardsFromPlayed(playerId, axieId) {
    if (this.gameState !== GameState.BEGIN_CHOOSING_PHASE) return;
    if (this.player1.id === playerId) {
      this.player1.removeCardsFromPlayed(axieId);
    } else {
      this.player2.removeCardsFromPlayed(axieId);
    }
  }
  discardCardsP1(ids) {
    this.player1.discardCards(ids);
  }
  discardCardsP2(ids) {
    this.player2.discardCards(ids);
  }
  getCardsInHandP1() {
    let playedCards = this.player1.deck.played;
    let hand = this.player1.deck.hand;
    let cardsInHand = this.getHandsMinusPlayed(playedCards, hand);
    return Object.values(cardsInHand);
  }
  getCardsInHandP2() {
    let playedCards = this.player2.deck.played;
    let hand = this.player2.deck.hand;
    let cardsInHand = this.getHandsMinusPlayed(playedCards, hand);
    return Object.values(cardsInHand);
  }
  getCardsInHandDividedByAxiesP1() {
    let playedCards = this.player1.deck.played;
    let hand = this.player1.deck.hand;
    let cardsInHand = this.getHandsMinusPlayedDividedByAxies(playedCards, hand);
    return Object.values(cardsInHand);
  }
  getCardsInHandDividedByAxiesP2() {
    let playedCards = this.player2.deck.played;
    let hand = this.player2.deck.hand;
    let cardsInHand = this.getHandsMinusPlayedDividedByAxies(playedCards, hand);
    return Object.values(cardsInHand);
  }
  getHandsMinusPlayed(playedCards, hand) {
    let playedMap = {};
    let handMap = {};
    hand.forEach((card) => (handMap[card.gameId] = card));
    playedCards.forEach((card) => (playedMap[card.gameId] = card));
    let handMinusPlayed = [];
    for (let i = 0; i < hand.length; i++) {
      if (!playedMap[hand[i].gameId]) {
        handMinusPlayed.push(hand[i]);
      }
    }
    return handMinusPlayed;
  }
  getHandsMinusPlayedDividedByAxies(playedCards, hand) {
    let handMinusPlayed = this.getHandsMinusPlayed(playedCards,hand);
    let mapAxies = {};
    for (let i = 0; i < handMinusPlayed.length; i++) {
      let key = handMinusPlayed[i].owner;
      if (!mapAxies[key]) mapAxies[key] = [];
      mapAxies[key].push(handMinusPlayed[i]);
    }
    return mapAxies;
  }
}
