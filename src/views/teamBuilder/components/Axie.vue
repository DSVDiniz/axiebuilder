<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col><AxieDetailedStats :axie="axie" /> </v-col>
        <v-col>
          <v-text-field label="Axie name" v-model="axie.name"> </v-text-field>
          <v-text-field
            label="Marketplace search link"
            v-model="axie.marketplaceLink"
          >
          </v-text-field>
          <AxieTypeSelector
            :axieType="axie.type"
            v-on:change="changeAxieType"
          />
          <AxieAttributes :axie="axie" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" width="100%" @click="openCardsAndPartsDialog">
            Choose Parts/Cards
          </v-btn>
          <PartAndCardChooserDialog
            :axie="axie"
            :open="partAndCardChooserDialog"
            v-on:cancel="closePartAndCardChooserDialog"
            v-on:accept="setAxieParts"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(card, index) in axie.cards" :key="axie.id + '-' + index">
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
import teamStore from "../store/teamStore.js";
import AxieCard from "@/components/AxieCard.vue";
import AxieDetailedStats from "./AxieDetailedStats.vue";
import PartAndCardChooserDialog from "./PartAndCardChooserDialog.vue";
export default {
  name: "Axie",
  components: {
    AxieTypeSelector,
    AxieAttributes,
    AxieCard,
    AxieDetailedStats,
    PartAndCardChooserDialog,
  },
  store: teamStore,
  props: { axie: { type: Object, default: null } },
  data: () => ({ partAndCardChooserDialog: false }),
  methods: {
    openCardsAndPartsDialog() {
      this.partAndCardChooserDialog = true;
    },
    closePartAndCardChooserDialog() {
      this.partAndCardChooserDialog = false;
    },
    changeAxieType(val) {
      this.axie.setType(val);
      this.change();
    },
    setAxieParts(cards, eyesPart, earsPart) {
      let parts = cards.map((card) => card.parts[0]);
      parts.push(eyesPart, earsPart);
      this.axie.setParts(parts);
      this.closePartAndCardChooserDialog();
      this.change();
    },
    change() {
      this.$emit("change", this.axie);
    },
  },
  created() {},
};
</script>
