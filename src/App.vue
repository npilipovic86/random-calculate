<template>
  <div id="app">
    <Header/>
    <transition>
      <!--<keep-alive>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from '@/views/Home.vue';
import Statistic from '@/views/Statistic.vue'
import Header from '@/components/Header.vue'


@Component({
  components: {
    Home,
    Statistic,
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">

  html, body {
    margin: 0;
    background: cornflowerblue;
    /*height: calc(100% - 30px);*/
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  text-align: center;
}
</style>
