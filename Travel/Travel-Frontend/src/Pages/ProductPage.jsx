import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Search,
  Grid,
  List,
  ChevronRight,
  Star,
  X,
  Filter,
  Heart,
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  Users,
  Utensils,
  Bus,
  Building
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

// --- Mock Data (Expanded) ---
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

// --- Comparison Component ---
const ComparisonView = ({ selectedIds, onClose, onRemove }) => {
  const selectedTours = TOURS.filter(t => selectedIds.includes(t.id));
  const gridCols = selectedTours.length === 2 ? 'grid-cols-3' : selectedTours.length === 3 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm overflow-y-auto flex items-start justify-center pt-10 pb-10 px-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-playfair">Compare Packages</h2>
            <p className="text-sm text-slate-600 font-space">Side-by-side detailed comparison</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition">
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto flex-1">
          <div className="min-w-[800px] p-6">
            <div className={`grid ${gridCols} gap-0 border border-slate-200 rounded-xl overflow-hidden`}>

              {/* 1. Header Row (Images & Titles) */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-bold text-slate-700 flex items-center font-playfair">
                Package Details
              </div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 min-w-[200px] relative group">
                  <button
                    onClick={() => onRemove(tour.id)}
                    className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-white shadow-sm z-10"
                    title="Remove from comparison"
                  >
                    <X size={16} />
                  </button>
                  <div className="h-32 rounded-lg overflow-hidden mb-3">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 font-playfair">{tour.title}</h3>
                  <div className="text-xs text-slate-800 font-semibold font-space">{tour.location}</div>
                  <div className="mt-2 font-bold text-lg font-playfair">${tour.price.toLocaleString()}</div>
                </div>
              ))}

              {/* 2. Rating & Category */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-semibold text-slate-600 text-sm font-space">Rating & Type</div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 text-sm">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="font-bold font-space">{tour.rating}</span>
                    <span className="text-slate-400 font-space">/ 5.0</span>
                  </div>
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-medium border border-slate-200 font-space">
                    {tour.category}
                  </span>
                </div>
              ))}

              {/* 3. Duration */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-semibold text-slate-600 text-sm font-space">Duration</div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 text-sm font-medium text-slate-800 font-space">
                  {tour.duration} Days
                </div>
              ))}

              {/* 4. Route/Itinerary */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-semibold text-slate-600 text-sm font-space">Route Highlights</div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 text-sm text-slate-600">
                  <div className="flex flex-wrap gap-1 font-space">
                    {tour.route.map((stop, i) => (
                      <span key={i} className="flex items-center">
                        {stop}
                        {i < tour.route.length - 1 && <ArrowRight size={10} className="mx-1 text-slate-300" />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* 5. Accommodation */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-semibold text-slate-600 text-sm font-space">Accommodation</div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 text-sm flex items-start gap-2">
                  <Building size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="font-space">{tour.accommodation}</span>
                </div>
              ))}

              {/* 6. Transport */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-semibold text-slate-600 text-sm font-space">Transport</div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 text-sm flex items-start gap-2">
                  <Bus size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="font-space">{tour.transport}</span>
                </div>
              ))}

              {/* 7. Meals */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-semibold text-slate-600 text-sm font-space">Meals Included</div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 text-sm flex items-start gap-2">
                  <Utensils size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="font-space">{tour.meals}</span>
                </div>
              ))}

              {/* 8. Group Size */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-semibold text-slate-600 text-sm font-space">Group Size</div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 text-sm flex items-start gap-2">
                  <Users size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="font-space">{tour.groupSize}</span>
                </div>
              ))}

              {/* 9. Operator */}
              <div className="bg-slate-50 p-4 border-b border-r border-slate-200 font-semibold text-slate-600 text-sm font-space">Tour Operator</div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-b border-r border-slate-200 text-sm text-slate-600 italic font-space">
                  Powered by {tour.operator}
                </div>
              ))}

              {/* 10. Action */}
              <div className="bg-slate-50 p-4 border-r border-slate-200"></div>
              {selectedTours.map(tour => (
                <div key={tour.id} className="p-4 border-r border-slate-200">
                  <button className="w-full bg-slate-800 text-white py-2 rounded-lg text-sm font-bold hover:bg-slate-900 transition shadow-sm font-space">
                    Select This Package
                  </button>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Components ---

const PreviousButton = () => (
  <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-space text-sm">
    <ArrowLeft size={16} />
    Previous
  </button>
);

const Hero = () => (
  <div className="w-full pt-8 md:pt-12 pb-2 md:pb-3 bg-[#faf9f6]">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-light text-slate-900">Tour Packages</h1>
    </div>
  </div>
);

const FilterSection = ({ title, children, onClear }) => (
  <div className="mb-8 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-space">{title}</h3>
      {onClear && (
        <button onClick={onClear} className="text-[10px] text-slate-800 hover:underline font-medium font-space">
          Reset
        </button>
      )}
    </div>
    {children}
  </div>
);

const Checkbox = ({ label, count, checked, onChange, subLabel }) => (
  <label className="flex items-center justify-between mb-3 cursor-pointer group hover:bg-slate-50 p-1.5 -mx-1.5 rounded transition">
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-slate-800 border-slate-800' : 'border-slate-300 group-hover:border-slate-600'}`}>
        {checked && <div className="w-2 h-2 bg-white rounded-sm"></div>}
      </div>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <div className="flex flex-col">
        <span className={`text-sm font-space ${checked ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{label}</span>
        {subLabel && <span className="text-[10px] text-slate-400 font-space">{subLabel}</span>}
      </div>
    </div>
    {count !== undefined && <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full group-hover:bg-white group-hover:shadow-sm transition font-space">{count}</span>}
  </label>
);

const RangeSlider = ({ value, onChange, min, max }) => (
  <div className="px-2">
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500/30"
    />
    <div className="flex justify-between mt-3 text-sm font-medium text-slate-600 font-space">
      <span>${min}</span>
      <span className="text-slate-800 font-bold">${value}</span>
    </div>
  </div>
);

const ActiveFilterTag = ({ label, onRemove }) => (
  <div className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-semibold font-space">
    {label}
    <button onClick={onRemove} className="hover:bg-slate-300 rounded-full p-0.5 transition">
      <X size={12} />
    </button>
  </div>
);

const ProductPage = () => {
  // --- STATE ---
  const [viewMode, setViewMode] = useState('list'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(() => {
    // Restore page from sessionStorage
    return parseInt(sessionStorage.getItem('tourPageNumber')) || 1;
  });
  const itemsPerPage = 8;

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [minRating, setMinRating] = useState(0);

  // Comparison State
  const [compareList, setCompareList] = useState([]); // Array of IDs
  const [showCompareModal, setShowCompareModal] = useState(false);

  // --- CONFIG ---
  const categories = ["City", "Nature", "Culture", "Relaxation", "Adventure"];
  const maxPriceLimit = 4000;

  const durationRanges = useMemo(() => [
    { label: "Short Trip", sub: "1-7 Days", min: 1, max: 7 },
    { label: "Medium", sub: "8-14 Days", min: 8, max: 14 },
    { label: "Long Haul", sub: "15+ Days", min: 15, max: 100 }
  ], []);

  const ratings = [5, 4, 3];

  // --- HANDLERS ---
  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleDurationChange = (label) => {
    setSelectedDurations(prev => prev.includes(label) ? prev.filter(d => d !== label) : [...prev, label]);
  };

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        if (prev.length >= 4) {
          alert("You can only compare up to 4 packages at a time.");
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const resetAll = () => {
    setSelectedCategories([]);
    setSelectedDurations([]);
    setMaxPrice(maxPriceLimit);
    setMinRating(0);
    setSearchQuery('');
  };

  // --- FILTERING LOGIC ---
  const filteredTours = useMemo(() => {
    return TOURS.filter(tour => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!tour.title.toLowerCase().includes(query) && !tour.location.toLowerCase().includes(query)) {
          return false;
        }
      }

      if (selectedCategories.length > 0 && !selectedCategories.includes(tour.category)) {
        return false;
      }

      if (selectedDurations.length > 0) {
        const matchesDuration = selectedDurations.some(label => {
          const range = durationRanges.find(r => r.label === label);
          return tour.duration >= range.min && tour.duration <= range.max;
        });
        if (!matchesDuration) return false;
      }

      if (tour.price > maxPrice) {
        return false;
      }

      if (minRating > 0 && tour.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedDurations, maxPrice, minRating, durationRanges]);

  const activeFilterCount =
    selectedCategories.length +
    selectedDurations.length +
    (maxPrice < maxPriceLimit ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  // Pagination Logic
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTours = filteredTours.slice(startIndex, endIndex);

  // Reset to page 1 when filters change (but not on initial mount)
  React.useEffect(() => {
    const currentFiltersKey = JSON.stringify({ searchQuery, selectedCategories, selectedDurations, maxPrice, minRating });
    const savedFiltersKey = sessionStorage.getItem('tourFilters');

    if (savedFiltersKey && currentFiltersKey !== savedFiltersKey) {
      setCurrentPage(1);
      sessionStorage.setItem('tourPageNumber', 1);
    }
    sessionStorage.setItem('tourFilters', currentFiltersKey);
  }, [searchQuery, selectedCategories, selectedDurations, maxPrice, minRating]);

  // Restore scroll position on mount
  React.useEffect(() => {
    const savedScrollY = sessionStorage.getItem('tourScrollY');
    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY));
      sessionStorage.removeItem('tourScrollY');
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem('tourPageNumber', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] font-playfair text-slate-900 relative">
      <Navbar />

      {/* Comparison Modal Overlay */}
      {showCompareModal && (
        <ComparisonView
          selectedIds={compareList}
          onClose={() => setShowCompareModal(false)}
          onRemove={(id) => setCompareList(prev => prev.filter(pid => pid !== id))}
        />
      )}

      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-2">
        <Link to="/">
          <PreviousButton />
        </Link>
      </div>

      <Hero />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* --- LEFT SIDEBAR PANEL --- */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:sticky lg:top-6 overflow-y-auto max-h-[calc(100vh-100px)]">

              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-playfair">
                  <Filter size={18} className="text-slate-800" />
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <button onClick={resetAll} className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline transition font-space">
                    Clear All
                  </button>
                )}
              </div>

              {/* Mobile Search */}
              <div className="mb-6 lg:hidden">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-800 text-sm font-space"
                  />
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                </div>
              </div>

              {/* Categories */}
              <FilterSection
                title="Categories"
                onClear={selectedCategories.length > 0 ? () => setSelectedCategories([]) : null}
              >
                {categories.map(cat => (
                  <Checkbox
                    key={cat}
                    label={cat}
                    count={TOURS.filter(t => t.category === cat).length}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                ))}
              </FilterSection>

              {/* Price Filter */}
              <FilterSection
                title="Price Range"
                onClear={maxPrice < maxPriceLimit ? () => setMaxPrice(maxPriceLimit) : null}
              >
                <div className="mb-2">
                  <p className="text-xs text-slate-500 mb-2 font-space">Max Price: <span className="font-bold text-slate-900">${maxPrice}</span></p>
                  <RangeSlider min={0} max={maxPriceLimit} value={maxPrice} onChange={setMaxPrice} />
                </div>
              </FilterSection>

              {/* Duration */}
              <FilterSection
                title="Duration"
                onClear={selectedDurations.length > 0 ? () => setSelectedDurations([]) : null}
              >
                {durationRanges.map(range => (
                  <Checkbox
                    key={range.label}
                    label={range.label}
                    subLabel={range.sub}
                    checked={selectedDurations.includes(range.label)}
                    onChange={() => handleDurationChange(range.label)}
                  />
                ))}
              </FilterSection>

              {/* Rating */}
              <FilterSection
                title="Tour Rating"
                onClear={minRating > 0 ? () => setMinRating(0) : null}
              >
                <div className="space-y-2">
                  {ratings.map(rating => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 -mx-1.5 rounded transition">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${minRating === rating ? 'border-slate-800' : 'border-slate-300'}`}>
                        {minRating === rating && <div className="w-2.5 h-2.5 bg-slate-800 rounded-full"></div>}
                      </div>
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating === minRating ? 0 : rating)}
                      />
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-slate-300" : ""} />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500 font-medium ml-1 font-space">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* --- RIGHT CONTENT AREA --- */}
          <section className="flex-1">

            {/* Top Bar */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-playfair">Explore Packages</h2>
                  <p className="text-sm text-slate-600 mt-1 font-space">Found <span className="font-semibold text-slate-900">{filteredTours.length}</span> tours matching your criteria</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative hidden lg:block w-64">
                    <input
                      type="text"
                      placeholder="Search destination..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm shadow-sm font-space"
                    />
                    <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                  </div>

                  <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm ml-auto md:ml-0">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded flex items-center gap-2 text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded flex items-center gap-2 text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips Bar */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase mr-1 font-space">Active:</span>

                  {selectedCategories.map(cat => (
                    <ActiveFilterTag key={cat} label={cat} onRemove={() => handleCategoryChange(cat)} />
                  ))}

                  {maxPrice < maxPriceLimit && (
                    <ActiveFilterTag label={`Max: $${maxPrice}`} onRemove={() => setMaxPrice(maxPriceLimit)} />
                  )}

                  {selectedDurations.map(dur => (
                    <ActiveFilterTag key={dur} label={dur} onRemove={() => handleDurationChange(dur)} />
                  ))}

                  {minRating > 0 && (
                    <ActiveFilterTag label={`${minRating}+ Stars`} onRemove={() => setMinRating(0)} />
                  )}

                  <button
                    onClick={resetAll}
                    className="text-xs text-slate-400 hover:text-slate-900 underline ml-2 transition font-space"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Pagination - Top */}
            {filteredTours.length > 0 && totalPages > 1 && (
              <div className="mb-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-800 hover:text-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition ${currentPage === page
                        ? 'bg-slate-800 text-white shadow-lg'
                        : 'border border-slate-200 text-slate-400 hover:border-slate-800 hover:text-slate-800'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-800 hover:text-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Tours Grid/List */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {currentTours.length > 0 ? (
                currentTours.map(tour => {
                  const isSelectedForCompare = compareList.includes(tour.id);
                  return (
                    <div key={tour.id} className={`group bg-white rounded-2xl overflow-hidden border ${isSelectedForCompare ? 'border-slate-800 ring-1 ring-slate-800 shadow-lg' : 'border-slate-100'} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex ${viewMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}>

                      {/* Image Section */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-1/3 lg:w-72 h-48 md:h-auto' : 'h-56'}`}>
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-slate-400 hover:text-red-500 cursor-pointer transition">
                          <Heart size={18} />
                        </div>
                        {tour.popular && (
                          <div className="absolute top-3 left-3 bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg font-space">
                            Best Seller
                          </div>
                        )}

                        {/* Compare Checkbox Overlay */}
                        <div className={`absolute bottom-3 left-3 transition-opacity duration-200 ${isSelectedForCompare ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleCompare(tour.id);
                            }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md backdrop-blur-md transition font-space ${isSelectedForCompare ? 'bg-slate-800 text-white' : 'bg-white/90 text-slate-700 hover:bg-white'}`}
                          >
                            <ArrowLeftRight size={14} />
                            {isSelectedForCompare ? 'Added' : 'Compare'}
                          </button>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider font-space">
                            <MapPin size={14} />
                            {tour.location}
                          </div>
                          <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                            <Star size={14} fill="currentColor" />
                            <span className="font-space">{tour.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors font-playfair">
                          {tour.title}
                        </h3>

                        <p className={`text-slate-600 text-sm leading-relaxed mb-4 font-space ${viewMode === 'grid' ? 'line-clamp-3' : 'line-clamp-2 md:line-clamp-none'}`}>
                          {tour.description}
                        </p>

                        {/* Mini Features */}
                        <div className="flex gap-4 mb-6 text-xs text-slate-500 border-t border-b border-slate-50 py-3">
                          <div className="flex items-center gap-1.5" title="Accommodation">
                            <Building size={14} className="text-slate-600" />
                            <span className="truncate max-w-[80px] font-space">{tour.accommodation.split(' ')[0]}...</span>
                          </div>
                          <div className="flex items-center gap-1.5" title="Group Size">
                            <Users size={14} className="text-slate-600" />
                            <span className="truncate max-w-[80px] font-space">{tour.groupSize.split('(')[0]}</span>
                          </div>
                          <div className="flex items-center gap-1.5" title="Meals">
                            <Utensils size={14} className="text-slate-600" />
                            <span className="font-space">Included</span>
                          </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-space">
                              <Clock size={14} />
                              {tour.duration} Days
                            </div>
                            <div className="text-sm text-slate-400 font-space">
                              Start from <span className="text-xl font-bold text-slate-900 font-playfair">${tour.price.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Link
                              to={`/detail/${tour.id}`}
                              onClick={() => sessionStorage.setItem('tourScrollY', window.scrollY)}
                              className="hidden sm:flex items-center justify-center px-4 py-2 border border-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-50 transition text-sm font-space"
                            >
                              Details
                            </Link>
                            <Link
                              to={`/detail/${tour.id}`}
                              onClick={() => sessionStorage.setItem('tourScrollY', window.scrollY)}
                              className="flex items-center justify-center gap-2 px-5 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition shadow-lg text-sm font-space"
                            >
                              Book Now
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <Search size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 font-playfair">No tours found</h3>
                  <p className="text-slate-600 font-space">Try removing some active filters or adjusting your search.</p>
                  <button
                    onClick={resetAll}
                    className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition font-space"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredTours.length > 0 && totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-800 hover:text-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition ${currentPage === page
                        ? 'bg-slate-800 text-white shadow-lg'
                        : 'border border-slate-200 text-slate-400 hover:border-slate-800 hover:text-slate-800'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-800 hover:text-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

          </section>
        </div>
      </main>

      {/* Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full z-40 p-4">
          <div className="container mx-auto max-w-4xl bg-slate-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <ArrowLeftRight className="text-white" size={24} />
              </div>
              <div>
                <span className="font-bold block text-lg font-playfair">{compareList.length} Selected</span>
                <span className="text-slate-300 text-sm font-space">Select up to 4 items to compare details</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareList([])}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white transition font-space"
              >
                Clear
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-slate-50 transition shadow-lg font-space"
              >
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;