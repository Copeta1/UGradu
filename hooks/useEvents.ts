import { db } from "@/services/firebase";
import { Event } from "@/types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useEvents(city: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "events"),
          where("city", "==", city),
          orderBy("date", "asc"),
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        setEvents(data);
      } catch (error) {
        console.error("Greška pri dohvaćanju evenata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [city]);

  return { events, loading };
}
