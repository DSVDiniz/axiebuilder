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
              @click.native="toggleCardP1(card.gameId)"
              :class="inDiscardListP1(card.gameId) ? 'card-disabled' : ''"
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
              @click.native="toggleCardP2(card.gameId)"
              :class="inDiscardListP2(card.gameId) ? 'card-disabled' : ''"
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
.card-disabled:after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: "\d7";
  font-size: 180px;
  color: #fff;
  line-height: 100px;
  text-align: center;
}
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
  name: "DiscardDialog",
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
  watch: {
    open() {
      this.resetDiscarded();
    },
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
    inDiscardListP1(cardId) {
      return this.p1Discard.findIndex((id) => id === cardId) !== -1;
    },
    inDiscardListP2(cardId) {
      return this.p2Discard.findIndex((id) => id === cardId) !== -1;
    },
    toggleCardP1(cardId) {
      let index = this.p1Discard.findIndex((id) => id === cardId);
      if (index !== -1) {
        this.p1Discard.splice(index, 1);
      } else {
        if (this.p1Discard.length < this.discardInfo.p1DiscardAmount)
          this.p1Discard.push(cardId);
      }
    },
    toggleCardP2(cardId) {
      let index = this.p2Discard.findIndex((id) => id === cardId);
      if (index !== -1) {
        this.p2Discard.splice(index, 1);
      } else {
        if (this.p2Discard.length < this.discardInfo.p2DiscardAmount)
          this.p2Discard.push(cardId);
      }
    },
    resetDiscarded() {
      this.p1Discard = [];
      this.p2Discard = [];
    },
  },
  created() {
    this.resetDiscarded();
  },
  mounted() {
    this.resetDiscarded();
  },
};
</script>
