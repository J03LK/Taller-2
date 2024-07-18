document.addEventListener('DOMContentLoaded', () => {
    const productModal = document.getElementById('productModal');
    const productNameElement = document.getElementById('product-name');
    const productImageElement = document.getElementById('product-image');
    const productPriceElement = document.getElementById('product-price');
    const addToCartButton = document.getElementById('add-buy');

    productModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        const productImage = button.getAttribute('data-image');

        productNameElement.textContent = productName;
        productPriceElement.textContent = `$${productPrice}`;
        productImageElement.src = productImage;

        addToCartButton.setAttribute('data-product', productName);
        addToCartButton.setAttribute('data-price', productPrice);
    });

    addToCartButton.addEventListener('click', () => {
        const productName = addToCartButton.getAttribute('data-product');
        const productPrice = addToCartButton.getAttribute('data-price');
        const productImage = productImageElement.src;

        agregarProducto(productName, productPrice, productImage);
    });
});

function agregarProducto(nombre, precio, imagen) {
    fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            precio: parseFloat(precio),
            imagen: imagen
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar alerta de producto agregado al carrito
        alert('Producto agregado al carrito');
        actualizarContadorCarrito();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function actualizarContadorCarrito() {
    fetch('http://localhost:3000/productos')
        .then(response => response.json())
        .then(data => {
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = data.length;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
