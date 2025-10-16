export function setupAdoptModal() {
  const btnAdopt = document.querySelector(".key-link .key-links:first-child");
  const btnVolunteer = document.querySelector(".key-link .key-links:nth-child(2)");
  const btnDonate = document.querySelector(".key-link .key-links:nth-child(3)"); // 🆕 donate button

  const adoptModal = document.querySelector(".form-container");
  const volunteerModal = document.querySelector(".volunteer-form");
  const donateModal = document.querySelector(".donate-form"); // 🆕 donate modal (QR code modal)

  const closeAdopt = adoptModal?.querySelector(".btn-close");
  const closeVolunteer = volunteerModal?.querySelector(".btn-close");
  const closeDonate = donateModal?.querySelector(".btn-close"); // 🆕 donate close button

  const overlay = document.querySelector(".overlay");

  if (!overlay) return;

  // 🐶 OPEN Adopt Modal
  btnAdopt?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(adoptModal);
  });

  // ✋ OPEN Volunteer Modal
  btnVolunteer?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(volunteerModal);
  });

  // 💸 OPEN Donate Modal (QR)
  btnDonate?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(donateModal);
  });

  // ❌ CLOSE buttons
  closeAdopt?.addEventListener("click", () => closeModal(adoptModal));
  closeVolunteer?.addEventListener("click", () => closeModal(volunteerModal));
  closeDonate?.addEventListener("click", () => closeModal(donateModal));

  // 🕳️ Click outside overlay closes all
  overlay.addEventListener("click", () => {
    closeModal(adoptModal);
    closeModal(volunteerModal);
    closeModal(donateModal);
  });

  // ⌨️ ESC key closes all
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(adoptModal);
      closeModal(volunteerModal);
      closeModal(donateModal);
    }
  });

  // 🔹 Helper functions
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
