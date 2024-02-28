const API_URL = process.env.VUE_APP_API;

const getProducts = async (limit, skip, category = '') => {
  try {
    let url = `${API_URL}${category && category}?limit=${limit}&skip=${skip}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching product details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};

export default {
  getProducts,
  getProductById
};
