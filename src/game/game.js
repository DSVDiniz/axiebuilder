import { GameState } from "./data/data.js";
export default class Game {
  round = 0;
  player1 = null;
  player2 = null;
  finisheds = false;
  winner = null;
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
    this.decideTurnOrder();
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
  beginChoosingPhase() {
    this.gameState = GameState.BEGIN_CHOOSING_PHASE;
  }
  endChoosingPhase() {
    this.gameState = GameState.END_CHOOSING_PHASE;
  }
  startBattlePhase() {
    this.gameState = GameState.START_BATTLE_PHASE;
  }
  endBattlePhase() {
    this.gameState = GameState.END_BATTLE_PHASE;
  }
  endRound() {
    this.gameState = GameState.END_ROUND;
    this.round++;
  }

  decideTurnOrder() {
    this.turnOrder = [];
    let axies = this.player1.axies.concat(this.player2.axies);
    this.turnOrder = axies.sort((a, b) => this.compareFastest(a, b));
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
      this.winner = defeatedPlayers[0];
      this.finished = true;
    } else if (defeatedPlayers.length === 2) {
      this.winner = null;
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
  getPlayedCardsFromAxie(axieId, playerId) {
    if (this.player1.id === playerId) {
      return this.player1.deck.played.filter((card) => card.owner === axieId);
    } else {
      return this.player2.deck.played.filter((card) => card.owner === axieId);
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
}
