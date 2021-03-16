<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  // TODO: fix vh units on ios
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  background-color: #f6f6f4;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
