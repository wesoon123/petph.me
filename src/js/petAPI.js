import "regenerator-runtime/runtime";
import "core-js/stable";
import { BASE_URL } from './config.js';

// ⏱ Generic fetch with timeout helper
async function fetchWithTimeout(url, timeout = 7000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again later.");
    }
    throw error;
  }
}

// 🐾 Fetch all breeds with timeout
export async function getBreeds() {
  try {
    const data = await fetchWithTimeout(`${BASE_URL}/breeds/list/all`, 7000);
    console.log(data);
    return data.message;
  } catch (error) {
    console.error("Failed to fetch breeds:", error);
    throw error;
  }
}

// 🐕 Fetch random dog image by breed with timeout
export async function getRandomDogByBreed(breed) {
  try {
    const data = await fetchWithTimeout(`${BASE_URL}/breed/${breed}/images/random`, 7000);
    console.log(data);
    return data.message;
  } catch (error) {
    console.error(`Failed to fetch dog for ${breed}:`, error);
    throw error;
  }
}
