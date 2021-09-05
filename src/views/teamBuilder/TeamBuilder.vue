<template>
  <v-card>
    <v-tabs>
      <v-tab v-for="(axie, index) in team" :key="index + 'team_tab'">
        Axie {{index+1}} 
        <AxieTypeIcon :axieType="axie.type"/>
      </v-tab>

      <v-tab-item v-for="(axie, index) in team" :key="index + 'team'">
        <v-row>
          <v-col>
            <Axie :axie="axie" v-on:change="change"></Axie>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Axie from "../../components/Axie.vue";
import AxieTypeIcon from '../../components/icons/AxieTypeIcon.vue';
import AxieClass from "@/game/axie";
export default {
  name: "TeamBuilder",
  components: {
    Axie,
    AxieTypeIcon
  },
  props: {
    team: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  methods:{
    change(axie){
      this.team[axie.id] = axie;
    }
  },
  created() {
    this.team.push(new AxieClass(0));
    this.team.push(new AxieClass(1));
    this.team.push(new AxieClass(2));
  },
};
</script>

<style scoped></style>
