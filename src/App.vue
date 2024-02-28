<template>
  <div id="app">
    <Header :cartItemCount="cartItemCount" />
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; {{ new Date().getFullYear() }} Mi Tienda en Línea</p>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import router from './router'
import Header from './components/Header.vue'
import { useCartStore } from './store'

export default defineComponent({
  name: 'App',
  components: {
    Header
  },
  setup() {
    const cartStore = useCartStore()

    return {
      router,
      cartItemCount: cartStore.itemCount
    }
  }
})
</script>

<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {
    flex-grow: 1; 
    padding: 20px;
  }
  footer {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    margin-top: auto; 
  }
</style>

