import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "~/lib/firebase";
import { openDB } from "idb"; // Import idb library for IndexedDB operations
import { DataStructure } from "./dataStructure";

export type PullContentResult<T> =
  T extends "all" ? DataStructure :                               // Entire DataStructure
  T extends keyof DataStructure["pages"] ?                        // A single subset in pages
    { [K in T]: DataStructure["pages"][K] } &                     // Wrap the subset in an object
    (T extends "landing" | "about" | "tournament" ?               // Include components if field is landing, about, or tournament
      { components: DataStructure["components"] } : {}) :
  T extends "components" ? { components: DataStructure["components"] } : // Only components
  never;



export interface PageProps {
  content?: any;
}

// Helper function to initialize IndexedDB
async function getDatabase() {
  return openDB("contentCache", 1, {
    upgrade(db) {
      db.createObjectStore("pages", { keyPath: "key" });
    },
  });
}

// Function to get data from IndexedDB
async function getCachedData(field: string) {
  const db = await getDatabase();
  const entry = await db.get("pages", field);
  if (entry) {
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    if (now - entry.timestamp < oneWeek) {
      return entry.data;
    }
  }
  return null;
}

// Function to cache data in IndexedDB
async function cacheData(field: string, data: any) {
  const db = await getDatabase();
  await db.put("pages", { key: field, data, timestamp: Date.now() });
}

// Function to fetch the entire content document from Firestore (for Admin Interface)
export async function fetchFullContent() {
  try {
    const docRef = doc(db, "dhsSpeechAndDebate", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Cache the full document in IndexedDB
      await cacheData("fullContent", data);
      return data as DataStructure;
    } else {
      console.error("No such document in Firestore!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return null;
  }
}

export function pullContent<T extends keyof DataStructure["pages"] | "components" | "all">(
  field: T,
  providedContent?: PullContentResult<T>
) {
  // Set the state type based on the generic type `T`
  const [content, setContent] = useState<PullContentResult<T> | undefined>(providedContent);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function loadContent() {
      // Admin usage
      if (providedContent) {
        setContent(providedContent);
        return;
      }

      // Cached usage
      const cachedData = await getCachedData(field);
      if (cachedData) {
        setContent(cachedData as PullContentResult<T>);
      } else {
        // Pull from Firebase
        const docRef = doc(db, "dhsSpeechAndDebate", "content");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("data", data);
          if(field === "all") {
            setContent(data as PullContentResult<T>);
            return;
          }

          let result: Partial<PullContentResult<T>> = {};

          if (field in data) {
            result = { ...result, [field]: data[field] } as PullContentResult<T>;
          }

          if ((field === "landing" || field === "about" || field === "tournament") && "components" in data) {
            result = { ...result, components: data["components"] } as PullContentResult<T>;
          }

          await cacheData(field, result);
          setContent(result as PullContentResult<T>);
        } else {
          setError(true);
        }
      }
    }

    loadContent();
  }, [field, providedContent]);

  return { content, error };
}