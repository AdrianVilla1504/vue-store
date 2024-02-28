<template>
    <header>
      <h1>¡Bienvenido a mi tienda en línea!</h1>
      <div>
        <router-link to="/">Inicio</router-link>
        <router-link to="/cart" class="cart-button">
          Carrito <i class="fa fa-shopping-cart"></i> ({{ cartItemCount }})
        </router-link>
      </div>
    </header>
  </template>
  
  <script>
  import { useCartStore } from '../store/';
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    name: 'AppHeader',
    setup() {
      const cartStore = useCartStore();
  
      const cartItemCount = computed(() => cartStore.itemCount);
  
      return {
        cartItemCount,
      };
    },
  });
  </script>
  
  <style>
  header {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  header h1 {
    margin: 0;
  }
  
  header div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  header div a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
  }
  
  header div a.cart-button {
    display: flex;
    align-items: center;
  }
  
  header div a.cart-button i {
    margin-left: 5px;
  }
  
  header div a:hover {
    text-decoration: underline;
  }
  </style>
  