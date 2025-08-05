// archivo: admin.js

const form = document.getElementById('productoForm');
const lista = document.getElementById('listaProductos');

form.addEventListener('submit', e => {
  e.preventDefault();

  const nombre = document.getElementById('nombreProducto').value;
  const descripcion = document.getElementById('descripcionProducto').value;
  const precio = parseInt(document.getElementById('precioProducto').value);

  const nuevoProducto = { nombre, descripcion, precio };

  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push(nuevoProducto);
  localStorage.setItem('productos', JSON.stringify(productos));

  mostrarProductos();
  form.reset();
});

function mostrarProductos() {
  lista.innerHTML = '';
  const productos = JSON.parse(localStorage.getItem('productos')) || [];

  productos.forEach((prod, index) => {
    const li = document.createElement('li');
    li.textContent = `${prod.nombre} - $${prod.precio} - ${prod.descripcion}`;
    lista.appendChild(li);
  });
}

mostrarProductos();
