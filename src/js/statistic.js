import { COUNTER_DURATION } from './config.js';

// Function to animate numbers when they come into view
export function setupStatsCounter() {
  const counters = document.querySelectorAll('.stat-data');
  let started = false; // To prevent re-triggering when scrolled again

  // Intersection Observer to trigger counting when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;

        counters.forEach((counter) => {
          let startValue = 0;
          const endValue = parseInt(counter.getAttribute('data-val'));
          const increment = Math.ceil(endValue / (COUNTER_DURATION / 50)); // dynamic increment// adjust increment based on duration

          function updateCount() {
            startValue += increment;
            counter.textContent = startValue;

            if (startValue < endValue) {
              setTimeout(updateCount, 50);
            } else {
              counter.textContent = endValue; // ensure exact value at the end
            }
          }

          updateCount();
        });

        observer.disconnect(); // stop observing after animation starts
      }
    });
  }, { threshold: 0.4 }); // Trigger when 40% visible

  const section = document.querySelector('.stats');
  if (section) observer.observe(section);
}
