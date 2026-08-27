import React, { useState } from 'react';
import styles from '../styles/Events.module.css';

const initialEvents = [
  {
    id: 1,
    title: 'Balaka Community Cleanup Day',
    description: 'Join us for a community cleanup event around Balaka town. Gloves and bags will be provided.',
    date: '2026-09-01',
    time: '08:00',
    venue: 'Balaka Town Hall',
    organizer: 'Balaka Youth Group',
    category: 'Community',
    attendees: 24,
    isAttending: false,
    image: 'https://images.unsplash.com/photo-1559027615-c462-8c81-4a599f1e1c48?w=600&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Local Music Festival',
    description: 'A day of live music, food, and fun. Featuring local artists from Balaka and surrounding areas.',
    date: '2026-09-10',
    time: '14:00',
    venue: 'Balaka Stadium Grounds',
    organizer: 'Kwathu Events',
    category: 'Entertainment',
    attendees: 156,
    isAttending: true,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292f2f3?w=600&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Small Business Workshop',
    description: 'Learn how to start and grow your small business in Balaka. Free training and mentorship.',
    date: '2026-09-15',
    time: '10:00',
    venue: 'Community Center',
    organizer: 'Malawi Enterprise',
    category: 'Business',
    attendees: 45,
    isAttending: false,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Football Tournament Finals',
    description: 'Watch the finals of the Balaka District Football Tournament. Cheer for your favorite team!',
    date: '2026-09-20',
    time: '15:00',
    venue: 'Balaka Stadium',
    organizer: 'Balaka Sports Council',
    category: 'Sports',
    attendees: 320,
    isAttending: false,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=300&fit=crop',
  },
];

function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    organizer: '',
    category: 'Community',
  });

  const handleAttend = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              isAttending: !event.isAttending,
              attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1,
            }
          : event
      )
    );
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const event = {
      id: Date.now(),
      ...newEvent,
      attendees: 1,
      isAttending: true,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a2c?w=600&h=300&fit=crop',
    };
    setEvents((prev) => [event, ...prev]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      organizer: '',
      category: 'Community',
    });
    setShowCreateForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>Your Name</h3>
              <p className={styles.userHandle}>@username</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            <a href="/" className={`${styles.sidebarLink} ${styles.active}`}>
              <span>🏠</span> Feed
            </a>
            <a href="/explore" className={styles.sidebarLink}>
              <span>🔍</span> Explore
            </a>
            <a href="/news" className={styles.sidebarLink}>
              <span>📰</span> News
            </a>
            <a href="/sports" className={styles.sidebarLink}>
              <span>⚽</span> Sports
            </a>
            <a href="/events" className={`${styles.sidebarLink} ${styles.active}`}>
              <span>🎉</span> Events
            </a>
            <a href="/categories" className={styles.sidebarLink}>
              <span>🛒</span> Marketplace
            </a>
            <a href="/messages" className={styles.sidebarLink}>
              <span>💬</span> Messages
            </a>
            <a href="/notifications" className={styles.sidebarLink}>
              <span>🔔</span> Notifications
            </a>
            <a href="/profile" className={styles.sidebarLink}>
              <span>👤</span> Profile
            </a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Events - Balaka</h1>
            <p className={styles.subtitle}>Discover and join local events happening around Balaka</p>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.createButton}
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? 'Cancel' : '+ Create Event'}
            </button>
          </div>

          {showCreateForm && (
            <form className={styles.createForm} onSubmit={handleCreateEvent}>
              <h2 className={styles.formTitle}>Create New Event</h2>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter event title"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Category</label>
                  <select
                    name="category"
                    value={newEvent.category}
                    onChange={handleChange}
                    className={styles.input}
                  >
                    <option value="Community">Community</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Business">Business</option>
                    <option value="Sports">Sports</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={newEvent.venue}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Event venue"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Organizer</label>
                  <input
                    type="text"
                    name="organizer"
                    value={newEvent.organizer}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Your name or organization"
                    required
                  />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label className={styles.label}>Description</label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Describe your event..."
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <button type="submit" className={styles.submitButton}>
                Create Event
              </button>
            </form>
          )}

          <div className={styles.eventsList}>
            {events.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventImage}>
                  <img src={event.image} alt={event.title} />
                  <span className={styles.eventCategory}>{event.category}</span>
                </div>
                <div className={styles.eventBody}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDescription}>{event.description}</p>
                  <div className={styles.eventDetails}>
                    <div className={styles.eventDetail}>
                      <span className={styles.detailIcon}>📅</span>
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className={styles.eventDetail}>
                      <span className={styles.detailIcon}>📍</span>
                      <span>{event.venue}</span>
                    </div>
                    <div className={styles.eventDetail}>
                      <span className={styles.detailIcon}>👤</span>
                      <span>{event.organizer}</span>
                    </div>
                  </div>
                  <div className={styles.eventFooter}>
                    <span className={styles.attendees}>
                      👥 {event.attendees} attending
                    </span>
                    <button
                      className={`${styles.attendButton} ${event.isAttending ? styles.attending : ''}`}
                      onClick={() => handleAttend(event.id)}
                    >
                      {event.isAttending ? '✓ Going' : 'Join'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
