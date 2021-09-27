<template>
  <div class="card">
    <img :src="getImgUrl(card.image)" width="50px" />
    <div class="dmg-shield">
      <span class="dmg">
        <h2>{{ card.dmg }}</h2>
      </span>
      <span>/</span>
      <span class="shield">
        <h2>{{ card.shield }}</h2>
      </span>
    </div>
  </div>
</template>
<style scoped>
.card {
  text-align: center;
  position: relative;
  color: white;
  font-size: 10px;
}
.dmg-shield {
  position: absolute;
  top: 62%;
  left: 5%;
  width: 46px;
  font-size: 10px;
  display: flex;
}
.dmg {
  color: red;
}
.shield {
  color: green;
}
</style>
<script>
export default {
  name: "AxieCardExtraSmall",
  components: {},
  props: {
    card: { type: Object, default: () => {} },
  },
  data: () => ({}),
  computed: {},
  methods: {
    getImgUrl(img) {
      let images = require.context("@/assets/cards/", false, /\.png$/);
      return images("./" + img);
    },
  },
};
</script>
