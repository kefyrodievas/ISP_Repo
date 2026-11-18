
export const computerParts = [
  {
    id: 1,
    name: 'AMD Ryzen 7 7800X3D',
    description: 'Žaidimams optimizuotas procesorius su 3D V-Cache technologija.',
    manufacturer: 'AMD',
    model: '7800X3D',
    weight: '0,04 kg',
    dimensions: '40 x 40 x 5 mm',
    stockQuantity: 18,
    publicationDate: '2025-11-02',
    category: 'CPU',
    seller: 'Komponentai.lt',
    connectors: ['AM5'],
  },
  {
    id: 2,
    name: 'Intel Core i7-14700K',
    description: 'Galingas 20 branduolių procesorius darbui ir žaidimams.',
    manufacturer: 'Intel',
    model: 'i7-14700K',
    weight: '0,05 kg',
    dimensions: '37,5 x 37,5 x 4,5 mm',
    stockQuantity: 22,
    publicationDate: '2025-10-15',
    category: 'CPU',
    seller: 'IT Centras',
    connectors: ['LGA1700'],
  },
  {
    id: 3,
    name: 'AMD Ryzen 5 7600',
    description: 'Subalansuotas procesorius vidutinio biudžeto kompiuteriams.',
    manufacturer: 'AMD',
    model: '7600',
    weight: '0,04 kg',
    dimensions: '40 x 40 x 5 mm',
    stockQuantity: 31,
    publicationDate: '2025-09-20',
    category: 'CPU',
    seller: 'PC Dalys LT',
    connectors: ['AM5'],
  },
  {
    id: 4,
    name: 'ASUS GeForce RTX 4070 Dual',
    description: 'Vaizdo plokštė 1440p žaidimams su ray tracing palaikymu.',
    manufacturer: 'ASUS',
    model: 'GeForce RTX 4070 Dual',
    weight: '1,15 kg',
    dimensions: '267 x 128 x 50 mm',
    stockQuantity: 9,
    publicationDate: '2025-08-11',
    category: 'GPU',
    seller: 'TopKompiuteriai',
    connectors: ['PCIe 4.0 x16'],
  },
  {
    id: 5,
    name: 'MSI GeForce RTX 4060 Ti Gaming X',
    description: 'Efektyvi vaizdo plokštė populiariausiems žaidimams Full HD/1440p.',
    manufacturer: 'MSI',
    model: 'GeForce RTX 4060 Ti Gaming X',
    weight: '1,05 kg',
    dimensions: '262 x 125 x 50 mm',
    stockQuantity: 14,
    publicationDate: '2025-07-28',
    category: 'GPU',
    seller: 'Komponentai.lt',
    connectors: ['PCIe 4.0 x16'],
  },
  {
    id: 6,
    name: 'Gigabyte Radeon RX 7700 XT Gaming OC',
    description: 'AMD vaizdo plokštė su gera kainos ir našumo santykiu.',
    manufacturer: 'Gigabyte',
    model: 'Radeon RX 7700 XT Gaming OC',
    weight: '1,20 kg',
    dimensions: '280 x 130 x 52 mm',
    stockQuantity: 11,
    publicationDate: '2025-10-03',
    category: 'GPU',
    seller: 'Technikos Namai',
    connectors: ['PCIe 4.0 x16'],
  },
  {
    id: 7,
    name: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
    description: 'Sparti DDR5 atmintis naujos kartos platformoms.',
    manufacturer: 'Corsair',
    model: 'Vengeance DDR5 32GB 6000MHz',
    weight: '0,07 kg',
    dimensions: '133 x 34 x 7 mm',
    stockQuantity: 26,
    publicationDate: '2025-11-10',
    category: 'RAM',
    seller: 'IT Centras',
    connectors: ['DDR5'],
  },
  {
    id: 8,
    name: 'Kingston Fury Beast DDR5 16GB (2x8GB) 5600MHz',
    description: 'Patikima DDR5 atmintis kasdieniam naudojimui ir žaidimams.',
    manufacturer: 'Kingston',
    model: 'Fury Beast DDR5 16GB 5600MHz',
    weight: '0,05 kg',
    dimensions: '133 x 34 x 7 mm',
    stockQuantity: 34,
    publicationDate: '2025-06-14',
    category: 'RAM',
    seller: 'PC Dalys LT',
    connectors: ['DDR5'],
  },
  {
    id: 9,
    name: 'Corsair Vengeance LPX DDR4 16GB (2x8GB) 3200MHz',
    description: 'Populiariausia DDR4 atmintis senesnėms platformoms.',
    manufacturer: 'Corsair',
    model: 'Vengeance LPX DDR4 16GB 3200MHz',
    weight: '0,05 kg',
    dimensions: '133 x 34 x 7 mm',
    stockQuantity: 40,
    publicationDate: '2024-12-01',
    category: 'RAM',
    seller: 'TopKompiuteriai',
    connectors: ['DDR4'],
  },
  {
    id: 10,
    name: 'ASUS ROG Strix B650-A Gaming WiFi',
    description: 'Motininė plokštė AM5 platformai su WiFi 6 ir PCIe 4.0.',
    manufacturer: 'ASUS',
    model: 'ROG Strix B650-A Gaming WiFi',
    weight: '1,10 kg',
    dimensions: '305 x 244 mm',
    stockQuantity: 13,
    publicationDate: '2025-09-05',
    category: 'Motininė plokštė',
    seller: 'Komponentai.lt',
    connectors: ['AM5', 'DDR5', 'PCIe 4.0 x16'],
  },
  {
    id: 11,
    name: 'MSI PRO Z790-A WiFi',
    description: 'Patikima Intel platformos plokštė entuziastams.',
    manufacturer: 'MSI',
    model: 'PRO Z790-A WiFi',
    weight: '1,15 kg',
    dimensions: '305 x 244 mm',
    stockQuantity: 10,
    publicationDate: '2025-08-19',
    category: 'Motininė plokštė',
    seller: 'IT Centras',
    connectors: ['LGA1700', 'DDR5', 'PCIe 4.0 x16'],
  },
  {
    id: 12,
    name: 'Gigabyte B760M DS3H',
    description: 'Kompaktiška mATX plokštė biudžetiniams kompiuteriams.',
    manufacturer: 'Gigabyte',
    model: 'B760M DS3H',
    weight: '0,85 kg',
    dimensions: '244 x 244 mm',
    stockQuantity: 19,
    publicationDate: '2025-05-22',
    category: 'Motininė plokštė',
    seller: 'PC Dalys LT',
    connectors: ['LGA1700', 'DDR4', 'PCIe 4.0 x16'],
  },
  {
    id: 13,
    name: 'Corsair RM850x 850W',
    description: 'Tylus, pilnai moduliarus maitinimo blokas su 80+ Gold sertifikatu.',
    manufacturer: 'Corsair',
    model: 'RM850x',
    weight: '1,80 kg',
    dimensions: '150 x 86 x 160 mm',
    stockQuantity: 17,
    publicationDate: '2025-04-10',
    category: 'Maitinimo blokas',
    seller: 'TopKompiuteriai',
    connectors: ['ATX', '80+ Gold'],
  },
  {
    id: 14,
    name: 'be quiet! Pure Power 12 M 750W',
    description: 'Patikimas moduliarus maitinimo blokas vidutinės klasės sistemoms.',
    manufacturer: 'be quiet!',
    model: 'Pure Power 12 M 750W',
    weight: '1,70 kg',
    dimensions: '150 x 86 x 160 mm',
    stockQuantity: 21,
    publicationDate: '2025-07-02',
    category: 'Maitinimo blokas',
    seller: 'Technikos Namai',
    connectors: ['ATX', '80+ Gold'],
  },
  {
    id: 15,
    name: 'SeaSonic Focus GX-650 650W',
    description: 'Kompaktiškas maitinimo blokas kasdieniam naudojimui.',
    manufacturer: 'SeaSonic',
    model: 'Focus GX-650',
    weight: '1,60 kg',
    dimensions: '150 x 86 x 140 mm',
    stockQuantity: 24,
    publicationDate: '2025-03-18',
    category: 'Maitinimo blokas',
    seller: 'Komponentai.lt',
    connectors: ['ATX', '80+ Gold'],
  },
  {
    id: 16,
    name: 'Fractal Design Meshify 2 Compact',
    description: 'Korpusas su gera ventiliacija ir tyliu veikimu.',
    manufacturer: 'Fractal Design',
    model: 'Meshify 2 Compact',
    weight: '7,20 kg',
    dimensions: '424 x 210 x 475 mm',
    stockQuantity: 12,
    publicationDate: '2025-10-28',
    category: 'Korpusas',
    seller: 'IT Centras',
    connectors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
  },
  {
    id: 17,
    name: 'Cooler Master MasterBox TD500 Mesh',
    description: 'Stilingas korpusas su tinkleliu priekyje geresniam oro srautui.',
    manufacturer: 'Cooler Master',
    model: 'MasterBox TD500 Mesh',
    weight: '7,80 kg',
    dimensions: '493 x 215 x 468 mm',
    stockQuantity: 15,
    publicationDate: '2025-06-30',
    category: 'Korpusas',
    seller: 'PC Dalys LT',
    connectors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
  },
  {
    id: 18,
    name: 'NZXT H5 Flow',
    description: 'Minimalistinio dizaino korpusas su geru aušinimu.',
    manufacturer: 'NZXT',
    model: 'H5 Flow',
    weight: '6,90 kg',
    dimensions: '453 x 210 x 428 mm',
    stockQuantity: 16,
    publicationDate: '2025-02-14',
    category: 'Korpusas',
    seller: 'TopKompiuteriai',
    connectors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
  },
  {
    id: 19,
    name: 'Noctua NH-D15',
    description: 'Vienas geriausių oru aušinamų aušintuvų rinkoje.',
    manufacturer: 'Noctua',
    model: 'NH-D15',
    weight: '1,32 kg',
    dimensions: '165 x 150 x 161 mm',
    stockQuantity: 20,
    publicationDate: '2025-01-09',
    category: 'Aušintuvas',
    seller: 'Technikos Namai',
    connectors: ['AM5', 'AM4', 'LGA1700'],
  },
  {
    id: 20,
    name: 'Cooler Master Hyper 212 Black Edition',
    description: 'Populiarus biudžetinis aušintuvas geram kainos ir kokybės santykiui.',
    manufacturer: 'Cooler Master',
    model: 'Hyper 212 Black Edition',
    weight: '0,62 kg',
    dimensions: '120 x 81 x 159 mm',
    stockQuantity: 35,
    publicationDate: '2024-11-25',
    category: 'Aušintuvas',
    seller: 'Komponentai.lt',
    connectors: ['AM5', 'AM4', 'LGA1700'],
  },
  {
    id: 21,
    name: 'Corsair iCUE H100i Elite (240mm AIO)',
    description: 'Skysčiu aušinama sistema su RGB apšvietimu ir tyliu veikimu.',
    manufacturer: 'Corsair',
    model: 'iCUE H100i Elite',
    weight: '1,05 kg',
    dimensions: '277 x 120 x 27 mm',
    stockQuantity: 9,
    publicationDate: '2025-09-12',
    category: 'Aušintuvas',
    seller: 'IT Centras',
    connectors: ['AM5', 'AM4', 'LGA1700'],
  },
  {
    id: 22,
    name: 'Samsung 990 Pro 2TB NVMe SSD',
    description: 'Vienas sparčiausių NVMe SSD, skirtas žaidimams ir darbui.',
    manufacturer: 'Samsung',
    model: '990 Pro 2TB',
    weight: '0,01 kg',
    dimensions: '80 x 22 x 2,3 mm',
    stockQuantity: 23,
    publicationDate: '2025-11-05',
    category: 'Kaupiklis',
    seller: 'PC Dalys LT',
    connectors: ['M.2 PCIe 4.0'],
  },
  {
    id: 23,
    name: 'Western Digital Black SN850X 1TB',
    description: 'Greitas NVMe SSD, optimizuotas žaidimams.',
    manufacturer: 'Western Digital',
    model: 'Black SN850X 1TB',
    weight: '0,01 kg',
    dimensions: '80 x 22 x 2,3 mm',
    stockQuantity: 27,
    publicationDate: '2025-08-01',
    category: 'Kaupiklis',
    seller: 'TopKompiuteriai',
    connectors: ['M.2 PCIe 4.0'],
  },
  {
    id: 24,
    name: 'Seagate Barracuda 2TB HDD',
    description: 'Talpus kietasis diskas failų ir failų archyvų saugojimui.',
    manufacturer: 'Seagate',
    model: 'Barracuda 2TB',
    weight: '0,45 kg',
    dimensions: '101,6 x 146,99 x 20,2 mm',
    stockQuantity: 30,
    publicationDate: '2024-10-08',
    category: 'Kaupiklis',
    seller: 'Technikos Namai',
    connectors: ['SATA III'],
  },
]

export const prices = [
  { partId: 1, price: 549, recordedDate: '2026-08-15' },

  { partId: 2, price: 479, recordedDate: '2026-05-12' },
  { partId: 2, price: 469, recordedDate: '2026-07-03' },
  { partId: 2, price: 459, recordedDate: '2026-09-18' },
  { partId: 2, price: 449, recordedDate: '2026-10-25' },

  { partId: 3, price: 229, recordedDate: '2026-05-20' },
  { partId: 3, price: 219, recordedDate: '2026-08-02' },
  { partId: 3, price: 209, recordedDate: '2026-10-10' },

  { partId: 4, price: 749, recordedDate: '2026-05-15' },
  { partId: 4, price: 729, recordedDate: '2026-07-01' },
  { partId: 4, price: 719, recordedDate: '2026-08-20' },
  { partId: 4, price: 709, recordedDate: '2026-09-25' },
  { partId: 4, price: 699, recordedDate: '2026-10-20' },

  { partId: 5, price: 589, recordedDate: '2026-05-10' },
  { partId: 5, price: 569, recordedDate: '2026-07-15' },
  { partId: 5, price: 559, recordedDate: '2026-09-05' },
  { partId: 5, price: 549, recordedDate: '2026-10-22' },

  { partId: 6, price: 599, recordedDate: '2026-06-01' },
  { partId: 6, price: 589, recordedDate: '2026-08-10' },
  { partId: 6, price: 579, recordedDate: '2026-10-15' },

  { partId: 7, price: 149, recordedDate: '2026-05-08' },
  { partId: 7, price: 145, recordedDate: '2026-07-20' },
  { partId: 7, price: 142, recordedDate: '2026-09-01' },
  { partId: 7, price: 139, recordedDate: '2026-10-28' },

  { partId: 8, price: 75, recordedDate: '2026-06-15' },
  { partId: 8, price: 72, recordedDate: '2026-09-10' },
  { partId: 8, price: 69, recordedDate: '2026-11-02' },

  { partId: 9, price: 55, recordedDate: '2026-05-25' },
  { partId: 9, price: 52, recordedDate: '2026-08-18' },
  { partId: 9, price: 49, recordedDate: '2026-10-30' },

  { partId: 10, price: 229, recordedDate: '2026-05-05' },
  { partId: 10, price: 224, recordedDate: '2026-07-12' },
  { partId: 10, price: 219, recordedDate: '2026-09-20' },

  { partId: 11, price: 269, recordedDate: '2026-06-08' },
  { partId: 11, price: 264, recordedDate: '2026-08-25' },
  { partId: 11, price: 259, recordedDate: '2026-10-12' },

  { partId: 12, price: 115, recordedDate: '2026-05-30' },
  { partId: 12, price: 112, recordedDate: '2026-08-14' },
  { partId: 12, price: 109, recordedDate: '2026-10-05' },

  { partId: 13, price: 145, recordedDate: '2026-05-18' },
  { partId: 13, price: 142, recordedDate: '2026-07-22' },
  { partId: 13, price: 139, recordedDate: '2026-09-28' },

  { partId: 14, price: 95, recordedDate: '2026-06-12' },
  { partId: 14, price: 92, recordedDate: '2026-09-02' },
  { partId: 14, price: 89, recordedDate: '2026-10-20' },

  { partId: 15, price: 79, recordedDate: '2026-05-22' },
  { partId: 15, price: 77, recordedDate: '2026-08-08' },
  { partId: 15, price: 75, recordedDate: '2026-10-18' },

  { partId: 16, price: 119, recordedDate: '2026-05-14' },
  { partId: 16, price: 115, recordedDate: '2026-07-05' },
  { partId: 16, price: 112, recordedDate: '2026-09-08' },
  { partId: 16, price: 109, recordedDate: '2026-10-26' },

  { partId: 17, price: 95, recordedDate: '2026-06-20' },
  { partId: 17, price: 92, recordedDate: '2026-08-30' },
  { partId: 17, price: 89, recordedDate: '2026-11-01' },

  { partId: 18, price: 85, recordedDate: '2026-05-28' },
  { partId: 18, price: 82, recordedDate: '2026-08-04' },
  { partId: 18, price: 79, recordedDate: '2026-10-08' },

  { partId: 19, price: 115, recordedDate: '2026-06-02' },
  { partId: 19, price: 112, recordedDate: '2026-08-16' },
  { partId: 19, price: 109, recordedDate: '2026-10-14' },

  { partId: 20, price: 35, recordedDate: '2026-05-09' },
  { partId: 20, price: 34, recordedDate: '2026-07-19' },
  { partId: 20, price: 32, recordedDate: '2026-09-25' },

  { partId: 21, price: 159, recordedDate: '2026-06-05' },
  { partId: 21, price: 154, recordedDate: '2026-08-22' },
  { partId: 21, price: 149, recordedDate: '2026-10-29' },

  { partId: 22, price: 179, recordedDate: '2026-05-16' },
  { partId: 22, price: 175, recordedDate: '2026-07-10' },
  { partId: 22, price: 172, recordedDate: '2026-09-15' },
  { partId: 22, price: 169, recordedDate: '2026-10-24' },

  { partId: 23, price: 105, recordedDate: '2026-06-18' },
  { partId: 23, price: 102, recordedDate: '2026-09-05' },
  { partId: 23, price: 99, recordedDate: '2026-10-16' },

  // partId 24 sąmoningai neturi kainų istorijos įrašų.
]

export const images = computerParts.flatMap((part) => [
  {
    partId: part.id,
    url: `https://placehold.co/600x400?text=${encodeURIComponent(part.name)}`,
    title: 'Pagrindinė nuotrauka',
    orderNumber: 1,
  },
  {
    partId: part.id,
    url: `https://placehold.co/600x400?text=${encodeURIComponent(part.model)}`,
    title: 'Papildoma nuotrauka',
    orderNumber: 2,
  },
])

export const promotions = [
  {
    id: 1,
    partIds: [4, 5],
    percentage: 15,
    startDate: '2026-10-20',
    endDate: '2026-11-15',
  },
  {
    id: 2,
    partIds: [7, 8, 9],
    percentage: 10,
    startDate: '2026-11-01',
    endDate: '2026-11-30',
  },
  {
    id: 3,
    partIds: [16, 17],
    percentage: 20,
    startDate: '2026-11-05',
    endDate: '2026-11-20',
  },
  {
    id: 4,
    partIds: [1, 2, 3],
    percentage: 12,
    startDate: '2026-09-01',
    endDate: '2026-09-30',
  },
]

export const accounts = [
  {
    id: 1,
    firstName: 'Tomas',
    lastName: 'Jonaitis',
    email: 'tomas.jonaitis@example.lt',
    role: 'Pirkėjas',
    blocked: false,
    registrationDate: '2025-03-14',
    lastLoginDate: '2026-11-05',
  },
  {
    id: 2,
    firstName: 'Eglė',
    lastName: 'Petraitienė',
    email: 'egle.petraitiene@example.lt',
    role: 'Pirkėjas',
    blocked: true,
    registrationDate: '2025-06-02',
    lastLoginDate: '2026-10-02',
  },
  {
    id: 3,
    firstName: 'Marius',
    lastName: 'Kazlauskas',
    email: 'marius.kazlauskas@example.lt',
    role: 'Pardavėjas',
    blocked: false,
    registrationDate: '2024-11-20',
    lastLoginDate: '2026-11-06',
  },
  {
    id: 4,
    firstName: 'Rūta',
    lastName: 'Butkutė',
    email: 'ruta.butkute@example.lt',
    role: 'Pirkėjas',
    blocked: false,
    registrationDate: '2026-01-10',
    lastLoginDate: '2026-11-01',
  },
  {
    id: 5,
    firstName: 'Darius',
    lastName: 'Vasiliauskas',
    email: 'darius.vasiliauskas@example.lt',
    role: 'Administratorius',
    blocked: false,
    registrationDate: '2023-09-05',
    lastLoginDate: '2026-11-07',
  },
  {
    id: 6,
    firstName: 'Ieva',
    lastName: 'Stankevičiūtė',
    email: 'ieva.stankeviciute@example.lt',
    role: 'Pardavėjas',
    blocked: true,
    registrationDate: '2025-02-18',
    lastLoginDate: '2026-09-15',
  },
  {
    id: 7,
    firstName: 'Lukas',
    lastName: 'Urbonas',
    email: 'lukas.urbonas@example.lt',
    role: 'Pirkėjas',
    blocked: false,
    registrationDate: '2026-04-22',
    lastLoginDate: '2026-10-28',
  },
  {
    id: 8,
    firstName: 'Agnė',
    lastName: 'Žukauskienė',
    email: 'agne.zukauskiene@example.lt',
    role: 'Administratorius',
    blocked: false,
    registrationDate: '2024-05-30',
    lastLoginDate: '2026-11-06',
  },
]

export const blocks = [
  {
    accountId: 2,
    startDate: '2026-10-02',
    endDate: '2026-12-02',
    reason: 'Pažeistos naudojimo taisyklės – kelis kartus paskelbti netikri atsiliepimai.',
  },
  {
    accountId: 6,
    startDate: '2026-09-15',
    endDate: null,
    reason: 'Nuolat vėluojama pristatyti užsakymus, gauta daug pirkėjų skundų.',
  },
]

export const reviews = [
  { id: 1, partId: 1, authorId: 1, text: 'Puikus procesorius žaidimams, temperatūros žemos.', rating: 5, publicationDate: '2026-09-01', status: 'Aktyvus' },
  { id: 2, partId: 1, authorId: 4, text: 'Geras našumas, tačiau kaina kiek aukšta.', rating: 4, publicationDate: '2026-09-20', status: 'Aktyvus' },
  { id: 3, partId: 2, authorId: 7, text: 'Greitas ir patikimas procesorius, rekomenduoju.', rating: 5, publicationDate: '2026-08-14', status: 'Redaguotas' },
  { id: 4, partId: 4, authorId: 1, text: 'Vaizdo plokštė tyliai veikia, žaidimai atrodo puikiai.', rating: 5, publicationDate: '2026-10-02', status: 'Aktyvus' },
  { id: 5, partId: 4, authorId: 7, text: 'Kaina per akciją buvo labai gera.', rating: 4, publicationDate: '2026-10-25', status: 'Aktyvus' },
  { id: 6, partId: 5, authorId: 4, text: 'Tinkama vaizdo plokštė kainos ir kokybės santykiui.', rating: 4, publicationDate: '2026-07-30', status: 'Aktyvus' },
  { id: 7, partId: 7, authorId: 1, text: 'Atmintis veikia stabiliai, suderinta su mano plokšte.', rating: 5, publicationDate: '2026-06-10', status: 'Aktyvus' },
  { id: 8, partId: 9, authorId: 7, text: 'Netiko mano plokštei, bet kaltas pats, nepatikrinau suderinamumo.', rating: 2, publicationDate: '2026-05-29', status: 'Trintas vartotojo' },
  { id: 9, partId: 10, authorId: 4, text: 'Geros galimybės ir patogus BIOS.', rating: 5, publicationDate: '2026-09-28', status: 'Aktyvus' },
  { id: 10, partId: 13, authorId: 1, text: 'Tylus maitinimo blokas, laidai kokybiški.', rating: 5, publicationDate: '2026-06-02', status: 'Aktyvus' },
  { id: 11, partId: 16, authorId: 7, text: 'Labai patogus surinkti komponentus, geras oro srautas.', rating: 5, publicationDate: '2026-08-19', status: 'Aktyvus' },
  { id: 12, partId: 16, authorId: 4, text: 'Netiko dėl per mažo vidinio laisvo vietos aukšto aušintuvo.', rating: 3, publicationDate: '2026-10-01', status: 'Redaguotas' },
  { id: 13, partId: 19, authorId: 1, text: 'Žemina temperatūras, bet labai didelis, netilpo mano korpuse.', rating: 3, publicationDate: '2026-07-11', status: 'Aktyvus' },
  { id: 14, partId: 22, authorId: 7, text: 'Labai greitas SSD, diskas atpažintas iškart.', rating: 5, publicationDate: '2026-10-05', status: 'Aktyvus' },
  { id: 15, partId: 24, authorId: 4, text: 'Netinkamas turinys, pašalintas administracijos.', rating: 1, publicationDate: '2026-08-02', status: 'Trintas administratoriaus' },
]

let prototypeReviews = reviews.map((review) => ({ ...review }))

export function getPrototypeReviews() {
  return prototypeReviews
}

export function savePrototypeReviews(list) {
  prototypeReviews = list
}

export function formatEuro(amount) {
  if (amount === null || amount === undefined) {
    return null
  }

  return `${amount.toLocaleString('lt-LT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`
}

export function getPriceHistory(partId) {
  return prices
    .filter((entry) => entry.partId === partId)
    .sort((a, b) => a.recordedDate.localeCompare(b.recordedDate))
}

export function getCurrentPrice(partId) {
  const history = getPriceHistory(partId)
  if (history.length === 0) {
    return null
  }

  return history[history.length - 1].price
}

export function getActivePromotion(partId, date = new Date()) {
  const today = date.toISOString().slice(0, 10)

  return (
    promotions.find(
      (promotion) =>
        promotion.partIds.includes(partId) &&
        promotion.startDate <= today &&
        today <= promotion.endDate
    ) || null
  )
}

export function getImages(partId) {
  return images
    .filter((image) => image.partId === partId)
    .sort((a, b) => a.orderNumber - b.orderNumber)
}

export function getVisibleReviews(partId, list = reviews) {
  return list.filter(
    (review) =>
      review.partId === partId &&
      (review.status === 'Aktyvus' || review.status === 'Redaguotas')
  )
}

export function getAverageRating(partId, list = reviews) {
  const visibleReviews = getVisibleReviews(partId, list)
  if (visibleReviews.length === 0) {
    return { average: 0, count: 0 }
  }

  const sum = visibleReviews.reduce((total, review) => total + review.rating, 0)
  return { average: sum / visibleReviews.length, count: visibleReviews.length }
}

export function getAccountName(accountId) {
  const account = accounts.find((entry) => entry.id === accountId)
  return account ? `${account.firstName} ${account.lastName}` : 'Nežinomas naudotojas'
}
