import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  Camera,
  Car,
  Coffee,
  ShieldCheck,
  Languages,
  BadgeCheck,
  QrCode,
  ArrowRight,
  Users,
  Utensils,
  Bus,
  Building,
  X
} from 'lucide-react';
import Footer from '../Components/Footer';

// --- Mock Data (Same as ProductPage) ---
const TOURS = [
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

const LOCAL_GUIDES = [
  {
    id: 'g1',
    name: "Marco Rossi",
    location: "Italy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 85,
    languages: ["English", "Italian", "Spanish"],
    verified: true,
    expertise: "Art History",
    rating: 4.9,
    experience: "8 Years"
  },
  {
    id: 'g2',
    name: "Akiko Tanaka",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 120,
    languages: ["English", "Japanese"],
    verified: true,
    expertise: "Culinary Tours",
    rating: 5.0,
    experience: "12 Years"
  },
  {
    id: 'g3',
    name: "Sarah Jenkins",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 95,
    languages: ["English"],
    verified: true,
    expertise: "Marine Biology",
    rating: 4.8,
    experience: "5 Years"
  },
  {
    id: 'g4',
    name: "Raj Patel",
    location: "India",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 60,
    languages: ["English", "Hindi", "French"],
    verified: true,
    expertise: "Architecture",
    rating: 4.9,
    experience: "15 Years"
  },
  {
    id: 'g5',
    name: "Hans Mueller",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 110,
    languages: ["English", "German", "French"],
    verified: true,
    expertise: "Mountain Sports",
    rating: 4.9,
    experience: "10 Years"
  },
  {
    id: 'g6',
    name: "Fatima El-Sayed",
    location: "Morocco",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 70,
    languages: ["English", "Arabic", "French"],
    verified: true,
    expertise: "Desert Expeditions",
    rating: 4.7,
    experience: "7 Years"
  },
  {
    id: 'g7',
    name: "Emma Wilson",
    location: "New Zealand",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 100,
    languages: ["English"],
    verified: true,
    expertise: "Adventure Sports",
    rating: 4.8,
    experience: "6 Years"
  },
  {
    id: 'g8',
    name: "Dimitri Papadopoulos",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 75,
    languages: ["English", "Greek"],
    verified: true,
    expertise: "Ancient History",
    rating: 4.6,
    experience: "9 Years"
  },
  {
    id: 'g9',
    name: "Lars Andersson",
    location: "Norway",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 105,
    languages: ["English", "Norwegian", "Swedish"],
    verified: true,
    expertise: "Fjord Cruises",
    rating: 4.9,
    experience: "11 Years"
  },
  {
    id: 'g10',
    name: "Amara Nkosi",
    location: "South Africa",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rate: 90,
    languages: ["English", "Zulu", "Afrikaans"],
    verified: true,
    expertise: "Wildlife Safari",
    rating: 5.0,
    experience: "13 Years"
  }
];

// --- Components ---
const PreviousButton = () => (
  <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-space text-sm">
    <ChevronLeft size={16} />
    Previous
  </button>
);

// --- Guide ID Card Component ---
const GuideIdCard = ({ guide, isSelected, onToggle }) => (
  <div className={`relative w-full rounded-2xl overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-slate-800 shadow-xl scale-[1.02]' : 'border border-slate-200 shadow-sm hover:shadow-md'}`}>
    {/* ID Card Header Pattern */}
    <div className="h-24 bg-slate-800 relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-4 right-4 text-white/30">
        <QrCode size={32} />
      </div>
      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white tracking-widest uppercase border border-white/20">
        <ShieldCheck size={10} />
        Official Guide
      </div>
    </div>

    {/* Content */}
    <div className="bg-white px-5 pb-5 pt-0 relative">
      {/* Profile Image - Overlapping */}
      <div className="absolute -top-12 left-5 w-24 h-24 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-slate-100">
        <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex justify-end pt-3 mb-2">
        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 px-2 py-0.5 rounded-full">
          <Star size={12} fill="currentColor" />
          {guide.rating}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          {guide.name}
          {guide.verified && <BadgeCheck size={18} className="text-slate-800" fill="currentColor" color="white" />}
        </h3>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-4">{guide.expertise} Specialist • {guide.experience} Exp.</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <Languages size={14} className="text-slate-400 mt-0.5 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {guide.languages.map(lang => (
                <span key={lang} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{lang}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            Based in {guide.location}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 border-dashed">
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Daily Rate</span>
            <span className="text-lg font-bold text-slate-900">${guide.rate}</span>
          </div>
          <button
            onClick={() => onToggle(guide)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${isSelected ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-slate-800 text-white hover:bg-slate-900 shadow-lg shadow-slate-200'}`}
          >
            {isSelected ? (
              <>
                <X size={14} /> Remove
              </>
            ) : (
              <>
                Hire Guide <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Detail Page Component ---
const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = TOURS.find(t => t.id === parseInt(id));

  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [roomType, setRoomType] = useState('Standard');
  const [extras, setExtras] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState([]);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mock Extras
  const availableExtras = [
    { id: 'photo', label: 'Pro Photography', price: 150, icon: Camera },
    { id: 'transfer', label: 'Private Airport Transfer', price: 80, icon: Car },
    { id: 'breakfast', label: 'Premium Breakfast', price: 200, icon: Coffee },
  ];

  // Logic
  const roomMultipliers = { 'Standard': 1, 'Deluxe': 1.2, 'Suite': 1.5 };

  const toggleExtra = (id) => {
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const toggleGuide = (guide) => {
    setSelectedGuides(prev => {
      const exists = prev.find(g => g.id === guide.id);
      if (exists) return prev.filter(g => g.id !== guide.id);
      return [...prev, guide];
    });
  };

  const calculateTotal = () => {
    if (!tour) return 0;
    let base = tour.price * guests;
    base = base * roomMultipliers[roomType];

    // Add extras
    const extrasTotal = extras.reduce((acc, id) => {
      const extra = availableExtras.find(e => e.id === id);
      return acc + (extra ? extra.price : 0);
    }, 0);

    // Add Guides (assuming guide rate is per day * duration)
    const guidesTotal = selectedGuides.reduce((acc, guide) => {
      return acc + (guide.rate * tour.duration);
    }, 0);

    return Math.round(base + extrasTotal + guidesTotal);
  };

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#faf9f6' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Tour Not Found</h2>
          <Link to="/products" className="inline-block mt-4">
            <PreviousButton />
          </Link>
        </div>
      </div>
    );
  }

  const relevantGuides = LOCAL_GUIDES.filter(g => g.location === tour.location || tour.route.some(r => r.includes(g.location)));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf9f6' }}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link to="/products">
          <PreviousButton />
        </Link>
        <div className="hidden md:block font-bold text-slate-900">{tour.title}</div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Total Price</span>
            <span className="text-lg font-bold text-slate-900">${calculateTotal().toLocaleString()}</span>
          </div>
          <button
            onClick={() => document.getElementById('booking-sidebar')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-900 transition shadow-lg shadow-slate-200"
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Image */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8 shadow-2xl">
              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow-lg">
                  {tour.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight font-serif">{tour.title}</h1>
                <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                  <span className="flex items-center gap-1"><MapPin size={16} /> {tour.location}</span>
                  <span className="flex items-center gap-1"><Clock size={16} /> {tour.duration} Days</span>
                  <span className="flex items-center gap-1 text-amber-400"><Star size={16} fill="currentColor" /> {tour.rating}</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Tour Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{tour.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: Building, label: "Accommodation", value: tour.accommodation },
                  { icon: Bus, label: "Transport", value: tour.transport },
                  { icon: Utensils, label: "Meals", value: tour.meals },
                  { icon: Users, label: "Group Size", value: tour.groupSize },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <item.icon className="text-slate-800 mb-2" size={24} />
                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">{item.label}</div>
                    <div className="font-semibold text-slate-900 text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Route Highlights</h2>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center gap-4">
                  {tour.route.map((stop, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm font-bold text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-mono">
                          {index + 1}
                        </div>
                        {stop}
                      </div>
                      {index < tour.route.length - 1 && <div className="h-0.5 w-8 bg-slate-300"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Highlights Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                      <Star size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Guide Booking Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-serif">Book a Local Guide</h2>
                  <p className="text-slate-500 mt-1">Enhance your trip with a verified local expert.</p>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <ShieldCheck size={14} /> Verified Professionals
                </span>
              </div>

              {relevantGuides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relevantGuides.map(guide => (
                    <GuideIdCard
                      key={guide.id}
                      guide={guide}
                      isSelected={selectedGuides.some(g => g.id === guide.id)}
                      onToggle={toggleGuide}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-200 text-slate-500">
                  No specific local guides available for this region yet.
                </div>
              )}
            </section>
          </div>

          {/* Customization Panel (Sidebar) */}
          <div id="booking-sidebar" className="lg:w-[400px] shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <h3 className="text-xl font-bold relative z-10 font-serif">Customize Package</h3>
                <p className="text-slate-200 text-sm relative z-10">Tailor your experience</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Date & Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Start Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-slate-500 outline-none"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-slate-500 outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} People</option>)}
                    </select>
                  </div>
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Accommodation Class</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Standard', 'Deluxe', 'Suite'].map(type => (
                      <button
                        key={type}
                        onClick={() => setRoomType(type)}
                        className={`py-2 px-1 rounded-lg text-xs font-bold border transition ${roomType === type ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Optional Extras</label>
                  <div className="space-y-2">
                    {availableExtras.map(extra => (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${extras.includes(extra.id) ? 'bg-slate-50 border-slate-800 ring-1 ring-slate-800' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${extras.includes(extra.id) ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-500'}`}>
                            <extra.icon size={16} />
                          </div>
                          <span className={`text-sm font-medium ${extras.includes(extra.id) ? 'text-slate-900' : 'text-slate-700'}`}>{extra.label}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-500">+${extra.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Guides Summary */}
                {selectedGuides.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2 flex justify-between">
                      <span>Selected Guides</span>
                      <span>{selectedGuides.length}</span>
                    </div>
                    <div className="flex -space-x-2 overflow-hidden py-1">
                      {selectedGuides.map(g => (
                        <img key={g.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={g.image} alt={g.name} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Total & Action */}
                <div className="border-t border-slate-100 pt-6 mt-2">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-slate-500 font-medium">Total Estimate</span>
                    <span className="text-3xl font-bold text-slate-900">${calculateTotal().toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      // Check if logged in first
                      const token = localStorage.getItem('token');
                      if (!token) {
                        navigate('/login');
                        return;
                      }

                      if (!date) {
                        alert("Please select a travel date to proceed.");
                        return;
                      }

                      navigate('/checkout', {
                        state: {
                          tour,
                          guests,
                          date,
                          roomType,
                          extras,
                          selectedGuides,
                          totalPrice: calculateTotal()
                        }
                      });
                    }}
                    className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-900 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    Book Now <ArrowRight size={18} />
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck size={10} /> Secure Booking • Free Cancellation up to 24h
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailPage;
