<template>
  <v-row>
    <v-col cols="12">Health:{{ axie.getInGameHealth() }}</v-col>
    <v-col cols="12">
      DMG:
      {{ this.getMinDamage(this.axie) ? this.getMinDamage(this.axie).dmg : "0" }}
      <AxieTypeIcon style="display: contents" :axieType=" this.getMinDamage(this.axie) ?  this.getMinDamage(this.axie).opponentType : 0" />
      -
      {{ this.getMaxDamage(this.axie) ? this.getMaxDamage(this.axie).dmg : "0" }}
      <AxieTypeIcon style="display: contents" :axieType="this.getMaxDamage(this.axie) ? this.getMaxDamage(this.axie).opponentType : 0" />
    </v-col>
    <v-col cols="12">
      DEF:
      {{ this.getMinShield(this.axie) ? this.getMinShield(this.axie) : "0" }}
      -
      {{ this.getMaxShield(this.axie) ? this.getMaxShield(this.axie) : "0" }}
    </v-col>
    <v-col cols="12">Last stand bars:{{ axie.getLastStandBars() }}</v-col>
    <v-col cols="12">
      Advantage:
      <AxieRPSTypeIcon :axieType="axie.type" :advantage="true"/>
    </v-col>
    <v-col cols="12">
      Disadvantage:
      <AxieRPSTypeIcon :axieType="axie.type" :advantage="false"/>
    </v-col>
  </v-row>
</template>
<style scoped></style>
<script>
import { AxieTypeEnum } from "@/game/data/data.js";
import AxieTypeIcon from "@/components/icons/AxieTypeIcon.vue";
import AxieRPSTypeIcon from "@/components/icons/AxieRPSTypeIcon.vue";
export default {
  name: "AxieDetailedStats",
  components: { AxieTypeIcon, AxieRPSTypeIcon },
  props: {
    axie: { type: Object, default: () => {} },
  },
  data: () => ({
  }),
  computed: {},
  methods: {
    getMaxDamage(axie) {
      return this.calculatePossibleDamageList(axie)[0];
    },
    getMinDamage(axie) {
      let dmglist = this.calculatePossibleDamageList(axie);
      return dmglist[dmglist.length - 1];
    },
    calculatePossibleDamageList(axie) {
      let cardList = axie.cards;
      let axieTypes = Object.values(AxieTypeEnum);
      let damageList = [];
      for (let i = 0; i < cardList.length; i++) {
        let card = cardList[i];
        for (let j = 0; j < axieTypes.length; j++) {
          //enemy
          damageList.push(
            this.calculateDamage(
              card,
              axie.type,
              axieTypes[j],
              axie.getRpsBonus(axieTypes[j])
            )
          );
        }
      }
      return damageList.length > 0 ? damageList.sort(this.sortDmgObj) : [];
    },
    calculateDamage(card, attackerType, opponentType, rpsBonus) {
      let attackerTypeCardElementBonus = card.axieType === attackerType ? 1.1 : 1;
      let dmgObj = {
        dmg: Math.floor(card.dmg * attackerTypeCardElementBonus * rpsBonus),
        opponentType: opponentType,
      };
      return dmgObj;
    },
    sortDmgObj(objA, objB) {
      if (objA.dmg < objB.dmg) return 1;
      else if (objA.dmg > objB.dmg) return -1;
      else return 0;
    },


    getMaxShield(axie) {
      return this.calculatePossibleShieldList(axie)[0];
    },
    getMinShield(axie) {
      let shieldList = this.calculatePossibleShieldList(axie);
      return shieldList[shieldList.length - 1];
    },
    calculatePossibleShieldList(axie) {
      let cardList = axie.cards;
      let shieldList = [];
      for (let i = 0; i < cardList.length; i++) {
        let card = cardList[i];
        shieldList.push(
          this.calculateShield(
            card,
            axie.type
          )
        );
      }
      return shieldList.length > 0 ? shieldList.sort() : [];
    },
    calculateShield(card, defenderType) {
      let defenderTypeCardElementBonus = card.axieType === defenderType ? 1.1 : 1;
      return Math.floor(card.shield * defenderTypeCardElementBonus);
    },
  },
};
</script>
