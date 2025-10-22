export function setupAdoptModal() {
  // 🟢 Buttons
const [btnAdopt, btnVolunteer, btnDonate] = document.querySelectorAll(".key-link .key-links"); 
const btnBreeds = document.querySelector(".breeds-btn"); 
const btnBlog = document.querySelector(".modal-blog");


  // 🟣 Modals
  const [adoptModal, volunteerModal, donateModal] = document.querySelectorAll(
    ".form-container, .volunteer-form, .donate-form"
  );
  const breedsModal = document.querySelector(".breeds-modal");
  const blogModal = document.querySelector(".pet-blog");


  // 🔴 Close buttons
  const closeAdopt = adoptModal?.querySelector(".btn-close");
  const closeVolunteer = volunteerModal?.querySelector(".btn-close");
  const closeDonate = donateModal?.querySelector(".btn-close");
  const closeBreeds = breedsModal?.querySelector(".btn-close");
  const closeBlog = blogModal?.querySelector(".btn-close");

  const overlay = document.querySelector(".overlay");

  // 🧩 Put all modals together for easy iteration
  const modals = [adoptModal, volunteerModal, donateModal, breedsModal , blogModal];

  if (!overlay) return;

  // 🐾 OPEN handlers
  btnAdopt?.addEventListener("click", (e) => openHandler(e, adoptModal));
  btnVolunteer?.addEventListener("click", (e) => openHandler(e, volunteerModal));
  btnDonate?.addEventListener("click", (e) => openHandler(e, donateModal));
  btnBreeds?.addEventListener("click", (e) => openHandler(e, breedsModal));
  btnBlog?.addEventListener("click", (e) => openHandler(e, blogModal));

  // ❌ CLOSE handlers
  [closeAdopt, closeVolunteer, closeDonate, closeBreeds, closeBlog].forEach((btn, i) => {
    btn?.addEventListener("click", () => closeModal(modals[i]));
  });

  // 🕳️ Overlay click closes all modals
  overlay.addEventListener("click", () => modals.forEach(closeModal));

  // ⌨️ ESC key closes all modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modals.forEach(closeModal);
  });

  // 🔹 Helper functions
  function openHandler(e, modal) {
    e.preventDefault();
    openModal(modal);
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("active");
    overlay.classList.add("active");
    modal.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden"; // disable page scroll
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
      overlay.style.display = "none";
    }, 100);
    document.body.style.overflow = ""; // re-enable scroll
  }
}
