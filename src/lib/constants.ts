export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;

export const MAJOR_CITIES: Record<string, string[]> = {
  Lagos: ["Lekki", "Ikoyi", "Victoria Island", "Yaba", "Surulere", "Ajah", "Ikeja", "Gbagada", "Magodo", "Maryland"],
  "FCT Abuja": ["Maitama", "Wuse", "Wuse 2", "Gwarinpa", "Asokoro", "Garki", "Jabi", "Utako", "Kubwa", "Lugbe"],
  Rivers: ["GRA Phase 1", "GRA Phase 2", "Trans Amadi", "Old GRA", "Rumuokwurusi", "Eliozu"],
  Oyo: ["Bodija", "Ring Road", "Dugbe", "UI Area", "Oluyole", "Agodi"],
  Enugu: ["Independence Layout", "GRA", "New Haven", "Trans Ekulu", "Ogui"],
  Kano: ["Nassarawa GRA", "Bompai", "Sabon Gari", "Tarauni"],
  Delta: ["GRA Asaba", "Warri GRA", "Effurun"],
  Edo: ["GRA Benin", "Ugbowo", "Ikpoba Hill"],
};

export const PROPERTY_TYPES = [
  "Flat",
  "Duplex",
  "Self-Contain",
  "Mini Flat",
  "Bungalow",
  "Penthouse",
  "Terrace",
  "Semi-Detached",
  "Detached House",
  "Room & Parlour",
  "Shop/Office Space",
  "Event Hall",
  "Land",
] as const;

export const PRICE_RANGES = [
  { label: "Under ₦50,000/mo", min: 0, max: 50_000 },
  { label: "₦50K - ₦150K/mo", min: 50_000, max: 150_000 },
  { label: "₦150K - ₦300K/mo", min: 150_000, max: 300_000 },
  { label: "₦300K - ₦600K/mo", min: 300_000, max: 600_000 },
  { label: "₦600K - ₦1M/mo", min: 600_000, max: 1_000_000 },
  { label: "₦1M+/mo", min: 1_000_000, max: Infinity },
] as const;

export const BEDROOM_OPTIONS = ["Studio", "1", "2", "3", "4", "5+"] as const;

export const LISTING_STATUSES = ["Available", "Taken", "Under Review", "Draft"] as const;

export const AMENITIES = [
  "24/7 Power Supply",
  "Running Water",
  "Security",
  "Parking Space",
  "Swimming Pool",
  "Gym",
  "Generator",
  "Boys Quarters (BQ)",
  "Balcony",
  "Prepaid Meter",
  "POP Ceiling",
  "Wardrobes",
  "Tiled Floor",
  "Gate House",
  "CCTV",
  "Children Playground",
  "Serviced",
  "Newly Built",
] as const;

export const RENT_TYPES = ["Monthly", "Daily", "Per Event"] as const;

export type NigerianState = (typeof NIGERIAN_STATES)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type ListingStatus = (typeof LISTING_STATUSES)[number];
export type Amenity = (typeof AMENITIES)[number];
export type RentType = (typeof RENT_TYPES)[number];
