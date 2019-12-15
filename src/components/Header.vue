<template>
  <div class="container">
    <p>This is random calculate application</p>
    <div class="nav">
      <router-link class='nav-link' :to="{ path: '/' }">Home</router-link>
      <router-link class='nav-link' :to="{ path: 'statistic' }">Statistic</router-link>
    </div>
    <span></span>


  </div>
</template>

<script lang="ts">


export default  {
  name: 'Header'

}
</script>


<style scoped lang="scss">
  .container {
    text-align: left;
    position: absolute;
    top: 0;
    height: 50px;
    width:100%;
    background: blueviolet;
    display: flex;
    /*padding: 5px;*/
  }
  p , span {
    flex: 1;
  }
  p {
    margin-left: 5px;
    color: white;
  }

  .nav {
    margin: auto;
    &-link {
      margin: 5px;
      color: white;
    }
  }

</style>
