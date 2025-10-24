// vetShelter.js
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export function setupVetShelter() {
  setTimeout(() => {
    const mapContainer = document.getElementById("vet-map");
    const listContainer = document.getElementById("vet-list");

    if (!mapContainer || !listContainer) {
      console.error("Vet/Shelter section not found!");
      return;
    }

    // delete L.Icon.Default.prototype._getIconUrl;
    // L.Icon.Default.mergeOptions({
    //   iconRetinaUrl: markerIcon2x,
    //   iconUrl: markerIcon,
    //   shadowUrl: markerShadow,
    // });

    // ✅ Initialize map
    const map = L.map("vet-map").setView([10.3157, 123.8854], 12); // Cebu City default

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // ✅ Example vet/shelter data
    const places = [
      {
        name: "Happy Paws Veterinary Clinic",
        address: "Fuente Osmena, Cebu City",
        type: "Vet Clinic",
        coords: [10.3102, 123.8931],
      },
      {
        name: "Cebu Animal Care Shelter",
        address: "Talisay City, Cebu",
        type: "Shelter",
        coords: [10.3195, 123.9054],
      },
      {
        name: "FurEver Friends Vet Center",
        address: "Lahug, Cebu City",
        type: "Vet Clinic",
        coords: [10.3268, 123.9158],
      },
    ];

    // ✅ Add markers
    const markers = places.map((place) => {
      const marker = L.marker(place.coords).addTo(map);
      marker.bindPopup(`
        <strong>${place.name}</strong><br>
        📍 ${place.address}<br>
        🩺 ${place.type}<br><br>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${place.coords[0]},${place.coords[1]}"
           target="_blank"
           style="color:#0078d7;">➡️ Get Directions</a>
      `);
      return marker;
    });

    // ✅ Render list items
    listContainer.innerHTML = places
      .map(
        (place, index) => `
        <div class="vet-item" data-index="${index}">
          <h3>${place.name}</h3>
          <p>${place.address}</p>
          <span>${place.type}</span>
        </div>
      `
      )
      .join("");

    // ✅ Click to pan + highlight
    listContainer.addEventListener("click", (e) => {
      const item = e.target.closest(".vet-item");
      if (!item) return;
      const index = item.dataset.index;
      const marker = markers[index];

      map.setView(places[index].coords, 15, { animate: true });
      marker.openPopup();

      document
        .querySelectorAll(".vet-item")
        .forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
    setTimeout(() => map.invalidateSize(), 1000);
  }, 500); // delay to ensure map container is visible
}
