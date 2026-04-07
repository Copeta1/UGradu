const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const events = [
  {
    title: "Hladno pivo — Live",
    description:
      "Legendarni zagrebački punk rock bend dolazi s novim materijalom. Nezaboravna večer uz najveće hitove i dobru atmosferu.",
    city: "Zagreb",
    location: { lat: 45.815, lng: 15.982, address: "Šubićeva ulica 2, Zagreb" },
    category: "koncerti",
    price: "15 €",
    date: Timestamp.fromDate(new Date("2026-04-15T20:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: true,
  },
  {
    title: "Vanna — Akustični koncert",
    description:
      "Jedna od najvažnijih glasova hrvatske glazbene scene. Akustični format koji će te ostaviti bez daha.",
    city: "Split",
    location: { lat: 43.508, lng: 16.44, address: "Trg Gaje Bulata 1, Split" },
    category: "koncerti",
    price: "20 €",
    date: Timestamp.fromDate(new Date("2026-04-16T20:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Đavoli — Tour 2026",
    description:
      "Popularni hrvatski bend na turneji po Hrvatskoj. Energičan nastup koji ne smiješ propustiti.",
    city: "Zagreb",
    location: {
      lat: 45.803,
      lng: 15.978,
      address: "Trnjanski nasip 1, Zagreb",
    },
    category: "koncerti",
    price: "12 €",
    date: Timestamp.fromDate(new Date("2026-04-17T21:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Techno Night — Shelter",
    description:
      "Internacionalni DJ lineup i vrhunski sound sistem. Jedna od najboljih techno noći u Zagrebu.",
    city: "Zagreb",
    location: {
      lat: 45.814,
      lng: 16.001,
      address: "Brnčićeva ulica 3, Zagreb",
    },
    category: "klubovi",
    price: "10 €",
    date: Timestamp.fromDate(new Date("2026-04-18T23:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "House Vibes — Boogaloo",
    description:
      "Tjedna house žurka s domaćim i stranim DJ-evima. Dobar provod zagarantiran do ranih jutarnjih sati.",
    city: "Zagreb",
    location: { lat: 45.816, lng: 15.991, address: "Vlaška ulica 68, Zagreb" },
    category: "klubovi",
    price: "8 €",
    date: Timestamp.fromDate(new Date("2026-04-19T23:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Saturday Night — Vanilla",
    description:
      "Najveći splitski klub otvara vrata za nezaboravnu subotnju noć. Komercijalni hitovi i dobra atmosfera.",
    city: "Split",
    location: { lat: 43.505, lng: 16.43, address: "Uvala Baluni bb, Split" },
    category: "klubovi",
    price: "10 €",
    date: Timestamp.fromDate(new Date("2026-04-19T23:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Tjedni pub kviz — The Pub",
    description:
      "Svaki četvrtak od 20:00. Dođi s ekipom, pokaži znanje i osvoji vrijedne nagrade. Prijave na ulazu.",
    city: "Zagreb",
    location: { lat: 45.813, lng: 15.977, address: "Teslina ulica 7, Zagreb" },
    category: "pub-kvizovi",
    price: "Besplatno",
    date: Timestamp.fromDate(new Date("2026-04-17T20:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Quiz Night — Bulldog Pub",
    description:
      "Tjedni pub kviz s pitanjima iz sporta, kulture i zabave. Ekipe do 6 članova, nagrade za pobjednike.",
    city: "Split",
    location: { lat: 43.507, lng: 16.438, address: "Kraj Sv. Marije 3, Split" },
    category: "pub-kvizovi",
    price: "Besplatno",
    date: Timestamp.fromDate(new Date("2026-04-17T20:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Hamlet",
    description:
      "Shakespeareov besmrtni klasik u režiji nagrađivanog redatelja. Produkcija koja će te ostaviti bez daha.",
    city: "Zagreb",
    location: {
      lat: 45.813,
      lng: 15.974,
      address: "Trg maršala Tita 15, Zagreb",
    },
    category: "predstave",
    price: "25 €",
    date: Timestamp.fromDate(new Date("2026-04-20T19:30:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Mamma Mia",
    description:
      "Popularni mjuzikl s hitovima grupe ABBA. Spektakl koji donosi osmijeh na lice i dobru zabavu za cijelu obitelj.",
    city: "Split",
    location: { lat: 43.508, lng: 16.44, address: "Trg Gaje Bulata 1, Split" },
    category: "predstave",
    price: "30 €",
    date: Timestamp.fromDate(new Date("2026-04-20T19:30:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Street Food Festival",
    description:
      "Više od 30 štandova s jelima iz cijelog svijeta. Uživaj u najboljoj uličnoj hrani uz glazbu i dobru atmosferu.",
    city: "Zagreb",
    location: { lat: 45.812, lng: 15.977, address: "Zrinjevac, Zagreb" },
    category: "festivali",
    price: "Besplatno",
    date: Timestamp.fromDate(new Date("2026-04-21T12:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
  {
    title: "Rijeka Food & Music Fest",
    description:
      "Dvodnevni festival hrane i glazbe u srcu Rijeke. Lokalni restorani, craft pivo i live glazba svaki dan.",
    city: "Rijeka",
    location: { lat: 45.327, lng: 14.442, address: "Korzo 1, Rijeka" },
    category: "festivali",
    price: "Besplatno",
    date: Timestamp.fromDate(new Date("2026-04-22T12:00:00")),
    imageUrl: "",
    createdBy: "admin",
    createdAt: Timestamp.now(),
    isFeatured: false,
  },
];

async function seedEvents() {
  for (const event of events) {
    await addDoc(collection(db, "events"), event);
    console.log(`✅ Kreiran: ${event.title}`);
  }
  console.log("🎉 Svi eventi su uneseni!");
  process.exit(0);
}

seedEvents();
