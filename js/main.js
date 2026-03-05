/**
 * Dragon Gaming Store - Main JavaScript
 * Template Top Up Game Premium
 */

// ============================================
// DOM Elements
// ============================================
document.addEventListener('DOMContentLoaded', function() {
     const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "true") {
        const adminMenu = document.getElementById("admin-menu");
        if (adminMenu) {
            adminMenu.style.display = "inline-flex";
        }
    }
    
    // ==================== NAVBAR SCROLL ====================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==================== MOBILE MENU TOGGLE ====================
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        const menuLinks = navbarMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });
    }

    // ==================== HERO SLIDER ====================
    initHeroSlider();

    // ==================== ANIMATE ON SCROLL ====================
    initScrollAnimations();

    // ==================== COUNTDOWN TIMER ====================
    initCountdown();

    // ==================== GAME CARDS ====================
    renderGameCards();

    // ==================== TESTIMONIALS ====================
    renderTestimonials();

    // ==================== FEATURES ====================
    renderFeatures();

    // ==================== NEWSLETTER FORM ====================
    initNewsletterForm();

    // ==================== TOAST NOTIFICATIONS ====================
    window.showToast = showToast;
});

// ============================================
// Hero Slider
// ============================================
function initHeroSlider() {
    const sliderContainer = document.querySelector('.hero-slider');
    if (!sliderContainer || typeof BANNERS === 'undefined') return;

    let currentSlide = 0;
    const slides = BANNERS;
    
    // Create slides
    const sliderInner = sliderContainer;
    sliderInner.innerHTML = '';

    slides.forEach((banner, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <div class="hero-slide-inner">
                <div class="hero-content">
                    <span class="hero-badge">${banner.judul}</span>
                    <h1>${banner.headline}</h1>
                    <p>${banner.subheadline}</p>
                    <div class="hero-buttons">
                        <a href="#games" class="btn btn-primary btn-lg">
                            <i class="fas fa-bolt"></i>
                            ${banner.teksTombol}
                        </a>
                        <a href="#help" class="btn btn-secondary btn-lg">
                            <i class="fas fa-headset"></i>
                            Bantuan
                        </a>
                    </div>
                </div>
            </div>
        `;
        sliderInner.appendChild(slide);
    });

    // Create dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'hero-dots';
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    sliderContainer.appendChild(dotsContainer);

    const slideElements = sliderContainer.querySelectorAll('.hero-slide');
    const dots = sliderContainer.querySelectorAll('.hero-dot');

    function goToSlide(index) {
        slideElements.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slideElements[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // Auto advance every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll('.game-card, .feature-card, .testimonial-card, .countdown-item');
    animateElements.forEach(el => observer.observe(el));
}

// ============================================
// Countdown Timer
// ============================================
function initCountdown() {
    const countdownContainer = document.querySelector('.countdown-timer');
    if (!countdownContainer) return;

    // Check if config exists
    let targetDate;
    if (typeof PROMO_COUNTDOWN !== 'undefined') {
        targetDate = new Date(PROMO_COUNTDOWN.targetDate).getTime();
    } else {
        targetDate = new Date('2025-12-31T23:59:59').getTime();
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownContainer.innerHTML = '<p style="color: var(--primary); font-size: 1.25rem;">Promo telah berakhir!</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Create countdown HTML if not exists
    if (!document.getElementById('days')) {
        countdownContainer.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-number" id="days">00</div>
                <div class="countdown-label">Hari</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="hours">00</div>
                <div class="countdown-label">Jam</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="minutes">00</div>
                <div class="countdown-label">Menit</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="seconds">00</div>
                <div class="countdown-label">Detik</div>
            </div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// Render Game Cards
// ============================================
function renderGameCards() {
    const gamesGrid = document.querySelector('.games-grid');
    if (!gamesGrid || typeof GAMES_CONFIG === 'undefined') return;

    gamesGrid.innerHTML = GAMES_CONFIG.map(game => `
        <div class="game-card" onclick="window.location.href='topup.html?game=${game.id}'">
            <div class="game-card-header">
                <img src="${game.ikon}" alt="${game.nama}" class="game-icon" onerror="this.src='https://via.placeholder.com/80?text=Game'">
                ${game.populer ? '<span class="game-badge">Populer</span>' : ''}
            </div>
            <h3>${game.nama}</h3>
            <p>Top up instan • Tersedia 24/7</p>
            <div class="game-card-arrow">
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    `).join('');
}

// ============================================
// Render Testimonials
// ============================================
function renderTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid || typeof TESTIMONIALS === 'undefined') return;

    testimonialsGrid.innerHTML = TESTIMONIALS.map(t => `
        <div class="testimonial-card">
            <div class="testimonial-header">
                <img src="${t.gambar}" alt="${t.nama}" class="testimonial-avatar">
                <div class="testimonial-info">
                    <h4>${t.nama}</h4>
                    <span>${t.game}</span>
                </div>
            </div>
            <div class="testimonial-rating">
                ${Array(t.rating).fill('<i class="fas fa-star"></i>').join('')}
            </div>
            <p class="testimonial-text">"${t.teks}"</p>
        </div>
    `).join('');
}

// ============================================
// Render Features
// ============================================
function renderFeatures() {
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid || typeof WHY_CHOOSE_US === 'undefined') return;

    featuresGrid.innerHTML = WHY_CHOOSE_US.map(feature => `
        <div class="feature-card">
            <div class="feature-icon">
                <i class="${feature.ikon}"></i>
            </div>
            <h3>${feature.judul}</h3>
            <p>${feature.deskripsi}</p>
        </div>
    `).join('');
}

// ============================================
// Newsletter Form
// ============================================
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            showToast('Terima kasih telah berlangganan!', 'success');
            form.reset();
        } else {
            showToast('Silakan masukkan email yang valid', 'error');
        }
    });
}

// ============================================
// Toast Notifications
// ============================================
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'success' ? 'check' : 'times'}"></i>
        </div>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// Loading Overlay
// ============================================
function showLoading() {
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
    }
    overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

window.showLoading = showLoading;
window.hideLoading = hideLoading;

// ============================================
// Copy to Clipboard
// ============================================
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Disalin!';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = 'var(--primary)';
        }, 2000);
        
        showToast('Disalin ke clipboard!', 'success');
    }).catch(() => {
        showToast('Gagal menyalin', 'error');
    });
}

window.copyToClipboard = copyToClipboard;

// ============================================
// Format Rupiah
// ============================================
function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

window.formatRupiah = formatRupiah;
