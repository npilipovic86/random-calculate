<template>
  <div id="app">
    <Header/>
    <transition>
        <router-view></router-view>
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
    overflow: hidden;
    margin: 0;
    /*color:white;*/
    background: linear-gradient(90deg, #3F2B96 0%, #798ab9 50%, #3F2B96 100%);
    /*height: calc(100% - 30px);*/
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  text-align: center;
}
  @media screen and (max-width:600px) {
    html, body  {
      overflow: auto;
    }
  }
</style>
