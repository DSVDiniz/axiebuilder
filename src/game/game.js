import Player from "./player.js";
export default class Game {
  round = 0;
  player1 = new Player();
  player2 = new Player();

  start() {
    if (!this.player1 || !this.player2) return;
    this.initializePlayers();
  }
  initializePlayersEnergy() {
    this.player1.initialize();
    this.player2.initialize();
  }
  decideTurnOrder(){
    // Highest Speed attacks first
    // Lowest HP attacks first
    // Highest Skill attacks first
    // Highest Morale attacks first
  }
}
