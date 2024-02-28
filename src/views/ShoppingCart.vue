<template>
    <div class="shopping-cart">
      <h1>Carrito de Compras</h1>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.images.length > 0 ? item.images[0] : ''" alt="Product Image" class="product-image">
        <div>
          <p>{{ item.name }}</p>
          <p>{{ item.description }}</p>
          <p>Precio: ${{ item.price }}</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)">-</button>
            <input type="number" v-model.number="item.quantity" min="1">
            <button @click="increaseQuantity(item)">+</button>
            <button @click="removeFromCart(item.id)">Eliminar</button>
          </div>
        </div>
        <hr v-if="cart.length > 1"> <!-- Mostrar hr solo si hay más de un elemento en el carrito -->
      </div>
      <div class="total-container">
        <h2>Total: ${{ calculateTotal }}</h2>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, computed } from 'vue'
  import { useCartStore } from '../store'
  
  export default defineComponent({
    name: 'ShoppingCart',
    setup() {
      const cartStore = useCartStore()
      const cart = ref(cartStore.items)
  
      const updateCart = (item) => {
        cartStore.updateItemQuantity({ id: item.id, quantity: item.quantity })
      }
  
      const removeFromCart = (itemId) => {
        cartStore.removeItem(itemId)
        cart.value = cart.value.filter(item => item.id !== itemId)
      }
  
      const increaseQuantity = (item) => {
        item.quantity++
        updateCart(item)
      }
  
      const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
          item.quantity--
          updateCart(item)
        }
      }
  
      const calculateTotal = computed(() => {
        return cart.value.reduce((total, item) => {
          return total + (item.price * item.quantity)
        }, 0)
      })
  
      return {
        cart,
        updateCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal
      }
    }
  })
  </script>
  
  <style scoped>
  .shopping-cart {
    text-align: center;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px auto;
    padding: 10px;
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 20px;
  }
  
  .quantity-controls {
    margin-top: 10px;
  }
  
  .quantity-controls button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .quantity-controls input {
    width: 50px;
    text-align: center;
  }
  
  .total-container {
    margin-top: 20px;
  }
  </style>
  