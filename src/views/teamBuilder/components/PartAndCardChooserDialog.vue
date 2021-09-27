<template>
  <v-dialog v-model="open" persistent scrollable>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        <v-row> Choose Cards and Parts </v-row>
        <v-row>
          <CardListFilter v-on:filterChange="filterChange" />
        </v-row>
      </v-card-title>
      <v-card-text>
        <CardList
          :filter="filter"
          :cardSize="250"
          :statSize="55"
          :effectSize="25"
          v-on:selectCard="selectCard"
        />
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="2"></v-col>
          <v-col cols="10" style="display: flex">
            <AxieCardSmall
              v-for="(card, index) in selectedCards"
              :key="index"
              :card="card"
              v-on:select="removeCard"
            />
          </v-col>
        </v-row>
        <v-btn color="primary" text @click="closeDialogAccept"> Accept </v-btn>
        <v-btn text @click="closeDialogCancel"> Cancel </v-btn>
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
import { Cards } from "@/game/data/data.js";
import AxieCardSmall from "@/components/AxieCardSmall.vue";
import CardListFilter from "@/views/cardList/components/CardListFilter.vue";
import CardList from "@/views/cardList/components/CardList.vue";
export default {
  name: "PartAndCardChooserDialog",
  components: {
    AxieCardSmall,
    CardListFilter,
    CardList,
  },
  props: {
    open: { type: Boolean, default: false },
  },
  data() {
    return {
      selectedCards: [],
      cardMap: Cards,
      filteredCards: [],
      filter: {},
    };
  },
  methods: {
    removeCard(card) {
      let indexCard = this.selectedCards.findIndex((c) => c.id === card.id);
      if (indexCard !== -1) this.selectedCards.splice(indexCard, 1);
    },
    closeDialogAccept() {
      this.$emit("accept", this.parts);
    },
    closeDialogCancel() {
      this.$emit("cancel");
    },
    selectCard(card) {
      let indexCard = this.selectedCards.findIndex((c) => c.id === card.id);
      if (indexCard === -1) {
        let hasPart =
          this.selectedCards.findIndex(
            (c) => c.parts[0].type === card.parts[0].type
          ) !== -1;
        if (!hasPart) this.selectedCards.push(card);
      } else {
        this.selectedCards.splice(indexCard, 1);
      }
    },
    filterChange(filter) {
      this.filter = filter;
    },
  },
  created() {
    this.filteredCards = Object.values(this.cardMap);
  },
  mounted() {},
};
</script>

