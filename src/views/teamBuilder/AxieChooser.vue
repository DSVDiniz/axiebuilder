<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="6">
          <div class="title">Team</div>
          <v-card>
            <v-row v-for="(axie, index) in selected" :key="'selector' + index">
              <v-row>
                <v-col>
                  <AxieTypeIcon class="axie-card" :axieType="axie.type" />
                </v-col>
                <v-col>
                  <AxiePositionSelector
                    :position="axie.position"
                    :axieIndex="index"
                    v-on:change="changeAxiePosition"
                  />
                </v-col>
              </v-row>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <div class="title">Axies</div>
          <v-row>
            <v-col v-for="(axie, index) in axies" :key="'axie-team' + index">
              <v-card
                class="axie-card"
                :color="getSelectedColor(axie)"
                @click="toggleAxie(index)"
              >
                <AxieTypeIcon :axieType="axie.type" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            block
            :disabled="!isTeamValid(selected)"
            :color="'green'"
            @click="saveTeam(selected)"
          >
            Save Team
          </v-btn>
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
import AxiePositionSelector from "./components/AxiePositionSelector";
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import teamStore from "./store/teamStore.js";
export default {
  name: "AxieChooser",
  store: teamStore,
  components: {
    AxieTypeIcon,
    AxiePositionSelector,
  },
  props: {
    teamId: { type: String, default: null },
  },
  data() {
    return { axies: [], selected: [] };
  },
  computed: {},
  methods: {
    getSelectedColor(axie) {
      return axie.selected ? "blue" : "white";
    },
    toggleAxie(index) {
      this.axies[index].selected = !this.axies[index].selected;
      this.axies = [...this.axies];
      this.selected = this.axies.filter((ax) => ax.selected);
    },
    isTeamValid(team) {
      let mapPositions = {};
      team.forEach((ax) => {
        mapPositions[ax.position] = ax.position;
      });
      return Object.keys(mapPositions).length === 3;
    },
    changeAxiePosition(position, index) {
      this.selected[index].position = position;
    },
    saveTeam(selected) {
      if (this.isEditingTeam()) {
        this.$store.commit("editTeam", selected, this.teamId);
      } else {
        this.$store.commit("pushTeam", selected);
      }
      this.$router.go(-1);
    },
    isEditingTeam() {
      return this.teamId;
    },
  },
  created() {
    if (this.isEditingTeam()) {
      this.selected = this.$store.state.teams[parseInt(this.teamId)];
    } else {
      this.selected = [];
    }
    this.axies = this.$store.state.axies;
  },
};
</script>

<style scoped></style>
