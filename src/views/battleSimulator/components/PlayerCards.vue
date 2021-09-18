<template>
  <div>
    <v-row class="ml-5 mr-5 mb-5 p1-cards-background">
      <div
        class="axie-cards"
        v-for="(axie, index) in player1Hand"
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
        v-for="(axie, index) in player2Hand"
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
</template>
<style scoped>
.axie-cards {
  display: flex;
  margin-right: 10px;
}
.p1-cards-background {
  background-color: #cddae6;
  min-height: 138px;
}
.p2-cards-background {
  background-color: #e6cdd1;
  min-height: 138px;
}
</style>
<script>
import AxieCardSmall from "@/components/AxieCardSmall.vue";
export default {
  name: "BattleSimulator",
  components: {
    AxieCardSmall,
  },
  props: {
    player1Hand: { type: Array, default: () => [] },
    player2Hand: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  methods: {
    chooseCardP1(cardId) {
      this.$emit("chooseCardP1", cardId);
    },
    chooseCardP2(cardId) {
      this.$emit("chooseCardP2", cardId);
    },
  },
  created() {},
};
</script>
