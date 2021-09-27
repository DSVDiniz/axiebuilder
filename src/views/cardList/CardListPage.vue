<template>
  <v-container>
    <v-row>
      <CardListFilter v-on:filterChange="filterChange" />
    </v-row>
    <CardList :filter="filter" />
  </v-container>
</template>

<script>
import { Cards } from "@/game/data/data.js";
import CardListFilter from "./components/CardListFilter.vue";
import CardList from "./components/CardList.vue";
export default {
  name: "CardListPage",
  components: {
    CardListFilter,
    CardList,
  },
  props: {},
  data() {
    return {
      cardMap: Cards,
      filteredCards: [],
      filter: {},
    };
  },
  methods: {
    selectCard(card) {
      this.$emit("selectCard", card);
    },
    filterChange(filter) {
      this.filter = filter;
    },
  },
  created() {
    this.filteredCards = Object.values(this.cardMap);
  },
};
</script>

<style scoped></style>
