<template>
  <div class="container">
    <div class="nav">
      <router-link class="nav-link" :to="{ path: '/' }">
        <img src="@/assets/house.svg" data-toggle="tooltip" title="Home page" alt="" />
      </router-link>
      <router-link class="nav-link" :to="{ path: 'statistic' }">
        <img src="@/assets/statistics.svg" data-toggle="tooltip" title="Chart statistic" alt="" />
      </router-link>
      <a
        class="nav-link"
        href="https://github.com/npilipovic86/random-calculate"
        target="_blank"
        data-placement="right"
        data-toggle="tooltip"
        title="Github"
      >
        <img src="@/assets/github.svg" alt="" />
      </a>
       <a class="nav-link" @click="reset()" >
        <img src="@/assets/reset.svg" data-toggle="tooltip" title="Reset values" alt="" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { EventBus } from '@/services/EventBus'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  private $dialog: any

  constructor() {
    super()
  }

  reset() {
    this.$dialog.confirm('Do you want to reset values ?')
      .then(() => {
        localStorage.removeItem('items')
        localStorage.removeItem('interval')
        this.$route.name === 'statistic' ? this.$router.push('/').then() : EventBus.$emit('reset')
      })
      .catch(() => {
        console.log('cancel')
      })
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
}
.nav {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  &-link {
    // width: 50px;
    margin: 0 7px;
    text-align: center;
    img {
      transition: all 0.5s 0.25s;
      margin: auto;
      vertical-align: middle;
      height: 37px;
      cursor: pointer;
    }
    img:hover {
      height: 45px;
    }
}
}

</style>
