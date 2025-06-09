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

// --- SERIES DATA ---
export const seriesData: SeriesData = {
  "200-series": {
    title: "200 Series - Light Duty Trucks",
    description: "Light-duty trucks for urban delivery and distribution",
    models: [
      {
        id: "315-nac", name: "315 NAC", description: "The Hino 200 Series 315 Non-Airconditioning is a cost-effective, durable delivery truck prioritizing fuel efficiency over air conditioning.",
        image: "/images/200-series-315-nac.png", price: 1250000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker"],
        engine: "J05E-TP Diesel Engine",
        specifications: { "Gross Vehicle Weight": "3,490 kg", "Chassis Dimensions (L x W x H)": "4,595 x 1,695 x 2,030 mm", Wheelbase: "2,545 mm", "Max Output": "144 PS", "Max Torque": "300 Nm", "Max Speed": "130 km/h" },
        airconditioned: false,
      },
      {
        id: "315", name: "315", description: "The compact Hino 200 Series 315 offers agile maneuverability for efficient urban deliveries in tight spaces.",
        image: "/images/200-series-315-nac.png", price: 1300000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker"],
        engine: "J05E-TP Diesel Engine",
        specifications: { "Gross Vehicle Weight": "3,490 kg", "Chassis Dimensions (L x W x H)": "4,595 x 1,695 x 2,030 mm", Wheelbase: "2,545 mm", "Max Output": "144 PS", "Max Torque": "300 Nm", "Max Speed": "130 km/h" },
        airconditioned: true,
      },
      {
        id: "415", name: "415", description: "The Hino 200 Series 415 combines power and agility for efficient heavy-load urban deliveries in challenging city conditions.",
        image: "/images/200-series-315-nac.png", price: 1400000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker"],
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
        airconditioned: true,
      },
      {
        id: "414i-long", name: "414i Long", description: "The durable Hino 300 Series 414i Long offers extended cargo space for efficient, and demanding transport everywhere.",
        image: "/images/300-series/300-series-414i-Long.png", price: 1850000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Rescue Truck", "Prison Van", "School Service"],
        engine: "N04C-WB Diesel Engine",
        specifications: { "Gross Vehicle Weight": "4,490 kg", "Chassis Dimensions (L x W x H)": "6,430 x 1,715 x 2,115 mm", Wheelbase: "3,405 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "150 km/h" },
        airconditioned: true,
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
        id: "514", name: "514", description: "The versatile and robust Hino 300 Series 514 offers a customizable, strong base for diverse applications.",
        image: "/images/300-series/300-series-514.png", price: 2000000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Rescue Truck", "Prison Van", "School Service"],
        engine: "N04C-WB Diesel Engine",
        specifications: { "Gross Vehicle Weight": "4,490 kg", "Chassis Dimensions (L x W x H)": "4,680 x 1,695 x 2,130 mm", Wheelbase: "2,525 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "125 km/h" },
        airconditioned: true,
      },
      {
        id: "514-auto", name: "514 Auto", description: "The durable and efficient 514 Auto provides long-lasting urban performance with minimized fuel consumption.",
        image: "/images/300-series/300-series-514-Auto.png", price: 2100000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Stake Truck", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Rescue Truck", "Prison Van", "School Service"],
        engine: "N04C-WB Diesel Engine",
        specifications: { "Gross Vehicle Weight": "4,490 kg", "Chassis Dimensions (L x W x H)": "4,680 x 1,695 x 2,130 mm", Wheelbase: "2,525 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "125 km/h" },
        airconditioned: true,
      },
      {
        id: "616", name: "616", description: "The durable and flexible Hino 300 Series 616 provides a reliable, customizable base for diverse transport needs.",
        image: "/images/300-series/300-series-616.png", price: 2200000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Dump Truck", "Stake Truck", "Water Tanker", "Fire Truck", "Rescue Truck", "Prison Van", "School Service", "Garbage Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "6,500 kg", "Chassis Dimensions (L x W x H)": "6,120 x 1,995 x 2,205 mm", Wheelbase: "3,430 mm", "Max Output": "150 PS", "Max Torque": "420 Nm", "Max Speed": "123 km/h" },
        airconditioned: true,
      },
      {
        id: "716", name: "716", description: "The powerful and versatile Hino 300 Series 716 provides a robust, customizable base for enhanced business operations.",
        image: "/images/300-series/300-series-716.png", price: 2300000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Dump Truck", "Stake Truck", "Water Tanker", "Fire Truck", "Rescue Truck", "Prison Van", "School Service", "Garbage Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "6,500 kg", "Chassis Dimensions (L x W x H)": "6,120 x 1,995 x 2,240 mm", Wheelbase: "3,430 mm", "Max Output": "150 PS", "Max Torque": "420 Nm", "Max Speed": "132 km/h" },
        airconditioned: true,
      },
      {
        id: "716-double", name: "716 Double", description: "The Hino 300 Series 716 Double offers comfortable team transport and versatile customization for various commercial needs.",
        image: "/images/300-series/300-series-716-Double.png", price: 2400000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Dump Truck", "Stake Truck", "Water Tanker", "Fire Truck", "Rescue Truck", "Prison Van", "School Service", "Garbage Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "6,500 kg", "Chassis Dimensions (L x W x H)": "6,740 x 1,995 x 2,255 mm", Wheelbase: "3,870 mm", "Max Output": "150 PS", "Max Torque": "420 Nm", "Max Speed": "132 km/h" },
        airconditioned: true,
      },
      {
        id: "814i", name: "814i", description: "The Hino 300 Series 814i's durable design is built to withstand everyday urban logistics challenges on daily use.",
        image: "/images/300-series/300-series-814i.png", price: 2500000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Dump Truck", "Stake Truck", "Water Tanker", "Fire Truck", "Rescue Truck", "Prison Van", "School Service", "Garbage Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "7,500 kg", "Chassis Dimensions (L x W x H)": "6,320 x 1,965 x 2,155 mm", Wheelbase: "3,380 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "133 km/h" },
        airconditioned: true,
      },
      {
        id: "814i-extra-long", name: "814i Extra Long", description: "The innovative Hino 300 Series 814i Extra Long optimizes urban deliveries with extended body and efficient storage.",
        image: "/images/300-series/300-series-814i-Extra-Long.png", price: 2600000,
        bodyType: ["Multipurpose Van", "Dropside", "Aluminum Van", "Wing Van", "Refrigerated Van", "Dump Truck", "Stake Truck", "Water Tanker", "Fire Truck", "Rescue Truck", "Prison Van", "School Service", "Garbage Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "7,500 kg", "Chassis Dimensions (L x W x H)": "7,185 x 1,965 x 2,150 mm", Wheelbase: "4,000 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "133 km/h" },
        airconditioned: true,
      },
      {
        id: "916", name: "916 Truck",
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
        bodyType: ["Aluminum Van", "Wing Van", "Dump Truck", "Garbage Dump Truck", "Water Tanker", "Refrigerated Van", "Stake Truck", "Fire Truck", "Rescue Truck", "Prison Van", "School Service", "Multipurpose Van", "Dropside"],
        engine: "J08E-VD Diesel Engine",
        specifications: { "Gross Vehicle Weight": "10,400 kg", "Chassis Dimensions (L x W x H)": "8,395 x 2,190 x 2,470 mm", Wheelbase: "4,990 mm", "Max Output": "210 PS", "Max Torque": "637 Nm", "Max Speed": "115 km/h" },
        airconditioned: true,
      },
      {
        id: "1625-truck", name: "1625",
        description: "Heavy-duty truck for construction and logistics",
        image: "/images/500-series/500-series-1625.png", price: 4500000,
        bodyType: ["Aluminum Van", "Wing Van", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Refrigerated Van", "Stake Truck", "Rescue Truck", "Prison Van", "School Service", "Multipurpose Van", "Dropside"],
        engine: "J08E-WG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "16,000 kg", "Chassis Dimensions (L x W x H)": "7,785 x 2,490 x 2,750 mm", Wheelbase: "4,330 mm", "Max Output": "240 PS", "Max Torque": "716 Nm", "Max Speed": "104 km/h" },
        airconditioned: true,
      },
      {
        id: "1625-long-truck", name: "1625 Long",
        description: "Heavy-duty truck for construction and logistics",
        image: "/images/500-series/500-series-1625-Long.png", price: 4600000,
        bodyType: ["Aluminum Van", "Wing Van", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Refrigerated Van", "Stake Truck", "Rescue Truck", "Prison Van", "School Service", "Multipurpose Van", "Dropside"],
        engine: "J08E-WG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "16,000 kg", "Chassis Dimensions (L x W x H)": "9,485 x 2,490 x 2,745 mm", Wheelbase: "5,530 mm", "Max Output": "240 PS", "Max Torque": "716 Nm", "Max Speed": "104 km/h" },
        airconditioned: true,
      },
      {
        id: "1927-auto", name: "1927 Auto", description: "Heavy-duty truck for construction and logistics",
        image: "/images/500-series/500-series-1927-Auto.png", price: 5000000,
        bodyType: ["Aluminum Van", "Wing Van", "Dump Truck", "Garbage Dump Truck", "Fire Truck", "Water Tanker", "Refrigerated Van", "Stake Truck", "Rescue Truck", "Prison Van", "School Service", "Multipurpose Van", "Dropside"],
        engine: "J08E-WG Diesel Engine",
        specifications: { "Gross Vehicle Weight": "18,200 kg", "Chassis Dimensions (L x W x H)": "8,835 x 2,490 x 2,765 mm", Wheelbase: "5,080 mm", "Max Output": "260 PS", "Max Torque": "794 Nm", "Max Speed": "100 km/h" },
        airconditioned: true,
      },
      {
        id: "2629-6x2", name: "2629 6x2", description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series/500-series-2629-6x2.png", price: 5500000,
        bodyType: ["Dump Truck", "Garbage Dump Truck", "Water Tanker", "Stake Truck"],
        engine: "E13C-BT Diesel Engine",
        specifications: { "Gross Vehicle Weight": "26,000 kg", "Chassis Dimensions (L x W x H)": "11,935 x 2,490 x 2,770 mm", Wheelbase: "6,130 + 1,350 mm", "Max Output": "280 PS", "Max Torque": "824 Nm", "Max Speed": "111 km/h" },
        airconditioned: true,
      },
      {
        id: "2629-6x4", name: "2629 6x4", description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series/500-series-2629-6x4.png", price: 5700000,
        bodyType: ["Dump Truck", "Garbage Dump Truck", "Water Tanker", "Stake Truck"],
        engine: "E13C-BT Diesel Engine",
        specifications: { "Gross Vehicle Weight": "28,000 kg", "Chassis Dimensions (L x W x H)": "9,485 x 2,490 x 2,765 mm", Wheelbase: "4,630 + 1,350 mm", "Max Output": "280 PS", "Max Torque": "824 Nm", "Max Speed": "98 km/h" },
        airconditioned: true,
      },
      {
        id: "2836", name: "2836", description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series/500-series-2836.png", price: 6000000,
        bodyType: ["Dump Truck", "Garbage Dump Truck", "Water Tanker", "Stake Truck"],
        engine: "E13C-BT Diesel Engine",
        specifications: { "Gross Vehicle Weight": "28,000 kg", "Chassis Dimensions (L x W x H)": "9,485 x 2,490 x 2,905 mm", Wheelbase: "4,530 + 1,350 mm", "Max Output": "350 PS", "Max Torque": "1,422 Nm", "Max Speed": "117 km/h" },
        airconditioned: true,
      },
      {
        id: "2836-dump", name: "2836 Dump", description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series/500-series-2836-Dump.png", price: 6200000,
        bodyType: ["Dump Truck", "Garbage Dump Truck", "Water Tanker"],
        engine: "E13C-BT Diesel Engine",
        specifications: { "Gross Vehicle Weight": "28,000 kg", "Chassis Dimensions (L x W x H)": "7,435 x 2,490 x 2,910 mm", Wheelbase: "3,480 + 1,350 mm", "Max Output": "350 PS", "Max Torque": "1,422 Nm", "Max Speed": "109 km/h" },
        airconditioned: true,
      },
      {
        id: "1735-tractor", name: "1735 Tractor", description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series/500-series-1735-Tractor.png", price: 3650000,
        bodyType: [],
        engine: "E13C-BT Diesel Engine",
        specifications: { "Gross Vehicle Weight": "18,000 kg", "Chassis Dimensions (L x W x H)": "5,995 x 2,490 x 2,890 mm", Wheelbase: "3,630 mm", "Max Output": "350 PS", "Max Torque": "1,422 Nm", "Max Speed": "118 km/h" },
        airconditioned: true,
      },
      {
        id: "2635-tractor", name: "2635 Tractor", description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series/500-series-2635-Tractor.png", price: 3650000,
        bodyType: [],
        engine: "E13C-BT Diesel Engine",
        specifications: { "Gross Vehicle Weight": "26,000 kg", "Chassis Dimensions (L x W x H)": "7,045 x 2,490 x 2,910 mm", Wheelbase: "3,480 + 1,350 mm", "Max Output": "350 PS", "Max Torque": "1,422 Nm", "Max Speed": "117 km/h" },
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
      {
        id: "916-bus", name: "916 Bus", description: "The Hino 916 Bus delivers smooth, efficient performance with a spacious, safe, and comfortable design for public and private transport.",
        image: "/images/bus-916.png", price: 3250000, engine: "N04C-WK Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "8,500 kg", "Dimensions (L x W x H)": "8,160 x 2,100 x 3,040 - 3,290 mm", Wheelbase: "4,200 mm", "Max Output": "150 PS", "Max Torque": "420 Nm", "Max Speed": "125 km/h" },
        airconditioned: true,
      },
      {
        id: "1021-bus", name: "1021 Bus", description: "The Hino 1021 Bus offers durable, versatile performance with ample seating and safety features for both urban and long-distance travel.",
        image: "/images/1021.png", price: 3250000, engine: "J08E-VD Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "10,400 kg", "Dimensions (L x W x H)": "9,500 x 2,250 x 3,320 - 3,600 mm", Wheelbase: "4,990 mm", "Max Output": "210 PS", "Max Torque": "637 Nm", "Max Speed": "115 km/h" },
        airconditioned: true,
      },
      {
        id: "1625-bus", name: "1625 Bus", description: "The Hino 1625 Bus delivers strong, reliable performance with spacious comfort and advanced safety for both city and long-distance travel.",
        image: "/images/1625.png", price: 3250000, engine: "J08E-WG Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "16,000 kg", "Dimensions (L x W x H)": "10,500 x 2,480 x 3,700 - 3,900 mm", Wheelbase: "5,530 mm", "Max Output": "240 PS", "Max Torque": "716 Nm", "Max Speed": "104 km/h" },
        airconditioned: true,
      },
      {
        id: "1625-long-bus", name: "1625 Long Bus", description: "The Hino 1625 Bus delivers strong, reliable performance with spacious comfort and advanced safety for both city and long-distance travel.",
        image: "/images/1625.png", price: 3350000, engine: "J08E-WG Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "16,000 kg", "Dimensions (L x W x H)": "11,500 x 2,480 x 3,700 - 3,900 mm", Wheelbase: "6,000 mm", "Max Output": "240 PS", "Max Torque": "716 Nm", "Max Speed": "104 km/h" },
        airconditioned: true,
      },
      {
        id: "rk-1426", name: "RK 1426", description: "Mid-size bus for intercity travel",
        image: "/images/bus-rk-1426.jpg", price: 4150000, engine: "J08E-VD Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "14,000 kg", "Dimensions (L x W x H)": "9,200 x 2,400 x 3,300 mm", Wheelbase: "5,200 mm", "Max Output": "250 PS", "Max Torque": "739 Nm", "Max Speed": "114 km/h" },
        airconditioned: true,
      },
      {
        id: "rk-1426-long", name: "RK 1426 Long", description: "Mid-size bus for intercity travel",
        image: "/images/bus-rk-1426.jpg", price: 4250000, engine: "J08E-VD Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "14,000 kg", "Dimensions (L x W x H)": "12,000 x 2,480 x 3,550 - 3,800 mm", Wheelbase: "6,000 mm", "Max Output": "250 PS", "Max Torque": "739 Nm", "Max Speed": "114 km/h" },
        airconditioned: true,
      },
      {
        id: "rn-1626", name: "RN 1626", description: "Large bus for long-distance travel",
        image: "/images/bus-rn-1626.jpg", price: 5250000, engine: "J08E-WG Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "16,000 kg", "Dimensions (L x W x H)": "12,000 x 2,480 x 3,550 - 3,800 mm", Wheelbase: "6,000 mm", "Max Output": "250 PS", "Max Torque": "739 Nm", "Max Speed": "118 km/h" },
        airconditioned: true,
      },
      {
        id: "hs-1829", name: "HS 1829", description: "Large bus for long-distance travel",
        image: "/images/bus-hs-1829.jpg", price: 5250000, engine: "J08E-WG Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "18,000 kg", "Dimensions (L x W x H)": "12,200 x 2,500 x 3,270 mm", Wheelbase: "5,875 mm", "Max Output": "280 PS", "Max Torque": "824 Nm", "Max Speed": "120 km/h" },
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
      {
        id: "puv-class-ii-s", name: "PUV Class II-S", description: "Modern jeepney replacement for urban routes",
        image: "/images/puv-class-ii-s.jpg", price: 1950000, engine: "N04C-WB Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "4,995 kg", "Dimensions (L x W x H)": "6,500 x 2,100 x 2,890 mm approx.", Wheelbase: "3,430 approx. mm", "Max Output": "150 PS", "Max Torque": "420 Nm", "Max Speed": "123 km/h" },
        airconditioned: true,
      },
      {
        id: "puv-class-iii", name: "PUV Class III", description: "Modern jeepney replacement for longer routes",
        image: "/images/puv-class-ii-s.jpg", price: 2250000, engine: "J05E-UG Diesel Engine", bodyType: [],
        specifications: { "Gross Vehicle Weight": "4,995 kg", "Dimensions (L x W x H)": "6,950 x 1,995 x 2,935 mm", Wheelbase: "3,880 mm", "Max Output": "136 PS", "Max Torque": "390 Nm", "Max Speed": "120 km/h" },
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
  "Dump Truck": "volume", "Garbage Dump Truck": "volume", "Water Tanker": "volume",
  "Multipurpose Van": "lwh", "Dropside": "lwh", "Aluminum Van": "lwh", "Wing Van": "lwh",
  "Refrigerated Van": "lwh", "Fire Truck": "lwh", "Stake Truck": "lwh", "Rescue Truck": "lwh",
  "Prison Van": "lwh", "School Service": "lwh",
  "Custom (Specify)": "detailed",
};

// --- CONSTANTS FOR CUSTOM BODIES ---
export const CUSTOM_PRICE_TEXT = "Price varies depending on size";
export const CUSTOM_BODY_IMAGE = "/images/hino-logo-white.png";

// --- BODY TYPES DATA ---
export const bodyTypes: BodyTypes = {
  "Multipurpose Van": [
    { id: "mpv-std-10", name: "10ft Multipurpose Van", description: "Versatile 10ft van body.", image: "/images/bodies/multipurpose-van.jpg", compatibleSeries: ["200-series", "300-series"], price: 150000, specifications: { Length: "10 feet", Material: "Composite" }, isCustom: false },
    { id: "mpv-std-14", name: "14ft Multipurpose Van", description: "Versatile 14ft van body.", image: "/images/bodies/multipurpose-van.jpg", compatibleSeries: ["300-series", "500-series"], price: 180000, specifications: { Length: "14 feet", Material: "Composite" }, isCustom: false },
    { id: "custom-multipurpose-van", name: "Custom Multipurpose Van", description: "Specify dimensions for a custom van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Multipurpose Van" }
  ],
  "Dropside": [
    { id: "dropside-10", name: "10ft Dropside", description: "10ft dropside body.", image: "/images/bodies/dropside-10.jpg", compatibleSeries: ["200-series", "300-series"], price: 120000, specifications: { Length: "10 feet", Material: "Steel & Aluminum" }, isCustom: false },
    { id: "dropside-14", name: "14ft Dropside", description: "14ft dropside body.", image: "/images/bodies/dropside-10.jpg", compatibleSeries: ["300-series", "500-series"], price: 140000, specifications: { Length: "14 feet", Material: "Steel & Aluminum" }, isCustom: false },
    { id: "custom-dropside", name: "Custom Dropside", description: "Specify dimensions for a custom dropside.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Dropside" }
  ],
  "Aluminum Van": [
    { id: "alvan-10", name: "10ft Aluminum Van", description: "10ft aluminum van body.", image: "/images/bodies/aluminum-van-10.jpg", compatibleSeries: ["200-series", "300-series"], price: 170000, specifications: { Length: "10 feet", Material: "Aluminum"}, isCustom: false },
    { id: "alvan-14", name: "14ft Aluminum Van", description: "14ft aluminum van body.", image: "/images/bodies/aluminum-van-10.jpg", compatibleSeries: ["300-series", "500-series"], price: 210000, specifications: { Length: "14 feet", Material: "Aluminum"}, isCustom: false },
    { id: "custom-aluminum-van", name: "Custom Aluminum Van", description: "Specify dimensions for a custom aluminum van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Aluminum Van" }
  ],
  "Wing Van": [
    { id: "wingvan-12", name: "12ft Wing Van", description: "12ft wing van body.", image: "/images/bodies/wing-12.jpg", compatibleSeries: ["200-series", "300-series"], price: 250000, specifications: { Length: "12 feet", Material: "Aluminum", "Wing Type": "Manual"}, isCustom: false },
    { id: "wingvan-16", name: "16ft Wing Van", description: "16ft wing van body.", image: "/images/bodies/wing-12.jpg", compatibleSeries: ["300-series", "500-series"], price: 300000, specifications: { Length: "16 feet", Material: "Aluminum", "Wing Type": "Manual/Hydraulic"}, isCustom: false },
    { id: "custom-wing-van", name: "Custom Wing Van", description: "Specify dimensions for a custom wing van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Wing Van" }
  ],
  "Refrigerated Van": [
    { id: "rfv-10", name: "10ft Refrigerated Van", description: "10ft refrigerated van.", image: "/images/bodies/freezer-10.jpg", compatibleSeries: ["200-series", "300-series"], price: 350000, specifications: { Length: "10 feet", "Temperature Range": "-20°C to +5°C"}, isCustom: false },
    { id: "rfv-14", name: "14ft Refrigerated Van", description: "14ft refrigerated van.", image: "/images/bodies/freezer-14.jpg", compatibleSeries: ["300-series", "500-series"], price: 420000, specifications: { Length: "14 feet", "Temperature Range": "-20°C to +5°C"}, isCustom: false },
    { id: "custom-refrigerated-van", name: "Custom Refrigerated Van", description: "Specify dimensions for a custom refrigerated van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Refrigerated Van" }
  ],
  "Dump Truck": [
    { id: "dt-small", name: "Small Dump Truck (3-5 cu.m)", description: "For 200/300 series.", image: "/images/bodies/dump.jpg", compatibleSeries: ["200-series", "300-series"], price: 280000, specifications: { Capacity: "3-5 cubic meters", Material: "High-tensile steel" }, isCustom: false },
    { id: "dt-large", name: "Large Dump Truck (6-10 cu.m)", description: "For 500 series.", image: "/images/bodies/dump.jpg", compatibleSeries: ["500-series"], price: 350000, specifications: { Capacity: "6-10 cubic meters", Material: "High-tensile steel" }, isCustom: false },
    { id: "custom-dump-truck", name: "Custom Dump Truck", description: "Specify volume for a custom dump truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "volume", specifications: {}, categoryForMeasurement: "Dump Truck" }
  ],
  "Garbage Dump Truck": [
    { id: "gdt-compact", name: "Compact Garbage Dump Truck", description: "For 200/300 series.", image: "/images/bodies/garbage-dump.jpg", compatibleSeries: ["200-series", "300-series"], price: 300000, specifications: { Capacity: "Varies", Compaction: "Optional" }, isCustom: false },
    { id: "gdt-large", name: "Large Garbage Dump Truck", description: "For 500 series.", image: "/images/bodies/garbage-dump.jpg", compatibleSeries: ["500-series"], price: 400000, specifications: { Capacity: "Varies", Compaction: "Standard" }, isCustom: false },
    { id: "custom-garbage-dump-truck", name: "Custom Garbage Dump Truck", description: "Specify volume for a custom garbage truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "volume", specifications: {}, categoryForMeasurement: "Garbage Dump Truck" }
  ],
  "Fire Truck": [
    { id: "ft-light", name: "Light Duty Fire Truck", description: "For 200/300 series.", image: "/images/bodies/fire-truck-light.jpg", compatibleSeries: ["200-series", "300-series"], price: 900000, specifications: { "Water Tank Capacity": "500-1000L" }, isCustom: false },
    { id: "ft-medium", name: "Medium Duty Fire Truck", description: "For 500 series.", image: "/images/bodies/fire-truck-medium.jpg", compatibleSeries: ["500-series"], price: 1500000, specifications: { "Water Tank Capacity": "1500-3000L" }, isCustom: false },
    { id: "custom-fire-truck", name: "Custom Fire Truck", description: "Specify dimensions for a custom fire truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Fire Truck" }
  ],
  "Water Tanker": [
    { id: "wt-2k", name: "2000L Water Tanker", description: "For 200/300 series.", image: "/images/bodies/tanker-2k.jpg", compatibleSeries: ["200-series", "300-series"], price: 200000, specifications: { Capacity: "2000 liters" }, isCustom: false },
    { id: "wt-4k", name: "4000L Water Tanker", description: "For 300/500 series.", image: "/images/bodies/tanker-4.jpg", compatibleSeries: ["300-series", "500-series"], price: 280000, specifications: { Capacity: "4000 liters" }, isCustom: false },
    { id: "custom-water-tanker", name: "Custom Water Tanker", description: "Specify volume for a custom water tanker.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "volume", specifications: {}, categoryForMeasurement: "Water Tanker" }
  ],
  "Stake Truck": [
    { id: "st-10", name: "10ft Stake Truck", description: "10ft stake truck.", image: "/images/bodies/stake-truck-10.jpg", compatibleSeries: ["200-series", "300-series"], price: 130000, specifications: { Length: "10 feet" }, isCustom: false },
    { id: "st-14", name: "14ft Stake Truck", description: "14ft stake truck.", image: "/images/bodies/stake-truck-10.jpg", compatibleSeries: ["300-series", "500-series"], price: 160000, specifications: { Length: "14 feet" }, isCustom: false },
    { id: "custom-stake-truck", name: "Custom Stake Truck", description: "Specify dimensions for a custom stake truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["200-series", "300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Stake Truck" }
  ],
  "Rescue Truck": [
    { id: "rt-std", name: "Standard Rescue Truck", description: "Equipped for rescue.", image: "/images/bodies/rescue-truck.jpg", compatibleSeries: ["300-series", "500-series"], price: 750000, specifications: { Compartments: "Multiple" }, isCustom: false },
    { id: "custom-rescue-truck", name: "Custom Rescue Truck", description: "Specify dimensions for a custom rescue truck.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Rescue Truck" }
  ],
  "Prison Van": [
    { id: "pv-std", name: "Standard Prison Van", description: "Secure transport.", image: "/images/bodies/prison-van.jpg", compatibleSeries: ["300-series", "500-series"], price: 600000, specifications: { Security: "Reinforced" }, isCustom: false },
    { id: "custom-prison-van", name: "Custom Prison Van", description: "Specify dimensions for a custom prison van.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "Prison Van" }
  ],
  "School Service": [
    { id: "ss-std", name: "Standard School Service", description: "Safe school transport.", image: "/images/bodies/school-service.jpg", compatibleSeries: ["300-series", "500-series"], price: 550000, specifications: { Seating: "20-30" }, isCustom: false },
    { id: "custom-school-service", name: "Custom School Service", description: "Specify dimensions for a custom school service.", image: CUSTOM_BODY_IMAGE, compatibleSeries: ["300-series", "500-series"], price: CUSTOM_PRICE_TEXT, isCustom: true, customMeasurementType: "lwh", specifications: {}, categoryForMeasurement: "School Service" }
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

// --- HELPER FUNCTIONS ---
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
