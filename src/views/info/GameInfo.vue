<template>
  <v-container>
    <v-row v-for="(effect, index) in cardEffects" :key="index">
      <v-col class="effect">
        <v-chip>
          <img
            class="effect-image"
            :src="getImgEffectUrl(effect.image)"
            width="25"
          />
          <div class="effect-title">{{ effect.text }}</div>
        </v-chip>
        <div class="effect-description">{{ effect.description }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.effect {
  text-align: left;
}
.effect-title {
  font-size: 25px;
  font-weight: bold;
}
.effect-description {
}
.effect-image {
  float: left;
}
</style>
<script>
import {
  //   Cards,
  //   AxieTypeSelect,
  //   CardAttackTypeSelect,
  //   AxiePartTypeSelect,
  CardEffect,
} from "@/game/data/data.js";
export default {
  name: "CardList",
  components: {},
  props: {},
  data() {
    return {
      cardEffects: Object.values(CardEffect),
    };
  },
  methods: {
    getImgEffectUrl(img) {
      let images = require.context("../../assets/icons/", false, /\.png$/);
      return images("./" + img);
    },
  },
  created() {},
};
</script>

<style scoped></style>
