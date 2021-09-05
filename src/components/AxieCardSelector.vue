<template>
  <v-container>
    <v-row>
      <v-autocomplete
        v-model="selectedCards"
        :items="cards"
        :filter="filter"
        chips
        deletable-chips
        multiple
        item-text="name"
        return-object
        counter="4"
        v-on:input="change"
        hint="Example: COST:1 NAME:Shelter ATK:0 DEF:115 ATKTYPE:MELEE DESCRIPTION:Disable ELEMENT:aquatic PART:hermit"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            :color="axieTypeSelect[data.item.element].color"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            {{ data.item.name }}
            <AxiePartIcon
              :axieType="data.item.element"
              :partType="data.item.parts[0].part"
            />
          </v-chip>
        </template>
        <template slot="item" slot-scope="data">
          <AxieCardSmall :card="data.item" />
        </template>
      </v-autocomplete>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import { getCardsList, AxieTypeSelect, CardAttackType } from "@/game/data/data.js";
import AxieCardSmall from "./AxieCardSmall.vue";
import AxiePartIcon from "./icons/AxiePartIcon.vue";
export default {
  name: "AxieCardSelector",
  components: {
    AxieCardSmall,
    AxiePartIcon,
  },
  props: {
    axie: { type: Object, default: () => {} },
  },
  data: () => ({
    cards: getCardsList(),
    selectedCards: [],
    axieTypeSelect: AxieTypeSelect,
  }),
  methods: {
    filter(item, queryText) {
      let partsNames = "";
      for (let i = 0; i < item.parts.length; i++) {
        partsNames += item.parts[i].name;
      }
      let elementName = AxieTypeSelect[item.element].text;
      let attackType = Object.keys(CardAttackType)[item.attackType];
      return (
        `COST:${item.cost}$NAME:${item.name}ATK:${item.dmg}DEF:${item.shield}ATKTYPE:${attackType}DESCRIPTION:${item.description}ELEMENT:${elementName}PART:${partsNames}`
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    remove(item) {
      for (let i = 0; i < this.selectedCards.length; i++) {
        if (this.selectedCards[i].id === item.id) {
          this.selectedCards.splice(i, 1);
          this.$emit("change", this.selectedCards);
          return;
        }
      }
    },
    change(items) {
      if (items.length > 4) {
        items.pop();
        return;
      }
      let existingParts = {};
      for (let i = 0; i < items.length; i++) {
        if (existingParts[items[i].parts[0].part] != null) {
          items.pop();
          return;
        } else {
          existingParts[items[i].parts[0].part] = items[i].parts[0].part;
        }
      }
      this.$emit("change", items);
    },
  },
};
</script>
