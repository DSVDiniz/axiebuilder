<template>
  <div>
    <AxieTypeIcon
      style="display: contents"
      v-for="(type, index) in getGroupTypes"
      :axieType="type"
      :key="index"
    />
  </div>
</template>
<style scoped></style>
<script>
import { AxieBaseStats } from "@/game/data/data.js";
import AxieTypeIcon from "./AxieTypeIcon.vue";
export default {
  name: "AxieRPSTypeIcon",
  components: { AxieTypeIcon },
  props: {
    axieType: { type: Number, default: 0 },
    advantage: { type: Boolean, default: true },
  },
  data: () => ({}),
  computed: {
    getGroupTypes() {
      return this.advantage
        ? AxieBaseStats[this.axieType].adv
        : AxieBaseStats[this.axieType].disadv;
    },
  },
};
</script>
