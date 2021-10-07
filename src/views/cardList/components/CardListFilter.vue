<template>
  <v-container>
    <v-row>
      <v-col class="no-padding-top-bottom">
        <v-select
          v-model="filter.part"
          label="Body Part Type"
          :items="bodyPartTypes"
          @input="changeFilter"
          clearable
          dense
        >
        </v-select>
      </v-col>
      <v-col class="no-padding-top-bottom">
        <v-select
          v-model="filter.attackType"
          label="Attack Type"
          :items="attackTypes"
          @input="changeFilter"
          clearable
          dense
        >
        </v-select>
      </v-col>
      <v-col class="no-padding-top-bottom">
        <v-select
          v-model="filter.axieType"
          label="Axie Type"
          :items="axieTypes"
          @input="changeFilter"
          clearable
          dense
        >
        </v-select>
      </v-col>
      <v-col class="no-padding-top-bottom">
        <v-select
          v-model="filter.dmg"
          label="Damage"
          :items="damageList"
          @input="changeFilter"
          clearable
          dense
        >
        </v-select>
      </v-col>
      <v-col class="no-padding-top-bottom">
        <v-select
          v-model="filter.shield"
          label="Shield"
          :items="shieldList"
          @input="changeFilter"
          clearable
          dense
        >
        </v-select>
      </v-col>
      <v-col class="no-padding-top-bottom">
        <v-select
          v-model="filter.cost"
          label="Energy cost"
          :items="energyCosts"
          @input="changeFilter"
          clearable
          dense
        >
        </v-select>
      </v-col>
      <v-col class="no-padding-top-bottom">
        <v-select
          v-model="filter.effect"
          label="Effect"
          :items="cardEffect"
          @input="changeFilter"
          clearable
          dense
        >
        </v-select>
      </v-col>
      <v-col cols="12" class="no-padding-top-bottom">
        <v-text-field
          dense
          v-model="filter.text"
          label="Card name, part name or card description"
          @input="changeFilter"
          clearable
          placeholder="Card name, part name or card description"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.no-padding-top-bottom {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
<script>
import {
  Cards,
  AxieTypeSelect,
  CardAttackTypeSelect,
  AxiePartTypeSelect,
  CardEffect,
} from "@/game/data/data.js";
export default {
  name: "CardListFilter",
  data() {
    return {
      cardMap: Cards,
      bodyPartTypes: AxiePartTypeSelect,
      attackTypes: CardAttackTypeSelect,
      axieTypes: AxieTypeSelect,
      damageList: [],
      shieldList: [],
      energyCosts: [],
      cardEffect: Object.values(CardEffect),
      filter: {
        part: null,
        attackType: null,
        axieType: null,
        dmg: null,
        shield: null,
        cost: null,
        text: null,
        effect: null,
      },
    };
  },
  methods: {
    changeFilter() {
      const vm = this;
      if (vm.filter.text === "") vm.filter.text = null;
      this.$emit("filterChange", this.filter);
    },
  },
  created() {
    let cardList = Object.values(this.cardMap);
    this.filteredCards = cardList;
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
