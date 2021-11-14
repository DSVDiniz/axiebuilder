<template>
  <v-select
    :items="parts"
    v-model="selectedPart"
    v-on:change="change"
    :label="chooseLabel(partType)"
  >
    <template slot="selection" slot-scope="data">
      <AxieTypeIcon :axieType="data.item.axieType" />{{ data.item.name }}
    </template>
    <template slot="item" slot-scope="data">
      <AxieTypeIcon :axieType="data.item.axieType" />{{ data.item.name }}
    </template>
  </v-select>
</template>
<style scoped></style>
<script>
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import { AxieTypeSelect, AxiePartType, Parts } from "@/game/data/data.js";
export default {
  name: "PartSelector",
  components: { AxieTypeIcon },
  props: {
    partType: { type: Number, default: 0 },
    currentPart: { type: Number, default: null },
  },
  data: () => ({
    types: AxieTypeSelect,
    selectedPart: null,
    parts: [],
  }),
  methods: {
    change(val) {
      this.$emit("change", val);
    },
    chooseLabel(partType) {
      return Object.keys(AxiePartType)[partType];
    },
  },
  created() {
    this.selectedPart = this.currentPart;
    this.parts = Object.values(Parts)
      .filter((p) => p.type === this.partType)
      .sort((a, b) => a.axieType - b.axieType);
  },
};
</script>
