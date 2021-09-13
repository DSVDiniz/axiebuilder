<template>
  <v-container>
    <div class="grid-container">
      <div class="header">
        <div class="header-grid-container">
          <v-row class="turn-order">
            <v-col v-for="(axie, index) in game.getTurnOrder()" :key="index">
              <div v-if="axie.owner === 1" class="turn-order-div-p1">
                <AxieTypeIcon :axieType="axie.type" />
              </div>
              <div v-else class="turn-order-div-p2">
                <AxieTypeIcon :axieType="axie.type" />
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="center">
        <div class="center-grid-container">
          <div class="p1">
            <div class="axie-left"></div>
            <div class="axie-down-left"></div>
            <div class="axie-down-right"></div>
            <div class="axie-right"></div>
            <div class="axie-up-right"></div>
            <div class="axie-up-left"></div>
            <div class="axie-center"></div>
          </div>
          <div class="p2">
            <div class="axie-left"></div>
            <div class="axie-down-left"></div>
            <div class="axie-down-right"></div>
            <div class="axie-right"></div>
            <div class="axie-up-right"></div>
            <div class="axie-up-left"></div>
            <div class="axie-center"></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-grid-container">
          <div class="p1-stats">
            <div>{{game.player1.energy}}/10</div>
            <div>{{game.player1.deck.hand.length}}</div>
            <div>{{game.player1.deck.cards.length}}</div>
            <div>{{game.player1.deck.cemetery.length}}</div>
          </div>
          <div class="cards">
            <v-row class="ml-5 mr-5 mb-5">
              <AxieCardSmall
                :card="card"
                v-for="(card, index) in game.player1.deck.hand"
                :key="'p1card' + index"
              />
            </v-row>
            <v-row class="ml-5 mr-5">
              <AxieCardSmall
                :card="card"
                v-for="(card, index) in game.player1.deck.hand"
                :key="'p1card' + index"
              />
            </v-row>
          </div>
          <div class="p2-stats">
            <div>{{game.player2.energy}}/10</div>
            <div>{{game.player2.deck.hand.length}}</div>
            <div>{{game.player2.deck.cards.length}}</div>
            <div>{{game.player2.deck.cemetery.length}}</div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<style scoped>
.turn-order-div-p1 {
  background-color: blue;
}
.turn-order-div-p2 {
  background-color: red;
}

.axie-left {
  position: absolute;
  top: 41%;
  left: 16%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.axie-down-left {
  position: absolute;
  top: 63%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.axie-down-right {
  position: absolute;
  top: 63%;
  left: 58%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.axie-right {
  position: absolute;
  top: 41%;
  left: 72%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.axie-up-right {
  position: absolute;
  left: 58%;
  top: 19%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.axie-up-left {
  position: absolute;
  top: 19%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.axie-center {
  position: absolute;
  top: 41%;
  left: 44%;
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
  AxieTypeEnum,
  getAxieTypeParts,
} from "@/game/data/data.js";
import Axie from "@/game/axie.js";
import Game from "@/game/game.js";
import Player from "@/game/player.js";
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import AxieCardSmall from "@/components/AxieCardSmall.vue";
export default {
  name: "BattleSimulator",
  components: {
    AxieTypeIcon,
    AxieCardSmall,
  },
  props: {},
  data() {
    return {
      game: new Game(),
    };
  },
  methods: {},
  created() {
    let axieBird = new Axie();
    let axiePlant = new Axie();
    let axieBeast = new Axie();
    axieBird.initialize(
      1,
      AxiePosition.LEFT,
      AxieTypeEnum.BIRD,
      getAxieTypeParts(AxieTypeEnum.BIRD),
      1
    );
    axieBeast.initialize(
      2,
      AxiePosition.CENTER,
      AxieTypeEnum.BEAST,
      getAxieTypeParts(AxieTypeEnum.BEAST),
      1
    );
    axiePlant.initialize(
      3,
      AxiePosition.RIGHT,
      AxieTypeEnum.PLANT,
      getAxieTypeParts(AxieTypeEnum.PLANT),
      1
    );
    let axiesP1 = [axiePlant, axieBeast, axieBird];

    let axieAquatic = new Axie();
    let axieReptile = new Axie();
    let axieBug = new Axie();
    axieAquatic.initialize(
      4,
      AxiePosition.LEFT,
      AxieTypeEnum.AQUATIC,
      getAxieTypeParts(AxieTypeEnum.AQUATIC),
      2
    );
    axieReptile.initialize(
      5,
      AxiePosition.CENTER,
      AxieTypeEnum.REPTILE,
      getAxieTypeParts(AxieTypeEnum.REPTILE),
      2
    );
    axieBug.initialize(
      6,
      AxiePosition.RIGHT,
      AxieTypeEnum.BUG,
      getAxieTypeParts(AxieTypeEnum.BUG),
      2
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
  },
};
</script>
