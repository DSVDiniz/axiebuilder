<template>
  <v-container>
    <v-row>
      <v-select :items="types" v-model="selectedType" v-on:change="change">
        <template slot="selection" slot-scope="data">
          <AxieTypeIcon :axieType="data.item.value" />{{ data.item.text }}
        </template>
        <template slot="item" slot-scope="data">
          <AxieTypeIcon :axieType="data.item.value" />{{ data.item.text }}
        </template>
      </v-select>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>

import AxieTypeIcon from "../components/icons/AxieTypeIcon.vue";
import { AxieTypeSelect } from "../dtos/data/data";
export default {
  name: "AxieTypeSelector",
  components:{AxieTypeIcon,},
  props: {
    axie: { type: Object, default: () => {} },
  },
  data: () => ({
    types: AxieTypeSelect,
    selectedType: null,
  }),
  methods: {
    change(val){
      this.$emit("change",val);
    }
  },
  created(){
    this.selectedType = this.axie.type;
  }
};
</script>
