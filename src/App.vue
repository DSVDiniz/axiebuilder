<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover absolute>
      <v-list>
        <v-list-item link :to="'TeamBuilder'">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Team Builder
            </v-list-item-title>
            <v-list-item-subtitle>Create your Axie team</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'BattleSimulator'">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Battle Simulator
            </v-list-item-title>
            <v-list-item-subtitle>Test out your Axies</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'CardList'">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Card List
            </v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card> <router-view></router-view> </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
export default {
  name: "App",
  components: {
  },
};
</script>
