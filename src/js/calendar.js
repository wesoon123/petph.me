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
      }
    ],
    eventClick(info) {
      alert(`${info.event.title}\n${info.event.extendedProps.description}`);
    }
  });

    setTimeout(() => {
    calendar.render();
    const observer = new ResizeObserver(() => calendar.updateSize());
    observer.observe(calendarEl);
    calendar.updateSize();
  }, 3000);
}
