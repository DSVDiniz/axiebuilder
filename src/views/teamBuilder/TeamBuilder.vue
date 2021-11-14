<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="6">
          <div class="title">
            Teams
            <v-btn :disabled="!hasAxies" :to="'/teamBuilder/axieChooser/'">
              + New Team
            </v-btn>
          </div>
          <v-row>
            <v-col
              cols="12"
              v-for="(team, index1) in teams"
              :key="'team' + index1"
            >
              <v-card
                class="team-card"
                :to="'/teamBuilder/axieChooser/' + index1"
              >
                <v-row>
                  <v-col
                    v-for="(axie, index2) in team"
                    :key="'axie' + index2 + '-team' + index1"
                  >
                    {{ axie.name }}
                    <AxieTypeIcon :axieType="axie.type" />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <div class="title">
            Axies <v-btn :to="'/teamBuilder/axieBuilder/'"> + New Axie</v-btn>
          </div>
          <v-row>
            <v-col v-for="(axie, index) in axies" :key="'axie-team' + index">
              <v-card
                class="axie-card"
                :to="'/teamBuilder/axieBuilder/' + axie.id"
              >
                {{ axie.name }}
                <AxieTypeIcon :axieType="axie.type" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style scoped>
.title {
  margin-bottom: 10px;
}
.axie-card {
  display: flex;
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;
}
.team-card {
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
}
</style>
<script>
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import teamStore from "./store/teamStore.js";
export default {
  name: "TeamBuilder",
  store: teamStore,
  components: {
    AxieTypeIcon,
  },
  props: {},
  data() {
    return {};
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
  methods: {},
  created() {},
};
</script>

<style scoped></style>
