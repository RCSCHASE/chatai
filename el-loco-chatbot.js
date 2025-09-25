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
            'accords': ['honda', 'accord'],
            'civic': ['honda', 'civic'],
            'civics': ['honda', 'civic'],
            'camry': ['toyota', 'camry'],
            'camrys': ['toyota', 'camry'],
            'corolla': ['toyota', 'corolla'],
            'corollas': ['toyota', 'corolla'],
            'f150': ['ford', 'f150'],
            'f-150': ['ford', 'f150'],
            'silverado': ['chevrolet', 'silverado'],
            'silverados': ['chevrolet', 'silverado'],
            'impala': ['chevrolet', 'impala'],
            'impalas': ['chevrolet', 'impala'],
            'tahoe': ['chevrolet', 'tahoe'],
            'tahoes': ['chevrolet', 'tahoe'],
            'suburban': ['chevrolet', 'suburban'],
            'suburbans': ['chevrolet', 'suburban'],
            'explorer': ['ford', 'explorer'],
            'explorers': ['ford', 'explorer'],
            'expedition': ['ford', 'expedition'],
            'expeditions': ['ford', 'expedition'],
            'ranger': ['ford', 'ranger'],
            'rangers': ['ford', 'ranger'],
            'altima': ['nissan', 'altima'],
            'altimas': ['nissan', 'altima'],
            'sentra': ['nissan', 'sentra'],
            'sentras': ['nissan', 'sentra'],
            'maxima': ['nissan', 'maxima'],
            'maximas': ['nissan', 'maxima']
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


