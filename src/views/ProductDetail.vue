<template>
    <div class="product-detail">
      <h1 v-if="product" class="product-title">{{ product.title }}</h1>
      <div v-if="product" class="product-card">
        <div class="product-image-container">
          <img :src="product.images.length > 0 ? product.images[0] : ''" alt="Product Image" class="product-image">      </div>
        <div class="product-info">
          <p><strong>Precio:</strong> {{ product.price }}</p>
          <p><strong>Descuento:</strong> {{ product.discountPercentage }}%</p>
          <p><strong>Calificación:</strong> {{ product.rating }}</p>
          <p><strong>Stock:</strong> {{ product.stock }}</p>
          <p><strong>Marca:</strong> {{ product.brand }}</p>
          <p><strong>Categoría:</strong> {{ product.category }}</p>
          <button @click="addToCart" class="add-to-cart-button">Agregar al carrito</button>
        </div>
      </div>
      <div v-else>
        <p>Cargando...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue'
  import productService from '../services/productService'
  import { useRoute } from 'vue-router'
  import { useCartStore } from '../store'
  
  export default defineComponent({
    name: 'ProductDetail',
    setup() {
      const product = ref(null)
      const route = useRoute()
      const cartStore = useCartStore()
  
      const loadDetails = async () => {
        const productId = route.params.id
        try {
          const productDetail = await productService.getProductById(productId) 
          product.value = productDetail
        } catch (error) {
          console.error("Error al cargar productos:", error);
        }
      }
  
      const addToCart = () => {
        if (product.value) {
          const productCopy = { ...product.value };
          cartStore.addItem(productCopy);
        }
      }
  
      onMounted(loadDetails)
  
      return {
        product,
        addToCart
      }
    }
  })
  </script>
  
  <style scoped>
  .product-detail {
    text-align: center;
  }
  
  .product-title {
    margin-bottom: 20px;
  }
  
  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .product-image-container {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-info {
    width: 100%;
  }
  
  .add-to-cart-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  