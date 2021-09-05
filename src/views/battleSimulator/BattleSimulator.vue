<template>
  <v-container>
    <div class="grid-container">
      <div class="header">
        <div class="header-grid-container">
          <div class="turn-order"></div>
        </div>
      </div>
      <div class="center">
        <div class="center-grid-container">
          <div class="p1"></div>
          <div class="p2"></div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-grid-container">
          <div class="p1-stats"></div>
          <div class="cards"></div>
          <div class="p2-stats"></div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<style scoped>
.header {
  grid-area: header;
}
.center {
  grid-area: center;
}
.footer {
  grid-area: footer;
}
.grid-container {
  display: grid;
  grid-template-rows: 1fr 5fr 2fr;
  grid-template-areas:
    "header header header header header header"
    "center center center center center center"
    "footer footer footer footer footer footer";
  grid-gap: 10px;
  background-color: #2196f3;
  padding: 10px;
  height: 95vh;
}
.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 30px;
}


/* --------- */
.turn-order {
  grid-area: turn-order;
}
.p2 {
  grid-area: p2;
}
.header-grid-container {
  display: grid;
  grid-template-areas:
    "turn-order";
  grid-gap: 10px;
  background-color: darkred;
  padding: 10px;
  height:100%
}
.header-grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}


/* --------- */
.p1 {
  grid-area: p1;
}
.p2 {
  grid-area: p2;
}
.center-grid-container {
  display: grid;
  grid-template-areas:
    "p1 p2 ";
  grid-gap: 10px;
  background-color: green;
  padding: 10px;
  height:100%
}
.center-grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}

/* --------- */
.p1-stats {
  grid-area: p1-stats;
}
.cards{
  grid-area: cards;
}
.p2-stats {
  grid-area: p2-stats;
}
.footer-grid-container {
  display: grid;
  grid-template-columns: 1fr 15fr 1fr;
  grid-template-areas:
    "p1-stats cards p2-stats";
  grid-gap: 10px;
  background-color: darkcyan;
  padding: 10px;
  height:100%
}
.footer-grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}
</style>
<script>
export default {
  name: "BattleSimulator",
  components: {},
};
</script>
