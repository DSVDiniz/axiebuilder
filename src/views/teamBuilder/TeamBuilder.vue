<template>
  <v-card>
    <v-container>
      <v-tabs>
        <v-tab v-for="(axie, index) in team" :key="index + 'team_tab'">
          Axie {{ index + 1 }}
          <AxieTypeIcon :axieType="axie.type" />
        </v-tab>

        <v-tab-item v-for="(axie, index) in team" :key="index + 'team'">
          <v-row>
            <v-col>
              <Axie :axie="axie" v-on:change="change"></Axie>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-card>
</template>

<script>
import { AxiePosition, AxieTypeEnum } from "@/game/data/data";
import Axie from "./components/Axie.vue";
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import AxieClass from "@/game/axie";
export default {
  name: "TeamBuilder",
  components: {
    Axie,
    AxieTypeIcon,
  },
  props: {
    team: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  methods: {
    change(axie) {
      this.team[axie.id] = axie;
    },
  },
  created() {
    let axie1 = new AxieClass();
    axie1.initialize(0, AxiePosition.CENTER, AxieTypeEnum.AQUATIC, []);
    let axie2 = new AxieClass();
    axie2.initialize(1, AxiePosition.CENTER, AxieTypeEnum.AQUATIC, []);
    let axie3 = new AxieClass();
    axie3.initialize(2, AxiePosition.CENTER, AxieTypeEnum.AQUATIC, []);
    this.team.push(axie1);
    this.team.push(axie2);
    this.team.push(axie3);
  },
};
</script>

<style scoped></style>
