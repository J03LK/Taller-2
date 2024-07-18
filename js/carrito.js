// Array de productos
let productos = JSON.parse(localStorage.getItem('cart')) || [];

// Función agregar producto
const agregarProducto = (id, producto, precio, imagen) => {
    let indice = productos.findIndex(p => p.id === id);
    if (indice !== -1) {
        productos[indice].cantidad++;
        putJson(productos[indice]);
    } else {
        let nuevoProducto = {
            id: id,
            producto: producto,
            precio: precio,
            imagen: imagen,
            cantidad: 1,
        };
        productos.push(nuevoProducto);
        postJson(nuevoProducto);
    }
    actualizarTabla();
    updateLocalStorage();
};

// Función actualizar local storage
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(productos));
}

// Función actualizar
async function putJson(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Exitoso:", result);
    } catch (error) {
        console.log("Error", error);
    }
}

// Función asincrónica crear-enviar
async function postJson(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Exitoso:", result);
    } catch (error) {
        console.log("Error", error);
    }
}

// Función actualizar tabla
const actualizarTabla = () => {
    let tbody = document.getElementById('tbody');
    let total = 0;
    tbody.innerHTML = "";
    for (let item of productos) {
        let fila = tbody.insertRow();
        let celdaImagen = fila.insertCell(0);
        let celdaProducto = fila.insertCell(1);
        let celdaCantidad = fila.insertCell(2);
        let celdaPrecio = fila.insertCell(3);
        let celdaTotal = fila.insertCell(4);
        let celdaBoton = fila.insertCell(5);
        
        let img = document.createElement('img');
        img.src = item.imagen;
        img.alt = item.producto;
        img.style.width = '50px';
        celdaImagen.appendChild(img);
        
        celdaProducto.textContent = item.producto;

        // Verifica que 'cantidad' no sea undefined o null
        if (item.cantidad !== undefined && item.cantidad !== null) {
            celdaCantidad.innerHTML = `<input type="number" class="form-control quantity-input" data-id="${item.id}" value="${item.cantidad}">`;
        } else {
            celdaCantidad.innerHTML = `<input type="number" class="form-control quantity-input" data-id="${item.id}" value="1">`;
            console.error('Cantidad no válida para el producto:', item);
        }
        
        celdaPrecio.textContent = `$${item.precio}`;
        celdaTotal.textContent = `$${(item.precio * item.cantidad).toFixed(2)}`;

        let boton = document.createElement('button');
        boton.textContent = 'Borrar';
        boton.className = 'btn btn-danger remove-from-cart';
        boton.dataset.id = item.id;
        celdaBoton.appendChild(boton);

        total += item.precio * item.cantidad;
    }
    document.getElementById('total').textContent = total.toFixed(2);
    document.getElementById('cart-count').textContent = productos.length;
};

// Función eliminar
const eliminar = (id) => {
    let indice = productos.findIndex(p => p.id === id);
    if (indice !== -1) {
        productos.splice(indice, 1);
        updateLocalStorage();
        actualizarTabla();
        deleteJson(id);
    }
};

// Función delete asincrónica
async function deleteJson(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE",
        });
        const result = await response.json();
        console.log("Exitoso:", result);
    } catch (error) {
        console.log("Error", error);
    }
}

// Función acceder
async function getJson() {
    try {
        const response = await fetch(`http://localhost:3000/productos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log("Exitoso:", result);
        productos = result;
        actualizarTabla();
    } catch (error) {
        console.log("Error", error);
    }
}

window.onload = () => {
    getJson();
};

// Event listeners
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-from-cart')) {
        let id = event.target.dataset.id;
        eliminar(id);
    }
});

document.addEventListener('change', function(event) {
    if (event.target.classList.contains('quantity-input')) {
        let id = event.target.dataset.id;
        let cantidad = parseInt(event.target.value);
        let producto = productos.find(p => p.id === id);
        if (producto) {
            producto.cantidad = cantidad;
            updateLocalStorage();
            actualizarTabla();
            putJson(producto);
        }
    }
});
