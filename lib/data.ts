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
        image: "/images/916.png",
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
export const bodyTypes = {
  "Freezer Body": [
    {
      id: "freezer-small",
      name: "Small Freezer Body",
      description: "Insulated body for refrigerated goods transportation",
      image: "/images/body-freezer-small.jpg",
      price: 350000,
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        "Dimensions (L x W x H)": "3,500 x 1,800 x 1,800 mm",
        Volume: "11.3 cubic meters",
        "Temperature Range": "-20°C to +5°C",
        Insulation: "Polyurethane Foam",
        "Door Type": "Rear Swing Door",
      },
    },
    {
      id: "freezer-medium",
      name: "Medium Freezer Body",
      description: "Medium-sized insulated body for refrigerated goods",
      image: "/images/body-freezer-medium.jpg",
      price: 450000,
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Dimensions (L x W x H)": "5,000 x 2,200 x 2,200 mm",
        Volume: "24.2 cubic meters",
        "Temperature Range": "-25°C to +5°C",
        Insulation: "Polyurethane Foam",
        "Door Type": "Rear Swing Door",
      },
    },
  ],
  Container: [
    {
      id: "container-small",
      name: "Small Container",
      description: "Enclosed container for general cargo",
      image: "/images/body-container-small.jpg",
      price: 250000,
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        "Dimensions (L x W x H)": "3,500 x 1,800 x 1,800 mm",
        Volume: "11.3 cubic meters",
        Material: "Aluminum",
        "Door Type": "Rear Swing Door",
      },
    },
    {
      id: "container-medium",
      name: "Medium Container",
      description: "Medium-sized container for general cargo",
      image: "/images/body-container-medium.jpg",
      price: 350000,
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Dimensions (L x W x H)": "5,000 x 2,200 x 2,200 mm",
        Volume: "24.2 cubic meters",
        Material: "Aluminum",
        "Door Type": "Rear Swing Door",
      },
    },
  ],
  "Gas Carrier": [
    {
      id: "gas-carrier-medium",
      name: "Medium Gas Carrier",
      description: "Specialized body for gas transportation",
      image: "/images/body-gas-carrier.jpg",
      price: 850000,
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Tank Capacity": "5,000 liters",
        Material: "Stainless Steel",
        "Pressure Rating": "16 bar",
        "Safety Features": "Pressure Relief Valve, Emergency Shut-off",
      },
    },
  ],
  "Wing Van": [
    {
      id: "wing-van-small",
      name: "Small Wing Van",
      description: "Van with side-opening panels for easy loading",
      image: "/images/body-wing-van-small.jpg",
      price: 380000,
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        "Dimensions (L x W x H)": "3,500 x 1,800 x 1,800 mm",
        Volume: "11.3 cubic meters",
        Material: "Aluminum",
        "Door Type": "Side Wing + Rear Door",
      },
    },
    {
      id: "wing-van-medium",
      name: "Medium Wing Van",
      description: "Medium-sized van with side-opening panels",
      image: "/images/body-wing-van-medium.jpg",
      price: 480000,
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Dimensions (L x W x H)": "5,000 x 2,200 x 2,200 mm",
        Volume: "24.2 cubic meters",
        Material: "Aluminum",
        "Door Type": "Side Wing + Rear Door",
      },
    },
  ],
  Cargo: [
    {
      id: "cargo-small",
      name: "Small Cargo Body",
      description: "Basic cargo body for general transportation",
      image: "/images/body-cargo-small.jpg",
      price: 180000,
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        "Dimensions (L x W x H)": "3,500 x 1,800 x 400 mm",
        Material: "Steel with Wood Flooring",
        "Side Panel Height": "400 mm",
        "Load Capacity": "1,500 kg",
      },
    },
    {
      id: "cargo-medium",
      name: "Medium Cargo Body",
      description: "Medium-sized cargo body for general transportation",
      image: "/images/body-cargo-medium.jpg",
      price: 250000,
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Dimensions (L x W x H)": "5,000 x 2,200 x 500 mm",
        Material: "Steel with Wood Flooring",
        "Side Panel Height": "500 mm",
        "Load Capacity": "5,000 kg",
      },
    },
  ],
  "Dump Truck": [
    {
      id: "dump-medium",
      name: "Medium Dump Body",
      description: "Hydraulic dump body for construction materials",
      image: "/images/body-dump-medium.jpg",
      price: 550000,
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Dimensions (L x W x H)": "4,200 x 2,200 x 800 mm",
        Volume: "7.4 cubic meters",
        Material: "Hardened Steel",
        "Hydraulic System": "3-stage Telescopic Cylinder",
        "Dumping Angle": "45 degrees",
      },
    },
  ],
  Mixer: [
    {
      id: "mixer-medium",
      name: "Medium Mixer",
      description: "Concrete mixer for construction projects",
      image: "/images/body-mixer.jpg",
      price: 750000,
      compatibleSeries: ["500-series"],
      specifications: {
        "Drum Capacity": "6 cubic meters",
        "Drum Material": "Hardened Steel",
        "Mixing Speed": "0-14 rpm",
        "Water Tank": "400 liters",
      },
    },
  ],
  Tanker: [
    {
      id: "tanker-medium",
      name: "Medium Tanker",
      description: "Liquid transport tanker for various fluids",
      image: "/images/body-tanker.jpg",
      price: 650000,
      compatibleSeries: ["300-series", "500-series"],
      specifications: {
        "Tank Capacity": "8,000 liters",
        Material: "Stainless Steel",
        Compartments: "2",
        "Pump System": "Included",
      },
    },
  ],
  Dropside: [
    {
      id: "dropside-small",
      name: "Small Dropside",
      description: "Cargo body with drop-down sides for easy loading",
      image: "/images/body-dropside-small.jpg",
      price: 200000,
      compatibleSeries: ["200-series", "300-series"],
      specifications: {
        "Dimensions (L x W x H)": "3,500 x 1,800 x 400 mm",
        Material: "Aluminum",
        "Side Panel Height": "400 mm",
        "Load Capacity": "1,500 kg",
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
