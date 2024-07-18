$(document).ready(function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartTable() {
        let cartTable = $('#cart-table');
        cartTable.empty();
        let total = 0;
        cart.forEach((product, index) => {
            let productTotal = product.price * product.quantity;
            total += productTotal;
            cartTable.append(`
                <tr>
                    <td>${product.name}</td>
                    <td><input type="number" class="form-control quantity-input" data-index="${index}" value="${product.quantity}"></td>
                    <td>$${product.price}</td>
                    <td>$${productTotal.toFixed(2)}</td>
                    <td><button class="btn btn-danger remove-from-cart" data-index="${index}">Eliminar</button></td>
                </tr>
            `);
        });
        $('#cart-total').text(total.toFixed(2));
    }

    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateLocalStorage();
        updateCartTable();
        $('#cart-count').text(cart.length);
    }

    $(document).on('click', '.remove-from-cart', function() {
        let index = $(this).data('index');
        removeFromCart(index);
    });

    $(document).on('change', '.quantity-input', function() {
        let index = $(this).data('index');
        let quantity = $(this).val();
        cart[index].quantity = quantity;
        updateLocalStorage();
        updateCartTable();
    });

    updateCartTable();
});
