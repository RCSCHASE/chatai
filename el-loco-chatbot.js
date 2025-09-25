// El Loco Chatbot - Locos Gringos Pick-N-Pull
// Version 3.2 - Improved Vehicle Search Logic
// Website: https://locosgringospicknpull.com

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        API_URL: 'https://19457ba2f7ff.ngrok.app/api/live-inventory.txt',
        COMPANY_NAME: 'Locos Gringos Pick-N-Pull',
        BOT_NAME: 'El Loco',
        BOT_IMAGE: 'https://imgur.com/ygmELqO.jpg', // UPDATE THIS WITH YOUR IMGUR URL
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
        const welcomeMsg = `
            ${t.welcome}<br><br>
            ${t.tagline}<br><br>
            ${t.helpWith}<br>
            ${t.findVehicles}<br>
            ${t.checkPrices}<br>
            ${t.getDirections}<br>
            ${t.storeInfo}<br><br>
            ${t.whatHelp}
        `;
        addMessage(welcomeMsg, 'bot');
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

    // === START: NEW AND IMPROVED FUNCTION ===
    function searchVehicles(searchQuery) {
        if (!searchQuery || inventoryData.length === 0) return [];

        // 1. Clean and normalize the search query
        const cleanedQuery = searchQuery.toLowerCase()
            .replace(/do you have any|do you have|got any|any|looking for|need|want|\?/g, '')
            .replace(/chevy/g, 'chevrolet')
            .trim();

        // If the query is empty after cleaning (e.g., just "do you have any"), stop here.
        if (!cleanedQuery) return [];

        const initialSearchTerms = cleanedQuery.split(/\s+/).filter(term => term.length > 0);

        // 2. Define make/model patterns for enhancement
        const makeModelPatterns = {
            'accord': ['honda', 'accord'],
'civic': ['honda', 'civic'],
'cr-v': ['honda', 'cr-v'],
'pilot': ['honda', 'pilot'],
'hr-v': ['honda', 'hr-v'],
'odyssey': ['honda', 'odyssey'],
'ridgeline': ['honda', 'ridgeline'],
'passport': ['honda', 'passport'],
'fit': ['honda', 'fit'],
'insight': ['honda', 'insight'],
'clarity': ['honda', 'clarity'],
'cr-z': ['honda', 'cr-z'],
'element': ['honda', 'element'],
's2000': ['honda', 's2000'],
'prelude': ['honda', 'prelude'],
'del sol': ['honda', 'del sol'],
'crx': ['honda', 'crx'],
'nsx': ['honda', 'nsx'],
'legend': ['honda', 'legend'],
'crosstour': ['honda', 'crosstour'],
'city': ['honda', 'city'],
'jazz': ['honda', 'jazz'],
'brio': ['honda', 'brio'],
'amaze': ['honda', 'amaze'],
'wr-v': ['honda', 'wr-v'],
'br-v': ['honda', 'br-v'],
'mobilio': ['honda', 'mobilio'],
'freed': ['honda', 'freed'],
'vezel': ['honda', 'vezel'],
'grace': ['honda', 'grace'],
'stream': ['honda', 'stream'],
'stepwgn': ['honda', 'stepwgn'],
'elysion': ['honda', 'elysion'],
'inspire': ['honda', 'inspire'],
'integra': ['honda', 'integra'],
'vigor': ['honda', 'vigor'],
'rafaga': ['honda', 'rafaga'],
'torneo': ['honda', 'torneo'],
'avancier': ['honda', 'avancier'],
'lagreat': ['honda', 'lagreat'],
'mdx': ['honda', 'mdx'],
'edix': ['honda', 'edix'],
'airwave': ['honda', 'airwave'],
'partner': ['honda', 'partner'],
'life': ['honda', 'life'],
'zest': ['honda', 'zest'],
'n-box': ['honda', 'n-box'],
'n-one': ['honda', 'n-one'],
'n-wgn': ['honda', 'n-wgn'],
'n-van': ['honda', 'n-van'],
's660': ['honda', 's660'],
'beat': ['honda', 'beat'],
'today': ['honda', 'today'],
'acty': ['honda', 'acty'],
'vamos': ['honda', 'vamos'],
'z': ['honda', 'z'],
'that\'s': ['honda', 'that\'s'],
'capa': ['honda', 'capa'],
'logo': ['honda', 'logo'],
'domani': ['honda', 'domani'],
'concerto': ['honda', 'concerto'],
'ballade': ['honda', 'ballade'],
'quint': ['honda', 'quint'],
'ascot': ['honda', 'ascot'],
'orthia': ['honda', 'orthia'],
'saber': ['honda', 'saber'],
'shuttle': ['honda', 'shuttle'],
'jade': ['honda', 'jade'],
'everus': ['honda', 'everus'],
'spirior': ['honda', 'spirior'],
'crider': ['honda', 'crider'],
'gienia': ['honda', 'gienia'],
'greiz': ['honda', 'greiz'],
'envix': ['honda', 'envix'],
'xr-v': ['honda', 'xr-v'],
'ur-v': ['honda', 'ur-v'],
'breeze': ['honda', 'breeze'],
'elysion': ['honda', 'elysion'],
'prologue': ['honda', 'prologue'],
'zr-v': ['honda', 'zr-v'],
'e': ['honda', 'e'],
'e:ny1': ['honda', 'e:ny1'],
'e:ns1': ['honda', 'e:ns1'],
'e:np1': ['honda', 'e:np1'],
'e:ns2': ['honda', 'e:ns2'],
'e:np2': ['honda', 'e:np2'],
            'f-150': ['ford', 'f-150'],
'f-250': ['ford', 'f-250'],
'f-350': ['ford', 'f-350'],
'f-450': ['ford', 'f-450'],
'f350': ['ford', 'f350'],
'f250': ['ford', 'f250'],
'f150': ['ford', 'f1500'],
'ranger': ['ford', 'ranger'],
'maverick': ['ford', 'maverick'],
'mustang': ['ford', 'mustang'],
'bronco': ['ford', 'bronco'],
'bronco sport': ['ford', 'bronco sport'],
'explorer': ['ford', 'explorer'],
'expedition': ['ford', 'expedition'],
'escape': ['ford', 'escape'],
'edge': ['ford', 'edge'],
'blazer': ['ford', 'blazer'],
'ecosport': ['ford', 'ecosport'],
'flex': ['ford', 'flex'],
'fusion': ['ford', 'fusion'],
'focus': ['ford', 'focus'],
'fiesta': ['ford', 'fiesta'],
'taurus': ['ford', 'taurus'],
'crown victoria': ['ford', 'crown victoria'],
'five hundred': ['ford', 'five hundred'],
'contour': ['ford', 'contour'],
'tempo': ['ford', 'tempo'],
'escort': ['ford', 'escort'],
'pinto': ['ford', 'pinto'],
'probe': ['ford', 'probe'],
'aspire': ['ford', 'aspire'],
'festiva': ['ford', 'festiva'],
'ka': ['ford', 'ka'],
'ka+': ['ford', 'ka+'],
'puma': ['ford', 'puma'],
'kuga': ['ford', 'kuga'],
'mondeo': ['ford', 'mondeo'],
's-max': ['ford', 's-max'],
'c-max': ['ford', 'c-max'],
'b-max': ['ford', 'b-max'],
'galaxy': ['ford', 'galaxy'],
'tourneo': ['ford', 'tourneo'],
'transit': ['ford', 'transit'],
'transit custom': ['ford', 'transit custom'],
'transit connect': ['ford', 'transit connect'],
'transit courier': ['ford', 'transit courier'],
'e-series': ['ford', 'e-series'],
'e-150': ['ford', 'e-150'],
'e-250': ['ford', 'e-250'],
'e-350': ['ford', 'e-350'],
'e-450': ['ford', 'e-450'],
'econoline': ['ford', 'econoline'],
'aerostar': ['ford', 'aerostar'],
'windstar': ['ford', 'windstar'],
'freestar': ['ford', 'freestar'],
'freestyle': ['ford', 'freestyle'],
'taurus x': ['ford', 'taurus x'],
'thunderbird': ['ford', 'thunderbird'],
'cougar': ['ford', 'cougar'],
'ltd': ['ford', 'ltd'],
'ltd crown victoria': ['ford', 'ltd crown victoria'],
'galaxie': ['ford', 'galaxie'],
'fairlane': ['ford', 'fairlane'],
'fairmont': ['ford', 'fairmont'],
'falcon': ['ford', 'falcon'],
'torino': ['ford', 'torino'],
'gran torino': ['ford', 'gran torino'],
'ranchero': ['ford', 'ranchero'],
'model t': ['ford', 'model t'],
'model a': ['ford', 'model a'],
'model b': ['ford', 'model b'],
'model y': ['ford', 'model y'],
'excursion': ['ford', 'excursion'],
'explorer sport trac': ['ford', 'explorer sport trac'],
'sport trac': ['ford', 'sport trac'],
'blackwood': ['ford', 'blackwood'],
'gt': ['ford', 'gt'],
'gt40': ['ford', 'gt40'],
'mustang mach-e': ['ford', 'mustang mach-e'],
'lightning': ['ford', 'lightning'],
'territory': ['ford', 'territory'],
'everest': ['ford', 'everest'],
'endura': ['ford', 'endura'],
'endeavour': ['ford', 'endeavour'],
'figo': ['ford', 'figo'],
'ikon': ['ford', 'ikon'],
'laser': ['ford', 'laser'],
'telstar': ['ford', 'telstar'],
'sierra': ['ford', 'sierra'],
'scorpio': ['ford', 'scorpio'],
'granada': ['ford', 'granada'],
'consul': ['ford', 'consul'],
'capri': ['ford', 'capri'],
'cortina': ['ford', 'cortina'],
'anglia': ['ford', 'anglia'],
'prefect': ['ford', 'prefect'],
'popular': ['ford', 'popular'],
'zephyr': ['ford', 'zephyr'],
'zodiac': ['ford', 'zodiac'],
'orion': ['ford', 'orion'],
'verona': ['ford', 'verona'],
'versailles': ['ford', 'versailles'],
'pampa': ['ford', 'pampa'],
'courier': ['ford', 'courier'],
'bantam': ['ford', 'bantam'],
'ecostar': ['ford', 'ecostar'],
'start': ['ford', 'start'],
'streetka': ['ford', 'streetka'],
'sportka': ['ford', 'sportka'],
'fusion (europe)': ['ford', 'fusion (europe)'],
'evos': ['ford', 'evos'],
'equator': ['ford', 'equator'],
'mondeo evos': ['ford', 'mondeo evos'],
'escort (china)': ['ford', 'escort (china)'],
'taurus (china)': ['ford', 'taurus (china)'],
'edge l': ['ford', 'edge l'],
'equator sport': ['ford', 'equator sport'],
            'camry': ['toyota', 'camry'],
'corolla': ['toyota', 'corolla'],
'corolla cross': ['toyota', 'corolla cross'],
'corolla hatchback': ['toyota', 'corolla hatchback'],
'rav4': ['toyota', 'rav4'],
'highlander': ['toyota', 'highlander'],
'4runner': ['toyota', '4runner'],
'tacoma': ['toyota', 'tacoma'],
'tundra': ['toyota', 'tundra'],
'sequoia': ['toyota', 'sequoia'],
'sienna': ['toyota', 'sienna'],
'prius': ['toyota', 'prius'],
'prius c': ['toyota', 'prius c'],
'prius v': ['toyota', 'prius v'],
'prius prime': ['toyota', 'prius prime'],
'mirai': ['toyota', 'mirai'],
'avalon': ['toyota', 'avalon'],
'crown': ['toyota', 'crown'],
'crown signia': ['toyota', 'crown signia'],
'venza': ['toyota', 'venza'],
'c-hr': ['toyota', 'c-hr'],
'bz4x': ['toyota', 'bz4x'],
'gr86': ['toyota', 'gr86'],
'gr supra': ['toyota', 'gr supra'],
'gr corolla': ['toyota', 'gr corolla'],
'yaris': ['toyota', 'yaris'],
'yaris cross': ['toyota', 'yaris cross'],
'yaris ia': ['toyota', 'yaris ia'],
'echo': ['toyota', 'echo'],
'tercel': ['toyota', 'tercel'],
'paseo': ['toyota', 'paseo'],
'starlet': ['toyota', 'starlet'],
'celica': ['toyota', 'celica'],
'supra': ['toyota', 'supra'],
'mr2': ['toyota', 'mr2'],
'mr2 spyder': ['toyota', 'mr2 spyder'],
'matrix': ['toyota', 'matrix'],
'solara': ['toyota', 'solara'],
'cressida': ['toyota', 'cressida'],
'land cruiser': ['toyota', 'land cruiser'],
'land cruiser prado': ['toyota', 'land cruiser prado'],
'fj cruiser': ['toyota', 'fj cruiser'],
'fj40': ['toyota', 'fj40'],
't100': ['toyota', 't100'],
'hilux': ['toyota', 'hilux'],
'hilux surf': ['toyota', 'hilux surf'],
'fortuner': ['toyota', 'fortuner'],
'innova': ['toyota', 'innova'],
'innova crysta': ['toyota', 'innova crysta'],
'avanza': ['toyota', 'avanza'],
'rush': ['toyota', 'rush'],
'raize': ['toyota', 'raize'],
'urban cruiser': ['toyota', 'urban cruiser'],
'urban cruiser hyryder': ['toyota', 'urban cruiser hyryder'],
'rumion': ['toyota', 'rumion'],
'glanza': ['toyota', 'glanza'],
'etios': ['toyota', 'etios'],
'etios cross': ['toyota', 'etios cross'],
'etios liva': ['toyota', 'etios liva'],
'aygo': ['toyota', 'aygo'],
'aygo x': ['toyota', 'aygo x'],
'auris': ['toyota', 'auris'],
'verso': ['toyota', 'verso'],
'verso-s': ['toyota', 'verso-s'],
'avensis': ['toyota', 'avensis'],
'carina': ['toyota', 'carina'],
'corona': ['toyota', 'corona'],
'mark ii': ['toyota', 'mark ii'],
'mark x': ['toyota', 'mark x'],
'chaser': ['toyota', 'chaser'],
'cresta': ['toyota', 'cresta'],
'century': ['toyota', 'century'],
'crown majesta': ['toyota', 'crown majesta'],
'crown athlete': ['toyota', 'crown athlete'],
'crown royal': ['toyota', 'crown royal'],
'soarer': ['toyota', 'soarer'],
'aristo': ['toyota', 'aristo'],
'altezza': ['toyota', 'altezza'],
'brevis': ['toyota', 'brevis'],
'progres': ['toyota', 'progres'],
'premio': ['toyota', 'premio'],
'allion': ['toyota', 'allion'],
'belta': ['toyota', 'belta'],
'platz': ['toyota', 'platz'],
'vitz': ['toyota', 'vitz'],
'aqua': ['toyota', 'aqua'],
'passo': ['toyota', 'passo'],
'porte': ['toyota', 'porte'],
'spade': ['toyota', 'spade'],
'roomy': ['toyota', 'roomy'],
'tank': ['toyota', 'tank'],
'pixis': ['toyota', 'pixis'],
'pixis epoch': ['toyota', 'pixis epoch'],
'pixis joy': ['toyota', 'pixis joy'],
'pixis mega': ['toyota', 'pixis mega'],
'pixis van': ['toyota', 'pixis van'],
'sienta': ['toyota', 'sienta'],
'noah': ['toyota', 'noah'],
'voxy': ['toyota', 'voxy'],
'esquire': ['toyota', 'esquire'],
'alphard': ['toyota', 'alphard'],
'vellfire': ['toyota', 'vellfire'],
'granvia': ['toyota', 'granvia'],
'hiace': ['toyota', 'hiace'],
'regius': ['toyota', 'regius'],
'coaster': ['toyota', 'coaster'],
'dyna': ['toyota', 'dyna'],
'toyoace': ['toyota', 'toyoace'],
'quick delivery': ['toyota', 'quick delivery'],
'liteace': ['toyota', 'liteace'],
'townace': ['toyota', 'townace'],
'masterace': ['toyota', 'masterace'],
'model f': ['toyota', 'model f'],
'stout': ['toyota', 'stout'],
'blizzard': ['toyota', 'blizzard'],
'mega cruiser': ['toyota', 'mega cruiser'],
'kluger': ['toyota', 'kluger'],
'harrier': ['toyota', 'harrier'],
'vanguard': ['toyota', 'vanguard'],
'blade': ['toyota', 'blade'],
'ist': ['toyota', 'ist'],
'ractis': ['toyota', 'ractis'],
'bb': ['toyota', 'bb'],
'iq': ['toyota', 'iq'],
'sai': ['toyota', 'sai'],
'wish': ['toyota', 'wish'],
'caldina': ['toyota', 'caldina'],
'vista': ['toyota', 'vista'],
'camry vista': ['toyota', 'camry vista'],
'camry prominent': ['toyota', 'camry prominent'],
'windom': ['toyota', 'windom'],
'pronard': ['toyota', 'pronard'],
'kluger hybrid': ['toyota', 'kluger hybrid'],
'estima': ['toyota', 'estima'],
'estima hybrid': ['toyota', 'estima hybrid'],
'previa': ['toyota', 'previa'],
'tarago': ['toyota', 'tarago'],
'emina': ['toyota', 'emina'],
'lucida': ['toyota', 'lucida'],
'gaia': ['toyota', 'gaia'],
'nadia': ['toyota', 'nadia'],
'opa': ['toyota', 'opa'],
'voltz': ['toyota', 'voltz'],
'corolla rumion': ['toyota', 'corolla rumion'],
'corolla spacio': ['toyota', 'corolla spacio'],
'corolla verso': ['toyota', 'corolla verso'],
'corolla fielder': ['toyota', 'corolla fielder'],
'corolla axio': ['toyota', 'corolla axio'],
'corolla fx': ['toyota', 'corolla fx'],
'corolla levin': ['toyota', 'corolla levin'],
'sprinter': ['toyota', 'sprinter'],
'sprinter trueno': ['toyota', 'sprinter trueno'],
'sprinter carib': ['toyota', 'sprinter carib'],
'sprinter marino': ['toyota', 'sprinter marino'],
'sera': ['toyota', 'sera'],
'curren': ['toyota', 'curren'],
'cavalier': ['toyota', 'cavalier'],
'origin': ['toyota', 'origin'],
'verossa': ['toyota', 'verossa'],
'altis': ['toyota', 'altis'],
'levin': ['toyota', 'levin'],
'izoa': ['toyota', 'izoa'],
'wildlander': ['toyota', 'wildlander'],
'frontlander': ['toyota', 'frontlander'],
'crown kluger': ['toyota', 'crown kluger'],
'bz3': ['toyota', 'bz3'],
'proace': ['toyota', 'proace'],
'proace city': ['toyota', 'proace city'],
'proace max': ['toyota', 'proace max'],
            'challenger': ['dodge', 'challenger'],
'charger': ['dodge', 'charger'],
'durango': ['dodge', 'durango'],
'hornet': ['dodge', 'hornet'],
'ram 1500': ['dodge', 'ram 1500'],
'ram 2500': ['dodge', 'ram 2500'],
'ram 3500': ['dodge', 'ram 3500'],
'ram 4500': ['dodge', 'ram 4500'],
'ram 5500': ['dodge', 'ram 5500'],
'ram promaster': ['dodge', 'ram promaster'],
'ram promaster city': ['dodge', 'ram promaster city'],
'dakota': ['dodge', 'dakota'],
'journey': ['dodge', 'journey'],
'grand caravan': ['dodge', 'grand caravan'],
'caravan': ['dodge', 'caravan'],
'pacifica': ['dodge', 'pacifica'],
'viper': ['dodge', 'viper'],
'dart': ['dodge', 'dart'],
'avenger': ['dodge', 'avenger'],
'stratus': ['dodge', 'stratus'],
'intrepid': ['dodge', 'intrepid'],
'neon': ['dodge', 'neon'],
'neon srt-4': ['dodge', 'neon srt-4'],
'caliber': ['dodge', 'caliber'],
'nitro': ['dodge', 'nitro'],
'magnum': ['dodge', 'magnum'],
'demon': ['dodge', 'demon'],
'stealth': ['dodge', 'stealth'],
'daytona': ['dodge', 'daytona'],
'omni': ['dodge', 'omni'],
'colt': ['dodge', 'colt'],
'aries': ['dodge', 'aries'],
'spirit': ['dodge', 'spirit'],
'shadow': ['dodge', 'shadow'],
'dynasty': ['dodge', 'dynasty'],
'monaco': ['dodge', 'monaco'],
'diplomat': ['dodge', 'diplomat'],
'aspen': ['dodge', 'aspen'],
'coronet': ['dodge', 'coronet'],
'super bee': ['dodge', 'super bee'],
'polara': ['dodge', 'polara'],
'dart (classic)': ['dodge', 'dart (classic)'],
'lancer': ['dodge', 'lancer'],
'custom royal': ['dodge', 'custom royal'],
'royal': ['dodge', 'royal'],
'phoenix': ['dodge', 'phoenix'],
'matador': ['dodge', 'matador'],
'meadowbrook': ['dodge', 'meadowbrook'],
'wayfarer': ['dodge', 'wayfarer'],
'ramcharger': ['dodge', 'ramcharger'],
'raider': ['dodge', 'raider'],
'power wagon': ['dodge', 'power wagon'],
'd100': ['dodge', 'd100'],
'd150': ['dodge', 'd150'],
'd200': ['dodge', 'd200'],
'd250': ['dodge', 'd250'],
'd300': ['dodge', 'd300'],
'd350': ['dodge', 'd350'],
'w100': ['dodge', 'w100'],
'w150': ['dodge', 'w150'],
'w200': ['dodge', 'w200'],
'w250': ['dodge', 'w250'],
'w300': ['dodge', 'w300'],
'w350': ['dodge', 'w350'],
'rampage': ['dodge', 'rampage'],
'ram 50': ['dodge', 'ram 50'],
'mini ram van': ['dodge', 'mini ram van'],
'ram van': ['dodge', 'ram van'],
'ram wagon': ['dodge', 'ram wagon'],
'b100': ['dodge', 'b100'],
'b150': ['dodge', 'b150'],
'b200': ['dodge', 'b200'],
'b250': ['dodge', 'b250'],
'b300': ['dodge', 'b300'],
'b350': ['dodge', 'b350'],
'sprinter': ['dodge', 'sprinter'],
'attitude': ['dodge', 'attitude'],
'atos': ['dodge', 'atos'],
'brisa': ['dodge', 'brisa'],
'forza': ['dodge', 'forza'],
'h100': ['dodge', 'h100'],
'hyundai': ['dodge', 'hyundai'],
'i10': ['dodge', 'i10'],
'neon (mexico)': ['dodge', 'neon (mexico)'],
'vision': ['dodge', 'vision'],
'verna': ['dodge', 'verna'],
'trazo': ['dodge', 'trazo'],
'conquest': ['dodge', 'conquest'],
'st. regis': ['dodge', 'st. regis'],
'mirada': ['dodge', 'mirada'],
'magnum xe': ['dodge', 'magnum xe'],
'024': ['dodge', '024'],
'omni 024': ['dodge', 'omni 024'],
'charger 2.2': ['dodge', 'charger 2.2'],
'shelby charger': ['dodge', 'shelby charger'],
'600': ['dodge', '600'],
'400': ['dodge', '400'],
'330': ['dodge', '330'],
'440': ['dodge', '440'],
'880': ['dodge', '880'],
'custom 880': ['dodge', 'custom 880'],
'dart swinger': ['dodge', 'dart swinger'],
'dart sport': ['dodge', 'dart sport'],
'dart demon': ['dodge', 'dart demon'],
'colt vista': ['dodge', 'colt vista'],
'laser': ['dodge', 'laser'],
'daytona shelby': ['dodge', 'daytona shelby'],
'daytona shelby z': ['dodge', 'daytona shelby z'],
'lancer shelby': ['dodge', 'lancer shelby'],
'shelby csx': ['dodge', 'shelby csx'],
'spirit r/t': ['dodge', 'spirit r/t'],
'shelby dakota': ['dodge', 'shelby dakota'],
'ram srt-10': ['dodge', 'ram srt-10'],
'tomahawk': ['dodge', 'tomahawk'],
'firepower': ['dodge', 'firepower'],
'razor': ['dodge', 'razor'],
'circuit ev': ['dodge', 'circuit ev'],
'zeo': ['dodge', 'zeo'],
'm4s': ['dodge', 'm4s'],
'sidewinder': ['dodge', 'sidewinder'],
'copperhead': ['dodge', 'copperhead'],
'charger daytona srt': ['dodge', 'charger daytona srt'],
'challenger srt demon 170': ['dodge', 'challenger srt demon 170'],
            'silverado 1500': ['chevrolet', 'silverado 1500'],
'silverado 2500hd': ['chevrolet', 'silverado 2500hd'],
'silverado 3500hd': ['chevrolet', 'silverado 3500hd'],
'colorado': ['chevrolet', 'colorado'],
's-10': ['chevrolet', 's-10'],
'c/k': ['chevrolet', 'c/k'],
'c10': ['chevrolet', 'c10'],
'c20': ['chevrolet', 'c20'],
'c30': ['chevrolet', 'c30'],
'k10': ['chevrolet', 'k10'],
'k20': ['chevrolet', 'k20'],
'k30': ['chevrolet', 'k30'],
'k5 blazer': ['chevrolet', 'k5 blazer'],
'blazer': ['chevrolet', 'blazer'],
'blazer ev': ['chevrolet', 'blazer ev'],
'tahoe': ['chevrolet', 'tahoe'],
'suburban': ['chevrolet', 'suburban'],
'traverse': ['chevrolet', 'traverse'],
'equinox': ['chevrolet', 'equinox'],
'equinox ev': ['chevrolet', 'equinox ev'],
'trailblazer': ['chevrolet', 'trailblazer'],
'trax': ['chevrolet', 'trax'],
'captiva': ['chevrolet', 'captiva'],
'captiva sport': ['chevrolet', 'captiva sport'],
'corvette': ['chevrolet', 'corvette'],
'corvette stingray': ['chevrolet', 'corvette stingray'],
'corvette z06': ['chevrolet', 'corvette z06'],
'corvette zr1': ['chevrolet', 'corvette zr1'],
'corvette grand sport': ['chevrolet', 'corvette grand sport'],
'camaro': ['chevrolet', 'camaro'],
'camaro z28': ['chevrolet', 'camaro z28'],
'camaro zl1': ['chevrolet', 'camaro zl1'],
'camaro iroc-z': ['chevrolet', 'camaro iroc-z'],
'malibu': ['chevrolet', 'malibu'],
'malibu maxx': ['chevrolet', 'malibu maxx'],
'impala': ['chevrolet', 'impala'],
'impala ss': ['chevrolet', 'impala ss'],
'cruze': ['chevrolet', 'cruze'],
'sonic': ['chevrolet', 'sonic'],
'spark': ['chevrolet', 'spark'],
'spark ev': ['chevrolet', 'spark ev'],
'bolt': ['chevrolet', 'bolt'],
'bolt euv': ['chevrolet', 'bolt euv'],
'volt': ['chevrolet', 'volt'],
'aveo': ['chevrolet', 'aveo'],
'cavalier': ['chevrolet', 'cavalier'],
'cobalt': ['chevrolet', 'cobalt'],
'cobalt ss': ['chevrolet', 'cobalt ss'],
'prizm': ['chevrolet', 'prizm'],
'spectrum': ['chevrolet', 'spectrum'],
'sprint': ['chevrolet', 'sprint'],
'metro': ['chevrolet', 'metro'],
'nova': ['chevrolet', 'nova'],
'citation': ['chevrolet', 'citation'],
'celebrity': ['chevrolet', 'celebrity'],
'corsica': ['chevrolet', 'corsica'],
'beretta': ['chevrolet', 'beretta'],
'lumina': ['chevrolet', 'lumina'],
'lumina apv': ['chevrolet', 'lumina apv'],
'monte carlo': ['chevrolet', 'monte carlo'],
'monte carlo ss': ['chevrolet', 'monte carlo ss'],
'chevelle': ['chevrolet', 'chevelle'],
'chevelle ss': ['chevrolet', 'chevelle ss'],
'chevelle malibu': ['chevrolet', 'chevelle malibu'],
'el camino': ['chevrolet', 'el camino'],
'express': ['chevrolet', 'express'],
'express 1500': ['chevrolet', 'express 1500'],
'express 2500': ['chevrolet', 'express 2500'],
'express 3500': ['chevrolet', 'express 3500'],
'city express': ['chevrolet', 'city express'],
'astro': ['chevrolet', 'astro'],
'venture': ['chevrolet', 'venture'],
'uplander': ['chevrolet', 'uplander'],
'lumina minivan': ['chevrolet', 'lumina minivan'],
'hhr': ['chevrolet', 'hhr'],
'ssr': ['chevrolet', 'ssr'],
'avalanche': ['chevrolet', 'avalanche'],
'bel air': ['chevrolet', 'bel air'],
'biscayne': ['chevrolet', 'biscayne'],
'brookwood': ['chevrolet', 'brookwood'],
'caprice': ['chevrolet', 'caprice'],
'caprice classic': ['chevrolet', 'caprice classic'],
'caprice ppv': ['chevrolet', 'caprice ppv'],
'chevette': ['chevrolet', 'chevette'],
'vega': ['chevrolet', 'vega'],
'cosworth vega': ['chevrolet', 'cosworth vega'],
'monza': ['chevrolet', 'monza'],
'styleline': ['chevrolet', 'styleline'],
'fleetline': ['chevrolet', 'fleetline'],
'fleetmaster': ['chevrolet', 'fleetmaster'],
'deluxe': ['chevrolet', 'deluxe'],
'special deluxe': ['chevrolet', 'special deluxe'],
'master': ['chevrolet', 'master'],
'master deluxe': ['chevrolet', 'master deluxe'],
'standard': ['chevrolet', 'standard'],
'superior': ['chevrolet', 'superior'],
'classic six': ['chevrolet', 'classic six'],
'series 490': ['chevrolet', 'series 490'],
'kingswood': ['chevrolet', 'kingswood'],
'parkwood': ['chevrolet', 'parkwood'],
'townsman': ['chevrolet', 'townsman'],
'yeoman': ['chevrolet', 'yeoman'],
'nomad': ['chevrolet', 'nomad'],
'beauville': ['chevrolet', 'beauville'],
'sportvan': ['chevrolet', 'sportvan'],
'greenbrier': ['chevrolet', 'greenbrier'],
'corvair': ['chevrolet', 'corvair'],
'corvair monza': ['chevrolet', 'corvair monza'],
'corvair corsa': ['chevrolet', 'corvair corsa'],
'corvair 500': ['chevrolet', 'corvair 500'],
'corvair 700': ['chevrolet', 'corvair 700'],
'corvair lakewood': ['chevrolet', 'corvair lakewood'],
'corvair greenbrier': ['chevrolet', 'corvair greenbrier'],
'corvair rampside': ['chevrolet', 'corvair rampside'],
'corvair loadside': ['chevrolet', 'corvair loadside'],
'luv': ['chevrolet', 'luv'],
'tracker': ['chevrolet', 'tracker'],
'geo tracker': ['chevrolet', 'geo tracker'],
'geo metro': ['chevrolet', 'geo metro'],
'geo prizm': ['chevrolet', 'geo prizm'],
'geo spectrum': ['chevrolet', 'geo spectrum'],
'geo storm': ['chevrolet', 'geo storm'],
'epica': ['chevrolet', 'epica'],
'lacetti': ['chevrolet', 'lacetti'],
'nubira': ['chevrolet', 'nubira'],
'rezzo': ['chevrolet', 'rezzo'],
'tacuma': ['chevrolet', 'tacuma'],
'evanda': ['chevrolet', 'evanda'],
'tosca': ['chevrolet', 'tosca'],
'optra': ['chevrolet', 'optra'],
'optra magnum': ['chevrolet', 'optra magnum'],
'aveo5': ['chevrolet', 'aveo5'],
'kalos': ['chevrolet', 'kalos'],
'lova': ['chevrolet', 'lova'],
'sail': ['chevrolet', 'sail'],
'enjoy': ['chevrolet', 'enjoy'],
'spin': ['chevrolet', 'spin'],
'orlando': ['chevrolet', 'orlando'],
'captiva (china)': ['chevrolet', 'captiva (china)'],
'menlo': ['chevrolet', 'menlo'],
'groove': ['chevrolet', 'groove'],
'seeker': ['chevrolet', 'seeker'],
'onix': ['chevrolet', 'onix'],
'onix plus': ['chevrolet', 'onix plus'],
'prisma': ['chevrolet', 'prisma'],
'agile': ['chevrolet', 'agile'],
'celta': ['chevrolet', 'celta'],
'classic': ['chevrolet', 'classic'],
'corsa': ['chevrolet', 'corsa'],
'montana': ['chevrolet', 'montana'],
's10 (brazil)': ['chevrolet', 's10 (brazil)'],
'astra': ['chevrolet', 'astra'],
'vectra': ['chevrolet', 'vectra'],
'omega': ['chevrolet', 'omega'],
'zafira': ['chevrolet', 'zafira'],
'meriva': ['chevrolet', 'meriva'],
'tigra': ['chevrolet', 'tigra'],
'kadett': ['chevrolet', 'kadett'],
'ipanema': ['chevrolet', 'ipanema'],
'monza (brazil)': ['chevrolet', 'monza (brazil)'],
'chevette (brazil)': ['chevrolet', 'chevette (brazil)'],
'opala': ['chevrolet', 'opala'],
'diplomata': ['chevrolet', 'diplomata'],
'caravan': ['chevrolet', 'caravan'],
'veraneio': ['chevrolet', 'veraneio'],
'bonanza': ['chevrolet', 'bonanza'],
'c-10 (brazil)': ['chevrolet', 'c-10 (brazil)'],
'c-14': ['chevrolet', 'c-14'],
'c-15': ['chevrolet', 'c-15'],
'a-10': ['chevrolet', 'a-10'],
'a-20': ['chevrolet', 'a-20'],
'd-10': ['chevrolet', 'd-10'],
'd-20': ['chevrolet', 'd-20'],
'd-40': ['chevrolet', 'd-40'],
'd-60': ['chevrolet', 'd-60'],
'grand blazer': ['chevrolet', 'grand blazer'],
'n200': ['chevrolet', 'n200'],
'n300': ['chevrolet', 'n300'],
'n400': ['chevrolet', 'n400'],
'tornado': ['chevrolet', 'tornado'],
'matiz': ['chevrolet', 'matiz'],
'niva': ['chevrolet', 'niva'],
'alero': ['chevrolet', 'alero'],
'trooper': ['chevrolet', 'trooper'],
'forester': ['chevrolet', 'forester'],
'vivant': ['chevrolet', 'vivant'],
'evanda': ['chevrolet', 'evanda'],
'xl-7': ['chevrolet', 'xl-7'],
            'wrangler': ['jeep', 'wrangler'],
'wrangler unlimited': ['jeep', 'wrangler unlimited'],
'wrangler 4xe': ['jeep', 'wrangler 4xe'],
'grand cherokee': ['jeep', 'grand cherokee'],
'grand cherokee l': ['jeep', 'grand cherokee l'],
'grand cherokee 4xe': ['jeep', 'grand cherokee 4xe'],
'cherokee': ['jeep', 'cherokee'],
'compass': ['jeep', 'compass'],
'renegade': ['jeep', 'renegade'],
'gladiator': ['jeep', 'gladiator'],
'wagoneer': ['jeep', 'wagoneer'],
'grand wagoneer': ['jeep', 'grand wagoneer'],
'commander': ['jeep', 'commander'],
'patriot': ['jeep', 'patriot'],
'liberty': ['jeep', 'liberty'],
'cj-2a': ['jeep', 'cj-2a'],
'cj-3a': ['jeep', 'cj-3a'],
'cj-3b': ['jeep', 'cj-3b'],
'cj-5': ['jeep', 'cj-5'],
'cj-6': ['jeep', 'cj-6'],
'cj-7': ['jeep', 'cj-7'],
'cj-8': ['jeep', 'cj-8'],
'scrambler': ['jeep', 'scrambler'],
'commando': ['jeep', 'commando'],
'jeepster': ['jeep', 'jeepster'],
'jeepster commando': ['jeep', 'jeepster commando'],
'willys': ['jeep', 'willys'],
'willys mb': ['jeep', 'willys mb'],
'willys wagon': ['jeep', 'willys wagon'],
'willys truck': ['jeep', 'willys truck'],
'willys jeepster': ['jeep', 'willys jeepster'],
'dj': ['jeep', 'dj'],
'dispatcher': ['jeep', 'dispatcher'],
'fj': ['jeep', 'fj'],
'forward control': ['jeep', 'forward control'],
'fc-150': ['jeep', 'fc-150'],
'fc-170': ['jeep', 'fc-170'],
'j10': ['jeep', 'j10'],
'j20': ['jeep', 'j20'],
'j-series': ['jeep', 'j-series'],
'honcho': ['jeep', 'honcho'],
'comanche': ['jeep', 'comanche'],
'wrangler tj': ['jeep', 'wrangler tj'],
'wrangler yj': ['jeep', 'wrangler yj'],
'wrangler jk': ['jeep', 'wrangler jk'],
'wrangler jl': ['jeep', 'wrangler jl'],
'cherokee xj': ['jeep', 'cherokee xj'],
'cherokee kj': ['jeep', 'cherokee kj'],
'cherokee kk': ['jeep', 'cherokee kk'],
'cherokee kl': ['jeep', 'cherokee kl'],
'grand cherokee zj': ['jeep', 'grand cherokee zj'],
'grand cherokee wj': ['jeep', 'grand cherokee wj'],
'grand cherokee wk': ['jeep', 'grand cherokee wk'],
'grand cherokee wk2': ['jeep', 'grand cherokee wk2'],
'avenger': ['jeep', 'avenger'],
'recon': ['jeep', 'recon'],
'rubicon': ['jeep', 'rubicon'],
'sahara': ['jeep', 'sahara'],
'laredo': ['jeep', 'laredo'],
'limited': ['jeep', 'limited'],
'overland': ['jeep', 'overland'],
'summit': ['jeep', 'summit'],
'trailhawk': ['jeep', 'trailhawk'],
'trackhawk': ['jeep', 'trackhawk'],
'srt': ['jeep', 'srt'],
'srt8': ['jeep', 'srt8'],
'hurricane': ['jeep', 'hurricane'],
'treo': ['jeep', 'treo'],
'compass concept': ['jeep', 'compass concept'],
'icon': ['jeep', 'icon'],
'rescue': ['jeep', 'rescue'],
'dakar': ['jeep', 'dakar'],
'varsity': ['jeep', 'varsity'],
'bj2020': ['jeep', 'bj2020'],
'beijing jeep': ['jeep', 'beijing jeep'],
'avenger (europe)': ['jeep', 'avenger (europe)'],
            'd-max': ['isuzu', 'd-max'],
'rodeo': ['isuzu', 'rodeo'],
'trooper': ['isuzu', 'trooper'],
'trooper ii': ['isuzu', 'trooper ii'],
'vehicross': ['isuzu', 'vehicross'],
'axiom': ['isuzu', 'axiom'],
'ascender': ['isuzu', 'ascender'],
'mu-x': ['isuzu', 'mu-x'],
'mu-7': ['isuzu', 'mu-7'],
'amigo': ['isuzu', 'amigo'],
'hombre': ['isuzu', 'hombre'],
'i-280': ['isuzu', 'i-280'],
'i-290': ['isuzu', 'i-290'],
'i-350': ['isuzu', 'i-350'],
'i-370': ['isuzu', 'i-370'],
'pickup': ['isuzu', 'pickup'],
'pup': ['isuzu', 'pup'],
'kb': ['isuzu', 'kb'],
'tf': ['isuzu', 'tf'],
'tfr': ['isuzu', 'tfr'],
'tfs': ['isuzu', 'tfs'],
'faster': ['isuzu', 'faster'],
'campo': ['isuzu', 'campo'],
'fuego': ['isuzu', 'fuego'],
'impulse': ['isuzu', 'impulse'],
'stylus': ['isuzu', 'stylus'],
'gemini': ['isuzu', 'gemini'],
'bellett': ['isuzu', 'bellett'],
'florian': ['isuzu', 'florian'],
'117 coupe': ['isuzu', '117 coupe'],
'piazza': ['isuzu', 'piazza'],
'aska': ['isuzu', 'aska'],
'bellel': ['isuzu', 'bellel'],
'minx': ['isuzu', 'minx'],
'hillman minx': ['isuzu', 'hillman minx'],
'wasp': ['isuzu', 'wasp'],
'elf': ['isuzu', 'elf'],
'n-series': ['isuzu', 'n-series'],
'npr': ['isuzu', 'npr'],
'nqr': ['isuzu', 'nqr'],
'nrr': ['isuzu', 'nrr'],
'npr-hd': ['isuzu', 'npr-hd'],
'npr-xd': ['isuzu', 'npr-xd'],
'forward': ['isuzu', 'forward'],
'f-series': ['isuzu', 'f-series'],
'fsr': ['isuzu', 'fsr'],
'ftr': ['isuzu', 'ftr'],
'fvr': ['isuzu', 'fvr'],
'fxr': ['isuzu', 'fxr'],
'fyr': ['isuzu', 'fyr'],
'giga': ['isuzu', 'giga'],
'c-series': ['isuzu', 'c-series'],
'e-series': ['isuzu', 'e-series'],
'erga': ['isuzu', 'erga'],
'erga mio': ['isuzu', 'erga mio'],
'journey': ['isuzu', 'journey'],
'gala': ['isuzu', 'gala'],
'gala mio': ['isuzu', 'gala mio'],
'cubic': ['isuzu', 'cubic'],
'super cruiser': ['isuzu', 'super cruiser'],
'bonnet bus': ['isuzu', 'bonnet bus'],
'journey-j': ['isuzu', 'journey-j'],
'journey-k': ['isuzu', 'journey-k'],
'journey-q': ['isuzu', 'journey-q'],
'lt111': ['isuzu', 'lt111'],
'lt112': ['isuzu', 'lt112'],
'como': ['isuzu', 'como'],
'fargo': ['isuzu', 'fargo'],
'midi': ['isuzu', 'midi'],
'wfr': ['isuzu', 'wfr'],
'reach': ['isuzu', 'reach'],
'oasis': ['isuzu', 'oasis'],
'panther': ['isuzu', 'panther'],
'crosswind': ['isuzu', 'crosswind'],
'sportivo': ['isuzu', 'sportivo'],
'alterra': ['isuzu', 'alterra'],
'highlander': ['isuzu', 'highlander'],
'wizard': ['isuzu', 'wizard'],
'mysterious utility wizard': ['isuzu', 'mysterious utility wizard'],
'mu': ['isuzu', 'mu'],
'vega': ['isuzu', 'vega'],
'bighorn': ['isuzu', 'bighorn'],
'vehi-cross': ['isuzu', 'vehi-cross'],
'foxtrax': ['isuzu', 'foxtrax'],
'vertex': ['isuzu', 'vertex'],
'deseo': ['isuzu', 'deseo'],
'ax-4': ['isuzu', 'ax-4'],
'zen': ['isuzu', 'zen'],
'kai': ['isuzu', 'kai'],
'costa': ['isuzu', 'costa'],
'como-z': ['isuzu', 'como-z'],
'vega-van': ['isuzu', 'vega-van'],
'd-core': ['isuzu', 'd-core'],
'fl-ir': ['isuzu', 'fl-ir'],
'intriga': ['isuzu', 'intriga'],
'traga': ['isuzu', 'traga'],
'gt-r': ['isuzu', 'gt-r'],
'hilly': ['isuzu', 'hilly'],
'tx-series': ['isuzu', 'tx-series'],
'txa': ['isuzu', 'txa'],
'txd': ['isuzu', 'txd'],
            'a-class': ['mercedes-benz', 'a-class'],
'a160': ['mercedes-benz', 'a160'],
'a180': ['mercedes-benz', 'a180'],
'a200': ['mercedes-benz', 'a200'],
'a220': ['mercedes-benz', 'a220'],
'a250': ['mercedes-benz', 'a250'],
'a35 amg': ['mercedes-benz', 'a35 amg'],
'a45 amg': ['mercedes-benz', 'a45 amg'],
'b-class': ['mercedes-benz', 'b-class'],
'b160': ['mercedes-benz', 'b160'],
'b180': ['mercedes-benz', 'b180'],
'b200': ['mercedes-benz', 'b200'],
'b220': ['mercedes-benz', 'b220'],
'b250': ['mercedes-benz', 'b250'],
'c-class': ['mercedes-benz', 'c-class'],
'c160': ['mercedes-benz', 'c160'],
'c180': ['mercedes-benz', 'c180'],
'c200': ['mercedes-benz', 'c200'],
'c220': ['mercedes-benz', 'c220'],
'c230': ['mercedes-benz', 'c230'],
'c240': ['mercedes-benz', 'c240'],
'c250': ['mercedes-benz', 'c250'],
'c280': ['mercedes-benz', 'c280'],
'c300': ['mercedes-benz', 'c300'],
'c320': ['mercedes-benz', 'c320'],
'c350': ['mercedes-benz', 'c350'],
'c400': ['mercedes-benz', 'c400'],
'c43 amg': ['mercedes-benz', 'c43 amg'],
'c55 amg': ['mercedes-benz', 'c55 amg'],
'c63 amg': ['mercedes-benz', 'c63 amg'],
'e-class': ['mercedes-benz', 'e-class'],
'e200': ['mercedes-benz', 'e200'],
'e220': ['mercedes-benz', 'e220'],
'e230': ['mercedes-benz', 'e230'],
'e240': ['mercedes-benz', 'e240'],
'e250': ['mercedes-benz', 'e250'],
'e280': ['mercedes-benz', 'e280'],
'e300': ['mercedes-benz', 'e300'],
'e320': ['mercedes-benz', 'e320'],
'e350': ['mercedes-benz', 'e350'],
'e400': ['mercedes-benz', 'e400'],
'e420': ['mercedes-benz', 'e420'],
'e430': ['mercedes-benz', 'e430'],
'e450': ['mercedes-benz', 'e450'],
'e500': ['mercedes-benz', 'e500'],
'e550': ['mercedes-benz', 'e550'],
'e43 amg': ['mercedes-benz', 'e43 amg'],
'e53 amg': ['mercedes-benz', 'e53 amg'],
'e55 amg': ['mercedes-benz', 'e55 amg'],
'e63 amg': ['mercedes-benz', 'e63 amg'],
's-class': ['mercedes-benz', 's-class'],
's280': ['mercedes-benz', 's280'],
's300': ['mercedes-benz', 's300'],
's320': ['mercedes-benz', 's320'],
's350': ['mercedes-benz', 's350'],
's400': ['mercedes-benz', 's400'],
's420': ['mercedes-benz', 's420'],
's430': ['mercedes-benz', 's430'],
's450': ['mercedes-benz', 's450'],
's500': ['mercedes-benz', 's500'],
's550': ['mercedes-benz', 's550'],
's560': ['mercedes-benz', 's560'],
's580': ['mercedes-benz', 's580'],
's600': ['mercedes-benz', 's600'],
's63 amg': ['mercedes-benz', 's63 amg'],
's65 amg': ['mercedes-benz', 's65 amg'],
'maybach s-class': ['mercedes-benz', 'maybach s-class'],
'maybach s560': ['mercedes-benz', 'maybach s560'],
'maybach s580': ['mercedes-benz', 'maybach s580'],
'maybach s650': ['mercedes-benz', 'maybach s650'],
'maybach s680': ['mercedes-benz', 'maybach s680'],
'maybach 57': ['mercedes-benz', 'maybach 57'],
'maybach 62': ['mercedes-benz', 'maybach 62'],
'maybach zeppelin': ['mercedes-benz', 'maybach zeppelin'],
'maybach landaulet': ['mercedes-benz', 'maybach landaulet'],
'cla-class': ['mercedes-benz', 'cla-class'],
'cla180': ['mercedes-benz', 'cla180'],
'cla200': ['mercedes-benz', 'cla200'],
'cla220': ['mercedes-benz', 'cla220'],
'cla250': ['mercedes-benz', 'cla250'],
'cla35 amg': ['mercedes-benz', 'cla35 amg'],
'cla45 amg': ['mercedes-benz', 'cla45 amg'],
'cls-class': ['mercedes-benz', 'cls-class'],
'cls350': ['mercedes-benz', 'cls350'],
'cls400': ['mercedes-benz', 'cls400'],
'cls450': ['mercedes-benz', 'cls450'],
'cls500': ['mercedes-benz', 'cls500'],
'cls550': ['mercedes-benz', 'cls550'],
'cls53 amg': ['mercedes-benz', 'cls53 amg'],
'cls55 amg': ['mercedes-benz', 'cls55 amg'],
'cls63 amg': ['mercedes-benz', 'cls63 amg'],
'gla-class': ['mercedes-benz', 'gla-class'],
'gla180': ['mercedes-benz', 'gla180'],
'gla200': ['mercedes-benz', 'gla200'],
'gla220': ['mercedes-benz', 'gla220'],
'gla250': ['mercedes-benz', 'gla250'],
'gla35 amg': ['mercedes-benz', 'gla35 amg'],
'gla45 amg': ['mercedes-benz', 'gla45 amg'],
'glb-class': ['mercedes-benz', 'glb-class'],
'glb200': ['mercedes-benz', 'glb200'],
'glb220': ['mercedes-benz', 'glb220'],
'glb250': ['mercedes-benz', 'glb250'],
'glb35 amg': ['mercedes-benz', 'glb35 amg'],
'glc-class': ['mercedes-benz', 'glc-class'],
'glc200': ['mercedes-benz', 'glc200'],
'glc220': ['mercedes-benz', 'glc220'],
'glc250': ['mercedes-benz', 'glc250'],
'glc300': ['mercedes-benz', 'glc300'],
'glc350': ['mercedes-benz', 'glc350'],
'glc43 amg': ['mercedes-benz', 'glc43 amg'],
'glc63 amg': ['mercedes-benz', 'glc63 amg'],
'glc coupe': ['mercedes-benz', 'glc coupe'],
'gle-class': ['mercedes-benz', 'gle-class'],
'gle300': ['mercedes-benz', 'gle300'],
'gle350': ['mercedes-benz', 'gle350'],
'gle400': ['mercedes-benz', 'gle400'],
'gle450': ['mercedes-benz', 'gle450'],
'gle500': ['mercedes-benz', 'gle500'],
'gle550': ['mercedes-benz', 'gle550'],
'gle580': ['mercedes-benz', 'gle580'],
'gle43 amg': ['mercedes-benz', 'gle43 amg'],
'gle53 amg': ['mercedes-benz', 'gle53 amg'],
'gle63 amg': ['mercedes-benz', 'gle63 amg'],
'gle coupe': ['mercedes-benz', 'gle coupe'],
'gls-class': ['mercedes-benz', 'gls-class'],
'gls350': ['mercedes-benz', 'gls350'],
'gls400': ['mercedes-benz', 'gls400'],
'gls450': ['mercedes-benz', 'gls450'],
'gls500': ['mercedes-benz', 'gls500'],
'gls550': ['mercedes-benz', 'gls550'],
'gls580': ['mercedes-benz', 'gls580'],
'gls600 maybach': ['mercedes-benz', 'gls600 maybach'],
'gls63 amg': ['mercedes-benz', 'gls63 amg'],
'g-class': ['mercedes-benz', 'g-class'],
'g-wagon': ['mercedes-benz', 'g-wagon'],
'g350': ['mercedes-benz', 'g350'],
'g400': ['mercedes-benz', 'g400'],
'g500': ['mercedes-benz', 'g500'],
'g550': ['mercedes-benz', 'g550'],
'g55 amg': ['mercedes-benz', 'g55 amg'],
'g63 amg': ['mercedes-benz', 'g63 amg'],
'g65 amg': ['mercedes-benz', 'g65 amg'],
'g63 amg 6x6': ['mercedes-benz', 'g63 amg 6x6'],
'g500 4x4²': ['mercedes-benz', 'g500 4x4²'],
'g650 landaulet': ['mercedes-benz', 'g650 landaulet'],
'glk-class': ['mercedes-benz', 'glk-class'],
'glk200': ['mercedes-benz', 'glk200'],
'glk250': ['mercedes-benz', 'glk250'],
'glk280': ['mercedes-benz', 'glk280'],
'glk300': ['mercedes-benz', 'glk300'],
'glk350': ['mercedes-benz', 'glk350'],
'gl-class': ['mercedes-benz', 'gl-class'],
'gl320': ['mercedes-benz', 'gl320'],
'gl350': ['mercedes-benz', 'gl350'],
'gl450': ['mercedes-benz', 'gl450'],
'gl500': ['mercedes-benz', 'gl500'],
'gl550': ['mercedes-benz', 'gl550'],
'gl63 amg': ['mercedes-benz', 'gl63 amg'],
'ml-class': ['mercedes-benz', 'ml-class'],
'm-class': ['mercedes-benz', 'm-class'],
'ml230': ['mercedes-benz', 'ml230'],
'ml270': ['mercedes-benz', 'ml270'],
'ml280': ['mercedes-benz', 'ml280'],
'ml300': ['mercedes-benz', 'ml300'],
'ml320': ['mercedes-benz', 'ml320'],
'ml350': ['mercedes-benz', 'ml350'],
'ml400': ['mercedes-benz', 'ml400'],
'ml430': ['mercedes-benz', 'ml430'],
'ml450': ['mercedes-benz', 'ml450'],
'ml500': ['mercedes-benz', 'ml500'],
'ml550': ['mercedes-benz', 'ml550'],
'ml55 amg': ['mercedes-benz', 'ml55 amg'],
'ml63 amg': ['mercedes-benz', 'ml63 amg'],
'r-class': ['mercedes-benz', 'r-class'],
'r280': ['mercedes-benz', 'r280'],
'r300': ['mercedes-benz', 'r300'],
'r320': ['mercedes-benz', 'r320'],
'r350': ['mercedes-benz', 'r350'],
'r500': ['mercedes-benz', 'r500'],
'r550': ['mercedes-benz', 'r550'],
'r63 amg': ['mercedes-benz', 'r63 amg'],
'sl-class': ['mercedes-benz', 'sl-class'],
'sl280': ['mercedes-benz', 'sl280'],
'sl300': ['mercedes-benz', 'sl300'],
'sl320': ['mercedes-benz', 'sl320'],
'sl350': ['mercedes-benz', 'sl350'],
'sl400': ['mercedes-benz', 'sl400'],
'sl450': ['mercedes-benz', 'sl450'],
'sl500': ['mercedes-benz', 'sl500'],
'sl550': ['mercedes-benz', 'sl550'],
'sl560': ['mercedes-benz', 'sl560'],
'sl600': ['mercedes-benz', 'sl600'],
'sl55 amg': ['mercedes-benz', 'sl55 amg'],
'sl63 amg': ['mercedes-benz', 'sl63 amg'],
'sl65 amg': ['mercedes-benz', 'sl65 amg'],
'sl73 amg': ['mercedes-benz', 'sl73 amg'],
'slc-class': ['mercedes-benz', 'slc-class'],
'slc180': ['mercedes-benz', 'slc180'],
'slc200': ['mercedes-benz', 'slc200'],
'slc250': ['mercedes-benz', 'slc250'],
'slc300': ['mercedes-benz', 'slc300'],
'slc350': ['mercedes-benz', 'slc350'],
'slc43 amg': ['mercedes-benz', 'slc43 amg'],
'slk-class': ['mercedes-benz', 'slk-class'],
'slk200': ['mercedes-benz', 'slk200'],
'slk230': ['mercedes-benz', 'slk230'],
'slk250': ['mercedes-benz', 'slk250'],
'slk280': ['mercedes-benz', 'slk280'],
'slk300': ['mercedes-benz', 'slk300'],
'slk320': ['mercedes-benz', 'slk320'],
'slk350': ['mercedes-benz', 'slk350'],
'slk32 amg': ['mercedes-benz', 'slk32 amg'],
'slk55 amg': ['mercedes-benz', 'slk55 amg'],
'sls amg': ['mercedes-benz', 'sls amg'],
'sls amg black series': ['mercedes-benz', 'sls amg black series'],
'sls amg gt': ['mercedes-benz', 'sls amg gt'],
'amg gt': ['mercedes-benz', 'amg gt'],
'amg gt s': ['mercedes-benz', 'amg gt s'],
'amg gt r': ['mercedes-benz', 'amg gt r'],
'amg gt c': ['mercedes-benz', 'amg gt c'],
'amg gt 43': ['mercedes-benz', 'amg gt 43'],
'amg gt 53': ['mercedes-benz', 'amg gt 53'],
'amg gt 63': ['mercedes-benz', 'amg gt 63'],
'amg gt 63 s': ['mercedes-benz', 'amg gt 63 s'],
'amg gt black series': ['mercedes-benz', 'amg gt black series'],
'amg one': ['mercedes-benz', 'amg one'],
'clk-class': ['mercedes-benz', 'clk-class'],
'clk200': ['mercedes-benz', 'clk200'],
'clk230': ['mercedes-benz', 'clk230'],
'clk240': ['mercedes-benz', 'clk240'],
'clk280': ['mercedes-benz', 'clk280'],
'clk320': ['mercedes-benz', 'clk320'],
'clk350': ['mercedes-benz', 'clk350'],
'clk430': ['mercedes-benz', 'clk430'],
'clk500': ['mercedes-benz', 'clk500'],
'clk550': ['mercedes-benz', 'clk550'],
'clk55 amg': ['mercedes-benz', 'clk55 amg'],
'clk63 amg': ['mercedes-benz', 'clk63 amg'],
'clk-gtr': ['mercedes-benz', 'clk-gtr'],
'cl-class': ['mercedes-benz', 'cl-class'],
'cl500': ['mercedes-benz', 'cl500'],
'cl550': ['mercedes-benz', 'cl550'],
'cl600': ['mercedes-benz', 'cl600'],
'cl55 amg': ['mercedes-benz', 'cl55 amg'],
'cl63 amg': ['mercedes-benz', 'cl63 amg'],
'cl65 amg': ['mercedes-benz', 'cl65 amg'],
'slr mclaren': ['mercedes-benz', 'slr mclaren'],
'slr mclaren 722': ['mercedes-benz', 'slr mclaren 722'],
'slr mclaren roadster': ['mercedes-benz', 'slr mclaren roadster'],
'slr stirling moss': ['mercedes-benz', 'slr stirling moss'],
'190e': ['mercedes-benz', '190e'],
'190d': ['mercedes-benz', '190d'],
'190e 2.3-16': ['mercedes-benz', '190e 2.3-16'],
'190e 2.5-16': ['mercedes-benz', '190e 2.5-16'],
'190e evolution': ['mercedes-benz', '190e evolution'],
'w123': ['mercedes-benz', 'w123'],
'w124': ['mercedes-benz', 'w124'],
'w126': ['mercedes-benz', 'w126'],
'w140': ['mercedes-benz', 'w140'],
'w201': ['mercedes-benz', 'w201'],
'w202': ['mercedes-benz', 'w202'],
'w203': ['mercedes-benz', 'w203'],
'w204': ['mercedes-benz', 'w204'],
'w205': ['mercedes-benz', 'w205'],
'w206': ['mercedes-benz', 'w206'],
'w210': ['mercedes-benz', 'w210'],
'w211': ['mercedes-benz', 'w211'],
'w212': ['mercedes-benz', 'w212'],
'w213': ['mercedes-benz', 'w213'],
'w220': ['mercedes-benz', 'w220'],
'w221': ['mercedes-benz', 'w221'],
'w222': ['mercedes-benz', 'w222'],
'w223': ['mercedes-benz', 'w223'],
'300sl': ['mercedes-benz', '300sl'],
'300sl gullwing': ['mercedes-benz', '300sl gullwing'],
'300sl roadster': ['mercedes-benz', '300sl roadster'],
'300se': ['mercedes-benz', '300se'],
'300sel': ['mercedes-benz', '300sel'],
'300d': ['mercedes-benz', '300d'],
'300td': ['mercedes-benz', '300td'],
'300cd': ['mercedes-benz', '300cd'],
'300sd': ['mercedes-benz', '300sd'],
'300sdl': ['mercedes-benz', '300sdl'],
'300e': ['mercedes-benz', '300e'],
'300ce': ['mercedes-benz', '300ce'],
'300te': ['mercedes-benz', '300te'],
'260e': ['mercedes-benz', '260e'],
'280e': ['mercedes-benz', '280e'],
'280se': ['mercedes-benz', '280se'],
'280sel': ['mercedes-benz', '280sel'],
'280sl': ['mercedes-benz', '280sl'],
'280s': ['mercedes-benz', '280s'],
'280c': ['mercedes-benz', '280c'],
'280ce': ['mercedes-benz', '280ce'],
'280te': ['mercedes-benz', '280te'],
'230e': ['mercedes-benz', '230e'],
'230ce': ['mercedes-benz', '230ce'],
'230te': ['mercedes-benz', '230te'],
'230sl': ['mercedes-benz', '230sl'],
'240d': ['mercedes-benz', '240d'],
'250sl': ['mercedes-benz', '250sl'],
'250se': ['mercedes-benz', '250se'],
'250sel': ['mercedes-benz', '250sel'],
'250c': ['mercedes-benz', '250c'],
'220se': ['mercedes-benz', '220se'],
'220d': ['mercedes-benz', '220d'],
'200d': ['mercedes-benz', '200d'],
'200e': ['mercedes-benz', '200e'],
'170': ['mercedes-benz', '170'],
'180': ['mercedes-benz', '180'],
'220': ['mercedes-benz', '220'],
'230': ['mercedes-benz', '230'],
'240': ['mercedes-benz', '240'],
'250': ['mercedes-benz', '250'],
'260': ['mercedes-benz', '260'],
'280': ['mercedes-benz', '280'],
'300': ['mercedes-benz', '300'],
'320': ['mercedes-benz', '320'],
'350': ['mercedes-benz', '350'],
'380': ['mercedes-benz', '380'],
'400': ['mercedes-benz', '400'],
'420': ['mercedes-benz', '420'],
'450': ['mercedes-benz', '450'],
'500': ['mercedes-benz', '500'],
'500e': ['mercedes-benz', '500e'],
'500sel': ['mercedes-benz', '500sel'],
'500sec': ['mercedes-benz', '500sec'],
'500sl': ['mercedes-benz', '500sl'],
'560sel': ['mercedes-benz', '560sel'],
'560sec': ['mercedes-benz', '560sec'],
'560sl': ['mercedes-benz', '560sl'],
'600': ['mercedes-benz', '600'],
'600 pullman': ['mercedes-benz', '600 pullman'],
'sprinter': ['mercedes-benz', 'sprinter'],
'metris': ['mercedes-benz', 'metris'],
'vito': ['mercedes-benz', 'vito'],
'viano': ['mercedes-benz', 'viano'],
'v-class': ['mercedes-benz', 'v-class'],
'vaneo': ['mercedes-benz', 'vaneo'],
'citan': ['mercedes-benz', 'citan'],
't-class': ['mercedes-benz', 't-class'],
'x-class': ['mercedes-benz', 'x-class'],
'marco polo': ['mercedes-benz', 'marco polo'],
'unimog': ['mercedes-benz', 'unimog'],
'zetros': ['mercedes-benz', 'zetros'],
'econic': ['mercedes-benz', 'econic'],
'atego': ['mercedes-benz', 'atego'],
'actros': ['mercedes-benz', 'actros'],
'antos': ['mercedes-benz', 'antos'],
'arocs': ['mercedes-benz', 'arocs'],
'eqc': ['mercedes-benz', 'eqc'],
'eqa': ['mercedes-benz', 'eqa'],
'eqb': ['mercedes-benz', 'eqb'],
'eqe': ['mercedes-benz', 'eqe'],
'eqs': ['mercedes-benz', 'eqs'],
'eqe suv': ['mercedes-benz', 'eqe suv'],
'eqs suv': ['mercedes-benz', 'eqs suv'],
'eqv': ['mercedes-benz', 'eqv'],
'eqt': ['mercedes-benz', 'eqt'],
'eq fortwo': ['mercedes-benz', 'eq fortwo'],
'eqg': ['mercedes-benz', 'eqg'],
            '1 series': ['bmw', '1 series'],
'116i': ['bmw', '116i'],
'118i': ['bmw', '118i'],
'120i': ['bmw', '120i'],
'125i': ['bmw', '125i'],
'128i': ['bmw', '128i'],
'130i': ['bmw', '130i'],
'135i': ['bmw', '135i'],
'116d': ['bmw', '116d'],
'118d': ['bmw', '118d'],
'120d': ['bmw', '120d'],
'123d': ['bmw', '123d'],
'125d': ['bmw', '125d'],
'm135i': ['bmw', 'm135i'],
'm140i': ['bmw', 'm140i'],
'1m': ['bmw', '1m'],
'2 series': ['bmw', '2 series'],
'218i': ['bmw', '218i'],
'220i': ['bmw', '220i'],
'228i': ['bmw', '228i'],
'230i': ['bmw', '230i'],
'240i': ['bmw', '240i'],
'218d': ['bmw', '218d'],
'220d': ['bmw', '220d'],
'225d': ['bmw', '225d'],
'm235i': ['bmw', 'm235i'],
'm240i': ['bmw', 'm240i'],
'm2': ['bmw', 'm2'],
'm2 competition': ['bmw', 'm2 competition'],
'm2 cs': ['bmw', 'm2 cs'],
'2 series active tourer': ['bmw', '2 series active tourer'],
'2 series gran tourer': ['bmw', '2 series gran tourer'],
'2 series gran coupe': ['bmw', '2 series gran coupe'],
'3 series': ['bmw', '3 series'],
'316i': ['bmw', '316i'],
'318i': ['bmw', '318i'],
'320i': ['bmw', '320i'],
'323i': ['bmw', '323i'],
'325i': ['bmw', '325i'],
'328i': ['bmw', '328i'],
'330i': ['bmw', '330i'],
'335i': ['bmw', '335i'],
'340i': ['bmw', '340i'],
'316d': ['bmw', '316d'],
'318d': ['bmw', '318d'],
'320d': ['bmw', '320d'],
'325d': ['bmw', '325d'],
'330d': ['bmw', '330d'],
'335d': ['bmw', '335d'],
'330e': ['bmw', '330e'],
'm340i': ['bmw', 'm340i'],
'm340d': ['bmw', 'm340d'],
'm3': ['bmw', 'm3'],
'm3 competition': ['bmw', 'm3 competition'],
'm3 cs': ['bmw', 'm3 cs'],
'm3 gts': ['bmw', 'm3 gts'],
'3 series gt': ['bmw', '3 series gt'],
'3 series touring': ['bmw', '3 series touring'],
'4 series': ['bmw', '4 series'],
'420i': ['bmw', '420i'],
'428i': ['bmw', '428i'],
'430i': ['bmw', '430i'],
'435i': ['bmw', '435i'],
'440i': ['bmw', '440i'],
'420d': ['bmw', '420d'],
'425d': ['bmw', '425d'],
'430d': ['bmw', '430d'],
'435d': ['bmw', '435d'],
'm440i': ['bmw', 'm440i'],
'm4': ['bmw', 'm4'],
'm4 competition': ['bmw', 'm4 competition'],
'm4 cs': ['bmw', 'm4 cs'],
'm4 gts': ['bmw', 'm4 gts'],
'4 series gran coupe': ['bmw', '4 series gran coupe'],
'4 series convertible': ['bmw', '4 series convertible'],
'5 series': ['bmw', '5 series'],
'518i': ['bmw', '518i'],
'520i': ['bmw', '520i'],
'523i': ['bmw', '523i'],
'525i': ['bmw', '525i'],
'528i': ['bmw', '528i'],
'530i': ['bmw', '530i'],
'535i': ['bmw', '535i'],
'540i': ['bmw', '540i'],
'545i': ['bmw', '545i'],
'550i': ['bmw', '550i'],
'518d': ['bmw', '518d'],
'520d': ['bmw', '520d'],
'525d': ['bmw', '525d'],
'530d': ['bmw', '530d'],
'535d': ['bmw', '535d'],
'540d': ['bmw', '540d'],
'530e': ['bmw', '530e'],
'545e': ['bmw', '545e'],
'm550i': ['bmw', 'm550i'],
'm550d': ['bmw', 'm550d'],
'm5': ['bmw', 'm5'],
'm5 competition': ['bmw', 'm5 competition'],
'm5 cs': ['bmw', 'm5 cs'],
'5 series gt': ['bmw', '5 series gt'],
'5 series touring': ['bmw', '5 series touring'],
'6 series': ['bmw', '6 series'],
'630i': ['bmw', '630i'],
'640i': ['bmw', '640i'],
'650i': ['bmw', '650i'],
'630d': ['bmw', '630d'],
'640d': ['bmw', '640d'],
'm6': ['bmw', 'm6'],
'm6 competition': ['bmw', 'm6 competition'],
'6 series gran turismo': ['bmw', '6 series gran turismo'],
'6 series gran coupe': ['bmw', '6 series gran coupe'],
'6 series convertible': ['bmw', '6 series convertible'],
'7 series': ['bmw', '7 series'],
'730i': ['bmw', '730i'],
'735i': ['bmw', '735i'],
'740i': ['bmw', '740i'],
'745i': ['bmw', '745i'],
'750i': ['bmw', '750i'],
'760i': ['bmw', '760i'],
'730d': ['bmw', '730d'],
'740d': ['bmw', '740d'],
'745d': ['bmw', '745d'],
'750d': ['bmw', '750d'],
'730e': ['bmw', '730e'],
'740e': ['bmw', '740e'],
'745e': ['bmw', '745e'],
'750e': ['bmw', '750e'],
'730li': ['bmw', '730li'],
'735li': ['bmw', '735li'],
'740li': ['bmw', '740li'],
'745li': ['bmw', '745li'],
'750li': ['bmw', '750li'],
'760li': ['bmw', '760li'],
'730ld': ['bmw', '730ld'],
'740ld': ['bmw', '740ld'],
'745ld': ['bmw', '745ld'],
'750ld': ['bmw', '750ld'],
'745le': ['bmw', '745le'],
'm750i': ['bmw', 'm750i'],
'm760i': ['bmw', 'm760i'],
'm760li': ['bmw', 'm760li'],
'alpina b7': ['bmw', 'alpina b7'],
'8 series': ['bmw', '8 series'],
'840i': ['bmw', '840i'],
'850i': ['bmw', '850i'],
'840d': ['bmw', '840d'],
'm850i': ['bmw', 'm850i'],
'm8': ['bmw', 'm8'],
'm8 competition': ['bmw', 'm8 competition'],
'8 series gran coupe': ['bmw', '8 series gran coupe'],
'8 series convertible': ['bmw', '8 series convertible'],
'x1': ['bmw', 'x1'],
'sdrive16i': ['bmw', 'sdrive16i'],
'sdrive18i': ['bmw', 'sdrive18i'],
'sdrive20i': ['bmw', 'sdrive20i'],
'xdrive20i': ['bmw', 'xdrive20i'],
'xdrive25i': ['bmw', 'xdrive25i'],
'xdrive28i': ['bmw', 'xdrive28i'],
'sdrive16d': ['bmw', 'sdrive16d'],
'sdrive18d': ['bmw', 'sdrive18d'],
'sdrive20d': ['bmw', 'sdrive20d'],
'xdrive20d': ['bmw', 'xdrive20d'],
'xdrive23d': ['bmw', 'xdrive23d'],
'xdrive25d': ['bmw', 'xdrive25d'],
'xdrive25e': ['bmw', 'xdrive25e'],
'x2': ['bmw', 'x2'],
'm35i': ['bmw', 'm35i'],
'x3': ['bmw', 'x3'],
'xdrive30i': ['bmw', 'xdrive30i'],
'xdrive30d': ['bmw', 'xdrive30d'],
'xdrive30e': ['bmw', 'xdrive30e'],
'm40i': ['bmw', 'm40i'],
'm40d': ['bmw', 'm40d'],
'x3 m': ['bmw', 'x3 m'],
'x3 m competition': ['bmw', 'x3 m competition'],
'x4': ['bmw', 'x4'],
'xdrive30i': ['bmw', 'xdrive30i'],
'xdrive30d': ['bmw', 'xdrive30d'],
'm40i': ['bmw', 'm40i'],
'm40d': ['bmw', 'm40d'],
'x4 m': ['bmw', 'x4 m'],
'x4 m competition': ['bmw', 'x4 m competition'],
'x5': ['bmw', 'x5'],
'xdrive35i': ['bmw', 'xdrive35i'],
'xdrive40i': ['bmw', 'xdrive40i'],
'xdrive45e': ['bmw', 'xdrive45e'],
'xdrive50i': ['bmw', 'xdrive50i'],
'xdrive30d': ['bmw', 'xdrive30d'],
'xdrive35d': ['bmw', 'xdrive35d'],
'xdrive40d': ['bmw', 'xdrive40d'],
'xdrive50d': ['bmw', 'xdrive50d'],
'm50i': ['bmw', 'm50i'],
'm50d': ['bmw', 'm50d'],
'x5 m': ['bmw', 'x5 m'],
'x5 m competition': ['bmw', 'x5 m competition'],
'x6': ['bmw', 'x6'],
'xdrive35i': ['bmw', 'xdrive35i'],
'xdrive40i': ['bmw', 'xdrive40i'],
'xdrive50i': ['bmw', 'xdrive50i'],
'xdrive30d': ['bmw', 'xdrive30d'],
'xdrive35d': ['bmw', 'xdrive35d'],
'xdrive40d': ['bmw', 'xdrive40d'],
'xdrive50d': ['bmw', 'xdrive50d'],
'm50i': ['bmw', 'm50i'],
'm50d': ['bmw', 'm50d'],
'x6 m': ['bmw', 'x6 m'],
'x6 m competition': ['bmw', 'x6 m competition'],
'x7': ['bmw', 'x7'],
'xdrive40i': ['bmw', 'xdrive40i'],
'xdrive50i': ['bmw', 'xdrive50i'],
'xdrive30d': ['bmw', 'xdrive30d'],
'xdrive40d': ['bmw', 'xdrive40d'],
'm50i': ['bmw', 'm50i'],
'm50d': ['bmw', 'm50d'],
'm60i': ['bmw', 'm60i'],
'alpina xb7': ['bmw', 'alpina xb7'],
'xm': ['bmw', 'xm'],
'xm label': ['bmw', 'xm label'],
'z1': ['bmw', 'z1'],
'z3': ['bmw', 'z3'],
'z3 m': ['bmw', 'z3 m'],
'z3 m coupe': ['bmw', 'z3 m coupe'],
'z3 m roadster': ['bmw', 'z3 m roadster'],
'z4': ['bmw', 'z4'],
'z4 sdrive20i': ['bmw', 'z4 sdrive20i'],
'z4 sdrive30i': ['bmw', 'z4 sdrive30i'],
'z4 sdrive35i': ['bmw', 'z4 sdrive35i'],
'z4 sdrive35is': ['bmw', 'z4 sdrive35is'],
'z4 m40i': ['bmw', 'z4 m40i'],
'z4 m': ['bmw', 'z4 m'],
'z4 m coupe': ['bmw', 'z4 m coupe'],
'z4 m roadster': ['bmw', 'z4 m roadster'],
'z8': ['bmw', 'z8'],
'i3': ['bmw', 'i3'],
'i3s': ['bmw', 'i3s'],
'i4': ['bmw', 'i4'],
'i4 edrive35': ['bmw', 'i4 edrive35'],
'i4 edrive40': ['bmw', 'i4 edrive40'],
'i4 m50': ['bmw', 'i4 m50'],
'i5': ['bmw', 'i5'],
'i5 edrive40': ['bmw', 'i5 edrive40'],
'i5 m60': ['bmw', 'i5 m60'],
'i7': ['bmw', 'i7'],
'i7 xdrive60': ['bmw', 'i7 xdrive60'],
'i7 m70': ['bmw', 'i7 m70'],
'i8': ['bmw', 'i8'],
'i8 coupe': ['bmw', 'i8 coupe'],
'i8 roadster': ['bmw', 'i8 roadster'],
'ix': ['bmw', 'ix'],
'ix xdrive40': ['bmw', 'ix xdrive40'],
'ix xdrive50': ['bmw', 'ix xdrive50'],
'ix m60': ['bmw', 'ix m60'],
'ix1': ['bmw', 'ix1'],
'ix2': ['bmw', 'ix2'],
'ix3': ['bmw', 'ix3'],
'e21': ['bmw', 'e21'],
'e23': ['bmw', 'e23'],
'e24': ['bmw', 'e24'],
'e26': ['bmw', 'e26'],
'e28': ['bmw', 'e28'],
'e30': ['bmw', 'e30'],
'e31': ['bmw', 'e31'],
'e32': ['bmw', 'e32'],
'e34': ['bmw', 'e34'],
'e36': ['bmw', 'e36'],
'e38': ['bmw', 'e38'],
'e39': ['bmw', 'e39'],
'e46': ['bmw', 'e46'],
'e52': ['bmw', 'e52'],
'e53': ['bmw', 'e53'],
'e60': ['bmw', 'e60'],
'e61': ['bmw', 'e61'],
'e63': ['bmw', 'e63'],
'e64': ['bmw', 'e64'],
'e65': ['bmw', 'e65'],
'e66': ['bmw', 'e66'],
'e70': ['bmw', 'e70'],
'e71': ['bmw', 'e71'],
'e82': ['bmw', 'e82'],
'e83': ['bmw', 'e83'],
'e84': ['bmw', 'e84'],
'e85': ['bmw', 'e85'],
'e86': ['bmw', 'e86'],
'e87': ['bmw', 'e87'],
'e88': ['bmw', 'e88'],
'e89': ['bmw', 'e89'],
'e90': ['bmw', 'e90'],
'e91': ['bmw', 'e91'],
'e92': ['bmw', 'e92'],
'e93': ['bmw', 'e93'],
'f01': ['bmw', 'f01'],
'f02': ['bmw', 'f02'],
'f06': ['bmw', 'f06'],
'f07': ['bmw', 'f07'],
'f10': ['bmw', 'f10'],
'f11': ['bmw', 'f11'],
'f12': ['bmw', 'f12'],
'f13': ['bmw', 'f13'],
'f15': ['bmw', 'f15'],
'f16': ['bmw', 'f16'],
'f20': ['bmw', 'f20'],
'f21': ['bmw', 'f21'],
'f22': ['bmw', 'f22'],
'f23': ['bmw', 'f23'],
'f25': ['bmw', 'f25'],
'f26': ['bmw', 'f26'],
'f30': ['bmw', 'f30'],
'f31': ['bmw', 'f31'],
'f32': ['bmw', 'f32'],
'f33': ['bmw', 'f33'],
'f34': ['bmw', 'f34'],
'f35': ['bmw', 'f35'],
'f36': ['bmw', 'f36'],
'f39': ['bmw', 'f39'],
'f40': ['bmw', 'f40'],
'f44': ['bmw', 'f44'],
'f45': ['bmw', 'f45'],
'f46': ['bmw', 'f46'],
'f48': ['bmw', 'f48'],
'f49': ['bmw', 'f49'],
'f52': ['bmw', 'f52'],
'f54': ['bmw', 'f54'],
'f55': ['bmw', 'f55'],
'f56': ['bmw', 'f56'],
'f57': ['bmw', 'f57'],
'f60': ['bmw', 'f60'],
'f80': ['bmw', 'f80'],
'f82': ['bmw', 'f82'],
'f83': ['bmw', 'f83'],
'f85': ['bmw', 'f85'],
'f86': ['bmw', 'f86'],
'f87': ['bmw', 'f87'],
'f90': ['bmw', 'f90'],
'f91': ['bmw', 'f91'],
'f92': ['bmw', 'f92'],
'f93': ['bmw', 'f93'],
'f95': ['bmw', 'f95'],
'f96': ['bmw', 'f96'],
'f97': ['bmw', 'f97'],
'f98': ['bmw', 'f98'],
'g01': ['bmw', 'g01'],
'g02': ['bmw', 'g02'],
'g05': ['bmw', 'g05'],
'g06': ['bmw', 'g06'],
'g07': ['bmw', 'g07'],
'g08': ['bmw', 'g08'],
'g09': ['bmw', 'g09'],
'g11': ['bmw', 'g11'],
'g12': ['bmw', 'g12'],
'g14': ['bmw', 'g14'],
'g15': ['bmw', 'g15'],
'g16': ['bmw', 'g16'],
'g20': ['bmw', 'g20'],
'g21': ['bmw', 'g21'],
'g22': ['bmw', 'g22'],
'g23': ['bmw', 'g23'],
'g26': ['bmw', 'g26'],
'g29': ['bmw', 'g29'],
'g30': ['bmw', 'g30'],
'g31': ['bmw', 'g31'],
'g32': ['bmw', 'g32'],
'g38': ['bmw', 'g38'],
'g42': ['bmw', 'g42'],
'g60': ['bmw', 'g60'],
'g61': ['bmw', 'g61'],
'g62': ['bmw', 'g62'],
'g70': ['bmw', 'g70'],
'g80': ['bmw', 'g80'],
'g81': ['bmw', 'g81'],
'g82': ['bmw', 'g82'],
'g83': ['bmw', 'g83'],
'g84': ['bmw', 'g84'],
'g87': ['bmw', 'g87'],
'g90': ['bmw', 'g90'],
'neue klasse': ['bmw', 'neue klasse'],
'isetta': ['bmw', 'isetta'],
'600': ['bmw', '600'],
'700': ['bmw', '700'],
'501': ['bmw', '501'],
'502': ['bmw', '502'],
'503': ['bmw', '503'],
'507': ['bmw', '507'],
'3200 cs': ['bmw', '3200 cs'],
'2000': ['bmw', '2000'],
'2002': ['bmw', '2002'],
'2002 turbo': ['bmw', '2002 turbo'],
'2002 tii': ['bmw', '2002 tii'],
'1500': ['bmw', '1500'],
'1600': ['bmw', '1600'],
'1800': ['bmw', '1800'],
'2500': ['bmw', '2500'],
'2800': ['bmw', '2800'],
'3.0cs': ['bmw', '3.0cs'],
'3.0csl': ['bmw', '3.0csl'],
'3.0csi': ['bmw', '3.0csi'],
            'golf': ['volkswagen', 'golf'],
'golf gti': ['volkswagen', 'golf gti'],
'golf r': ['volkswagen', 'golf r'],
'golf gte': ['volkswagen', 'golf gte'],
'golf alltrack': ['volkswagen', 'golf alltrack'],
'golf sportwagen': ['volkswagen', 'golf sportwagen'],
'golf variant': ['volkswagen', 'golf variant'],
'golf plus': ['volkswagen', 'golf plus'],
'golf sportsvan': ['volkswagen', 'golf sportsvan'],
'e-golf': ['volkswagen', 'e-golf'],
'jetta': ['volkswagen', 'jetta'],
'jetta gli': ['volkswagen', 'jetta gli'],
'jetta sportwagen': ['volkswagen', 'jetta sportwagen'],
'passat': ['volkswagen', 'passat'],
'passat alltrack': ['volkswagen', 'passat alltrack'],
'passat cc': ['volkswagen', 'passat cc'],
'passat variant': ['volkswagen', 'passat variant'],
'arteon': ['volkswagen', 'arteon'],
'arteon shooting brake': ['volkswagen', 'arteon shooting brake'],
'cc': ['volkswagen', 'cc'],
'phaeton': ['volkswagen', 'phaeton'],
'polo': ['volkswagen', 'polo'],
'polo gti': ['volkswagen', 'polo gti'],
'polo r': ['volkswagen', 'polo r'],
'polo sedan': ['volkswagen', 'polo sedan'],
'vento': ['volkswagen', 'vento'],
'virtus': ['volkswagen', 'virtus'],
'ameo': ['volkswagen', 'ameo'],
'up!': ['volkswagen', 'up!'],
'up! gti': ['volkswagen', 'up! gti'],
'e-up!': ['volkswagen', 'e-up!'],
'lupo': ['volkswagen', 'lupo'],
'lupo gti': ['volkswagen', 'lupo gti'],
'lupo 3l': ['volkswagen', 'lupo 3l'],
'fox': ['volkswagen', 'fox'],
'gol': ['volkswagen', 'gol'],
'voyage': ['volkswagen', 'voyage'],
'saveiro': ['volkswagen', 'saveiro'],
'spacefox': ['volkswagen', 'spacefox'],
'suran': ['volkswagen', 'suran'],
'nivus': ['volkswagen', 'nivus'],
'taos': ['volkswagen', 'taos'],
'tiguan': ['volkswagen', 'tiguan'],
'tiguan allspace': ['volkswagen', 'tiguan allspace'],
'tiguan r': ['volkswagen', 'tiguan r'],
'touareg': ['volkswagen', 'touareg'],
'touareg r': ['volkswagen', 'touareg r'],
'atlas': ['volkswagen', 'atlas'],
'atlas cross sport': ['volkswagen', 'atlas cross sport'],
'teramont': ['volkswagen', 'teramont'],
'teramont x': ['volkswagen', 'teramont x'],
'tayron': ['volkswagen', 'tayron'],
'tharu': ['volkswagen', 'tharu'],
't-cross': ['volkswagen', 't-cross'],
't-roc': ['volkswagen', 't-roc'],
't-roc r': ['volkswagen', 't-roc r'],
't-roc cabriolet': ['volkswagen', 't-roc cabriolet'],
'taigo': ['volkswagen', 'taigo'],
'id.3': ['volkswagen', 'id.3'],
'id.4': ['volkswagen', 'id.4'],
'id.4 gtx': ['volkswagen', 'id.4 gtx'],
'id.5': ['volkswagen', 'id.5'],
'id.5 gtx': ['volkswagen', 'id.5 gtx'],
'id.6': ['volkswagen', 'id.6'],
'id.7': ['volkswagen', 'id.7'],
'id.buzz': ['volkswagen', 'id.buzz'],
'id.life': ['volkswagen', 'id.life'],
'id.vizzion': ['volkswagen', 'id.vizzion'],
'id.crozz': ['volkswagen', 'id.crozz'],
'id.roomzz': ['volkswagen', 'id.roomzz'],
'id.buggy': ['volkswagen', 'id.buggy'],
'id.2all': ['volkswagen', 'id.2all'],
'beetle': ['volkswagen', 'beetle'],
'new beetle': ['volkswagen', 'new beetle'],
'beetle dune': ['volkswagen', 'beetle dune'],
'beetle turbo': ['volkswagen', 'beetle turbo'],
'beetle rsi': ['volkswagen', 'beetle rsi'],
'super beetle': ['volkswagen', 'super beetle'],
'scirocco': ['volkswagen', 'scirocco'],
'scirocco r': ['volkswagen', 'scirocco r'],
'corrado': ['volkswagen', 'corrado'],
'corrado vr6': ['volkswagen', 'corrado vr6'],
'eos': ['volkswagen', 'eos'],
'karmann ghia': ['volkswagen', 'karmann ghia'],
'type 3': ['volkswagen', 'type 3'],
'type 4': ['volkswagen', 'type 4'],
'squareback': ['volkswagen', 'squareback'],
'fastback': ['volkswagen', 'fastback'],
'notchback': ['volkswagen', 'notchback'],
'variant': ['volkswagen', 'variant'],
'brasilia': ['volkswagen', 'brasilia'],
'sp2': ['volkswagen', 'sp2'],
'touran': ['volkswagen', 'touran'],
'sharan': ['volkswagen', 'sharan'],
'routan': ['volkswagen', 'routan'],
'caddy': ['volkswagen', 'caddy'],
'caddy maxi': ['volkswagen', 'caddy maxi'],
'caddy life': ['volkswagen', 'caddy life'],
'caddy cargo': ['volkswagen', 'caddy cargo'],
'transporter': ['volkswagen', 'transporter'],
't1': ['volkswagen', 't1'],
't2': ['volkswagen', 't2'],
't3': ['volkswagen', 't3'],
't4': ['volkswagen', 't4'],
't5': ['volkswagen', 't5'],
't6': ['volkswagen', 't6'],
't6.1': ['volkswagen', 't6.1'],
't7': ['volkswagen', 't7'],
'multivan': ['volkswagen', 'multivan'],
'caravelle': ['volkswagen', 'caravelle'],
'california': ['volkswagen', 'california'],
'eurovan': ['volkswagen', 'eurovan'],
'vanagon': ['volkswagen', 'vanagon'],
'westfalia': ['volkswagen', 'westfalia'],
'microbus': ['volkswagen', 'microbus'],
'samba': ['volkswagen', 'samba'],
'kombi': ['volkswagen', 'kombi'],
'crafter': ['volkswagen', 'crafter'],
'lt': ['volkswagen', 'lt'],
'amarok': ['volkswagen', 'amarok'],
'taro': ['volkswagen', 'taro'],
'rabbit': ['volkswagen', 'rabbit'],
'rabbit pickup': ['volkswagen', 'rabbit pickup'],
'quantum': ['volkswagen', 'quantum'],
'dasher': ['volkswagen', 'dasher'],
'k70': ['volkswagen', 'k70'],
'411': ['volkswagen', '411'],
'412': ['volkswagen', '412'],
'santana': ['volkswagen', 'santana'],
'quantum': ['volkswagen', 'quantum'],
'citi golf': ['volkswagen', 'citi golf'],
'pointer': ['volkswagen', 'pointer'],
'parati': ['volkswagen', 'parati'],
'apollo': ['volkswagen', 'apollo'],
'logus': ['volkswagen', 'logus'],
'derby': ['volkswagen', 'derby'],
'bora': ['volkswagen', 'bora'],
'lavida': ['volkswagen', 'lavida'],
'lamando': ['volkswagen', 'lamando'],
'magotan': ['volkswagen', 'magotan'],
'phideon': ['volkswagen', 'phideon'],
'talagon': ['volkswagen', 'talagon'],
'viloran': ['volkswagen', 'viloran'],
'thing': ['volkswagen', 'thing'],
'safari': ['volkswagen', 'safari'],
'kubelwagen': ['volkswagen', 'kubelwagen'],
'schwimmwagen': ['volkswagen', 'schwimmwagen'],
'country buggy': ['volkswagen', 'country buggy'],
'hebmuller': ['volkswagen', 'hebmuller'],
'rometsch': ['volkswagen', 'rometsch'],
'fridolin': ['volkswagen', 'fridolin'],
'typ 147': ['volkswagen', 'typ 147'],
'ea489': ['volkswagen', 'ea489'],
'chico': ['volkswagen', 'chico'],
'nils': ['volkswagen', 'nils'],
'xl1': ['volkswagen', 'xl1'],
'xl sport': ['volkswagen', 'xl sport'],
'w12': ['volkswagen', 'w12'],
'gti roadster': ['volkswagen', 'gti roadster'],
'gti supersport': ['volkswagen', 'gti supersport'],
'iroc': ['volkswagen', 'iroc'],
'new beetle rsi': ['volkswagen', 'new beetle rsi'],
'atlas tanoak': ['volkswagen', 'atlas tanoak'],
'atlas basecamp': ['volkswagen', 'atlas basecamp'],
            'elantra': ['hyundai', 'elantra'],
'elantra n': ['hyundai', 'elantra n'],
'elantra gt': ['hyundai', 'elantra gt'],
'elantra touring': ['hyundai', 'elantra touring'],
'elantra coupe': ['hyundai', 'elantra coupe'],
'sonata': ['hyundai', 'sonata'],
'sonata n line': ['hyundai', 'sonata n line'],
'sonata hybrid': ['hyundai', 'sonata hybrid'],
'azera': ['hyundai', 'azera'],
'grandeur': ['hyundai', 'grandeur'],
'genesis': ['hyundai', 'genesis'],
'equus': ['hyundai', 'equus'],
'accent': ['hyundai', 'accent'],
'venue': ['hyundai', 'venue'],
'kona': ['hyundai', 'kona'],
'kona n': ['hyundai', 'kona n'],
'kona electric': ['hyundai', 'kona electric'],
'tucson': ['hyundai', 'tucson'],
'tucson n': ['hyundai', 'tucson n'],
'tucson hybrid': ['hyundai', 'tucson hybrid'],
'tucson plug-in hybrid': ['hyundai', 'tucson plug-in hybrid'],
'santa fe': ['hyundai', 'santa fe'],
'santa fe sport': ['hyundai', 'santa fe sport'],
'santa fe xl': ['hyundai', 'santa fe xl'],
'santa fe hybrid': ['hyundai', 'santa fe hybrid'],
'santa fe plug-in hybrid': ['hyundai', 'santa fe plug-in hybrid'],
'palisade': ['hyundai', 'palisade'],
'veracruz': ['hyundai', 'veracruz'],
'santa cruz': ['hyundai', 'santa cruz'],
'ioniq': ['hyundai', 'ioniq'],
'ioniq hybrid': ['hyundai', 'ioniq hybrid'],
'ioniq electric': ['hyundai', 'ioniq electric'],
'ioniq plug-in hybrid': ['hyundai', 'ioniq plug-in hybrid'],
'ioniq 5': ['hyundai', 'ioniq 5'],
'ioniq 5 n': ['hyundai', 'ioniq 5 n'],
'ioniq 6': ['hyundai', 'ioniq 6'],
'ioniq 7': ['hyundai', 'ioniq 7'],
'nexo': ['hyundai', 'nexo'],
'veloster': ['hyundai', 'veloster'],
'veloster n': ['hyundai', 'veloster n'],
'veloster turbo': ['hyundai', 'veloster turbo'],
'tiburon': ['hyundai', 'tiburon'],
'tuscani': ['hyundai', 'tuscani'],
'coupe': ['hyundai', 'coupe'],
'scoupe': ['hyundai', 'scoupe'],
'genesis coupe': ['hyundai', 'genesis coupe'],
'i10': ['hyundai', 'i10'],
'grand i10': ['hyundai', 'grand i10'],
'i20': ['hyundai', 'i20'],
'i20 n': ['hyundai', 'i20 n'],
'i20 active': ['hyundai', 'i20 active'],
'i30': ['hyundai', 'i30'],
'i30 n': ['hyundai', 'i30 n'],
'i30 fastback': ['hyundai', 'i30 fastback'],
'i30 wagon': ['hyundai', 'i30 wagon'],
'i40': ['hyundai', 'i40'],
'ix20': ['hyundai', 'ix20'],
'ix35': ['hyundai', 'ix35'],
'ix55': ['hyundai', 'ix55'],
'creta': ['hyundai', 'creta'],
'alcazar': ['hyundai', 'alcazar'],
'bayon': ['hyundai', 'bayon'],
'casper': ['hyundai', 'casper'],
'hb20': ['hyundai', 'hb20'],
'hb20s': ['hyundai', 'hb20s'],
'hb20x': ['hyundai', 'hb20x'],
'xcent': ['hyundai', 'xcent'],
'aura': ['hyundai', 'aura'],
'verna': ['hyundai', 'verna'],
'solaris': ['hyundai', 'solaris'],
'reina': ['hyundai', 'reina'],
'celesta': ['hyundai', 'celesta'],
'mistra': ['hyundai', 'mistra'],
'lafesta': ['hyundai', 'lafesta'],
'aslan': ['hyundai', 'aslan'],
'stargazer': ['hyundai', 'stargazer'],
'custin': ['hyundai', 'custin'],
'entourage': ['hyundai', 'entourage'],
'trajet': ['hyundai', 'trajet'],
'matrix': ['hyundai', 'matrix'],
'lavita': ['hyundai', 'lavita'],
'santamo': ['hyundai', 'santamo'],
'h-1': ['hyundai', 'h-1'],
'h-100': ['hyundai', 'h-100'],
'h-200': ['hyundai', 'h-200'],
'h-350': ['hyundai', 'h-350'],
'starex': ['hyundai', 'starex'],
'grand starex': ['hyundai', 'grand starex'],
'staria': ['hyundai', 'staria'],
'porter': ['hyundai', 'porter'],
'porter ii': ['hyundai', 'porter ii'],
'hr': ['hyundai', 'hr'],
'hd65': ['hyundai', 'hd65'],
'hd72': ['hyundai', 'hd72'],
'hd78': ['hyundai', 'hd78'],
'mighty': ['hyundai', 'mighty'],
'county': ['hyundai', 'county'],
'aero': ['hyundai', 'aero'],
'universe': ['hyundai', 'universe'],
'excel': ['hyundai', 'excel'],
'pony': ['hyundai', 'pony'],
'pony excel': ['hyundai', 'pony excel'],
'stellar': ['hyundai', 'stellar'],
'presto': ['hyundai', 'presto'],
'sonata nf': ['hyundai', 'sonata nf'],
'sonata yf': ['hyundai', 'sonata yf'],
'sonata lf': ['hyundai', 'sonata lf'],
'sonata dn8': ['hyundai', 'sonata dn8'],
'dynasty': ['hyundai', 'dynasty'],
'marcia': ['hyundai', 'marcia'],
'xg': ['hyundai', 'xg'],
'xg300': ['hyundai', 'xg300'],
'xg350': ['hyundai', 'xg350'],
'trajet xg': ['hyundai', 'trajet xg'],
'galloper': ['hyundai', 'galloper'],
'terracan': ['hyundai', 'terracan'],
'atos': ['hyundai', 'atos'],
'atos prime': ['hyundai', 'atos prime'],
'santro': ['hyundai', 'santro'],
'santro xing': ['hyundai', 'santro xing'],
'getz': ['hyundai', 'getz'],
'click': ['hyundai', 'click'],
'tb': ['hyundai', 'tb'],
'lantra': ['hyundai', 'lantra'],
'avante': ['hyundai', 'avante'],
'maxcruz': ['hyundai', 'maxcruz'],
'encino': ['hyundai', 'encino'],
'kauai': ['hyundai', 'kauai'],
'leite': ['hyundai', 'leite'],
'mufasa': ['hyundai', 'mufasa'],
'nexo fcev': ['hyundai', 'nexo fcev'],
'pavise': ['hyundai', 'pavise'],
'porest': ['hyundai', 'porest'],
            'altima': ['nissan', 'altima'],
'maxima': ['nissan', 'maxima'],
'sentra': ['nissan', 'sentra'],
'versa': ['nissan', 'versa'],
'versa note': ['nissan', 'versa note'],
'kicks': ['nissan', 'kicks'],
'rogue': ['nissan', 'rogue'],
'rogue sport': ['nissan', 'rogue sport'],
'murano': ['nissan', 'murano'],
'pathfinder': ['nissan', 'pathfinder'],
'armada': ['nissan', 'armada'],
'frontier': ['nissan', 'frontier'],
'titan': ['nissan', 'titan'],
'titan xd': ['nissan', 'titan xd'],
'leaf': ['nissan', 'leaf'],
'ariya': ['nissan', 'ariya'],
'z': ['nissan', 'z'],
'370z': ['nissan', '370z'],
'350z': ['nissan', '350z'],
'300zx': ['nissan', '300zx'],
'280zx': ['nissan', '280zx'],
'280z': ['nissan', '280z'],
'260z': ['nissan', '260z'],
'240z': ['nissan', '240z'],
'fairlady z': ['nissan', 'fairlady z'],
'gt-r': ['nissan', 'gt-r'],
'skyline': ['nissan', 'skyline'],
'skyline gt-r': ['nissan', 'skyline gt-r'],
'infiniti q50': ['nissan', 'infiniti q50'],
'infiniti q60': ['nissan', 'infiniti q60'],
'infiniti qx50': ['nissan', 'infiniti qx50'],
'infiniti qx60': ['nissan', 'infiniti qx60'],
'infiniti qx80': ['nissan', 'infiniti qx80'],
'juke': ['nissan', 'juke'],
'juke nismo': ['nissan', 'juke nismo'],
'qashqai': ['nissan', 'qashqai'],
'x-trail': ['nissan', 'x-trail'],
'x-terra': ['nissan', 'x-terra'],
'xterra': ['nissan', 'xterra'],
'quest': ['nissan', 'quest'],
'nv200': ['nissan', 'nv200'],
'nv300': ['nissan', 'nv300'],
'nv400': ['nissan', 'nv400'],
'nv1500': ['nissan', 'nv1500'],
'nv2500': ['nissan', 'nv2500'],
'nv3500': ['nissan', 'nv3500'],
'e-nv200': ['nissan', 'e-nv200'],
'townstar': ['nissan', 'townstar'],
'primastar': ['nissan', 'primastar'],
'interstar': ['nissan', 'interstar'],
'urvan': ['nissan', 'urvan'],
'caravan': ['nissan', 'caravan'],
'homy': ['nissan', 'homy'],
'civilian': ['nissan', 'civilian'],
'cabstar': ['nissan', 'cabstar'],
'atleon': ['nissan', 'atleon'],
'nt400': ['nissan', 'nt400'],
'nt500': ['nissan', 'nt500'],
'navara': ['nissan', 'navara'],
'np300': ['nissan', 'np300'],
'hardbody': ['nissan', 'hardbody'],
'd21': ['nissan', 'd21'],
'd22': ['nissan', 'd22'],
'patrol': ['nissan', 'patrol'],
'patrol nismo': ['nissan', 'patrol nismo'],
'safari': ['nissan', 'safari'],
'terrano': ['nissan', 'terrano'],
'terrano ii': ['nissan', 'terrano ii'],
'mistral': ['nissan', 'mistral'],
'paladin': ['nissan', 'paladin'],
'pick-up': ['nissan', 'pick-up'],
'datsun go': ['nissan', 'datsun go'],
'datsun go+': ['nissan', 'datsun go+'],
'datsun redi-go': ['nissan', 'datsun redi-go'],
'datsun on-do': ['nissan', 'datsun on-do'],
'datsun mi-do': ['nissan', 'datsun mi-do'],
'micra': ['nissan', 'micra'],
'march': ['nissan', 'march'],
'note': ['nissan', 'note'],
'note e-power': ['nissan', 'note e-power'],
'tiida': ['nissan', 'tiida'],
'tiida latio': ['nissan', 'tiida latio'],
'latio': ['nissan', 'latio'],
'almera': ['nissan', 'almera'],
'almera tino': ['nissan', 'almera tino'],
'sunny': ['nissan', 'sunny'],
'pulsar': ['nissan', 'pulsar'],
'pulsar gtir': ['nissan', 'pulsar gtir'],
'sylphy': ['nissan', 'sylphy'],
'bluebird': ['nissan', 'bluebird'],
'bluebird sylphy': ['nissan', 'bluebird sylphy'],
'stanza': ['nissan', 'stanza'],
'primera': ['nissan', 'primera'],
'teana': ['nissan', 'teana'],
'cefiro': ['nissan', 'cefiro'],
'laurel': ['nissan', 'laurel'],
'leopard': ['nissan', 'leopard'],
'gloria': ['nissan', 'gloria'],
'cedric': ['nissan', 'cedric'],
'president': ['nissan', 'president'],
'fuga': ['nissan', 'fuga'],
'cima': ['nissan', 'cima'],
'liberty': ['nissan', 'liberty'],
'prairie': ['nissan', 'prairie'],
'axxess': ['nissan', 'axxess'],
'bassara': ['nissan', 'bassara'],
'presage': ['nissan', 'presage'],
'serena': ['nissan', 'serena'],
'elgrand': ['nissan', 'elgrand'],
'lafesta': ['nissan', 'lafesta'],
'wingroad': ['nissan', 'wingroad'],
'ad': ['nissan', 'ad'],
'expert': ['nissan', 'expert'],
'avenir': ['nissan', 'avenir'],
'stagea': ['nissan', 'stagea'],
'rasheen': ['nissan', 'rasheen'],
'rnessa': ['nissan', 'rnessa'],
'liberty': ['nissan', 'liberty'],
'dualis': ['nissan', 'dualis'],
'cube': ['nissan', 'cube'],
'juke-r': ['nissan', 'juke-r'],
'murano crosscabriolet': ['nissan', 'murano crosscabriolet'],
'kicks e-power': ['nissan', 'kicks e-power'],
'magnite': ['nissan', 'magnite'],
'terra': ['nissan', 'terra'],
'livina': ['nissan', 'livina'],
'grand livina': ['nissan', 'grand livina'],
'evalia': ['nissan', 'evalia'],
'lannia': ['nissan', 'lannia'],
'venucia': ['nissan', 'venucia'],
'pao': ['nissan', 'pao'],
'figaro': ['nissan', 'figaro'],
's-cargo': ['nissan', 's-cargo'],
'be-1': ['nissan', 'be-1'],
'silvia': ['nissan', 'silvia'],
's13': ['nissan', 's13'],
's14': ['nissan', 's14'],
's15': ['nissan', 's15'],
'180sx': ['nissan', '180sx'],
'200sx': ['nissan', '200sx'],
'240sx': ['nissan', '240sx'],
'gazelle': ['nissan', 'gazelle'],
'nx': ['nissan', 'nx'],
'nx1600': ['nissan', 'nx1600'],
'nx2000': ['nissan', 'nx2000'],
'100nx': ['nissan', '100nx'],
'lucino': ['nissan', 'lucino'],
'langley': ['nissan', 'langley'],
'liberta villa': ['nissan', 'liberta villa'],
'violet': ['nissan', 'violet'],
'auster': ['nissan', 'auster'],
'cherry': ['nissan', 'cherry'],
'winner': ['nissan', 'winner'],
'vanette': ['nissan', 'vanette'],
'largo': ['nissan', 'largo'],
'prairie joy': ['nissan', 'prairie joy'],
'multi': ['nissan', 'multi'],
'escort': ['nissan', 'escort'],
'homer': ['nissan', 'homer'],
'atlas': ['nissan', 'atlas'],
'condor': ['nissan', 'condor'],
'diesel': ['nissan', 'diesel'],
'echo': ['nissan', 'echo'],
'clipper': ['nissan', 'clipper'],
'kix': ['nissan', 'kix'],
'pino': ['nissan', 'pino'],
'moco': ['nissan', 'moco'],
'otti': ['nissan', 'otti'],
'roox': ['nissan', 'roox'],
'dayz': ['nissan', 'dayz'],
'dayz roox': ['nissan', 'dayz roox'],
'sakura': ['nissan', 'sakura'],
'r390 gt1': ['nissan', 'r390 gt1'],
'np35': ['nissan', 'np35'],
'r88c': ['nissan', 'r88c'],
'r89c': ['nissan', 'r89c'],
'r90c': ['nissan', 'r90c'],
'r91cp': ['nissan', 'r91cp'],
'r92cp': ['nissan', 'r92cp'],
'deltawing': ['nissan', 'deltawing'],
'zeod rc': ['nissan', 'zeod rc'],
            'forte': ['kia', 'forte'],
'forte5': ['kia', 'forte5'],
'forte koup': ['kia', 'forte koup'],
'k5': ['kia', 'k5'],
'optima': ['kia', 'optima'],
'optima hybrid': ['kia', 'optima hybrid'],
'optima plug-in hybrid': ['kia', 'optima plug-in hybrid'],
'stinger': ['kia', 'stinger'],
'k8': ['kia', 'k8'],
'k9': ['kia', 'k9'],
'k900': ['kia', 'k900'],
'cadenza': ['kia', 'cadenza'],
'rio': ['kia', 'rio'],
'rio5': ['kia', 'rio5'],
'soul': ['kia', 'soul'],
'soul ev': ['kia', 'soul ev'],
'seltos': ['kia', 'seltos'],
'sportage': ['kia', 'sportage'],
'sportage hybrid': ['kia', 'sportage hybrid'],
'sportage plug-in hybrid': ['kia', 'sportage plug-in hybrid'],
'sorento': ['kia', 'sorento'],
'sorento hybrid': ['kia', 'sorento hybrid'],
'sorento plug-in hybrid': ['kia', 'sorento plug-in hybrid'],
'telluride': ['kia', 'telluride'],
'mohave': ['kia', 'mohave'],
'borrego': ['kia', 'borrego'],
'niro': ['kia', 'niro'],
'niro hybrid': ['kia', 'niro hybrid'],
'niro plug-in hybrid': ['kia', 'niro plug-in hybrid'],
'niro ev': ['kia', 'niro ev'],
'ev6': ['kia', 'ev6'],
'ev6 gt': ['kia', 'ev6 gt'],
'ev9': ['kia', 'ev9'],
'carnival': ['kia', 'carnival'],
'sedona': ['kia', 'sedona'],
'ceed': ['kia', 'ceed'],
'proceed': ['kia', 'proceed'],
'xceed': ['kia', 'xceed'],
'ceed sw': ['kia', 'ceed sw'],
'ceed gt': ['kia', 'ceed gt'],
'cerato': ['kia', 'cerato'],
'cerato koup': ['kia', 'cerato koup'],
'spectra': ['kia', 'spectra'],
'spectra5': ['kia', 'spectra5'],
'sephia': ['kia', 'sephia'],
'shuma': ['kia', 'shuma'],
'magentis': ['kia', 'magentis'],
'lotze': ['kia', 'lotze'],
'amanti': ['kia', 'amanti'],
'opirus': ['kia', 'opirus'],
'quoris': ['kia', 'quoris'],
'enterprise': ['kia', 'enterprise'],
'potentia': ['kia', 'potentia'],
'clarus': ['kia', 'clarus'],
'credos': ['kia', 'credos'],
'capital': ['kia', 'capital'],
'concord': ['kia', 'concord'],
'pride': ['kia', 'pride'],
'avella': ['kia', 'avella'],
'rio dc': ['kia', 'rio dc'],
'pegas': ['kia', 'pegas'],
'soluto': ['kia', 'soluto'],
'picanto': ['kia', 'picanto'],
'morning': ['kia', 'morning'],
'ray': ['kia', 'ray'],
'visto': ['kia', 'visto'],
'venga': ['kia', 'venga'],
'stonic': ['kia', 'stonic'],
'sonet': ['kia', 'sonet'],
'kx1': ['kia', 'kx1'],
'kx3': ['kia', 'kx3'],
'kx5': ['kia', 'kx5'],
'kx7': ['kia', 'kx7'],
'kxcross': ['kia', 'kxcross'],
'sportage r': ['kia', 'sportage r'],
'retona': ['kia', 'retona'],
'rocsta': ['kia', 'rocsta'],
'grand carnival': ['kia', 'grand carnival'],
'carens': ['kia', 'carens'],
'rondo': ['kia', 'rondo'],
'joice': ['kia', 'joice'],
'carstar': ['kia', 'carstar'],
'pregio': ['kia', 'pregio'],
'travello': ['kia', 'travello'],
'besta': ['kia', 'besta'],
'k2500': ['kia', 'k2500'],
'k2700': ['kia', 'k2700'],
'k3000': ['kia', 'k3000'],
'k4000': ['kia', 'k4000'],
'bongo': ['kia', 'bongo'],
'bongo frontier': ['kia', 'bongo frontier'],
'ceres': ['kia', 'ceres'],
'wide bongo': ['kia', 'wide bongo'],
'jumbo bongo': ['kia', 'jumbo bongo'],
'pamax': ['kia', 'pamax'],
'granbird': ['kia', 'granbird'],
'combi': ['kia', 'combi'],
'cosmos': ['kia', 'cosmos'],
'rhino': ['kia', 'rhino'],
'trade': ['kia', 'trade'],
'titan': ['kia', 'titan'],
'boxer': ['kia', 'boxer'],
'frontier': ['kia', 'frontier'],
'asia rocsta': ['kia', 'asia rocsta'],
'towner': ['kia', 'towner'],
'topic': ['kia', 'topic'],
'hi-topic': ['kia', 'hi-topic'],
'wide towner': ['kia', 'wide towner'],
'jumbo topic': ['kia', 'jumbo topic'],
'am928': ['kia', 'am928'],
'brisa': ['kia', 'brisa'],
'sephia ii': ['kia', 'sephia ii'],
'leo': ['kia', 'leo'],
'mentor': ['kia', 'mentor'],
'x-trek': ['kia', 'x-trek'],
'elan': ['kia', 'elan'],
'roadster': ['kia', 'roadster'],
'vigato': ['kia', 'vigato'],
'pro_ceed gt': ['kia', 'pro_ceed gt'],
'provo': ['kia', 'provo'],
'gt4 stinger': ['kia', 'gt4 stinger'],
'cross gt': ['kia', 'cross gt'],
'niro plus': ['kia', 'niro plus'],
'sportspace': ['kia', 'sportspace'],
'trailster': ['kia', 'trailster'],
'telluride concept': ['kia', 'telluride concept'],
'masterpiece': ['kia', 'masterpiece'],
'imagine': ['kia', 'imagine'],
'habaniro': ['kia', 'habaniro'],
'futuron': ['kia', 'futuron'],
'sp signature': ['kia', 'sp signature'],
'mojave': ['kia', 'mojave'],
            'a1': ['audi', 'a1'],
'a1 sportback': ['audi', 'a1 sportback'],
'a1 quattro': ['audi', 'a1 quattro'],
's1': ['audi', 's1'],
'a2': ['audi', 'a2'],
'a3': ['audi', 'a3'],
'a3 sportback': ['audi', 'a3 sportback'],
'a3 sedan': ['audi', 'a3 sedan'],
'a3 cabriolet': ['audi', 'a3 cabriolet'],
'a3 e-tron': ['audi', 'a3 e-tron'],
's3': ['audi', 's3'],
's3 sportback': ['audi', 's3 sportback'],
's3 sedan': ['audi', 's3 sedan'],
'rs3': ['audi', 'rs3'],
'rs3 sportback': ['audi', 'rs3 sportback'],
'rs3 sedan': ['audi', 'rs3 sedan'],
'a4': ['audi', 'a4'],
'a4 avant': ['audi', 'a4 avant'],
'a4 allroad': ['audi', 'a4 allroad'],
's4': ['audi', 's4'],
's4 avant': ['audi', 's4 avant'],
'rs4': ['audi', 'rs4'],
'rs4 avant': ['audi', 'rs4 avant'],
'a5': ['audi', 'a5'],
'a5 sportback': ['audi', 'a5 sportback'],
'a5 cabriolet': ['audi', 'a5 cabriolet'],
's5': ['audi', 's5'],
's5 sportback': ['audi', 's5 sportback'],
's5 cabriolet': ['audi', 's5 cabriolet'],
'rs5': ['audi', 'rs5'],
'rs5 sportback': ['audi', 'rs5 sportback'],
'a6': ['audi', 'a6'],
'a6 avant': ['audi', 'a6 avant'],
'a6 allroad': ['audi', 'a6 allroad'],
'a6 e-tron': ['audi', 'a6 e-tron'],
's6': ['audi', 's6'],
's6 avant': ['audi', 's6 avant'],
'rs6': ['audi', 'rs6'],
'rs6 avant': ['audi', 'rs6 avant'],
'a7': ['audi', 'a7'],
'a7 sportback': ['audi', 'a7 sportback'],
's7': ['audi', 's7'],
's7 sportback': ['audi', 's7 sportback'],
'rs7': ['audi', 'rs7'],
'rs7 sportback': ['audi', 'rs7 sportback'],
'a8': ['audi', 'a8'],
'a8l': ['audi', 'a8l'],
'a8l security': ['audi', 'a8l security'],
's8': ['audi', 's8'],
'q2': ['audi', 'q2'],
'q2 e-tron': ['audi', 'q2 e-tron'],
'sq2': ['audi', 'sq2'],
'q3': ['audi', 'q3'],
'q3 sportback': ['audi', 'q3 sportback'],
'rs q3': ['audi', 'rs q3'],
'rs q3 sportback': ['audi', 'rs q3 sportback'],
'q4 e-tron': ['audi', 'q4 e-tron'],
'q4 sportback e-tron': ['audi', 'q4 sportback e-tron'],
'q5': ['audi', 'q5'],
'q5 sportback': ['audi', 'q5 sportback'],
'q5 hybrid': ['audi', 'q5 hybrid'],
'q5 e-tron': ['audi', 'q5 e-tron'],
'sq5': ['audi', 'sq5'],
'sq5 sportback': ['audi', 'sq5 sportback'],
'q6 e-tron': ['audi', 'q6 e-tron'],
'sq6 e-tron': ['audi', 'sq6 e-tron'],
'q7': ['audi', 'q7'],
'q7 e-tron': ['audi', 'q7 e-tron'],
'sq7': ['audi', 'sq7'],
'q8': ['audi', 'q8'],
'q8 e-tron': ['audi', 'q8 e-tron'],
'q8 sportback e-tron': ['audi', 'q8 sportback e-tron'],
'sq8': ['audi', 'sq8'],
'sq8 e-tron': ['audi', 'sq8 e-tron'],
'sq8 sportback e-tron': ['audi', 'sq8 sportback e-tron'],
'rs q8': ['audi', 'rs q8'],
'tt': ['audi', 'tt'],
'tt roadster': ['audi', 'tt roadster'],
'tts': ['audi', 'tts'],
'tts roadster': ['audi', 'tts roadster'],
'tt rs': ['audi', 'tt rs'],
'tt rs roadster': ['audi', 'tt rs roadster'],
'r8': ['audi', 'r8'],
'r8 spyder': ['audi', 'r8 spyder'],
'r8 v10': ['audi', 'r8 v10'],
'r8 v10 plus': ['audi', 'r8 v10 plus'],
'r8 v10 performance': ['audi', 'r8 v10 performance'],
'r8 gt': ['audi', 'r8 gt'],
'r8 lms': ['audi', 'r8 lms'],
'e-tron': ['audi', 'e-tron'],
'e-tron sportback': ['audi', 'e-tron sportback'],
'e-tron s': ['audi', 'e-tron s'],
'e-tron s sportback': ['audi', 'e-tron s sportback'],
'e-tron gt': ['audi', 'e-tron gt'],
'rs e-tron gt': ['audi', 'rs e-tron gt'],
'80': ['audi', '80'],
'90': ['audi', '90'],
'100': ['audi', '100'],
'200': ['audi', '200'],
'4000': ['audi', '4000'],
'5000': ['audi', '5000'],
'quattro': ['audi', 'quattro'],
'ur-quattro': ['audi', 'ur-quattro'],
'sport quattro': ['audi', 'sport quattro'],
'sport quattro s1': ['audi', 'sport quattro s1'],
'coupe': ['audi', 'coupe'],
'coupe gt': ['audi', 'coupe gt'],
'coupe quattro': ['audi', 'coupe quattro'],
'cabriolet': ['audi', 'cabriolet'],
'v8': ['audi', 'v8'],
'50': ['audi', '50'],
'60': ['audi', '60'],
'70': ['audi', '70'],
'75': ['audi', '75'],
'super 90': ['audi', 'super 90'],
'f103': ['audi', 'f103'],
'fox': ['audi', 'fox'],
'front': ['audi', 'front'],
'920': ['audi', '920'],
'uw': ['audi', 'uw'],
'dkw': ['audi', 'dkw'],
'dkw f89': ['audi', 'dkw f89'],
'dkw f91': ['audi', 'dkw f91'],
'dkw f93': ['audi', 'dkw f93'],
'dkw f94': ['audi', 'dkw f94'],
'auto union 1000': ['audi', 'auto union 1000'],
'auto union 1000 s': ['audi', 'auto union 1000 s'],
'auto union 1000 sp': ['audi', 'auto union 1000 sp'],
'horch': ['audi', 'horch'],
'wanderer': ['audi', 'wanderer'],
'nsu ro 80': ['audi', 'nsu ro 80'],
'nsu prinz': ['audi', 'nsu prinz'],
'allroad': ['audi', 'allroad'],
'rs2': ['audi', 'rs2'],
'rs2 avant': ['audi', 'rs2 avant'],
's2': ['audi', 's2'],
's2 avant': ['audi', 's2 avant'],
's2 coupe': ['audi', 's2 coupe'],
's3 sedan': ['audi', 's3 sedan'],
'rs3 lms': ['audi', 'rs3 lms'],
'a4 dtm': ['audi', 'a4 dtm'],
'rs5 dtm': ['audi', 'rs5 dtm'],
'le mans quattro': ['audi', 'le mans quattro'],
'rsq': ['audi', 'rsq'],
'pikes peak quattro': ['audi', 'pikes peak quattro'],
'shooting brake': ['audi', 'shooting brake'],
'allroad shooting brake': ['audi', 'allroad shooting brake'],
'nuvolari quattro': ['audi', 'nuvolari quattro'],
'rosemeyer': ['audi', 'rosemeyer'],
'avus quattro': ['audi', 'avus quattro'],
'e-tron spyder': ['audi', 'e-tron spyder'],
'e-tron detroit': ['audi', 'e-tron detroit'],
'nanuk quattro': ['audi', 'nanuk quattro'],
'crosslane coupe': ['audi', 'crosslane coupe'],
'prologue': ['audi', 'prologue'],
'prologue allroad': ['audi', 'prologue allroad'],
'prologue avant': ['audi', 'prologue avant'],
'elaine': ['audi', 'elaine'],
'aicon': ['audi', 'aicon'],
'pb18 e-tron': ['audi', 'pb18 e-tron'],
'ai:me': ['audi', 'ai:me'],
'ai:race': ['audi', 'ai:race'],
'ai:trail': ['audi', 'ai:trail'],
'skysphere': ['audi', 'skysphere'],
'grandsphere': ['audi', 'grandsphere'],
'urbansphere': ['audi', 'urbansphere'],
'activesphere': ['audi', 'activesphere'],
    
        };

        // 3. Enhance search terms using patterns without deleting original terms (like year)
        const enhancedTerms = new Set(initialSearchTerms);
        initialSearchTerms.forEach(term => {
            if (makeModelPatterns[term]) {
                // Add the associated make/model from our patterns
                makeModelPatterns[term].forEach(t => enhancedTerms.add(t));
                // If the original term was plural (e.g., "accords"), remove it in favor of the singular "accord"
                if (term.endsWith('s') && term.length > 1) {
                    enhancedTerms.delete(term);
                }
            }
        });
        const finalSearchTerms = Array.from(enhancedTerms);

        // 4. Perform the primary search using all enhanced terms
        let results = inventoryData.filter(vehicle => {
            // Create a robust, searchable string for each vehicle. This now handles "F-150" vs "F150" automatically.
            const vehicleString = `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase();
            const vehicleStringNoDash = vehicleString.replace(/-/g, '');

            // Check if EVERY search term is present in the vehicle string
            return finalSearchTerms.every(term => {
                const termNoDash = term.replace(/-/g, '');
                return vehicleString.includes(term) || vehicleStringNoDash.includes(termNoDash);
            });
        });

        // 5. If no exact matches, try a more lenient partial match with the ORIGINAL search terms
        if (results.length === 0 && initialSearchTerms.length > 0) {
            results = inventoryData.filter(vehicle => {
                const vehicleString = `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase();
                const matchCount = initialSearchTerms.filter(term => vehicleString.includes(term)).length;
                
                // Match if at least half the original terms are present
                return matchCount > 0 && matchCount >= Math.ceil(initialSearchTerms.length / 2);
            });
        }

        return results;
    }
    // === END: NEW AND IMPROVED FUNCTION ===

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
        
        // Show all inventory (only if no specific vehicle mentioned)
        if ((lower.includes('inventory') || lower.includes('inventario')) && 
            !lower.match(/chevy|chevrolet|ford|toyota|honda|nissan|dodge|ram|gmc|buick|cadillac|chrysler|jeep|mazda|hyundai|kia|volkswagen|audi|bmw|mercedes/)) {
            if (inventoryData.length > 0) {
                return `🚗 <strong>${inventoryData.length} ${t.vehiclesInYard}!</strong><br><br>` +
                       `${currentLanguage === 'es' ? 'Búsquedas populares' : 'Popular searches'}:<br>` +
                       `• Ford F150<br>• Chevy Silverado<br>• Toyota Camry<br>• Honda Civic<br>• Honda Accord`;
            } else {
                loadInventoryData();
                return t.loading;
            }
        }

        // IMPROVED VEHICLE SEARCH
        if (inventoryData.length > 0) {
            // Check if message might be a vehicle search
            const vehicleKeywords = /accord|civic|camry|corolla|f150|f-150|silverado|tahoe|suburban|impala|explorer|expedition|ranger|altima|sentra|maxima|chevy|chevrolet|ford|toyota|honda|nissan|dodge|ram|gmc|buick|cadillac|chrysler|jeep|mazda|hyundai|kia|volkswagen|audi|bmw|mercedes|truck|car|sedan|suv|pickup|\d{4}/i;
            
            if (vehicleKeywords.test(lower)) {
                const results = searchVehicles(lower);
                
                if (results.length > 0) {
                    let response = `🚗 <strong>${t.foundVehicles}: ${results.length}</strong><br><br>`;
                    const showMax = Math.min(10, results.length);
                    
                    for (let i = 0; i < showMax; i++) {
                        const v = results[i];
                        response += `<strong>${v.year} ${v.make} ${v.model}</strong><br>`;
                        response += `📍 ${t.row} ${v.row} | ${t.stock} #${v.stock}<br>`;
                        if (v.color) {
                            response += `🎨 ${t.color}: ${v.color}<br>`;
                        }
                        response += `<br>`;
                    }
                    
                    if (results.length > 10) {
                        response += `<em>...and ${results.length - 10} more!</em><br><br>`;
                    }
                    
                    response += `🔧 ${t.bringTools}`;
                    return response;
                } else {
                    return `${t.noResults}<br><br>` +
                           `Try searching for something else or check back later - we get new inventory daily!<br><br>` +
                           `Popular vehicles we often have:<br>` +
                           `• Honda Accord<br>• Toyota Camry<br>• Ford F150<br>• Chevy Silverado`;
                }
            }
        }

        // Parts prices
        if (lower.includes('price') || lower.includes('precio') || lower.includes('part') || lower.includes('parte') || lower.includes('cost')) {
            return `💰 <strong>Check out these prices:</strong><br><br>` +
                   `• Engines from $299<br>` +
                   `• Transmissions from $194<br>` +
                   `• Alternators: $37.52<br>` +
                   `• Starters: $28.91<br>` +
                   `• Doors: $59.95<br>` +
                   `• Fenders: $49.95<br><br>` +
                   `All parts come with warranty options!`;
        }

        // Greetings
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('hola')) {
            return `Hey there! Welcome to Locos Gringos! What can I help you find today? 🚗`;
        }

        if (lower.includes('thank') || lower.includes('gracias')) {
            return `You're welcome! Come visit us anytime - the gate's only $2 and the parts are waiting! 🎉`;
        }

        if (lower.includes('how are you')) {
            return `Doing great! Just here helping folks find the parts they need. What can I help you with?`;
        }

        // Default response
        return `I can help you with:<br><br>` +
               `🚗 Finding specific vehicles (try "Honda Accord" or "2015 Ford F150")<br>` +
               `💰 Checking parts prices<br>` +
               `📍 Getting directions to our yard<br>` +
               `🕒 Store hours<br><br>` +
               `What would you like to know?`;
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



