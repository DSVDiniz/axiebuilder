<template>
  <div>
    <div><span class="small-title">Energy</span>{{ energy }}/10</div>
    <div><span class="small-title">Hand</span>{{ handLength }}</div>
    <div><span class="small-title">Deck</span>{{ deckLength }}</div>
    <div><span class="small-title">Cemetery</span>{{ cemeteryLength }}</div>
  </div>
</template>
<style scoped>
.small-title {
  font-size: 10px;
  display: block;
}
</style>
<script>
export default {
  name: "PlayerStats",
  components: {},
  props: {
    energy: { type: Number, default: 0 },
    handLength: { type: Number, default: 0 },
    deckLength: { type: Number, default: 0 },
    cemeteryLength: { type: Number, default: 0 },
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>