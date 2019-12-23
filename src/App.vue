<template>
  <div class="app" :class="theme">
    <Header :theme="theme" v-if="!loading" @toggleTheme="toggleTheme" />
    <Socket class="loader" v-if="loading" size="60" />
    <transition name="fade" theme="out-in" v-if="!loading">
        <router-view ></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Home from '@/views/Home.vue'
import Statistic from '@/views/Statistic.vue'
import Header from '@/components/Header.vue'
import Socket from 'vue-loading-spinner/src/components/Socket'
import { EventBus } from '@/services/EventBus'

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
  private theme: string


  constructor() {
    super()
    this.loading = true
    this.theme = 'dark'
  }

  mounted() {
    this.loader()
    window.addEventListener('keyup', this.keyPress)
    this.theme = localStorage.getItem('theme') || 'dark'
  }
  keyPress(e: KeyboardEvent) {
    if (e.key === 't') {
      this.toggleTheme()
    }
  }
  toggleTheme() {
    this.theme === 'dark' ?  this.theme = 'light' : this.theme = 'dark'
    EventBus.$emit('toggleTheme', this.theme)
    localStorage.setItem('theme', this.theme)
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

<style lang="scss">
 @import '@/styles/_app.scss';
</style>
