// Cart functionality
let cart = [];

// DOM Elements
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeModal = document.querySelector('.close-modal');
const checkoutForm = document.getElementById('checkout-form');
const orderItems = document.getElementById('order-items');
const orderTotal = document.getElementById('order-total');

// Toggle Cart
cartToggle.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product-item');
        const name = product.querySelector('h3').textContent;
        const price = parseFloat(product.querySelector('p').textContent.replace('$', ''));
        const image = product.querySelector('img').src;

        addToCart({ name, price, image });
    });
});

function addToCart(item) {
    cart.push(item);
    updateCart();
    
    // Show a quick confirmation
    const notification = document.createElement('div');
    notification.textContent = `${item.name} added to cart!`;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div>
                <div>${item.name}</div>
                <div>$${item.price.toFixed(2)}</div>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    cartSidebar.classList.remove('active');
    checkoutModal.style.display = 'block';
    updateOrderSummary();
});

closeModal.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

function updateOrderSummary() {
    orderItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        orderItems.appendChild(li);
        total += item.price;
    });
    
    orderTotal.textContent = total.toFixed(2);
}

// Form Submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your server
    alert('Order placed successfully! Thank you for your purchase.');
    cart = [];
    updateCart();
    checkoutModal.style.display = 'none';
    checkoutForm.reset();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});