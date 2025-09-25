// El Loco Chatbot - Locos Gringos Pick-N-Pull
// Version 1.0 - Bilingual (English/Spanish)
// Website: https://locosgringospicknpull.com

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        API_URL: 'https://19457ba2f7ff.ngrok.app/api/live-inventory.txt',
        SHEETS_URL: 'https://docs.google.com/spreadsheets/d/1esnMH3l5Wasc3RHOnSLjv8OkEhuX5OyXdWnEC9Eao7k/export?format=csv&gid=19085212',
        COMPANY_NAME: 'Locos Gringos Pick-N-Pull',
        BOT_NAME: 'El Loco',
        BOT_IMAGE: 'https://i.imgur.com/YOUR_IMAGE.png', // UPDATE THIS WITH YOUR IMGUR URL
        PHONE: '903-877-4900',
        ADDRESS: '10310 CR 383, Tyler, TX 75708',
        GATE_FEE: '$2.00',
        WEBSITE: 'https://locosgringospicknpull.com',
        HOURS: {
            en: {
                'Monday-Friday': '8:00 AM - 4:30 PM',
                'Saturday': '8:00 AM - 4:30 PM',
                'Sunday': '9:30 AM - 2:30 PM'
            },
            es: {
                'Lunes-Viernes': '8:00 AM - 4:30 PM',
                'Sábado': '8:00 AM - 4:30 PM',
                'Domingo': '9:30 AM - 2:30 PM'
            }
        }
    };

    // Translations
    const TRANSLATIONS = {
        en: {
            welcome: `👋 ¡Hola! I'm ${CONFIG.BOT_NAME}!`,
            tagline: "East Texas' largest selection of used auto parts at the lowest prices!",
            helpWith: "I can help you with:",
            findVehicles: "🚗 Finding vehicles in our inventory",
            checkPrices: "💰 Checking parts prices",
            getDirections: "📍 Directions to our yard",
            storeInfo: "🕒 Store hours and info",
            whatHelp: "What can I help you with today?",
            storeHours: "Store Hours",
            checkInventory: "Check Inventory",
            partsPrices: "Parts Prices",
            directions: "Directions",
            typePlaceholder: "Type your message...",
            online: "Online - Ready to help!",
            loading: "Loading our inventory database... Try asking again in a moment!",
            gateFee: "Gate Fee",
            callUs: "Call us",
            getDirectionsLink: "Get Directions on Google Maps",
            vehiclesInYard: "vehicles in our yard",
            foundVehicles: "Found matching vehicle(s)",
            noResults: "Sorry, no vehicles matching that search in stock right now.",
            row: "Row",
            stock: "Stock",
            color: "Color",
            bringTools: "Bring your own tools and pull the parts you need!",
            warranty: "Warranty Options",
            popularParts: "Popular parts"
        },
        es: {
            welcome: `👋 ¡Hola! ¡Soy ${CONFIG.BOT_NAME}!`,
            tagline: "¡La selección más grande de partes usadas en el Este de Texas a los mejores precios!",
            helpWith: "Puedo ayudarte con:",
            findVehicles: "🚗 Encontrar vehículos en nuestro inventario",
            checkPrices: "💰 Verificar precios de partes",
            getDirections: "📍 Direcciones a nuestro yardero",
            storeInfo: "🕒 Horarios e información",
            whatHelp: "¿En qué puedo ayudarte hoy?",
            storeHours: "Horarios",
            checkInventory: "Ver Inventario",
            partsPrices: "Precios de Partes",
            directions: "Direcciones",
            typePlaceholder: "Escribe tu mensaje...",
            online: "En línea - ¡Listo para ayudar!",
            loading: "Cargando nuestra base de datos... ¡Intenta de nuevo en un momento!",
            gateFee: "Tarifa de Entrada",
            callUs: "Llámanos",
            getDirectionsLink: "Obtener Direcciones en Google Maps",
            vehiclesInYard: "vehículos en nuestro yardero",
            foundVehicles: "Vehículo(s) encontrado(s)",
            noResults: "Lo siento, no hay vehículos que coincidan con esa búsqueda en stock ahora.",
            row: "Fila",
            stock: "Stock",
            color: "Color",
            bringTools: "¡Trae tus propias herramientas y saca las partes que necesitas!",
            warranty: "Opciones de Garantía",
            popularParts: "Partes populares"
        }
    };

    let currentLanguage = 'en';
    let inventoryData = [];
    let isOpen = false;

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChatbot);
    } else {
        initializeChatbot();
    }

    function initializeChatbot() {
        injectStyles();
        createChatbotHTML();
        attachEventListeners();
        detectUserLanguage();
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .lg-chatbot-button {
                position: fixed !important;
                bottom: 30px !important;
                right: 30px !important;
                width: 80px !important;
                height: 80px !important;
                border-radius: 50% !important;
                cursor: pointer !important;
                box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.3s ease !important;
                z-index: 99999 !important;
                border: 3px solid #4a8b6b !important;
                background: white !important;
                overflow: hidden !important;
                animation: lg-pulse 2s infinite !important;
            }

            .lg-chatbot-button img {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
            }

            @keyframes lg-pulse {
                0% { box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4); }
                50% { box-shadow: 0 10px 40px rgba(74, 139, 107, 0.6); }
                100% { box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4); }
            }

            .lg-chatbot-button:hover {
                transform: scale(1.1) !important;
                border-color: #5fa77f !important;
            }

            .lg-chat-container {
                position: fixed !important;
                bottom: 120px !important;
                right: 30px !important;
                width: 400px !important;
                height: 600px !important;
                background: #0a0a0a !important;
                border-radius: 20px !important;
                border: 2px solid #4a8b6b !important;
                box-shadow: 0 20px 60px rgba(74, 139, 107, 0.3) !important;
                display: none !important;
                flex-direction: column !important;
                overflow: hidden !important;
                z-index: 99998 !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }

            .lg-chat-container.lg-active {
                display: flex !important;
                animation: lg-slideUp 0.3s ease !important;
            }

            @keyframes lg-slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .lg-chat-header {
                background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important;
                padding: 15px 20px !important;
                color: white !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                border-bottom: 2px solid #5fa77f !important;
            }

            .lg-chat-title {
                display: flex !important;
                align-items: center !important;
                gap: 10px !important;
            }

            .lg-bot-avatar {
                width: 45px !important;
                height: 45px !important;
                background: white !important;
                border-radius: 50% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                overflow: hidden !important;
            }

            .lg-bot-avatar img {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
            }

            .lg-chat-header h3 {
                margin: 0 !important;
                font-size: 20px !important;
                font-weight: 700 !important;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.2) !important;
            }

            .lg-chat-status {
                font-size: 11px !important;
                opacity: 0.95 !important;
                display: flex !important;
                align-items: center !important;
                gap: 5px !important;
            }

            .lg-status-dot {
                width: 6px !important;
                height: 6px !important;
                background: #4ade80 !important;
                border-radius: 50% !important;
                animation: lg-blink 2s infinite !important;
            }

            @keyframes lg-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }

            .lg-header-controls {
                display: flex !important;
                align-items: center !important;
                gap: 10px !important;
            }

            .lg-lang-switch {
                display: flex !important;
                background: rgba(255, 255, 255, 0.2) !important;
                border-radius: 20px !important;
                padding: 2px !important;
            }

            .lg-lang-btn {
                padding: 4px 10px !important;
                background: transparent !important;
                border: none !important;
                color: white !important;
                font-size: 12px !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                border-radius: 18px !important;
                transition: all 0.3s ease !important;
            }

            .lg-lang-btn.active {
                background: white !important;
                color: #4a8b6b !important;
            }

            .lg-close-chat {
                background: none !important;
                border: none !important;
                color: white !important;
                font-size: 24px !important;
                cursor: pointer !important;
                padding: 0 !important;
                line-height: 1 !important;
                opacity: 0.9 !important;
                transition: all 0.3s ease !important;
            }

            .lg-close-chat:hover {
                opacity: 1 !important;
                transform: scale(1.1) !important;
            }

            .lg-chat-messages {
                flex: 1 !important;
                overflow-y: auto !important;
                padding: 20px !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 15px !important;
                background: #0a0a0a !important;
            }

            .lg-chat-messages::-webkit-scrollbar {
                width: 6px !important;
            }

            .lg-chat-messages::-webkit-scrollbar-track {
                background: rgba(74, 139, 107, 0.1) !important;
            }

            .lg-chat-messages::-webkit-scrollbar-thumb {
                background: #4a8b6b !important;
                border-radius: 3px !important;
            }

            .lg-message {
                max-width: 80% !important;
                word-wrap: break-word !important;
                animation: lg-fadeIn 0.3s ease !important;
            }

            @keyframes lg-fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .lg-user-message {
                align-self: flex-end !important;
                background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important;
                color: white !important;
                padding: 12px 16px !important;
                border-radius: 18px 18px 4px 18px !important;
            }

            .lg-bot-message {
                align-self: flex-start !important;
                background: #1a1a1a !important;
                color: #e0e0e0 !important;
                padding: 12px 16px !important;
                border-radius: 18px 18px 18px 4px !important;
                border: 1px solid #222 !important;
                line-height: 1.6 !important;
            }

            .lg-typing-indicator {
                display: none !important;
                align-self: flex-start !important;
                padding: 15px !important;
                background: #1a1a1a !important;
                border-radius: 18px !important;
                border: 1px solid #222 !important;
            }

            .lg-typing-indicator.lg-active {
                display: block !important;
            }

            .lg-typing-dot {
                display: inline-block !important;
                width: 8px !important;
                height: 8px !important;
                background: #4a8b6b !important;
                border-radius: 50% !important;
                margin: 0 2px !important;
                animation: lg-typing 1.4s infinite !important;
            }

            .lg-typing-dot:nth-child(2) {
                animation-delay: 0.2s !important;
            }

            .lg-typing-dot:nth-child(3) {
                animation-delay: 0.4s !important;
            }

            @keyframes lg-typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-10px); }
            }

            .lg-quick-actions {
                padding: 10px !important;
                background: #111 !important;
                display: flex !important;
                gap: 8px !important;
                flex-wrap: wrap !important;
                border-top: 1px solid #222 !important;
            }

            .lg-quick-action {
                padding: 8px 12px !important;
                background: rgba(74, 139, 107, 0.2) !important;
                border: 1px solid #4a8b6b !important;
                border-radius: 20px !important;
                color: #4a8b6b !important;
                font-size: 12px !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                font-weight: 500 !important;
            }

            .lg-quick-action:hover {
                background: #4a8b6b !important;
                color: white !important;
                transform: translateY(-2px) !important;
            }

            .lg-chat-input-container {
                padding: 15px 20px !important;
                background: #111 !important;
                display: flex !important;
                gap: 10px !important;
                border-top: 1px solid #222 !important;
            }

            .lg-chat-input {
                flex: 1 !important;
                padding: 12px 16px !important;
                background: #1a1a1a !important;
                border: 1px solid #333 !important;
                border-radius: 25px !important;
                color: white !important;
                font-size: 14px !important;
                outline: none !important;
                transition: all 0.3s ease !important;
            }

            .lg-chat-input:focus {
                border-color: #4a8b6b !important;
                box-shadow: 0 0 0 2px rgba(74, 139, 107, 0.2) !important;
            }

            .lg-send-button {
                width: 45px !important;
                height: 45px !important;
                background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important;
                border: none !important;
                border-radius: 50% !important;
                color: white !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 20px !important;
                transition: all 0.3s ease !important;
            }

            .lg-send-button:hover {
                transform: scale(1.1) !important;
                box-shadow: 0 5px 15px rgba(74, 139, 107, 0.4) !important;
            }

            @media (max-width: 480px) {
                .lg-chat-container {
                    width: 100% !important;
                    height: 100% !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    border-radius: 0 !important;
                    max-width: 100vw !important;
                }

                .lg-chatbot-button {
                    bottom: 20px !important;
                    right: 20px !important;
                    width: 70px !important;
                    height: 70px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function createChatbotHTML() {
        const t = TRANSLATIONS[currentLanguage];
        
        const chatHTML = `
            <button class="lg-chatbot-button" id="lgChatButton">
                <img src="${CONFIG.BOT_IMAGE}" alt="${CONFIG.BOT_NAME}" onerror="this.style.display='none'; this.parentElement.innerHTML='💬';">
            </button>
            <div class="lg-chat-container" id="lgChatContainer">
                <div class="lg-chat-header">
                    <div class="lg-chat-title">
                        <div class="lg-bot-avatar">
                            <img src="${CONFIG.BOT_IMAGE}" alt="${CONFIG.BOT_NAME}" onerror="this.style.display='none'; this.parentElement.innerHTML='🤖';">
                        </div>
                        <div>
                            <h3>${CONFIG.BOT_NAME}</h3>
                            <div class="lg-chat-status">
                                <span class="lg-status-dot"></span>
                                <span id="lgStatusText">${t.online}</span>
                            </div>
                        </div>
                    </div>
                    <div class="lg-header-controls">
                        <div class="lg-lang-switch">
                            <button class="lg-lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                            <button class="lg-lang-btn ${currentLanguage === 'es' ? 'active' : ''}" data-lang="es">ES</button>
                        </div>
                        <button class="lg-close-chat" id="lgCloseChat">✕</button>
                    </div>
                </div>
                <div class="lg-chat-messages" id="lgChatMessages"></div>
                <div class="lg-typing-indicator" id="lgTypingIndicator">
                    <span class="lg-typing-dot"></span>
                    <span class="lg-typing-dot"></span>
                    <span class="lg-typing-dot"></span>
                </div>
                <div class="lg-quick-actions" id="lgQuickActions"></div>
                <div class="lg-chat-input-container">
                    <input type="text" class="lg-chat-input" id="lgChatInput" placeholder="${t.typePlaceholder}" />
                    <button class="lg-send-button" id="lgSendButton">➤</button>
                </div>
            </div>
        `;

        const chatDiv = document.createElement('div');
        chatDiv.innerHTML = chatHTML;
        document.body.appendChild(chatDiv);

        showWelcomeMessage();
        updateQuickActions();
    }

    function detectUserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang && browserLang.toLowerCase().startsWith('es')) {
            currentLanguage = 'es';
            updateLanguage('es');
        }
    }

    function updateLanguage(lang) {
        currentLanguage = lang;
        const t = TRANSLATIONS[lang];

        document.getElementById('lgStatusText').textContent = t.online;
        document.getElementById('lgChatInput').placeholder = t.typePlaceholder;

        document.querySelectorAll('.lg-lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        updateQuickActions();
    }

    function showWelcomeMessage() {
        const t = TRANSLATIONS[currentLanguage];
        const welcomeMessages = [
            `${t.welcome}<br><br>
            ${t.tagline}<br><br>
            I'm here to help you find parts, chat about cars, or honestly whatever's on your mind!<br><br>
            What's going on? Need a part? Got a broken ride? Just bored? I'm here for all of it! 🚗`,
            
            `Yo! ${CONFIG.BOT_NAME} here! 🤖<br><br>
            Welcome to the best junkyard in East Texas! We got more parts than you can shake a wrench at!<br><br>
            What brings you by today? Looking for something specific or just browsing?`,
            
            `Hey there! ${CONFIG.BOT_NAME} at your service!<br><br>
            ${t.tagline}<br><br>
            Whether you need a transmission, an alternator, or just wanna chat about that project car - I'm your guy! What's up?`
        ];
        
        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        addMessage(randomWelcome, 'bot');
    }

    function updateQuickActions() {
        const t = TRANSLATIONS[currentLanguage];
        const quickActionsDiv = document.getElementById('lgQuickActions');
        
        quickActionsDiv.innerHTML = `
            <button class="lg-quick-action" data-message="${t.storeHours}">${t.storeHours}</button>
            <button class="lg-quick-action" data-message="${t.checkInventory}">${t.checkInventory}</button>
            <button class="lg-quick-action" data-message="${t.partsPrices}">${t.partsPrices}</button>
            <button class="lg-quick-action" data-message="${t.directions}">${t.directions}</button>
        `;

        document.querySelectorAll('.lg-quick-action').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('lgChatInput').value = btn.dataset.message;
                sendMessage();
            });
        });
    }

    function attachEventListeners() {
        document.getElementById('lgChatButton').addEventListener('click', toggleChat);
        document.getElementById('lgCloseChat').addEventListener('click', toggleChat);
        document.getElementById('lgSendButton').addEventListener('click', sendMessage);
        document.getElementById('lgChatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        document.querySelectorAll('.lg-lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                updateLanguage(btn.dataset.lang);
            });
        });
    }

    function toggleChat() {
        isOpen = !isOpen;
        document.getElementById('lgChatContainer').classList.toggle('lg-active', isOpen);
        
        if (isOpen && inventoryData.length === 0) {
            loadInventoryData();
        }
    }

    async function loadInventoryData() {
        try {
            const response = await fetch(CONFIG.API_URL);
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            const assets = xmlDoc.getElementsByTagName("ASSET");
            
            inventoryData = Array.from(assets).map(asset => ({
                year: asset.getElementsByTagName("iYEAR")[0]?.textContent || "",
                make: asset.getElementsByTagName("MAKE")[0]?.textContent || "",
                model: asset.getElementsByTagName("MODEL")[0]?.textContent || "",
                stock: asset.getElementsByTagName("STOCKNUMBER")[0]?.textContent || "",
                vin: asset.getElementsByTagName("VIN")[0]?.textContent || "",
                row: asset.getElementsByTagName("VEHICLE_ROW")[0]?.textContent || "",
                color: asset.getElementsByTagName("COLOR")[0]?.textContent || "",
                yardDate: asset.getElementsByTagName("YARD_DATE")[0]?.textContent?.split("T")[0] || "",
            }));

            console.log(`El Loco: Loaded ${inventoryData.length} vehicles`);
        } catch (error) {
            console.error('El Loco: Error loading inventory:', error);
        }
    }

    function sendMessage() {
        const input = document.getElementById('lgChatInput');
        const message = input.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        input.value = '';

        const typing = document.getElementById('lgTypingIndicator');
        typing.classList.add('lg-active');

        setTimeout(() => {
            typing.classList.remove('lg-active');
            const response = processMessage(message);
            addMessage(response, 'bot');
        }, 1000);
    }

    function processMessage(msg) {
        const lower = msg.toLowerCase();
        const t = TRANSLATIONS[currentLanguage];
        const hours = CONFIG.HOURS[currentLanguage];
        
        // Hours
        if (lower.includes('hour') || lower.includes('hora') || lower.includes('open') || lower.includes('abierto')) {
            let response = `📍 <strong>${CONFIG.COMPANY_NAME}</strong><br><br>🕒 <strong>${t.storeHours}:</strong><br>`;
            for (let [day, time] of Object.entries(hours)) {
                response += `${day}: ${time}<br>`;
            }
            response += `<br>💵 ${t.gateFee}: ${CONFIG.GATE_FEE}<br>`;
            response += `📞 ${t.callUs}: <a href="tel:${CONFIG.PHONE}" style="color:#4a8b6b;">${CONFIG.PHONE}</a>`;
            return response;
        }
        
        // Directions
        if (lower.includes('direction') || lower.includes('dirección') || lower.includes('location') || lower.includes('ubicación') || lower.includes('address')) {
            return `📍 <strong>${CONFIG.ADDRESS}</strong><br><br>` +
                   `<a href="https://maps.google.com/?q=${encodeURIComponent(CONFIG.ADDRESS)}" target="_blank" style="color:#4a8b6b;">` +
                   `🗺️ ${t.getDirectionsLink}</a><br><br>` +
                   `📞 ${t.callUs}: <a href="tel:${CONFIG.PHONE}" style="color:#4a8b6b;">${CONFIG.PHONE}</a>`;
        }
        
        // Show all inventory
        if ((lower.includes('inventory') || lower.includes('inventario')) && !lower.includes('ford') && !lower.includes('chevy') && !lower.includes('toyota')) {
            if (inventoryData.length > 0) {
                return `🚗 <strong>${inventoryData.length} ${t.vehiclesInYard}!</strong><br><br>` +
                       `${currentLanguage === 'es' ? 'Búsquedas populares' : 'Popular searches'}:<br>` +
                       `• Ford F150<br>• Chevy Silverado<br>• Toyota Camry<br>• Honda Civic`;
            } else {
                loadInventoryData();
                return t.loading;
            }
        }

        // Smart vehicle search with slang support
        if (inventoryData.length > 0) {
            let results = [];
            
            // Common slang and model mappings
            const slangMap = {
                'chevy truck': ['silverado', 'colorado', 's10', 'c1500', 'k1500', 'c2500', 'k2500'],
                'ford truck': ['f150', 'f250', 'f350', 'ranger'],
                'toyota truck': ['tacoma', 'tundra'],
                'gmc truck': ['sierra', 'canyon'],
                'dodge truck': ['ram', '1500', '2500', '3500'],
                'chevy car': ['camaro', 'malibu', 'impala', 'cruze', 'corvette'],
                'ford car': ['mustang', 'fusion', 'focus', 'taurus'],
                'honda car': ['civic', 'accord', 'crv', 'cr-v', 'pilot']
            };
            
            // Check for specific models first
            const specificModels = ['silverado', 'f150', 'f-150', 'f250', 'f-250', 'f350', 'f-350', 
                                   'camry', 'corolla', 'civic', 'accord', 'mustang', 'camaro', 
                                   'tahoe', 'suburban', 'explorer', 'expedition', 'focus', 
                                   'fusion', 'malibu', 'impala', 'cruze', 'altima', 'sentra',
                                   'tacoma', 'tundra', 'ranger', 'colorado', 'canyon', 'sierra',
                                   'ram', '1500', '2500', '3500', 'charger', 'challenger',
                                   'wrangler', 'cherokee', 'grand cherokee', 'compass'];
            
            // Check if user is asking for a specific model
            let searchingForModel = null;
            for (let model of specificModels) {
                if (lower.includes(model)) {
                    searchingForModel = model;
                    break;
                }
            }
            
            // Check for slang terms
            let slangModels = [];
            for (let [slang, models] of Object.entries(slangMap)) {
                if (lower.includes(slang)) {
                    slangModels = models;
                    break;
                }
            }
            
            // Search logic
            if (searchingForModel) {
                // User asked for specific model - only show that model
                results = inventoryData.filter(v => {
                    const vehicleModel = v.model.toLowerCase();
                    const normalizedSearch = searchingForModel.replace('-', '');
                    const normalizedModel = vehicleModel.replace('-', '');
                    return normalizedModel.includes(normalizedSearch) || 
                           vehicleModel === searchingForModel;
                });
            } else if (slangModels.length > 0) {
                // User used slang - show matching models
                results = inventoryData.filter(v => {
                    const vehicleModel = v.model.toLowerCase();
                    return slangModels.some(model => vehicleModel.includes(model));
                });
            } else {
                // Check for brand mentions with smart filtering
                const brands = {
                    'chevy': 'CHEVROLET',
                    'chevrolet': 'CHEVROLET',
                    'ford': 'FORD',
                    'toyota': 'TOYOTA',
                    'honda': 'HONDA',
                    'nissan': 'NISSAN',
                    'dodge': 'DODGE',
                    'ram': 'RAM',
                    'gmc': 'GMC',
                    'jeep': 'JEEP',
                    'mazda': 'MAZDA',
                    'hyundai': 'HYUNDAI',
                    'kia': 'KIA',
                    'bmw': 'BMW',
                    'mercedes': 'MERCEDES',
                    'audi': 'AUDI',
                    'vw': 'VOLKSWAGEN',
                    'volkswagen': 'VOLKSWAGEN'
                };
                
                let foundBrand = null;
                for (let [key, value] of Object.entries(brands)) {
                    if (lower.includes(key)) {
                        foundBrand = value;
                        break;
                    }
                }
                
                if (foundBrand) {
                    // Check if user mentioned "truck" or "car" with the brand
                    if (lower.includes('truck') || lower.includes('pickup')) {
                        // Filter for trucks only
                        const truckModels = ['SILVERADO', 'F150', 'F250', 'F350', 'RAM', 'SIERRA', 
                                            'TACOMA', 'TUNDRA', 'RANGER', 'COLORADO', 'CANYON', 
                                            'FRONTIER', 'TITAN', 'RIDGELINE'];
                        results = inventoryData.filter(v => 
                            v.make.toUpperCase().includes(foundBrand) &&
                            truckModels.some(model => v.model.toUpperCase().includes(model))
                        );
                    } else if (lower.includes('car') || lower.includes('sedan')) {
                        // Filter for cars only (exclude common truck/SUV models)
                        const truckSuvModels = ['SILVERADO', 'F150', 'F250', 'F350', 'RAM', 'SIERRA',
                                               'TACOMA', 'TUNDRA', 'RANGER', 'COLORADO', 'CANYON',
                                               'TAHOE', 'SUBURBAN', 'YUKON', 'EXPLORER', 'EXPEDITION',
                                               'PILOT', 'CRV', 'CR-V', 'RAV4', 'HIGHLANDER', '4RUNNER'];
                        results = inventoryData.filter(v => 
                            v.make.toUpperCase().includes(foundBrand) &&
                            !truckSuvModels.some(model => v.model.toUpperCase().includes(model))
                        );
                    } else if (lower.includes('suv')) {
                        // Filter for SUVs only
                        const suvModels = ['TAHOE', 'SUBURBAN', 'YUKON', 'EXPLORER', 'EXPEDITION',
                                          'PILOT', 'CRV', 'CR-V', 'RAV4', 'HIGHLANDER', '4RUNNER',
                                          'CHEROKEE', 'WRANGLER', 'DURANGO', 'TRAVERSE', 'EQUINOX',
                                          'ESCAPE', 'EDGE', 'PATHFINDER', 'MURANO', 'ROGUE'];
                        results = inventoryData.filter(v => 
                            v.make.toUpperCase().includes(foundBrand) &&
                            suvModels.some(model => v.model.toUpperCase().includes(model))
                        );
                    } else {
                        // Show all vehicles from that brand
                        results = inventoryData.filter(v => 
                            v.make.toUpperCase().includes(foundBrand)
                        );
                    }
                }
            }
            
            // Return results if found
            if (results.length > 0) {
                let response = `🚗 <strong>${t.foundVehicles}: ${results.length}</strong><br><br>`;
                const showMax = Math.min(10, results.length);
                
                for (let i = 0; i < showMax; i++) {
                    const v = results[i];
                    response += `<strong>${v.year} ${v.make} ${v.model}</strong><br>`;
                    response += `📍 ${t.row} ${v.row} | ${t.stock} #${v.stock}<br>`;
                    response += `🎨 ${t.color}: ${v.color}<br><br>`;
                }
                
                if (results.length > 10) {
                    response += `<em>...and ${results.length - 10} more!</em><br><br>`;
                }
                
                response += `Visit us to pull the parts you need!`;
                return response;
            }
        }

        // Parts prices with personality
        if (lower.includes('price') || lower.includes('precio') || lower.includes('part') || lower.includes('parte')) {
            const priceResponses = [
                `💰 <strong>Oh you want the good stuff? Check these deals out:</strong><br><br>` +
                `• Engines from $299 (Yeah, complete engines!)<br>` +
                `• Transmissions from $194 (No more grinding gears!)<br>` +
                `• Alternators: $37.52 (Keep that battery charged!)<br>` +
                `• Starters: $28.91 (Vroom vroom time!)<br><br>` +
                `Plus we got warranties on everything! Come on down!`,
                
                `💰 <strong>Let me hook you up with our prices amigo:</strong><br><br>` +
                `Engines? Got 'em from $299<br>` +
                `Transmissions? $194 and up<br>` +
                `Need an alternator? Only $37.52<br>` +
                `Starter giving you trouble? $28.91<br><br>` +
                `And hey, everything comes with warranty options! Can't beat that!`
            ];
            return priceResponses[Math.floor(Math.random() * priceResponses.length)];
        }

        // Fun responses for random topics
        if (lower.includes('weather') || lower.includes('hot') || lower.includes('cold')) {
            const weatherResponses = [
                "Man, it's Texas - it's either blazing hot or randomly freezing! 🌡️ Good thing our yard's open rain or shine! Bring water in summer though, trust me on that one.",
                "Weather? In East Texas? Ha! If you don't like it, wait 5 minutes! 😄 But hey, perfect weather for pulling parts is any day ending in 'y'!",
                "It's hotter than a $2 pistol out here! But that just means less crowds at the yard. Smart shoppers come early or late!"
            ];
            return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
        }

        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('hola')) {
            const greetings = [
                "Hey there! What's up? Looking for some sweet car parts or just saying hi? Either way, I'm here! 👋",
                "¡Órale! Welcome to Locos Gringos! What brings you by today?",
                "Yo! El Loco here! Ready to find you the best deals in East Texas! What you need?",
                "Well hello there, friend! Pull up a chair and tell me what kind of ride you're working on!"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        if (lower.includes('thank') || lower.includes('gracias')) {
            const thanks = [
                "No problem at all! That's what I'm here for! Need anything else?",
                "You got it, amigo! Happy to help! 🤝",
                "Anytime! Hey, tell your friends about us - we got the best prices in East Texas!",
                "De nada! Come visit us soon - bring your tools!"
            ];
            return thanks[Math.floor(Math.random() * thanks.length)];
        }

        if (lower.includes('joke') || lower.includes('funny')) {
            const jokes = [
                "Why don't cars ever get tired? Because they come with spare tires! 😄 Speaking of spares, we got plenty!",
                "What do you call a Ford Fiesta that ran out of gas? A Ford Siesta! 😴 Good thing we got fuel pumps for $23!",
                "My mechanic told me 'I couldn't fix your brakes, so I made your horn louder!' That's why I work here now! 😂",
                "What's the difference between a BMW and a porcupine? The porcupine has pricks on the outside! 😏 We got parts for both though!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        if (lower.includes('food') || lower.includes('hungry') || lower.includes('eat')) {
            return "Oh man, I feel you! There's a great taco truck that parks near us on weekends! 🌮 But first, let me help you find those car parts. Gotta work before we eat, right?";
        }

        if (lower.includes('sports') || lower.includes('cowboys') || lower.includes('football')) {
            return "How 'bout them Cowboys?! 🏈 You know what's more reliable than the Cowboys' playoff chances? Our inventory! We got what you need, guaranteed!";
        }

        if (lower.includes('expensive') || lower.includes('cheap') || lower.includes('money')) {
            return "Look, I get it - times are tough! That's exactly why we're here! Our prices are the lowest in East Texas, and you pull the parts yourself to save even more. It's like a treasure hunt where you always win! 💰";
        }

        if (lower.includes('help') && !lower.includes('what')) {
            return "Of course I'll help! That's literally my job and I love it! Tell me what you're working on - what year, make, and model? Or are you just browsing? I'm here for whatever you need!";
        }

        if (lower.includes('how are you') || lower.includes('how you doing')) {
            const howAreYou = [
                "Living the dream, baby! Surrounded by car parts and helping folks like you save money! Can't complain! How about you?",
                "Better than a new alternator on a dead battery! What can I do for you today?",
                "I'm doing great! Just helped someone find a transmission for their F-150. Love making people's day! What are you working on?"
            ];
            return howAreYou[Math.floor(Math.random() * howAreYou.length)];
        }

        if (lower.includes('broken') || lower.includes('fix') || lower.includes('repair')) {
            return "Broken car? Been there! That's why we're here - whatever's busted, we probably got the part. Tell me what's wrong and let's get you back on the road! 🔧";
        }

        if (lower.includes('best') || lower.includes('recommend')) {
            return "Best? Everything here is the best deal you'll find! But seriously, tell me what you're driving and what's wrong with it. I'll point you in the right direction!";
        }

        if (lower.includes('covid') || lower.includes('mask')) {
            return "We're open regular hours! It's an outdoor yard so plenty of fresh air. Now, what parts can I help you find today?";
        }

        if (lower.includes('gas') || lower.includes('fuel')) {
            const gas = [
                "Gas prices got you down? Good news - our fuel pumps start at just $23! Fix that gas guzzler or find a more efficient engine!",
                "Yeah, these gas prices are LOCO! Maybe time to swap in a more efficient engine? We got options!"
            ];
            return gas[Math.floor(Math.random() * gas.length)];
        }

        if (lower.includes('tesla') || lower.includes('electric')) {
            return "Ha! Electric cars? Not many of those in our yard yet! We're old school - real engines, real parts, real savings! But hey, we got regular car parts that'll keep your gas guzzler running!";
        }

        if (lower.includes('beer') || lower.includes('drink')) {
            return "Whoa there partner! Save the cold ones for after you're done pulling parts! 🍺 Safety first! But hey, what parts you looking for?";
        }

        if (lower.includes('girlfriend') || lower.includes('boyfriend') || lower.includes('date')) {
            return "Haha! Can't help you there, but I can help you fix your ride! Nothing impresses a date like a car that actually starts! 😉";
        }

        if (lower.includes('stupid') || lower.includes('dumb') || lower.includes('hate')) {
            return "Hey now, no negativity in the yard! We're all about good vibes and great prices here! How about we find you some awesome parts instead?";
        }

        // Default responses with more personality
        const defaults = [
            "Hmm, not sure what you're asking about there, but I can definitely help you find car parts! What kind of vehicle you got?",
            "You know what? Let's talk cars! What are you driving and what parts do you need?",
            "Interesting question! But hey, while you're here - need any parts? We got tons of inventory!",
            "I might be El Loco, but I'm loco about car parts! 😄 What can I help you find today?",
            "That's a new one! But seriously, let me know if you need help finding any parts. That's what I'm really good at!"
        ];
        
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    function addMessage(content, sender) {
        const messagesDiv = document.getElementById('lgChatMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `lg-message lg-${sender}-message`;
        msgDiv.innerHTML = content;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
})();
