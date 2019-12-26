<template>
  <div class="app" :class="$store.getters.theme">
    <Header :theme="$store.getters.theme" v-show="!loading" @toggleTheme="toggleTheme" />
    <Socket class="loader" v-show="loading" size="60" />
    <transition name="slide" mode="out-in" >
        <router-view v-if="!loading"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Home from '@/views/Home.vue'
import Statistic from '@/views/Statistic.vue'
import Header from '@/components/Header.vue'
import Socket from 'vue-loading-spinner/src/components/Socket'
import { store } from '@/store/index'

@Component({
  store,
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
    window.addEventListener('keyup', this.keyPress)
  }
  keyPress(e: KeyboardEvent) {
    if (e.key === 't') {
      this.toggleTheme()
    }
  }
  toggleTheme() {
    let theme: string = ''
    this.$store.getters.theme === 'dark' ?  theme = 'light' : theme = 'dark'
    this.$store.dispatch('setTheme', theme)
  }
  loader() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }
  beforeDestroy() {
    window.removeEventListener('keyup', this.keyPress)
  }
}
</script>
