<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Marketplace link"
            v-model="internalAxie.marketplaceLink"
          >
          </v-text-field>
        </v-col>
        <v-col><AxieDetailedStats :axie="internalAxie" /> </v-col>
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
        <v-col>
          <v-btn
            color="primary"
            width="100%"
            @click="openCardsAndPartsDialog()"
          >
            Choose Parts/Cards
          </v-btn>
          <PartAndCardChooserDialog
            :open="partAndCardChooserDialog"
            v-on:accept="acceptCardsAndParts"
            v-on:cancel="closePartAndCardChooserDialog"
          />
        </v-col>
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
import AxieCard from "@/components/AxieCard.vue";
import AxieDetailedStats from "./AxieDetailedStats.vue";
import PartAndCardChooserDialog from "./PartAndCardChooserDialog.vue";
export default {
  name: "Axie",
  components: {
    AxieTypeSelector,
    AxieAttributes,
    AxiePositionSelector,
    AxieCard,
    AxieDetailedStats,
    PartAndCardChooserDialog,
  },
  props: { axie: { type: Object, default: () => {} } },
  data: () => ({ internalAxie: null, partAndCardChooserDialog: false }),
  methods: {
    acceptCardsAndParts(){
      this.partAndCardChooserDialog = false;
    },
    openCardsAndPartsDialog() {
      this.partAndCardChooserDialog = true;
    },
    closePartAndCardChooserDialog(){
      this.partAndCardChooserDialog = false;
    },
    changeAxieType(val) {
      this.internalAxie.setType(val);
      this.change();
    },
    changeParts(parts) {
      this.internalAxie.setParts(parts);
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
