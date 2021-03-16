<template>
  <div class="container">
    <button
      @click="
        $router.push({
          name: 'home',
          query: {
            sort: 'orders',
            dir: 'asc',
          },
        })
      "
    >
      Перейти на страницу таблицы используя программную навигацию
    </button>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style lang="scss" scoped>
.button {
  padding: 1em;
  background-color: transparent;
  border: 1px solid #222;
}

.container {
  padding: 20px;
  overflow-x: auto;
}
</style>
