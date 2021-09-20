<template>
  <v-dialog v-model="open" persistent>
    <v-card>
      <div v-if="winners.length === 1">
        {{ winners[0].id === 0 ? "PLAYER1 VICTORY" : "PLAYER2 VICTORY" }}
      </div>
      <div v-else>DRAW</div>
    </v-card>
  </v-dialog>
</template>
<style scoped>
</style>
<script>
export default {
  name: "VictoryDialog",
  components: {},
  props: {
    open: { type: Boolean, default: false },
    winners: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
  created() {},
  mounted() {},
};
</script>
