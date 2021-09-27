<template>
  <v-container>
    <v-row>
      <v-autocomplete
        v-model="selectedParts"
        :items="listItems"
        :filter="filter"
        chips
        deletable-chips
        multiple
        item-text="name"
        return-object
        counter="6"
        v-on:input="change"
        label="Parts"
        hint="Example: COST:1 NAME:Shelter ATK:0 DEF:115 ATKTYPE:MELEE DESCRIPTION:Disable ELEMENT:aquatic PART:hermit"
        placeholder="Click to select parts, type to filter them out."
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            :color="axieTypeSelect[data.item.axieType].color"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            {{ data.item.name }}
            <AxiePartIcon
              :axieType="data.item.axieType"
              :partType="
                data.item.parts ? data.item.parts[0].type : data.item.type
              "
            />
          </v-chip>
        </template>
        <template slot="item" slot-scope="data">
          <AxieCardListItem :cardOrPart="data.item" v-if="!data.item.hidden" />
          <div v-else></div>
        </template>
      </v-autocomplete>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import {
  getCardsList,
  getPartsList,
  AxieTypeSelect,
  CardAttackType,
  AxiePartType,
} from "@/game/data/data.js";
import AxieCardListItem from "./AxieCardListItem.vue";
import AxiePartIcon from "@/components/icons/AxiePartIcon.vue";
export default {
  name: "AxieCardSelector",
  components: {
    AxieCardListItem,
    AxiePartIcon,
  },
  props: {
    axie: { type: Object, default: () => {} },
  },
  data: () => ({
    listItems: [],
    cards: getCardsList(),
    parts: getPartsList(),
    selectedParts: [],
    axieTypeSelect: AxieTypeSelect,
  }),
  methods: {
    filter(item, queryText) {
      let partsNames = "";
      for (let i = 0; i < item.parts.length; i++) {
        partsNames += item.parts[i].name;
      }
      let elementName = AxieTypeSelect[item.axieType].text;
      let attackType = Object.keys(CardAttackType)[item.attackType];
      return (
        `COST:${item.cost}$NAME:${item.name}ATK:${item.dmg}DEF:${item.shield}ATKTYPE:${attackType}DESCRIPTION:${item.description}ELEMENT:${elementName}PART:${partsNames}`
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    remove(item) {
      for (let i = 0; i < this.selectedParts.length; i++) {
        if (this.selectedParts[i].id === item.id) {
          this.selectedParts.splice(i, 1);
          this.toggleItemVisibility();
          this.$emit("change", this.selectedParts);
          return;
        }
      }
    },
    change(items) {
      if (items.length > 6) {
        items.pop();
        return;
      }
      let existingParts = {};
      for (let i = 0; i < items.length; i++) {
        if (items[i].parts == null) {
          if (existingParts[items[i].type] != null) {
            items.pop();
            return;
          } else {
            existingParts[items[i].type] = items[i].type;
          }
        } else {
          if (existingParts[items[i].parts[0].type] != null) {
            items.pop();
            return;
          } else {
            existingParts[items[i].parts[0].type] = items[i].parts[0].type;
          }
        }
      }

      this.toggleItemVisibility();
      this.$emit("change", items);
    },
    toggleItemVisibility() {
      this.listItems = this.listItems.map((item) => {
        let itemPart = item.parts ? item.parts[0].type : item.type;
        let index = this.selectedParts.findIndex(
          (part) => part.type === itemPart
        );
        item.hidden = index !== -1;
        return item;
      });
      this.listItems = this.listItems.sort((a, b) => {
        if (a.hidden && !b.hidden) return 1;
        else if (!a.hidden && b.hidden) return -1;
        else return 0;
      });
    },
  },
  created() {
    let earsAndEyes = this.parts.filter(
      (part) =>
        part.type === AxiePartType.EYES || part.type === AxiePartType.EARS
    );
    this.listItems = earsAndEyes.concat(this.cards);
  },
};
</script>
