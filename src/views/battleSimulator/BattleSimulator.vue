<template>
  <v-container>
    <div class="end-turn-button" @click="endChoosingPhase()">End Turn</div>
    <div class="grid-container">
      <div class="header">
        <div class="header-grid-container">
          <v-row class="turn-order">
            <v-col class="round-header"> Round {{ game.round }} </v-col>
            <v-col v-for="(axie, index1) in game.turnOrder" :key="index1">
              <div
                v-if="axie.owner === 1"
                class="turn-order-div-p1"
                @click="removeCardsFromPlayedP1(axie.id)"
              >
                <AxieTypeIcon :axieType="axie.type" />
                <div class="attacking-cards">
                  <div
                    v-for="(card, index2) in game.getPlayedCardsFromAxie(
                      axie.id,
                      axie.owner
                    )"
                    :key="'p1hand' + index2"
                  >
                    <AxieCardExtraSmall :card="card" />
                  </div>
                </div>
              </div>
              <div
                v-else
                class="turn-order-div-p2"
                @click="removeCardsFromPlayedP2(axie.id)"
              >
                <AxieTypeIcon :axieType="axie.type" />
                <div class="attacking-cards">
                  <div
                    v-for="(card, index2) in game.getPlayedCardsFromAxie(
                      axie.id,
                      axie.owner
                    )"
                    :key="'p2hand' + index2"
                  >
                    <AxieCardExtraSmall :card="card" />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="center">
        <div class="center-grid-container">
          <div class="p1">
            <div
              v-for="(axie, index) in game.player1.axies"
              :key="'p1axie' + index"
              :class="getAxiePositionCssClass(axie.position, false)"
            >
              <div class="stats-font">
                {{ axie.currentHealth }}/{{ axie.maxHealth }}
              </div>
              <div class="stats-font" v-if="axie.shield > 0">
                {{ axie.shield }}
              </div>
              <AxieTypeIcon :axieType="axie.type" />
            </div>
          </div>
          <div class="p2 stats-font">
            <div
              v-for="(axie, index) in game.player2.axies"
              :key="'p2axie' + index"
              :class="getAxiePositionCssClass(axie.position, true)"
            >
              <div class="stats-font">
                {{ axie.currentHealth }}/{{ axie.maxHealth }}
              </div>
              <div class="stats-font" v-if="axie.shield > 0">
                {{ axie.shield }}
              </div>
              <AxieTypeIcon :axieType="axie.type" />
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-grid-container">
          <div class="p1-stats">
            <div>
              <span class="small-title">Energy</span
              >{{ game.player1.energy }}/10
            </div>
            <div>
              <span class="small-title">Hand</span
              >{{ game.player1.deck.hand.length }}
            </div>
            <div>
              <span class="small-title">Deck</span
              >{{ game.player1.deck.cards.length }}
            </div>
            <div>
              <span class="small-title">Cemetery</span
              >{{ game.player1.deck.cemetery.length }}
            </div>
          </div>
          <div class="cards">
            <v-row class="ml-5 mr-5 mb-5 p1-cards-background">
              <div
                class="axie-cards"
                v-for="(axie, index) in getCardsInHandP1()"
                :key="'p1cardaxie' + index"
              >
                <AxieCardSmall
                  :card="card"
                  v-for="(card, index) in axie"
                  :key="'p1card' + index"
                  @click.native="chooseCardP1(card.gameId)"
                />
              </div>
            </v-row>
            <v-row class="ml-5 mr-5 p2-cards-background">
              <div
                class="axie-cards"
                v-for="(axie, index) in getCardsInHandP2()"
                :key="'p2cardaxie' + index"
              >
                <AxieCardSmall
                  :card="card"
                  v-for="(card, index) in axie"
                  :key="'p2card' + index"
                  @click.native="chooseCardP2(card.gameId)"
                />
              </div>
            </v-row>
          </div>
          <div class="p2-stats">
            <div>
              <span class="small-title">Energy</span
              >{{ game.player2.energy }}/10
            </div>
            <div>
              <span class="small-title">Hand</span
              >{{ game.player2.deck.hand.length }}
            </div>
            <div>
              <span class="small-title">Deck</span
              >{{ game.player2.deck.cards.length }}
            </div>
            <div>
              <span class="small-title">Cemetery</span
              >{{ game.player2.deck.cemetery.length }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <DiscardDialog :open="discardDialog" :discardInfo="discardInfo" v-on:close="closeDiscardDialog" />
  </v-container>
</template>
<style scoped>
.axie-cards {
  display: flex;
  margin-right: 10px;
}
.attacking-cards {
  display: flex;
}
.end-turn-button {
  position: absolute;
  width: 200px;
  height: 50px;
  background-color: white;
  z-index: 10;
  border: 5px black solid;
  top: 58%;
  left: 44.5%;
}
.p1-cards-background {
  background-color: #cddae6;
  min-height: 138px;
}
.p2-cards-background {
  background-color: #e6cdd1;
  min-height: 138px;
}

.stats-font {
  font-size: 20px !important;
}
.small-title {
  font-size: 10px;
  display: block;
}
.turn-order-div-p1 {
  background-color: blue;
}
.turn-order-div-p2 {
  background-color: red;
}

.LEFT {
  position: absolute;
  top: 41%;
  left: 16%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.DOWN_LEFT {
  position: absolute;
  top: 63%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.DOWN_RIGHT {
  position: absolute;
  top: 63%;
  left: 58%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.RIGHT {
  position: absolute;
  top: 41%;
  left: 72%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.UP_RIGHT {
  position: absolute;
  left: 58%;
  top: 19%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.UP_LEFT {
  position: absolute;
  top: 19%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.CENTER {
  position: absolute;
  top: 41%;
  left: 44%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.CENTER_M {
  position: absolute;
  top: 41%;
  left: 44%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}

/* MIRROR */
.RIGHT_M {
  position: absolute;
  top: 41%;
  left: 16%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.DOWN_RIGHT_M {
  position: absolute;
  top: 63%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.DOWN_LEFT_M {
  position: absolute;
  top: 63%;
  left: 58%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.LEFT_M {
  position: absolute;
  top: 41%;
  left: 72%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.UP_LEFT_M {
  position: absolute;
  left: 58%;
  top: 19%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.UP_RIGHT_M {
  position: absolute;
  top: 19%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
/* ------------- */
.header {
  grid-area: header;
}
.center {
  grid-area: center;
}
.footer {
  grid-area: footer;
}
.grid-container {
  display: grid;
  grid-template-rows: 1fr 5fr 2fr;
  grid-template-areas:
    "header header header header header header"
    "center center center center center center"
    "footer footer footer footer footer footer";
  grid-gap: 10px;
  background-color: #2196f3;
  padding: 10px;
  height: 95vh;
}
.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 30px;
}

/* --------- */
.turn-order {
  grid-area: turn-order;
}
.header-grid-container {
  display: grid;
  grid-template-areas: "turn-order";
  grid-gap: 10px;
  background-color: darkred;
  padding: 10px;
  height: 100%;
}
.header-grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}

/* --------- */
.p1 {
  grid-area: p1;
  position: relative;
}
.p2 {
  grid-area: p2;
  position: relative;
}
.center-grid-container {
  display: grid;
  grid-template-areas: "p1 p2 ";
  grid-gap: 10px;
  background-color: green;
  padding: 10px;
  height: 100%;
}
.center-grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}

/* --------- */
.p1-stats {
  grid-area: p1-stats;
}
.cards {
  grid-area: cards;
}
.p2-stats {
  grid-area: p2-stats;
}
.footer-grid-container {
  display: grid;
  grid-template-columns: 1fr 15fr 1fr;
  grid-template-areas: "p1-stats cards p2-stats";
  grid-gap: 10px;
  background-color: darkcyan;
  padding: 10px;
  height: 100%;
}
.footer-grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}
</style>
<script>
import {
  AxiePosition,
  AxiePositionSelect,
  AxieTypeEnum,
  getAxieTypeParts,
} from "@/game/data/data.js";
import Axie from "@/game/axie.js";
import Game from "@/game/game.js";
import Player from "@/game/player.js";
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import AxieCardSmall from "@/components/AxieCardSmall.vue";
import AxieCardExtraSmall from "@/components/AxieCardExtraSmall.vue";
import DiscardDialog from "./DiscardDialog.vue";
export default {
  name: "BattleSimulator",
  components: {
    AxieTypeIcon,
    AxieCardSmall,
    AxieCardExtraSmall,
    DiscardDialog,
  },
  props: {},
  data() {
    return {
      discardDialog: false,
      discardInfo: {
        p1DiscardAmount: 0,
        p2DiscardAmount: 0,
        p1Hand:[],
        p2Hand:[],
      },
      game: new Game(),
    };
  },
  methods: {
    closeDiscardDialog(discardedCards){
      this.discardDialog = false;
    },
    getAxiePositionCssClass(position, mirror) {
      if (mirror) return AxiePositionSelect[position].text + "_M";
      else return AxiePositionSelect[position].text;
    },
    chooseCardP1(cardId) {
      this.game.chooseCard(this.game.player1.id, cardId);
    },
    chooseCardP2(cardId) {
      this.game.chooseCard(this.game.player2.id, cardId);
    },
    getCardsInHandP1() {
      let playedCards = this.game.player1.deck.played;
      let hand = this.game.player1.deck.hand;
      let cardsInHand = this.getHandsMinusPlayedDividedByAxies(
        playedCards,
        hand
      );
      return Object.values(cardsInHand);
    },
    getCardsInHandP2() {
      let playedCards = this.game.player2.deck.played;
      let hand = this.game.player2.deck.hand;
      let cardsInHand = this.getHandsMinusPlayedDividedByAxies(
        playedCards,
        hand
      );
      return Object.values(cardsInHand);
    },
    removeCardsFromPlayedP1(axieId) {
      this.game.removeCardsFromPlayed(this.game.player1.id, axieId);
    },
    removeCardsFromPlayedP2(axieId) {
      this.game.removeCardsFromPlayed(this.game.player2.id, axieId);
    },
    getHandsMinusPlayedDividedByAxies(playedCards, hand) {
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
      let mapAxies = {};
      for (let i = 0; i < handMinusPlayed.length; i++) {
        let key = handMinusPlayed[i].owner;
        if (!mapAxies[key]) mapAxies[key] = [];
        mapAxies[key].push(handMinusPlayed[i]);
      }
      return mapAxies;
    },
    endChoosingPhase() {
      if (this.game.endChoosingPhase()) {
        let playersShouldDiscard = this.game.beginDiscardPhase();
        if (playersShouldDiscard.length > 0) {
          this.prepareDiscardDialogAndOpen(playersShouldDiscard);
        } else {
          this.game.beginChoosingPhase();
        }
      } else {
        //game end
      }
    },
    prepareDiscardDialogAndOpen(playersShouldDiscard){
      this.discardInfo.p1DiscardAmount = playersShouldDiscard[0];
      this.discardInfo.p2DiscardAmount = playersShouldDiscard[1];
      this.discardInfo.p1Hand = this.getCardsInHandP1();
      this.discardInfo.p2Hand = this.getCardsInHandP2();
      this.discardDialog = true;
    }
  },
  created() {
    let axieBird = new Axie();
    let axiePlant = new Axie();
    let axieBeast = new Axie();
    axieBird.initialize(
      1,
      AxiePosition.UP_LEFT,
      AxieTypeEnum.BIRD,
      getAxieTypeParts(AxieTypeEnum.BIRD)
    );
    axieBeast.initialize(
      2,
      AxiePosition.CENTER,
      AxieTypeEnum.BEAST,
      getAxieTypeParts(AxieTypeEnum.BEAST)
    );
    axiePlant.initialize(
      3,
      AxiePosition.RIGHT,
      AxieTypeEnum.PLANT,
      getAxieTypeParts(AxieTypeEnum.PLANT)
    );
    let axiesP1 = [axiePlant, axieBeast, axieBird];

    let axieAquatic = new Axie();
    let axieReptile = new Axie();
    let axieBug = new Axie();
    axieAquatic.initialize(
      4,
      AxiePosition.DOWN_LEFT,
      AxieTypeEnum.AQUATIC,
      getAxieTypeParts(AxieTypeEnum.AQUATIC)
    );
    axieReptile.initialize(
      5,
      AxiePosition.CENTER,
      AxieTypeEnum.REPTILE,
      getAxieTypeParts(AxieTypeEnum.REPTILE)
    );
    axieBug.initialize(
      6,
      AxiePosition.RIGHT,
      AxieTypeEnum.BUG,
      getAxieTypeParts(AxieTypeEnum.BUG)
    );
    let axiesP2 = [axieAquatic, axieReptile, axieBug];
    let player1 = new Player();
    let player2 = new Player();
    player1.initialize(1, axiesP1);
    player2.initialize(2, axiesP2);

    // localStorage.setItem("player1",JSON.stringify(player1));
    // localStorage.setItem("player2",JSON.stringify(player2));

    // player1 = JSON.parse(localStorage.getItem("player1"));
    // player2 = JSON.parse(localStorage.getItem("player2"));
    this.game.initialize(player1, player2);
    this.game.beginRound();
    this.game.beginChoosingPhase();
  },
};
</script>
