const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional, but good for console logs if installed, otherwise I'll just use console
const Tour = require('../models/Tour');
const User = require('../models/User');
const connectDB = require('../config/db');

// Load env vars
dotenv.config({ path: '../../.env' }); // Adjust path if running from src/utils

// Connect to DB
// We need to handle the path to .env correctly. 
// If running from root: dotenv.config() is fine.
// If running from src/utils: dotenv.config({ path: '../../.env' })

// Let's assume we run this from the root: node src/utils/seeder.js
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const tours = [
    {
        id: 1,
        title: "Classic Italy Tour Package",
        location: "Italy",
        description: "A journey to visit Rome, Florence, and Venice, with guided tours of famous landmarks like the Colosseum, Vatican City, and the Leaning Tower of Pisa.",
        price: 1200,
        duration: 10,
        rating: 4.8,
        category: "City",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Rome", "Siena", "Florence", "Venice", "Milan"],
        accommodation: "4-Star Boutique Hotels",
        transport: "High-speed Train & Private Coach",
        meals: "Breakfast Daily, 4 Dinners",
        groupSize: "Small Group (Max 12)",
        operator: "Italiano Classics",
        highlights: ["Colosseum Skip-the-line", "Gondola Ride", "Wine Tasting in Tuscany"]
    },
    {
        id: 2,
        title: "Discover Japan Tour Package",
        location: "Japan",
        description: "Visit Tokyo, Kyoto, Hiroshima, and the Japanese Alps with activities like sushi making class, a visit to a traditional onsen, and a bullet train ride.",
        price: 2500,
        duration: 14,
        rating: 4.9,
        category: "Culture",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Tokyo", "Hakone", "Kyoto", "Hiroshima", "Osaka"],
        accommodation: "3-Star Hotels & 2 Ryokans",
        transport: "Shinkansen (Bullet Train)",
        meals: "Breakfast Daily, 2 Lunches",
        groupSize: "Medium Group (Max 20)",
        operator: "Zen Travels",
        highlights: ["Tea Ceremony", "Mount Fuji View", "Hiroshima Peace Park"]
    },
    {
        id: 3,
        title: "Great Barrier Reef & Sydney",
        location: "Australia",
        description: "A journey that includes a visit to the Great Barrier Reef, a tour of the Sydney Opera House, and a day trip to the Blue Mountains.",
        price: 3400,
        duration: 9,
        rating: 4.7,
        category: "Nature",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Sydney", "Cairns", "Great Barrier Reef", "Blue Mountains"],
        accommodation: "5-Star Resorts",
        transport: "Domestic Flights & Private Yacht",
        meals: "All Inclusive",
        groupSize: "Private Tour",
        operator: "Oz Adventures",
        highlights: ["Scuba Diving", "Opera House Tour", "Private Beach BBQ"]
    },
    {
        id: 4,
        title: "Northern Lights & Glacier",
        location: "Iceland",
        description: "A tour that includes visits to Reykjavik, the Golden Circle, and Vatnajökull National Park, with activities like glacier hiking and ice caving.",
        price: 2200,
        duration: 7,
        rating: 4.9,
        category: "Nature",
        image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Reykjavik", "Vik", "Jokulsarlon", "Golden Circle"],
        accommodation: "Eco-Lodges & Hotels",
        transport: "4x4 Super Jeep",
        meals: "Breakfast Only",
        groupSize: "Small Group (Max 8)",
        operator: "Arctic Explorers",
        highlights: ["Aurora Hunting", "Ice Cave Tour", "Blue Lagoon Entry"]
    },
    {
        id: 5,
        title: "Machu Picchu & Amazon",
        location: "Peru",
        description: "A long journey that includes a visit to Machu Picchu, a stay in the Amazon rainforest, and a tour of the historic city of Cusco.",
        price: 1800,
        duration: 12,
        rating: 4.8,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Lima", "Cusco", "Sacred Valley", "Machu Picchu", "Amazon"],
        accommodation: "Hostels & Jungle Lodges",
        transport: "Bus, Train & Canoe",
        meals: "Full Board in Jungle, Breakfast otherwise",
        groupSize: "Backpacker Group (Max 25)",
        operator: "Inca Paths",
        highlights: ["Inca Trail Hike", "Jungle Night Walk", "Pisco Sour Class"]
    },
    {
        id: 6,
        title: "Temples & Beaches Tour",
        location: "Thailand",
        description: "Enjoy historical relics and natural riches by visiting Bangkok, Chiang Mai, and Phuket, with activities like temple tours and island hopping.",
        price: 900,
        duration: 10,
        rating: 4.6,
        category: "Relaxation",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Bangkok", "Chiang Mai", "Phuket", "Phi Phi Islands"],
        accommodation: "4-Star Beach Resorts",
        transport: "Flight & Speedboat",
        meals: "Breakfast Daily",
        groupSize: "Medium Group (Max 18)",
        operator: "Thai Smiles",
        highlights: ["Elephant Sanctuary", "Floating Market", "Island Snorkeling"]
    },
    {
        id: 7,
        title: "Halong Bay & Mekong Delta",
        location: "Vietnam",
        description: "A week packed with Vietnam cultural adventures. Enjoy a visit to the UNESCO-listed Halong Bay and a cruise through the Mekong Delta.",
        price: 1400,
        duration: 8,
        rating: 4.7,
        category: "Nature",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Hanoi", "Halong Bay", "Da Nang", "Hoi An", "Ho Chi Minh"],
        accommodation: "3-Star Hotels & Luxury Cruise",
        transport: "Sleeper Bus & Boat",
        meals: "Half Board",
        groupSize: "Standard Group (Max 20)",
        operator: "Vietnam Vibes",
        highlights: ["Overnight Cruise", "Lantern Making", "Cu Chi Tunnels"]
    },
    {
        id: 8,
        title: "India Golden Triangle",
        location: "India",
        description: "Explore historical sites from Delhi, Agra (home of the Taj Mahal), and Jaipur, with activities like a cooking class and rickshaw ride.",
        price: 1000,
        duration: 7,
        rating: 4.5,
        category: "Culture",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Delhi", "Agra", "Jaipur", "Delhi"],
        accommodation: "Heritage Havelis & 5-Star Hotels",
        transport: "Private Chauffeur Car",
        meals: "Breakfast & Dinners",
        groupSize: "Private or Small Group",
        operator: "Royal Rajasthan",
        highlights: ["Taj Mahal Sunrise", "Amber Fort Elephant Ride", "Street Food Tour"]
    },
    {
        id: 9,
        title: "Swiss Alps Adventure",
        location: "Switzerland",
        description: "Experience the breathtaking Swiss Alps with visits to Zurich, Interlaken, and Zermatt. Enjoy skiing, mountain hiking, and scenic train rides.",
        price: 2800,
        duration: 8,
        rating: 4.9,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Zurich", "Lucerne", "Interlaken", "Zermatt", "Geneva"],
        accommodation: "Mountain Chalets & 4-Star Hotels",
        transport: "Scenic Trains & Cable Cars",
        meals: "Breakfast Daily, 3 Dinners",
        groupSize: "Small Group (Max 15)",
        operator: "Alpine Tours",
        highlights: ["Matterhorn View", "Jungfraujoch Excursion", "Swiss Chocolate Factory"]
    },
    {
        id: 10,
        title: "Morocco Desert Expedition",
        location: "Morocco",
        description: "Journey through Morocco's imperial cities and the Sahara Desert. Experience camel rides, ancient medinas, and traditional Berber culture.",
        price: 1600,
        duration: 10,
        rating: 4.7,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Casablanca", "Marrakech", "Sahara Desert", "Fes", "Chefchaouen"],
        accommodation: "Riads & Desert Camps",
        transport: "Private 4x4 & Camel",
        meals: "Full Board",
        groupSize: "Medium Group (Max 16)",
        operator: "Sahara Explorers",
        highlights: ["Desert Camping", "Marrakech Souks", "Atlas Mountains Trek"]
    },
    {
        id: 11,
        title: "New Zealand Nature Tour",
        location: "New Zealand",
        description: "Discover the stunning landscapes of New Zealand from fjords to geothermal parks. Visit both North and South Islands.",
        price: 3200,
        duration: 14,
        rating: 4.8,
        category: "Nature",
        image: "https://images.unsplash.com/photo-1469521669194-babb92d84d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Auckland", "Rotorua", "Wellington", "Queenstown", "Milford Sound"],
        accommodation: "4-Star Hotels & Lodges",
        transport: "Domestic Flights & Coach",
        meals: "Breakfast Daily, 5 Dinners",
        groupSize: "Standard Group (Max 20)",
        operator: "Kiwi Adventures",
        highlights: ["Milford Sound Cruise", "Hobbiton Visit", "Bungy Jumping"]
    },
    {
        id: 12,
        title: "Greek Island Hopping",
        location: "Greece",
        description: "Sail through the beautiful Greek islands including Santorini, Mykonos, and Crete. Enjoy crystal-clear waters and ancient ruins.",
        price: 2100,
        duration: 9,
        rating: 4.6,
        category: "Relaxation",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Athens", "Santorini", "Mykonos", "Crete", "Rhodes"],
        accommodation: "Boutique Hotels & Villas",
        transport: "Ferry & Private Transfers",
        meals: "Breakfast Daily, 3 Dinners",
        groupSize: "Small Group (Max 14)",
        operator: "Aegean Journeys",
        highlights: ["Sunset in Santorini", "Ancient Delphi", "Beach Relaxation"]
    },
    {
        id: 13,
        title: "Canadian Rockies Explorer",
        location: "Canada",
        description: "Explore the majestic Canadian Rockies with visits to Banff, Jasper, and Lake Louise. Wildlife viewing and glacier walks included.",
        price: 2600,
        duration: 8,
        rating: 4.8,
        category: "Nature",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Calgary", "Banff", "Lake Louise", "Jasper", "Vancouver"],
        accommodation: "Mountain Lodges",
        transport: "Private Coach & Gondola",
        meals: "Breakfast & Dinners",
        groupSize: "Small Group (Max 12)",
        operator: "Rocky Mountain Tours",
        highlights: ["Glacier Skywalk", "Moraine Lake", "Grizzly Bear Spotting"]
    },
    {
        id: 14,
        title: "Egypt Nile Cruise",
        location: "Egypt",
        description: "Cruise along the Nile River visiting ancient temples and pyramids. Experience the wonders of ancient Egypt in luxury.",
        price: 1900,
        duration: 10,
        rating: 4.7,
        category: "Culture",
        image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Cairo", "Luxor", "Aswan", "Abu Simbel", "Alexandria"],
        accommodation: "Luxury Nile Cruise Ship",
        transport: "Cruise Ship & Private Car",
        meals: "Full Board on Cruise",
        groupSize: "Medium Group (Max 25)",
        operator: "Pharaoh Voyages",
        highlights: ["Pyramids of Giza", "Valley of the Kings", "Karnak Temple"]
    },
    {
        id: 15,
        title: "Patagonia Wilderness Trek",
        location: "Argentina",
        description: "Trek through the stunning landscapes of Patagonia including glaciers, mountains, and pristine lakes in Argentina and Chile.",
        price: 2400,
        duration: 12,
        rating: 4.9,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Buenos Aires", "El Calafate", "Torres del Paine", "Ushuaia"],
        accommodation: "Eco-Lodges & Camping",
        transport: "4x4 & Trekking",
        meals: "Full Board",
        groupSize: "Small Group (Max 10)",
        operator: "Southern Trails",
        highlights: ["Perito Moreno Glacier", "W Trek", "Wildlife Photography"]
    },
    {
        id: 16,
        title: "Bali Cultural Retreat",
        location: "Indonesia",
        description: "Immerse yourself in Balinese culture with temple visits, rice terrace walks, and traditional ceremonies in this tropical paradise.",
        price: 1300,
        duration: 8,
        rating: 4.6,
        category: "Relaxation",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Denpasar", "Ubud", "Tegallalang", "Seminyak", "Nusa Dua"],
        accommodation: "Boutique Resorts & Villas",
        transport: "Private Driver",
        meals: "Breakfast Daily, 3 Dinners",
        groupSize: "Small Group (Max 12)",
        operator: "Bali Essence",
        highlights: ["Monkey Forest", "Rice Terraces", "Traditional Dance Show"]
    },
    {
        id: 17,
        title: "Norway Fjords Expedition",
        location: "Norway",
        description: "Sail through Norway's magnificent fjords and visit charming coastal towns. Experience the midnight sun or northern lights depending on season.",
        price: 2900,
        duration: 9,
        rating: 4.8,
        category: "Nature",
        image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Bergen", "Geiranger", "Flam", "Alesund", "Trondheim"],
        accommodation: "4-Star Hotels",
        transport: "Cruise Ship & Train",
        meals: "Breakfast & Dinners",
        groupSize: "Standard Group (Max 18)",
        operator: "Nordic Voyages",
        highlights: ["Geirangerfjord Cruise", "Flam Railway", "Bergen Fish Market"]
    },
    {
        id: 18,
        title: "South African Safari",
        location: "South Africa",
        description: "Experience the Big Five on safari in Kruger National Park, then explore Cape Town and the Garden Route.",
        price: 3100,
        duration: 11,
        rating: 4.9,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Johannesburg", "Kruger Park", "Cape Town", "Garden Route", "Stellenbosch"],
        accommodation: "Safari Lodges & 4-Star Hotels",
        transport: "4x4 Safari Vehicles & Private Car",
        meals: "Full Board on Safari, Breakfast otherwise",
        groupSize: "Small Group (Max 12)",
        operator: "African Wild",
        highlights: ["Big Five Safari", "Table Mountain", "Wine Tasting"]
    },
    {
        id: 19,
        title: "Portugal Coastal Journey",
        location: "Portugal",
        description: "Discover Portugal's beautiful coastline, historic cities, and renowned wine regions from Lisbon to Porto.",
        price: 1700,
        duration: 9,
        rating: 4.5,
        category: "City",
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Lisbon", "Sintra", "Coimbra", "Porto", "Douro Valley"],
        accommodation: "Charming Hotels",
        transport: "Private Coach",
        meals: "Breakfast Daily, 4 Dinners",
        groupSize: "Medium Group (Max 20)",
        operator: "Lusitania Tours",
        highlights: ["Pena Palace", "Port Wine Tasting", "Douro River Cruise"]
    },
    {
        id: 20,
        title: "Costa Rica Eco Adventure",
        location: "Costa Rica",
        description: "Experience the biodiversity of Costa Rica with rainforest hikes, volcano visits, and beach relaxation.",
        price: 2000,
        duration: 10,
        rating: 4.7,
        category: "Nature",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea57c9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["San Jose", "Arenal Volcano", "Monteverde", "Manuel Antonio", "Tortuguero"],
        accommodation: "Eco-Lodges & Beach Resorts",
        transport: "Private Van & Boat",
        meals: "Breakfast Daily, 5 Dinners",
        groupSize: "Small Group (Max 14)",
        operator: "Pura Vida Eco",
        highlights: ["Volcano Hot Springs", "Zip-lining", "Turtle Nesting"]
    },
    {
        id: 21,
        title: "Turkey Heritage Trail",
        location: "Turkey",
        description: "Journey through Turkey's rich history from Istanbul's grand bazaars to the fairy chimneys of Cappadocia.",
        price: 1500,
        duration: 10,
        rating: 4.6,
        category: "Culture",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Istanbul", "Cappadocia", "Pamukkale", "Ephesus", "Antalya"],
        accommodation: "Cave Hotels & 4-Star Hotels",
        transport: "Private Coach & Domestic Flight",
        meals: "Breakfast Daily, 4 Dinners",
        groupSize: "Medium Group (Max 18)",
        operator: "Ottoman Trails",
        highlights: ["Hot Air Balloon", "Grand Bazaar", "Ancient Ephesus"]
    },
    {
        id: 22,
        title: "Scotland Highlands Tour",
        location: "Scotland",
        description: "Explore the mystical Scottish Highlands with castle visits, whisky tastings, and dramatic landscapes.",
        price: 1900,
        duration: 8,
        rating: 4.7,
        category: "City",
        image: "https://images.unsplash.com/photo-1606150584169-d501c90067df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Edinburgh", "Loch Ness", "Isle of Skye", "Glencoe", "Stirling"],
        accommodation: "Historic Hotels & Castles",
        transport: "Private Coach",
        meals: "Breakfast & Dinners",
        groupSize: "Small Group (Max 16)",
        operator: "Highland Heritage",
        highlights: ["Edinburgh Castle", "Loch Ness Cruise", "Whisky Distillery"]
    },
    {
        id: 23,
        title: "Jordan Ancient Wonders",
        location: "Jordan",
        description: "Discover the ancient city of Petra, float in the Dead Sea, and explore the Wadi Rum desert.",
        price: 1800,
        duration: 7,
        rating: 4.8,
        category: "Culture",
        image: "https://images.unsplash.com/photo-1590668057042-6c3b82106d50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: true,
        route: ["Amman", "Petra", "Wadi Rum", "Aqaba", "Dead Sea"],
        accommodation: "4-Star Hotels & Desert Camp",
        transport: "Private 4x4",
        meals: "Full Board",
        groupSize: "Small Group (Max 12)",
        operator: "Nabatean Tours",
        highlights: ["Treasury at Petra", "Bedouin Camp", "Dead Sea Floating"]
    },
    {
        id: 24,
        title: "Cambodia Temple Discovery",
        location: "Cambodia",
        description: "Explore the magnificent temples of Angkor Wat and experience Cambodia's rich Khmer heritage and culture.",
        price: 1100,
        duration: 8,
        rating: 4.5,
        category: "Culture",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        popular: false,
        route: ["Phnom Penh", "Siem Reap", "Angkor Wat", "Tonle Sap", "Battambang"],
        accommodation: "3-Star Hotels",
        transport: "Tuk-tuk & Private Van",
        meals: "Breakfast Daily, 3 Dinners",
        groupSize: "Standard Group (Max 20)",
        operator: "Khmer Journeys",
        highlights: ["Angkor Sunrise", "Floating Village", "Traditional Dance"]
    }
];

const users = [
    {
        name: 'Admin User',
        email: 'admin@wayfarer.com',
        password: 'adminpassword',
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Demo User',
        email: 'demo@wayfarer.com',
        password: 'demo123',
        role: 'user'
    }
];

const importData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();

        await Tour.insertMany(tours);
        await User.create(users);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
