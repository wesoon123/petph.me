import { setupAdoptModal } from "./modal.js";
import { getBreeds, getRandomDogByBreed } from './petAPI.js';
import { setupStatsCounter } from './statistic.js';
import { setupGallery } from './gallery.js';
import { setupCalendar } from './calendar.js';
import { setupVetShelter } from './vetShelter.js';




const select = document.getElementById('breed-select');
const img = document.getElementById('dog-img');
const name = document.getElementById('dog-name');
const loader = document.getElementById('loader');


async function loadBreeds() {
  loader.textContent = "Loading breeds... 🐾";
 

  try {
    const breeds = await getBreeds();
    loader.textContent = "";
    for (const breed in breeds) {
      if (breeds[breed].length) {
        breeds[breed].forEach(sub => {
          const option = document.createElement('option');
          option.value = `${breed}/${sub}`;
          option.textContent = `${breed} (${sub})`;
          select.appendChild(option);
        });
      } else {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        select.appendChild(option);
      }
    }
  } catch (error) {
    loader.textContent = error.message || "Failed to load breeds.";
  }
}

async function showDog() {
  const breed = select.value;

  if (!breed) {
    img.style.display = "none";
    name.textContent = "";
    loader.textContent = "Select a breed to see a dog 🐾";
    return;
  }

  loader.textContent = "Loading dog... 🐕‍🦺";
  img.style.display = "none";
  name.textContent = "";

  try {
    const dogUrl = await getRandomDogByBreed(breed);
    img.src = dogUrl;
    img.style.display = "block";
    name.textContent = breed.replace('/', ' ');
    loader.textContent = "";
  } catch (error) {
    loader.textContent = error.message || "Failed to load dog image.";
  }
}



document.addEventListener("DOMContentLoaded", () => {
  setupAdoptModal();
  setupStatsCounter();
  loadBreeds();
  setupGallery(document.getElementById('gallery'), document.getElementById('loader'), 15);
  select.addEventListener("change", showDog);
  setupCalendar();
  setupVetShelter();
  AOS.init();
});

