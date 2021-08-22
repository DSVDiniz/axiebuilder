<template>
  <v-row justify="center" align="center" class="card-row">
    <v-col cols="2">
      <div class="energy-small">{{ card.cost }}x</div>
      <img
        class="energy-bg-small"
        src="@/assets/icons/gain-energy.png"
        width="20"
      />
      <div class="dmg-small">{{ card.dmg }}</div>
      <div class="shield-small">{{ card.shield }}</div>
      <img
        class="effect-bg-small"
        src="@/assets/icons/morale-up.png"
        width="35"
      />
    </v-col>
    <v-col :style="{background:cardColor}">
      <div class="card-name-small">{{ card.name }}</div>
      <div class="card-attack-type-small">{{ cardAttackType }}</div>
      <div class="card-description-small">{{ card.description }}</div>
    </v-col>
    <v-col :style="{background:cardColor}">
      <div
        v-for="(part, index) in card.parts"
        :key="card.id + index"
        class="card-parts-small"
      >
        <div class="part-icon-name-small">
          <AxiePartIcon
            class="part-icon"
            :axieType="part.type"
            :partType="part.part"
          />
          <div class="part-name-small">{{ part.name }}</div>
        </div>
        <div class="part-or-small" v-if="index < card.parts.length - 1">OR</div>
      </div>
    </v-col>
  </v-row>
</template>
<style scoped>
.energy-small {
  -webkit-text-stroke: 2px white; /* width and color */
  margin-top: 3%;
  float: left;
}
.dmg-small {
  float: left;
  line-height: 37px;
  width: 35px;
  height: 41px;
  color: red;
  background-image: url("~@/assets/bg-reptile.png");
  background-repeat: no-repeat;
  background-size: 35px;
}
.shield-small {
  float: left;
  line-height: 37px;
  width: 35px;
  height: 41px;
  color: green;
  background-image: url("~@/assets/bg-reptile.png");
  background-repeat: no-repeat;
  background-size: 35px;
}
.energy-bg-small {
  margin-top: 3%;
  float: left;
}
.dmg-bg-small {
  float: left;
}
.shield-bg-small {
  float: left;
}
.effect-bg-small {
  float: left;
}
.card-row {
  background-color: #5d6175;
  margin-bottom: 15px;
}
.card-name-small {
  font-weight: bolder;
  font-size: 20px;
  text-align: left;
}
.card-description-small {
  text-align: left;
}
.card-parts-small {
  float: left;
}
.part-name-small {
  font-weight: bolder;
  float: left;
}
.part-or-small {
  float: left;
  margin-top: 8%;
  margin-left: 10px;
  margin-right: 10px;
}
.part-icon-name-small {
  float: left;
}
.part-icon {
  float: left;
}
.card-attack-type-small{
  text-align: left;
  font-style: italic;
  font-size: small;
  font-weight: bold;
}
</style>
<script>
import AxiePartIcon from "./icons/AxiePartIcon.vue";
import { AxieTypeSelect ,CardAttackType} from "../dtos/data/data";
export default {
  name: "AxieCard",
  components: { AxiePartIcon },
  props: {
    card: { type: Object, default: () => {} },
  },
  data: () => ({}),
  computed: {
    cardColor: function() {
      return AxieTypeSelect[this.card.element].color;
    },
    cardAttackType: function(){
      return Object.keys(CardAttackType)[this.card.attackType];
    }
  },
  methods: {
    getImgUrl(img) {
      let images = require.context("../assets/cards/", false, /\.png$/);
      return images("./" + img);
    },
  },
};
</script>
