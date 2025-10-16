export function setupAdoptModal() {
  const btnAdopt = document.querySelector(".key-link .key-links:first-child");
  const modal = document.querySelector(".form-container");
  const closeBtn = modal?.querySelector(".btn-close");
  const overlay = document.querySelector(".overlay");

  if (!btnAdopt || !modal || !closeBtn || !overlay) return;

  // Open modal
  btnAdopt.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
    overlay.classList.add("active");
    modal.style.display = "block";
    overlay.style.display = "block";
     document.body.style.overflow = "hidden"; // disable scroll
  });

  // Close modal
  function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    overlay.style.display = "none";
  }, 300);
  document.body.style.overflow = "";
}

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
