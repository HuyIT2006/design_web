// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Image Gallery
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('main-image');
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.replace('border-primary', 'border-transparent'));
        thumbnail.classList.replace('border-transparent', 'border-primary');
        mainImage.src = thumbnail.getAttribute('data-src');
        mainImage.alt = thumbnail.alt;
    });
});

// Quantity Input
const quantityInput = document.getElementById('quantity-input');
document.getElementById('increase-quantity').addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});
document.getElementById('decrease-quantity').addEventListener('click', () => {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('border-primary');
            btn.classList.add('border-transparent');
        });
        button.classList.add('active');
        button.classList.add('border-primary');
        button.classList.remove('border-transparent');

        tabContents.forEach(content => content.classList.add('hidden'));
        document.getElementById(button.getAttribute('data-tab')).classList.remove('hidden');
    });
});

// Scripts that should run after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu (again, to ensure availability if DOM not ready above)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Price Range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    }
    priceRange.addEventListener('input', function() {
        priceValue.textContent = formatPrice(this.value);
    });

    // Back to Top
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Chat Box
    const chatButton = document.getElementById('chatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChatBox = document.getElementById('closeChatBox');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    chatButton.addEventListener('click', function() {
        chatBox.classList.toggle('opacity-0');
        chatBox.classList.toggle('invisible');
        chatBox.classList.toggle('translate-y-4');
    });

    closeChatBox.addEventListener('click', function() {
        chatBox.classList.add('opacity-0', 'invisible', 'translate-y-4');
    });

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const now = new Date();
            const time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

            const userMessage = document.createElement('div');
            userMessage.className = 'flex mb-4 justify-end';
            userMessage.innerHTML = `
                <div class="bg-primary bg-opacity-10 p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p class="text-gray-700 text-sm">${message}</p>
                    <span class="text-xs text-gray-500 mt-1 block">${time}</span>
                </div>
            `;
            chatMessages.appendChild(userMessage);
            chatInput.value = '';

            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(function() {
                const botMessage = document.createElement('div');
                botMessage.className = 'flex mb-4';
                botMessage.innerHTML = `
                    <div class="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-white mr-2 flex-shrink-0">
                        <i class="ri-customer-service-2-line"></i>
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                        <p class="text-gray-700 text-sm">Cảm ơn bạn đã liên hệ. Nhân viên tư vấn sẽ phản hồi trong vòng 5 phút.</p>
                        <span class="text-xs text-gray-500 mt-1 block">${time}</span>
                    </div>
                `;
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    sendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
});
