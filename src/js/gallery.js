import { getBreeds, getRandomDogByBreed } from './petAPI.js';

/**
 * Initializes the pet gallery inside a given container.
 * @param {HTMLElement} galleryContainer - The element where gallery items will be appended.
 * @param {HTMLElement} loaderElement - The loader text element.
 * @param {number} [limit=15] - How many breeds/images to load (default = 15).
 */
export async function setupGallery(galleryContainer, loaderElement, limit = 15) {
  if (!galleryContainer || !loaderElement) {
    console.error("Gallery or loader element not found!");
    return;
  }

  loaderElement.textContent = "Loading gallery... 🐾";

  try {
    const breeds = await getBreeds();
    loaderElement.textContent = "";

    // ✅ Limit how many breeds to display
    const breedNames = Object.keys(breeds).slice(0, limit);

    for (const breed of breedNames) {
      try {
        const dogUrl = await getRandomDogByBreed(breed);
        const item = createGalleryItem(breed, dogUrl);
        galleryContainer.appendChild(item);
      } catch (err) {
        console.error(`Failed to load image for ${breed}`, err);
      }
    }
  } catch (error) {
    loaderElement.textContent = error.message || "Failed to load gallery.";
  }
}

/* 🐕 Create gallery card element */
function createGalleryItem(breed, imageUrl) {
  const item = document.createElement("div");
  item.classList.add("gallery-item");

  item.innerHTML = `
    <img src="${imageUrl}" alt="${breed}">
    <div class="info">
      <h3>${breed}</h3>
      <p>Dog Breed</p>
    </div>
  `;

  return item;
}
