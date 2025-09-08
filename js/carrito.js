// Módulo carrito.js HH-040

const STORAGE_KEY = 'carrito'; // HH-040

// Obtener carrito actual HH-040
export function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Guardar carrito HH-040
function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// add(item, qty) HH-040
export function addItem(item, qty = 1) {
    let cart = getCart();
    const idx = cart.findIndex(i => i.code === item.code);
    if (idx >= 0) {
        cart[idx].qty += qty;
        cart[idx].subtotal = cart[idx].qty * cart[idx].price;
    } else {
        cart.push({
            code: item.code,
            name: item.nombre,
            price: item.precioCLP,
            qty: qty,
            subtotal: qty * item.precioCLP
        });
    }
    saveCart(cart);
    return cart;
}

// remove(code) HH-040
export function removeItem(code) {
    let cart = getCart().filter(i => i.code !== code);
    saveCart(cart);
    return cart;
}

// update(code, qty) HH-040
export function updateItem(code, qty) {
    let cart = getCart();
    const idx = cart.findIndex(i => i.code === code);
    if (idx >= 0) {
        cart[idx].qty = qty;
        cart[idx].subtotal = qty * cart[idx].price;
        if (qty <= 0) cart = cart.filter(i => i.code !== code);
    }
    saveCart(cart);
    return cart;
}

// clear() HH-040
export function clearCart() {
    saveCart([]);
    return [];
}

// Sincronización navbar HH-040
export function syncCartBadge(selector = '.cart-badge') {
    const cart = getCart();
    const total = cart.reduce((sum, i) => sum + i.qty, 0);
    const badge = document.querySelector(selector);
    if (badge) badge.textContent = total;
}
