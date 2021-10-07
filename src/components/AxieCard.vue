<template>
  <div>
    <div
      v-if="showParts"
      class="parts"
      :style="{
        maxWidth: currentCardDimension.width,
      }"
    >
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
    <div
      @click="select"
      class="card-container card"
      :style="{
        backgroundImage: 'url(' + getImgUrl(card.image) + ')',
        backgroundSize:
          currentCardDimension.width + ' ' + currentCardDimension.height,
        width: currentCardDimension.width,
        height: currentCardDimension.height,
        maxWidth: currentCardDimension.width,
      }"
    >
      <div class="title" @click="select">
        <div
          class="cost"
          :style="{
            fontSize: currentCardDimension.cost.fontSize,
            top: currentCardDimension.cost.top,
            left: currentCardDimension.cost.left,
          }"
        >
          {{ card.cost }}
        </div>
        <div
          class="name"
          :style="{
            fontSize: currentCardDimension.title.fontSize,
            top: currentCardDimension.title.top,
            left: currentCardDimension.title.left,
          }"
        >
          {{ card.name }}
        </div>
      </div>
      <div class="center">
        <div
          class="dmg"
          :style="{
            fontSize: currentCardDimension.atkDef.fontSize,
            top: currentCardDimension.atkDef.top1,
            left: currentCardDimension.atkDef.left1,
          }"
        >
          <div>{{ card.dmg }}</div>
        </div>
        <div
          class="shield"
          :style="{
            fontSize: currentCardDimension.atkDef.fontSize,
            top: currentCardDimension.atkDef.top2,
            left: currentCardDimension.atkDef.left2,
          }"
        >
          <div>{{ card.shield }}</div>
        </div>
      </div>
      <div class="description" @click="select">
        <div
          class="description"
          :style="{
            fontSize: currentCardDimension.description.fontSize,
            top: currentCardDimension.description.top,
            left: currentCardDimension.description.left,
          }"
        >
          <span>{{ card.description }}</span>
        </div>
        <img
          class="effect"
          :src="getImgEffectUrl(card.effect.image)"
          :width="currentCardDimension.icon.size"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
/* ------------- */
.title {
  grid-area: title;
  color: white;
}
.center {
  grid-area: center;
  position: relative;
}
.description {
  grid-area: description;
  position: relative;
  color: white;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 3%;
}
.effect {
  position: absolute;
  top: 29%;
  left: 5%;
}
.card-container {
  display: grid;
  grid-template-rows: 2fr 5fr 3fr;
  grid-template-areas:
    "title"
    "center"
    "description";
}
.card-container > div {
  text-align: center;
}
.parts {
  color: black;
  display: block;
}
.cost {
  float: left;
  margin-left: 10%;
  margin-top: 9%;
}
.name {
  float: left;
  margin-top: 9%;
  margin-left: 11%;
}
.dmg {
  position: absolute;
  color: red;
  top: 10%;
  left: -7%;
  background-image: url("../assets/bg-reptile.png");
  background-size: contain;
  width: 57px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shield {
  position: absolute;
  color: green;
  top: 50%;
  left: -7%;
  background-image: url("../assets/bg-reptile.png");
  background-size: contain;
  width: 57px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    size: { type: String, default: "big" },
  },
  data: () => ({
    cardDimensions: {
      small: {
        width: 0,
        height: 0,
        icon: {
          size: 0,
          top: 0,
          left: 0,
        },
        title: {
          fontSize: 0,
          top: 0,
          left: 0,
        },
        cost: {
          fontSize: 0,
          top: 0,
          left: 0,
        },
        description: {
          fontSize: 0,
          top: 0,
          left: 0,
        },
        atkDef: {
          fontSize: 0,
          top1: 0,
          left1: 0,
          top2: 0,
          left2: 0,
        },
      },
      medium: {
        width: "210px",
        height: "280px",
        icon: {
          size: "20px",
          top: "29%",
          left: "5%",
        },
        title: {
          fontSize: "15px",
          top: 0,
          left: 0,
        },
        cost: {
          fontSize: "30px",
          top: 0,
          left: 0,
        },
        description: {
          fontSize: "12px",
          top: 0,
          left: 0,
        },
        atkDef: {
          fontSize: "20px",
          top1: 0,
          left1: 0,
          top2: 0,
          left2: 0,
        },
      },
      big: {
        width: "300px",
        height: "400px",
        icon: {
          size: "25px",
          top: "29%",
          left: "5%",
        },
        title: {
          fontSize: "40px",
          top: 0,
          left: 0,
        },
        cost: {
          fontSize: "20px",
          top: 0,
          left: 0,
        },
        description: {
          fontSize: "15px",
          top: 0,
          left: 0,
        },
        atkDef: {
          fontSize: "23px",
          top1: 0,
          left1: 0,
          top2: 0,
          left2: 0,
        },
      },
    },
    currentCardDimension: {
      width: 300,
      height: 400,
      iconSize: 25,
      titleFontSize: 40,
      costFontSize: 20,
      descriptionFontSize: 15,
      atkDefFontSize: 23,
    },
  }),
  computed: {
    partColor: function () {
      return AxieTypeSelect[this.card.parts[0].axieType].color;
    },
  },
  methods: {
    select() {
      this.$emit("select", this.card);
    },
    getImgUrl(img) {
      let images = require.context("@/assets/cards/", false, /\.png$/);
      return images("./" + img);
    },
    getImgEffectUrl(img) {
      let images = require.context("@/assets/icons/", false, /\.png$/);
      return images("./" + img);
    },
  },
  created() {
    this.currentCardDimension = this.cardDimensions[this.size];
  },
};
</script>
