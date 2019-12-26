<template>
  <header class="header-wrapper">
    <nav class="nav">
      <router-link class="nav-link" :to="{ path: '/' }">
        <img src="@/assets/house.svg" data-toggle="tooltip" title="Home page" alt="" />
      </router-link>
      <router-link class="nav-link" :to="{ path: 'statistic' }">
        <img src="@/assets/statistics.svg" data-toggle="tooltip" title="Chart statistic" alt="" />
      </router-link>
      <a class="nav-link"
        href="https://github.com/npilipovic86/random-calculate"
        target="_blank"
        data-toggle="tooltip"
        title="Github">
        <img src="@/assets/github.svg" alt="" />
      </a>
      <a class="nav-link" @click="reset()" >
        <img src="@/assets/reset.svg" data-toggle="tooltip" title="Reset values" alt="" />
      </a>
    </nav>
    <ThemeToggle :theme="theme" @toggleTheme="$emit('toggleTheme')" data-toggle="tooltip" title="Toggle theme" />
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ThemeToggle from '@/components/ThemeToggle.vue'

@Component({
  components: {
    ThemeToggle
  }
})
export default class Header extends Vue {
  @Prop({type: String, default: ''}) theme: string
  private $dialog: any

  reset() {
    this.$dialog.confirm('Do you want to reset values ?')
      .then(() => {
        this.$store.dispatch('resetValues')
        if (this.$route.name === 'statistic') {  this.$router.push('/').then() }
      })
      .catch(() => {
        console.log('cancel')
      })
  }
}
</script>
