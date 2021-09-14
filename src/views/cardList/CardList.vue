<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="filter.part"
          label="Body Part Type"
          :items="bodyPartTypes"
          @input="changeFilter"
          clearable
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="filter.attackType"
          label="Attack Type"
          :items="attackTypes"
          @input="changeFilter"
          clearable
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="filter.element"
          label="Axie Type"
          :items="axieTypes"
          @input="changeFilter"
          clearable
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="filter.dmg"
          label="Damage"
          :items="damageList"
          @input="changeFilter"
          clearable
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="filter.shield"
          label="Shield"
          :items="shieldList"
          @input="changeFilter"
          clearable
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="filter.cost"
          label="Energy cost"
          :items="energyCosts"
          @input="changeFilter"
          clearable
        >
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="filter.text"
          label="Card name, part name or card description"
          @input="changeFilter"
          clearable
          placeholder="Card name, part name or card description"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(card, index) in filteredCards" :key="index" cols="2">
        <AxieCard :card="card" :showParts="true"></AxieCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  Cards,
  AxieTypeSelect,
  CardAttackTypeSelect,
  AxiePartTypeSelect,
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
      bodyPartTypes: AxiePartTypeSelect,
      attackTypes: CardAttackTypeSelect,
      axieTypes: AxieTypeSelect,
      damageList: [],
      shieldList: [],
      energyCosts: [],
      filter: {
        part: null,
        attackType: null,
        element: null,
        dmg: null,
        shield: null,
        cost: null,
        text: null,
      },
      filteredCards: [],
    };
  },
  methods: {
    changeFilter() {
      const vm = this;
      if(vm.filter.text === "")
        vm.filter.text = null;
      let filterArr = Object.keys(vm.filter).filter(
        (key) => vm.filter[key] != null
      );

      vm.filteredCards = Object.values(vm.cardMap).filter((card) => {
        let achou = true;
        for (let i = 0; i < filterArr.length; i++) {
          let key = filterArr[i];
          if (key === "part") {
            for (let j = 0; j < card["parts"].length; j++) {
              if (card["parts"][j].type != vm.filter[key]) achou = false;
            }
          } else if (key === "text") {
            let cardText = `${card.name}${card.description}`;
            cardText = cardText.concat(card["parts"].map(part=>part.name).join()).toLowerCase();
            achou = cardText.includes(vm.filter[key]);
          } else {
            if (card[key] != vm.filter[key]) achou = false;
          }
        }
        return achou;
      });
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
