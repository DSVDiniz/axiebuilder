import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BattleSimulator from '@/views/battleSimulator/BattleSimulator.vue'
import TeamBuilder from '@/views/teamBuilder/TeamBuilder.vue'
import CardListPage from '@/views/cardList/CardListPage.vue'
import GameInfo from '@/views/info/GameInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/teamBuilder',
    name: 'TeamBuilder',
    component: TeamBuilder
  },
  {
    path: '/cardList',
    name: 'CardListPage',
    component: CardListPage
  },
  {
    path: '/gameInfo',
    name: 'GameInfo',
    component: GameInfo
  },
  {
    path: '/battleSimulator',
    name: 'BattleSimulator',
    component: BattleSimulator
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
