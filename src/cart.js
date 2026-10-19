function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity < 1 || quantity > product.stock) {
    throw new RangeError('Недопустимое количество товара');
  }

  const existingProduct = cart.find((item) => item.id === product.id);
  const newQuantity = existingProduct
    ? existingProduct.quantity + quantity
    : quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  if (existingProduct) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: newQuantity }
        : item,
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  const product = cart.find((item) => item.id === productId);

  if (!product) {
    return cart;
  }

  if (quantity < 1 || quantity > product.stock) {
    throw new RangeError('Недопустимое количество товара');
  }

  return cart.map((item) =>
    item.id === productId
      ? { ...item, quantity }
      : item,
  );
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  const discount =
    promoCode === 'SAVE10' && subtotal >= 20000
      ? subtotal * 0.1
      : 0;

  const delivery = subtotal < 50000 ? 30000 : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
