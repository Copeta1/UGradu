import { db } from "@/services/firebase";
import { Event } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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
        const now = new Date();

        const validEvents: Event[] = [];

        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();
          const eventDate = new Date(data.date.seconds * 1000);
          const hoursSinceEvent =
            (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60);

          if (hoursSinceEvent > 24) {
            // Briši event iz Firestorea
            await deleteDoc(doc(db, "events", docSnap.id));
          } else {
            validEvents.push({ id: docSnap.id, ...data } as Event);
          }
        }

        setEvents(validEvents);
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
