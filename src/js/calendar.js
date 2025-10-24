import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export async function setupCalendar() {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    events: [
      {
        title: '🐾 Pet Adoption Day',
        start: '2025-10-28',
        description: '📍 SM Seaside, Cebu',
        backgroundColor: '#4CAF50'
      },
      {
        title: '💉 Free Vaccination Drive',
        start: '2025-11-05',
        description: '📍 Ayala Center Cebu',
        backgroundColor: '#FF9800'
      },
      {
        title: '🐶 Pet Care Workshop',
        start: '2025-11-15',
        description: '📍 IT Park, Cebu City',
        backgroundColor: '#2196F3'
      }
    ],
    eventClick(info) {
      // Get modal elements
      const modal = document.getElementById('event-modal');
      const modalTitle = modal.querySelector('.modal-title');
      const modalBody = modal.querySelector('.modal-body');
      const closeBtn = modal.querySelector('.close-btn');

      // Fill content dynamically
      modalTitle.textContent = info.event.title;
      modalBody.innerHTML = `
        <p>${info.event.extendedProps.description || "No description available."}</p>
        <p><strong>Start:</strong> ${info.event.start.toLocaleString()}</p>
        ${info.event.end ? `<p><strong>End:</strong> ${info.event.end.toLocaleString()}</p>` : ""}
      `;

      // ✅ Show modal
      modal.classList.add('show');

      // ✅ Close when clicking the close button
      closeBtn.onclick = () => modal.classList.remove('show');

      // ✅ Close when clicking outside the modal content
      window.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
        }
      };

      // ✅ Close on "Escape" key
      document.onkeydown = (e) => {
        if (e.key === 'Escape') {
          modal.classList.remove('show');
        }
      };
    }
  });

    setTimeout(() => {
    calendar.render();
    const observer = new ResizeObserver(() => calendar.updateSize());
    observer.observe(calendarEl);
    calendar.updateSize();
  }, 3000);
}
