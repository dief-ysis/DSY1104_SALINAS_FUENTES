// sidecart-global.js: Lógica global para el side-cart en todas las páginas
import { getCart, updateItem, removeItem, syncCartBadge } from './carrito.js';
import { formatearPrecio } from './utils.js';

// Renderiza el carrito lateral si existe en la página
export function renderSideCart() {
  const sideCart = document.getElementById('side-cart');
  if (!sideCart) return;
  const items = getCart();
  const itemsDiv = document.getElementById('side-cart-items');
  const emptyDiv = document.getElementById('side-cart-empty');
  const totalSpan = document.getElementById('side-cart-total');
  let minCompra = 20000;
  if (!items.length) {
    if (itemsDiv) itemsDiv.innerHTML = '';
    if (emptyDiv) emptyDiv.style.display = 'block';
    if (totalSpan) totalSpan.textContent = '$0';
    showSideCartMessage('El carrito está vacío', '#888');
    return;
  }
  if (emptyDiv) emptyDiv.style.display = 'none';
  let total = 0;
  if (itemsDiv) itemsDiv.innerHTML = items.map(item => {
    total += item.subtotal;
    return `<div class="side-cart-item" data-code="${item.code}" style="display:flex;align-items:center;gap:0.7em;margin-bottom:1.1em;">
      <span style="flex:1;font-weight:500;">${item.name}</span>
      <button class="side-cart-qty-btn" data-action="minus" aria-label="Restar" style="background:#eee;border:none;border-radius:4px;padding:0.2em 0.7em;font-size:1.1em;">-</button>
      <span style="min-width:2em;text-align:center;">${item.qty}</span>
      <button class="side-cart-qty-btn" data-action="plus" aria-label="Sumar" style="background:#eee;border:none;border-radius:4px;padding:0.2em 0.7em;font-size:1.1em;">+</button>
      <span style="width:4em;text-align:right;">${formatearPrecio(item.subtotal)}</span>
      <button class="side-cart-remove-btn" aria-label="Eliminar" style="background:none;border:none;color:#c00;font-size:1.2em;margin-left:0.5em;">&times;</button>
    </div>`;
  }).join('');
  if (totalSpan) totalSpan.textContent = formatearPrecio(total);
  if (total < minCompra) showSideCartMessage('El mínimo de compra es $20.000', '#c00');
  // Eventos sumar/restar/eliminar
  if (itemsDiv) {
    itemsDiv.querySelectorAll('.side-cart-qty-btn').forEach(btn => {
      btn.onclick = e => {
        const code = btn.closest('.side-cart-item').dataset.code;
        const item = items.find(i => i.code === code);
        if (!item) return;
        let newQty = item.qty + (btn.dataset.action === 'plus' ? 1 : -1);
        updateItem(code, newQty);
        renderSideCart();
        syncCartBadge();
      };
    });
    itemsDiv.querySelectorAll('.side-cart-remove-btn').forEach(btn => {
      btn.onclick = e => {
        const code = btn.closest('.side-cart-item').dataset.code;
        removeItem(code);
        renderSideCart();
        syncCartBadge();
      };
    });
  }
}

function showSideCartMessage(msg, color = '#2E8B57') {
  let msgDiv = document.getElementById('side-cart-msg');
  if (!msgDiv) {
    msgDiv = document.createElement('div');
    msgDiv.id = 'side-cart-msg';
    msgDiv.style.position = 'absolute';
    msgDiv.style.top = '0.5em';
    msgDiv.style.left = '50%';
    msgDiv.style.transform = 'translateX(-50%)';
    msgDiv.style.background = color;
    msgDiv.style.color = '#fff';
    msgDiv.style.padding = '0.7em 1.5em';
    msgDiv.style.borderRadius = '8px';
    msgDiv.style.fontWeight = 'bold';
    msgDiv.style.zIndex = '9999';
    msgDiv.style.boxShadow = '0 2px 8px #0002';
    msgDiv.style.transition = 'opacity 0.3s';
    document.getElementById('side-cart').appendChild(msgDiv);
  }
  msgDiv.textContent = msg;
  msgDiv.style.opacity = '1';
  setTimeout(() => { msgDiv.style.opacity = '0'; }, 1800);
}

// Eventos de apertura/cierre y sincronización
window.addEventListener('DOMContentLoaded', () => {
  const sideCart = document.getElementById('side-cart');
  const cartToggleBtn = document.querySelector('.cart-button');
  const closeSideCartBtn = document.getElementById('close-side-cart');
  if (!sideCart || !cartToggleBtn || !closeSideCartBtn) return;
  cartToggleBtn.addEventListener('click', () => {
    renderSideCart();
    sideCart.style.display = 'block';
    setTimeout(() => {
      sideCart.classList.add('open');
      sideCart.focus();
    }, 10);
  });
  closeSideCartBtn.addEventListener('click', () => {
    sideCart.classList.remove('open');
    setTimeout(() => {
      sideCart.style.display = 'none';
      cartToggleBtn.focus();
    }, 300);
  });
  sideCart.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSideCartBtn.click();
    if (e.key === 'Tab') {
      const focusable = sideCart.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
  window.addEventListener('storage', () => {
    syncCartBadge();
    renderSideCart();
  });
  syncCartBadge();
  renderSideCart();
});
