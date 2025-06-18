// lib/data.ts

// --- CORE INTERFACES ---
interface ModelSpecification {
  [key: string]: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  bodyType?: string[];
  engine: string;
  specifications: ModelSpecification;
  airconditioned?: boolean;
}

export interface Series {
  title: string;
  description: string;
  models: Model[];
}

export interface SeriesData {
  [key: string]: Series;
}

export interface BodyVariantSpecification {
  [key: string]: string | number | undefined;
}

export type CustomMeasurementType = 'lwh' | 'volume' | 'detailed';

export interface BodyVariant {
  id: string;
  name: string;
  description: string;
  image: string;
  compatibleSeries: string[];
  specifications: BodyVariantSpecification;
  price: number | string;
  isCustom?: boolean;
  customMeasurementType?: CustomMeasurementType;
  categoryForMeasurement?: string;
}

export interface BodyTypes {
  [categoryName: string]: BodyVariant[];
}

// --- SERIES DATA (MODIFIED) ---
// The `bodyType` arrays are adjusted to enforce specific model compatibility rules.
export const seriesData: SeriesData = {
  "200-series": {
    title: "200 Series - Light Duty Trucks",
    description: "Light-duty trucks for urban delivery and distribution",
    models: [
      {
        id: "315-nac", name: "315 NAC", description: "The Hino 200 Series 315 Non-Airconditioning is a cost-effective, durable delivery truck prioritizing fuel efficiency over air conditioning.",
        image: "/images/200-series-315-nac.png", price: 1250000,
        // MODIFIED: Removed "Fire Truck" and "Water Tanker" as per your rules.
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Refrigerated Van", "Stake Truck", "Rescue Truck", "Prison Van", "School Service"],
        engine: "J05E-TP Diesel Engine",
        specifications: { "Gross Vehicle Weight": "3,490 kg", "Chassis Dimensions (L x W x H)": "4,595 x 1,695 x 2,030 mm", Wheelbase: "2,545 mm", "Max Output": "144 PS", "Max Torque": "300 Nm", "Max Speed": "130 km/h" },
        airconditioned: false,
      },
      {
        id: "315", name: "315", description: "The compact Hino 200 Series 315 offers agile maneuverability for efficient urban deliveries in tight spaces that can be used in your business.",
        image: "/images/200-series-315-nac.png", price: 1300000,
        // MODIFIED: Removed "Fire Truck" and "Water Tanker" as per your rules.
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Refrigerated Van", "Stake Truck", "Rescue Truck", "Prison Van", "School Service"],
        engine: "J05E-TP Diesel Engine",
        specifications: { "Gross Vehicle Weight": "3,490 kg", "Chassis Dimensions (L x W x H)": "4,595 x 1,695 x 2,030 mm", Wheelbase: "2,545 mm", "Max Output": "144 PS", "Max Torque": "300 Nm", "Max Speed": "130 km/h" },
        airconditioned: true,
      },
      {
        id: "415", name: "415", description: "The Hino 200 Series 415 combines power and agility for efficient heavy-load urban deliveries in challenging city conditions.",
        image: "/images/200-series-315-nac.png", price: 1400000,
        // UNCHANGED: This model remains compatible with all types, including Fire Truck and Water Tanker.
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Refrigerated Van", "Stake Truck", "Rescue Truck", "Prison Van", "School Service", "Water Tanker", "Fire Truck"],
        engine: "J05E-TP Diesel Engine",
        specifications: { "Gross Vehicle Weight": "3,800 kg", "Chassis Dimensions (L x W x H)": "4,595 x 1,695 x 2,030 mm", Wheelbase: "2,545 mm", "Max Output": "144 PS", "Max Torque": "300 Nm", "Max Speed": "130 km/h" },
        airconditioned: true,
      },
    ],
  },
  "300-series": {
    title: "300 Series - Medium Duty Trucks",
    description: "Medium-duty trucks for various commercial applications",
    models: [
      {
        id: "414i", name: "414i", description: "The Hino 300 Series 414i's modern, aerodynamic design improves urban maneuverability for efficient city deliveries.",
        image: "/images/300-series/300-series-414i.png", price: 1800000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Rescue Truck", "Prison Van", "School Service"],
        engine: "N04C-WB Diesel Engine",
        specifications: { "Gross Vehicle Weight": "4,490 kg", "Chassis Dimensions (L x W x H)": "5,075 x 1,715 x 2,115 mm", Wheelbase: "2,530 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "150 km/h" },
        airconditioned: false,
      },
      {
        id: "414i-long", name: "414i Long", description: "The durable Hino 300 Series 414i Long offers extended cargo space for efficient, and demanding transport everywhere.",
        image: "/images/300-series/300-series-414i-Long.png", price: 1850000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Rescue Truck", "Prison Van", "School Service"],
        engine: "N04C-WB Diesel Engine",
        specifications: { "Gross Vehicle Weight": "4,490 kg", "Chassis Dimensions (L x W x H)": "6,430 x 1,715 x 2,115 mm", Wheelbase: "3,405 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "150 km/h" },
        airconditioned: false,
      },
      {
        id: "414i-6W", name: "414i 6W", description: "The 300 Series 414i 6W features a six-wheeler configuration that enhances load distribution and stability.",
        image: "/images/300-series/300-series-414i-6W.png", price: 1900000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Rescue Truck", "Prison Van", "School Service"],
        engine: "N04C-WB Diesel Engine",
        specifications: { "Gross Vehicle Weight": "4,490 kg", "Chassis Dimensions (L x W x H)": "6,320 x 1,965 x 2,115 mm", Wheelbase: "3,380 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "133 km/h" },
        airconditioned: true,
      },
      {
        id: "916-cbu", name: "916 CBU",
        description: "The Hino 300 Series 916 offers high payload capacity and reliability for demanding transport, with a robust, customizable design.",
        image: "/images/300-series/300-series-916.png", price: 2700000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Dump Truck", "Stake Truck", "Water Tanker", "Fire Truck", "Rescue Truck", "Prison Van", "School Service", "Garbage Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "8,500 kg", "Chassis Dimensions (L x W x H)": "7,250 x 2,055 x 2,260 mm", Wheelbase: "4,000 mm", "Max Output": "150 PS", "Max Torque": "420 Nm", "Max Speed": "125 km/h" },
        airconditioned: false,
      },
      {
        id: "916-ckd", name: "916 CKD",
        description: "The Hino 300 Series 916 offers high payload capacity and reliability for demanding transport, with a robust, customizable design.",
        image: "/images/300-series/300-series-916.png", price: 2700000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Dump Truck", "Stake Truck", "Water Tanker", "Fire Truck", "Rescue Truck", "Prison Van", "School Service", "Garbage Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "8,500 kg", "Chassis Dimensions (L x W x H)": "7,250 x 2,055 x 2,260 mm", Wheelbase: "4,000 mm", "Max Output": "150 PS", "Max Torque": "420 Nm", "Max Speed": "125 km/h" },
        airconditioned: true,
      },
    ],
  },
  "500-series": {
    title: "500 Series - Heavy Duty Trucks",
    description: "Heavy-duty trucks for demanding operations",
    models: [
      {
        id: "1021-truck", name: "1021 Truck",
        description: "Powerful heavy-duty truck for industrial use",
        image: "/images/500-series/500-series-1021.png", price: 3200000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Dump Truck", "Garbage Dump Truck", "Water Tanker", "Refrigerated Van", "Stake Truck", "Fire Truck", "Rescue Truck", "Prison Van", "School Service"],
        engine: "J08E-VD Diesel Engine",
        specifications: { "Gross Vehicle Weight": "10,400 kg", "Chassis Dimensions (L x W x H)": "8,395 x 2,190 x 2,470 mm", Wheelbase: "4,990 mm", "Max Output": "210 PS", "Max Torque": "637 Nm", "Max Speed": "115 km/h" },
        airconditioned: true,
      },
    ],
  },
  buses: {
    title: "Hino Buses",
    description: "Passenger buses for various transportation needs",
    models: [
      {
        id: "cerito-916", name: "Cerito 916", description: "The Hino 916 Cerito Bus offers a comfortable, efficient, and reliable ride for urban and intercity travel.",
        image: "/images/bus-cerito-916.jpg", price: 3250000, engine: "N04C-WK Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "8,500 kg", "Dimensions (L x W x H)": "7,700 x 2,008 x 2,700 mm", Wheelbase: "4,400 mm", "Max Output": "150 PS", "Max Torque": "420 Nm", "Max Speed": "125 km/h" },
        airconditioned: true,
      },
    ],
  },
  puvs: {
    title: "Hino PUVs",
    description: "Public Utility Vehicles for modern transportation",
    models: [
      {
        id: "puv-class-ii", name: "PUV Class II", description: "Modern jeepney replacement for urban routes",
        image: "/images/puv-class-ii.jpg", price: 1950000, engine: "N04C-WB Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "4,970 kg", "Dimensions (L x W x H)": "6,215 x 1,780 x 2,860 mm", Wheelbase: "3,405 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "150 km/h" },
        airconditioned: true,
      },
    ],
  },
};

// --- MASTER BODY CATEGORY LIST ---
export const bodyCategories: string[] = [
  "Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van",
  "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Stake Truck",
  "Rescue Truck", "Prison Van", "School Service",
  "Custom (Specify)"
];

// --- CONFIGURATION FOR CUSTOM MEASUREMENT TYPES PER CATEGORY ---
export const categoryCustomMeasurementConfig: Record<string, CustomMeasurementType> = {
  "Dump Truck": "volume", "Garbage Dump Truck": "volume", "Water Tanker": "volume", "Fire Truck": "volume",
  "Multipurpose Van": "lwh", "Dropside": "lwh", "Aluminum Van": "lwh", "Wing Van": "lwh",
  "Refrigerated Van": "lwh", "Stake Truck": "lwh", "Rescue Truck": "lwh",
  "Prison Van": "lwh", "School Service": "lwh",
  "Custom (Specify)": "detailed",
};

// --- CONSTANTS FOR CUSTOM BODIES ---
export const CUSTOM_PRICE_TEXT = "Price varies depending on size";
export const CUSTOM_BODY_IMAGE = "/images/hino-logo-white.png";

// --- BODY TYPES DATA (COMPLETELY REVAMPED BASED ON YOUR IMAGE) ---
export const bodyTypes: BodyTypes = {
  "Multipurpose Van": [
    { id: "mpv-200s", name: "10.5ft Multipurpose Van", description: "Standard van for 200 Series.", image: "/images/bodies/multipurpose-van.jpg", compatibleSeries: ["200-series"], price: 150000, specifications: { "Dimensions (L x W x H)": "10.5 ft x 5.5 ft x 5.5 ft" }, isCustom: false },
    { id: "mpv-300s-11ft", name: "11ft Multipurpose Van", description: "Standard van for 300/500 Series.", image: "/images/bodies/multipurpose-van.jpg", compatibleSeries: ["300-series", "500-series"], price: 170000, specifications: { "Dimensions (L x W x H)": "11 ft x 6 ft x 6ft" }, isCustom: false },
    { id: "mpv-300s-15ft", name: "15ft Multipurpose Van", description: "Large van for 300/500 Series.", image: "/images/bodies/multipurpose-van.jpg", compatibleSeries: ["300-series", "500-series"], price: 190000, specifications: { "Dimensions (L x W x H)": "15 ft x 6 ft x 6ft" }, isCustom: false },
    { id: "custom-multipurpose-van", name: "Custom Multipurpose Van", description: "Specify dimensions for a custom van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Multipurpose Van" }
  ],
  "Dropside": [
    { id: "dropside-200s", name: "10ft Dropside", description: "Standard dropside for 200 Series.", image: "/images/bodies/dropside-10.jpg", compatibleSeries: ["200-series"], price: 120000, specifications: { "Dimensions (L x W x H)": "10 ft x 6 ft x 16 inches" }, isCustom: false },
    { id: "dropside-300s-11ft", name: "11ft Dropside", description: "Standard dropside for 300/500 Series.", image: "/images/bodies/dropside-10.jpg", compatibleSeries: ["300-series", "500-series"], price: 135000, specifications: { "Dimensions (L x W x H)": "11 ft x 6 ft x 16 inches" }, isCustom: false },
    { id: "dropside-300s-15ft", name: "15ft Dropside", description: "Large dropside for 300/500 Series.", image: "/images/bodies/dropside-10.jpg", compatibleSeries: ["300-series", "500-series"], price: 150000, specifications: { "Dimensions (L x W x H)": "15 ft x 6 ft x 16 inches" }, isCustom: false },
    { id: "custom-dropside", name: "Custom Dropside", description: "Specify dimensions for a custom dropside.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Dropside" }
  ],
  "Aluminum Van": [
    { id: "alvan-200s", name: "10ft Aluminum Van", description: "Standard aluminum van for 200 Series.", image: "/images/bodies/aluminum-van-10.jpg", compatibleSeries: ["200-series"], price: 170000, specifications: { "Dimensions (L x W x H)": "10 ft x 6 ft x 6 ft" }, isCustom: false },
    { id: "alvan-300s-11ft", name: "11ft Aluminum Van", description: "Standard aluminum van for 300/500 Series.", image: "/images/bodies/aluminum-van-10.jpg", compatibleSeries: ["300-series", "500-series"], price: 200000, specifications: { "Dimensions (L x W x H)": "11 ft x 6 ft x 6 ft" }, isCustom: false },
    { id: "alvan-300s-15ft", name: "15ft Aluminum Van", description: "Large aluminum van for 300/500 Series.", image: "/images/bodies/aluminum-van-10.jpg", compatibleSeries: ["300-series", "500-series"], price: 230000, specifications: { "Dimensions (L x W x H)": "15 ft x 6 ft x 6 ft" }, isCustom: false },
    { id: "custom-aluminum-van", name: "Custom Aluminum Van", description: "Specify dimensions for a custom aluminum van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Aluminum Van" }
  ],
  "Refrigerated Van": [
    { id: "rfv-200s", name: "10ft Refrigerated Van", description: "Standard refrigerated van for 200 Series.", image: "/images/bodies/freezer-10.jpg", compatibleSeries: ["200-series"], price: 350000, specifications: { "Dimensions": "10 ft x 6 ft x 6 ft", "Cooling": "Based on requirement" }, isCustom: false },
    { id: "rfv-300s-11ft", name: "11ft Refrigerated Van", description: "Standard refrigerated van for 300/500 Series.", image: "/images/bodies/freezer-14.jpg", compatibleSeries: ["300-series", "500-series"], price: 400000, specifications: { "Dimensions": "11 ft x 6 ft x 6 ft", "Cooling": "Based on requirement" }, isCustom: false },
    { id: "rfv-300s-15ft", name: "15ft Refrigerated Van", description: "Large refrigerated van for 300/500 Series.", image: "/images/bodies/freezer-14.jpg", compatibleSeries: ["300-series", "500-series"], price: 450000, specifications: { "Dimensions": "15 ft x 6 ft x 6 ft", "Cooling": "Based on requirement" }, isCustom: false },
    { id: "custom-refrigerated-van", name: "Custom Refrigerated Van", description: "Specify dimensions for a custom refrigerated van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Refrigerated Van" }
  ],
  "Stake Truck": [
    { id: "custom-stake-truck", name: "Custom Stake Truck", description: "Built based on client requirements. Specify dimensions for a custom stake truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Stake Truck" }
  ],
  "Rescue Truck": [
    { id: "rt-200s", name: "10.5ft Rescue Truck", description: "Standard rescue body for 200 Series.", image: "/images/bodies/rescue-truck.jpg", compatibleSeries: ["200-series"], price: 700000, specifications: { "Dimensions (L x W x H)": "10.5 ft x 5.5 ft x 5.5 ft" }, isCustom: false },
    { id: "rt-300s-11ft", name: "11ft Rescue Truck", description: "Standard rescue body for 300/500 Series.", image: "/images/bodies/rescue-truck.jpg", compatibleSeries: ["300-series", "500-series"], price: 750000, specifications: { "Dimensions (L x W x H)": "11 ft x 6 ft x 6 ft" }, isCustom: false },
    { id: "rt-300s-15ft", name: "15ft Rescue Truck", description: "Large rescue body for 300/500 Series.", image: "/images/bodies/rescue-truck.jpg", compatibleSeries: ["300-series", "500-series"], price: 800000, specifications: { "Dimensions (L x W x H)": "15 ft x 6 ft x 6 ft" }, isCustom: false },
    { id: "custom-rescue-truck", name: "Custom Rescue Truck", description: "Specify dimensions for a custom rescue truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Rescue Truck" }
  ],
  "Prison Van": [
    { id: "custom-prison-van", name: "Custom Prison Van", description: "Built based on client requirements. Specify dimensions for a custom prison van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Prison Van" }
  ],
  "School Service": [
    { id: "ss-200s", name: "10.5ft School Service", description: "Standard school service body for 200 Series.", image: "/images/bodies/school-service.jpg", compatibleSeries: ["200-series"], price: 500000, specifications: { "Dimensions (L x W x H)": "10.5 ft x 5.5 ft x 5.5 ft" }, isCustom: false },
    { id: "ss-300s-11ft", name: "11ft School Service", description: "Standard school service body for 300/500 Series.", image: "/images/bodies/school-service.jpg", compatibleSeries: ["300-series", "500-series"], price: 550000, specifications: { "Dimensions (L x W x H)": "11 ft x 6 ft x 6 ft" }, isCustom: false },
    { id: "ss-300s-15ft", name: "15ft School Service", description: "Large school service body for 300/500 Series.", image: "/images/bodies/school-service.jpg", compatibleSeries: ["300-series", "500-series"], price: 600000, specifications: { "Dimensions (L x W x H)": "15 ft x 6 ft x 6 ft" }, isCustom: false },
    { id: "custom-school-service", name: "Custom School Service", description: "Specify dimensions for a custom school service.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "School Service" }
  ],
  "Water Tanker": [
    { id: "wt-1k", name: "1,000L Water Tanker", description: "Standard 1,000 Liter water tanker.", image: "/images/bodies/tanker-2k.jpg", compatibleSeries: ["200-series", "300-series", "500-series"], price: 200000, specifications: { Capacity: "1,000 liters" }, isCustom: false },
    { id: "custom-water-tanker", name: "Custom Water Tanker", description: "Specify volume for a custom water tanker.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "volume", specifications: {}, categoryForMeasurement: "Water Tanker" }
  ],
  "Fire Truck": [
    { id: "ft-1k", name: "1,000L Fire Truck", description: "Standard 1,000 Liter pumper.", image: "/images/bodies/fire-truck-light.jpg", compatibleSeries: ["200-series", "300-series", "500-series"], price: 900000, specifications: { "Water Tank Capacity": "1,000L" }, isCustom: false },
    { id: "custom-fire-truck", name: "Custom Fire Truck", description: "Specify capacity and features for a custom fire truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "volume", specifications: {}, categoryForMeasurement: "Fire Truck" }
  ],
  "Dump Truck": [
    { id: "dt-small", name: "Small Dump Truck (3-5 cu.m)", description: "For 200 series light-duty trucks.", image: "/images/bodies/dump.jpg", compatibleSeries: ["200-series"], price: 280000, specifications: { Capacity: "3-5 cubic meters" }, isCustom: false },
    { id: "dt-large", name: "Large Dump Truck (6-10 cu.m)", description: "For 300/500 series medium to heavy-duty trucks.", image: "/images/bodies/dump.jpg", compatibleSeries: ["300-series", "500-series"], price: 350000, specifications: { Capacity: "6-10 cubic meters" }, isCustom: false },
    { id: "custom-dump-truck", name: "Custom Dump Truck", description: "Specify volume for a custom dump truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "volume", specifications: {}, categoryForMeasurement: "Dump Truck" }
  ],
  "Garbage Dump Truck": [
    { id: "gdt-compact", name: "Compact Garbage Dump Truck", description: "For 200 series light-duty trucks.", image: "/images/bodies/garbage-dump.jpg", compatibleSeries: ["200-series"], price: 300000, specifications: { Capacity: "Varies" }, isCustom: false },
    { id: "gdt-large", name: "Large Garbage Dump Truck", description: "For 300/500 series medium to heavy-duty trucks.", image: "/images/bodies/garbage-dump.jpg", compatibleSeries: ["300-series", "500-series"], price: 400000, specifications: { Capacity: "Varies" }, isCustom: false },
    { id: "custom-garbage-dump-truck", name: "Custom Garbage Dump Truck", description: "Specify volume for a custom garbage truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "volume", specifications: {}, categoryForMeasurement: "Garbage Dump Truck" }
  ],
  "Wing Van": [
    { id: "wingvan-12", name: "12ft Wing Van", description: "12ft wing van body for light-duty trucks.", image: "/images/bodies/wing-12.jpg", compatibleSeries: ["200-series"], price: 250000, specifications: { Length: "12 feet" }, isCustom: false },
    { id: "wingvan-16", name: "16ft Wing Van", description: "16ft wing van body for medium to heavy-duty trucks.", image: "/images/bodies/wing-12.jpg", compatibleSeries: ["300-series", "500-series"], price: 300000, specifications: { Length: "16 feet" }, isCustom: false },
    { id: "custom-wing-van", name: "Custom Wing Van", description: "Specify dimensions for a custom wing van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Wing Van" }
  ],
  "Custom (Specify)": [
    {
      id: "generic-custom-detailed-body", name: "Custom Body",
      description: "Specify custom dimensions (Body Type, Length, Width, Height, Cubic Meters, Liters).",
      image: CUSTOM_BODY_IMAGE,
      compatibleSeries: ["200-series", "300-series", "500-series"],
      price: CUSTOM_PRICE_TEXT,
      isCustom: true,
      customMeasurementType: "detailed",
      specifications: {},
      categoryForMeasurement: "Custom (Specify)"
    }
  ]
};

// --- HELPER FUNCTIONS (NO CHANGES NEEDED) ---
// The functions below will work correctly with the new data structure.

export function getSeriesData(seriesSlug: string): Series | null {
  return seriesData[seriesSlug as keyof typeof seriesData] || null;
}

export function getModelData(seriesSlug: string, modelId: string): Model | null {
  const series = seriesData[seriesSlug as keyof typeof seriesData];
  if (!series) return null;
  return series.models.find((model) => model.id === modelId) || null;
}

export function getBodyCategories(): string[] {
  return [...bodyCategories];
}

export function getAvailableBodyCategoriesForSeries(seriesSlug: string): string[] {
  const seriesInfo = seriesData[seriesSlug];
  if (!seriesInfo || !seriesInfo.models.length || seriesSlug === 'buses' || seriesSlug === 'puvs') {
    return [];
  }
  const relevantCategories = new Set<string>();
  seriesInfo.models.forEach(model => {
    if (model.bodyType) {
      model.bodyType.forEach(bt => {
        if (bodyCategories.includes(bt)) {
            relevantCategories.add(bt)
        }
      });
    }
  });
  Object.entries(bodyTypes).forEach(([categoryName, variants]) => {
    if (categoryName === "Custom (Specify)") return;
    if (bodyCategories.includes(categoryName) && variants.some(v => v.compatibleSeries.includes(seriesSlug))) {
      relevantCategories.add(categoryName);
    }
  });
  const sortedCategories = Array.from(relevantCategories).sort();
  const customSpecifyCategoryName = "Custom (Specify)";
  const customSpecifyVariants = bodyTypes[customSpecifyCategoryName];
  if (customSpecifyVariants && customSpecifyVariants.some(v => v.compatibleSeries.includes(seriesSlug))) {
      if (!sortedCategories.includes(customSpecifyCategoryName)) {
          sortedCategories.push(customSpecifyCategoryName);
      }
  }
  return sortedCategories;
}

export function getBodiesForSelectedCategory(
  selectedCategoryName: string,
  selectedSeriesSlug: string,
  selectedModelId?: string
): BodyVariant[] {
  const model = selectedModelId ? getModelData(selectedSeriesSlug, selectedModelId) : null;
  let resultingBodies: BodyVariant[] = [];

  if (selectedSeriesSlug === 'buses' || selectedSeriesSlug === 'puvs') {
    return [];
  }

  if (selectedCategoryName === "All Categories") {
    Object.entries(bodyTypes).forEach(([categoryKey, variants]) => {
      if (categoryKey === "Custom (Specify)" || !bodyCategories.includes(categoryKey)) return;
      variants.forEach(variant => {
        if (variant.isCustom && variant.id !== "generic-custom-detailed-body") return;
        if (variant.id === "generic-custom-detailed-body" && !variant.compatibleSeries.includes(selectedSeriesSlug)) return;
        if (variant.id !== "generic-custom-detailed-body" && !variant.compatibleSeries.includes(selectedSeriesSlug)) return;

        if (model && model.bodyType && !variant.isCustom && !model.bodyType.includes(categoryKey) ) return;

        if (!resultingBodies.some(b => b.id === variant.id)) {
          resultingBodies.push(variant);
        }
      });
    });
  } else if (selectedCategoryName === "Custom (Specify)") {
    const genericCustomVariants = bodyTypes["Custom (Specify)"];
    if (genericCustomVariants) {
        genericCustomVariants.forEach(variant => {
            if (variant.id === "generic-custom-detailed-body" && variant.compatibleSeries.includes(selectedSeriesSlug)) {
                resultingBodies.push(variant);
            }
        });
    }
  } else {
    const variantsForCategory = bodyTypes[selectedCategoryName] || [];
    variantsForCategory.forEach(variant => {
      if (!variant.compatibleSeries.includes(selectedSeriesSlug)) return;
      // This is the key line for filtering based on the model's allowed types
      if (!variant.isCustom && model && model.bodyType && !model.bodyType.includes(selectedCategoryName)) return;
      resultingBodies.push(variant);
    });
  }
  return resultingBodies.sort((a, b) => {
    if (a.isCustom && !b.isCustom) return 1;
    if (!a.isCustom && b.isCustom) return -1;
    if (a.id === "generic-custom-detailed-body" && b.isCustom) return 1;
    if (b.id === "generic-custom-detailed-body" && a.isCustom) return -1;
    return a.name.localeCompare(b.name);
  });
}

export function getCompatibleBodies(seriesSlug: string, modelId: string): BodyVariant[] {
  const model = getModelData(seriesSlug, modelId);
  if (!model || !model.bodyType) return [];
  const compatibleModelBodies: BodyVariant[] = [];
  model.bodyType.forEach((bodyType: string) => {
    const bodies = bodyTypes[bodyType as keyof typeof bodyTypes] || [];
    bodies.forEach((body: BodyVariant) => {
      if (!body.isCustom && body.compatibleSeries.includes(seriesSlug) && !compatibleModelBodies.some((b) => b.id === body.id)) {
        compatibleModelBodies.push(body);
      }
    });
  });
  return compatibleModelBodies;
}

export function getAllBodies(): BodyVariant[] {
  const allVariants: BodyVariant[] = [];
  Object.values(bodyTypes).forEach((categoryVariants: BodyVariant[]) => {
    categoryVariants.forEach((variant: BodyVariant) => {
      if (!allVariants.some((b) => b.id === variant.id)) {
        allVariants.push(variant);
      }
    });
  });
  return allVariants;
}

export function getBodyById(bodyId: string): BodyVariant | null {
  for (const category in bodyTypes) {
    const bodies = bodyTypes[category as keyof typeof bodyTypes] || [];
    const body = bodies.find((b: BodyVariant) => b.id === bodyId);
    if (body) return body;
  }
  return null;
}