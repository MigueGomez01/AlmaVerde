console.log("Página de Natursopas cargada correctamente");

// Variables globales
let carrito = [];
const cartBtn = document.getElementById('openCart');
const cartWindow = document.getElementById('cart');
const closeCartBtn = document.getElementById('closeCart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const hacerPedidoBtn = document.getElementById('hacerPedido');

// Mostrar el carrito
cartBtn.addEventListener('click', () => {
  cartWindow.classList.remove('hidden');
});

// Ocultar el carrito
closeCartBtn.addEventListener('click', () => {
  cartWindow.classList.add('hidden');
});

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio) {
  const itemExistente = carrito.find(item => item.nombre === nombre);

  if (itemExistente) {
    itemExistente.cantidad++;
    itemExistente.total = itemExistente.cantidad * itemExistente.precio;
  } else {
    carrito.push({
      nombre,
      precio,
      cantidad: 1,
      total: precio
    });
  }

  actualizarCarrito();

  // Mostrar el carrito automáticamente
  cartWindow.classList.remove('hidden');
}

// Función para eliminar un ítem del carrito
function eliminarItem(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
  cartItems.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    total += item.total;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${formatearPesos(item.total)}
      <button class="eliminar-item" data-nombre="${item.nombre}" style="margin-left: 10px; color: red; border: none; background: transparent; cursor: pointer;">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: $${formatearPesos(total)}`;

  // Asignar eventos a los botones de eliminar
  document.querySelectorAll('.eliminar-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const nombre = btn.dataset.nombre;
      eliminarItem(nombre);
    });
  });
}

// Función para formatear valores en pesos colombianos
function formatearPesos(valor) {
  return valor.toLocaleString('es-CO');
}

// Eventos para los botones "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const nombre = btn.dataset.name;
    const precio = parseInt(btn.dataset.price);
    agregarAlCarrito(nombre, precio);
  });
});

// Evento para el botón "Hacer pedido"
if (hacerPedidoBtn) {
  hacerPedidoBtn.addEventListener('click', () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "pedido.html";
  });









}
