import Vuex from "vuex";
import Vue from "vue";
import { AxiePosition, AxieTypeEnum } from "@/game/data/data";
import AxieClass from "@/game/axie";
Vue.use(Vuex);
// let axie1 = new AxieClass();
// axie1.initialize(0, AxiePosition.LEFT, AxieTypeEnum.AQUATIC, []);
// let axie2 = new AxieClass();
// axie2.initialize(1, AxiePosition.CENTER, AxieTypeEnum.AQUATIC, []);
// let axie3 = new AxieClass();
// axie3.initialize(2, AxiePosition.RIGHT, AxieTypeEnum.AQUATIC, []);
export default new Vuex.Store({
  state: {
    count: 0,
    // teams: [[axie1, axie2, axie3]],
    // axies: [axie1, axie2, axie3],
    teams: [],
    axies: [],
  },
  mutations: {
    pushAxie(state, axie) {
      state.axies.push(axie);
    },
    pushTeam(state, axies) {
      state.teams.push(axies);
    },
    editTeam(state, axies, teamId) {
      state.teams[teamId] = axies;
    },
  },
  getters: {
    getAxie: (state, getters) => (id) => {
      return state.axies.find((axie) => axie.id === id);
    },
    getNewAxie: (state, getters) => () => {
      return new AxieClass();
    },
  },
});
