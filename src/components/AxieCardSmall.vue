<template>
  <div class="card">
    <img :src="getImgUrl(card.image)" width="100px" />
    <h3 class="name">{{ card.name }}</h3>
    <h1 class="cost">{{ card.cost }}</h1>
    <img class="dmg-bg" src="@/assets/bg-reptile.png" width="25" />
    <div class="dmg">
      <h2>{{ card.dmg }}</h2>
    </div>
    <img class="shield-bg" src="@/assets/bg-reptile.png" width="25" />
    <div class="shield">
      <h2>{{ card.shield }}</h2>
    </div>
    <div class="description">
      <span>{{ card.description }}</span>
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
  font-size: 10px;
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
  top: 7%;
  left: 29%;
  font-size: 8px;
}
.cost {
  color: black;
  position: absolute;
  left: 8%;
  top: 0%;
}
.dmg {
  width: 42px;
  position: absolute;
  top: 23%;
  left: -11%;
  color: red;
}
.shield {
  width: 40px;
  position: absolute;
  top: 43%;
  left: -11%;
  color: green;
}
.description {
  font-size: 7px;
  position: absolute;
  left: 17%;
  top: 66%;
  width: 71%;
}
</style>
<script>
export default {
  name: "AxieCardSmall",
  components: {},
  props: {
    card: { type: Object, default: () => {} },
  },
  data: () => ({}),
  computed: {},
  methods: {
    getImgUrl(img) {
      let images = require.context("../assets/cards/", false, /\.png$/);
      return images("./" + img);
    },
  },
};
</script>
