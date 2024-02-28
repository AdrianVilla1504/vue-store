import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ShoppingCart from '../views/ShoppingCart.vue'

const routes = [
  { path: '/', name: "Home", component: Home },
  { path: '/product/:id', name:"ProductDetail" ,component: ProductDetail },
  { path: '/cart', name: "ShoppingCart", component: ShoppingCart }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
