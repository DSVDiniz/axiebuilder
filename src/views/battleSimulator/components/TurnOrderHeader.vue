<template>
  <div class="header-grid-container">
    <v-row class="turn-order">
      <v-col class="round-header"> Round {{ round }} </v-col>
      <v-col v-for="(axie, index1) in turnOrder" :key="index1">
        <div
          v-if="axie.owner === 1"
          class="turn-order-div-p1"
          @click="removeCardsFromPlayedP1(axie.id)"
        >
          <AxieTypeIcon :axieType="axie.type" />
          <div class="attacking-cards">
            <div
              v-for="(card, index2) in getPlayedCardsFromAxieP1(
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
              v-for="(card, index2) in getPlayedCardsFromAxieP2(
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
</template>
<style scoped>
.attacking-cards {
  display: flex;
}
.turn-order-div-p1 {
  background-color: blue;
}
.turn-order-div-p2 {
  background-color: red;
}
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
</style>
<script>
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import AxieCardExtraSmall from "@/components/AxieCardExtraSmall.vue";
export default {
  name: "TurnOrderHeader",
  components: {
    AxieTypeIcon,
    AxieCardExtraSmall,
  },
  props: {
    round: { type: Number, default: 0 },
    turnOrder: { type: Array, default: () => [] },
    playedCardsP1: { type: Array, default: () => [] },
    playedCardsP2: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  methods: {
    removeCardsFromPlayedP1(axieId) {
      this.$emit("removeCardsFromPlayedP1", axieId);
    },
    removeCardsFromPlayedP2(axieId) {
      this.$emit("removeCardsFromPlayedP2", axieId);
    },
    getPlayedCardsFromAxieP1(axieId) {
      return this.playedCardsP1.filter((card) => card.owner === axieId);
    },
    getPlayedCardsFromAxieP2(axieId) {
      return this.playedCardsP2.filter((card) => card.owner === axieId);
    },
  },
  created() {},
};
</script>