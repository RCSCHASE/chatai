<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Loco Chatbot - Locos Gringos Pick-N-Pull</title>
</head>
<body>

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
        script.src = 'https://cdn.jsdelivr.net/gh/yourusername/locos-gringos-chatbot@latest/el-loco-chatbot.min.js'; // Make sure this URL is correct
        script.async = true;
        document.body.appendChild(script);
    }
})();
</script>

<script>
// El Loco Chatbot - Locos Gringos Pick-N-Pull
// Version 5.0 - Updated with Full Price List and Improved Vehicle Search
// Author: Locos Gringos Development Team & Gemini AI

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
        GATE_FEE: '$2.00', // Updated based on price list
        WEBSITE: 'https://locosgringospicknpull.com',
        PARTS_LIST_URL: 'https://www.locosgringospicknpull.com/parts-list',
        INVENTORY_SEARCH_URL: 'https://www.locosgringospicknpull.com/search-inventory',
        VEHICLES_FOR_SALE_URL: 'https://www.locosgringospicknpull.com/vehicles-for-sale',
        SELL_CAR_URL: 'https://www.locosgringospicknpull.com/sell-my-car-1',
        HOURS_URL: 'https://www.locosgringospicknpull.com/info',
        VIP_REWARDS_TEXT_PROGRAM_URL: 'https://www.locosgringospicknpull.com/text-alerts-new-arrivals',
        NEW_ARRIVALS_URL: 'https://www.locosgringospicknpull.com/new-arrivals',
        UPCOMING_SALES_URL: 'https://www.locosgringospicknpull.com/loco-upcoming-sales-dates-info',
        CONTACT_URL: 'https://www.locosgringospicknpull.com/contact', 
        WORK_AT_LOCOS_URL: 'https://www.locosgringospicknpull.com/jobs',
        
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
    // COMPLETE PARTS PRICE LIST (*** NEW - UPDATED FROM PDF ***)
    // ========================
    const PARTS_PRICES = {
        "complete vehicle": { price: "1691.25", warrantyPrice: "1711.25", core: "0" },
        "1/4 ratchet set": { price: "31.01", warrantyPrice: "35.01", core: "0" },
        "46 piece set": { price: "43.41", warrantyPrice: "48.41", core: "0" },
        "plier wrench set": { price: "37.21", warrantyPrice: "42.21", core: "0" },
        "screwdriver set": { price: "21.7", warrantyPrice: "24.7", core: "0" },
        "pb blaster spray": { price: "12.4", warrantyPrice: "15.4", core: "0" },
        "sdriver bit set": { price: "37.21", warrantyPrice: "42.21", core: "0" },
        "drill bit set": { price: "37.21", warrantyPrice: "42.21", core: "0" },
        "ratchet bit set": { price: "37.21", warrantyPrice: "42.21", core: "0" },
        "wd-40": { price: "12.4", warrantyPrice: "15.4", core: "0" },
        "screwdriver kit": { price: "27.29", warrantyPrice: "31.29", core: "0" },
        "mallet hammer": { price: "18.6", warrantyPrice: "21.6", core: "0" },
        "3/8 socket set": { price: "37.21", warrantyPrice: "42.21", core: "0" },
        "large gloves": { price: "4.96", warrantyPrice: "6.96", core: "0" },
        "x-large gloves": { price: "4.96", warrantyPrice: "6.96", core: "0" },
        "vice scripts": { price: "24.81", warrantyPrice: "28.81", core: "0" },
        "1/2 ratchet set": { price: "37.21", warrantyPrice: "42.21", core: "0" },
        "razor blades": { price: "18.6", warrantyPrice: "21.6", core: "0" },
        "torx star bitset": { price: "18.6", warrantyPrice: "21.6", core: "0" },
        "hammer": { price: "18.6", warrantyPrice: "21.6", core: "0" },
        "torx tool set": { price: "24.81", warrantyPrice: "28.81", core: "0" },
        "vice script set": { price: "37.21", warrantyPrice: "42.21", core: "0" },
        "$15 tool": { price: "18.6", warrantyPrice: "21.6", core: "0" },
        "07 08 chevy tran 6.0": { price: "1691.25", warrantyPrice: "1711.25", core: "450" },
        "07-13 chevy eng 4.3l": { price: "1127.5", warrantyPrice: "1147.5", core: "150" },
        "07-13 chevy eng 5.3l": { price: "1127.5", warrantyPrice: "1147.5", core: "200" },
        "1 year battery": { price: "54.94", warrantyPrice: "59.94", core: "12.01" },
        "12 oz can soda": { price: "1.41", warrantyPrice: "3.41", core: "0" },
        "120 day warranty 4m": { price: "197.31", warrantyPrice: "217.31", core: "0" },
        "150 day warranty 5m": { price: "225.5", warrantyPrice: "245.5", core: "0" },
        "16.9 oz bottled soda": { price: "2.54", warrantyPrice: "4.54", core: "0" },
        "180 day warranty 6m": { price: "253.69", warrantyPrice: "273.69", core: "0" },
        "2011 dodge 3500 tr": { price: "2818.75", warrantyPrice: "2838.75", core: "1000" },
        "240 day warranty 8m": { price: "281.88", warrantyPrice: "301.88", core: "0" },
        "30 day warranty 1m": { price: "112.75", warrantyPrice: "132.75", core: "0" },
        "300 day warranty 10m": { price: "338.25", warrantyPrice: "358.25", core: "0" },
        "360 day warranty 1yr": { price: "394.63", warrantyPrice: "414.63", core: "0" },
        "60 day warranty 2m": { price: "140.94", warrantyPrice: "160.94", core: "0" },
        "90 day warranty 3m": { price: "169.13", warrantyPrice: "189.13", core: "0" },
        "a/c clutch": { price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        "a/c compressor": { price: "67.59", warrantyPrice: "72.59", core: "5.62" },
        "a/c condenser": { price: "23.65", warrantyPrice: "26.65", core: "4.68" },
        "a/c evaporat hsg": { price: "19.7", warrantyPrice: "22.7", core: "0" },
        "a/c evaporator": { price: "22.34", warrantyPrice: "25.34", core: "4.68" },
        "a/c hose -single": { price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        "a/c hose-double": { price: "22.34", warrantyPrice: "25.34", core: "1.87" },
        "abs pump": { price: "44.68", warrantyPrice: "49.68", core: "5.62" },
        "ac drier": { price: "10.51", warrantyPrice: "12.51", core: "0.94" },
        "ac knob": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "aft. mkt.cd player": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "air bags": { price: "42.17", warrantyPrice: "47.17", core: "0" },
        "air cleaner assbly": { price: "22.34", warrantyPrice: "25.34", core: "1.87" },
        "air cleaner lid": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "air duct": { price: "6.2", warrantyPrice: "8.2", core: "0" },
        "air filter": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "air flow meter": { price: "32.86", warrantyPrice: "36.86", core: "0" },
        "air ride pump": { price: "59.13", warrantyPrice: "64.13", core: "0" },
        "alani energy drink": { price: "3.38", warrantyPrice: "5.38", core: "0" },
        "all u can carry w/en": { price: "279.06", warrantyPrice: "299.06", core: "75" },
        "all u can carry w/tr": { price: "93.02", warrantyPrice: "103.02", core: "25" },
        "all you can carry": { price: "93.02", warrantyPrice: "103.02", core: "0" },
        "alternator": { price: "37.52", warrantyPrice: "42.52", core: "4.68" },
        "antenna/manual": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "antenna/power": { price: "19.7", warrantyPrice: "22.7", core: "0" },
        "arm rest": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "ash tray": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "axle assy - car": { price: "128.76", warrantyPrice: "148.76", core: "16.86" },
        "axle assy - truck": { price: "290.39", warrantyPrice: "310.39", core: "28.1" },
        "axle beam-trailing": { price: "53.86", warrantyPrice: "58.86", core: "5.62" },
        "axle dropout": { price: "88.04", warrantyPrice: "98.04", core: "3.75" },
        "axle hsg-bare car": { price: "80.13", warrantyPrice: "90.13", core: "5.62" },
        "axle hsg-bare trk": { price: "115.6", warrantyPrice: "135.6", core: "5.62" },
        "axle shaft fwd/4wd": { price: "47.3", warrantyPrice: "52.3", core: "2.81" },
        "axle shaft rear rwd": { price: "52.55", warrantyPrice: "57.55", core: "2.81" },
        "back glass car": { price: "44.68", warrantyPrice: "49.68", core: "0" },
        "back glass truck/suv": { price: "70.95", warrantyPrice: "75.95", core: "0" },
        "backing plate": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "balanceshaft sub ass": { price: "49.6", warrantyPrice: "54.6", core: "0" },
        "ball joint": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "battery box/tray": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "battery/amp cable": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "bearing (any)": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "bed liner": { price: "39.42", warrantyPrice: "44.42", core: "0" },
        "bed rail pair": { price: "22.34", warrantyPrice: "25.34", core: "0" },
        "bellhousing": { price: "23.65", warrantyPrice: "26.65", core: "0.94" },
        "belt tensioner": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "bench seat trk suv v": { price: "81.46", warrantyPrice: "91.46", core: "0" },
        "blend door actuator": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "blower motor": { price: "19.7", warrantyPrice: "22.7", core: "0.94" },
        "blower mtr resistor": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "bracket alum>0-6": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "bracket steel>6-12": { price: "12.76", warrantyPrice: "15.76", core: "0" },
        "brake abs controller": { price: "82.77", warrantyPrice: "92.77", core: "0" },
        "brake booster": { price: "22.34", warrantyPrice: "25.34", core: "2.81" },
        "brake booster hyd": { price: "48.61", warrantyPrice: "53.61", core: "2.81" },
        "brake booster vac": { price: "22.34", warrantyPrice: "25.34", core: "2.81" },
        "brake caliper car": { price: "14.45", warrantyPrice: "17.45", core: "2.81" },
        "brake caliper truck": { price: "22.34", warrantyPrice: "25.34", core: "1.87" },
        "brake drum w/hub": { price: "43.36", warrantyPrice: "48.36", core: "3.75" },
        "brake drum (no hub)": { price: "19.7", warrantyPrice: "22.7", core: "2.81" },
        "brake drum car no hu": { price: "11.83", warrantyPrice: "13.83", core: "1.87" },
        "brake drum truck n": { price: "17.08", warrantyPrice: "20.08", core: "1.87" },
        "brake fluid resevoir": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "brake hose/line": { price: "10.14", warrantyPrice: "12.14", core: "0" },
        "brake master cylindr": { price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        "brake proportioning": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "brake pwr/hydro bstr": { price: "28.91", warrantyPrice: "32.91", core: "3.75" },
        "brake rotor car": { price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        "brake rotor-trk/suv": { price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        "brake shoe/pad (ea)": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "brush/grille guard": { price: "74.89", warrantyPrice: "84.89", core: "4.68" },
        "bulbs": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "bulk battery charge": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "bulk battery sales": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "bumper assy-frt": { price: "72.27", warrantyPrice: "77.27", core: "1.87" },
        "bumper assy-rear": { price: "82.77", warrantyPrice: "92.77", core: "1.87" },
        "bumper bare-rear": { price: "57.81", warrantyPrice: "62.81", core: "1.87" },
        "bumper bracket": { price: "18.01", warrantyPrice: "21.01", core: "0.94" },
        "bumper cover": { price: "56.48", warrantyPrice: "61.48", core: "0" },
        "bumper cover rear": { price: "57.81", warrantyPrice: "62.81", core: "0" },
        "bumper end cap": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "bumper filler": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "bumper guard": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "bumper push bar": { price: "31.52", warrantyPrice: "35.52", core: "3" },
        "bumper rear assy": { price: "70.95", warrantyPrice: "75.95", core: "2.81" },
        "bumper reinforcement": { price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        "bumper shock": { price: "11.83", warrantyPrice: "13.83", core: "1" },
        "bushing": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "c4 energy drink": { price: "3.38", warrantyPrice: "5.38", core: "0" },
        "cab only bare": { price: "253.57", warrantyPrice: "273.57", core: "15.93" },
        "cable (any)": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "cam shaft": { price: "28.91", warrantyPrice: "32.91", core: "0.94" },
        "camper shell": { price: "150.07", warrantyPrice: "170.07", core: "0" },
        "car hatch no glass": { price: "56.48", warrantyPrice: "61.48", core: "4.68" },
        "car/van eng no acc": { price: "299.55", warrantyPrice: "319.55", core: "49.65" },
        "car/van eng w acc": { price: "374.44", warrantyPrice: "394.44", core: "49.65" },
        "carburetor": { price: "30.23", warrantyPrice: "34.23", core: "1.87" },
        "carburetor 1&2 brl": { price: "36.79", warrantyPrice: "41.79", core: "1.87" },
        "carburetor 4 brl": { price: "59.13", warrantyPrice: "64.13", core: "1.87" },
        "carpet each sect": { price: "22.34", warrantyPrice: "25.34", core: "0" },
        "carrier bearing": { price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        "carrier housing": { price: "47.31", warrantyPrice: "53.31", core: "1.87" },
        "cart rental": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "cd player": { price: "31.52", warrantyPrice: "35.52", core: "0" },
        "celcius energy drink": { price: "3.38", warrantyPrice: "5.38", core: "0" },
        "center link": { price: "18.4", warrantyPrice: "21.4", core: "0.94" },
        "center post & rocker": { price: "76.22", warrantyPrice: "86.22", core: "10.3" },
        "center trunk lights": { price: "45.98", warrantyPrice: "50.98", core: "0" },
        "charcoal canister": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "chevy camaro tr 2016": { price: "620.13", warrantyPrice: "640.13", core: "0" },
        "chevy colo eg 3.7l": { price: "1973.13", warrantyPrice: "1993.13", core: "100" },
        "chevy cruze 2013 eng": { price: "1691.25", warrantyPrice: "1711.25", core: "0" },
        "--chevy eg 07-13 5.3": { price: "1409.38", warrantyPrice: "1429.38", core: "300" },
        "-chevy eg 07-13 5.3l": { price: "1409.38", warrantyPrice: "1429.38", core: "250" },
        "chevy tr 07 08 2wd": { price: "986.56", warrantyPrice: "1006.56", core: "125" },
        "chevy tr 2wd 09-13": { price: "986.56", warrantyPrice: "1006.56", core: "125" },
        "chevy tr 2wd 99-06": { price: "732.88", warrantyPrice: "752.88", core: "100" },
        "chevy tr 4.3l 07-08": { price: "1127.5", warrantyPrice: "1147.5", core: "100" },
        "chevy tr 4wd 99-06": { price: "902", warrantyPrice: "922", core: "150" },
        "chevy trax eg 17-19": { price: "1691.25", warrantyPrice: "1711.25", core: "0" },
        "chry 200 eg 2.4 2015": { price: "1071.13", warrantyPrice: "1091.13", core: "0" },
        "chvy camaro eg 2016": { price: "1240.25", warrantyPrice: "1260.25", core: "0" },
        "-chvy eng 99-06 5.3l": { price: "1014.75", warrantyPrice: "1034.75", core: "200" },
        "chvy tr 07-13 4w 6.0": { price: "1409.38", warrantyPrice: "1429.38", core: "250" },
        "chvy tr 5.3 2wd 2009": { price: "1127.5", warrantyPrice: "1147.5", core: "125" },
        "cigarette lighter": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "clock": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "clock sprg/signal sw": { price: "27.58", warrantyPrice: "31.58", core: "0" },
        "clutch disc": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "clutch fork": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "clutch mstr cylinder": { price: "17.08", warrantyPrice: "20.08", core: "1.87" },
        "clutch pressue plat": { price: "15.77", warrantyPrice: "18.77", core: "1.87" },
        "clutch slave cyl": { price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        "clutch thrwout brg": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "coil double": { price: "30", warrantyPrice: "34", core: "0" },
        "coil pack/ign. mod": { price: "52.53", warrantyPrice: "57.53", core: "0" },
        "coil spring": { price: "14.45", warrantyPrice: "17.45", core: "0.94" },
        "coil spring front": { price: "9.19", warrantyPrice: "11.19", core: "0.94" },
        "coil spring rear": { price: "9.19", warrantyPrice: "11.19", core: "0.94" },
        "coil w/ ignitor": { price: "44.68", warrantyPrice: "49.68", core: "0" },
        "coil-single": { price: "22.54", warrantyPrice: "25.54", core: "0" },
        "compact spare": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "complete ac box": { price: "84.34", warrantyPrice: "94.34", core: "0" },
        "computer brain box": { price: "40.73", warrantyPrice: "45.73", core: "1.87" },
        "console (any)": { price: "27.01", warrantyPrice: "31.01", core: "0" },
        "console lid": { price: "18.01", warrantyPrice: "21.01", core: "0.37" },
        "control arm": { price: "19.7", warrantyPrice: "22.7", core: "0.94" },
        "control module as is": { price: "22.34", warrantyPrice: "25.34", core: "0" },
        "conv top mtr": { price: "28.91", warrantyPrice: "32.91", core: "0.94" },
        "convertible top": { price: "56.48", warrantyPrice: "61.48", core: "0" },
        "core transmission": { price: "0", warrantyPrice: "0", core: "25" },
        "cowl vent panel": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "crankshaft": { price: "45.98", warrantyPrice: "50.98", core: "1.87" },
        "crankshaft sensor": { price: "52.55", warrantyPrice: "57.55", core: "0" },
        "crossmember k frame": { price: "60.43", warrantyPrice: "65.43", core: "2.81" },
        "cruise transducer": { price: "22.34", warrantyPrice: "25.34", core: "0" },
        "cup holder": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "c-v axle frnt drive": { price: "23.65", warrantyPrice: "26.65", core: "2.81" },
        "cyl head-dohc any": { price: "148.46", warrantyPrice: "168.46", core: "20.61" },
        "cyl head -ohv alum": { price: "78.83", warrantyPrice: "88.83", core: "11.24" },
        "cyl head ohv steel": { price: "78.83", warrantyPrice: "88.83", core: "11.24" },
        "cyl head -sohc steel": { price: "78.83", warrantyPrice: "88.83", core: "11.24" },
        "cyl head-sohc alum": { price: "105.09", warrantyPrice: "115.09", core: "20.61" },
        "dash pad": { price: "22.34", warrantyPrice: "25.34", core: "0" },
        "dash panel (bare)": { price: "36.79", warrantyPrice: "41.79", core: "0" },
        "diesel injector": { price: "36.79", warrantyPrice: "41.79", core: "5.62" },
        "diesel module": { price: "75.04", warrantyPrice: "85.04", core: "0" },
        "diesel pump": { price: "112.56", warrantyPrice: "122.56", core: "0" },
        "differential actuato": { price: "21.03", warrantyPrice: "24.03", core: "0" },
        "differential carrier": { price: "95.91", warrantyPrice: "105.91", core: "5.62" },
        "differential cover": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "dipstick/tube": { price: "6", warrantyPrice: "8", core: "0" },
        "display information": { price: "43.41", warrantyPrice: "48.41", core: "0" },
        "dist. cap/rotor": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "distr cap/no module": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "distr w/coil ignitoe": { price: "52.55", warrantyPrice: "57.55", core: "0.94" },
        "distrib/no module": { price: "43.36", warrantyPrice: "48.36", core: "1.87" },
        "distributor complete": { price: "63.05", warrantyPrice: "68.05", core: "1.87" },
        "distributor module": { price: "24.95", warrantyPrice: "28.95", core: "0" },
        "dodge 3500 tr 2004": { price: "2480.5", warrantyPrice: "2500.5", core: "1000" },
        "dodge eg 3.7l 09-12": { price: "1353", warrantyPrice: "1373", core: "200" },
        "dodge eg 5.7l 04 05": { price: "1127.5", warrantyPrice: "1147.5", core: "300" },
        "dodge eg 5.7l 09-12": { price: "1691.25", warrantyPrice: "1711.25", core: "200" },
        "dodge jrny eg 11-16": { price: "1409.38", warrantyPrice: "1429.38", core: "0" },
        "dodge tr 5.7l 04 05": { price: "394.63", warrantyPrice: "414.63", core: "0" },
        "dodge tr 5.7l 06-08": { price: "620.13", warrantyPrice: "640.13", core: "100" },
        "dome light light": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "door glass (trk/van)": { price: "39.42", warrantyPrice: "44.42", core: "0" },
        "door glass car": { price: "28.91", warrantyPrice: "32.91", core: "0" },
        "door handle inside": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "door handle outside": { price: "14.09", warrantyPrice: "17.09", core: "0" },
        "door hinge/latch": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "door loaded parts": { price: "44.68", warrantyPrice: "49.68", core: "0" },
        "door lock actuator": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "door lock cylinder": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "door mirror glass": { price: "21.03", warrantyPrice: "24.03", core: "0" },
        "door shell (car)": { price: "73.57", warrantyPrice: "83.57", core: "5.62" },
        "door shell (trk/suv)": { price: "94.59", warrantyPrice: "104.59", core: "5.62" },
        "door skin": { price: "24.95", warrantyPrice: "28.95", core: "1.87" },
        "door trim panel": { price: "21.03", warrantyPrice: "24.03", core: "0" },
        "drag link 2wd": { price: "27.58", warrantyPrice: "31.58", core: "1.87" },
        "drag link 4wd": { price: "48.61", warrantyPrice: "53.61", core: "1.87" },
        "drive shaft per sect": { price: "28.91", warrantyPrice: "32.91", core: "0.94" },
        "dual ac hose": { price: "22.34", warrantyPrice: "25.34", core: "0" },
        "ecm(sold as is only)": { price: "31.52", warrantyPrice: "35.52", core: "1.87" },
        "egr valve (each)": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "elct throt body": { price: "42.03", warrantyPrice: "47.03", core: "1.87" },
        "elec igntion switch": { price: "90.04", warrantyPrice: "100.04", core: "1.99" },
        "elec rack n pinion": { price: "118.38", warrantyPrice: "138.38", core: "6.75" },
        "elect chas cntrl mod": { price: "24.95", warrantyPrice: "28.95", core: "1.87" },
        "elect switch combo3+": { price: "30.23", warrantyPrice: "34.23", core: "0" },
        "elect switch multi 2": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "elect switch single": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "emblem (any)": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "emer brk hndl/pedal": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "energy drink": { price: "3.38", warrantyPrice: "5.38", core: "0" },
        "eng 10cly or desiel": { price: "600.28", warrantyPrice: "620.28", core: "100" },
        "engine block": { price: "152.4", warrantyPrice: "172.4", core: "26.23" },
        "engine cradle": { price: "52.55", warrantyPrice: "57.55", core: "4.68" },
        "engine mount": { price: "20.46", warrantyPrice: "23.46", core: "0.94" },
        "engine valve lifter": { price: "6.19", warrantyPrice: "8.19", core: "0" },
        "engine w/accy car": { price: "373.66", warrantyPrice: "393.66", core: "75" },
        "engine w/o acc truck": { price: "421.67", warrantyPrice: "441.67", core: "79.99" },
        "environmental fee": { price: "26.27", warrantyPrice: "32.27", core: "0" },
        "exh. pipe": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "exh. y-pipe": { price: "26.28", warrantyPrice: "30.28", core: "0" },
        "exhaust tips": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "fan assem resistor": { price: "31.01", warrantyPrice: "35.01", core: "0" },
        "fan belt": { price: "4.5", warrantyPrice: "6.5", core: "0" },
        "fan blade": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "fan clutch": { price: "13.51", warrantyPrice: "16.51", core: "0" },
        "fan clutch trk scr": { price: "32.86", warrantyPrice: "36.86", core: "0.94" },
        "fan electric": { price: "23.65", warrantyPrice: "26.65", core: "0" },
        "fan mtr assy dual": { price: "67.54", warrantyPrice: "72.54", core: "1.87" },
        "fan mtr assy single": { price: "42.02", warrantyPrice: "47.02", core: "1.87" },
        "fan shroud": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "fb": { price: "-1.13", warrantyPrice: "-1.13", core: "0" },
        "fender car": { price: "51.23", warrantyPrice: "56.23", core: "1.87" },
        "fender inner skirt": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "fender trim/flares": { price: "19.7", warrantyPrice: "22.7", core: "0" },
        "fender trk/suv/van": { price: "70.95", warrantyPrice: "75.95", core: "1.87" },
        "filler panel- each": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "flat bed": { price: "372.08", warrantyPrice: "392.08", core: "0" },
        "floor item": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "floor mat/spare tire": { price: "5.64", warrantyPrice: "7.64", core: "0" },
        "flywheel": { price: "18.4", warrantyPrice: "21.4", core: "0.94" },
        "flywheel cover": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "foglight": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "ford f150 eg 05-08": { price: "1127.5", warrantyPrice: "1147.5", core: "150" },
        "ford f150 eg 07-08": { price: "1127.5", warrantyPrice: "1147.5", core: "125" },
        "ford f150 eg 2010-12": { price: "1409.38", warrantyPrice: "1429.38", core: "300" },
        "ford f150 tr 09 only": { price: "563.75", warrantyPrice: "583.75", core: "75" },
        "ford f150 tr 10 only": { price: "845.63", warrantyPrice: "865.63", core: "200" },
        "ford f150 tr 4.6l": { price: "845.63", warrantyPrice: "865.63", core: "100" },
        "ford f150 tr 5.4l": { price: "845.63", warrantyPrice: "865.63", core: "100" },
        "frame section": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "front axle assy 4x4": { price: "227.3", warrantyPrice: "247.3", core: "25.29" },
        "front differential": { price: "187.88", warrantyPrice: "207.88", core: "23.42" },
        "front end car": { price: "525.53", warrantyPrice: "545.53", core: "0" },
        "front end truck": { price: "608.3", warrantyPrice: "628.3", core: "0" },
        "frt axl 4x4 3/4-1ton": { price: "300.86", warrantyPrice: "320.86", core: "25.29" },
        "fuel distributor": { price: "22.34", warrantyPrice: "25.34", core: "0.94" },
        "fuel filler door": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "fuel filler neck": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "fuel filter": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "fuel inj. pump or cp": { price: "36.79", warrantyPrice: "41.79", core: "5.62" },
        "fuel injector non cp": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "fuel line each": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "fuel pump manual": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "fuel pump w/sending": { price: "44.68", warrantyPrice: "49.68", core: "0" },
        "fuel pump with sendi": { price: "52.53", warrantyPrice: "57.53", core: "2.12" },
        "fuel pump-elect": { price: "23.65", warrantyPrice: "26.65", core: "0" },
        "fuel rail w/inj's": { price: "44.68", warrantyPrice: "49.68", core: "0.94" },
        "fuel rail/no inject": { price: "22.34", warrantyPrice: "25.34", core: "0.94" },
        "fuel regulator": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "fuel snd unit -no pm": { price: "19.7", warrantyPrice: "22.7", core: "0" },
        "fuel spyder": { price: "44.68", warrantyPrice: "49.68", core: "0" },
        "fuel tank": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "fuel tank fill door": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "fuse": { price: "0.56", warrantyPrice: "0.56", core: "0" },
        "fuse box": { price: "21.03", warrantyPrice: "24.03", core: "0" },
        "gas/oil cap": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "gate fee": { price: "3", warrantyPrice: "5", core: "0" },
        "gatorade": { price: "3.38", warrantyPrice: "5.38", core: "0" },
        "gauge single": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "glass hatch": { price: "42.03", warrantyPrice: "47.03", core: "0" },
        "glass hatch strut lg": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "glass hatch strut sm": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "glove box door": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "gloves": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "gmc canyon eg 3.4l": { price: "1127.5", warrantyPrice: "1147.5", core: "100" },
        "gmc canyon tr 05-06": { price: "563.75", warrantyPrice: "583.75", core: "0" },
        "gmc yuk en 6.0 02-05": { price: "1409.38", warrantyPrice: "1429.38", core: "300" },
        "gmc yuk tr 6.0 02-06": { price: "958.38", warrantyPrice: "978.38", core: "200" },
        "grille no lights": { price: "28.91", warrantyPrice: "32.91", core: "0" },
        "grille w/surround": { price: "48.02", warrantyPrice: "53.02", core: "0" },
        "hard top": { price: "248.05", warrantyPrice: "268.05", core: "0" },
        "harmonic balancer": { price: "21.03", warrantyPrice: "24.03", core: "0.94" },
        "hatch no glass": { price: "38.1", warrantyPrice: "43.1", core: "3.75" },
        "hatch suv/van": { price: "107.74", warrantyPrice: "117.74", core: "4.68" },
        "hatch with glass": { price: "49.94", warrantyPrice: "54.94", core: "4.68" },
        "hats": { price: "22.55", warrantyPrice: "25.55", core: "0" },
        "hdlmp comp 1 plug": { price: "40.58", warrantyPrice: "45.58", core: "0" },
        "hdlmp comp dual plug": { price: "40.73", warrantyPrice: "45.73", core: "0" },
        "hdlmp comp sgl plug": { price: "26.28", warrantyPrice: "30.28", core: "0" },
        "hdlmp switch, dash m": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "hdmp comp bulb only": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "head liner each sect": { price: "19.7", warrantyPrice: "22.7", core: "0" },
        "head rest": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "headache rack": { price: "186.04", warrantyPrice: "206.04", core: "0" },
        "headerpanel bare": { price: "53.86", warrantyPrice: "58.86", core: "2.81" },
        "headlamp bezel": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "headlamp composite": { price: "51.85", warrantyPrice: "56.85", core: "0" },
        "headlamp door (each)": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "headlamp motor": { price: "19.7", warrantyPrice: "22.7", core: "0" },
        "headlamp ring": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "headlamp sealed beam": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "heater ac housing": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "heater blower motor": { price: "19.7", warrantyPrice: "22.7", core: "0" },
        "heater cntrl (elec.)": { price: "28.19", warrantyPrice: "32.19", core: "0" },
        "heater contrl (man.)": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "heater core": { price: "7.89", warrantyPrice: "9.89", core: "1.87" },
        "hidden header panel": { price: "31.52", warrantyPrice: "35.52", core: "0" },
        "hinge": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "hood struts": { price: "7.51", warrantyPrice: "9.51", core: "0" },
        "hood car": { price: "67.54", warrantyPrice: "72.54", core: "2.81" },
        "hood hinge": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "hood ornament": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "hood truck": { price: "90.04", warrantyPrice: "100.04", core: "2.81" },
        "horn": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "horn button": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "hub bearing": { price: "19.7", warrantyPrice: "22.7", core: "0.94" },
        "hub cap/wheel cover": { price: "11.26", warrantyPrice: "13.26", core: "0" },
        "hub car": { price: "19.7", warrantyPrice: "22.7", core: "0.94" },
        "hub locking type 4x4": { price: "27.58", warrantyPrice: "31.58", core: "0.94" },
        "hub truck": { price: "36.79", warrantyPrice: "41.79", core: "0.94" },
        "hyn elantra eng 2013": { price: "1127.5", warrantyPrice: "1147.5", core: "0" },
        "hyn sonata eg 2014": { price: "2085.88", warrantyPrice: "2105.88", core: "0" },
        "idle air con/valve": { price: "22.52", warrantyPrice: "25.52", core: "0" },
        "idler arm": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "ignition switch": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "ignitor": { price: "28.91", warrantyPrice: "32.91", core: "0" },
        "inner fender": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "instr cluster bezel": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "instrument cluster": { price: "35.47", warrantyPrice: "40.47", core: "0" },
        "instrument lens": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "int door win handle": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "intake hose": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "intake man bare": { price: "28.91", warrantyPrice: "32.91", core: "0.94" },
        "intake runn actuator": { price: "28.53", warrantyPrice: "32.53", core: "0" },
        "intercooler": { price: "60.02", warrantyPrice: "65.02", core: "5.62" },
        "interior door panel": { price: "24.03", warrantyPrice: "28.03", core: "0" },
        "jack any": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "jack handle": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "jeep chrk eg 5.7l 11": { price: "1691.25", warrantyPrice: "1711.25", core: "350" },
        "jumper cables": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "kia soul eg 14-16": { price: "1691.25", warrantyPrice: "1711.25", core: "0" },
        "knob each": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "knuckle/spindle": { price: "19.7", warrantyPrice: "22.7", core: "0.94" },
        "knuckle/spindle car": { price: "35.47", warrantyPrice: "40.47", core: "0.94" },
        "knuckle/spindle- trk": { price: "40.73", warrantyPrice: "45.73", core: "0.94" },
        "large plast fitting": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "latch": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "ld hdlmp 1 plug": { price: "45.09", warrantyPrice: "50.09", core: "0" },
        "ld hlp dual bulb com": { price: "56.36", warrantyPrice: "61.36", core: "0" },
        "leaf spring": { price: "21.03", warrantyPrice: "24.03", core: "5.62" },
        "license plate holder": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "lifetime battery": { price: "75.04", warrantyPrice: "85.04", core: "12" },
        "light lens only": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "loaded car hatch": { price: "73.57", warrantyPrice: "83.57", core: "5.62" },
        "loaded cntr trnk lig": { price: "55.19", warrantyPrice: "60.19", core: "0" },
        "loaded door car": { price: "118.24", warrantyPrice: "138.24", core: "5.62" },
        "loaded door trk/suv": { price: "139.27", warrantyPrice: "159.27", core: "5.62" },
        "loaded fuse box": { price: "39.42", warrantyPrice: "44.42", core: "0" },
        "loaded reciever hitc": { price: "38.1", warrantyPrice: "43.1", core: "0" },
        "loaded sliding door": { price: "127.44", warrantyPrice: "147.44", core: "5.62" },
        "loaded suv/van hatch": { price: "143.22", warrantyPrice: "163.22", core: "5.62" },
        "loaded tail light": { price: "42.83", warrantyPrice: "47.83", core: "0.37" },
        "loaded tbi": { price: "53.86", warrantyPrice: "58.86", core: "1.87" },
        "loaded trunk lid": { price: "67.01", warrantyPrice: "72.01", core: "2.81" },
        "loaded washer bottle": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "lock any": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "lock out 4x4 each": { price: "27.58", warrantyPrice: "31.58", core: "0" },
        "lock tumbler": { price: "13.15", warrantyPrice: "17.15", core: "0" },
        "luggage rack": { price: "30.23", warrantyPrice: "34.23", core: "0" },
        "mani exhst (no sens)": { price: "23.65", warrantyPrice: "26.65", core: "0.94" },
        "manual 4x4 hub": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "manual mirror - door": { price: "22.54", warrantyPrice: "25.54", core: "0" },
        "manual mirror extend": { price: "28.18", warrantyPrice: "32.18", core: "0" },
        "map sensor": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "mass air flow sensor": { price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        "master cyl w/res": { price: "23.65", warrantyPrice: "26.65", core: "1.87" },
        "mirror interior": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "misc tools": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "monster energy": { price: "3.38", warrantyPrice: "5.38", core: "0" },
        "mount eng/tra car": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "mount eng/tra trksuv": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "muffler (any)": { price: "17.08", warrantyPrice: "20.08", core: "0" },
        "muffler pipe": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "new battery": { price: "103.8", warrantyPrice: "113.8", core: "12" },
        "niss murano tr 12-14": { price: "1409.38", warrantyPrice: "1429.38", core: "150" },
        "niss path tr": { price: "1691.25", warrantyPrice: "1711.25", core: "0" },
        "oil cooler": { price: "31.38", warrantyPrice: "35.38", core: "0.94" },
        "oil pan (hole?)": { price: "17.08", warrantyPrice: "20.08", core: "0" },
        "oil pump": { price: "15.77", warrantyPrice: "18.77", core: "0.94" },
        "owners manual": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "oxygen sensor": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "park/turnlamp assy": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "park/turnlamp lens": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "pcv valve": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "pedal (each)": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "piston": { price: "25.52", warrantyPrice: "29.52", core: "0.99" },
        "piston and rod assy": { price: "13.14", warrantyPrice: "16.14", core: "1.87" },
        "pitman arm": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "plastic trim + 12 in": { price: "22.54", warrantyPrice: "25.54", core: "0" },
        "plastic trim < 5in": { price: "7.88", warrantyPrice: "9.88", core: "0" },
        "plastic trim 5-12 in": { price: "16.9", warrantyPrice: "19.9", core: "0" },
        "power mirror - door": { price: "39.45", warrantyPrice: "44.45", core: "0" },
        "power mirror extend": { price: "50.73", warrantyPrice: "55.73", core: "0" },
        "power steering pump": { price: "24.95", warrantyPrice: "28.95", core: "2.81" },
        "pressure plate": { price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        "pulley bare": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "pump fee - car": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "purge valve solenoid": { price: "33.01", warrantyPrice: "37.01", core: "0.99" },
        "push rod": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "qtr glass trk/suv": { price: "38.1", warrantyPrice: "43.1", core: "0" },
        "qtr panel extension": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "quarter glass car": { price: "23.65", warrantyPrice: "26.65", core: "0" },
        "quarter panel": { price: "76.22", warrantyPrice: "86.22", core: "11.24" },
        "rack and pinion": { price: "59.75", warrantyPrice: "64.75", core: "3.75" },
        "radiator": { price: "66.47", warrantyPrice: "71.47", core: "15" },
        "radiator bottle": { price: "12.01", warrantyPrice: "14.01", core: "0" },
        "radiator cap": { price: "3", warrantyPrice: "5", core: "0" },
        "radiator core supprt": { price: "55.53", warrantyPrice: "60.53", core: "0.94" },
        "radiator hose": { price: "10.14", warrantyPrice: "12.14", core: "0" },
        "radiator overflow": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "radio-cd player": { price: "36.79", warrantyPrice: "41.79", core: "0" },
        "radio - non cd plyr": { price: "22.34", warrantyPrice: "25.34", core: "0" },
        "radio bezel": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "radio w amp on": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "radio/ac ctrl combo": { price: "38.1", warrantyPrice: "43.1", core: "0" },
        "ranchhand bumper": { price: "281.88", warrantyPrice: "301.88", core: "0" },
        "rear end housing bar": { price: "44.68", warrantyPrice: "49.68", core: "4.68" },
        "rear end pinion/ring": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "rear end spider/side": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "rearend 3/4 8 lug": { price: "375.18", warrantyPrice: "395.18", core: "28.1" },
        "redbull 12 oz": { price: "3.38", warrantyPrice: "5.38", core: "0" },
        "redbull 20 oz": { price: "5.63", warrantyPrice: "7.63", core: "0" },
        "redbull 8 oz": { price: "2.82", warrantyPrice: "4.82", core: "0" },
        "relay-large": { price: "13.63", warrantyPrice: "16.63", core: "0" },
        "relay-medium": { price: "7.43", warrantyPrice: "9.43", core: "0" },
        "resevoir any": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "ring gear & pinion": { price: "76.22", warrantyPrice: "86.22", core: "2.81" },
        "rocker arm each": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "rockstar energy": { price: "3.38", warrantyPrice: "5.38", core: "0" },
        "role bar": { price: "31.52", warrantyPrice: "35.52", core: "2.81" },
        "roof conv top assy": { price: "187.88", warrantyPrice: "207.88", core: "0" },
        "roof-non conv": { price: "76.22", warrantyPrice: "86.22", core: "0" },
        "rotor w hub car": { price: "26.28", warrantyPrice: "30.28", core: "2.81" },
        "rotor w hub truck": { price: "34.15", warrantyPrice: "38.15", core: "2.81" },
        "rotor/calip/drum car": { price: "11.83", warrantyPrice: "13.83", core: "1.87" },
        "rotor/calip/drum trk": { price: "17.08", warrantyPrice: "20.08", core: "1.87" },
        "rotor/drum w/hub car": { price: "26.28", warrantyPrice: "30.28", core: "2.81" },
        "rotor/drum w/hub trk": { price: "34.15", warrantyPrice: "38.15", core: "3.75" },
        "running board each": { price: "30.23", warrantyPrice: "34.23", core: "0" },
        "seat belt ea section": { price: "16.91", warrantyPrice: "19.91", core: "0" },
        "seat belt motor": { price: "19.7", warrantyPrice: "22.7", core: "0" },
        "seat belt track": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "seat cover (each)": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "seat cushion": { price: "24.81", warrantyPrice: "28.81", core: "0" },
        "seat motor": { price: "14.45", warrantyPrice: "17.45", core: "1.87" },
        "seat track no motor": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "seat trk, man ea sec": { price: "40.73", warrantyPrice: "45.73", core: "0" },
        "seat/car manual": { price: "43.41", warrantyPrice: "48.41", core: "0" },
        "seat-car pwr ea sect": { price: "59.13", warrantyPrice: "64.13", core: "0" },
        "seat-trk, pwr ea sec": { price: "63.05", warrantyPrice: "68.05", core: "0" },
        "sensor": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "sensor (emmissions)": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "sensor (oil/water)": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "sepertine belt": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "set of tires": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "shift cable any": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "shift knob": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "shifter boot": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "shifter lever assy": { price: "23.65", warrantyPrice: "26.65", core: "0" },
        "shirts for customer": { price: "22.55", warrantyPrice: "25.55", core: "0" },
        "shirts for employees": { price: "12.4", warrantyPrice: "15.4", core: "0" },
        "shock": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "shock any no spring": { price: "11.83", warrantyPrice: "13.83", core: "0.94" },
        "side post battery": { price: "52.55", warrantyPrice: "57.55", core: "12" },
        "slave cylinder": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "small latch/hinge": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "small metal brack": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "small plast fitting": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "smog pump": { price: "18.4", warrantyPrice: "21.4", core: "1.87" },
        "soda": { price: "2.82", warrantyPrice: "4.82", core: "0" },
        "solenoid": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "spare tire": { price: "28.51", warrantyPrice: "32.51", core: "0" },
        "spare tire carrier": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "spare tire cover": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "spare tire swng away": { price: "22.34", warrantyPrice: "25.34", core: "1.87" },
        "spark plug": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "spark plug/wire": { price: "1.4", warrantyPrice: "3.4", core: "0" },
        "speaker (custom)": { price: "14.65", warrantyPrice: "17.65", core: "0" },
        "speaker (stock)": { price: "11.26", warrantyPrice: "13.26", core: "0" },
        "speed sensor": { price: "37.21", warrantyPrice: "42.21", core: "0" },
        "speedo cable": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "speedo clust assemly": { price: "35.47", warrantyPrice: "40.47", core: "0" },
        "speedo clust trk": { price: "42.03", warrantyPrice: "47.03", core: "0" },
        "speedo only analog": { price: "23.65", warrantyPrice: "26.65", core: "0" },
        "speedo only digital": { price: "28.91", warrantyPrice: "32.91", core: "0" },
        "spider gear assy onl": { price: "95.91", warrantyPrice: "105.91", core: "0" },
        "spindle car": { price: "23.65", warrantyPrice: "26.65", core: "0.94" },
        "spindle truck": { price: "34.15", warrantyPrice: "38.15", core: "0" },
        "spindle/knuckle": { price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        "spoiler": { price: "23.65", warrantyPrice: "26.65", core: "1.87" },
        "stabilizer link": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "starter": { price: "28.91", warrantyPrice: "32.91", core: "5.62" },
        "starter solenoid": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "steering box ca": { price: "47.75", warrantyPrice: "52.75", core: "10.3" },
        "steering column car": { price: "52.55", warrantyPrice: "57.55", core: "0" },
        "steering stabilizer": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "steering wheel": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "stg col-trk/suv": { price: "80.13", warrantyPrice: "90.13", core: "0" },
        "str col shaft": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "str gear box - trk": { price: "59.13", warrantyPrice: "64.13", core: "10.3" },
        "strut": { price: "27.58", warrantyPrice: "31.58", core: "1.87" },
        "strut assy": { price: "38.1", warrantyPrice: "43.1", core: "0.94" },
        "sun visor": { price: "11.26", warrantyPrice: "13.26", core: "0" },
        "sunroof glass": { price: "28.91", warrantyPrice: "32.91", core: "0.94" },
        "sunroof/t-top": { price: "38.1", warrantyPrice: "43.1", core: "0" },
        "suv/van hatch no gla": { price: "98.54", warrantyPrice: "108.54", core: "5.62" },
        "sway bar": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "switch combo": { price: "23.65", warrantyPrice: "26.65", core: "0.94" },
        "switch single": { price: "11.26", warrantyPrice: "13.26", core: "0" },
        "switch turn signal": { price: "30.23", warrantyPrice: "34.23", core: "0" },
        "tail gate": { price: "76.22", warrantyPrice: "86.22", core: "3.75" },
        "tail gate cables": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "tail gate handle": { price: "14.45", warrantyPrice: "17.45", core: "0" },
        "tail light assy (ea)": { price: "24.02", warrantyPrice: "28.02", core: "0" },
        "tail light cir board": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "tailgate handle": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "tailgate mldg - lg": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "tailgate mldg sm": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "thermostat": { price: "6.82", warrantyPrice: "8.82", core: "0" },
        "thermostat housing": { price: "23.19", warrantyPrice: "26.19", core: "0.99" },
        "throttle body": { price: "45.01", warrantyPrice: "50.01", core: "1.87" },
        "tie rod each": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "tie rod end": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "timing chain": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "timing gear": { price: "7.89", warrantyPrice: "9.89", core: "0.94" },
        "timing gear cover": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "timing guide": { price: "22.52", warrantyPrice: "25.52", core: "1.99" },
        "tire 10.00": { price: "12.4", warrantyPrice: "15.4", core: "0" },
        "tire-blue": { price: "56.38", warrantyPrice: "61.38", core: "0" },
        "tire-green": { price: "22.55", warrantyPrice: "25.55", core: "0" },
        "tire-red": { price: "33.83", warrantyPrice: "37.83", core: "0" },
        "tire-white": { price: "45.1", warrantyPrice: "50.1", core: "0" },
        "tool box": { price: "124.03", warrantyPrice: "144.03", core: "0" },
        "topper": { price: "248.05", warrantyPrice: "268.05", core: "0" },
        "torque converter": { price: "21.03", warrantyPrice: "24.03", core: "1.87" },
        "torsion bar": { price: "15.77", warrantyPrice: "18.77", core: "1.87" },
        "tow hook": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "tps sensor": { price: "30.23", warrantyPrice: "34.23", core: "0" },
        "trailer ball": { price: "3.95", warrantyPrice: "5.95", core: "0" },
        "trans cross member": { price: "18.4", warrantyPrice: "21.4", core: "0.94" },
        "trans dust cover": { price: "9.19", warrantyPrice: "11.19", core: "0" },
        "trans ext housing": { price: "76.22", warrantyPrice: "86.22", core: "10.3" },
        "trans line": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "trans pan hole": { price: "12.65", warrantyPrice: "15.65", core: "0" },
        "trans shift solenoid": { price: "18.4", warrantyPrice: "21.4", core: "0.94" },
        "trans tail housing": { price: "15.77", warrantyPrice: "18.77", core: "1.87" },
        "trans valve body": { price: "76.22", warrantyPrice: "86.22", core: "4.68" },
        "transfer case (4x4)": { price: "176.1", warrantyPrice: "196.1", core: "19.99" },
        "transfer case adapte": { price: "23.9", warrantyPrice: "27.9", core: "0" },
        "transfer case mtr": { price: "23.65", warrantyPrice: "26.65", core: "0.94" },
        "transmission car": { price: "194.45", warrantyPrice: "214.45", core: "25.29" },
        "transmission cooler": { price: "9.19", warrantyPrice: "11.19", core: "0.94" },
        "transmission mount": { price: "9.19", warrantyPrice: "11.19", core: "1.87" },
        "trnk pul/dwn elct": { price: "18.4", warrantyPrice: "21.4", core: "0" },
        "truck bed bare": { price: "299.55", warrantyPrice: "319.55", core: "5.62" },
        "truck cab/ext &4dr": { price: "316.64", warrantyPrice: "336.64", core: "14.99" },
        "truck tire all terri": { price: "112.56", warrantyPrice: "122.56", core: "0" },
        "truck/suv eng w/acc": { price: "450.2", warrantyPrice: "470.2", core: "75" },
        "truck/suv/van trans": { price: "280.29", warrantyPrice: "300.29", core: "39.99" },
        "trunk lid bare - car": { price: "51.23", warrantyPrice: "56.23", core: "2.81" },
        "trunk lights assemy": { price: "45.98", warrantyPrice: "50.98", core: "0" },
        "turbo inner cooler": { price: "59.13", warrantyPrice: "64.13", core: "5.62" },
        "turbo super charger": { price: "68.32", warrantyPrice: "73.32", core: "12.18" },
        "turn sig lever only": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "universal joint": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "upper tie bar - bare": { price: "23.65", warrantyPrice: "26.65", core: "0" },
        "utility camper": { price: "372.08", warrantyPrice: "392.08", core: "0" },
        "vacuum actuator": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "vacuum canister": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "vacuum pump": { price: "15.77", warrantyPrice: "18.77", core: "5.62" },
        "valence": { price: "13.14", warrantyPrice: "16.14", core: "0" },
        "valve cover": { price: "20.46", warrantyPrice: "23.46", core: "0" },
        "van sliding door bar": { price: "85.41", warrantyPrice: "95.41", core: "3.75" },
        "vapor canister": { price: "48.02", warrantyPrice: "53.02", core: "0.99" },
        "vent (interior)": { price: "5.64", warrantyPrice: "7.64", core: "0" },
        "vent glass car": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "vent glass truck": { price: "23.65", warrantyPrice: "26.65", core: "0" },
        "voltage regulator": { price: "11.83", warrantyPrice: "13.83", core: "0" },
        "washer bottle": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "washer bottle pump": { price: "6.57", warrantyPrice: "8.57", core: "0" },
        "washer fluid": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "washer fluid pump": { price: "8.43", warrantyPrice: "10.43", core: "0" },
        "water pump": { price: "17.08", warrantyPrice: "20.08", core: "1.87" },
        "weather stripping": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "wheel aluminum": { price: "36.07", warrantyPrice: "41.07", core: "14.99" },
        "wheel cylinder": { price: "7.89", warrantyPrice: "9.89", core: "0" },
        "wheel steel": { price: "24.79", warrantyPrice: "28.79", core: "2" },
        "wheelbarrow sale": { price: "111.61", warrantyPrice: "121.61", core: "0" },
        "wheelbarrow-engine": { price: "111.61", warrantyPrice: "121.61", core: "75" },
        "wheelbarrow-trans": { price: "111.61", warrantyPrice: "121.61", core: "25" },
        "window crank hndl": { price: "2.63", warrantyPrice: "4.63", core: "0" },
        "window motor": { price: "15.77", warrantyPrice: "18.77", core: "1.87" },
        "window reg. no mtr": { price: "15.77", warrantyPrice: "18.77", core: "0.94" },
        "window reg. w/motor": { price: "34.15", warrantyPrice: "38.15", core: "0.94" },
        "windshield": { price: "31.52", warrantyPrice: "35.52", core: "0" },
        "wiper arm": { price: "5.25", warrantyPrice: "7.25", core: "0" },
        "wiper blade": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "wiper motor": { price: "19.7", warrantyPrice: "22.7", core: "1.87" },
        "wiper trans linkg": { price: "15.77", warrantyPrice: "18.77", core: "0" },
        "wire hareness": { price: "22.34", warrantyPrice: "25.34", core: "0" },
        "wire pigtail": { price: "5.64", warrantyPrice: "7.64", core: "0" },
        "wrnty $1/day": { price: "1.33", warrantyPrice: "3.33", core: "0" },
        "yoke": { price: "11.83", warrantyPrice: "13.83", core: "0" }
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
    // STYLES (No changes needed here)
    // ========================
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* El Loco Chatbot Styles */
            .lg-chatbot-button {
                position: fixed !important; bottom: 30px !important; right: 30px !important; width: 80px !important;
                height: 80px !important; border-radius: 50% !important; cursor: pointer !important;
                box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4) !important; display: flex !important;
                align-items: center !important; justify-content: center !important; transition: all 0.3s ease !important;
                z-index: 99999 !important; border: 3px solid #4a8b6b !important; background: white !important;
                overflow: hidden !important; animation: lg-pulse 2s infinite !important;
            }
            .lg-chatbot-button img { width: 100% !important; height: 100% !important; object-fit: cover !important; border-radius: 50% !important; }
            @keyframes lg-pulse { 0% { box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4); } 50% { box-shadow: 0 10px 40px rgba(74, 139, 107, 0.6); } 100% { box-shadow: 0 10px 30px rgba(74, 139, 107, 0.4); } }
            .lg-chatbot-button:hover { transform: scale(1.1) !important; border-color: #5fa77f !important; }
            .lg-chat-container {
                position: fixed !important; bottom: 120px !important; right: 30px !important; width: 420px !important;
                height: 650px !important; background: #0a0a0a !important; border-radius: 20px !important;
                border: 2px solid #4a8b6b !important; box-shadow: 0 20px 60px rgba(74, 139, 107, 0.3) !important;
                display: none !important; flex-direction: column !important; overflow: hidden !important;
                z-index: 99998 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }
            .lg-chat-container.lg-active { display: flex !important; animation: lg-slideUp 0.3s ease !important; }
            @keyframes lg-slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .lg-chat-header {
                background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important; padding: 15px 20px !important;
                color: white !important; display: flex !important; justify-content: space-between !important;
                align-items: center !important; border-bottom: 2px solid #5fa77f !important;
            }
            .lg-chat-title { display: flex !important; align-items: center !important; gap: 10px !important; }
            .lg-bot-avatar {
                width: 45px !important; height: 45px !important; background: white !important;
                border-radius: 50% !important; display: flex !important; align-items: center !important;
                justify-content: center !important; border: 2px solid rgba(255, 255, 255, 0.3) !important; overflow: hidden !important;
            }
            .lg-bot-avatar img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
            .lg-chat-header h3 { margin: 0 !important; font-size: 20px !important; font-weight: 700 !important; text-shadow: 1px 1px 2px rgba(0,0,0,0.2) !important; }
            .lg-chat-tagline { font-size: 10px !important; opacity: 0.9 !important; margin-top: 2px !important; }
            .lg-chat-status { font-size: 11px !important; opacity: 0.95 !important; display: flex !important; align-items: center !important; gap: 5px !important; }
            .lg-status-dot { width: 6px !important; height: 6px !important; background: #4ade80 !important; border-radius: 50% !important; animation: lg-blink 2s infinite !important; }
            @keyframes lg-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
            .lg-header-controls { display: flex !important; align-items: center !important; gap: 10px !important; }
            .lg-lang-switch { display: flex !important; background: rgba(255, 255, 255, 0.2) !important; border-radius: 20px !important; padding: 2px !important; }
            .lg-lang-btn {
                padding: 4px 10px !important; background: transparent !important; border: none !important;
                color: white !important; font-size: 12px !important; font-weight: 600 !important;
                cursor: pointer !important; border-radius: 18px !important; transition: all 0.3s ease !important;
            }
            .lg-lang-btn.active { background: white !important; color: #4a8b6b !important; }
            .lg-close-chat {
                background: none !important; border: none !important; color: white !important;
                font-size: 24px !important; cursor: pointer !important; padding: 0 !important;
                line-height: 1 !important; opacity: 0.9 !important; transition: all 0.3s ease !important;
            }
            .lg-close-chat:hover { opacity: 1 !important; transform: scale(1.1) !important; }
            .lg-chat-messages {
                flex: 1 !important; overflow-y: auto !important; padding: 20px !important;
                display: flex !important; flex-direction: column !important; gap: 15px !important; background: #0a0a0a !important;
            }
            .lg-chat-messages::-webkit-scrollbar { width: 6px !important; }
            .lg-chat-messages::-webkit-scrollbar-track { background: rgba(74, 139, 107, 0.1) !important; }
            .lg-chat-messages::-webkit-scrollbar-thumb { background: #4a8b6b !important; border-radius: 3px !important; }
            .lg-message { max-width: 85% !important; word-wrap: break-word !important; animation: lg-fadeIn 0.3s ease !important; }
            @keyframes lg-fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .lg-user-message {
                align-self: flex-end !important; background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important;
                color: white !important; padding: 12px 16px !important; border-radius: 18px 18px 4px 18px !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
            }
            .lg-bot-message {
                align-self: flex-start !important; background: #1a1a1a !important; color: #e0e0e0 !important;
                padding: 12px 16px !important; border-radius: 18px 18px 18px 4px !important;
                border: 1px solid #222 !important; line-height: 1.6 !important;
            }
            .lg-bot-message a { color: #4ade80 !important; text-decoration: none !important; font-weight: 500 !important; }
            .lg-bot-message a:hover { text-decoration: underline !important; }
            .lg-typing-indicator { display: none !important; align-self: flex-start !important; padding: 15px !important; background: #1a1a1a !important; border-radius: 18px !important; border: 1px solid #222 !important; }
            .lg-typing-indicator.lg-active { display: block !important; }
            .lg-typing-dot {
                display: inline-block !important; width: 8px !important; height: 8px !important;
                background: #4a8b6b !important; border-radius: 50% !important; margin: 0 2px !important;
                animation: lg-typing 1.4s infinite !important;
            }
            .lg-typing-dot:nth-child(2) { animation-delay: 0.2s !important; }
            .lg-typing-dot:nth-child(3) { animation-delay: 0.4s !important; }
            @keyframes lg-typing { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-10px); } }
            .lg-quick-actions {
                padding: 10px !important; background: #111 !important; display: flex !important;
                gap: 8px !important; flex-wrap: wrap !important; border-top: 1px solid #222 !important;
            }
            .lg-quick-action {
                padding: 8px 12px !important; background: rgba(74, 139, 107, 0.2) !important;
                border: 1px solid #4a8b6b !important; border-radius: 20px !important; color: #4a8b6b !important;
                font-size: 12px !important; cursor: pointer !important; transition: all 0.3s ease !important; font-weight: 500 !important;
            }
            .lg-quick-action:hover {
                background: #4a8b6b !important; color: white !important; transform: translateY(-2px) !important;
                box-shadow: 0 2px 8px rgba(74, 139, 107, 0.3) !important;
            }
            .lg-chat-input-container { padding: 15px 20px !important; background: #111 !important; display: flex !important; gap: 10px !important; border-top: 1px solid #222 !important; }
            .lg-chat-input {
                flex: 1 !important; padding: 12px 16px !important; background: #1a1a1a !important;
                border: 1px solid #333 !important; border-radius: 25px !important; color: white !important;
                font-size: 14px !important; outline: none !important; transition: all 0.3s ease !important;
            }
            .lg-chat-input:focus { border-color: #4a8b6b !important; box-shadow: 0 0 0 2px rgba(74, 139, 107, 0.2) !important; }
            .lg-send-button {
                width: 45px !important; height: 45px !important; background: linear-gradient(135deg, #4a8b6b 0%, #2d6e4e 100%) !important;
                border: none !important; border-radius: 50% !important; color: white !important; cursor: pointer !important;
                display: flex !important; align-items: center !important; justify-content: center !important; font-size: 20px !important;
                transition: all 0.3s ease !important;
            }
            .lg-send-button:hover:not(:disabled) { transform: scale(1.1) !important; box-shadow: 0 5px 15px rgba(74, 139, 107, 0.4) !important; }
            .lg-send-button:disabled { opacity: 0.5 !important; cursor: not-allowed !important; }
            .lg-vehicle-card { background: rgba(74, 139, 107, 0.1) !important; border: 1px solid #4a8b6b !important; border-radius: 10px !important; padding: 10px !important; margin: 5px 0 !important; }
            .lg-vehicle-title { color: #4ade80 !important; font-weight: 600 !important; margin-bottom: 5px !important; }
            .lg-vehicle-details { font-size: 13px !important; color: #b0b0b0 !important; }
            .lg-price-info { background: rgba(74, 139, 107, 0.1) !important; border-left: 3px solid #4a8b6b !important; padding: 10px !important; margin: 10px 0 !important; }
            .lg-price-line { display: flex !important; justify-content: space-between !important; margin: 5px 0 !important; }
            .lg-price-label { color: #909090 !important; }
            .lg-price-value { color: #4ade80 !important; font-weight: 600 !important; }
            @media (max-width: 480px) {
                .lg-chat-container { width: 100% !important; height: 100% !important; right: 0 !important; bottom: 0 !important; border-radius: 0 !important; max-width: 100vw !important; }
                .lg-chatbot-button { bottom: 20px !important; right: 20px !important; width: 70px !important; height: 70px !important; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ... Other functions like createChatbotHTML, language detection, etc. go here (no changes needed) ...
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

        addMessage(message, 'user');
        input.value = '';
        
        if (sendButton) sendButton.disabled = true;

        const typing = document.getElementById('lgTypingIndicator');
        if (typing) typing.classList.add('lg-active');

        setTimeout(async () => {
            if (typing) typing.classList.remove('lg-active');
            if (sendButton) sendButton.disabled = false;
            
            const response = await processMessage(message);
            addMessage(response, 'bot');
        }, 800 + Math.random() * 700);
    }

    // ========================
    // VEHICLE SEARCH (*** NEW - IMPROVED LOGIC ***)
    // ========================
    function searchVehicles(searchQuery) {
        if (!searchQuery || inventoryData.length === 0) return [];

        const cleanedQuery = searchQuery.toLowerCase()
            .replace(/do you have any|do you have|got any|any|looking for|need|want|\?/g, '')
            .replace(/chevy/g, 'chevrolet')
            .replace(/transmission for|transmission|engine for|engine|parts for/g, '')
            .trim();

        if (!cleanedQuery) return [];

        const searchTerms = cleanedQuery.split(/\s+/).filter(term => term.length > 1 || !isNaN(term));

        const results = inventoryData.filter(vehicle => {
            const modelLower = vehicle.model.toLowerCase();
            const makeLower = vehicle.make.toLowerCase();
            const vehicleString = `${vehicle.year} ${makeLower} ${modelLower}`;

            // Check if any search term is part of the model name. This is key.
            const hasModelTerm = searchTerms.some(term => modelLower.includes(term));

            // If the search query does NOT contain a word from the vehicle's model, we reject it.
            // This stops a search for "honda" from matching a "civic".
            if (!hasModelTerm) {
                return false;
            }

            // If it DOES have a model term, we then ensure all search terms are present in the vehicle's full description.
            // This allows "2005 civic" to match "2005 honda civic".
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
            return { name: cleanedQuery, ...PARTS_PRICES[cleanedQuery] };
        }

        // Search for partial match, prioritizing longer matches
        let bestMatch = null;
        let highestScore = 0;

        for (let partName in PARTS_PRICES) {
            if (partName.includes(cleanedQuery) || cleanedQuery.includes(partName)) {
                const score = cleanedQuery.length / partName.length; // Simple scoring
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = { name: partName, ...PARTS_PRICES[partName] };
                }
            }
        }
        return bestMatch;
    }

    // ========================
    // MESSAGE PROCESSING (No major changes needed)
    // ========================
    async function processMessage(msg) {
        const lower = msg.toLowerCase();
        const t = TRANSLATIONS[currentLanguage];
        
        conversationContext.push({ role: 'user', content: msg });
        if (conversationContext.length > 10) {
            conversationContext.shift();
        }

        if (lower.includes('how much') || lower.includes('price') || lower.includes('cost')) {
            const part = searchPartPrice(lower);
            if (part) {
                return formatPartPrice(part);
            }
            if (lower.includes('part') || lower.includes('price')) {
                return `
                    ${getRandomResponse('prices')}<br><br>
                    Want to see our complete price list? Check it out here:<br>
                    👉 <a href="${CONFIG.PARTS_LIST_URL}" target="_blank" style="color:#4ade80;">View Complete Parts Price List</a><br><br>
                    Or tell me what specific part you need!
                `;
            }
        }

        if (lower.includes('for sale') || lower.includes('buy a car') || lower.includes('buy a vehicle')) {
            return `
                🚗 <strong>Looking for a complete vehicle?</strong><br><br>
                Check out our selection here:<br>
                👉 <a href="${CONFIG.VEHICLES_FOR_SALE_URL}" target="_blank" style="color:#4ade80;">View Vehicles For Sale</a>
            `;
        }

        if (lower.includes('sell my car') || lower.includes('sell a car') || lower.includes('junk my car')) {
            return `
                💸 <strong>Want to turn that rust bucket into cold hard cash?</strong><br><br>
                We buy cars in ANY condition!<br><br>
                <strong>Two ways to get your quote:</strong><br>
                📝 <a href="${CONFIG.SELL_CAR_URL}" target="_blank" style="color:#4ade80;">Get an Instant Online Quote</a><br>
                📞 <a href="tel:${CONFIG.PHONE}" style="color:#4ade80;">Call ${CONFIG.PHONE}</a>
            `;
        }

        if ((lower.includes('transmission for') || lower.includes('engine for') || lower.includes('parts for')) && inventoryData.length > 0) {
            const vehicleSearch = lower.replace(/transmission for|engine for|parts for|a |an /g, '').trim();
            const results = searchVehicles(vehicleSearch);
            
            if (results.length > 0) {
                let response = `🔧 <strong>Important: We don't inventory individual parts!</strong><br><br>But good news - I found ${results.length} matching vehicle(s) in our yard:<br><br>`;
                const showMax = Math.min(5, results.length);
                for (let i = 0; i < showMax; i++) {
                    const v = results[i];
                    response += `<div class="lg-vehicle-card"><div class="lg-vehicle-title">${v.year} ${v.make} ${v.model}</div><div class="lg-vehicle-details">📍 Row ${v.row} | Stock #${v.stock} ${v.color ? `| Color: ${v.color}` : ''}</div></div>`;
                }
                if (results.length > 5) {
                    response += `<br><em>...and ${results.length - 5} more!</em><br>`;
                }
                response += `<br>${getRandomResponse('tools')}`;
                return response;
            } else {
                return `${getRandomResponse('noInventory')}`;
            }
        }

        if (inventoryData.length > 0) {
            const vehicleKeywords = /accord|civic|camry|corolla|f150|f-150|silverado|tahoe|suburban|impala|explorer|expedition|ranger|altima|sentra|maxima|chevy|chevrolet|ford|toyota|honda|nissan|dodge|ram|gmc|buick|cadillac|chrysler|jeep|mazda|hyundai|kia|volkswagen|audi|bmw|mercedes|\d{4}/i;
            if (vehicleKeywords.test(lower)) {
                const results = searchVehicles(lower);
                if (results.length > 0) {
                    let response = `${getRandomResponse('foundVehicles')}<br><br>🚗 <strong>Found ${results.length} matching vehicle(s):</strong><br><br>`;
                    const showMax = Math.min(10, results.length);
                    for (let i = 0; i < showMax; i++) {
                        const v = results[i];
                        response += `<div class="lg-vehicle-card"><div class="lg-vehicle-title">${v.year} ${v.make} ${v.model}</div><div class="lg-vehicle-details">📍 Row ${v.row} | Stock #${v.stock} ${v.color ? `| Color: ${v.color}` : ''}</div></div>`;
                    }
                    if (results.length > 10) {
                        response += `<br><em>...and ${results.length - 10} more!</em><br>`;
                    }
                    response += `<br>${getRandomResponse('tools')}`;
                    return response;
                } else {
                    return `${getRandomResponse('noInventory')}`;
                }
            }
        }

        if (lower.includes('inventory')) {
            if (inventoryData.length === 0) await loadInventoryData();
            return `We have ${inventoryData.length || 'tons of'} vehicles in our yard! Tell me what you're looking for! Try: "Ford F150" or "Honda Accord"`;
        }

        if (lower.includes('hour') || lower.includes('open')) {
            const hours = CONFIG.HOURS[currentLanguage];
            return `🕐 <strong>Store Hours:</strong><br>${Object.entries(hours).map(([day, time]) => `${day}: ${time}`).join('<br>')}<br><br>💵 <strong>Gate Fee:</strong> ${CONFIG.GATE_FEE}`;
        }

        if (lower.includes('direction') || lower.includes('location') || lower.includes('address')) {
            return `📍 <strong>Find us at:</strong><br>${CONFIG.ADDRESS}<br><br><a href="https://maps.google.com/?q=${encodeURIComponent(CONFIG.ADDRESS)}" target="_blank" style="color:#4ade80;">🗺️ Get Directions on Google Maps</a>`;
        }
        
        if (lower.includes('thank') || lower.includes('gracias')) {
            return `You're welcome, amigo! Need anything else?`;
        }

        return `🤔 I'm not sure, amigo. Try asking for a specific vehicle ("2015 Ford F150"), a part price ("how much for an alternator?"), or our store hours.`;
    }

    // ========================
    // FORMAT PART PRICE
    // ========================
    function formatPartPrice(part) {
        const partName = part.name || "that part";
        const basePrice = parseFloat(part.price);
        const warrantyPrice = parseFloat(part.warrantyPrice);
        const coreCharge = parseFloat(part.core);
        
        let response = `💰 <strong>Price for ${partName.toUpperCase()}:</strong><br><div class="lg-price-info">`;
        
        response += `<div class="lg-price-line"><span class="lg-price-label">Base Price:</span><span class="lg-price-value">$${basePrice.toFixed(2)}</span></div>`;
        response += `<div class="lg-price-line"><span class="lg-price-label">With Warranty:</span><span class="lg-price-value">$${warrantyPrice.toFixed(2)}</span></div>`;
        
        if (coreCharge > 0) {
            response += `<div class="lg-price-line"><span class="lg-price-label">Core Charge:</span><span class="lg-price-value">$${coreCharge.toFixed(2)}</span></div><br><small>💡 Core charge is refundable when you bring your old part!</small>`;
        }
        
        response += `</div><br>${getRandomResponse('prices')}<br><br>📋 <a href="${CONFIG.PARTS_LIST_URL}" target="_blank" style="color:#4ade80;">View Complete Price List</a>`;
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
        
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        conversationContext.push({ role: sender, content: content });
        if (conversationContext.length > 10) {
            conversationContext.shift();
        }
    }

    // ========================
    // AUTO-LOAD ON PAGE READY
    // ========================
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadInventoryData();
        }, 2000);
    });

})();
</script>

</body>
</html>

