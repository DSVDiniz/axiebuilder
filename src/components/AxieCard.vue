<template>
  <div>
    <div v-if="showParts" class="parts mb-1">
      <AxiePartIcon
        :axieType="card.parts[0].axieType"
        :partType="card.parts[0].type"
      />
      <v-chip
        class="ml-1 mr-1"
        label
        dark
        :color="partColor"
        v-for="(part, index) in card.parts"
        :key="index"
        >{{ part.name }}
      </v-chip>
    </div>
    <div class="card">
      <img :src="getImgUrl(card.image)" width="250" />
      <h3 class="name">{{ card.name }}</h3>
      <h1 class="cost">{{ card.cost }}</h1>
      <img class="dmg-bg" src="@/assets/bg-reptile.png" width="55" />
      <div class="dmg">
        <h2>{{ card.dmg }}</h2>
      </div>
      <img class="shield-bg" src="@/assets/bg-reptile.png" width="55" />
      <div class="shield">
        <h2>{{ card.shield }}</h2>
      </div>
      <div class="description">
        <span>{{ card.description }}</span>
      </div>
      <img class="effect" :src="getImgEffectUrl(card.effect.image)" width="25" />
    </div>
  </div>
</template>
<style scoped>
.parts {
  color: black;
  display: block;
}
.card {
  text-align: center;
  position: relative;
  color: white;
  min-width: 260px;
  max-width: 260px;
}
.effect {
  position: absolute;
  top: 76%;
  left: 6%;
}
.dmg-bg {
  position: absolute;
  top: 21%;
  left: -4%;
}
.shield-bg {
  position: absolute;
  top: 40%;
  left: -4%;
}
.name {
  position: absolute;
  top: 8%;
  left: 29%;
}
.cost {
  -webkit-text-stroke: 2px black; /* width and color */
  position: absolute;
  left: 12%;
  top: 3%;
}
.dmg {
  width: 45px;
  position: absolute;
  top: 25%;
  left: -1%;
  color: red;
}
.shield {
  width: 45px;
  position: absolute;
  top: 44%;
  left: -1%;
  color: green;
}
.description {
  font-size: 15px;
  position: absolute;
  left: 17%;
  top: 66%;
  width: 71%;
}
</style>
<script>
import AxiePartIcon from "./icons/AxiePartIcon.vue";
import { AxieTypeSelect } from "@/game/data/data.js";
export default {
  name: "AxieCard",
  components: { AxiePartIcon },
  props: {
    card: { type: Object, default: () => {} },
    showParts: { type: Boolean, default: false },
  },
  data: () => ({}),
  computed: {
    partColor: function () {
      return AxieTypeSelect[this.card.parts[0].axieType].color;
    },
    cardColor: function () {
      return {
        "color-aquatic": this.card.isAquatic(),
        "color-beast": this.card.isBeast(),
        "color-bug": this.card.isBug(),
        "color-bird": this.card.isBird(),
        "color-plant": this.card.isPlant(),
        "color-reptile": this.card.isReptile(),
        "color-mech": this.card.isMech(),
        "color-dawn": this.card.isDawn(),
        "color-dusk": this.card.isDusk(),
      };
    },
  },
  methods: {
    getImgUrl(img) {
      let images = require.context("../assets/cards/", false, /\.png$/);
      return images("./" + img);
    },
    getImgEffectUrl(img) {
      let images = require.context("../assets/icons/", false, /\.png$/);
      return images("./" + img);
    },
  },
};
</script>
