<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="filter.bodyPartType"
          label="Body Part Type"
          :items="bodyPartTypes"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="filter.attackType"
          label="Attack Type"
          :items="attackTypes"
        ></v-select>
      </v-col>
      <v-col
        ><v-select
          v-model="filter.axieType"
          label="Axie Type"
          :items="axieTypes"
        ></v-select
      ></v-col>
      <v-col
        ><v-select
          v-model="filter.damage"
          label="Damage"
          :items="damageList"
        ></v-select
      ></v-col>
      <v-col
        ><v-select
          v-model="filter.shield"
          label="Shield"
          :items="shieldList"
        ></v-select
      ></v-col>
      <v-col>
        <v-select
          v-model="filter.energy"
          label="Energy cost"
          :items="energyCosts"
        ></v-select>
      </v-col>
      <v-col cols="12"
        ><v-text-field v-model="filter.text" label="Search"></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col v-for="(card, index) in cardMap" :key="index" cols="2">
        <AxieCard :card="card" :showParts="true"></AxieCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  Cards,
  AxieTypeEnum,
  CardAttackType,
  AxiePartType,
} from "@/game/data/data.js";
import AxieCard from "../../components/AxieCard.vue";
export default {
  name: "CardList",
  components: {
    AxieCard,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      cardMap: Cards,
      bodyPartTypes: Object.keys(AxiePartType),
      attackTypes: Object.keys(CardAttackType),
      axieTypes: Object.keys(AxieTypeEnum),
      damageList: [],
      shieldList: [],
      energyCosts: [],
      filter: {
        bodyPartType: null,
        attackType: null,
        axieType: null,
        damage: null,
        shield: null,
        energy: null,
        text: null,
      },
    };
  },
  methods: {
    changeFilter() {},
  },
  created() {
    let cardList = Object.values(this.cardMap);
    let damageMap = {};
    cardList.map((card) => (damageMap[card.dmg] = card.dmg));
    this.damageList = Object.keys(damageMap);

    let shieldMap = {};
    cardList.map((card) => (shieldMap[card.shield] = card.shield));
    this.shieldList = Object.keys(shieldMap);

    let costMap = {};
    cardList.map((card) => (costMap[card.cost] = card.shield));
    this.energyCosts = Object.keys(costMap);
  },
};
</script>

<style scoped></style>
