<template>
  <v-container>
    <v-row>
      <v-col v-for="(card, index) in cardList" :key="index" cols="2">
        <AxieCard :card="card"></AxieCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cardListJson from "../../gameData/axie-cards";
import AxieCard from "../../components/AxieCard.vue";
export default {
  name: "CardList",
  components: {
    AxieCard,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      cardList: cardListJson.cardList,
    };
  },
  created() {},
};
</script>

<style scoped></style>
