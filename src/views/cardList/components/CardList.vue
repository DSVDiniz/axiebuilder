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
    filterOnSelect: { type: Boolean, default: false },
  },
  watch: {
    filter: {
      handler(newFilter) {
        this.filterCards(newFilter);
      },
      deep: true,
    },
    selectedParts: {
      handler(newParts) {
        this.filteredCards = this.filteredCards.filter((card) =>
          this.filterMultipleParts(card, newParts)
        );
      },
      deep: true,
    },
  },
  data() {
    return {
      cardMap: Cards,
      filteredCards: [],
      selectedParts: {},
    };
  },
  methods: {
    selectCard(card) {
      if (this.filterOnSelect) {
        let key = card.parts[0].type;
        if (!this.selectedParts[key]) {
          this.$set(this.selectedParts, key, key);
        } else {
          this.$delete(this.selectedParts, key);
        }
      }
      this.$emit("selectCard", card);
    },
    filterCards(newFilter) {
      let filterAttributeNames = Object.keys(newFilter).filter(
        (key) => newFilter[key] != null
      );
      this.filteredCards = this.filterCardsWithNewFilter(
        this.cardMap,
        filterAttributeNames,
        newFilter
      );
    },
    filterCardsWithNewFilter(cardMap, filterAttributeNames, filter) {
      return Object.values(cardMap).filter((card) => {
        let achou = true;
        for (let i = 0; i < filterAttributeNames.length; i++) {
          let key = filterAttributeNames[i];
          if (key === "part") {
            achou = this.filterParts(card, filter, key);
          } else if (key === "effect") {
            achou = this.filterEffect(card, filter, key);
          } else if (key === "text") {
            achou = this.filterText(card, filter, key);
          } else {
            achou = this.filterDefault(card, filter, key);
          }
        }
        return achou;
      });
    },
    filterMultipleParts(card, selectedParts) {
      for (let i = 0; i < selectedParts.length; i++) {
        for (let j = 0; j < card["parts"].length; j++) {
          if (card["parts"][j].type != selectedParts) return false;
        }
      }
      return true;
    },
    filterParts(card, filter, key) {
      for (let j = 0; j < card["parts"].length; j++) {
        if (card["parts"][j].type != filter[key]) return false;
      }
      return true;
    },
    filterEffect(card, filter, key) {
      return card[key].value == filter[key];
    },
    filterText(card, filter, key) {
      let cardText = `${card.name}${card.description}`;
      cardText = cardText
        .concat(card["parts"].map((part) => part.name).join())
        .toLowerCase();
      return cardText.includes(filter[key]);
    },
    filterDefault(card, filter, key) {
      return card[key] != filter[key];
    },
  },
  created() {
    this.filteredCards = Object.values(this.cardMap);
  },
};
</script>

<style scoped></style>
