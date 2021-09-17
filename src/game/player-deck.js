import { copyObj } from "./utils";
export default class PlayerDeck {
  cards = [];
  hand = [];
  cemetery = [];
  played = [];
  constructor() {}

  initialize(axies) {
    this.hand = [];
    this.cemetery = [];
    this.played = [];
    this.cards = this.axiesToCards(axies);
  }

  axiesToCards(axies) {
    let gameId = 1;
    let newCards = [];
    for (let i = 0; i < axies.length; i++) {
      let axie = axies[i];
      let cardList = Object.values(axie.cards);
      for (let j = 0; j < cardList.length; j++) {
        let card1 = this.setCardGameId(gameId, cardList[j]);
        newCards.push(card1);
        gameId++;
        let card2 = this.setCardGameId(gameId, cardList[j]);
        gameId++;
        newCards.push(card2);
      }
    }
    return newCards;
  }

  setCardGameId(gameId, card) {
    let newCard = copyObj(card);
    newCard.gameId = gameId;
    return newCard;
  }

  shuffleDeck() {
    this.cards = this.shuffleFisherYates(this.cards);
  }
  shouldDiscard() {
    return this.hand.length > 12 ? this.hand.length - 12 : 0;
  }
  drawCards(amount) {
    if (amount > this.cards.length) this.cemeteryToDeck();
    for (let i = 0; i < amount; i++) this.hand.push(this.cards.pop());
  }
  cemeteryToDeck() {
    this.cards = [...this.cemetery];
    this.cemetery = [];
    this.shuffleDeck();
  }
  addCardToPlayed(cardId){
    let newCard = this.hand.find(card=>card.gameId === cardId);
    if(newCard && !this.checkAxieFourCardLimit(newCard.owner)){
      this.played.push(newCard);
    }
  }
  removeCardFromPlayed(cardId){
    let cardIndex = this.played.findIndex(card=>card.gameId === cardId);
    if(cardIndex !== -1){
      this.played.splice(cardIndex,1);
    }
  }
  checkAxieFourCardLimit(ownerId){
    return this.played.filter(card=>card.owner === ownerId).length > 4;
  }
  playCards(){
    let remainingHand = this.getRemainingHand(this.played,this.hand);
    this.hand = [...remainingHand];
    return this.played;
  }
  getCardFromHand(cardId){
    return this.hand.find((card) => card.gameId === cardId);
  }
  getCardsFromPlayed(axieId){
    return this.played.filter((card) => card.owner === axieId);
  }
  discardPlayedCards() {
    this.cemetery = this.cemetery.concat(this.played);
    this.played = [];
  }
  getRemainingHand(cards, playerHand) {
    let remainingHand = [];
    for (let i = 0; i < playerHand.length; i++) {
      let card = playerHand[i];
      let found = false;
      for (let j = 0; j < cards.length; j++) {
        if (card.gameId === cards[j].gameId) {
          found = true;
        }
      }
      if (!found) remainingHand.push(card);
    }
    return remainingHand;
  }

  shuffleFisherYates(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }
}
