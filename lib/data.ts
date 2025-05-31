// Mock data for the application
// In a real application, this would come from a database

// Chassis Series Data
export const seriesData = {
  "200-series": {
    title: "200 Series - Light Duty Trucks",
    description: "Light-duty trucks for urban delivery and distribution",
    models: [
      {
        id: "315-nac",
        name: "315 NAC",
        description: "The Hino 200 Series 315 Non-Airconditioning is a cost-effective, durable delivery truck prioritizing fuel efficiency over air conditioning.",
        image: "/images/200-series-315-nac.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo"],
        engine: "J05E-TP Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "3,490 kg",
          "Chassis Dimensions (L x W x H)": "4,595 x 1,695 x 2,030 mm",
          Wheelbase: "2,545 mm",
          "Max Output": "144 PS",
          "Max Torque": "300 Nm",
          "Max Speed": "130 km/h",
        },
      },
      {
        id: "315",
        name: "315",
        description: "The compact Hino 200 Series 315 offers agile maneuverability for efficient urban deliveries in tight spaces.",
        image: "/images/200-series-315-nac.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dropside"],
        engine: "J05E-TP Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "3,490 kg",
          "Chassis Dimensions (L x W x H)": "4,595 x 1,695 x 2,030 mm",
          Wheelbase: "2,545 mm",
          "Max Output": "144 PS",
          "Max Torque": "300 Nm",
          "Max Speed": "130 km/h",
        },
      },
      {
        id: "415",
        name: "415",
        description: "The Hino 200 Series 415 combines power and agility for efficient heavy-load urban deliveries in challenging city conditions.",
        image: "/images/200-series-315-nac.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dropside"],
        engine: "J05E-TP Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "3,800 kg",
          "Chassis Dimensions (L x W x H)": "4,595 x 1,695 x 2,030 mm",
          Wheelbase: "2,545 mm",
          "Max Output": "144 PS",
          "Max Torque": "300 Nm",
          "Max Speed": "130 km/h",
        },
      },
    ],
  },
  "300-series": {
    title: "300 Series - Medium Duty Trucks",
    description: "Medium-duty trucks for various commercial applications",
    models: [
      {
        id: "414i",
        name: "414i",
        description: "The Hino 300 Series 414i's modern, aerodynamic design improves urban maneuverability for efficient city deliveries.",
        image: "/images/300-series-414i.jpg",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dropside"],
        engine: "N04C-WB Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,490 kg",
          "Chassis Dimensions (L x W x H)": "5,075 x 1,715 x 2,115 mm",
          Wheelbase: "2,530 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "150 km/h",
        },
      },
      {
        id: "414i-long",
        name: "414i Long",
        description: "The durable Hino 300 Series 414i Long offers extended cargo space for efficient, and demanding transport everywhere.",
        image: "/images/300-series-414i.jpg",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dropside"],
        engine: "N04C-WB Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,490 kg",
          "Chassis Dimensions (L x W x H)": "6,430 x 1,715 x 2,115 mm",
          Wheelbase: "3,405 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "150 km/h",
        },
      },
      {
        id: "414i-6W",
        name: "414i 6W",
        description: "The 300 Series 414i 6W features a six-wheeler configuration that enhances load distribution and stability.",
        image: "/images/300-series-414i.jpg",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dropside"],
        engine: "N04C-WB Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,490 kg",
          "Chassis Dimensions (L x W x H)": "6,320 x 1,965 x 2,115 mm",
          Wheelbase: "3,380 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "133 km/h",
        }
      },
      {
        id: "514",
        name: "514",
        description: "The versatile and robust Hino 300 Series 514 offers a customizable, strong base for diverse applications.",
        image: "/images/300-series-514.jpg",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dropside"],
        engine: "N04C-WB Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,490 kg",
          "Chassis Dimensions (L x W x H)": "4,680 x 1,695 x 2,130 mm",
          Wheelbase: "2,525 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "125 km/h",
        }
      },
      {
        id: "514-auto",
        name: "514 Auto",
        description: "The durable and efficient 514 Auto provides long-lasting urban performance with minimized fuel consumption.",
        image: "/images/300-series-514.jpg",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dropside"],
        engine: "N04C-WB Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,490 kg",
          "Chassis Dimensions (L x W x H)": "4,680 x 1,695 x 2,130 mm",
          Wheelbase: "2,525 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "125 km/h",
        }
      },
      {
        id: "616",
        name: "616",
        description: "The durable and flexible Hino 300 Series 616 provides a reliable, customizable base for diverse transport needs.",
        image: "/images/300-series-616.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,490 kg",
          "Chassis Dimensions (L x W x H)": "6,120 x 1,995 x 2,205 mm",
          Wheelbase: "3,430 mm",
          "Max Output": "150 PS",
          "Max Torque": "420 Nm",
          "Max Speed": "123 km/h",
        },
      },
      {
        id: "716",
        name: "716",
        description: "The powerful and versatile Hino 300 Series 716 provides a robust, customizable base for enhanced business operations.",
        image: "/images/300-series-616.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "6,500 kg",
          "Chassis Dimensions (L x W x H)": "6,120 x 1,995 x 2,240 mm",
          Wheelbase: "3,430 mm",
          "Max Output": "150 PS",
          "Max Torque": "420 Nm",
          "Max Speed": "132 km/h",
        },
      },
      {
        id: "716-double",
        name: "716 Double",
        description: "The Hino 300 Series 716 Double offers comfortable team transport and versatile customization for various commercial needs.",
        image: "/images/300-series-616.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "6,500 kg",
          "Chassis Dimensions (L x W x H)": "6,740 x 1,995 x 2,255 mm",
          Wheelbase: "3,870 mm",
          "Max Output": "150 PS",
          "Max Torque": "420 Nm",
          "Max Speed": "132 km/h",
        },
      },
      {
        id: "814i",
        name: "814i",
        description: "The Hino 300 Series 814i's durable design is built to withstand everyday urban logistics challenges on daily use.",
        image: "/images/300-series-616.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "7,500 kg",
          "Chassis Dimensions (L x W x H)": "6,320 x 1,965 x 2,155 mm",
          Wheelbase: "3,380 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "133 km/h",
        },
      },
      {
        id: "814i-extra-long",
        name: "814i Extra Long",
        description: "The innovative Hino 300 Series 814i Extra Long optimizes urban deliveries with extended body and efficient storage.",
        image: "/images/300-series-616.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "7,500 kg",
          "Chassis Dimensions (L x W x H)": "7,185 x 1,965 x 2,150 mm",
          Wheelbase: "4,000 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "133 km/h",
        },
      },
      {
        id: "916",
        name: "916",
        description: "The Hino 300 Series 916 offers high payload capacity and reliability for demanding transport, with a robust, customizable design.",
        image: "/images/300-series-616.png",
        price: 9999999,
        bodyType: ["Freezer Body", "Container", "Wing Van", "Cargo", "Dump Truck"],
        engine: "J05E-UG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "8,500 kg",
          "Chassis Dimensions (L x W x H)": "7,250 x 2,055 x 2,260 mm",
          Wheelbase: "4,000 mm",
          "Max Output": "150 PS",
          "Max Torque": "420 Nm",
          "Max Speed": "125 km/h",
        },
      },
    ],
  },
  "500-series": {
    title: "500 Series - Heavy Duty Trucks",
    description: "Heavy-duty trucks for demanding operations",
    models: [
      {
        id: "1021",
        name: "1021",
        description: "Powerful heavy-duty truck for industrial use",
        image: "/images/500-series-1021.jpg",
        price: 2450000,
        bodyType: ["Container", "Wing Van", "Cargo", "Dump Truck", "Mixer", "Tanker"],
        engine: "J08E-VD Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "10,400 kg",
          "Chassis Dimensions (L x W x H)": "8,395 x 2,190 x 2,470 mm",
          Wheelbase: "4,990 mm",
          "Max Output": "210 PS",
          "Max Torque": "637 Nm",
          "Max Speed": "115 km/h",
        },
      },
      {
        id: "1625",
        name: "1625",
        description: "Heavy-duty truck for construction and logistics",
        image: "/images/500-series-1625.jpg",
        price: 2950000,
        bodyType: ["Container", "Wing Van", "Cargo", "Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "J08E-WG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "16,000 kg",
          "Chassis Dimensions (L x W x H)": "7,785 x 2,490 x 2,750 mm",
          Wheelbase: "4,330 mm",
          "Max Output": "240 PS",
          "Max Torque": "716 Nm",
          "Max Speed": "104 km/h",
        },
      },
      {
        id: "1625-long",
        name: "1625 Long",
        description: "Heavy-duty truck for construction and logistics",
        image: "/images/500-series-1625.jpg",
        price: 2950000,
        bodyType: ["Container", "Wing Van", "Cargo", "Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "J08E-WG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "16,000 kg",
          "Chassis Dimensions (L x W x H)": "9,485 x 2,490 x 2,745 mm",
          Wheelbase: "5,530 mm",
          "Max Output": "240 PS",
          "Max Torque": "716 Nm",
          "Max Speed": "104 km/h",
        },
      },
      {
        id: "1927-auto",
        name: "1927 Auto",
        description: "Heavy-duty truck for construction and logistics",
        image: "/images/500-series-1625.jpg",
        price: 2950000,
        bodyType: ["Container", "Wing Van", "Cargo", "Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "J08E-WG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "18,200 kg",
          "Chassis Dimensions (L x W x H)": "8,835 x 2,490 x 2,765 mm",
          Wheelbase: "5,080 mm",
          "Max Output": "260 PS",
          "Max Torque": "794 Nm",
          "Max Speed": "100 km/h",
        },
      },
      {
        id: "2629-6x2",
        name: "2629 6x2",
        description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series-2629.jpg",
        price: 3650000,
        bodyType: ["Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "E13C-BT Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "26,000 kg",
          "Chassis Dimensions (L x W x H)": "11,935 x 2,490 x 2,770 mm",
          Wheelbase: "6,130 + 1,350 mm",
          "Max Output": "280 PS",
          "Max Torque": "824 Nm",
          "Max Speed": "111 km/h",
        },
      },
      {
        id: "2629-6x4",
        name: "2629 6x4",
        description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series-2629.jpg",
        price: 3650000,
        bodyType: ["Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "E13C-BT Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "28,000 kg",
          "Chassis Dimensions (L x W x H)": "9,485 x 2,490 x 2,765 mm",
          Wheelbase: "4,630 + 1,350 mm",
          "Max Output": "280 PS",
          "Max Torque": "824 Nm",
          "Max Speed": "98 km/h",
        },
      },
      {
        id: "2836",
        name: "2836",
        description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series-2629.jpg",
        price: 3650000,
        bodyType: ["Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "E13C-BT Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "28,000 kg",
          "Chassis Dimensions (L x W x H)": "9,485 x 2,490 x 2,905 mm",
          Wheelbase: "4,530 + 1,350 mm",
          "Max Output": "350 PS",
          "Max Torque": "1,422 Nm",
          "Max Speed": "117 km/h",
        },
      },
      {
        id: "2836-dump",
        name: "2836 Dump",
        description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series-2629.jpg",
        price: 3650000,
        bodyType: ["Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "E13C-BT Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "28,000 kg",
          "Chassis Dimensions (L x W x H)": "7,435 x 2,490 x 2,910 mm",
          Wheelbase: "3,480 + 1,350 mm",
          "Max Output": "350 PS",
          "Max Torque": "1,422 Nm",
          "Max Speed": "109 km/h",
        },
      },
      {
        id: "1735-tractor",
        name: "1735 Tractor",
        description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series-2629.jpg",
        price: 3650000,
        bodyType: ["Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "E13C-BT Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "18,000 kg",
          "Chassis Dimensions (L x W x H)": "5,995 x 2,490 x 2,890 mm",
          Wheelbase: "3,630 mm",
          "Max Output": "350 PS",
          "Max Torque": "1,422 Nm",
          "Max Speed": "118 km/h",
        },
      },
      {
        id: "2635-tractor",
        name: "2635 Tractor",
        description: "Heavy-duty truck with superior traction for challenging terrain",
        image: "/images/500-series-2629.jpg",
        price: 3650000,
        bodyType: ["Dump Truck", "Mixer", "Tanker", "Gas Carrier"],
        engine: "E13C-BT Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "26,000 kg",
          "Chassis Dimensions (L x W x H)": "7,045 x 2,490 x 2,910 mm",
          Wheelbase: "3,480 + 1,350 mm",
          "Max Output": "350 PS",
          "Max Torque": "1,422 Nm",
          "Max Speed": "117 km/h",
        },
      },
    ],
  },
  buses: {
    title: "Hino Buses",
    description: "Passenger buses for various transportation needs",
    models: [
      {
        id: "cerito-916",
        name: "Cerito 916",
        description: "The Hino 916 Cerito Bus offers a comfortable, efficient, and reliable ride for urban and intercity travel.",
        image: "/images/bus-cerito-916.jpg",
        price: 3250000,
        engine: "N04C-WK Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "8,500 kg",
          "Chassis Dimensions (L x W x H)": "7,700 x 2,008 x 2,700 mm",
          Wheelbase: "4,400 mm",
          "Max Output": "150 PS",
          "Max Torque": "420 Nm",
          "Max Speed": "125 km/h",
        },
      },
      {
        id: "916",
        name: "916",
        description: "The Hino 916 Bus delivers smooth, efficient performance with a spacious, safe, and comfortable design for public and private transport.",
        image: "/images/bus-916.png",
        price: 3250000,
        engine: "N04C-WK Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "8,500 kg",
          "Chassis Dimensions (L x W x H)": "8,160 x 2,100 x 3,040 - 3,290 mm",
          Wheelbase: "4,200 mm",
          "Max Output": "150 PS",
          "Max Torque": "420 Nm",
          "Max Speed": "125 km/h",
        },
      },
      {
        id: "1021",
        name: "1021",
        description: "The Hino 1021 Bus offers durable, versatile performance with ample seating and safety features for both urban and long-distance travel.",
        image: "/images/1021.png",
        price: 3250000,
        engine: "N04C-WK Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "10,400 kg",
          "Chassis Dimensions (L x W x H)": "9,500 x 2,250 x 3,320 - 3,600 mm",
          Wheelbase: "4,990 mm",
          "Max Output": "210 PS",
          "Max Torque": "637 Nm",
          "Max Speed": "115 km/h",
        },
      },
      {
        id: "1625",
        name: "1625",
        description: "The Hino 1625 Bus delivers strong, reliable performance with spacious comfort and advanced safety for both city and long-distance travel.",
        image: "/images/1625.png",
        price: 3250000,
        engine: "N04C-WK Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "16,000 kg",
          "Chassis Dimensions (L x W x H)": "10,500 x 2,480 x 3,700 - 3,900 mm",
          Wheelbase: "5,530 mm",
          "Max Output": "240 PS",
          "Max Torque": "716 Nm",
          "Max Speed": "104 km/h",
        },
      },
      {
        id: "1625-long",
        name: "1625 Long",
        description: "The Hino 1625 Bus delivers strong, reliable performance with spacious comfort and advanced safety for both city and long-distance travel.",
        image: "/images/1625.png",
        price: 3250000,
        engine: "N04C-WK Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "16,000 kg",
          "Chassis Dimensions (L x W x H)": "10,500 x 2,480 x 3,700 - 3,900 mm",
          Wheelbase: "5,530 mm",
          "Max Output": "240 PS",
          "Max Torque": "716 Nm",
          "Max Speed": "104 km/h",
        },
      },
      {
        id: "rk-1426",
        name: "RK 1426",
        description: "Mid-size bus for intercity travel",
        image: "/images/bus-rk-1426.jpg",
        price: 4150000,
        engine: "J08E-VD Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "14,000 kg",
          "Dimensions (L x W x H)": "9,200 x 2,400 x 3,300 mm",
          Wheelbase: "5,200 mm",
          "Max Output": "250 PS",
          "Max Torque": "739 Nm",
          "Max Speed": "114 km/h",
        },
      },
      {
        id: "rk-1426-long",
        name: "RK 1426 Long",
        description: "Mid-size bus for intercity travel",
        image: "/images/bus-rk-1426.jpg",
        price: 4150000,
        engine: "J08E-VD Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "14,000 kg",
          "Dimensions (L x W x H)": "12,000 x 2,480 x 3,550 - 3,800 mm",
          Wheelbase: "6,000 mm",
          "Max Output": "250 PS",
          "Max Torque": "739 Nm",
          "Max Speed": "114 km/h",
        },
      },
      {
        id: "rn-1626",
        name: "RN 1626",
        description: "Large bus for long-distance travel",
        image: "/images/bus-rn-1626.jpg",
        price: 5250000,
        engine: "J08E-WG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "16,000 kg",
          "Dimensions (L x W x H)": "12,000 x 2,480 x 3,550 - 3,800 mm",
          Wheelbase: "6,000 mm",
          "Max Output": "250 PS",
          "Max Torque": "739 Nm",
          "Max Speed": "118 km/h",
        },
      },
      {
        id: "hs-1829",
        name: "HS 1829",
        description: "Large bus for long-distance travel",
        image: "/images/bus-hs-1829.jpg",
        price: 5250000,
        engine: "J08E-WG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "18,000 kg",
          "Dimensions (L x W x H)": "12,200 x 2,500 x 3,270 mm",
          Wheelbase: "5,875 mm",
          "Max Output": "280 PS",
          "Max Torque": "824 Nm",
          "Max Speed": "120 km/h",
        },
      },
    ],
  },
  puvs: {
    title: "Hino PUVs",
    description: "Public Utility Vehicles for modern transportation",
    models: [
      {
        id: "puv-class-ii",
        name: "PUV Class II",
        description: "Modern jeepney replacement for urban routes",
        image: "/images/puv-class-ii.jpg",
        price: 1950000,
        engine: "N04C-WB Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,970 kg",
          "Dimensions (L x W x H)": "6,215 x 1,780 x 2,860 mm",
          Wheelbase: "3,405 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "150 km/h",
        },
      },
      {
        id: "puv-class-ii-s",
        name: "PUV Class II-S",
        description: "Modern jeepney replacement for urban routes",
        image: "/images/puv-class-ii-s.jpg",
        price: 1950000,
        engine: "N04C-WB Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,995 kg",
          "Dimensions (L x W x H)": "6,500 x 2,100 x 2,890 mm approx.",
          Wheelbase: "3,430 approx. mm",
          "Max Output": "150 PS",
          "Max Torque": "420 Nm",
          "Max Speed": "123 km/h",
        },
      },
      {
        id: "puv-class-iii",
        name: "PUV Class III",
        description: "Modern jeepney replacement for longer routes",
        image: "/images/puv-class-ii-s.jpg",
        price: 2250000,
        engine: "J05E-UG Diesel Engine",
        specifications: {
          "Gross Vehicle Weight": "4,995 kg",
          "Dimensions (L x W x H)": "6,950 x 1,995 x 2,935 mm",
          Wheelbase: "3,880 mm",
          "Max Output": "136 PS",
          "Max Torque": "390 Nm",
          "Max Speed": "120 km/h",
        },
      },
    ],
  },
}

// Body Categories
export const bodyCategories = [
  "Freezer Body",
  "Container",
  "Gas Carrier",
  "Wing Van",
  "Cargo",
  "Dump Truck",
  "Mixer",
  "Tanker",
  "Dropside",
]

// Body Types
// Body Types
export const bodyTypes = {
  "Freezer Body": [
    {
      id: "fb-10",
      name: "10ft Freezer Body",
      description: "10ft refrigerated truck body for temperature-controlled cargo",
      image: "/images/bodies/freezer-10.jpg",
      price: 500000, // Add price
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        Length: "10 feet",
        "Temperature Range": "-20°C to +5°C",
        "Insulation": "Polyurethane foam",
      },
    },
    {
      id: "fb-14",
      name: "14ft Freezer Body",
      description: "14ft refrigerated truck body for larger cold chain logistics",
      image: "/images/bodies/freezer-14.jpg",
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        Length: "14 feet",
        "Temperature Range": "-20°C to +5°C",
        "Insulation": "Polyurethane foam",
      },
    },
  ],
  "Container": [
    {
      id: "ct-10",
      name: "10ft Container Van",
      description: "10ft enclosed cargo container for secure transport",
      image: "/images/bodies/container-10.jpg",
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        Length: "10 feet",
        Material: "Aluminum",
        "Load Capacity": "Standard",
      },
    },
    {
      id: "ct-20",
      name: "20ft Container Van",
      description: "20ft enclosed cargo container for larger loads",
      image: "/images/bodies/container-20.jpg",
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        Length: "20 feet",
        Material: "Aluminum",
        "Load Capacity": "Heavy-duty",
      },
    },
  ],
  "Wing Van": [
    {
      id: "wv-16",
      name: "16ft Wing Van",
      description: "16ft wing van body with side-opening panels",
      image: "/images/bodies/wing-16.jpg",
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        Length: "16 feet",
        "Wing Type": "Manual",
        Material: "Aluminum",
      },
    },
    {
      id: "wv-32",
      name: "32ft Wing Van",
      description: "32ft wing van body for maximum accessibility",
      image: "/images/bodies/wing-32.jpg",
      compatibleSeries: ["500-series"],
      specifications: {
        Length: "32 feet",
        "Wing Type": "Hydraulic",
        Material: "Aluminum",
      },
    },
  ],
  "Cargo": [
    {
      id: "cg-10",
      name: "10ft Cargo Body",
      description: "10ft standard cargo body for general transport",
      image: "/images/bodies/cargo-10.jpg",
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        Length: "10 feet",
        Material: "Steel & Aluminum",
        "Side Height": "Standard",
      },
    },
    {
      id: "cg-20",
      name: "20ft Cargo Body",
      description: "20ft cargo body for larger freight",
      image: "/images/bodies/cargo-20.jpg",
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        Length: "20 feet",
        Material: "Steel & Aluminum",
        "Side Height": "High",
      },
    },
  ],
  "Dump Truck": [
    {
      id: "dt-6",
      name: "6cu.m Dump Truck",
      description: "6 cubic meter dump truck body for construction",
      image: "/images/bodies/dump-6.jpg",
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Capacity": "6 cubic meters",
        "Hydraulic System": "Front-mount",
        Material: "High-tensile steel",
      },
    },
    {
      id: "dt-15",
      name: "15cu.m Dump Truck",
      description: "15 cubic meter dump truck body for heavy duty",
      image: "/images/bodies/dump-15.jpg",
      compatibleSeries: ["500-series"],
      specifications: {
        "Capacity": "15 cubic meters",
        "Hydraulic System": "Front-mount",
        Material: "High-tensile steel",
      },
    },
  ],
  "Mixer": [
    {
      id: "mx-6",
      name: "6cu.m Mixer",
      description: "6 cubic meter concrete mixer body",
      image: "/images/bodies/mixer-6.jpg",
      compatibleSeries: ["500-series"],
      specifications: {
        "Capacity": "6 cubic meters",
        "Drum Speed": "0-14 rpm",
        "Water Tank": "500L",
      },
    },
  ],
  "Tanker": [
    {
      id: "tk-4",
      name: "4000L Tanker",
      description: "4000-liter capacity tanker for liquid transport",
      image: "/images/bodies/tanker-4.jpg",
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Capacity": "4000 liters",
        Material: "Stainless steel",
        Compartments: "Single",
      },
    },
    {
      id: "tk-10",
      name: "10000L Tanker",
      description: "10000-liter capacity tanker for bulk liquids",
      image: "/images/bodies/tanker-10.jpg",
      compatibleSeries: ["500-series"],
      specifications: {
        "Capacity": "10000 liters",
        Material: "Stainless steel",
        Compartments: "Multi",
      },
    },
  ],
  "Gas Carrier": [
    {
      id: "gc-10",
      name: "10000L Gas Carrier",
      description: "10000-liter capacity gas carrier",
      image: "/images/bodies/gas-10.jpg",
      compatibleSeries: ["500-series"],
      specifications: {
        "Capacity": "10000 liters",
        "Pressure Rating": "High",
        "Safety Features": "Advanced",
      },
    },
  ],
  "Dropside": [
    {
      id: "ds-10",
      name: "10ft Dropside",
      description: "10ft dropside body for versatile loading",
      image: "/images/bodies/dropside-10.jpg",
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        Length: "10 feet",
        Material: "Steel & Aluminum",
        "Side Height": "Standard",
      },
    },
    {
      id: "ds-16",
      name: "16ft Dropside",
      description: "16ft dropside body for larger cargo",
      image: "/images/bodies/dropside-16.jpg",
      compatibleSeries: ["300-series"],
      specifications: {
        Length: "16 feet",
        Material: "Steel & Aluminum",
        "Side Height": "High",
      },
    },
  ],
}

// Helper functions to get data
export function getSeriesData(seriesSlug: string) {
  return seriesData[seriesSlug as keyof typeof seriesData] || null
}

export function getModelData(seriesSlug: string, modelId: string) {
  const series = seriesData[seriesSlug as keyof typeof seriesData]
  if (!series) return null

  return series.models.find((model: any) => model.id === modelId) || null
}

export function getBodyCategories() {
  return bodyCategories
}

export function getCompatibleBodies(seriesSlug: string, modelId: string) {
  const model = getModelData(seriesSlug, modelId)
  if (!model) return []

  const compatibleBodies: any[] = []

  // Get all body types that are compatible with this model
  if ('bodyType' in model) {
    model.bodyType.forEach((bodyType: string) => {
    const bodies = bodyTypes[bodyType as keyof typeof bodyTypes] || []

    // Filter bodies that are compatible with this series
    bodies.forEach((body: any) => {
      if (body.compatibleSeries.includes(seriesSlug) && !compatibleBodies.some((b) => b.id === body.id)) {
        compatibleBodies.push(body)
      }
    })
  })

  return compatibleBodies
}}

export function getAllBodies() {
  const allBodies: any[] = []

  // Flatten all body types into a single array
  Object.values(bodyTypes).forEach((bodies: any) => {
    bodies.forEach((body: any) => {
      if (!allBodies.some((b) => b.id === body.id)) {
        allBodies.push(body)
      }
    })
  })

  return allBodies
}

export function getBodyById(bodyId: string) {
  for (const category in bodyTypes) {
    const bodies = bodyTypes[category as keyof typeof bodyTypes] || []
    const body = bodies.find((b: any) => b.id === bodyId)
    if (body) return body
  }

  return null
}
