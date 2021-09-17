<template>
  <v-dialog v-model="open" persistent>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Discard </v-card-title>
      <div v-if="discardInfo.p1DiscardAmount > 0">
        <v-card-text>
          Player 1 discard {{ discardInfo.p1DiscardAmount }} cards
        </v-card-text>
        <v-row class="ml-5 mr-5 mb-5 p1-cards-background">
          <div
            class="axie-cards"
            v-for="(axie, index) in discardInfo.p1Hand"
            :key="'p1cardaxie' + index"
          >
            <AxieCardSmall
              :card="card"
              v-for="(card, index) in axie"
              :key="'p1card' + index"
              @click.native="addToDiscardCardP1(card.gameId)"
            />
          </div>
        </v-row>
      </div>
      <v-divider></v-divider>
      <div v-if="discardInfo.p2DiscardAmount > 0">
        <v-card-text>
          Player 2 discard {{ discardInfo.p2DiscardAmount }} cards
        </v-card-text>
        <v-row class="ml-5 mr-5 p2-cards-background">
          <div
            class="axie-cards"
            v-for="(axie, index) in discardInfo.p2Hand"
            :key="'p2cardaxie' + index"
          >
            <AxieCardSmall
              :card="card"
              v-for="(card, index) in axie"
              :key="'p2card' + index"
              @click.native="addToDiscardCardP2(card.gameId)"
            />
          </div>
        </v-row>
      </div>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="!canExitDiscardDialog"
          text
          @click="closeDialog()"
        >
          Accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    open: { type: Boolean, default: false },
    discardInfo: { type: Object, default: () => {} },
  },
  data() {
    return {
      p1Discard: [],
      p2Discard: [],
    };
  },
  computed: {
    canExitDiscardDialog() {
      return (
        this.discardInfo.p1DiscardAmount === this.p1Discard.length &&
        this.discardInfo.p2DiscardAmount === this.p2Discard.length
      );
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close", {
        p1Discard: this.p1Discard,
        p2Discard: this.p2Discard,
      });
    },
    addToDiscardCardP1(cardId) {
      this.p1Discard.push(cardId);
    },
    addToDiscardCardP2(cardId) {
      this.p2Discard.push(cardId);
    },
  },
  created() {},
};
</script>
