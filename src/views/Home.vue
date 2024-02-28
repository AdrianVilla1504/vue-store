<template>
    <div class="home-page">
      <h1>Lista de Productos</h1>
      <select v-model="selectedCategory" @change="loadProductsByCategory" class="category-select">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <h2> Bienvenido, haga click en el boton para ver o cargar mas productos </h2>
      <div class="product-list">
        <div v-for="product in displayedProducts" :key="product.id" class="product-card">
          <div class="product-image-container">
            <img :src="product.images.length > 0 ? product.images[0] : ''" alt="Product Image" class="product-image">
          </div>
          <p class="product-title">{{ product.title }}</p>
          <p class="product-price">$ {{ product.price }}</p>
          <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="product-link">
            <button class="details-button">Ver Detalles</button>
          </router-link>
        </div>
      </div>
      <button @click="loadNextPage" v-if="hasMorePages" class="load-more-button">
        Cargar más productos
      </button>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import productService from '../services/productService';
  
  export default defineComponent({
    name: "HomePage",
    setup() {
      const products = ref([]);
      const displayedProducts = ref([]);
      const currentPage = ref(1);
      const pageSize = 10;
      let hasMorePages = true;
      const selectedCategory = ref("");
      const categories = [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting"
      ];
  
      const loadProducts = async (category = "") => {
        try {
          const categoryParam = category ? `/category/${category}` : '';
          const skip = (currentPage.value - 1) * pageSize;
          const newProducts = await productService.getProducts(
            pageSize,
            skip,
            categoryParam
          );
          if (Array.isArray(newProducts)) {
            hasMorePages = newProducts.length === pageSize;
            return newProducts;
          } else {
            console.error(
              "La respuesta de productService.getProducts() no es un arreglo:",
              newProducts
            );
            return [];
          }
        } catch (error) {
          console.error("Error al cargar productos:", error);
          return [];
        }
      };
  
      const loadNextPage = async () => {
        currentPage.value++;
        const newProducts = await loadProducts(selectedCategory.value);
        if (newProducts.length > 0) {
          products.value = [...products.value, ...newProducts];
        } else {
          hasMorePages = false;
          alert('No hay más productos disponibles.');
        }
      };
  
      const loadProductsByCategory = async () => {
        currentPage.value = 1;
        products.value = await loadProducts(selectedCategory.value);
      };
  
      onMounted(loadProducts);
  
      watch(selectedCategory, () => {
        loadProductsByCategory();
      });
  
      watch(products, () => {
        displayedProducts.value = products.value;
      });
  
      return {
        displayedProducts,
        loadNextPage,
        hasMorePages,
        selectedCategory,
        categories,
      };
    },
  });
  </script>
  
  <style scoped>
  .home-page {
    text-align: center;
  }
  
  .category-select {
    margin-bottom: 20px;
    appearance: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .category-select:hover {
    background-color: #f0f0f0;
  }
  
  .category-select:focus {
    outline: none;
    border-color: #007bff;
  }
  
  .category-select option {
    color: #333;
  }
  
  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .product-card {
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
  }
  
  .product-image-container {
    height: 150px;
    overflow: hidden;
    border-radius: 5px;
  }
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-title {
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  
  .product-price {
    font-weight: bold;
    color: green;
  }
  
  .product-link {
    text-decoration: none;
    color: inherit;
  }
  
  .details-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .load-more-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>