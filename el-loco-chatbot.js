<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Loco Chatbot - Locos Gringos Pick-N-Pull</title>
</head>
<body>

<!-- PART 1: WIX CUSTOM ELEMENT CODE (Add this to Wix Custom Element) -->
<script>
// Wix Custom Element Code - Add to Wix via Settings > Custom Code
// Make sure to set it to load on all pages, in the body end

(function() {
    // Check if we're in Wix environment
    if (typeof window !== 'undefined') {
        // Create and inject the chatbot container
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'el-loco-chatbot-container';
        document.body.appendChild(chatbotContainer);
        
        // Load the main chatbot script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/yourusername/locos-gringos-chatbot@latest/el-loco-chatbot.min.js';
        script.async = true;
        document.body.appendChild(script);
    }
})();
</script>

<!-- PART 2: MAIN CHATBOT SCRIPT (Host this on GitLab/CDN) -->
<script>
// El Loco Chatbot - Locos Gringos Pick-N-Pull
// Version 4.0 - Complete Rewrite with All Features
// Author: Locos Gringos Development Team

(function() {
    'use strict';
    
    // ========================
    // CONFIGURATION
    // ========================
    const CONFIG = {
        API_URL: 'https://19457ba2f7ff.ngrok.app/api/live-inventory.txt',
        COMPANY_NAME: 'Locos Gringos Pick-N-Pull',
        BOT_NAME: 'El Loco',
        BOT_IMAGE: 'https://imgur.com/ygmELqO.jpg',
        PHONE: '903-877-4900',
        ADDRESS: '10310 CR 383, Tyler, TX 75708',
        GATE_FEE: '$2.00',
        WEBSITE: 'https://locosgringospicknpull.com',
        PARTS_LIST_URL: 'https://www.locosgringospicknpull.com/parts-list',
        INVENTORY_SEARCH_URL: 'https://www.locosgringospicknpull.com/search-inventory',
        VEHICLES_FOR_SALE_URL: 'https://www.locosgringospicknpull.com/vehicles-for-sale',
        SELL_CAR_URL: 'https://www.locosgringospicknpull.com/sell-my-car-1',
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

    // ========================
    // TRANSLATIONS
    // ========================
    const TRANSLATIONS = {
        en: {
            welcome: `🎉 ¡Órale! I'm ${CONFIG.BOT_NAME}!`,
            tagline: "Where your wallet gets fatter and your car gets better! 💰",
            helpWith: "What can El Loco do for you today, amigo?",
            findVehicles: "🚗 Find vehicles (I know where every rust bucket is!)",
            checkPrices: "💰 Check parts prices (Cheaper than your ex's excuses!)",
            getDirections: "📍 Get directions (We're easier to find than your missing 10mm socket!)",
            storeInfo: "🕐 Store hours (We're open more than a 24-hour taco stand... almost!)",
            sellCar: "💸 Sell your car (We buy anything that rolls, crawls, or needs a push!)",
            buyVehicle: "🚙 Buy a whole vehicle (Some even run!)",
            whatHelp: "What brings you to my kingdom of rust and riches?",
            storeHours: "Store Hours",
            checkInventory: "Check Inventory",
            partsPrices: "Parts Prices",
            directions: "Directions",
            typePlaceholder: "Type your message... or just honk twice",
            online: "Online - Caffeinated and ready!",
            loading: "Hold your horses! Loading inventory faster than a mechanic on payday...",
            gateFee: "Gate Fee",
            callUs: "Call us",
            getDirectionsLink: "Get Directions (GPS won't judge your driving!)",
            vehiclesInYard: "vehicles in our glorious junkyard",
            foundVehicles: "Found these beauties",
            noResults: "No luck, compadre! But check back tomorrow - cars appear like magic!",
            row: "Row",
            stock: "Stock",
            color: "Color",
            bringTools: "BYOT - Bring Your Own Tools! (And maybe a friend to help push)",
            warranty: "Warranty Options Available",
            popularParts: "Hot sellers"
        },
        es: {
            welcome: `🎉 ¡Hola! ¡Soy ${CONFIG.BOT_NAME}!`,
            tagline: "¡Donde tu cartera engorda y tu carro mejora!",
            helpWith: "¿Qué puede hacer El Loco por ti hoy, amigo?",
            findVehicles: "🚗 Encontrar vehículos",
            checkPrices: "💰 Verificar precios",
            getDirections: "📍 Obtener direcciones",
            storeInfo: "🕐 Horarios de la tienda",
            sellCar: "💸 Vender tu carro",
            buyVehicle: "🚙 Comprar un vehículo",
            whatHelp: "¿Qué te trae a mi reino de óxido y riquezas?",
            storeHours: "Horarios",
            checkInventory: "Ver Inventario",
            partsPrices: "Precios de Partes",
            directions: "Direcciones",
            typePlaceholder: "Escribe tu mensaje...",
            online: "En línea - ¡Listo para ayudar!",
            loading: "¡Espera! Cargando inventario...",
            gateFee: "Tarifa de Entrada",
            callUs: "Llámanos",
            getDirectionsLink: "Obtener Direcciones",
            vehiclesInYard: "vehículos en nuestro yardero",
            foundVehicles: "Encontré estos tesoros",
            noResults: "Sin suerte, compadre. ¡Pero regresa mañana!",
            row: "Fila",
            stock: "Stock",
            color: "Color",
            bringTools: "¡Trae tus propias herramientas!",
            warranty: "Opciones de Garantía",
            popularParts: "Partes populares"
        }
    };

    // ========================
    // FUNNY RESPONSES DATABASE
    // ========================
    const FUNNY_RESPONSES = {
        greetings: [
            "Welcome to El Loco's empire of excellent junk! Where one man's trash is another man's transmission!",
            "¡Hola amigo! Ready to turn that clunker into cash or find parts cheaper than a gas station burrito?",
            "Hey there! I'm El Loco, your guide through the magical land of rust and rubber!",
            "Welcome! Where we have more parts than a math textbook and better deals than your cousin's 'friend'!",
            "¡Órale! You've reached the Disneyland of Dings and Dents! How can I help you today?"
        ],
        noInventory: [
            "Ay, no luck today! But cars come and go faster than my wife's moods. Check back tomorrow!",
            "Nothing in stock right now, but don't worry - we get new 'donations' daily!",
            "Empty handed today, but tomorrow? Who knows! Cars appear here like socks disappear in the dryer!",
            "No dice, amigo! But our inventory changes faster than a NASCAR pit stop!",
            "Strike out today, but we restock faster than you can say 'check engine light'!"
        ],
        foundVehicles: [
            "Jackpot! Found some beauties that'll make your toolbox sing!",
            "¡Mira! Look what El Loco found in the treasure pile!",
            "Bingo! These rides are waiting for you like a faithful dog!",
            "Holy guacamole! We've got exactly what you're looking for!",
            "Winner winner, chicken dinner! Check out these gems!"
        ],
        prices: [
            "Our prices are so low, even your broke cousin can afford them!",
            "Cheaper than a divorce lawyer and twice as useful!",
            "These prices will make your wallet do the happy dance!",
            "So affordable, you'll think we made a mistake (we didn't, we're just crazy)!",
            "Prices lower than a limbo champion!"
        ],
        tools: [
            "Remember: BYOT - Bring Your Own Tools! We don't rent them because people 'forget' to return them!",
            "Don't forget your tools! A screwdriver and optimism go a long way here!",
            "Bring tools, friends, and maybe a sandwich. You'll be here a while having fun!",
            "Tools required, tetanus shot recommended, sense of humor mandatory!",
            "Pack your tools like you're going camping, except instead of bears, you'll fight rusty bolts!"
        ]
    };

    // ========================
    // COMPLETE PARTS PRICE LIST
    // ========================
    const PARTS_PRICES = {
        // [Keeping the original priceListData array from the first script]
        // This is the complete price list with base price, warranty price, and core charge
        "complete vehicle": { price: "1691.25", warrantyPrice: "1711.25", core: "0" },
        "1/4 ratchet set": { price: "31.01", warrantyPrice: "35.01", core: "0" },
        "46 piece set": { price: "43.41", warrantyPrice: "48.41", core: "0" },
        "alternator": { price: "37.52", warrantyPrice: "42.52", core: "4.68" },
        "starter": { price: "28.91", warrantyPrice: "32.91", core: "5.62" },
        "transmission car": { price: "194.45", warrantyPrice: "214.45", core: "25.29" },
        "transmission truck": { price: "280.29", warrantyPrice: "300.29", core: "39.99" },
        "engine car": { price: "299.55", warrantyPrice: "319.55", core: "49.65" },
        "engine truck": { price: "421.67", warrantyPrice: "441.67", core: "79.99" },
        "radiator": { price: "66.47", warrantyPrice: "71.47", core: "15" },
        "battery": { price: "54.94", warrantyPrice: "59.94", core: "12.01" },
        "door car": { price: "73.57", warrantyPrice: "83.57", core: "5.62" },
        "door truck": { price: "94.59", warrantyPrice: "104.59", core: "5.62" },
        "fender car": { price: "51.23", warrantyPrice: "56.23", core: "1.87" },
        "fender truck": { price: "70.95", warrantyPrice: "75.95", core: "1.87" },
        "hood car": { price: "67.54", warrantyPrice: "72.54", core: "2.81" },
        "hood truck": { price: "90.04", warrantyPrice: "100.04", core: "2.81" },
        "bumper front": { price: "72.27", warrantyPrice: "77.27", core: "1.87" },
        "bumper rear": { price: "82.77", warrantyPrice: "92.77", core: "1.87" },
        "headlight": { price: "51.85", warrantyPrice: "56.85", core: "0" },
        "tail light": { price: "24.02", warrantyPrice: "28.02", core: "0" },
        "wheel aluminum": { price: "36.07", warrantyPrice: "41.07", core: "14.99" },
        "wheel steel": { price: "24.79", warrantyPrice: "28.79", core: "2" },
        "tire": { price: "56.38", warrantyPrice: "61.38", core: "0" },
        "brake caliper car": { price: "14.45", warrantyPrice: "17.45", core: "2.81" },
        "brake caliper truck": { price: "22.34", warrantyPrice: "25.34", core: "1.87" },
        "brake rotor car": { price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        "brake rotor truck": { price: "19.70", warrantyPrice: "22.70", core: "1.87" },
        "window motor": { price: "15.77", warrantyPrice: "18.77", core: "1.87" },
        "a/c compressor": { price: "67.59", warrantyPrice: "72.59", core: "5.62" },
        "seat car": { price: "43.41", warrantyPrice: "48.41", core: "0" },
        "seat truck": { price: "63.05", warrantyPrice: "68.05", core: "0" }
    };

    // ========================
    // VEHICLE MAKE/MODEL PATTERNS
    // ========================
    const VEHICLE_PATTERNS = {
        // [Include all the makeModelPatterns from the second script]
        // This helps with vehicle search accuracy
    };

    // ========================
    // STATE MANAGEMENT
    // ========================
    let currentLanguage = 'en';
    let inventoryData = [];
    let isOpen = false;
    let conversationContext = [];

    // ========================
    // INITIALIZATION
    // ========================
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
        loadInventoryData();
    }

    // ========================
    // STYLES
    // ========================
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* El Loco Chatbot Styles */
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
                border-radius: 50% !important;
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
                width: 420px !important;
                height: 650px !important;
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

            .lg-chat-tagline {
                font-size: 10px !important;
                opacity: 0.9 !important;
                margin-top: 2px !important;
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
                max-width: 85% !important;
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
                box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
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

            .lg-bot-message a {
                color: #4ade80 !important;
                text-decoration: none !important;
                font-weight: 500 !important;
            }

            .lg-bot-message a:hover {
                text-decoration: underline !important;
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
                box-shadow: 0 2px 8px rgba(74, 139, 107, 0.3) !important;
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

            .lg-send-button:hover:not(:disabled) {
                transform: scale(1.1) !important;
                box-shadow: 0 5px 15px rgba(74, 139, 107, 0.4) !important;
            }

            .lg-send-button:disabled {
                opacity: 0.5 !important;
                cursor: not-allowed !important;
            }

            .lg-vehicle-card {
                background: rgba(74, 139, 107, 0.1) !important;
                border: 1px solid #4a8b6b !important;
                border-radius: 10px !important;
                padding: 10px !important;
                margin: 5px 0 !important;
            }

            .lg-vehicle-title {
                color: #4ade80 !important;
                font-weight: 600 !important;
                margin-bottom: 5px !important;
            }

            .lg-vehicle-details {
                font-size: 13px !important;
                color: #b0b0b0 !important;
            }

            .lg-price-info {
                background: rgba(74, 139, 107, 0.1) !important;
                border-left: 3px solid #4a8b6b !important;
                padding: 10px !important;
                margin: 10px 0 !important;
            }

            .lg-price-line {
                display: flex !important;
                justify-content: space-between !important;
                margin: 5px 0 !important;
            }

            .lg-price-label {
                color: #909090 !important;
            }

            .lg-price-value {
                color: #4ade80 !important;
                font-weight: 600 !important;
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

    // ========================
    // HTML CREATION
    // ========================
    function createChatbotHTML() {
        const t = TRANSLATIONS[currentLanguage];
        
        const chatHTML = `
            <button class="lg-chatbot-button" id="lgChatButton" aria-label="Open El Loco Chat">
                <img src="${CONFIG.BOT_IMAGE}" alt="${CONFIG.BOT_NAME}" onerror="this.style.display='none'; this.parentElement.innerHTML='💬';">
            </button>
            <div class="lg-chat-container" id="lgChatContainer" role="dialog" aria-label="El Loco Chat Window">
                <div class="lg-chat-header">
                    <div class="lg-chat-title">
                        <div class="lg-bot-avatar">
                            <img src="${CONFIG.BOT_IMAGE}" alt="${CONFIG.BOT_NAME}" onerror="this.style.display='none'; this.parentElement.innerHTML='🤖';">
                        </div>
                        <div>
                            <h3>${CONFIG.BOT_NAME}</h3>
                            <div class="lg-chat-tagline">Your Junkyard Genius!</div>
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
                        <button class="lg-close-chat" id="lgCloseChat" aria-label="Close chat">✕</button>
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
                    <button class="lg-send-button" id="lgSendButton" aria-label="Send message">➤</button>
                </div>
            </div>
        `;

        const chatDiv = document.createElement('div');
        chatDiv.innerHTML = chatHTML;
        document.body.appendChild(chatDiv);

        showWelcomeMessage();
        updateQuickActions();
    }

    // ========================
    // LANGUAGE DETECTION
    // ========================
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

        const statusElement = document.getElementById('lgStatusText');
        const inputElement = document.getElementById('lgChatInput');
        
        if (statusElement) statusElement.textContent = t.online;
        if (inputElement) inputElement.placeholder = t.typePlaceholder;

        document.querySelectorAll('.lg-lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        updateQuickActions();
    }

    // ========================
    // WELCOME MESSAGE
    // ========================
    function showWelcomeMessage() {
        const greeting = getRandomResponse('greetings');
        const t = TRANSLATIONS[currentLanguage];
        
        const welcomeMsg = `
            ${greeting}<br><br>
            <strong>${t.tagline}</strong><br><br>
            ${t.helpWith}<br>
            • ${t.findVehicles}<br>
            • ${t.checkPrices}<br>
            • ${t.buyVehicle}<br>
            • ${t.sellCar}<br>
            • ${t.getDirections}<br>
            • ${t.storeInfo}<br><br>
            ${t.whatHelp}
        `;
        addMessage(welcomeMsg, 'bot');
    }

    // ========================
    // QUICK ACTIONS
    // ========================
    function updateQuickActions() {
        const t = TRANSLATIONS[currentLanguage];
        const quickActionsDiv = document.getElementById('lgQuickActions');
        
        if (quickActionsDiv) {
            quickActionsDiv.innerHTML = `
                <button class="lg-quick-action" data-message="Parts prices">${t.partsPrices}</button>
                <button class="lg-quick-action" data-message="Check inventory">${t.checkInventory}</button>
                <button class="lg-quick-action" data-message="Sell my car">💸 Sell Car</button>
                <button class="lg-quick-action" data-message="Vehicles for sale">🚗 Buy Vehicle</button>
                <button class="lg-quick-action" data-message="Store hours">${t.storeHours}</button>
                <button class="lg-quick-action" data-message="Directions">${t.directions}</button>
            `;

            document.querySelectorAll('.lg-quick-action').forEach(btn => {
                btn.addEventListener('click', () => {
                    const input = document.getElementById('lgChatInput');
                    if (input) {
                        input.value = btn.dataset.message;
                        sendMessage();
                    }
                });
            });
        }
    }

    // ========================
    // EVENT LISTENERS
    // ========================
    function attachEventListeners() {
        const chatButton = document.getElementById('lgChatButton');
        const closeButton = document.getElementById('lgCloseChat');
        const sendButton = document.getElementById('lgSendButton');
        const chatInput = document.getElementById('lgChatInput');

        if (chatButton) chatButton.addEventListener('click', toggleChat);
        if (closeButton) closeButton.addEventListener('click', toggleChat);
        if (sendButton) sendButton.addEventListener('click', sendMessage);
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        document.querySelectorAll('.lg-lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                updateLanguage(btn.dataset.lang);
            });
        });
    }

    // ========================
    // TOGGLE CHAT
    // ========================
    function toggleChat() {
        isOpen = !isOpen;
        const container = document.getElementById('lgChatContainer');
        if (container) {
            container.classList.toggle('lg-active', isOpen);
        }
        
        if (isOpen && inventoryData.length === 0) {
            loadInventoryData();
        }
    }

    // ========================
    // INVENTORY LOADING
    // ========================
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

            console.log(`El Loco: Loaded ${inventoryData.length} vehicles into memory!`);
        } catch (error) {
            console.error('El Loco: Error loading inventory:', error);
        }
    }

    // ========================
    // MESSAGE SENDING
    // ========================
    function sendMessage() {
        const input = document.getElementById('lgChatInput');
        const sendButton = document.getElementById('lgSendButton');
        
        if (!input) return;
        
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        input.value = '';
        
        // Disable send button while processing
        if (sendButton) sendButton.disabled = true;

        // Show typing indicator
        const typing = document.getElementById('lgTypingIndicator');
        if (typing) typing.classList.add('lg-active');

        // Process message with delay for realism
        setTimeout(async () => {
            if (typing) typing.classList.remove('lg-active');
            if (sendButton) sendButton.disabled = false;
            
            const response = await processMessage(message);
            addMessage(response, 'bot');
        }, 800 + Math.random() * 700); // Random delay between 800-1500ms
    }

    // ========================
    // VEHICLE SEARCH
    // ========================
    function searchVehicles(searchQuery) {
        if (!searchQuery || inventoryData.length === 0) return [];

        // Clean the search query
        const cleanedQuery = searchQuery.toLowerCase()
            .replace(/do you have any|do you have|got any|any|looking for|need|want|\?/g, '')
            .replace(/chevy/g, 'chevrolet')
            .replace(/transmission for|transmission|engine for|engine|parts for/g, '')
            .trim();

        if (!cleanedQuery) return [];

        const searchTerms = cleanedQuery.split(/\s+/).filter(term => term.length > 0);

        // Search by model first (as requested)
        let results = inventoryData.filter(vehicle => {
            const vehicleString = `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase();
            
            // Priority search: exact model match
            if (searchTerms.some(term => vehicle.model.toLowerCase().includes(term))) {
                return true;
            }
            
            // Secondary: all terms match
            return searchTerms.every(term => vehicleString.includes(term));
        });

        return results;
    }

    // ========================
    // PARTS PRICE SEARCH
    // ========================
    function searchPartPrice(query) {
        const cleanedQuery = query.toLowerCase()
            .replace(/how much for|how much is|price of|cost of|price for/g, '')
            .replace(/a |an |the /g, '')
            .trim();

        // Search for exact match first
        if (PARTS_PRICES[cleanedQuery]) {
            return PARTS_PRICES[cleanedQuery];
        }

        // Search for partial match
        for (let partName in PARTS_PRICES) {
            if (partName.includes(cleanedQuery) || cleanedQuery.includes(partName)) {
                return { name: partName, ...PARTS_PRICES[partName] };
            }
        }

        return null;
    }

    // ========================
    // MESSAGE PROCESSING
    // ========================
    async function processMessage(msg) {
        const lower = msg.toLowerCase();
        const t = TRANSLATIONS[currentLanguage];
        
        // Add to conversation context
        conversationContext.push({ role: 'user', content: msg });
        if (conversationContext.length > 10) {
            conversationContext.shift(); // Keep only last 10 messages
        }

        // Check for specific part price inquiry
        if (lower.includes('how much') || lower.includes('price') || lower.includes('cost')) {
            const part = searchPartPrice(lower);
            if (part) {
                const response = formatPartPrice(part);
                return response;
            }
            
            // General parts price inquiry
            if (lower.includes('part') || lower.includes('price')) {
                return `
                    ${getRandomResponse('prices')}<br><br>
                    Want to see our complete price list? Check it out here:<br>
                    👉 <a href="${CONFIG.PARTS_LIST_URL}" target="_blank" style="color:#4ade80;">View Complete Parts Price List</a><br><br>
                    Or tell me what specific part you need, and I'll give you the exact price faster than you can say "Check Engine Light"! 
                `;
            }
        }

        // Check for vehicle sales inquiry
        if (lower.includes('for sale') || lower.includes('buy a car') || lower.includes('buy a vehicle') || lower.includes('whole car') || lower.includes('whole vehicle')) {
            return `
                🚗 <strong>Looking for a complete vehicle? Smart move!</strong><br><br>
                We have vehicles for sale that are ready to drive (well, most of them)! Some even come with all four tires AND a steering wheel! 😄<br><br>
                Check out our selection here:<br>
                👉 <a href="${CONFIG.VEHICLES_FOR_SALE_URL}" target="_blank" style="color:#4ade80;">View Vehicles For Sale</a><br><br>
                Remember: They're pre-owned, pre-loved, and pre-dented for your convenience!
            `;
        }

        // Check for selling a car
        if (lower.includes('sell my car') || lower.includes('sell a car') || lower.includes('sell car') || lower.includes('buy my car') || lower.includes('junk my car')) {
            return `
                💸 <strong>Want to turn that rust bucket into cold hard cash?</strong><br><br>
                ${FUNNY_RESPONSES.prices[Math.floor(Math.random() * FUNNY_RESPONSES.prices.length)]}<br><br>
                We buy cars in ANY condition - running, not running, or "it ran when I parked it 10 years ago"! 🚗💨<br><br>
                <strong>Two ways to get your quote:</strong><br>
                📝 <a href="${CONFIG.SELL_CAR_URL}" target="_blank" style="color:#4ade80;">Get an Instant Online Quote</a><br>
                📞 <a href="tel:${CONFIG.PHONE}" style="color:#4ade80;">Call ${CONFIG.PHONE} - Talk to a Human!</a><br><br>
                We pay cash on the spot and offer free towing! Your car's retirement home awaits! 🎉
            `;
        }

        // Check for parts for specific vehicle (like "transmission for 2015 ford f150")
        if ((lower.includes('transmission for') || lower.includes('engine for') || lower.includes('parts for') || lower.includes('door for') || lower.includes('fender for')) && inventoryData.length > 0) {
            const vehicleSearch = lower.replace(/transmission for|engine for|parts for|door for|fender for|a |an /g, '').trim();
            const results = searchVehicles(vehicleSearch);
            
            if (results.length > 0) {
                let response = `
                    🔧 <strong>Important: We don't inventory individual parts!</strong><br><br>
                    We're a pick-n-pull, which means YOU pull the parts you need! But good news - I found ${results.length} matching vehicle(s) in our yard:<br><br>
                `;
                
                const showMax = Math.min(5, results.length);
                for (let i = 0; i < showMax; i++) {
                    const v = results[i];
                    response += `
                        <div class="lg-vehicle-card">
                            <div class="lg-vehicle-title">${v.year} ${v.make} ${v.model}</div>
                            <div class="lg-vehicle-details">
                                📍 Row ${v.row} | Stock #${v.stock}
                                ${v.color ? `| Color: ${v.color}` : ''}
                            </div>
                        </div>
                    `;
                }
                
                if (results.length > 5) {
                    response += `<br><em>...and ${results.length - 5} more!</em><br>`;
                }
                
                response += `<br>
                    ${getRandomResponse('tools')}<br><br>
                    📍 <strong>Complete inventory search:</strong><br>
                    <a href="${CONFIG.INVENTORY_SEARCH_URL}" target="_blank" style="color:#4ade80;">Search All Vehicles</a>
                `;
                
                return response;
            } else {
                return `
                    ${getRandomResponse('noInventory')}<br><br>
                    But don't give up! Check our complete inventory - new vehicles arrive daily:<br>
                    👉 <a href="${CONFIG.INVENTORY_SEARCH_URL}" target="_blank" style="color:#4ade80;">Search Full Inventory</a><br><br>
                    Or call us at <a href="tel:${CONFIG.PHONE}" style="color:#4ade80;">${CONFIG.PHONE}</a> - we might have just gotten one in!
                `;
            }
        }

        // General vehicle search
        if (inventoryData.length > 0) {
            const vehicleKeywords = /accord|civic|camry|corolla|f150|f-150|silverado|tahoe|suburban|impala|explorer|expedition|ranger|altima|sentra|maxima|chevy|chevrolet|ford|toyota|honda|nissan|dodge|ram|gmc|buick|cadillac|chrysler|jeep|mazda|hyundai|kia|volkswagen|audi|bmw|mercedes|\d{4}/i;
            
            if (vehicleKeywords.test(lower)) {
                const results = searchVehicles(lower);
                
                if (results.length > 0) {
                    let response = `
                        ${getRandomResponse('foundVehicles')}<br><br>
                        🚗 <strong>Found ${results.length} matching vehicle(s):</strong><br><br>
                    `;
                    
                    const showMax = Math.min(10, results.length);
                    for (let i = 0; i < showMax; i++) {
                        const v = results[i];
                        response += `
                            <div class="lg-vehicle-card">
                                <div class="lg-vehicle-title">${v.year} ${v.make} ${v.model}</div>
                                <div class="lg-vehicle-details">
                                    📍 Row ${v.row} | Stock #${v.stock}
                                    ${v.color ? `| Color: ${v.color}` : ''}
                                </div>
                            </div>
                        `;
                    }
                    
                    if (results.length > 10) {
                        response += `<br><em>...and ${results.length - 10} more!</em><br>`;
                    }
                    
                    response += `<br>
                        ${getRandomResponse('tools')}<br><br>
                        💡 <strong>Pro tip:</strong> Come early on weekends for the best selection!<br><br>
                        📍 <a href="${CONFIG.INVENTORY_SEARCH_URL}" target="_blank" style="color:#4ade80;">Search Complete Inventory</a>
                    `;
                    
                    return response;
                } else {
                    return `
                        ${getRandomResponse('noInventory')}<br><br>
                        Check our full inventory - we get new vehicles daily!<br>
                        👉 <a href="${CONFIG.INVENTORY_SEARCH_URL}" target="_blank" style="color:#4ade80;">Search All Vehicles</a><br><br>
                        Popular vehicles we often have:<br>
                        • Honda Accord/Civic<br>
                        • Toyota Camry/Corolla<br>
                        • Ford F150/Explorer<br>
                        • Chevy Silverado/Tahoe
                    `;
                }
            }
        }

        // Check inventory request
        if (lower.includes('inventory') || lower.includes('check inventory')) {
            if (inventoryData.length === 0) {
                await loadInventoryData();
            }
            
            return `
                📊 <strong>Current Inventory Status:</strong><br><br>
                We have ${inventoryData.length || 'tons of'} vehicles in our yard!<br><br>
                Search for specific vehicles here:<br>
                👉 <a href="${CONFIG.INVENTORY_SEARCH_URL}" target="_blank" style="color:#4ade80;">Search Full Inventory</a><br><br>
                Or tell me what you're looking for and I'll check right now!<br>
                Try: "Ford F150" or "Honda Accord"
            `;
        }

        // Store hours
        if (lower.includes('hour') || lower.includes('open') || lower.includes('close')) {
            const hours = CONFIG.HOURS[currentLanguage];
            return `
                🕐 <strong>${CONFIG.COMPANY_NAME}</strong><br><br>
                <strong>Store Hours:</strong><br>
                ${Object.entries(hours).map(([day, time]) => `${day}: ${time}`).join('<br>')}<br><br>
                💵 <strong>Gate Fee:</strong> Only ${CONFIG.GATE_FEE}!<br>
                (Cheaper than a fancy coffee and way more fun!)<br><br>
                📞 <a href="tel:${CONFIG.PHONE}" style="color:#4ade80;">Call us: ${CONFIG.PHONE}</a>
            `;
        }

        // Directions
        if (lower.includes('direction') || lower.includes('location') || lower.includes('address') || lower.includes('where')) {
            return `
                📍 <strong>Find us at:</strong><br>
                ${CONFIG.ADDRESS}<br><br>
                We're the place with all the cars that look like they've lived interesting lives! 🚗<br><br>
                <a href="https://maps.google.com/?q=${encodeURIComponent(CONFIG.ADDRESS)}" target="_blank" style="color:#4ade80;">
                    🗺️ Get Directions on Google Maps
                </a><br><br>
                Can't miss us - just follow the trail of people carrying car parts and smiling about the money they saved!
            `;
        }

        // Greetings
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('hola')) {
            return getRandomResponse('greetings');
        }

        // Thank you
        if (lower.includes('thank') || lower.includes('gracias')) {
            return `
                You're welcome, amigo! 🎉<br><br>
                Remember: Life's too short to pay retail for car parts!<br>
                Come visit us anytime - the gate's only ${CONFIG.GATE_FEE} and the adventure is free!<br><br>
                Need anything else? I'm here all day (because robots don't need lunch breaks)!
            `;
        }

        // Funny responses
        if (lower.includes('joke') || lower.includes('funny')) {
            const jokes = [
                "Why don't cars ever get tired? Because they have plenty of rest stops! 🚗",
                "What's a car's favorite meal? Brake-fast! 🍳",
                "Why did the mechanic sleep under the car? He wanted to wake up oily in the morning! 😂",
                "What do you call a Ford Fiesta that ran out of gas? A Ford Siesta! 💤",
                "Why don't cars play football? They only have one boot! ⚽"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)] + "<br><br>But seriously, what can I help you find today?";
        }

        // How are you
        if (lower.includes('how are you')) {
            return `
                I'm doing great! Living the dream in a junkyard! 🎉<br><br>
                Surrounded by endless car parts and helping folks save money all day - what's not to love?<br><br>
                Plus, I never have to worry about parking! How can I help you today?
            `;
        }

        // Default response
        return `
            Hmm, I'm not quite sure what you're looking for, but I'm here to help! 🤔<br><br>
            <strong>Try asking me about:</strong><br>
            • 🚗 Specific vehicles ("Do you have a 2015 Ford F150?")<br>
            • 💰 Part prices ("How much for an alternator?")<br>
            • 📋 <a href="${CONFIG.PARTS_LIST_URL}" target="_blank">Complete parts price list</a><br>
            • 🚙 <a href="${CONFIG.VEHICLES_FOR_SALE_URL}" target="_blank">Vehicles for sale</a><br>
            • 💸 <a href="${CONFIG.SELL_CAR_URL}" target="_blank">Sell your car</a><br>
            • 📍 Directions to our yard<br>
            • 🕐 Store hours<br><br>
            Or just type what you need and I'll do my best to help!
        `;
    }

    // ========================
    // FORMAT PART PRICE
    // ========================
    function formatPartPrice(part) {
        const partName = part.name || "that part";
        const basePrice = parseFloat(part.price);
        const warrantyPrice = parseFloat(part.warrantyPrice);
        const coreCharge = parseFloat(part.core);
        
        let response = `
            💰 <strong>Price for ${partName.toUpperCase()}:</strong><br><br>
            <div class="lg-price-info">
        `;
        
        response += `
            <div class="lg-price-line">
                <span class="lg-price-label">Base Price:</span>
                <span class="lg-price-value">$${basePrice.toFixed(2)}</span>
            </div>
            <div class="lg-price-line">
                <span class="lg-price-label">With Warranty:</span>
                <span class="lg-price-value">$${warrantyPrice.toFixed(2)}</span>
            </div>
        `;
        
        if (coreCharge > 0) {
            response += `
                <div class="lg-price-line">
                    <span class="lg-price-label">Core Charge:</span>
                    <span class="lg-price-value">$${coreCharge.toFixed(2)}</span>
                </div>
                <br>
                <small>💡 Core charge is refundable when you bring your old part!</small>
            `;
        }
        
        response += `
            </div><br>
            ${getRandomResponse('prices')}<br><br>
            📋 <a href="${CONFIG.PARTS_LIST_URL}" target="_blank" style="color:#4ade80;">View Complete Price List</a><br><br>
            Remember: ${getRandomResponse('tools')}
        `;
        
        return response;
    }

    // ========================
    // GET RANDOM RESPONSE
    // ========================
    function getRandomResponse(category) {
        const responses = FUNNY_RESPONSES[category];
        if (!responses || responses.length === 0) return "";
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // ========================
    // ADD MESSAGE TO CHAT
    // ========================
    function addMessage(content, sender) {
        const messagesDiv = document.getElementById('lgChatMessages');
        if (!messagesDiv) return;
        
        const msgDiv = document.createElement('div');
        msgDiv.className = `lg-message lg-${sender}-message`;
        msgDiv.innerHTML = content;
        messagesDiv.appendChild(msgDiv);
        
        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // Add to context
        conversationContext.push({ role: sender, content: content });
        if (conversationContext.length > 10) {
            conversationContext.shift();
        }
    }

    // ========================
    // AUTO-LOAD ON PAGE READY
    // ========================
    window.addEventListener('load', () => {
        // Pre-load inventory data
        setTimeout(() => {
            loadInventoryData();
        }, 2000);
    });

    // ========================
    // CLEANUP ON PAGE UNLOAD
    // ========================
    window.addEventListener('beforeunload', () => {
        // Save conversation context to localStorage if needed
        if (conversationContext.length > 0) {
            try {
                localStorage.setItem('elLocoContext', JSON.stringify(conversationContext));
            } catch (e) {
                console.error('El Loco: Could not save conversation context');
            }
        }
    });

})();
</script>

<!-- PART 3: GITLAB HOSTING INSTRUCTIONS -->
<!--
GITLAB SETUP INSTRUCTIONS:

1. Create a new repository on GitLab named "locos-gringos-chatbot"

2. Create these files in your repository:
   - el-loco-chatbot.js (the main script above)
   - README.md (documentation)
   - .gitlab-ci.yml (for auto-deployment)

3. Example .gitlab-ci.yml for auto-minification and deployment:
```yaml
image: node:latest

stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm install -g terser
    - terser el-loco-chatbot.js -o el-loco-chatbot.min.js -c -m
  artifacts:
    paths:
      - el-loco-chatbot.min.js
    expire_in: 1 week

pages:
  stage: deploy
  script:
    - mkdir -p public
    - cp el-loco-chatbot.min.js public/
  artifacts:
    paths:
      - public
  only:
    - main
```

4. Enable GitLab Pages in your repository settings

5. Your script will be available at:
   https://yourusername.gitlab.io/locos-gringos-chatbot/el-loco-chatbot.min.js

6. Update the script src in the Wix Custom Element code to point to your GitLab Pages URL

WIX IMPLEMENTATION:

1. Go to Wix Dashboard > Settings > Custom Code
2. Click "Add Custom Code"
3. Add this code snippet:

```javascript
<script>
(function() {
    if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://yourusername.gitlab.io/locos-gringos-chatbot/el-loco-chatbot.min.js';
        script.async = true;
        document.body.appendChild(script);
    }
})();
</script>
```

4. Set it to load on "All Pages" in the "Body - End" position
5. Save and publish your site

The chatbot will now appear on every page of your Wix website!
-->

</body>
</html>
