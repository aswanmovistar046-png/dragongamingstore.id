/**
 * Dragon Gaming Store - Top Up Page JavaScript
 * Multi-step Form Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get game from URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game') || 'mlbb';
    
    // Initialize page
    initTopUpPage(gameId);
});

// Initialize Top Up Page
function initTopUpPage(gameId) {
    const gameData = GAMES_CONFIG.find(g => g.id === gameId) || GAMES_CONFIG[0];
    
    if (!gameData) return;
    
    updateGameHeader(gameData);

    if (gameId !== 'mlbb') {
        const serverInput = document.getElementById('server-id');
        if (serverInput) {
            const serverGroup = serverInput.closest('.form-group');
            if (serverGroup) {
                serverGroup.style.display = 'none';
            }
            serverInput.removeAttribute('required');
        }
    }
    renderDenominations(gameId);
    setupPaymentMethods();
    initFormNavigation();
}


// Update Game Header
function updateGameHeader(gameData) {
    const titleEl = document.querySelector('.topup-game-info h2');
    const iconEl = document.querySelector('.topup-game-info img');
    
    if (titleEl) titleEl.textContent = 'Top Up ' + gameData.nama;
    if (iconEl && gameData.ikon.startsWith('http')) {
        iconEl.src = gameData.ikon;
    }
}

// Render Denomination Cards
function renderDenominations(gameId) {
    const denomGrid = document.querySelector('.denomination-grid');
    if (!denomGrid || typeof DENOMINATIONS === 'undefined') return;

    const denoms = DENOMINATIONS[gameId] || DENOMINATIONS.mlbb;

    let unitLabel = 'Diamond';
    let unitIcon = 'assets/icons/mlbb.png';

    switch(gameId) {
        case 'pubgm':
            unitLabel = 'UC';
            unitIcon = 'assets/icons/pubgm.png';
            break;
        case 'roblox':
            unitLabel = 'Robux';
            unitIcon = 'assets/icons/roblox.png';
            break;
        case 'codm':
            unitLabel = 'CP';
            unitIcon = 'assets/icons/codm.png';
            break;
        case 'efootball':
            unitLabel = 'Coin';
            unitIcon = 'assets/icons/efootball.png';
            break;
        case 'valorant':
            unitLabel = 'VP';
            unitIcon = 'assets/icons/valorant.png';
            break;
    }

    denomGrid.innerHTML = denoms.map((d, index) => {
        let amount = 0;

        if (d.diamond) amount = d.diamond;
        else if (d.uc) amount = d.uc;
        else if (d.robux) amount = d.robux;
        else if (d.cp) amount = d.cp;
        else if (d.coin) amount = d.coin;
        else if (d.vp) amount = d.vp;

        return `
            <div class="denom-card" 
                data-index="${index}" 
                onclick="selectDenomination(this, ${d.harga}, ${amount}, '${unitLabel}')">

                <div class="icon">
                    <img src="${unitIcon}" alt="${unitLabel}">
                </div>

                <div class="amount">${amount} ${unitLabel}</div>
                <div class="price">${formatRupiah(d.harga)}</div>
            </div>
        `;
    }).join('');
}

// Selected denomination data
let selectedDenomData = {
    price: 0,
    amount: 0,
    label: ''
};

// Select Denomination Card
window.selectDenomination = function(card, price, amount, label) {
    document.querySelectorAll('.denom-card').forEach(function(c) {
        c.classList.remove('selected');
    });
    card.classList.add('selected');
    
    selectedDenomData = {
        price: price,
        amount: amount,
        label: label
    };
    
    updateOrderSummary(price);
};

// Update Order Summary
function updateOrderSummary(selectedPrice) {
    const totalElements = document.querySelectorAll('.order-summary-total span:last-child');
    totalElements.forEach(function(el) {
        if (el && selectedPrice) {
            el.textContent = formatRupiah(selectedPrice);
        }
    });
    
    // Update summary item
    const summaryItem = document.getElementById('summary-item');
    if (summaryItem && selectedDenomData.amount) {
        summaryItem.textContent = selectedDenomData.amount + ' ' + selectedDenomData.label;
    }
}

// Setup Payment Methods
function setupPaymentMethods() {
    const bankTab = document.getElementById('bank-tab');
    const ewalletTab = document.getElementById('ewallet-tab');
    
    if (bankTab && ewalletTab) {
        bankTab.addEventListener('click', function() {
            bankTab.classList.add('active');
            ewalletTab.classList.remove('active');
            document.getElementById('bank-options').classList.add('active');
            document.getElementById('ewallet-options').classList.remove('active');
        });
        
        ewalletTab.addEventListener('click', function() {
            ewalletTab.classList.add('active');
            bankTab.classList.remove('active');
            document.getElementById('ewallet-options').classList.add('active');
            document.getElementById('bank-options').classList.remove('active');
        });
    }
    
    renderPaymentOptions();
}

// Render Payment Options
function renderPaymentOptions() {
    const bankOptions = document.getElementById('bank-options');
    const ewalletOptions = document.getElementById('ewallet-options');
    
    if (!bankOptions || !ewalletOptions) return;
    
    bankOptions.innerHTML = PAYMENT_METHODS.bank.map(function(method) {
        return '<div class="payment-option" onclick="selectPayment(this, \'' + method.nama + '\', \'' + method.norek + '\', \'' + method.penerima + '\')">' +
            '<div class="payment-option-header">' +
            '<span class="payment-option-name">' + method.nama + '</span>' +
            '<i class="fas fa-check"></i>' +
            '</div>' +
            '<div class="payment-details">' +
            '<div class="payment-detail-item">' +
            '<span class="label">Nomor Rekening:</span>' +
            '<span class="value">' + method.norek + '</span>' +
            '<button class="copy-btn" onclick="event.stopPropagation(); copyToClipboard(\'' + method.norek + '\', this)"><i class="fas fa-copy"></i> Salin</button>' +
            '</div>' +
            '<div class="payment-detail-item">' +
            '<span class="label">Penerima:</span>' +
            '<span class="value">' + method.penerima + '</span>' +
            '</div>' +
            '</div>' +
            '</div>';
    }).join('');
    
    ewalletOptions.innerHTML = PAYMENT_METHODS.ewallet.map(function(method) {
        return '<div class="payment-option" onclick="selectPayment(this, \'' + method.nama + '\', \'' + method.norek + '\', \'' + method.penerima + '\')">' +
            '<div class="payment-option-header">' +
            '<span class="payment-option-name">' + method.nama + '</span>' +
            '<i class="fas fa-check"></i>' +
            '</div>' +
            '<div class="payment-details">' +
            '<div class="payment-detail-item">' +
            '<span class="label">Nomor:</span>' +
            '<span class="value">' + method.norek + '</span>' +
            '<button class="copy-btn" onclick="event.stopPropagation(); copyToClipboard(\'' + method.norek + '\', this)"><i class="fas fa-copy"></i> Salin</button>' +
            '</div>' +
            '<div class="payment-detail-item">' +
            '<span class="label">Penerima:</span>' +
            '<span class="value">' + method.penerima + '</span>' +
            '</div>' +
            '</div>' +
            '</div>';
    }).join('');
}

// Selected payment data
let selectedPaymentData = {
    name: '',
    number: '',
    recipient: ''
};

// Select Payment Option
window.selectPayment = function(card, name, number, recipient) {
    document.querySelectorAll('.payment-option').forEach(function(c) {
        c.classList.remove('selected');
    });
    card.classList.add('selected');
    
    selectedPaymentData = {
        name: name,
        number: number,
        recipient: recipient
    };
};

// Initialize Form Navigation
function initFormNavigation() {
    window.currentStep = 0;
    
    const formSections = document.querySelectorAll('.form-section');
    const totalSteps = formSections.length;
    
    // Next button
    document.getElementById('next-btn').addEventListener('click', function() {
        if (validateStep(window.currentStep)) {
            window.currentStep++;
            updateFormSteps();
            updateFinalSummary();
        }
    });
    
    // Back button
    document.getElementById('back-btn').addEventListener('click', function() {
        window.currentStep--;
        updateFormSteps();
    });
    
    // Submit button
    document.getElementById('submit-btn').addEventListener('click', function() {
        if (validateFinalStep()) {
            submitOrder();
        }
    });
    
    // File upload preview
    const fileInput = document.getElementById('payment-proof');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const uploadArea = document.querySelector('.file-upload');
                uploadArea.classList.add('has-file');
                const fileNameEl = uploadArea.querySelector('.file-name');
                if (fileNameEl) {
                    fileNameEl.textContent = file.name;
                }
            }
        });
    }
    
    function updateFormSteps() {
        formSections.forEach(function(section, index) {
            if (index === window.currentStep) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        // Update step indicators
        const steps = document.querySelectorAll('.form-steps .step');
        steps.forEach(function(step, index) {
            if (index < window.currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === window.currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
        
        // Show/hide buttons
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document.getElementById('back-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        if (window.currentStep === totalSteps - 1) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (backBtn) backBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'inline-flex';
        } else if (window.currentStep === 0) {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (backBtn) backBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'none';
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (backBtn) backBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }
    
    function updateFinalSummary() {
        // Get game info
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('game') || 'mlbb';
        const gameData = GAMES_CONFIG.find(g => g.id === gameId) || GAMES_CONFIG[0];
        
        // Update final game
        const finalGame = document.getElementById('final-game');
        if (finalGame && gameData) {
            finalGame.textContent = gameData.nama;
        }
        
        // Update user ID
        const userId = document.getElementById('user-id');
        const finalUserId = document.getElementById('final-userid');
        if (finalUserId && userId) {
            const serverId = document.getElementById('server-id');
            let idText = userId.value;
            if (serverId && serverId.value) {
                idText += ' (' + serverId.value + ')';
            }
            finalUserId.textContent = idText || '-';
        }
        
        // Update item
        const finalItem = document.getElementById('final-item');
        if (finalItem && selectedDenomData.amount) {
            finalItem.textContent = selectedDenomData.amount + ' ' + selectedDenomData.label;
        }
        
        // Update payment method
        const finalPayment = document.getElementById('final-payment');
        if (finalPayment && selectedPaymentData.name) {
            finalPayment.textContent = selectedPaymentData.name + ' (' + selectedPaymentData.number + ')';
        }
    }
}

// Validate Step
function validateStep(step) {
    if (step === 0) {
    const userId = document.getElementById('user-id');
    const serverId = document.getElementById('server-id');

    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game') || 'mlbb';

    const gamesWithServer = ['mlbb']; // Tambahkan jika ada game lain

    if (!userId || userId.value.trim().length < 3) {
        showToast('Silakan masukkan User ID yang valid', 'error');
        if (userId) userId.classList.add('error');
        return false;
    }
    userId.classList.remove('error');

    // Server ID hanya wajib untuk game tertentu
    if (gamesWithServer.includes(gameId)) {
        if (!serverId || serverId.value.trim().length < 1) {
            showToast('Silakan masukkan ID Server', 'error');
            if (serverId) serverId.classList.add('error');
            return false;
        }
        serverId.classList.remove('error');
    }

    return true;
}
    
    if (step === 1) {
        const selectedDenom = document.querySelector('.denom-card.selected');
        if (!selectedDenom) {
            showToast('Silakan pilih denominasi', 'error');
            return false;
        }
        return true;
    }
    
    if (step === 2) {
        const selectedPayment = document.querySelector('.payment-option.selected');
        if (!selectedPayment) {
            showToast('Silakan pilih metode pembayaran', 'error');
            return false;
        }
        return true;
    }
    
    return true;
}

// Validate Final Step
function validateFinalStep() {
    const proofInput = document.getElementById('payment-proof');
    const senderName = document.getElementById('sender-name');
    const whatsapp = document.getElementById('whatsapp');
    
    if (!proofInput || !proofInput.files || proofInput.files.length === 0) {
        showToast('Silakan upload bukti pembayaran', 'error');
        return false;
    }
    
    if (!senderName || senderName.value.trim().length < 2) {
        showToast('Silakan masukkan nama pengirim', 'error');
        if (senderName) senderName.classList.add('error');
        return false;
    }
    senderName.classList.remove('error');
    
    if (!whatsapp || whatsapp.value.trim().length < 10) {
        showToast('Silakan masukkan nomor WhatsApp yang valid', 'error');
        if (whatsapp) whatsapp.classList.add('error');
        return false;
    }
    whatsapp.classList.remove('error');
    
    return true;
}

// Submit Order
function submitOrder() {
    showLoading();
    
    // Disable submit button to prevent double submission
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    }
    
    // Simulate order submission
    setTimeout(function() {
        hideLoading();
        
        // Generate random order ID
        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Get game info
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('game') || 'mlbb';
        const gameData = GAMES_CONFIG.find(g => g.id === gameId) || GAMES_CONFIG[0];
        
        // Get form data
        const userId = document.getElementById('user-id').value;
        const serverId = document.getElementById('server-id').value;
        const senderName = document.getElementById('sender-name').value;
        const whatsapp = document.getElementById('whatsapp').value;
        
        // Create order object
        const order = {
            id: orderId,
            game: gameData.nama,
            userId: userId + (serverId ? ' (' + serverId + ')' : ''),
            item: selectedDenomData.amount + ' ' + selectedDenomData.label,
            jumlah: selectedDenomData.price,
            paymentMethod: selectedPaymentData.name + ' (' + selectedPaymentData.number + ')',
            senderName: senderName,
            whatsapp: whatsapp,
            status: 'pending',
            tanggal: new Date().toISOString().split('T')[0]
        };
        
        // Save to LocalStorage
        saveOrder(order);
        
        showToast('Pesanan berhasil dikirim! ID Pesanan: ' + orderId, 'success');
        
        // Reset form after 2 seconds
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}
