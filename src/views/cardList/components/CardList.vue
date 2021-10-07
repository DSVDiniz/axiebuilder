<template>
  <v-row>
    <v-col v-for="(card, index) in filteredCards" :key="index">
      <AxieCard
        :card="card"
        :showParts="true"
        v-on:select="selectCard"
        :size="'medium'"
      />
    </v-col>
  </v-row>
</template>

<script>
import { Cards } from "@/game/data/data.js";
import AxieCard from "@/components/AxieCard.vue";
export default {
  name: "CardListPage",
  components: {
    AxieCard,
  },
  props: {
    filter: { type: Object, default: () => {} },
    cardSize: { type: Number, default: 250 },
    statSize: { type: Number, default: 55 },
    effectSize: { type: Number, default: 25 },
  },
  watch: {
    filter: {
      handler(newFilter) {
        let filterArr = Object.keys(newFilter).filter(
          (key) => newFilter[key] != null
        );
        this.filteredCards = Object.values(this.cardMap).filter((card) => {
          let achou = true;
          for (let i = 0; i < filterArr.length; i++) {
            let key = filterArr[i];
            if (key === "part") {
              for (let j = 0; j < card["parts"].length; j++) {
                if (card["parts"][j].type != newFilter[key]) achou = false;
              }
            } else if (key === "effect") {
              if (card[key].value != newFilter[key]) achou = false;
            } else if (key === "text") {
              let cardText = `${card.name}${card.description}`;
              cardText = cardText
                .concat(card["parts"].map((part) => part.name).join())
                .toLowerCase();
              achou = cardText.includes(newFilter[key]);
            } else {
              if (card[key] != newFilter[key]) achou = false;
            }
          }
          return achou;
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      cardMap: Cards,
      filteredCards: [],
    };
  },
  methods: {
    selectCard(card) {
      this.$emit("selectCard", card);
    },
  },
  created() {
    this.filteredCards = Object.values(this.cardMap);
  },
};
</script>

<style scoped></style>
