<template>
  <v-container>
    <div class="end-turn-button" @click="endChoosingPhase()">End Turn</div>
    <div class="grid-container">
      <div class="header">
        <TurnOrderHeader
          :round="game.round"
          :turnOrder="game.turnOrder"
          :playedCardsP1="game.getPlayedCards(game.player1.id)"
          :playedCardsP2="game.getPlayedCards(game.player2.id)"
          v-on:removeCardsFromPlayedP1="removeCardsFromPlayedP1"
          v-on:removeCardsFromPlayedP2="removeCardsFromPlayedP2"
        />
      </div>
      <div class="center">
        <BattleArea
          :player1Axies="game.player1.axies"
          :player2Axies="game.player2.axies"
        />
      </div>
      <div class="footer">
        <div class="footer-grid-container">
          <div class="p1-stats">
            <PlayerStats
              :energy="game.player1.energy"
              :handLength="game.player1.deck.hand.length"
              :deckLength="game.player1.deck.cards.length"
              :cemeteryLength="game.player1.deck.cemetery.length"
            />
          </div>
          <div class="cards">
            <PlayerCards
              :player1Hand="getCardsInHandP1()"
              :player2Hand="getCardsInHandP2()"
              v-on:chooseCardP1="chooseCardP1"
              v-on:chooseCardP2="chooseCardP2"
            />
          </div>
          <div class="p2-stats">
            <PlayerStats
              :energy="game.player2.energy"
              :handLength="game.player2.deck.hand.length"
              :deckLength="game.player2.deck.cards.length"
              :cemeteryLength="game.player2.deck.cemetery.length"
            />
          </div>
        </div>
      </div>
    </div>
    <DiscardDialog
      :open="discardDialog"
      :discardInfo="discardInfo"
      v-on:close="closeDiscardDialog"
    />
    <VictoryDialog
      :open="victoryDialog"
      :winners="winners"
      v-on:close="closeVictoryDialog"
    />
  </v-container>
</template>
<style scoped>
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
  AxieTypeEnum,
  getAxieTypeParts,
} from "@/game/data/data.js";
import Axie from "@/game/axie.js";
import Game from "@/game/game.js";
import Player from "@/game/player.js";
import DiscardDialog from "./components/DiscardDialog.vue";
import TurnOrderHeader from "./components/TurnOrderHeader.vue";
import BattleArea from "./components/BattleArea.vue";
import PlayerStats from "./components/PlayerStats.vue";
import PlayerCards from "./components/PlayerCards.vue";
import VictoryDialog from "./components/VictoryDialog.vue";
export default {
  name: "BattleSimulator",
  components: {
    DiscardDialog,
    TurnOrderHeader,
    BattleArea,
    PlayerStats,
    PlayerCards,
    VictoryDialog,
  },
  props: {},
  data() {
    return {
      discardDialog: false,
      victoryDialog: false,
      winners: [],
      discardInfo: {
        p1DiscardAmount: 0,
        p2DiscardAmount: 0,
        p1Hand: [],
        p2Hand: [],
      },
      game: new Game(),
    };
  },
  methods: {
    closeDiscardDialog(discardedCards) {
      this.discardDialog = false;
      this.game.discardCardsP1(discardedCards.p1Discard);
      this.game.discardCardsP2(discardedCards.p2Discard);
      this.game.endDiscardPhase();
    },
    closeVictoryDialog() {
      this.victoryDialog = false;
    },

    chooseCardP1(cardId) {
      this.game.chooseCard(this.game.player1.id, cardId);
    },
    chooseCardP2(cardId) {
      this.game.chooseCard(this.game.player2.id, cardId);
    },
    getCardsInHandP1() {
      return this.game.getCardsInHandP1();
    },
    getCardsInHandP2() {
      return this.game.getCardsInHandP2();
    },
    removeCardsFromPlayedP1(axieId) {
      this.game.removeCardsFromPlayed(this.game.player1.id, axieId);
    },
    removeCardsFromPlayedP2(axieId) {
      this.game.removeCardsFromPlayed(this.game.player2.id, axieId);
    },
    endChoosingPhase() {
      let gameResult = this.game.endChoosingPhase();
      if (gameResult) {
        let playersShouldDiscard = this.game.beginDiscardPhase();
        if (playersShouldDiscard.length > 0) {
          this.prepareDiscardDialogAndOpen(playersShouldDiscard);
        } else {
          this.game.beginChoosingPhase();
        }
      } else {
        this.openVictoryDialog(this.game.winners);
      }
    },
    openVictoryDialog(winners) {
      this.victoryDialog = true;
      this.winners = winners;
    },
    prepareDiscardDialogAndOpen(playersShouldDiscard) {
      this.discardInfo.p1DiscardAmount = playersShouldDiscard[0];
      this.discardInfo.p2DiscardAmount = playersShouldDiscard[1];
      this.discardInfo.p1Hand = this.getCardsInHandP1();
      this.discardInfo.p2Hand = this.getCardsInHandP2();
      this.discardDialog = true;
    },
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
