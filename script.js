// 1. Enhanced Food Data with high-quality real images from Unsplash
const menuItems = [
    { 
        id: 1, 
        category: "Burger", 
        name: "Classic Cheeseburger", 
        desc: "Juicy beef patty, melted cheddar, fresh lettuce, and our secret sauce.", 
        price: 8.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        allergies: ["Milk", "Gluten"],
        nutrition: { calories: 550, protein: "30g", carbs: "45g", fats: "25g" },
        isVeg: false
    },
    { 
        id: 2, 
        category: "Pizza", 
        name: "Margherita Pizza", 
        desc: "Authentic Neapolitan pizza with San Marzano tomato sauce and fresh mozzarella.", 
        price: 14.50,
        discount: 15,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80",
        allergies: ["Milk", "Gluten"],
        nutrition: { calories: 800, protein: "36g", carbs: "90g", fats: "32g" },
        isVeg: true
    },
    { 
        id: 3, 
        category: "Pizza", 
        name: "Pepperoni Feast", 
        desc: "Loaded with crispy pepperoni slices and extra mozzarella cheese.", 
        price: 16.99,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80",
        allergies: ["Milk", "Gluten"],
        nutrition: { calories: 950, protein: "45g", carbs: "95g", fats: "42g" },
        isVeg: false
    },
    { 
        id: 4, 
        category: "Asian", 
        name: "Spicy Ramen", 
        desc: "Rich pork broth, chashu, soft boiled egg, and perfectly cooked noodles.", 
        price: 12.00,
        image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=500&q=80",
        allergies: ["Eggs", "Gluten", "Soy"],
        nutrition: { calories: 600, protein: "25g", carbs: "70g", fats: "22g" },
        isVeg: false
    },
    { 
        id: 5, 
        category: "Asian", 
        name: "Sushi Platter", 
        desc: "Assorted fresh sashimi, nigiri, and maki rolls beautifully arranged.", 
        price: 24.99,
        discount: 20,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80",
        allergies: ["Fish", "Soy"],
        nutrition: { calories: 450, protein: "35g", carbs: "65g", fats: "10g" },
        isVeg: false
    },
    { 
        id: 6, 
        category: "Burger", 
        name: "Crispy Chicken Burger", 
        desc: "Buttermilk fried chicken breast with spicy mayo and pickles.", 
        price: 9.50,
        discount: 10,
        image: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?auto=format&fit=crop&w=500&q=80",
        allergies: ["Milk", "Gluten", "Eggs"],
        nutrition: { calories: 620, protein: "28g", carbs: "55g", fats: "30g" },
        isVeg: false
    },
    { 
        id: 7, 
        category: "Dessert", 
        name: "Chocolate Lava Cake", 
        desc: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.", 
        price: 7.50,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80",
        allergies: ["Milk", "Gluten", "Eggs"],
        nutrition: { calories: 480, protein: "6g", carbs: "52g", fats: "28g" },
        isVeg: true
    },
    { 
        id: 8, 
        category: "Dessert", 
        name: "New York Cheesecake", 
        desc: "Classic creamy cheesecake with a graham cracker crust and berry compote.", 
        price: 6.99,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80",
        allergies: ["Milk", "Gluten", "Eggs"],
        nutrition: { calories: 450, protein: "7g", carbs: "35g", fats: "32g" },
        isVeg: true
    },
    { 
        id: 9, 
        category: "Pizza", 
        name: "BBQ Chicken Pizza", 
        desc: "Tangy BBQ sauce, grilled chicken, red onions, and fresh cilantro.", 
        price: 15.99,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80",
        allergies: ["Milk", "Gluten"],
        nutrition: { calories: 850, protein: "42g", carbs: "98g", fats: "30g" },
        isVeg: false
    }
];

// --- State ---
// Initialize cart from localStorage if available
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let activeCategory = "All";

// --- DOM Elements ---
// Views & Nav
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view');

// Menu
const menuGrid = document.getElementById('menu-grid');
const categoryBtns = document.querySelectorAll('.cat-btn');

// Cart & Checkout
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const navCartBadge = document.getElementById('nav-cart-badge');
const checkoutTotalEl = document.getElementById('checkout-total');
const checkoutForm = document.getElementById('checkout-form');
const placeOrderBtn = document.getElementById('place-order-btn');

// Modals
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success-btn');

// --- View Routing Logic ---
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Hide all views, show targeted view
        views.forEach(view => {
            view.classList.remove('active');
            if (view.id === targetId) {
                view.classList.add('active');
            }
        });
        
        // Scroll to top on view change
        window.scrollTo(0, 0);
    });
});

// --- Menu Rendering Logic ---
function renderMenu(items) {
    menuGrid.innerHTML = '';
    
    if (items.length === 0) {
        menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No items found.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        
        let priceHtml = '';
        if (item.discount) {
            const discountedPrice = item.price * (1 - item.discount / 100);
            priceHtml = `
                <div class="price-container">
                    <span class="original-price">$${item.price.toFixed(2)}</span>
                    <span class="card-price">$${discountedPrice.toFixed(2)}</span>
                </div>
            `;
        } else {
            priceHtml = `<span class="card-price">$${item.price.toFixed(2)}</span>`;
        }

        const badgeHtml = item.discount ? `<div class="discount-badge">${item.discount}% OFF</div>` : '';

        let metadataHtml = '';
        if (item.allergies || item.nutrition || item.isVeg !== undefined) {
            const dietType = item.isVeg ? 'veg' : 'non-veg';
            const dietLabel = item.isVeg ? 'Veg' : 'Non-Veg';
            const allergyText = item.allergies ? item.allergies.join(', ') : 'None';
            
            metadataHtml = `
                <div class="food-metadata">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="diet-indicator ${dietType}">
                            <span class="diet-icon"></span> ${dietLabel}
                        </span>
                        <div class="allergy-info" title="Allergens">
                            <i class="ph-fill ph-warning-circle"></i> ${allergyText}
                        </div>
                    </div>
                    <div class="nutrition-info">
                        <span class="nutrition-item">🔥 ${item.nutrition?.calories || 0} kcal</span>
                        <span class="nutrition-item">🥩 P: ${item.nutrition?.protein || '0g'}</span>
                        <span class="nutrition-item">🌾 C: ${item.nutrition?.carbs || '0g'}</span>
                        <span class="nutrition-item">🥑 F: ${item.nutrition?.fats || '0g'}</span>
                    </div>
                </div>
            `;
        }

        card.innerHTML = `
            ${badgeHtml}
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${item.name}</h3>
                    ${priceHtml}
                </div>
                <p class="card-desc">${item.desc}</p>
                ${metadataHtml}
                <button class="add-btn" onclick="addToCart(${item.id}, this)">
                    <i class="ph ph-plus"></i> Add
                </button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Initial Menu Render
renderMenu(menuItems);

// --- API Feature: Fetch Daily Special ---
const dailySpecialSection = document.getElementById('daily-special-section');

async function fetchDailySpecial() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];
        
        const specialItem = {
            id: parseInt(meal.idMeal),
            category: "Special",
            name: meal.strMeal,
            desc: `Today's Chef Special: A delicious ${meal.strArea} ${meal.strCategory} dish!`,
            price: 12.99,
            image: meal.strMealThumb
        };
        
        // Add to global menu items if not present so cart works
        if (!menuItems.find(i => i.id === specialItem.id)) {
            menuItems.push(specialItem);
        }
        
        if (dailySpecialSection) {
            dailySpecialSection.innerHTML = `
                <div class="special-banner">
                    <div class="special-info">
                        <span class="special-badge"><i class="ph-fill ph-star"></i> Daily Special</span>
                        <h3>${specialItem.name}</h3>
                        <p>${specialItem.desc}</p>
                        <div class="special-footer">
                            <span class="special-price">$${specialItem.price.toFixed(2)}</span>
                            <button class="add-btn" onclick="addToCart(${specialItem.id}, this)">
                                <i class="ph ph-plus"></i> Add Special
                            </button>
                        </div>
                    </div>
                    <div class="special-img-container">
                        <img src="${specialItem.image}" alt="${specialItem.name}">
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error("Failed to fetch daily special:", error);
        if (dailySpecialSection) {
            dailySpecialSection.style.display = 'none';
        }
    }
}

fetchDailySpecial();

// Category Filtering
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        activeCategory = btn.getAttribute('data-category');
        
        const filtered = menuItems.filter(item => {
            return activeCategory === "All" || item.category === activeCategory;
        });
        
        renderMenu(filtered);
    });
});

// --- Cart Logic ---
window.addToCart = function(itemId, btnElement) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Button animation feedback
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="ph ph-check"></i> Added';
    btnElement.style.background = 'var(--primary-color)';
    btnElement.style.color = 'white';
    
    setTimeout(() => {
        btnElement.innerHTML = originalText;
        btnElement.style.background = '';
        btnElement.style.color = '';
    }, 1000);

    updateCart();
}

window.updateQuantity = function(itemId, change) {
    const itemIndex = cart.findIndex(i => i.id === itemId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function updateCart() {
    // Update nav badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    navCartBadge.textContent = totalItems;
    
    // Re-trigger badge pop animation
    navCartBadge.style.animation = 'none';
    navCartBadge.offsetHeight; // trigger reflow
    navCartBadge.style.animation = 'pop 0.3s ease';

    // Update Cart View UI
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="ph ph-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotalEl.textContent = '0.00';
        checkoutTotalEl.textContent = '0.00';
        placeOrderBtn.disabled = true;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        total += itemPrice * item.quantity;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${(itemPrice * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i class="ph ph-minus"></i>
                </button>
                <span class="cart-item-qty">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class="ph ph-plus"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
    
    cartTotalEl.textContent = total.toFixed(2);
    checkoutTotalEl.textContent = total.toFixed(2);
    placeOrderBtn.disabled = false;
}

// Initial cart render (from localStorage)
updateCart();

// --- Checkout & Validation Logic ---
const btnLocation = document.getElementById('btn-location');
const addressInput = document.getElementById('address');

if (btnLocation) {
    btnLocation.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            btnLocation.innerHTML = '<i class="ph ph-spinner ph-spin"></i>';
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                    const data = await res.json();
                    if (data && data.display_name) {
                        addressInput.value = data.display_name;
                    } else {
                        addressInput.value = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
                    }
                } catch (e) {
                    addressInput.value = `Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`;
                } finally {
                    btnLocation.innerHTML = '<i class="ph ph-crosshair"></i> Detect';
                }
            }, () => {
                alert("Location access denied or failed.");
                btnLocation.innerHTML = '<i class="ph ph-crosshair"></i> Detect';
            });
        } else {
            alert("Geolocation is not supported by your browser");
        }
    });
}

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Generate Delivery Data
    const now = new Date();
    const deliveryMins = Math.floor(Math.random() * 15) + 25; // 25-40 mins
    now.setMinutes(now.getMinutes() + deliveryMins);
    const deliveryTimeText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const deliveryBoys = ["Alex Johnson", "Rahul Sharma", "John Doe", "Mike Smith"];
    const boyName = deliveryBoys[Math.floor(Math.random() * deliveryBoys.length)];
    const phoneNum = "+91 " + Math.floor(6000000000 + Math.random() * 3999999999);
    
    const timeEl = document.getElementById('delivery-time-text');
    if (timeEl) timeEl.textContent = `${deliveryMins} minutes (arriving at ${deliveryTimeText})`;
    
    const nameEl = document.getElementById('partner-name');
    if (nameEl) nameEl.textContent = boyName;
    
    const phoneEl = document.getElementById('partner-phone');
    if (phoneEl) phoneEl.innerHTML = `<i class="ph ph-phone"></i> ${phoneNum}`;
    
    // Show success modal
    successModal.classList.add('active');
    
    // Clear Cart & LocalStorage
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    
    // Reset Form
    checkoutForm.reset();
});

closeSuccessBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    // Navigate back to Home view
    navLinks[0].click();
});
