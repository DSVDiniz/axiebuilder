import PlayerDeck from "./player-deck";
import { checkUniqueCount } from "./utils";
export default class Player {
  id = 0;
  energy = 0;
  axies = [];
  name = "";
  teamName = "";
  deck = new PlayerDeck();
  endedTurn = false;
  constructor() {}

  initialize(id, axies) {
    if (id == 0) return;
    this.id = id;
    this.energy = 0;
    this.axies = [];

    if (!this.hasThreeUnqiueAxies(axies)) return;
    if (!this.hasThreeAxiesInDifferentPositions(axies)) return;
    this.axies = axies;
    this.axies = this.axies.map((ax) => {
      ax.owner = this.id;
      return ax;
    });
    this.deck = new PlayerDeck();
    this.deck.initialize(axies);
  }

  hasThreeUnqiueAxies(axies) {
    return checkUniqueCount(axies, "id", 3);
  }

  hasThreeAxiesInDifferentPositions(axies) {
    return checkUniqueCount(axies, "position", 3);
  }

  setEnergy(energy) {
    if (energy <= 10 && energy >= 0) this.energy = energy;
  }
  addEnergy(energy) {
    this.setEnergy(this.energy + energy);
  }

  shuffleDeck() {
    this.deck.shuffleDeck();
  }

  isDead() {
    return this.axies.filter((axie) => axie.dead).length === 3;
  }

  addCardToPlayed(cardId) {
    let card = this.deck.getCardFromHand(cardId);
    if (card && this.canPlayCard(card.cost, this.energy)) {
      this.addEnergy(-card.cost);
      this.deck.addCardToPlayed(card.gameId);
    }
  }

  canPlayCard(cost, energy) {
    return energy - cost >= 0;
  }

  removeCardsFromPlayed(axieId) {
    let cards = this.deck.getCardsFromPlayed(axieId);
    if (cards) {
      for (let i = 0; i < cards.length; i++) {
        this.addEnergy(cards[i].cost);
        this.deck.removeCardFromPlayed(cards[i].gameId);
      }
    }
  }

  shouldDiscard() {
    return this.deck.shouldDiscard();
  }
  discardCards(ids) {
    this.deck.discardCards(ids);
  }
}
