<template>
  <v-container>
    <v-row>
      <v-autocomplete
        :items="parts"
        v-model="selectedParts"
        :filter="filter"
        multiple
        chips
        deletable-chips
        item-text="name"
        return-object
        counter="6"
        v-on:input="change"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            :color="axieTypeSelect[data.item.type].color"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            {{ data.item.name }}
            <AxiePartIcon
              :axieType="data.item.type"
              :partType="data.item.part"
            />
          </v-chip>
        </template>
        <template slot="item" slot-scope="data">
          <AxiePartIcon
            :axieType="data.item.type"
            :partType="data.item.part"
          />{{ data.item.name }}
        </template>
      </v-autocomplete>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import AxiePartIcon from "./icons/AxiePartIcon.vue";
import {
  getPartsList,
  AxieTypeSelect,
  AxieTypeEnum,
  AxiePartType,
} from "@/game/data/data.js";
export default {
  name: "AxiePartsSelector",
  components: { AxiePartIcon },
  props: {
    axie: { type: Object, default: () => {} },
  },
  data: () => ({
    parts: getPartsList(),
    selectedParts: [],
    axieTypeSelect: AxieTypeSelect,
  }),
  methods: {
    filter(item, queryText) {
      let typeName = Object.keys(AxieTypeEnum)[item.type];
      let partTypeName = Object.keys(AxiePartType)[item.part];
      return (
        `${item.name}${typeName}${partTypeName}`
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    remove(item) {
      for (let i = 0; i < this.selectedParts.length; i++) {
        if (this.selectedParts[i].id === item.id) {
          this.selectedParts.splice(i, 1);
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
        //for(let j=0;j<items[i].parts.length;j++){
        if (existingParts[items[i].part] != null) {
          items.pop();
          return;
        } else {
          existingParts[items[i].part] = items[i].part;
        }
        //}
      }
      this.$emit("change", items);
    },
  },
};
</script>
