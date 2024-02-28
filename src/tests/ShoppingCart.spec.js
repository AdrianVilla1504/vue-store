import { mount } from '@vue/test-utils';
import ShoppingCart from '@/components/ShoppingCart.vue';

describe('ShoppingCart', () => {
  it('renders the shopping cart items correctly', () => {
    const items = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10.99, quantity: 2 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 20.49, quantity: 1 }
    ];

    const wrapper = mount(ShoppingCart, {
      props: {
        items: items
      }
    });

    const cartItems = wrapper.findAll('.cart-item');

    expect(cartItems.length).toBe(items.length);

    items.forEach((item, index) => {
      const cartItem = cartItems[index];
      expect(cartItem.find('.product-name').text()).toBe(item.name);
      expect(cartItem.find('.product-description').text()).toBe(item.description);
      expect(cartItem.find('.product-price').text()).toBe(`Price: $${item.price}`);
      expect(cartItem.find('.product-quantity').element.value).toBe(String(item.quantity));
    });
  });

  it('emits events when modifying item quantity or removing item from cart', async () => {
    const items = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10.99, quantity: 2 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 20.49, quantity: 1 }
    ];

    const wrapper = mount(ShoppingCart, {
      props: {
        items: items
      }
    });

    const increaseButtons = wrapper.findAll('.increase-quantity-button');
    const decreaseButtons = wrapper.findAll('.decrease-quantity-button');
    const removeButtons = wrapper.findAll('.remove-item-button');

    // Increase quantity
    await increaseButtons[0].trigger('click');
    await increaseButtons[1].trigger('click');

    expect(wrapper.emitted('update-item-quantity')).toBeTruthy();
    expect(wrapper.emitted('update-item-quantity').length).toBe(2);

    // Decrease quantity
    await decreaseButtons[0].trigger('click');

    expect(wrapper.emitted('update-item-quantity')).toBeTruthy();
    expect(wrapper.emitted('update-item-quantity').length).toBe(3);

    // Remove item
    await removeButtons[1].trigger('click');

    expect(wrapper.emitted('remove-item')).toBeTruthy();
    expect(wrapper.emitted('remove-item').length).toBe(1);
  });
});
