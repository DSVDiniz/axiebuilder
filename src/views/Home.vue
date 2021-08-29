<template>
<v-container>
  <div class="home">
    <TeamCreator />
    <!-- <CardList/> -->
  </div>
</v-container>
</template>

<script>
// @ is an alias to /src
//import CardList from '@/views/cards/CardList'
import TeamCreator from '@/views/teamCreator/TeamCreator'

export default {
  name: 'Home',
  components: {
    //CardList,
    TeamCreator
  }
}
</script>
