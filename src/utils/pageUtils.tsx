import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "~/lib/firebase";
import { openDB } from "idb"; // Import idb library for IndexedDB operations
import type { DataStructure, fullContentStructure } from "./dataStructure";

// This file is the most heavily modified file in the entire project. Be careful with this one

// Change this to page names
export type PullContentResult<T> =
  T extends "all" ? DataStructure :                               // Entire DataStructure
  T extends keyof DataStructure["pages"] ?                        // A single subset in pages
    { [K in T]: DataStructure["pages"][K] } &                     // Wrap the subset in an object
    (T extends "landing" | "about" | "tournament" ?               // Include components if field is landing, about, or tournament
      { components: DataStructure["components"] } : {components: undefined}) :
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

function hasCircularReference(obj: any, seen = new Set()) {
  if (obj && typeof obj === "object") {
    if (seen.has(obj)) return true;
    seen.add(obj);
    for (const key in obj) {
      if (hasCircularReference(obj[key], seen)) return true;
    }
    seen.delete(obj);
  }
  return false;
}


// Function to fetch the entire content document from Firestore (for Admin Interface)
export async function fetchFullContent() {
  try {
    const docRef = doc(db, "dhsSpeechAndDebate", "content"); // Change this to page names
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Cache the full document in IndexedDB
      await cacheData("fullContent", data);
      return data as fullContentStructure;
    } else {
      console.error("No such document in Firestore!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return null;
  }
}

export function usePullContent<T extends keyof DataStructure["pages"] | "components" | "all">( // Change this to page names
  field: T,
  providedContent?: PullContentResult<T>
) {
  const [content, setContent] = useState<PullContentResult<T> | undefined>(providedContent);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function loadContent() {
      if (providedContent) {
        setContent(providedContent);
        return;
      }

      const cachedData = await getCachedData(field);
      if (cachedData) {
        // Check for circular reference in cached data
        if (hasCircularReference(cachedData)) {
          console.error("Circular reference detected in cached data:", cachedData);
          setError(true);
          return;
        }
        setContent(cachedData as PullContentResult<T>);
      } else {
        const docRef = doc(db, "dhsSpeechAndDebate", "content");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (field === "all") {
            setContent(data as PullContentResult<T>);
            return;
          }

          let result: Partial<PullContentResult<T>> = {};
          if (field in data) {
            result = { ...result, [field]: data[field] } as PullContentResult<T>;
          }
          if ((field === "landing" || field === "about" || field === "tournament") && "components" in data) {
            result = { ...result, components: data.components } as PullContentResult<T>;
          }

          // Check for circular reference in result before caching
          if (hasCircularReference(result)) {
            console.error("Circular reference detected in result before caching:", result);
            setError(true);
            return;
          }

          // Cache a deep-cloned result to avoid circular references
          await cacheData(field, JSON.parse(JSON.stringify(result)));
          setContent(result as PullContentResult<T>);
        } else {
          setError(true);
        }
      }
    }
    
    void loadContent();
  }, [field, providedContent]);

  return { content, error };
}
