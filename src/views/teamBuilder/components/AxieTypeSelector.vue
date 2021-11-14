<template>
  <v-container>
    <v-row>
      <v-select
        :items="types"
        v-model="selectedType"
        v-on:change="change"
        label="Axie Type"
      >
        <template slot="selection" slot-scope="data">
          <AxieTypeIcon :axieType="data.item.value" />{{ data.item.text }}
        </template>
        <template slot="item" slot-scope="data">
          <AxieTypeIcon :axieType="data.item.value" />{{ data.item.text }}
        </template>
      </v-select>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import { AxieTypeSelect } from "@/game/data/data.js";
export default {
  name: "AxieTypeSelector",
  components: { AxieTypeIcon },
  props: {
    axieType: { type: Number, default: null },
  },
  data: () => ({
    types: AxieTypeSelect,
    selectedType: null,
  }),
  methods: {
    change(val) {
      this.$emit("change", val);
    },
  },
  created() {
    debugger;
    this.selectedType = this.axieType;
  },
};
</script>
