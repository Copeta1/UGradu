export interface Event {
  id: string;
  title: string;
  description: string;
  city: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  date: any;
  imageUrl: string;
  category: string;
  price: string;
  createdAt: any;
  createdBy: string;
  isFeatured: boolean;
}

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  selectedCity: string;
  favorites: string[];
  pushToken?: string;
  role: "user" | "organizer";
}
