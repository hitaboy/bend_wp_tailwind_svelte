// scrollStore.js
import { writable } from "svelte/store";

// Create a single global writable store
export const scrollY = writable(0);

// Internal flag to ensure we only attach one listener
let initialized = false;

function setupScrollListener() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        scrollY.set(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll);
}

// Automatically initialize when first imported in browser
setupScrollListener();