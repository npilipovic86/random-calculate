<template>
  <div id="app">
    <Header v-if="!loading" />
    <Socket class="loader" v-if="loading" size="60" />
    <transition name="fade" mode="out-in" v-if="!loading">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Home from '@/views/Home.vue'
import Statistic from '@/views/Statistic.vue'
import Header from '@/components/Header.vue'
import Socket from 'vue-loading-spinner/src/components/Socket'

@Component({
  components: {
    Home,
    Statistic,
    Header,
    Socket
  }
})
export default class App extends Vue {
  private loading: boolean

  constructor() {
    super()
    this.loading = true
  }

  mounted() {
    this.loader()
  }

  loader() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Girassol|Kalam&display=swap');
html,
body {
  overflow: hidden;
  margin: 0;
  //  font-family: 'Girassol', cursive;
  font-family: 'Kalam', cursive;
}

body {
  -webkit-animation: a 50s infinite;
  animation: a 50s infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
 
}

#app {
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  padding-top: 4em;
}

@-webkit-keyframes a {
  0% {
    background: #9b59b6;
  }
  25% {
    background: #f1c40f;
  }
  50% {
    background: #3498db;
  }
  75% {
    background: #1abc9c;
  }
  to {
    background: #9b59b6;
  }
}
@keyframes a {
  0% {
    background: #9b59b6;
  }
  25% {
    background: #f1c40f;
  }
  50% {
    background: #3498db;
  }
  75% {
    background: #1abc9c;
  }
  to {
    background: #9b59b6;
  }
}

.loader {
  position: fixed;
  z-index: 1;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: .5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

@media screen and (max-height: 930px) {
  html,
  body {
    overflow: auto;
  }
}
</style>
