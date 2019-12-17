<template>
  <div class="container">
    <p class="name">Random calculate</p>
    <div class="nav">
      <router-link class='nav-link' :to="{ path: '/' }">Home</router-link>
      <router-link class='nav-link' :to="{ path: 'statistic' }">Statistic</router-link>
      <a class='nav-link' @click="reset()" href="#">Reset</a>
    </div>
    <div class="git">
      <a class="git-icon" href="https://github.com/npilipovic86/random-calculate" target="_blank" data-placement="left" data-toggle="tooltip" title="Github"><img src="https://img.icons8.com/ios-filled/40/000000/github.png"  alt=""></a>
    </div>
  </div>
</template>

<script lang="ts">
import { EventBus } from '@/services/EventBus'
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  private $dialog: any;

  constructor() {
    super()
  }

  reset() {
    this.$dialog.confirm('Do you want to reset values ?').then( () => {
      localStorage.removeItem('items')
      this.$route.name === 'statistic' ? this.$router.push('/').then() : EventBus.$emit('reset')
    }).catch(() => { console.log('cancel') })
  }
}
</script>

<style scoped lang="scss">
  .container {
    text-align: left;
    position: absolute;
    top: 0;
    height: 50px;
    width:100%;
    background: #6785e2;
    display: flex;
    /*padding: 5px;*/
    color:black;
  }
 .name , .git {
    flex: 1;
  }

  .name  {
    margin-left: 5px;
    color: white;
    color:black;
  }
  .git {
    text-align: right;
    &-icon {
      img {
        padding: 5px;
      }
    }
  }
  .nav {
    margin: auto;
    &-link {
      margin: 5px;
      color: white;
      color:black;
    }
  }
  @media screen and (max-width:600px) {
    .name {
      visibility: hidden;
    }
  }
</style>
