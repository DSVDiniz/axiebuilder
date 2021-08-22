<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-chip class="chip-size" color="#42d048" label dark> HEALTH </v-chip>
        {{ axie.health }}
      </v-col>
      <v-col cols="6">
        <v-chip class="chip-size" color="#ffb333" label dark> SPEED </v-chip>
        {{ axie.speed }}
      </v-col>
      <v-col cols="6">
        <v-chip class="chip-size" color="#9427ff" label dark> SKILL </v-chip>
        {{ axie.skill }}
      </v-col>
      <v-col cols="6">
        <v-chip class="chip-size" color="#c10000" label dark> MORALE </v-chip>
        {{ axie.morale }}
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.chip-size {
  width: 80px;
  text-align: center;
  margin-right: 10px;
}
</style>
<script>
export default {
  name: "AxieAttributes",
  props: {
    axie: { type: Object, default: () => {} },
  },
  data: () => ({}),
  methods: {},
};
</script>
