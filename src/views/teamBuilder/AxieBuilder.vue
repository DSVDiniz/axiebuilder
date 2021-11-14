<template>
  <v-card>
    <v-container>
      <Axie :axie="axie" />
      <v-btn
        class="mt-2"
        block
        :color="'green'"
        :disabled="!canSaveAxie(axie)"
        @click="saveAxie(axie)"
      >
        Save Axie
      </v-btn>
    </v-container>
  </v-card>
</template>
<style scoped>
</style>
<script>
import Axie from "./components/Axie";
import teamStore from "./store/teamStore.js";
export default {
  name: "AxieBuilder",
  store: teamStore,
  components: { Axie },
  props: { id: { type: String, default: null } },
  data() {
    return { axie: null };
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    },
    axies() {
      return this.$store.state.axies;
    },
    hasAxies() {
      return this.$store.state.axies.length > 0;
    },
  },
  methods: {
    isEditingExistingAxie() {
      return this.id;
    },
    canSaveAxie(axie) {
      return axie && axie.isValid();
    },
    saveAxie(axie) {
      this.$store.commit("pushAxie", axie);
      this.axie = null;
      let id = this.$store.state.count;
      axie.id = id;
      this.$store.state.count = id++;
      this.$router.go(-1);
    },
    newAxieOrEditing() {
      let numberId = parseInt(this.id);
      if (this.isEditingExistingAxie()) {
        this.axie = this.$store.getters.getAxie(numberId);
      } else {
        this.axie = this.$store.getters.getNewAxie();
      }
    },
  },
  mounted() {
    this.newAxieOrEditing();
  },
  created() {
    this.newAxieOrEditing();
  },
};
</script>

<style scoped></style>
