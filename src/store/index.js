import { defineStore } from 'pinia';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: [],
  }),
  getters: {
    itemCount(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
  actions: {
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        alert('El producto ya ha sido agregado al carrito.');
      } else {
        this.$state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem(itemId) {
      this.$state.items = this.$state.items.filter(item => item.id !== itemId);
    },
    updateItemQuantity({ id, quantity }) {
      const itemIndex = this.$state.items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        this.$state.items[itemIndex].quantity = quantity;
      }
    },
  },
});
