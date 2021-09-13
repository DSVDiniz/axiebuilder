export default class Game {
  round = 0;
  player1 = null;
  player2 = null;
  finished = false;
  winner = null;
  constructor() {}
  initialize(player1, player2) {
    if (!player1 || !player2) return;
    this.player1 = player1;
    this.player2 = player2;
    this.round = 1;
  }
  beginRound() {
    if (this.decideWinner()) return false;
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
  beginChoosingPhase() {}
  endChoosingPhase() {}
  startBattlePhase() {}
  endBattlePhase() {}
  endRound() {
    this.round++;
  }

  decideTurnOrder() {
    // Highest Speed attacks first
    // Lowest HP attacks first
    // Highest Skill attacks first
    // Highest Morale attacks first
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
    if (this.player1.isDead())
      defeatedPlayers.push(this.player1);
    if (this.player2.isDead())
      defeatedPlayers.push(this.player2);
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

  getTurnOrder(){
    return [this.player1.axies[0],this.player2.axies[0],this.player1.axies[1],this.player2.axies[1],this.player1.axies[2],this.player1.axies[2]];
  }
}
