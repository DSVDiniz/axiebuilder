<template>
  <v-container>
    <v-radio-group v-model="selectedPosition" v-on:change="change">
      <v-row>
        <v-col
          v-for="(item, index) in positions"
          :key="index"
          :cols="getColSize(index)"
        >
          <v-radio
            :style="{
              justifyContent: 'center',
              marginLeft: hasMarginLeft(index),
              marginRight: hasMarginRight(index),
            }"
            :value="item.value"
          ></v-radio>
        </v-col>
      </v-row>
    </v-radio-group>
  </v-container>
</template>
<style scoped></style>
<script>
import { AxiePositionSelect } from "@/game/data/data.js";
export default {
  name: "AxiePositionSelector",
  props: {
    axie: { type: Object, default: () => {} },
  },
  data: () => ({
    positions: AxiePositionSelect,
    selectedPosition: 3
  }),
  methods: {
    getColSize(index) {
      if (index < 2) return 6;
      else if (index > 1 && index < 5) return 4;
      else return 6;
    },
    hasMarginLeft(index) {
      return index == 0 || index == 5 ? "32%" : "0%";
    },
    hasMarginRight(index) {
      return index == 1 || index == 6 ? "32%" : "0%";
    },
    change(val){
      this.$emit("change",val);
    }
  },
  created(){
    this.selectedPosition = this.axie.position;
  }
};
</script>
