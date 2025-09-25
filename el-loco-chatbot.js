<script>
(function() {
    'use strict';
    
    // --- START OF CONFIGURATION ---

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

    // --- NEW: FULLY INTEGRATED & NORMALIZED PRICE LIST ---
    const priceListData = [
        { description: "complete vehicle", price: "1691.25", warrantyPrice: "1711.25", core: "0" },
        { description: "#01 1/4 ratchet set", price: "31.01", warrantyPrice: "35.01", core: "0" },
        { description: "#02 46 piece set", price: "43.41", warrantyPrice: "48.41", core: "0" },
        { description: "#03 plier wrench set", price: "37.21", warrantyPrice: "42.21", core: "0" },
        { description: "#04 screwdriver set", price: "21.7", warrantyPrice: "24.7", core: "0" },
        { description: "#05 pb blaster spray", price: "12.4", warrantyPrice: "15.4", core: "0" },
        { description: "#06 sdriver bit set", price: "37.21", warrantyPrice: "42.21", core: "0" },
        { description: "#07 drill bit set", price: "37.21", warrantyPrice: "42.21", core: "0" },
        { description: "#08 ratchet bit set", price: "37.21", warrantyPrice: "42.21", core: "0" },
        { description: "#09 wd-40", price: "12.4", warrantyPrice: "15.4", core: "0" },
        { description: "#10 screwdriver kit", price: "27.29", warrantyPrice: "31.29", core: "0" },
        { description: "#11 mallet hammer", price: "18.6", warrantyPrice: "21.6", core: "0" },
        { description: "#12 3/8 socket set", price: "37.21", warrantyPrice: "42.21", core: "0" },
        { description: "#13 large gloves", price: "4.96", warrantyPrice: "6.96", core: "0" },
        { description: "#14 x-large gloves", price: "4.96", warrantyPrice: "6.96", core: "0" },
        { description: "#15 vice scripts", price: "24.81", warrantyPrice: "28.81", core: "0" },
        { description: "#16 1/2 ratchet set", price: "37.21", warrantyPrice: "42.21", core: "0" },
        { description: "#17 razor blades", price: "18.6", warrantyPrice: "21.6", core: "0" },
        { description: "#18 torx star bitset", price: "18.6", warrantyPrice: "21.6", core: "0" },
        { description: "hammer", price: "18.6", warrantyPrice: "21.6", core: "0" },
        { description: "#20 torx tool set", price: "24.81", warrantyPrice: "28.81", core: "0" },
        { description: "#21 vice script set", price: "37.21", warrantyPrice: "42.21", core: "0" },
        { description: "1 year battery", price: "54.94", warrantyPrice: "59.94", core: "12.01" },
        { description: "12 oz can soda", price: "1.41", warrantyPrice: "3.41", core: "0" },
        { description: "120 day warranty", price: "197.31", warrantyPrice: "217.31", core: "0" },
        { description: "150 day warranty", price: "225.5", warrantyPrice: "245.5", core: "0" },
        { description: "16.9 oz bottled soda", price: "2.54", warrantyPrice: "4.54", core: "0" },
        { description: "180 day warranty", price: "253.69", warrantyPrice: "273.69", core: "0" },
        { description: "240 day warranty", price: "281.88", warrantyPrice: "301.88", core: "0" },
        { description: "30 day warranty", price: "112.75", warrantyPrice: "132.75", core: "0" },
        { description: "300 day warranty", price: "338.25", warrantyPrice: "358.25", core: "0" },
        { description: "360 day warranty", price: "394.63", warrantyPrice: "414.63", core: "0" },
        { description: "60 day warranty", price: "140.94", warrantyPrice: "160.94", core: "0" },
        { description: "90 day warranty", price: "169.13", warrantyPrice: "189.13", core: "0" },
        { description: "a/c clutch", price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        { description: "a/c compressor", price: "67.59", warrantyPrice: "72.59", core: "5.62" },
        { description: "a/c condenser", price: "23.65", warrantyPrice: "26.65", core: "4.68" },
        { description: "a/c evaporator housing", price: "19.7", warrantyPrice: "22.7", core: "0" },
        { description: "a/c evaporator", price: "22.34", warrantyPrice: "25.34", core: "4.68" },
        { description: "a/c hose - single", price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        { description: "a/c hose-double", price: "22.34", warrantyPrice: "25.34", core: "1.87" },
        { description: "abs pump", price: "44.68", warrantyPrice: "49.68", core: "5.62" },
        { description: "ac drier", price: "10.51", warrantyPrice: "12.51", core: "0.94" },
        { description: "ac knob", price: "2.63", warrantyPrice: "4.63", core: "0" },
        { description: "aftermarket cd player", price: "1.33", warrantyPrice: "3.33", core: "0" },
        { description: "air bags", price: "42.17", warrantyPrice: "47.17", core: "0" },
        { description: "air cleaner assembly", price: "22.34", warrantyPrice: "25.34", core: "1.87" },
        { description: "air cleaner lid", price: "14.45", warrantyPrice: "17.45", core: "0" },
        { description: "air duct", price: "6.2", warrantyPrice: "8.2", core: "0" },
        { description: "air filter", price: "5.25", warrantyPrice: "7.25", core: "0" },
        { description: "air flow meter", price: "32.86", warrantyPrice: "36.86", core: "0" },
        { description: "air ride pump", price: "59.13", warrantyPrice: "64.13", core: "0" },
        { description: "all you can carry", price: "93.02", warrantyPrice: "103.02", core: "0" },
        { description: "alternator", price: "37.52", warrantyPrice: "42.52", core: "4.68" },
        { description: "antenna manual", price: "3.95", warrantyPrice: "5.95", core: "0" },
        { description: "antenna power", price: "19.7", warrantyPrice: "22.7", core: "0" },
        { description: "arm rest", price: "9.19", warrantyPrice: "11.19", core: "0" },
        { description: "ash tray", price: "5.25", warrantyPrice: "7.25", core: "0" },
        { description: "axle assembly - car", price: "128.76", warrantyPrice: "148.76", core: "16.86" },
        { description: "axle assembly - truck", price: "290.39", warrantyPrice: "310.39", core: "28.1" },
        { description: "axle beam-trailing", price: "53.86", warrantyPrice: "58.86", core: "5.62" },
        { description: "axle dropout", price: "88.04", warrantyPrice: "98.04", core: "3.75" },
        { description: "axle housing-bare car", price: "80.13", warrantyPrice: "90.13", core: "5.62" },
        { description: "axle housing-bare truck", price: "115.6", warrantyPrice: "135.6", core: "5.62" },
        { description: "axle shaft fwd/4wd", price: "47.3", warrantyPrice: "52.3", core: "2.81" },
        { description: "axle shaft rear rwd", price: "52.55", warrantyPrice: "57.55", core: "2.81" },
        { description: "back glass car", price: "44.68", warrantyPrice: "49.68", core: "0" },
        { description: "back glass truck/suv", price: "70.95", warrantyPrice: "75.95", core: "0" },
        { description: "backing plate", price: "13.14", warrantyPrice: "16.14", core: "0" },
        { description: "ball joint", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "battery box/tray", price: "11.83", warrantyPrice: "13.83", core: "0" },
        { description: "battery/amp cable", price: "1.33", warrantyPrice: "3.33", core: "0" },
        { description: "bearing (any)", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "bed liner", price: "39.42", warrantyPrice: "44.42", core: "0" },
        { description: "bed rail pair", price: "22.34", warrantyPrice: "25.34", core: "0" },
        { description: "bellhousing", price: "23.65", warrantyPrice: "26.65", core: "0.94" },
        { description: "belt tensioner", price: "18.4", warrantyPrice: "21.4", core: "0" },
        { description: "bench seat truck suv", price: "81.46", warrantyPrice: "91.46", core: "0" },
        { description: "blend door actuator", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "blower motor", price: "19.7", warrantyPrice: "22.7", core: "0.94" },
        { description: "blower motor resistor", price: "9.19", warrantyPrice: "11.19", core: "0" },
        { description: "bracket", price: "14.45", warrantyPrice: "17.45", core: "0" },
        { description: "brake abs controller", price: "82.77", warrantyPrice: "92.77", core: "0" },
        { description: "brake booster", price: "22.34", warrantyPrice: "25.34", core: "2.81" },
        { description: "brake booster hyd", price: "48.61", warrantyPrice: "53.61", core: "2.81" },
        { description: "brake booster vac", price: "22.34", warrantyPrice: "25.34", core: "2.81" },
        { description: "brake caliper car", price: "14.45", warrantyPrice: "17.45", core: "2.81" },
        { description: "brake caliper truck", price: "22.34", warrantyPrice: "25.34", core: "1.87" },
        { description: "brake drum w/hub", price: "43.36", warrantyPrice: "48.36", core: "3.75" },
        { description: "brake drum (no hub)", price: "19.7", warrantyPrice: "22.7", core: "2.81" },
        { description: "brake fluid resevoir", price: "9.19", warrantyPrice: "11.19", core: "0" },
        { description: "brake hose/line", price: "10.14", warrantyPrice: "12.14", core: "0" },
        { description: "brake master cylinder", price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        { description: "brake proportioning valve", price: "14.45", warrantyPrice: "17.45", core: "0" },
        { description: "brake rotor car", price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        { description: "brake rotor-truck/suv", price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        { description: "brake shoe/pad", price: "2.63", warrantyPrice: "4.63", core: "0" },
        { description: "brush/grille guard", price: "74.89", warrantyPrice: "84.89", core: "4.68" },
        { description: "bulbs", price: "1.33", warrantyPrice: "3.33", core: "0" },
        { description: "bumper assembly-front", price: "72.27", warrantyPrice: "77.27", core: "1.87" },
        { description: "bumper assembly-rear", price: "82.77", warrantyPrice: "92.77", core: "1.87" },
        { description: "bumper bracket", price: "18.01", warrantyPrice: "21.01", core: "0.94" },
        { description: "bumper cover", price: "56.48", warrantyPrice: "61.48", core: "0" },
        { description: "bumper end cap", price: "15.77", warrantyPrice: "18.77", core: "0" },
        { description: "bumper filler", price: "14.45", warrantyPrice: "17.45", core: "0" },
        { description: "bumper guard", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "bumper reinforcement", price: "28.91", warrantyPrice: "32.91", core: "0" },
        { description: "bumper shock", price: "11.83", warrantyPrice: "13.83", core: "1" },
        { description: "bushing", price: "3.95", warrantyPrice: "5.95", core: "0" },
        { description: "cab only bare", price: "253.57", warrantyPrice: "273.57", core: "15.93" },
        { description: "cable (any)", price: "11.83", warrantyPrice: "13.83", core: "0" },
        { description: "cam shaft", price: "28.91", warrantyPrice: "32.91", core: "0.94" },
        { description: "camper shell", price: "150.07", warrantyPrice: "170.07", core: "0" },
        { description: "car/van engine no accessories", price: "299.55", warrantyPrice: "319.55", core: "49.65" },
        { description: "car/van engine with accessories", price: "374.44", warrantyPrice: "394.44", core: "49.65" },
        { description: "carburetor", price: "30.23", warrantyPrice: "34.23", core: "1.87" },
        { description: "carpet", price: "22.34", warrantyPrice: "25.34", core: "0" },
        { description: "carrier bearing", price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        { description: "cart rental", price: "3.95", warrantyPrice: "5.95", core: "0" },
        { description: "cd player", price: "31.52", warrantyPrice: "35.52", core: "0" },
        { description: "center link", price: "18.4", warrantyPrice: "21.4", core: "0.94" },
        { description: "charcoal canister", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "cigarette lighter", price: "2.63", warrantyPrice: "4.63", core: "0" },
        { description: "clock", price: "6.57", warrantyPrice: "8.57", core: "0" },
        { description: "clock spring/signal switch", price: "27.58", warrantyPrice: "31.58", core: "0" },
        { description: "clutch disc", price: "14.45", warrantyPrice: "17.45", core: "0" },
        { description: "clutch fork", price: "13.14", warrantyPrice: "16.14", core: "0" },
        { description: "clutch master cylinder", price: "17.08", warrantyPrice: "20.08", core: "1.87" },
        { description: "clutch pressure plate", price: "15.77", warrantyPrice: "18.77", core: "1.87" },
        { description: "clutch slave cylinder", price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        { description: "clutch throwout bearing", price: "5.25", warrantyPrice: "7.25", core: "0" },
        { description: "coil pack/ignition module", price: "52.53", warrantyPrice: "57.53", core: "0" },
        { description: "coil spring", price: "14.45", warrantyPrice: "17.45", core: "0.94" },
        { description: "computer brain box", price: "40.73", warrantyPrice: "45.73", core: "1.87" },
        { description: "console", price: "27.01", warrantyPrice: "31.01", core: "0" },
        { description: "console lid", price: "18.01", warrantyPrice: "21.01", core: "0.37" },
        { description: "control arm", price: "19.7", warrantyPrice: "22.7", core: "0.94" },
        { description: "convertible top", price: "56.48", warrantyPrice: "61.48", core: "0" },
        { description: "cowl vent panel", price: "11.83", warrantyPrice: "13.83", core: "0" },
        { description: "crankshaft", price: "45.98", warrantyPrice: "50.98", core: "1.87" },
        { description: "crossmember k frame", price: "60.43", warrantyPrice: "65.43", core: "2.81" },
        { description: "cup holder", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "c-v axle front drive", price: "38.1", warrantyPrice: "43.1", core: "5.62" },
        { description: "cylinder head", price: "148.46", warrantyPrice: "168.46", core: "20.61" },
        { description: "dash pad", price: "22.34", warrantyPrice: "25.34", core: "0" },
        { description: "diesel injector", price: "36.79", warrantyPrice: "41.79", core: "5.62" },
        { description: "diesel pump", price: "112.56", warrantyPrice: "122.56", core: "0" },
        { description: "differential carrier", price: "95.91", warrantyPrice: "105.91", core: "5.62" },
        { description: "differential cover", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "distributor", price: "63.05", warrantyPrice: "68.05", core: "1.87" },
        { description: "door glass (truck/van)", price: "39.42", warrantyPrice: "44.42", core: "0" },
        { description: "door glass car", price: "28.91", warrantyPrice: "32.91", core: "0" },
        { description: "door handle inside", price: "9.19", warrantyPrice: "11.19", core: "0" },
        { description: "door handle outside", price: "14.09", warrantyPrice: "17.09", core: "0" },
        { description: "door hinge/latch", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "door lock actuator", price: "13.14", warrantyPrice: "16.14", core: "0" },
        { description: "door shell (car)", price: "73.57", warrantyPrice: "83.57", core: "5.62" },
        { description: "door shell (truck/suv)", price: "94.59", warrantyPrice: "104.59", core: "5.62" },
        { description: "door trim panel", price: "21.03", warrantyPrice: "24.03", core: "0" },
        { description: "drive shaft", price: "28.91", warrantyPrice: "32.91", core: "0.94" },
        { description: "egr valve", price: "15.77", warrantyPrice: "18.77", core: "0" },
        { description: "electronic throttle body", price: "42.03", warrantyPrice: "47.03", core: "1.87" },
        { description: "electric rack and pinion", price: "118.38", warrantyPrice: "138.38", core: "6.75" },
        { description: "emblem", price: "6.57", warrantyPrice: "8.57", core: "0" },
        { description: "engine block", price: "152.4", warrantyPrice: "172.4", core: "26.23" },
        { description: "engine cradle", price: "52.55", warrantyPrice: "57.55", core: "4.68" },
        { description: "engine mount", price: "20.46", warrantyPrice: "23.46", core: "0.94" },
        { description: "engine with accessories car", price: "373.66", warrantyPrice: "393.66", core: "75" },
        { description: "engine without accessories truck", price: "421.67", warrantyPrice: "441.67", core: "79.99" },
        { description: "exhaust manifold", price: "23.65", warrantyPrice: "26.65", core: "0.94" },
        { description: "fan blade", price: "11.83", warrantyPrice: "13.83", core: "0" },
        { description: "fan clutch", price: "13.51", warrantyPrice: "16.51", core: "0" },
        { description: "electric fan", price: "23.65", warrantyPrice: "26.65", core: "0" },
        { description: "fender car", price: "51.23", warrantyPrice: "56.23", core: "1.87" },
        { description: "fender truck/suv/van", price: "70.95", warrantyPrice: "75.95", core: "1.87" },
        { description: "flat bed", price: "372.08", warrantyPrice: "392.08", core: "0" },
        { description: "flywheel", price: "18.4", warrantyPrice: "21.4", core: "0.94" },
        { description: "foglight", price: "15.77", warrantyPrice: "18.77", core: "0" },
        { description: "front axle assembly 4x4", price: "227.3", warrantyPrice: "247.3", core: "25.29" },
        { description: "front differential", price: "187.88", warrantyPrice: "207.88", core: "23.42" },
        { description: "front end car", price: "525.53", warrantyPrice: "545.53", core: "0" },
        { description: "front end truck", price: "608.3", warrantyPrice: "628.3", core: "0" },
        { description: "fuel filler door", price: "6.57", warrantyPrice: "8.57", core: "0" },
        { description: "fuel injector", price: "5.25", warrantyPrice: "7.25", core: "0" },
        { description: "fuel pump with sending unit", price: "52.53", warrantyPrice: "57.53", core: "2.12" },
        { description: "fuel pump-electric", price: "23.65", warrantyPrice: "26.65", core: "0" },
        { description: "fuel rail", price: "44.68", warrantyPrice: "49.68", core: "0.94" },
        { description: "fuel tank", price: "15.77", warrantyPrice: "18.77", core: "0" },
        { description: "fuse", price: "0.56", warrantyPrice: "0.56", core: "0" },
        { description: "fuse box", price: "21.03", warrantyPrice: "24.03", core: "0" },
        { description: "gas cap", price: "1.33", warrantyPrice: "3.33", core: "0" },
        { description: "gate fee", price: "3", warrantyPrice: "5", core: "0" },
        { description: "glove box door", price: "11.83", warrantyPrice: "13.83", core: "0" },
        { description: "grille", price: "28.91", warrantyPrice: "32.91", core: "0" },
        { description: "harmonic balancer", price: "21.03", warrantyPrice: "24.03", core: "0.94" },
        { description: "headliner", price: "19.7", warrantyPrice: "22.7", core: "0" },
        { description: "head rest", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "headlamp assembly", price: "51.85", warrantyPrice: "56.85", core: "0" },
        { description: "heater core", price: "7.89", warrantyPrice: "9.89", core: "1.87" },
        { description: "hood car", price: "67.54", warrantyPrice: "72.54", core: "2.81" },
        { description: "hood truck", price: "90.04", warrantyPrice: "100.04", core: "2.81" },
        { description: "horn", price: "6.57", warrantyPrice: "8.57", core: "0" },
        { description: "hub bearing", price: "19.7", warrantyPrice: "22.7", core: "0.94" },
        { description: "hub cap/wheel cover", price: "11.26", warrantyPrice: "13.26", core: "0" },
        { description: "hub truck", price: "36.79", warrantyPrice: "41.79", core: "0.94" },
        { description: "ignition switch", price: "13.14", warrantyPrice: "16.14", core: "0" },
        { description: "instrument cluster", price: "35.47", warrantyPrice: "40.47", core: "0" },
        { description: "intake manifold", price: "28.91", warrantyPrice: "32.91", core: "0.94" },
        { description: "intercooler", price: "60.02", warrantyPrice: "65.02", core: "5.62" },
        { description: "jack", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "knuckle/spindle", price: "40.73", warrantyPrice: "45.73", core: "0.94" },
        { description: "leaf spring", price: "21.03", warrantyPrice: "24.03", core: "5.62" },
        { description: "mass air flow sensor", price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        { description: "mirror interior", price: "6.57", warrantyPrice: "8.57", core: "0" },
        { description: "manual mirror - door", price: "22.54", warrantyPrice: "25.54", core: "0" },
        { description: "power mirror - door", price: "39.45", warrantyPrice: "44.45", core: "0" },
        { description: "motor mount", price: "18.4", warrantyPrice: "21.4", core: "0" },
        { description: "muffler", price: "17.08", warrantyPrice: "20.08", core: "0" },
        { description: "oil cooler", price: "31.38", warrantyPrice: "35.38", core: "0.94" },
        { description: "oil pan", price: "17.08", warrantyPrice: "20.08", core: "0" },
        { description: "oil pump", price: "15.77", warrantyPrice: "18.77", core: "0.94" },
        { description: "oxygen sensor", price: "18.4", warrantyPrice: "21.4", core: "0" },
        { description: "power steering pump", price: "24.95", warrantyPrice: "28.95", core: "2.81" },
        { description: "quarter panel", price: "76.22", warrantyPrice: "86.22", core: "11.24" },
        { description: "rack and pinion", price: "59.75", warrantyPrice: "64.75", core: "3.75" },
        { description: "radiator", price: "66.47", warrantyPrice: "71.47", core: "15" },
        { description: "radiator cap", price: "3", warrantyPrice: "5", core: "0" },
        { description: "radio-cd player", price: "36.79", warrantyPrice: "41.79", core: "0" },
        { description: "radio - non cd", price: "22.34", warrantyPrice: "25.34", core: "0" },
        { description: "running board", price: "30.23", warrantyPrice: "34.23", core: "0" },
        { description: "seat belt", price: "16.91", warrantyPrice: "19.91", core: "0" },
        { description: "seat/car manual", price: "43.41", warrantyPrice: "48.41", core: "0" },
        { description: "seat-car power", price: "59.13", warrantyPrice: "64.13", core: "0" },
        { description: "seat-truck, power", price: "63.05", warrantyPrice: "68.05", core: "0" },
        { description: "sensor", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "shifter", price: "23.65", warrantyPrice: "26.65", core: "0" },
        { description: "shock", price: "11.83", warrantyPrice: "13.83", core: "0.94" },
        { description: "speaker", price: "14.65", warrantyPrice: "17.65", core: "0" },
        { description: "speedometer cluster", price: "42.03", warrantyPrice: "47.03", core: "0" },
        { description: "spindle", price: "34.15", warrantyPrice: "38.15", core: "0" },
        { description: "spoiler", price: "31.52", warrantyPrice: "35.52", core: "0" },
        { description: "starter", price: "28.91", warrantyPrice: "32.91", core: "5.62" },
        { description: "steering column", price: "80.13", warrantyPrice: "90.13", core: "0" },
        { description: "steering gear box - truck", price: "59.13", warrantyPrice: "64.13", core: "10.3" },
        { description: "steering wheel", price: "18.4", warrantyPrice: "21.4", core: "0" },
        { description: "strut assembly", price: "38.1", warrantyPrice: "43.1", core: "0.94" },
        { description: "sun visor", price: "11.26", warrantyPrice: "13.26", core: "0" },
        { description: "sunroof", price: "38.1", warrantyPrice: "43.1", core: "0" },
        { description: "sway bar", price: "14.45", warrantyPrice: "17.45", core: "0" },
        { description: "tail gate", price: "76.22", warrantyPrice: "86.22", core: "3.75" },
        { description: "tail light assembly", price: "24.02", warrantyPrice: "28.02", core: "0" },
        { description: "thermostat housing", price: "23.19", warrantyPrice: "26.19", core: "0.99" },
        { description: "throttle body", price: "45.01", warrantyPrice: "50.01", core: "1.87" },
        { description: "tie rod", price: "9.19", warrantyPrice: "11.19", core: "0" },
        { description: "tire", price: "56.38", warrantyPrice: "61.38", core: "0" },
        { description: "tool box", price: "124.03", warrantyPrice: "144.03", core: "0" },
        { description: "torque converter", price: "21.03", warrantyPrice: "24.03", core: "1.87" },
        { description: "transfer case", price: "176.1", warrantyPrice: "196.1", core: "19.99" },
        { description: "transmission car", price: "194.45", warrantyPrice: "214.45", core: "25.29" },
        { description: "transmission truck/suv/van", price: "280.29", warrantyPrice: "300.29", core: "39.99" },
        { description: "transmission mount", price: "9.19", warrantyPrice: "11.19", core: "1.87" },
        { description: "truck bed bare", price: "299.55", warrantyPrice: "319.55", core: "5.62" },
        { description: "trunk lid", price: "51.23", warrantyPrice: "56.23", core: "2.81" },
        { description: "turbo super charger", price: "68.32", warrantyPrice: "73.32", core: "12.18" },
        { description: "valve cover", price: "20.46", warrantyPrice: "23.46", core: "0" },
        { description: "washer bottle", price: "7.89", warrantyPrice: "9.89", core: "0" },
        { description: "water pump", price: "17.08", warrantyPrice: "20.08", core: "1.87" },
        { description: "wheel aluminum", price: "36.07", warrantyPrice: "41.07", core: "14.99" },
        { description: "wheel steel", price: "24.79", warrantyPrice: "28.79", core: "2" },
        { description: "window motor", price: "15.77", warrantyPrice: "18.77", core: "1.87" },
        { description: "window regulator with motor", price: "34.15", warrantyPrice: "38.15", core: "0.94" },
        { description: "windshield", price: "31.52", warrantyPrice: "35.52", core: "0" },
        { description: "wiper motor", price: "19.7", warrantyPrice: "22.7", core: "1.87" }
    ];

    // --- END OF NEW DATA ---

    let currentLanguage = 'en';
    let inventoryData = [];
    let isOpen = false;
    
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
            .lg-chatbot-button { position: fixed !important; bottom: 30px !important; right: 30px !important; width: 80px !important; height: 80px !important; border-radius: 50% !important; cursor: pointer !important; box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4) !important; display: flex !important; align-items: center !important; justify-content: center !important; transition: all 0.3s ease !important; z-index: 99999 !important; border: 3px solid #4a8b6b !important; background: white !important; overflow: hidden !important; animation: lg-pulse 2s infinite !important; }
            .lg-chatbot-button img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
            @keyframes lg-pulse { 0% { box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4); } 50% { box-shadow: 0 10px 40px rgba(74, 139, 107, 0.6); } 100% { box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4); } }
            .lg-chatbot-button:hover { transform: scale(1.1) !important; border-color: #5fa77f !important; }
            .lg-chat-container { position: fixed !important; bottom: 120px !important; right: 30px !important; width: 400px !important; height: 600px !important; background: #0a0a0a !important; border-radius: 20px !important; border: 2px solid #4a8b6b !important; box-shadow: 0 20px 60px rgba(74, 139, 107, 0.3) !important; display: none !important; flex-direction: column !important; overflow: hidden !important; z-index: 99998 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
            .lg-chat-container.lg-active { display: flex !important; animation: lg-slideUp 0.3s ease !important; }
            @keyframes lg-slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .lg-chat-header { background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important; padding: 15px 20px !important; color: white !important; display: flex !important; justify-content: space-between !important; align-items: center !important; border-bottom: 2px solid #5fa77f !important; }
            .lg-chat-title { display: flex !important; align-items: center !important; gap: 10px !important; }
            .lg-bot-avatar { width: 45px !important; height: 45px !important; background: white !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; border: 2px solid rgba(255, 255, 255, 0.3) !important; overflow: hidden !important; }
            .lg-bot-avatar img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
            .lg-chat-header h3 { margin: 0 !important; font-size: 20px !important; font-weight: 700 !important; text-shadow: 1px 1px 2px rgba(0,0,0,0.2) !important; }
            .lg-chat-status { font-size: 11px !important; opacity: 0.95 !important; display: flex !important; align-items: center !important; gap: 5px !important; }
            .lg-status-dot { width: 6px !important; height: 6px !important; background: #4ade80 !important; border-radius: 50% !important; animation: lg-blink 2s infinite !important; }
            @keyframes lg-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
            .lg-header-controls { display: flex !important; align-items: center !important; gap: 10px !important; }
            .lg-lang-switch { display: flex !important; background: rgba(255, 255, 255, 0.2) !important; border-radius: 20px !important; padding: 2px !important; }
            .lg-lang-btn { padding: 4px 10px !important; background: transparent !important; border: none !important; color: white !important; font-size: 12px !important; font-weight: 600 !important; cursor: pointer !important; border-radius: 18px !important; transition: all 0.3s ease !important; }
            .lg-lang-btn.active { background: white !important; color: #4a8b6b !important; }
            .lg-close-chat { background: none !important; border: none !important; color: white !important; font-size: 24px !important; cursor: pointer !important; padding: 0 !important; line-height: 1 !important; opacity: 0.9 !important; transition: all 0.3s ease !important; }
            .lg-close-chat:hover { opacity: 1 !important; transform: scale(1.1) !important; }
            .lg-chat-messages { flex: 1 !important; overflow-y: auto !important; padding: 20px !important; display: flex !important; flex-direction: column !important; gap: 15px !important; background: #0a0a0a !important; }
            .lg-chat-messages::-webkit-scrollbar { width: 6px !important; }
            .lg-chat-messages::-webkit-scrollbar-track { background: rgba(74, 139, 107, 0.1) !important; }
            .lg-chat-messages::-webkit-scrollbar-thumb { background: #4a8b6b !important; border-radius: 3px !important; }
            .lg-message { max-width: 80% !important; word-wrap: break-word !important; animation: lg-fadeIn 0.3s ease !important; }
            @keyframes lg-fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .lg-user-message { align-self: flex-end !important; background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important; color: white !important; padding: 12px 16px !important; border-radius: 18px 18px 4px 18px !important; }
            .lg-bot-message { align-self: flex-start !important; background: #1a1a1a !important; color: #e0e0e0 !important; padding: 12px 16px !important; border-radius: 18px 18px 18px 4px !important; border: 1px solid #222 !important; line-height: 1.6 !important; }
            .lg-typing-indicator { display: none !important; align-self: flex-start !important; padding: 15px !important; background: #1a1a1a !important; border-radius: 18px !important; border: 1px solid #222 !important; }
            .lg-typing-indicator.lg-active { display: block !important; }
            .lg-typing-dot { display: inline-block !important; width: 8px !important; height: 8px !important; background: #4a8b6b !important; border-radius: 50% !important; margin: 0 2px !important; animation: lg-typing 1.4s infinite !important; }
            .lg-typing-dot:nth-child(2) { animation-delay: 0.2s !important; }
            .lg-typing-dot:nth-child(3) { animation-delay: 0.4s !important; }
            @keyframes lg-typing { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-10px); } }
            .lg-quick-actions { padding: 10px !important; background: #111 !important; display: flex !important; gap: 8px !important; flex-wrap: wrap !important; border-top: 1px solid #222 !important; }
            .lg-quick-action { padding: 8px 12px !important; background: rgba(74, 139, 107, 0.2) !important; border: 1px solid #4a8b6b !important; border-radius: 20px !important; color: #4a8b6b !important; font-size: 12px !important; cursor: pointer !important; transition: all 0.3s ease !important; font-weight: 500 !important; }
            .lg-quick-action:hover { background: #4a8b6b !important; color: white !important; transform: translateY(-2px) !important; }
            .lg-chat-input-container { padding: 15px 20px !important; background: #111 !important; display: flex !important; gap: 10px !important; border-top: 1px solid #222 !important; }
            .lg-chat-input { flex: 1 !important; padding: 12px 16px !important; background: #1a1a1a !important; border: 1px solid #333 !important; border-radius: 25px !important; color: white !important; font-size: 14px !important; outline: none !important; transition: all 0.3s ease !important; }
            .lg-chat-input:focus { border-color: #4a8b6b !important; box-shadow: 0 0 0 2px rgba(74, 139, 107, 0.2) !important; }
            .lg-send-button { width: 45px !important; height: 45px !important; background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important; border: none !important; border-radius: 50% !important; color: white !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 20px !important; transition: all 0.3s ease !important; }
            .lg-send-button:hover { transform: scale(1.1) !important; box-shadow: 0 5px 15px rgba(74, 139, 107, 0.4) !important; }
            @media (max-width: 480px) { .lg-chat-container { width: 100% !important; height: 100% !important; right: 0 !important; bottom: 0 !important; border-radius: 0 !important; max-width: 100vw !important; } .lg-chatbot-button { bottom: 20px !important; right: 20px !important; width: 70px !important; height: 70px !important; } }
        `;
        document.head.appendChild(style);
    }
    
    function createChatbotHTML() {
        const t = TRANSLATIONS[currentLanguage];
        const chatHTML = `
            <button class="lg-chatbot-button" id="lgChatButton"><img src="${CONFIG.BOT_IMAGE}" alt="${CONFIG.BOT_NAME}"></button>
            <div class="lg-chat-container" id="lgChatContainer">
                <div class="lg-chat-header">
                    <div class="lg-chat-title">
                        <div class="lg-bot-avatar"><img src="${CONFIG.BOT_IMAGE}" alt="${CONFIG.BOT_NAME}"></div>
                        <div>
                            <h3>${CONFIG.BOT_NAME}</h3>
                            <div class="lg-chat-status"><span class="lg-status-dot"></span><span id="lgStatusText">${t.online}</span></div>
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
                <div class="lg-typing-indicator" id="lgTypingIndicator"><span class="lg-typing-dot"></span><span class="lg-typing-dot"></span><span class="lg-typing-dot"></span></div>
                <div class="lg-quick-actions" id="lgQuickActions"></div>
                <div class="lg-chat-input-container">
                    <input type="text" class="lg-chat-input" id="lgChatInput" placeholder="${t.typePlaceholder}" />
                    <button class="lg-send-button" id="lgSendButton">➤</button>
                </div>
            </div>`;
        const chatDiv = document.createElement('div');
        chatDiv.innerHTML = chatHTML;
        document.body.appendChild(chatDiv);
        showWelcomeMessage();
        updateQuickActions();
    }

    function detectUserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang && browserLang.toLowerCase().startsWith('es')) {
            updateLanguage('es');
        }
    }

    function updateLanguage(lang) {
        currentLanguage = lang;
        const t = TRANSLATIONS[lang];
        document.getElementById('lgStatusText').textContent = t.online;
        document.getElementById('lgChatInput').placeholder = t.typePlaceholder;
        document.querySelectorAll('.lg-lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
        updateQuickActions();
    }

    function showWelcomeMessage() {
        const t = TRANSLATIONS[currentLanguage];
        const welcomeMsg = `${t.welcome}<br><br>${t.tagline}<br><br>${t.helpWith}<br>${t.findVehicles}<br>${t.checkPrices}<br>${t.getDirections}<br>${t.storeInfo}<br><br>${t.whatHelp}`;
        addMessage(welcomeMsg, 'bot');
    }

    function updateQuickActions() {
        const t = TRANSLATIONS[currentLanguage];
        const quickActionsDiv = document.getElementById('lgQuickActions');
        quickActionsDiv.innerHTML = `
            <button class="lg-quick-action" data-message="${t.storeHours}">${t.storeHours}</button>
            <button class="lg-quick-action" data-message="${t.checkInventory}">${t.checkInventory}</button>
            <button class="lg-quick-action" data-message="${t.partsPrices}">${t.partsPrices}</button>
            <button class="lg-quick-action" data-message="${t.directions}">${t.directions}</button>`;
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
        document.getElementById('lgChatInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
        document.querySelectorAll('.lg-lang-btn').forEach(btn => {
            btn.addEventListener('click', () => { updateLanguage(btn.dataset.lang); });
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
                row: asset.getElementsByTagName("VEHICLE_ROW")[0]?.textContent || "",
                color: asset.getElementsByTagName("COLOR")[0]?.textContent || "",
            }));
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
            processMessage(message).then(response => addMessage(response, 'bot'));
        }, 1000);
    }

    // --- NEW: Price Search Function ---
    function searchPrices(query) {
        const cleanedQuery = query.toLowerCase().replace(/ies$/, 'y').replace(/s$/, '').trim();
        if (cleanedQuery.length < 3) return null;
        const result = priceListData.find(item => item.description.includes(cleanedQuery));
        return result;
    }
    
    // --- NEW: Identify Part Keywords ---
    function getPartKeyword(query) {
        const cleanedQuery = query.toLowerCase();
        const part = priceListData.find(p => cleanedQuery.includes(p.description) && p.description.length > 3);
        return part ? part.description : null;
    }
    
    // --- IMPROVED Vehicle Search Function (from original code) ---
    function searchVehicles(searchQuery) { /* ... This long function is unchanged and included at the end ... */ }

    // --- REWRITTEN: Core Message Processing Logic ---
    async function processMessage(msg) {
        const lower = msg.toLowerCase();
        const t = TRANSLATIONS[currentLanguage];
        const hours = CONFIG.HOURS[currentLanguage];
        
        // --- Intent Priority 1: Selling a car ---
        if (lower.includes('sell my car') || lower.includes('sell a car') || lower.includes('get a quote')) {
            return `¡Claro que si! We buy cars, running or not! 🚗💨<br><br>
                You can get an instant quote by filling out the form on our website, or give us a call to talk to a real person.<br><br>
                📋 <a href="${CONFIG.SELL_CAR_URL}" target="_blank" style="color:#4a8b6b;">Get an Instant Quote Online</a><br>
                📞 <a href="tel:${CONFIG.PHONE}" style="color:#4a8b6b;">Call for a Quote: ${CONFIG.PHONE}</a>`;
        }
        
        // --- Intent Priority 2: Buying a whole vehicle ---
        if (lower.includes('for sale') || lower.includes('buy a car') || lower.includes('buy a vehicle')) {
            return `Looking for a whole new ride? Smart move! We have a selection of vehicles for sale.<br><br>
                Check them out right here:<br>
                ➡️ <a href="${CONFIG.VEHICLES_FOR_SALE_URL}" target="_blank" style="color:#4a8b6b;">View Vehicles for Sale</a>`;
        }
        
        // --- Intent Priority 3: Specific Part Price Inquiry ---
        if (lower.includes('how much') || lower.includes('price of') || lower.includes('cost of') || (lower.includes('price') && !lower.includes('prices'))) {
            const part = searchPrices(lower);
            if (part) {
                let response = `El Loco looked it up for you! Here's the deal on a <strong>${part.description.toUpperCase()}</strong>:<br><br>
                    • <strong>Base Price:</strong> $${part.price}<br>
                    • <strong>Price with Warranty:</strong> $${part.warrantyPrice}<br>`;
                if (parseFloat(part.core) > 0) {
                    response += `• <strong>Core Charge:</strong> $${part.core} (refundable when you bring back your old part!)<br>`;
                }
                response += `<br>Prices can vary, so be sure to check our full price list for details!`;
                return response;
            }
        }
        
        // --- Intent Priority 4: General Parts Prices ---
        if (lower.includes('price') || lower.includes('precio') || lower.includes('parts list')) {
            return `You want prices? We got prices! So low, they're practically crazy! 🤪<br><br>
                You can see our complete price list on our website. Just click the link below.<br><br>
                💰 <a href="${CONFIG.PARTS_LIST_URL}" target="_blank" style="color:#4a8b6b;">View Full Parts & Price List</a>`;
        }

        // --- Intent Priority 5: Part for a specific vehicle ---
        const partKeyword = getPartKeyword(lower);
        if (partKeyword && searchVehicles(lower).length > 0) {
             const results = searchVehicles(lower);
             let response = `Hold your horses, amigo! We don't inventory individual parts, but I found these matching vehicles in the yard where you might find a <strong>${partKeyword.toUpperCase()}</strong>:<br><br>`;
             const showMax = Math.min(5, results.length);
             for (let i = 0; i < showMax; i++) {
                 const v = results[i];
                 response += `<strong>${v.year} ${v.make} ${v.model}</strong><br>📍 ${t.row} ${v.row} | ${t.stock} #${v.stock}<br><br>`;
             }
             if (results.length > 5) {
                 response += `<em>...and ${results.length - 5} more!</em><br><br>`;
             }
             response += `Bring your tools, pull the part yourself, and save a bundle! For a complete list of all our vehicles, check out our inventory search page:<br>
                ➡️ <a href="${CONFIG.INVENTORY_SEARCH_URL}" target="_blank" style="color:#4a8b6b;">Search Full Inventory</a>`;
             return response;
        }

        // --- Intent Priority 6: General Vehicle Search ---
        if (inventoryData.length === 0) await loadInventoryData();
        const searchResults = searchVehicles(lower);
        if (searchResults.length > 0) {
            let response = `🚗 <strong>${t.foundVehicles}: ${searchResults.length}</strong><br><br>`;
            const showMax = Math.min(10, searchResults.length);
            for (let i = 0; i < showMax; i++) {
                const v = searchResults[i];
                response += `<strong>${v.year} ${v.make} ${v.model}</strong><br>📍 ${t.row} ${v.row} | ${t.stock} #${v.stock}<br>`;
                if (v.color) { response += `🎨 ${t.color}: ${v.color}<br>`; }
                response += `<br>`;
            }
            if (searchResults.length > 10) { response += `<em>...and ${searchResults.length - 10} more!</em><br><br>`; }
            response += `🔧 ${t.bringTools}`;
            return response;
        }

        // --- Intent Priority 7: Basic Info ---
        if (lower.includes('hour') || lower.includes('hora') || lower.includes('open') || lower.includes('abierto')) {
            let response = `📍 <strong>${CONFIG.COMPANY_NAME}</strong><br><br>🕒 <strong>${t.storeHours}:</strong><br>`;
            for (let [day, time] of Object.entries(hours)) { response += `${day}: ${time}<br>`; }
            response += `<br>💵 ${t.gateFee}: ${CONFIG.GATE_FEE}<br>📞 ${t.callUs}: <a href="tel:${CONFIG.PHONE}" style="color:#4a8b6b;">${CONFIG.PHONE}</a>`;
            return response;
        }
        
        if (lower.includes('direction') || lower.includes('dirección') || lower.includes('address')) {
            return `You can't miss us! We're the biggest pile of treasure in East Texas!<br><br>📍 <strong>${CONFIG.ADDRESS}</strong><br><br>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.ADDRESS)}" target="_blank" style="color:#4a8b6b;">🗺️ ${t.getDirectionsLink}</a><br><br>
                📞 ${t.callUs}: <a href="tel:${CONFIG.PHONE}" style="color:#4a8b6b;">${CONFIG.PHONE}</a>`;
        }

        // --- Fallback & Greetings ---
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('hola')) {
            return `Hey there! Welcome to Locos Gringos! I'm El Loco. Why buy new parts when used ones are just as good and way cheaper? What can I help you find today? 🚗`;
        }
        if (lower.includes('thank') || lower.includes('gracias')) {
            return `¡De nada! You're welcome! Come visit us anytime - the gate's only ${CONFIG.GATE_FEE} and the parts are waiting! 🎉`;
        }
        if (lower.includes('how are you')) {
            return `I'm doing great, thanks for asking! Just organizing a few million parts in my head. What can I help you with?`;
        }
        
        // --- Default response ---
        return `I'm not sure about that, amigo. I may not have all the answers, but I do have unlimited dad jokes and info about:<br><br>
               🚗 Finding vehicles (try "Honda Accord" or "2015 Ford F150")<br>
               💰 Parts prices (ask "how much for an alternator?")<br>
               📍 Directions to our yard<br>
               🕒 Store hours<br><br>
               What would you like to know?`;
    }

    function addMessage(content, sender) {
        const messagesDiv = document.getElementById('lgChatMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `lg-message lg-${sender}-message`;
        msgDiv.innerHTML = content;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function searchVehicles(searchQuery) {if (!searchQuery || inventoryData.length === 0) return []; const cleanedQuery = searchQuery.toLowerCase().replace(/do you have any|do you have|got any|any|looking for|need|want|\?/g, '').replace(/chevy/g, 'chevrolet').trim(); if (!cleanedQuery) return []; const initialSearchTerms = cleanedQuery.split(/\s+/).filter(term => term.length > 0); const makeModelPatterns = { 'accord': ['honda', 'accord'], 'civic': ['honda', 'civic'], 'cr-v': ['honda', 'cr-v'], 'pilot': ['honda', 'pilot'], 'odyssey': ['honda', 'odyssey'], 'f-150': ['ford', 'f-150'], 'f150': ['ford', 'f-150'], 'f-250': ['ford', 'f-250'], 'f250': ['ford', 'f-250'], 'f-350': ['ford', 'f-350'], 'f350': ['ford', 'f-350'], 'ranger': ['ford', 'ranger'], 'mustang': ['ford', 'mustang'], 'explorer': ['ford', 'explorer'], 'expedition': ['ford', 'expedition'], 'escape': ['ford', 'escape'], 'fusion': ['ford', 'fusion'], 'focus': ['ford', 'focus'], 'taurus': ['ford', 'taurus'], 'camry': ['toyota', 'camry'], 'corolla': ['toyota', 'corolla'], 'rav4': ['toyota', 'rav4'], 'highlander': ['toyota', 'highlander'], '4runner': ['toyota', '4runner'], 'tacoma': ['toyota', 'tacoma'], 'tundra': ['toyota', 'tundra'], 'sienna': ['toyota', 'sienna'], 'prius': ['toyota', 'prius'], 'challenger': ['dodge', 'challenger'], 'charger': ['dodge', 'charger'], 'durango': ['dodge', 'durango'], 'ram 1500': ['ram', '1500'], 'ram 2500': ['ram', '2500'], 'ram 3500': ['ram', '3500'], 'dakota': ['dodge', 'dakota'], 'journey': ['dodge', 'journey'], 'grand caravan': ['dodge', 'grand caravan'], 'silverado': ['chevrolet', 'silverado'], 'colorado': ['chevrolet', 'colorado'], 'tahoe': ['chevrolet', 'tahoe'], 'suburban': ['chevrolet', 'suburban'], 'traverse': ['chevrolet', 'traverse'], 'equinox': ['chevrolet', 'equinox'], 'trailblazer': ['chevrolet', 'trailblazer'], 'malibu': ['chevrolet', 'malibu'], 'impala': ['chevrolet', 'impala'], 'cruze': ['chevrolet', 'cruze'], 'camaro': ['chevrolet', 'camaro'], 'wrangler': ['jeep', 'wrangler'], 'grand cherokee': ['jeep', 'grand cherokee'], 'cherokee': ['jeep', 'cherokee'], 'compass': ['jeep', 'compass'], 'renegade': ['jeep', 'renegade'], 'gladiator': ['jeep', 'gladiator'], 'altima': ['nissan', 'altima'], 'maxima': ['nissan', 'maxima'], 'sentra': ['nissan', 'sentra'], 'versa': ['nissan', 'versa'], 'rogue': ['nissan', 'rogue'], 'murano': ['nissan', 'murano'], 'pathfinder': ['nissan', 'pathfinder'], 'frontier': ['nissan', 'frontier'], 'titan': ['nissan', 'titan'], 'gt-r': ['nissan', 'gt-r'] }; const enhancedTerms = new Set(initialSearchTerms); initialSearchTerms.forEach(term => { if (makeModelPatterns[term]) { makeModelPatterns[term].forEach(t => enhancedTerms.add(t)); if (term.endsWith('s') && term.length > 1) { enhancedTerms.delete(term); } } }); const finalSearchTerms = Array.from(enhancedTerms); let results = inventoryData.filter(vehicle => { const vehicleString = `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase(); const vehicleStringNoDash = vehicleString.replace(/-/g, ''); return finalSearchTerms.every(term => { const termNoDash = term.replace(/-/g, ''); return vehicleString.includes(term) || vehicleStringNoDash.includes(termNoDash); }); }); if (results.length === 0 && initialSearchTerms.length > 0) { results = inventoryData.filter(vehicle => { const vehicleString = `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase(); const matchCount = initialSearchTerms.filter(term => vehicleString.includes(term)).length; return matchCount > 0 && matchCount >= Math.ceil(initialSearchTerms.length / 2); }); } return results; }

})();
</script>
