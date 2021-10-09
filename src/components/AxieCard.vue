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
            marginLeft: currentCardDimension.cost.marginLeft,
            marginTop: currentCardDimension.cost.marginTop,
          }"
        >
          {{ card.cost }}
        </div>
        <div
          class="name"
          :style="{
            fontSize: currentCardDimension.title.fontSize,
            marginTop: currentCardDimension.title.marginTop,
            marginLeft: currentCardDimension.title.marginLeft,
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
            width: currentCardDimension.atkDef.width,
            height: currentCardDimension.atkDef.height,
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
            width: currentCardDimension.atkDef.width,
            height: currentCardDimension.atkDef.height,
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
          :style="{
            width: currentCardDimension.icon.size,
            left: currentCardDimension.icon.left,
            top: currentCardDimension.icon.top,
          }"
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
}
.name {
  float: left;
}
.dmg {
  position: absolute;
  color: red;
  background-image: url("../assets/bg-reptile.png");
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shield {
  position: absolute;
  color: green;
  background-image: url("../assets/bg-reptile.png");
  background-size: contain;
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
        width: "100px",
        height: "150px",
        icon: {
          size: "20px",
          top: "29%",
          left: "5%",
        },
        title: {
          fontSize: "15px",
          marginTop: "7%",
          marginLeft: "11%",
        },
        cost: {
          fontSize: "30px",
          marginLeft: "10%",
          marginTop: "7%",
        },
        description: {
          fontSize: "12px",
          top: "-20%",
          left: 0,
        },
        atkDef: {
          fontSize: "20px",
          height: "50px",
          width: "42px",
          top1: "0%",
          left1: "-7%",
          top2: "40%",
          left2: "-7%",
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
          marginTop: "7%",
          marginLeft: "11%",
        },
        cost: {
          fontSize: "30px",
          marginLeft: "10%",
          marginTop: "7%",
        },
        description: {
          fontSize: "12px",
          top: "-20%",
          left: 0,
        },
        atkDef: {
          fontSize: "20px",
          height: "50px",
          width: "42px",
          top1: "0%",
          left1: "-7%",
          top2: "40%",
          left2: "-7%",
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
          fontSize: "20px",
          marginTop: "9%",
          marginLeft: "11%",
        },
        cost: {
          fontSize: "45px",
          marginLeft: "10%",
          marginTop: "9%",
        },
        description: {
          fontSize: "15px",
          top: 0,
          left: 0,
        },
        atkDef: {
          fontSize: "23px",
          height: "64px",
          width: "57px",
          top1: "0%",
          left1: "-7%",
          top2: "40%",
          left2: "-7%",
        },
      },
    },
    currentCardDimension: {},
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
