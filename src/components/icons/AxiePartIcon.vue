<template>
  <div v-if="isMouth()">
    <AxieMouthPart :axieType="axieType" />
  </div>
  <div v-else-if="isEye()">
    <AxieEyePart :axieType="axieType" />
  </div>
  <div v-else-if="isTail()">
    <AxieTailPart :axieType="axieType" />
  </div>
  <div v-else-if="isBack()">
    <AxieBackPart :axieType="axieType" />
  </div>
  <div v-else-if="isHorn()">
    <AxieHornPart :axieType="axieType" />
  </div>
  <div v-else-if="isEar()">
    <AxieEarPart :axieType="axieType" />
  </div>
</template>
<style scoped></style>
<script>
import { AxiePartType } from "@/game/data/data.js";
import AxieBackPart from "./parts/AxieBackPart.vue";
import AxieEarPart from "./parts/AxieEarPart.vue";
import AxieEyePart from "./parts/AxieEyePart.vue";
import AxieHornPart from "./parts/AxieHornPart.vue";
import AxieMouthPart from "./parts/AxieMouthPart.vue";
import AxieTailPart from "./parts/AxieTailPart.vue";
export default {
  name: "AxiePartIcon",
  components: {
    AxieMouthPart,
    AxieEyePart,
    AxieTailPart,
    AxieBackPart,
    AxieHornPart,
    AxieEarPart,
  },
  props: {
    axieType: { type: Number, default: 0 },
    partType: { type: Number, default: 0 },
  },
  data: () => ({}),
  methods: {
    isMouth() {
      return this.partType === AxiePartType.MOUTH;
    },
    isEye() {
      return this.partType == AxiePartType.EYES;
    },
    isTail() {
      return this.partType == AxiePartType.TAIL;
    },
    isBack() {
      return this.partType == AxiePartType.BACK;
    },
    isHorn() {
      return this.partType == AxiePartType.HORN;
    },
    isEar() {
      return this.partType == AxiePartType.EARS;
    },
  },
  created(){
  }
};
</script>
