// ============================================================
//  MIRACLE PARK GARDENS & HOTEL BUJUUKO - COMPLETE JAVASCRIPT
//  Pages: Home | About | Contact | Menu | Cart
// ============================================================

(function () {
    // ---- Dynamic greeting rotation ----
    const msgEl = document.getElementById('dynamic-greeting');
    if (msgEl) {
        const messages = [
            '📍 Miracle Park · Bujuuko',
            '🚗 1.5km from Bujuuko town off Mityana road',
            '🌳 Your Perfect Escape for Relaxation, Adventure, and Memorable Celebrations',
            '📞 Book now: +256757576806 / +256782230255',
        ];
        let index = 0;
        setInterval(() => {
            index = (index + 1) % messages.length;
            msgEl.textContent = messages[index];
        }, 4500);
    }

    // ---- Lightbox functionality ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');

    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach((img) => {
        img.addEventListener('click', function () {
            if (lightbox) {
                lightbox.classList.add('show');
                lightboxImage.src = this.src;
                const captionText = this.alt || this.src.split('/').pop();
                lightboxCaption.textContent = captionText;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightboxFn() {
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFn);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                closeLightboxFn();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
            closeLightboxFn();
        }
    });

    // ---- Contact Form Handler (UPDATED - Works with Formspree) ----
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                formStatus.className = 'form-status error';
                formStatus.textContent = '⚠️ Please fill in all required fields.';
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                e.preventDefault();
                formStatus.className = 'form-status error';
                formStatus.textContent = '⚠️ Please enter a valid email address.';
                return;
            }
            
            formStatus.className = 'form-status sending';
            formStatus.textContent = '⏳ Sending your message...';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
        });
    }

    // ---- Highlight current page in nav ----
    document.addEventListener('DOMContentLoaded', function () {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.vertical-nav-bottom .nav-item-bottom');
        navItems.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            }
        });
        updateCartCount();
        renderFeaturedMenu();
        renderFullMenu();
        renderCartPage();
        setupCategoryTabs();
    });

    // ============================================================
    // MENU DATA (UPDATED WITH ALL DISH PHOTOS)
    // ============================================================
    const menuItems = [
        // ----- Goat Dishes -----
        { id: 1, name: 'Pan Fried Goat', category: 'goat', price: 40000, image: 'pan-fried-goat.jpeg', desc: 'Well tendered goat cubes with vegetables & salad' },
        { id: 2, name: 'Honey BBQ Sauce Goat', category: 'goat', price: 40000, image: 'honey-bbq-goat.jpeg', desc: 'Grilled goat cubes in sweet sauce with salad' },
        { id: 3, name: 'Goat Ribs', category: 'goat', price: 40000, image: 'goat-ribs.jpeg', desc: 'Seasoned ribs grilled to tender in sweet sauce' },
        { id: 4, name: 'Whole Goat Rib Cages', category: 'goat', price: 160000, image: 'whole-goat-rib-cages.jpeg', desc: '3.5kg goat ribs, marinated & grilled to tender' },

        // ----- Beef Dishes -----
        { id: 5, name: 'Pan Fried Beef', category: 'beef', price: 35000, image: 'pan-fried-beef.jpeg', desc: 'Tender beef cubes in mixed vegetable soup, served wet & tasty' },
        { id: 6, name: 'Beef Skewers', category: 'beef', price: 30000, image: 'beef-skewers.jpeg', desc: 'Beef cubes on stick with veggies, well marinated wet & grilled' },
        { id: 7, name: 'Grilled Beef Steak', category: 'beef', price: 40000, image: 'grilled-beef-steak.jpeg', desc: 'Well marinated beef steak grilled to perfection & served juicy' },
        { id: 8, name: 'Tender Liver', category: 'beef', price: 40000, image: 'tender-liver.jpeg', desc: 'Well seasoned liver cubes or strips with fresh vegetables' },

        // ----- Chicken Dishes -----
        { id: 9, name: 'Grilled Whole Chicken', category: 'chicken', price: 100000, image: 'grilled-whole-chicken.jpeg', desc: 'Whole chicken grilled to perfection' },
        { id: 10, name: 'Half Whole Chicken', category: 'chicken', price: 50000, image: 'half-whole-chicken.jpeg', desc: 'Half chicken grilled to perfection' },
        { id: 11, name: 'Quarter Chicken', category: 'chicken', price: 30000, image: 'quarter-chicken.jpeg', desc: 'Quarter chicken grilled or fried' },
        { id: 12, name: 'Pan Fried Chicken', category: 'chicken', price: 30000, image: 'pan-fried-chicken.jpeg', desc: 'Pan-fried chicken with vegetables' },
        { id: 13, name: 'Chicken Nuggets', category: 'chicken', price: 30000, image: 'chicken-nuggets.jpeg', desc: 'Crispy chicken nuggets' },
        { id: 14, name: 'Chicken Skewer', category: 'chicken', price: 30000, image: 'chicken-skewer.jpeg', desc: 'Chicken cubes on stick with veggies' },
        { id: 15, name: 'Chicken Fried Rice', category: 'chicken', price: 30000, image: 'chicken-fried-rice.jpeg', desc: 'Chicken fried rice with vegetables' },
        { id: 16, name: 'Plain Chicken', category: 'chicken', price: 25000, image: 'plain-chicken.jpeg', desc: 'Plain chicken served with salad' },

        // ----- Fish Dishes -----
        { id: 17, name: 'Fried Whole Fish', category: 'fish', price: 50000, image: 'fried-whole-fish.jpeg', desc: 'Whole fish marinated & deep-fried' },
        { id: 18, name: 'Grilled Fish Fillet', category: 'fish', price: 35000, image: 'grilled-fish-fillet.jpeg', desc: 'Fish fillet grilled or deep-fried' },
        { id: 19, name: 'Fish Fingers', category: 'fish', price: 35000, image: 'fish-fingers.jpeg', desc: 'Fish fillet strips, bread crumb fried' },
        { id: 20, name: 'Special Kibecos', category: 'fish', price: 0, image: 'special-kibecos.jpeg', desc: 'Whole fish tilapia with veggies & matooke' },

        // ----- Curry & Pork -----
        { id: 21, name: 'Chicken Curry', category: 'curry', price: 35000, image: 'chicken-curry.jpeg', desc: 'Chicken fillet cubes in blended curry sauce' },
        { id: 22, name: 'Fish Curry', category: 'curry', price: 35000, image: 'fish-curry.jpeg', desc: 'Fish fillet cubes in tasty curry sauce' },
        { id: 23, name: 'Vegetable Curry', category: 'curry', price: 30000, image: 'vegetable-curry.jpeg', desc: 'Mixture of steamed vegetables in curry sauce' },
        { id: 24, name: 'Chicken Tikka Masala', category: 'curry', price: 40000, image: 'chicken-tikka-masala.jpeg', desc: 'Chicken cubes in tikka masala sauce' },
        { id: 25, name: 'Pan Fried Pork', category: 'curry', price: 50000, image: 'pan-fried-pork.jpeg', desc: 'Pan fried pork chops' },
        { id: 26, name: 'Pork Chops', category: 'curry', price: 50000, image: 'pork-chops.jpeg', desc: 'Grilled pork chops' },
        { id: 27, name: 'Pork Ribs', category: 'curry', price: 40000, image: 'pork-ribs.jpeg', desc: 'Seasoned pork ribs' },

        // ----- Fast Food -----
        { id: 28, name: 'Chicken Burger', category: 'fastfood', price: 35000, image: 'chicken-burger.jpeg', desc: 'Chicken burger with lettuce & sauce' },
        { id: 29, name: 'Beef Burger', category: 'fastfood', price: 35000, image: 'beef-burger.jpeg', desc: 'Beef burger with lettuce & sauce' },
        { id: 30, name: 'Chapati', category: 'fastfood', price: 3000, image: 'chapati.jpeg', desc: 'Plain chapati' },
        { id: 31, name: 'Rolex', category: 'fastfood', price: 5000, image: 'rolex.jpeg', desc: 'Chapati with eggs and vegetables' },
        { id: 32, name: 'Plain Chips', category: 'fastfood', price: 10000, image: 'plain-chips.jpeg', desc: 'Freshly fried chips' },
        { id: 33, name: 'Chaps', category: 'fastfood', price: 8000, image: 'chaps.jpeg', desc: 'Chapatis with sauce' },
        { id: 34, name: 'Kebabs', category: 'fastfood', price: 8000, image: 'kebabs.jpeg', desc: 'Grilled beef kebabs' },
        { id: 35, name: 'Beef Sausage (Pair)', category: 'fastfood', price: 8000, image: 'beef-sausage-pair.jpeg', desc: 'Pair of beef sausages' },
        { id: 36, name: 'Beef Samosas (3)', category: 'fastfood', price: 8000, image: 'beef-samosas-3.jpeg', desc: '3 beef samosas' },
        { id: 37, name: 'Chicken Wings', category: 'fastfood', price: 20000, image: 'chicken-wings.jpeg', desc: 'Grilled chicken wings' },
        { id: 38, name: 'Chicken Chips', category: 'fastfood', price: 30000, image: 'chips-chicken.jpeg', desc: 'Chicken with chips' },
        { id: 39, name: 'Combo Lusaniya', category: 'fastfood', price: 160000, image: 'combo-lusaniya.jpeg', desc: 'Featuring half whole chicken, liver sausages, fried goat, chips, chapatti, salads & fruits' },
        { id: 40, name: 'Mini Combo Lusaniya', category: 'fastfood', price: 95000, image: 'mini-combo-lusaniya.jpeg', desc: 'All items in small quantities' },

        // ----- Pizza -----
        { id: 41, name: 'Chicken Pizza (Large)', category: 'pizza', price: 40000, image: 'chicken-pizza-large.jpeg', desc: 'Large chicken pizza' },
        { id: 42, name: 'Chicken Pizza (Small)', category: 'pizza', price: 25000, image: 'chicken-pizza-small.jpeg', desc: 'Small chicken pizza' },
        { id: 43, name: 'Beef Pizza (Large)', category: 'pizza', price: 40000, image: 'beef-pizza-large.jpeg', desc: 'Large beef pizza' },
        { id: 44, name: 'Beef Pizza (Small)', category: 'pizza', price: 25000, image: 'beef-pizza-small.jpeg', desc: 'Small beef pizza' },
        { id: 45, name: 'Vegetable Pizza (Large)', category: 'pizza', price: 35000, image: 'vegetable-pizza-large.jpeg', desc: 'Large vegetable pizza' },
        { id: 46, name: 'Vegetable Pizza (Small)', category: 'pizza', price: 25000, image: 'vegetable-pizza-small.jpeg', desc: 'Small vegetable pizza' },
        { id: 47, name: 'Tomato Pizza', category: 'pizza', price: 30000, image: 'tomato-pizza.jpeg', desc: 'Tomato & cheese pizza' },

        // ----- Beverages - Tea & Coffee -----
        { id: 48, name: 'African Tea', category: 'beverages', price: 10000, image: 'african-tea.jpeg', desc: 'Traditional African tea' },
        { id: 49, name: 'Black Tea', category: 'beverages', price: 5000, image: 'black-tea.jpeg', desc: 'Plain black tea' },
        { id: 50, name: 'Dawa Tea', category: 'beverages', price: 10000, image: 'dawa-tea.jpeg', desc: 'Spiced dawa tea' },
        { id: 51, name: 'English Tea', category: 'beverages', price: 12000, image: 'english-tea.jpeg', desc: 'English breakfast tea' },
        { id: 52, name: 'African Coffee', category: 'beverages', price: 10000, image: 'african-coffee.jpeg', desc: 'Traditional African coffee' },
        { id: 53, name: 'Black Coffee', category: 'beverages', price: 5000, image: 'black-coffee.jpeg', desc: 'Plain black coffee' },
        { id: 54, name: 'Cappuccino (Single)', category: 'beverages', price: 8000, image: 'cappuccino-single.jpeg', desc: 'Single cappuccino' },
        { id: 55, name: 'Cappuccino (Double)', category: 'beverages', price: 10000, image: 'cappuccino-double.jpeg', desc: 'Double cappuccino' },
        { id: 56, name: 'Cafe Latte', category: 'beverages', price: 10000, image: 'cafe-latte.jpeg', desc: 'Cafe latte' },
        { id: 57, name: 'Espresso (Single)', category: 'beverages', price: 6000, image: 'espresso-single.jpeg', desc: 'Single espresso' },
        { id: 58, name: 'Espresso (Double)', category: 'beverages', price: 7000, image: 'espresso-double.jpeg', desc: 'Double espresso' },
        { id: 59, name: 'Plain Water', category: 'beverages', price: 5000, image: 'plain-water.jpeg', desc: 'Mineral water' },

        // ----- Beverages - Soft Drinks & Juices -----
        { id: 60, name: 'Soda', category: 'beverages', price: 3000, image: 'soda.jpeg', desc: 'Soft drink' },
        { id: 61, name: 'Water', category: 'beverages', price: 2000, image: 'water.jpeg', desc: 'Bottled water' },
        { id: 62, name: 'Passion Fruit Juice', category: 'beverages', price: 10000, image: 'passion-fruit-juice.jpeg', desc: 'Fresh passion fruit juice' },
        { id: 63, name: 'Melon Juice', category: 'beverages', price: 10000, image: 'melon-juice.jpeg', desc: 'Fresh melon juice' },
        { id: 64, name: 'Pineapple Juice', category: 'beverages', price: 10000, image: 'pineapple-juice.jpeg', desc: 'Fresh pineapple juice' },
        { id: 65, name: 'Lemon Juice', category: 'beverages', price: 12000, image: 'lemon-juice.jpeg', desc: 'Fresh lemon juice' },
        { id: 66, name: 'Mango Juice', category: 'beverages', price: 10000, image: 'mango-juice.jpeg', desc: 'Fresh mango juice' },
        { id: 67, name: 'Red Juice', category: 'beverages', price: 15000, image: 'red-juice.jpeg', desc: 'Special red juice' },
        { id: 68, name: 'Avocado Juice', category: 'beverages', price: 10000, image: 'avocado-juice.jpeg', desc: 'Fresh avocado juice' },
        { id: 69, name: 'Banana Juice', category: 'beverages', price: 10000, image: 'banana-juice.jpeg', desc: 'Fresh banana juice' },
        { id: 70, name: 'Cocktails', category: 'beverages', price: 10000, image: 'cocktails.jpeg', desc: 'Special cocktails' },

        // ----- Starters -----
        { id: 71, name: 'Fresh Garden Salad', category: 'starters', price: 20000, image: 'fresh-garden-salad.jpeg', desc: 'A mix of seasonal vegetables' },
        { id: 72, name: 'Chicken Caesar Salad', category: 'starters', price: 30000, image: 'chicken-caesar-salad.jpeg', desc: 'Full of lettuce, chicken breast cubes, grapes with caesar' },
        { id: 73, name: 'Chicken & Fruit Salad', category: 'starters', price: 30000, image: 'chicken-fruit-salad.jpeg', desc: 'Tender grilled chicken cubes on a bed of fresh veggies' },
        { id: 74, name: 'Spanish Omelette', category: 'starters', price: 8000, image: 'spanish-omelette.jpeg', desc: 'Spanish-style omelette' },
        { id: 75, name: 'Scrambled Eggs', category: 'starters', price: 8000, image: 'scrambled-eggs.jpeg', desc: 'Scrambled eggs' },
        { id: 76, name: 'Plain Omelette', category: 'starters', price: 5000, image: 'plain-omelette.jpeg', desc: 'Plain omelette' },
        { id: 77, name: 'Boiled Eggs', category: 'starters', price: 5000, image: 'boiled-eggs.jpeg', desc: 'Boiled eggs' },
        { id: 78, name: 'Fried Eggs', category: 'starters', price: 5000, image: 'fried-eggs.jpeg', desc: 'Fried eggs' },
    ];

    // ============================================================
    // CART FUNCTIONALITY
    // ============================================================
    let cart = [];

    function getCart() {
        try {
            const stored = localStorage.getItem('miracleParkCart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    function saveCart() {
        localStorage.setItem('miracleParkCart', JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(itemId) {
        cart = getCart();
        const existing = cart.find(item => item.id === itemId);
        if (existing) {
            existing.quantity += 1;
        } else {
            const menuItem = menuItems.find(item => item.id === itemId);
            if (menuItem && menuItem.price > 0) {
                cart.push({ ...menuItem, quantity: 1 });
            }
        }
        saveCart();
        showToast(`${menuItems.find(i => i.id === itemId)?.name || 'Item'} added to cart!`);
        updateCartCount();
    }

    function removeFromCart(itemId) {
        cart = getCart();
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        renderCartPage();
        updateCartCount();
    }

    function updateQuantity(itemId, change) {
        cart = getCart();
        const item = cart.find(i => i.id === itemId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== itemId);
            }
            saveCart();
            renderCartPage();
            updateCartCount();
        }
    }

    function getTotal() {
        cart = getCart();
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    function updateCartCount() {
        cart = getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }

    // ============================================================
    // TOAST NOTIFICATION
    // ============================================================
    function showToast(message) {
        const toast = document.getElementById('cartToast');
        const msgEl = document.getElementById('toastMessage');
        if (toast && msgEl) {
            msgEl.textContent = message;
            toast.classList.add('show');
            clearTimeout(toast._timeout);
            toast._timeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }
    }

    // ============================================================
    // RENDER FEATURED MENU (Homepage)
    // ============================================================
    function renderFeaturedMenu() {
        const container = document.getElementById('featuredMenu');
        if (!container) return;
        
        const featured = menuItems.filter(item => item.price > 0).slice(0, 8);
        
        container.innerHTML = featured.map(item => `
            <div class="menu-card">
                <img src="${item.image || 'garden1.jpeg'}" alt="${item.name}" class="menu-card-image" onerror="this.src='garden1.jpeg'" />
                <div class="menu-card-body">
                    <h3 class="menu-card-title">${item.name}</h3>
                    ${item.desc ? `<p class="menu-card-desc">${item.desc}</p>` : ''}
                    <p class="menu-card-price">${item.price.toLocaleString()}/=</p>
                    <button class="btn-add-cart" onclick="addToCart(${item.id})"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                </div>
            </div>
        `).join('');
    }

    // ============================================================
    // RENDER FULL MENU (Menu Page - No "All" Category)
    // ============================================================
    function renderFullMenu(category = 'goat') {
        const container = document.getElementById('fullMenu');
        if (!container) return;
        
        let filtered = menuItems.filter(item => item.category === category);
        filtered = filtered.filter(item => item.price > 0);
        
        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="text-align:center;padding:2rem;grid-column:1/-1;">
                    <p style="color:var(--coffee-light);">No items found in this category.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filtered.map(item => `
            <div class="menu-card">
                <img src="${item.image || 'garden1.jpeg'}" alt="${item.name}" class="menu-card-image" onerror="this.src='garden1.jpeg'" />
                <div class="menu-card-body">
                    <h3 class="menu-card-title">${item.name}</h3>
                    ${item.desc ? `<p class="menu-card-desc">${item.desc}</p>` : ''}
                    <p class="menu-card-price">${item.price.toLocaleString()}/=</p>
                    <button class="btn-add-cart" onclick="addToCart(${item.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // ============================================================
    // CATEGORY TABS (No "All" Button)
    // ============================================================
    function setupCategoryTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        if (!tabs.length) return;
        
        // Set default active tab to "goat"
        const defaultTab = document.querySelector('.tab-btn[data-category="goat"]');
        if (defaultTab) {
            defaultTab.classList.add('active');
            renderFullMenu('goat');
        }
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const category = this.dataset.category;
                renderFullMenu(category);
            });
        });
    }

    // ============================================================
    // RENDER CART PAGE
    // ============================================================
    function renderCartPage() {
        const container = document.getElementById('cartItems');
        const summary = document.getElementById('cartSummary');
        if (!container || !summary) return;
        
        cart = getCart();
        
        if (cart.length === 0) {
            container.innerHTML = `
                <div class="cart-items-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p style="color:var(--coffee-light);">Browse our menu and add some delicious items!</p>
                    <a href="menu.html" class="btn-primary" style="display:inline-block;margin-top:1rem;">
                        <i class="fas fa-utensils"></i> View Menu
                    </a>
                </div>
            `;
            summary.innerHTML = `
                <h3>Order Summary</h3>
                <div class="cart-summary-row">Total: UGX 0</div>
                <button class="btn-place-order" disabled>Cart is empty</button>
            `;
            return;
        }
        
        // Render cart items
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image || 'garden1.jpeg'}" alt="${item.name}" class="cart-item-img" onerror="this.src='garden1.jpeg'" />
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()}/= each</p>
                </div>
                <div class="cart-item-qty">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Render summary
        const total = getTotal();
        const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
        summary.innerHTML = `
            <h3>Order Summary</h3>
            <div class="cart-summary-row">Items: ${itemCount}</div>
            <div class="cart-summary-row total">Total: UGX ${total.toLocaleString()}</div>
            <button class="btn-place-order" onclick="placeOrder()">
                <i class="fas fa-whatsapp"></i> Place Order via WhatsApp
            </button>
            <button class="btn-place-order" onclick="placeOrderEmail()" style="background:var(--coffee-gold);color:var(--coffee-dark);margin-top:0.5rem;">
                <i class="fas fa-envelope"></i> Place Order via Email
            </button>
        `;
    }

    // ============================================================
    // PLACE ORDER (WhatsApp & Email)
    // ============================================================
    function placeOrder() {
        cart = getCart();
        if (cart.length === 0) return;
        
        let message = '🍽️ *New Order from Miracle Park Gardens & Hotel Bujuuko!*%0A%0A';
        message += '*Order Details:*%0A';
        cart.forEach(item => {
            message += `${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()}/=%0A`;
        });
        message += `%0A*Total: UGX ${getTotal().toLocaleString()}*%0A%0A`;
        message += 'Thank you for ordering from Miracle Park Gardens & Hotel Bujuuko! 🌿';
        
        const phone = '+256757576806';
        const url = `https://wa.me/${phone}?text=${message}`;
        
        // Clear cart after placing order
        cart = [];
        saveCart();
        renderCartPage();
        updateCartCount();
        
        window.open(url, '_blank');
    }

    function placeOrderEmail() {
        cart = getCart();
        if (cart.length === 0) return;
        
        let subject = 'New Order from Miracle Park Gardens & Hotel Bujuuko';
        let body = 'New Order from Miracle Park Gardens & Hotel Bujuuko!\n\n';
        body += 'Order Details:\n';
        cart.forEach(item => {
            body += `${item.name} x${item.quantity} = UGX ${(item.price * item.quantity).toLocaleString()}\n`;
        });
        body += `\nTotal: UGX ${getTotal().toLocaleString()}\n\n`;
        body += 'Thank you for ordering from Miracle Park Gardens & Hotel Bujuuko! 🌿';
        
        const email = 'miracleparkhotel@gmail.com';
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Clear cart after placing order
        cart = [];
        saveCart();
        renderCartPage();
        updateCartCount();
        
        window.open(url, '_blank');
    }

    // ============================================================
    // MENU CAROUSEL / SLIDESHOW (AUTO-PLAY EVERY 5 SECONDS)
    // ============================================================
    const slides = document.querySelectorAll('.menu-slide');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let autoPlayInterval;

    if (slides.length > 0) {
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('data-index', index);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        function goToSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            const dots = document.querySelectorAll('.dot');
            if (dots[index]) dots[index].classList.add('active');
            currentSlide = index;
            resetAutoPlay();
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        }

        function resetAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        document.addEventListener('keydown', function(e) {
            const carousel = document.querySelector('.menu-carousel');
            if (carousel) {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            }
        });

        const carousel = document.querySelector('.menu-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                if (autoPlayInterval) clearInterval(autoPlayInterval);
            });
            carousel.addEventListener('mouseleave', resetAutoPlay);
        }

        resetAutoPlay();
    }

    // Expose functions globally for onclick
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.placeOrder = placeOrder;
    window.placeOrderEmail = placeOrderEmail;

    console.log('🌿 Miracle Park Gardens & Hotel Bujuuko · Complete Website');
    console.log('📄 Pages: Home | Menu | About | Contact | Cart');
    console.log('📍 1.5km from Bujuuko town off Mityana road');
    console.log('📞 Bookings: +256757576806 / +256782230255');
    console.log('✨ Your Perfect Escape for Relaxation, Adventure, and Memorable Celebrations');
})();
