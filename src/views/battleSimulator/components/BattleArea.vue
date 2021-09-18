<template>
  <div class="center-grid-container">
    <div class="p1">
      <div
        v-for="(axie, index) in player1Axies"
        :key="'p1axie' + index"
        :class="getAxiePositionCssClass(axie.position, false)"
      >
        <div class="stats-font">
          {{ axie.currentHealth }}/{{ axie.maxHealth }}
        </div>
        <div class="stats-font" v-if="axie.shield > 0">
          {{ axie.shield }}
        </div>
        <AxieTypeIcon :axieType="axie.type" />
      </div>
    </div>
    <div class="p2 stats-font">
      <div
        v-for="(axie, index) in player2Axies"
        :key="'p2axie' + index"
        :class="getAxiePositionCssClass(axie.position, true)"
      >
        <div class="stats-font">
          {{ axie.currentHealth }}/{{ axie.maxHealth }}
        </div>
        <div class="stats-font" v-if="axie.shield > 0">
          {{ axie.shield }}
        </div>
        <AxieTypeIcon :axieType="axie.type" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.stats-font {
  font-size: 20px !important;
}
.p1 {
  grid-area: p1;
  position: relative;
}
.p2 {
  grid-area: p2;
  position: relative;
}
.center-grid-container {
  display: grid;
  grid-template-areas: "p1 p2 ";
  grid-gap: 10px;
  background-color: green;
  padding: 10px;
  height: 100%;
}
.center-grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}
.LEFT {
  position: absolute;
  top: 41%;
  left: 16%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.DOWN_LEFT {
  position: absolute;
  top: 63%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.DOWN_RIGHT {
  position: absolute;
  top: 63%;
  left: 58%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.RIGHT {
  position: absolute;
  top: 41%;
  left: 72%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.UP_RIGHT {
  position: absolute;
  left: 58%;
  top: 19%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.UP_LEFT {
  position: absolute;
  top: 19%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.CENTER {
  position: absolute;
  top: 41%;
  left: 44%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.CENTER_M {
  position: absolute;
  top: 41%;
  left: 44%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}

/* MIRROR */
.RIGHT_M {
  position: absolute;
  top: 41%;
  left: 16%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.DOWN_RIGHT_M {
  position: absolute;
  top: 63%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.DOWN_LEFT_M {
  position: absolute;
  top: 63%;
  left: 58%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.LEFT_M {
  position: absolute;
  top: 41%;
  left: 72%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.UP_LEFT_M {
  position: absolute;
  left: 58%;
  top: 19%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
.UP_RIGHT_M {
  position: absolute;
  top: 19%;
  left: 30%;
  height: 100px;
  width: 100px;
  background-color: goldenrod;
}
</style>
<script>
import { AxiePositionSelect } from "@/game/data/data.js";
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
export default {
  name: "BattleArea",
  components: {
    AxieTypeIcon,
  },
  props: {
    player1Axies: { type: Array, default: () => [] },
    player2Axies: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  methods: {
    getAxiePositionCssClass(position, mirror) {
      if (mirror) return AxiePositionSelect[position].text + "_M";
      else return AxiePositionSelect[position].text;
    },
  },
  created() {},
};
</script>
