// Mock duomenys vizualiniam prototipui. Realūs duomenys ateityje bus gaunami iš backend'o.

export const kompiuterioDalys = [
  {
    id: 1,
    pavadinimas: 'AMD Ryzen 7 7800X3D',
    aprašymas: 'Žaidimams optimizuotas procesorius su 3D V-Cache technologija.',
    gamintojas: 'AMD',
    modelis: '7800X3D',
    svoris: '0,04 kg',
    matmenys: '40 x 40 x 5 mm',
    sandėlioKiekis: 18,
    paskelbimoData: '2025-11-02',
    kategorija: 'CPU',
    pardavėjas: 'Komponentai.lt',
    jungtys: ['AM5'],
  },
  {
    id: 2,
    pavadinimas: 'Intel Core i7-14700K',
    aprašymas: 'Galingas 20 branduolių procesorius darbui ir žaidimams.',
    gamintojas: 'Intel',
    modelis: 'i7-14700K',
    svoris: '0,05 kg',
    matmenys: '37,5 x 37,5 x 4,5 mm',
    sandėlioKiekis: 22,
    paskelbimoData: '2025-10-15',
    kategorija: 'CPU',
    pardavėjas: 'IT Centras',
    jungtys: ['LGA1700'],
  },
  {
    id: 3,
    pavadinimas: 'AMD Ryzen 5 7600',
    aprašymas: 'Subalansuotas procesorius vidutinio biudžeto kompiuteriams.',
    gamintojas: 'AMD',
    modelis: '7600',
    svoris: '0,04 kg',
    matmenys: '40 x 40 x 5 mm',
    sandėlioKiekis: 31,
    paskelbimoData: '2025-09-20',
    kategorija: 'CPU',
    pardavėjas: 'PC Dalys LT',
    jungtys: ['AM5'],
  },
  {
    id: 4,
    pavadinimas: 'ASUS GeForce RTX 4070 Dual',
    aprašymas: 'Vaizdo plokštė 1440p žaidimams su ray tracing palaikymu.',
    gamintojas: 'ASUS',
    modelis: 'GeForce RTX 4070 Dual',
    svoris: '1,15 kg',
    matmenys: '267 x 128 x 50 mm',
    sandėlioKiekis: 9,
    paskelbimoData: '2025-08-11',
    kategorija: 'GPU',
    pardavėjas: 'TopKompiuteriai',
    jungtys: ['PCIe 4.0 x16'],
  },
  {
    id: 5,
    pavadinimas: 'MSI GeForce RTX 4060 Ti Gaming X',
    aprašymas: 'Efektyvi vaizdo plokštė populiariausiems žaidimams Full HD/1440p.',
    gamintojas: 'MSI',
    modelis: 'GeForce RTX 4060 Ti Gaming X',
    svoris: '1,05 kg',
    matmenys: '262 x 125 x 50 mm',
    sandėlioKiekis: 14,
    paskelbimoData: '2025-07-28',
    kategorija: 'GPU',
    pardavėjas: 'Komponentai.lt',
    jungtys: ['PCIe 4.0 x16'],
  },
  {
    id: 6,
    pavadinimas: 'Gigabyte Radeon RX 7700 XT Gaming OC',
    aprašymas: 'AMD vaizdo plokštė su gera kainos ir našumo santykiu.',
    gamintojas: 'Gigabyte',
    modelis: 'Radeon RX 7700 XT Gaming OC',
    svoris: '1,20 kg',
    matmenys: '280 x 130 x 52 mm',
    sandėlioKiekis: 11,
    paskelbimoData: '2025-10-03',
    kategorija: 'GPU',
    pardavėjas: 'Technikos Namai',
    jungtys: ['PCIe 4.0 x16'],
  },
  {
    id: 7,
    pavadinimas: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
    aprašymas: 'Sparti DDR5 atmintis naujos kartos platformoms.',
    gamintojas: 'Corsair',
    modelis: 'Vengeance DDR5 32GB 6000MHz',
    svoris: '0,07 kg',
    matmenys: '133 x 34 x 7 mm',
    sandėlioKiekis: 26,
    paskelbimoData: '2025-11-10',
    kategorija: 'RAM',
    pardavėjas: 'IT Centras',
    jungtys: ['DDR5'],
  },
  {
    id: 8,
    pavadinimas: 'Kingston Fury Beast DDR5 16GB (2x8GB) 5600MHz',
    aprašymas: 'Patikima DDR5 atmintis kasdieniam naudojimui ir žaidimams.',
    gamintojas: 'Kingston',
    modelis: 'Fury Beast DDR5 16GB 5600MHz',
    svoris: '0,05 kg',
    matmenys: '133 x 34 x 7 mm',
    sandėlioKiekis: 34,
    paskelbimoData: '2025-06-14',
    kategorija: 'RAM',
    pardavėjas: 'PC Dalys LT',
    jungtys: ['DDR5'],
  },
  {
    id: 9,
    pavadinimas: 'Corsair Vengeance LPX DDR4 16GB (2x8GB) 3200MHz',
    aprašymas: 'Populiariausia DDR4 atmintis senesnėms platformoms.',
    gamintojas: 'Corsair',
    modelis: 'Vengeance LPX DDR4 16GB 3200MHz',
    svoris: '0,05 kg',
    matmenys: '133 x 34 x 7 mm',
    sandėlioKiekis: 40,
    paskelbimoData: '2024-12-01',
    kategorija: 'RAM',
    pardavėjas: 'TopKompiuteriai',
    jungtys: ['DDR4'],
  },
  {
    id: 10,
    pavadinimas: 'ASUS ROG Strix B650-A Gaming WiFi',
    aprašymas: 'Motininė plokštė AM5 platformai su WiFi 6 ir PCIe 4.0.',
    gamintojas: 'ASUS',
    modelis: 'ROG Strix B650-A Gaming WiFi',
    svoris: '1,10 kg',
    matmenys: '305 x 244 mm',
    sandėlioKiekis: 13,
    paskelbimoData: '2025-09-05',
    kategorija: 'Motininė plokštė',
    pardavėjas: 'Komponentai.lt',
    jungtys: ['AM5', 'DDR5', 'PCIe 4.0 x16'],
  },
  {
    id: 11,
    pavadinimas: 'MSI PRO Z790-A WiFi',
    aprašymas: 'Patikima Intel platformos plokštė entuziastams.',
    gamintojas: 'MSI',
    modelis: 'PRO Z790-A WiFi',
    svoris: '1,15 kg',
    matmenys: '305 x 244 mm',
    sandėlioKiekis: 10,
    paskelbimoData: '2025-08-19',
    kategorija: 'Motininė plokštė',
    pardavėjas: 'IT Centras',
    jungtys: ['LGA1700', 'DDR5', 'PCIe 4.0 x16'],
  },
  {
    id: 12,
    pavadinimas: 'Gigabyte B760M DS3H',
    aprašymas: 'Kompaktiška mATX plokštė biudžetiniams kompiuteriams.',
    gamintojas: 'Gigabyte',
    modelis: 'B760M DS3H',
    svoris: '0,85 kg',
    matmenys: '244 x 244 mm',
    sandėlioKiekis: 19,
    paskelbimoData: '2025-05-22',
    kategorija: 'Motininė plokštė',
    pardavėjas: 'PC Dalys LT',
    jungtys: ['LGA1700', 'DDR4', 'PCIe 4.0 x16'],
  },
  {
    id: 13,
    pavadinimas: 'Corsair RM850x 850W',
    aprašymas: 'Tylus, pilnai moduliarus maitinimo blokas su 80+ Gold sertifikatu.',
    gamintojas: 'Corsair',
    modelis: 'RM850x',
    svoris: '1,80 kg',
    matmenys: '150 x 86 x 160 mm',
    sandėlioKiekis: 17,
    paskelbimoData: '2025-04-10',
    kategorija: 'Maitinimo blokas',
    pardavėjas: 'TopKompiuteriai',
    jungtys: ['ATX', '80+ Gold'],
  },
  {
    id: 14,
    pavadinimas: 'be quiet! Pure Power 12 M 750W',
    aprašymas: 'Patikimas moduliarus maitinimo blokas vidutinės klasės sistemoms.',
    gamintojas: 'be quiet!',
    modelis: 'Pure Power 12 M 750W',
    svoris: '1,70 kg',
    matmenys: '150 x 86 x 160 mm',
    sandėlioKiekis: 21,
    paskelbimoData: '2025-07-02',
    kategorija: 'Maitinimo blokas',
    pardavėjas: 'Technikos Namai',
    jungtys: ['ATX', '80+ Gold'],
  },
  {
    id: 15,
    pavadinimas: 'SeaSonic Focus GX-650 650W',
    aprašymas: 'Kompaktiškas maitinimo blokas kasdieniam naudojimui.',
    gamintojas: 'SeaSonic',
    modelis: 'Focus GX-650',
    svoris: '1,60 kg',
    matmenys: '150 x 86 x 140 mm',
    sandėlioKiekis: 24,
    paskelbimoData: '2025-03-18',
    kategorija: 'Maitinimo blokas',
    pardavėjas: 'Komponentai.lt',
    jungtys: ['ATX', '80+ Gold'],
  },
  {
    id: 16,
    pavadinimas: 'Fractal Design Meshify 2 Compact',
    aprašymas: 'Korpusas su gera ventiliacija ir tyliu veikimu.',
    gamintojas: 'Fractal Design',
    modelis: 'Meshify 2 Compact',
    svoris: '7,20 kg',
    matmenys: '424 x 210 x 475 mm',
    sandėlioKiekis: 12,
    paskelbimoData: '2025-10-28',
    kategorija: 'Korpusas',
    pardavėjas: 'IT Centras',
    jungtys: ['ATX', 'Micro-ATX', 'Mini-ITX'],
  },
  {
    id: 17,
    pavadinimas: 'Cooler Master MasterBox TD500 Mesh',
    aprašymas: 'Stilingas korpusas su tinkleliu priekyje geresniam oro srautui.',
    gamintojas: 'Cooler Master',
    modelis: 'MasterBox TD500 Mesh',
    svoris: '7,80 kg',
    matmenys: '493 x 215 x 468 mm',
    sandėlioKiekis: 15,
    paskelbimoData: '2025-06-30',
    kategorija: 'Korpusas',
    pardavėjas: 'PC Dalys LT',
    jungtys: ['ATX', 'Micro-ATX', 'Mini-ITX'],
  },
  {
    id: 18,
    pavadinimas: 'NZXT H5 Flow',
    aprašymas: 'Minimalistinio dizaino korpusas su geru aušinimu.',
    gamintojas: 'NZXT',
    modelis: 'H5 Flow',
    svoris: '6,90 kg',
    matmenys: '453 x 210 x 428 mm',
    sandėlioKiekis: 16,
    paskelbimoData: '2025-02-14',
    kategorija: 'Korpusas',
    pardavėjas: 'TopKompiuteriai',
    jungtys: ['ATX', 'Micro-ATX', 'Mini-ITX'],
  },
  {
    id: 19,
    pavadinimas: 'Noctua NH-D15',
    aprašymas: 'Vienas geriausių oru aušinamų aušintuvų rinkoje.',
    gamintojas: 'Noctua',
    modelis: 'NH-D15',
    svoris: '1,32 kg',
    matmenys: '165 x 150 x 161 mm',
    sandėlioKiekis: 20,
    paskelbimoData: '2025-01-09',
    kategorija: 'Aušintuvas',
    pardavėjas: 'Technikos Namai',
    jungtys: ['AM5', 'AM4', 'LGA1700'],
  },
  {
    id: 20,
    pavadinimas: 'Cooler Master Hyper 212 Black Edition',
    aprašymas: 'Populiarus biudžetinis aušintuvas geram kainos ir kokybės santykiui.',
    gamintojas: 'Cooler Master',
    modelis: 'Hyper 212 Black Edition',
    svoris: '0,62 kg',
    matmenys: '120 x 81 x 159 mm',
    sandėlioKiekis: 35,
    paskelbimoData: '2024-11-25',
    kategorija: 'Aušintuvas',
    pardavėjas: 'Komponentai.lt',
    jungtys: ['AM5', 'AM4', 'LGA1700'],
  },
  {
    id: 21,
    pavadinimas: 'Corsair iCUE H100i Elite (240mm AIO)',
    aprašymas: 'Skysčiu aušinama sistema su RGB apšvietimu ir tyliu veikimu.',
    gamintojas: 'Corsair',
    modelis: 'iCUE H100i Elite',
    svoris: '1,05 kg',
    matmenys: '277 x 120 x 27 mm',
    sandėlioKiekis: 9,
    paskelbimoData: '2025-09-12',
    kategorija: 'Aušintuvas',
    pardavėjas: 'IT Centras',
    jungtys: ['AM5', 'AM4', 'LGA1700'],
  },
  {
    id: 22,
    pavadinimas: 'Samsung 990 Pro 2TB NVMe SSD',
    aprašymas: 'Vienas sparčiausių NVMe SSD, skirtas žaidimams ir darbui.',
    gamintojas: 'Samsung',
    modelis: '990 Pro 2TB',
    svoris: '0,01 kg',
    matmenys: '80 x 22 x 2,3 mm',
    sandėlioKiekis: 23,
    paskelbimoData: '2025-11-05',
    kategorija: 'Kaupiklis',
    pardavėjas: 'PC Dalys LT',
    jungtys: ['M.2 PCIe 4.0'],
  },
  {
    id: 23,
    pavadinimas: 'Western Digital Black SN850X 1TB',
    aprašymas: 'Greitas NVMe SSD, optimizuotas žaidimams.',
    gamintojas: 'Western Digital',
    modelis: 'Black SN850X 1TB',
    svoris: '0,01 kg',
    matmenys: '80 x 22 x 2,3 mm',
    sandėlioKiekis: 27,
    paskelbimoData: '2025-08-01',
    kategorija: 'Kaupiklis',
    pardavėjas: 'TopKompiuteriai',
    jungtys: ['M.2 PCIe 4.0'],
  },
  {
    id: 24,
    pavadinimas: 'Seagate Barracuda 2TB HDD',
    aprašymas: 'Talpus kietasis diskas failų ir failų archyvų saugojimui.',
    gamintojas: 'Seagate',
    modelis: 'Barracuda 2TB',
    svoris: '0,45 kg',
    matmenys: '101,6 x 146,99 x 20,2 mm',
    sandėlioKiekis: 30,
    paskelbimoData: '2024-10-08',
    kategorija: 'Kaupiklis',
    pardavėjas: 'Technikos Namai',
    jungtys: ['SATA III'],
  },
]

export const kainos = [
  { dalisId: 1, kaina: 549, nustatymoData: '2026-08-15' },

  { dalisId: 2, kaina: 479, nustatymoData: '2026-05-12' },
  { dalisId: 2, kaina: 469, nustatymoData: '2026-07-03' },
  { dalisId: 2, kaina: 459, nustatymoData: '2026-09-18' },
  { dalisId: 2, kaina: 449, nustatymoData: '2026-10-25' },

  { dalisId: 3, kaina: 229, nustatymoData: '2026-05-20' },
  { dalisId: 3, kaina: 219, nustatymoData: '2026-08-02' },
  { dalisId: 3, kaina: 209, nustatymoData: '2026-10-10' },

  { dalisId: 4, kaina: 749, nustatymoData: '2026-05-15' },
  { dalisId: 4, kaina: 729, nustatymoData: '2026-07-01' },
  { dalisId: 4, kaina: 719, nustatymoData: '2026-08-20' },
  { dalisId: 4, kaina: 709, nustatymoData: '2026-09-25' },
  { dalisId: 4, kaina: 699, nustatymoData: '2026-10-20' },

  { dalisId: 5, kaina: 589, nustatymoData: '2026-05-10' },
  { dalisId: 5, kaina: 569, nustatymoData: '2026-07-15' },
  { dalisId: 5, kaina: 559, nustatymoData: '2026-09-05' },
  { dalisId: 5, kaina: 549, nustatymoData: '2026-10-22' },

  { dalisId: 6, kaina: 599, nustatymoData: '2026-06-01' },
  { dalisId: 6, kaina: 589, nustatymoData: '2026-08-10' },
  { dalisId: 6, kaina: 579, nustatymoData: '2026-10-15' },

  { dalisId: 7, kaina: 149, nustatymoData: '2026-05-08' },
  { dalisId: 7, kaina: 145, nustatymoData: '2026-07-20' },
  { dalisId: 7, kaina: 142, nustatymoData: '2026-09-01' },
  { dalisId: 7, kaina: 139, nustatymoData: '2026-10-28' },

  { dalisId: 8, kaina: 75, nustatymoData: '2026-06-15' },
  { dalisId: 8, kaina: 72, nustatymoData: '2026-09-10' },
  { dalisId: 8, kaina: 69, nustatymoData: '2026-11-02' },

  { dalisId: 9, kaina: 55, nustatymoData: '2026-05-25' },
  { dalisId: 9, kaina: 52, nustatymoData: '2026-08-18' },
  { dalisId: 9, kaina: 49, nustatymoData: '2026-10-30' },

  { dalisId: 10, kaina: 229, nustatymoData: '2026-05-05' },
  { dalisId: 10, kaina: 224, nustatymoData: '2026-07-12' },
  { dalisId: 10, kaina: 219, nustatymoData: '2026-09-20' },

  { dalisId: 11, kaina: 269, nustatymoData: '2026-06-08' },
  { dalisId: 11, kaina: 264, nustatymoData: '2026-08-25' },
  { dalisId: 11, kaina: 259, nustatymoData: '2026-10-12' },

  { dalisId: 12, kaina: 115, nustatymoData: '2026-05-30' },
  { dalisId: 12, kaina: 112, nustatymoData: '2026-08-14' },
  { dalisId: 12, kaina: 109, nustatymoData: '2026-10-05' },

  { dalisId: 13, kaina: 145, nustatymoData: '2026-05-18' },
  { dalisId: 13, kaina: 142, nustatymoData: '2026-07-22' },
  { dalisId: 13, kaina: 139, nustatymoData: '2026-09-28' },

  { dalisId: 14, kaina: 95, nustatymoData: '2026-06-12' },
  { dalisId: 14, kaina: 92, nustatymoData: '2026-09-02' },
  { dalisId: 14, kaina: 89, nustatymoData: '2026-10-20' },

  { dalisId: 15, kaina: 79, nustatymoData: '2026-05-22' },
  { dalisId: 15, kaina: 77, nustatymoData: '2026-08-08' },
  { dalisId: 15, kaina: 75, nustatymoData: '2026-10-18' },

  { dalisId: 16, kaina: 119, nustatymoData: '2026-05-14' },
  { dalisId: 16, kaina: 115, nustatymoData: '2026-07-05' },
  { dalisId: 16, kaina: 112, nustatymoData: '2026-09-08' },
  { dalisId: 16, kaina: 109, nustatymoData: '2026-10-26' },

  { dalisId: 17, kaina: 95, nustatymoData: '2026-06-20' },
  { dalisId: 17, kaina: 92, nustatymoData: '2026-08-30' },
  { dalisId: 17, kaina: 89, nustatymoData: '2026-11-01' },

  { dalisId: 18, kaina: 85, nustatymoData: '2026-05-28' },
  { dalisId: 18, kaina: 82, nustatymoData: '2026-08-04' },
  { dalisId: 18, kaina: 79, nustatymoData: '2026-10-08' },

  { dalisId: 19, kaina: 115, nustatymoData: '2026-06-02' },
  { dalisId: 19, kaina: 112, nustatymoData: '2026-08-16' },
  { dalisId: 19, kaina: 109, nustatymoData: '2026-10-14' },

  { dalisId: 20, kaina: 35, nustatymoData: '2026-05-09' },
  { dalisId: 20, kaina: 34, nustatymoData: '2026-07-19' },
  { dalisId: 20, kaina: 32, nustatymoData: '2026-09-25' },

  { dalisId: 21, kaina: 159, nustatymoData: '2026-06-05' },
  { dalisId: 21, kaina: 154, nustatymoData: '2026-08-22' },
  { dalisId: 21, kaina: 149, nustatymoData: '2026-10-29' },

  { dalisId: 22, kaina: 179, nustatymoData: '2026-05-16' },
  { dalisId: 22, kaina: 175, nustatymoData: '2026-07-10' },
  { dalisId: 22, kaina: 172, nustatymoData: '2026-09-15' },
  { dalisId: 22, kaina: 169, nustatymoData: '2026-10-24' },

  { dalisId: 23, kaina: 105, nustatymoData: '2026-06-18' },
  { dalisId: 23, kaina: 102, nustatymoData: '2026-09-05' },
  { dalisId: 23, kaina: 99, nustatymoData: '2026-10-16' },

  // dalisId 24 sąmoningai neturi kainų istorijos įrašų.
]

export const nuotraukos = kompiuterioDalys.flatMap((dalis) => [
  {
    dalisId: dalis.id,
    url: `https://placehold.co/600x400?text=${encodeURIComponent(dalis.pavadinimas)}`,
    pavadinimas: 'Pagrindinė nuotrauka',
    eilėsNumeris: 1,
  },
  {
    dalisId: dalis.id,
    url: `https://placehold.co/600x400?text=${encodeURIComponent(dalis.modelis)}`,
    pavadinimas: 'Papildoma nuotrauka',
    eilėsNumeris: 2,
  },
])

export const akcijos = [
  {
    id: 1,
    dalysIds: [4, 5],
    procentai: 15,
    pradžiosData: '2026-10-20',
    pabaigosData: '2026-11-15',
  },
  {
    id: 2,
    dalysIds: [7, 8, 9],
    procentai: 10,
    pradžiosData: '2026-11-01',
    pabaigosData: '2026-11-30',
  },
  {
    id: 3,
    dalysIds: [16, 17],
    procentai: 20,
    pradžiosData: '2026-11-05',
    pabaigosData: '2026-11-20',
  },
  {
    id: 4,
    dalysIds: [1, 2, 3],
    procentai: 12,
    pradžiosData: '2026-09-01',
    pabaigosData: '2026-09-30',
  },
]

export const paskyros = [
  {
    id: 1,
    vardas: 'Tomas',
    pavardė: 'Jonaitis',
    elPaštas: 'tomas.jonaitis@example.lt',
    rolė: 'Pirkėjas',
    užblokuota: false,
    registracijosData: '2025-03-14',
    paskutinioPrisijungimoData: '2026-11-05',
  },
  {
    id: 2,
    vardas: 'Eglė',
    pavardė: 'Petraitienė',
    elPaštas: 'egle.petraitiene@example.lt',
    rolė: 'Pirkėjas',
    užblokuota: true,
    registracijosData: '2025-06-02',
    paskutinioPrisijungimoData: '2026-10-02',
  },
  {
    id: 3,
    vardas: 'Marius',
    pavardė: 'Kazlauskas',
    elPaštas: 'marius.kazlauskas@example.lt',
    rolė: 'Pardavėjas',
    užblokuota: false,
    registracijosData: '2024-11-20',
    paskutinioPrisijungimoData: '2026-11-06',
  },
  {
    id: 4,
    vardas: 'Rūta',
    pavardė: 'Butkutė',
    elPaštas: 'ruta.butkute@example.lt',
    rolė: 'Pirkėjas',
    užblokuota: false,
    registracijosData: '2026-01-10',
    paskutinioPrisijungimoData: '2026-11-01',
  },
  {
    id: 5,
    vardas: 'Darius',
    pavardė: 'Vasiliauskas',
    elPaštas: 'darius.vasiliauskas@example.lt',
    rolė: 'Administratorius',
    užblokuota: false,
    registracijosData: '2023-09-05',
    paskutinioPrisijungimoData: '2026-11-07',
  },
  {
    id: 6,
    vardas: 'Ieva',
    pavardė: 'Stankevičiūtė',
    elPaštas: 'ieva.stankeviciute@example.lt',
    rolė: 'Pardavėjas',
    užblokuota: true,
    registracijosData: '2025-02-18',
    paskutinioPrisijungimoData: '2026-09-15',
  },
  {
    id: 7,
    vardas: 'Lukas',
    pavardė: 'Urbonas',
    elPaštas: 'lukas.urbonas@example.lt',
    rolė: 'Pirkėjas',
    užblokuota: false,
    registracijosData: '2026-04-22',
    paskutinioPrisijungimoData: '2026-10-28',
  },
  {
    id: 8,
    vardas: 'Agnė',
    pavardė: 'Žukauskienė',
    elPaštas: 'agne.zukauskiene@example.lt',
    rolė: 'Administratorius',
    užblokuota: false,
    registracijosData: '2024-05-30',
    paskutinioPrisijungimoData: '2026-11-06',
  },
]

export const blokavimai = [
  {
    paskyrosId: 2,
    pradžiosData: '2026-10-02',
    pabaigosData: '2026-12-02',
    priežastis: 'Pažeistos naudojimo taisyklės – kelis kartus paskelbti netikri atsiliepimai.',
  },
  {
    paskyrosId: 6,
    pradžiosData: '2026-09-15',
    pabaigosData: null,
    priežastis: 'Nuolat vėluojama pristatyti užsakymus, gauta daug pirkėjų skundų.',
  },
]

export const atsiliepimai = [
  { id: 1, dalisId: 1, autoriusId: 1, tekstas: 'Puikus procesorius žaidimams, temperatūros žemos.', įvertinimas: 5, paskelbimoData: '2026-09-01', būsena: 'Aktyvus' },
  { id: 2, dalisId: 1, autoriusId: 4, tekstas: 'Geras našumas, tačiau kaina kiek aukšta.', įvertinimas: 4, paskelbimoData: '2026-09-20', būsena: 'Aktyvus' },
  { id: 3, dalisId: 2, autoriusId: 7, tekstas: 'Greitas ir patikimas procesorius, rekomenduoju.', įvertinimas: 5, paskelbimoData: '2026-08-14', būsena: 'Redaguotas' },
  { id: 4, dalisId: 4, autoriusId: 1, tekstas: 'Vaizdo plokštė tyliai veikia, žaidimai atrodo puikiai.', įvertinimas: 5, paskelbimoData: '2026-10-02', būsena: 'Aktyvus' },
  { id: 5, dalisId: 4, autoriusId: 7, tekstas: 'Kaina per akciją buvo labai gera.', įvertinimas: 4, paskelbimoData: '2026-10-25', būsena: 'Aktyvus' },
  { id: 6, dalisId: 5, autoriusId: 4, tekstas: 'Tinkama vaizdo plokštė kainos ir kokybės santykiui.', įvertinimas: 4, paskelbimoData: '2026-07-30', būsena: 'Aktyvus' },
  { id: 7, dalisId: 7, autoriusId: 1, tekstas: 'Atmintis veikia stabiliai, suderinta su mano plokšte.', įvertinimas: 5, paskelbimoData: '2026-06-10', būsena: 'Aktyvus' },
  { id: 8, dalisId: 9, autoriusId: 7, tekstas: 'Netiko mano plokštei, bet kaltas pats, nepatikrinau suderinamumo.', įvertinimas: 2, paskelbimoData: '2026-05-29', būsena: 'Trintas vartotojo' },
  { id: 9, dalisId: 10, autoriusId: 4, tekstas: 'Geros galimybės ir patogus BIOS.', įvertinimas: 5, paskelbimoData: '2026-09-28', būsena: 'Aktyvus' },
  { id: 10, dalisId: 13, autoriusId: 1, tekstas: 'Tylus maitinimo blokas, laidai kokybiški.', įvertinimas: 5, paskelbimoData: '2026-06-02', būsena: 'Aktyvus' },
  { id: 11, dalisId: 16, autoriusId: 7, tekstas: 'Labai patogus surinkti komponentus, geras oro srautas.', įvertinimas: 5, paskelbimoData: '2026-08-19', būsena: 'Aktyvus' },
  { id: 12, dalisId: 16, autoriusId: 4, tekstas: 'Netiko dėl per mažo vidinio laisvo vietos aukšto aušintuvo.', įvertinimas: 3, paskelbimoData: '2026-10-01', būsena: 'Redaguotas' },
  { id: 13, dalisId: 19, autoriusId: 1, tekstas: 'Žemina temperatūras, bet labai didelis, netilpo mano korpuse.', įvertinimas: 3, paskelbimoData: '2026-07-11', būsena: 'Aktyvus' },
  { id: 14, dalisId: 22, autoriusId: 7, tekstas: 'Labai greitas SSD, diskas atpažintas iškart.', įvertinimas: 5, paskelbimoData: '2026-10-05', būsena: 'Aktyvus' },
  { id: 15, dalisId: 24, autoriusId: 4, tekstas: 'Netinkamas turinys, pašalintas administracijos.', įvertinimas: 1, paskelbimoData: '2026-08-02', būsena: 'Trintas administratoriaus' },
]

// Bendri laikini atsiliepimų duomenys tik sąsajos demonstracijai.
// Perkrovus naršyklės puslapį vėl naudojami pradiniai pavyzdžiai.
let prototipoAtsiliepimai = atsiliepimai.map((atsiliepimas) => ({ ...atsiliepimas }))

export function gautiPrototipoAtsiliepimus() {
  return prototipoAtsiliepimai
}

export function išsaugotiPrototipoAtsiliepimus(sąrašas) {
  prototipoAtsiliepimai = sąrašas
}

export function formatEuro(suma) {
  if (suma === null || suma === undefined) {
    return null
  }

  return `${suma.toLocaleString('lt-LT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`
}

export function gautiKainosIstoriją(dalisId) {
  return kainos
    .filter((įrašas) => įrašas.dalisId === dalisId)
    .sort((a, b) => a.nustatymoData.localeCompare(b.nustatymoData))
}

export function gautiDabartinęKainą(dalisId) {
  const istorija = gautiKainosIstoriją(dalisId)
  if (istorija.length === 0) {
    return null
  }

  return istorija[istorija.length - 1].kaina
}

export function gautiAktyviąAkciją(dalisId, data = new Date()) {
  const dabar = data.toISOString().slice(0, 10)

  return (
    akcijos.find(
      (akcija) =>
        akcija.dalysIds.includes(dalisId) &&
        akcija.pradžiosData <= dabar &&
        dabar <= akcija.pabaigosData
    ) || null
  )
}

export function gautiNuotraukas(dalisId) {
  return nuotraukos
    .filter((nuotrauka) => nuotrauka.dalisId === dalisId)
    .sort((a, b) => a.eilėsNumeris - b.eilėsNumeris)
}

export function gautiRodomusAtsiliepimus(dalisId, sąrašas = atsiliepimai) {
  return sąrašas.filter(
    (atsiliepimas) =>
      atsiliepimas.dalisId === dalisId &&
      (atsiliepimas.būsena === 'Aktyvus' || atsiliepimas.būsena === 'Redaguotas')
  )
}

export function gautiVidutinįĮvertinimą(dalisId, sąrašas = atsiliepimai) {
  const rodomi = gautiRodomusAtsiliepimus(dalisId, sąrašas)
  if (rodomi.length === 0) {
    return { vidurkis: 0, kiekis: 0 }
  }

  const suma = rodomi.reduce((acc, atsiliepimas) => acc + atsiliepimas.įvertinimas, 0)
  return { vidurkis: suma / rodomi.length, kiekis: rodomi.length }
}

export function gautiPaskyrosVardą(paskyrosId) {
  const paskyra = paskyros.find((p) => p.id === paskyrosId)
  return paskyra ? `${paskyra.vardas} ${paskyra.pavardė}` : 'Nežinomas naudotojas'
}
