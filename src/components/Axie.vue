<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Marketplace link"
            v-model="internalAxie.marketplaceLink"
          ></v-text-field
        ></v-col>
        <v-col><AxieDetailedStats :axie="internalAxie"/></v-col>
        <v-col>
          <AxieTypeSelector :axie="internalAxie" v-on:change="changeAxieType" />
          <AxieAttributes :axie="internalAxie" />
          <AxiePositionSelector
            :axie="internalAxie"
            v-on:change="changeAxiePosition"
          />
        </v-col>
      </v-row>
      <v-row>
        <AxieCardSelector :axie="internalAxie" v-on:change="changeCards" />
        <AxiePartsSelector :axie="internalAxie" v-on:change="changeParts" />
      </v-row>
      <v-row>
        <v-col
          v-for="(card, index) in internalAxie.cards"
          :key="internalAxie.id + '-' + index"
        >
          <AxieCard :card="card" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style scoped></style>
<script>
import AxieTypeSelector from "./AxieTypeSelector";
import AxieAttributes from "./AxieAttributes";
import AxiePositionSelector from "./AxiePositionSelector";
import AxieCardSelector from "./AxieCardSelector";
import AxiePartsSelector from "./AxiePartsSelector.vue";
import AxieCard from "./AxieCard.vue";
import AxieDetailedStats from "./AxieDetailedStats.vue";
export default {
  name: "Axie",
  components: {
    AxieTypeSelector,
    AxieAttributes,
    AxiePositionSelector,
    AxieCardSelector,
    AxiePartsSelector,
    AxieCard,
    AxieDetailedStats,
  },
  props: { axie: { type: Object, default: () => {} } },
  data: () => ({ internalAxie: null }),
  methods: {
    changeAxieType(val) {
      this.internalAxie.setType(val);
      this.change();
    },
    changeParts(parts) {
      this.internalAxie.setParts(parts);
      this.change();
    },
    changeCards(cards) {
      this.internalAxie.setCards(cards);
      this.change();
    },
    changeAxiePosition(position) {
      this.internalAxie.setPosition(position);
      this.change();
    },
    change() {
      this.$emit("change", this.internalAxie);
    },
  },
  created() {
    this.internalAxie = this.axie;
  },
};
</script>
