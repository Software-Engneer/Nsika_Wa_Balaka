import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../styles/Events.module.css';

const categoryConfig = {
  Community: { icon: '🤝', color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.1)' },
  Entertainment: { icon: '🎉', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
  Business: { icon: '💼', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  Sports: { icon: '⚽', color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)' },
  Education: { icon: '📚', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
};

const initialEvents = [
  {
    id: 1, title: 'Balaka Community Cleanup Day', description: 'Join us for a community cleanup event around Balaka town. Gloves and bags will be provided.',
    date: '2026-09-01', time: '08:00', venue: 'Balaka Town Hall', organizer: 'Balaka Youth Group', category: 'Community',
    attendees: 24, isAttending: false, saved: false,
    image: 'https://images.unsplash.com/photo-1559027615-c462-8c81-4a599f1e1c48?w=600&h=300&fit=crop',
  },
  {
    id: 2, title: 'Local Music Festival', description: 'A day of live music, food, and fun. Featuring local artists from Balaka and surrounding areas.',
    date: '2026-09-10', time: '14:00', venue: 'Balaka Stadium Grounds', organizer: 'Kwathu Events', category: 'Entertainment',
    attendees: 156, isAttending: true, saved: false,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292f2f3?w=600&h=300&fit=crop',
  },
  {
    id: 3, title: 'Small Business Workshop', description: 'Learn how to start and grow your small business in Balaka. Free training and mentorship.',
    date: '2026-09-15', time: '10:00', venue: 'Community Center', organizer: 'Malawi Enterprise', category: 'Business',
    attendees: 45, isAttending: false, saved: false,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
  },
  {
    id: 4, title: 'Football Tournament Finals', description: 'Watch the finals of the Balaka District Football Tournament. Cheer for your favorite team!',
    date: '2026-09-20', time: '15:00', venue: 'Balaka Stadium', organizer: 'Balaka Sports Council', category: 'Sports',
    attendees: 320, isAttending: false, saved: false,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=300&fit=crop',
  },
  {
    id: 5, title: 'Youth Career Expo', description: 'Explore career opportunities, meet employers, and get professional development tips.',
    date: '2026-09-25', time: '09:00', venue: 'Balaka Technical College', organizer: 'Youth Council', category: 'Education',
    attendees: 120, isAttending: false, saved: false,
    image: 'https://images.unsplash.com/photo-1540575467068-54d120a3df99?w=600&h=300&fit=crop',
  },
  {
    id: 6, title: 'Farmers Market Day', description: 'Fresh produce, local crafts, and family fun at the weekly Balaka farmers market.',
    date: '2026-09-06', time: '07:00', venue: 'Balaka Market Square', organizer: 'District Council', category: 'Community',
    attendees: 85, isAttending: false, saved: false,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=300&fit=crop',
  },
];

function getRelativeTime(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diff = Math.floor((date - now) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff > 1 && diff <= 7) return `In ${diff} days`;
  if (diff < 0 && diff >= -1) return 'Yesterday';
  if (diff < -1 && diff >= -7) return `${Math.abs(diff)} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('kwathu_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [saved, setSaved] = useState(() => {
    const s = localStorage.getItem('kwathu_events_saved');
    return s ? JSON.parse(s) : [];
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '', description: '', date: '', time: '', venue: '', organizer: '', category: 'Community',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('kwathu_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('kwathu_events_saved', JSON.stringify(saved));
  }, [saved]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAttend = (id) => {
    if (!user) {
      showToast('Sign in to RSVP to events', 'info');
      return;
    }
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? { ...event, isAttending: !event.isAttending, attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1 }
          : event
      )
    );
  };

  const handleToggleSave = (id, e) => {
    if (e) e.stopPropagation();
    if (!user) {
      showToast('Sign in to save events', 'info');
      return;
    }
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Sign in to create events', 'info');
      return;
    }
    const event = {
      id: Date.now(),
      ...newEvent,
      attendees: 1,
      isAttending: true,
      saved: false,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a2c?w=600&h=300&fit=crop',
    };
    setEvents([event, ...events]);
    setNewEvent({ title: '', description: '', date: '', time: '', venue: '', organizer: '', category: 'Community' });
    setShowCreateForm(false);
    showToast('Event created successfully');
  };

  const handleShare = (event, e) => {
    if (e) e.stopPropagation();
    const text = `Join "${event.title}" on ${event.date} at ${event.venue}. ${event.description.slice(0, 100)}...`;
    if (navigator.share) {
      navigator.share({ title: event.title, text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Event details copied to clipboard');
    }
  };

  const categories = Object.keys(categoryConfig);
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = events.filter((e) => e.category === cat).length;
    return acc;
  }, {});

  let filteredEvents = events;
  if (activeCategory !== 'all') {
    filteredEvents = filteredEvents.filter((e) => e.category === activeCategory);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredEvents = filteredEvents.filter(
      (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.organizer.toLowerCase().includes(q)
    );
  }

  if (sortBy === 'date') {
    filteredEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === 'popular') {
    filteredEvents = [...filteredEvents].sort((a, b) => b.attendees - a.attendees);
  } else if (sortBy === 'saved') {
    filteredEvents = [...filteredEvents].sort((a, b) => (saved.includes(b.id) ? 1 : 0) - (saved.includes(a.id) ? 1 : 0));
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user ? user.fullName : 'Guest'}</h3>
              <p className={styles.userHandle}>{user ? user.email : 'Sign in to RSVP'}</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            <a href="/" className={styles.sidebarLink}><span>🏠</span> Feed</a>
            <a href="/explore" className={styles.sidebarLink}><span>🔍</span> Explore</a>
            <a href="/news" className={styles.sidebarLink}><span>📰</span> News</a>
            <a href="/sports" className={styles.sidebarLink}><span>⚽</span> Sports</a>
            <a href="/events" className={`${styles.sidebarLink} ${styles.active}`}><span>🎉</span> Events</a>
            <a href="/categories" className={styles.sidebarLink}><span>🛒</span> Marketplace</a>
            <a href="/messages" className={styles.sidebarLink}><span>💬</span> Messages</a>
            <a href="/notifications" className={styles.sidebarLink}><span>🔔</span> Notifications</a>
            <a href="/profile" className={styles.sidebarLink}><span>👤</span> Profile</a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Events - Balaka</h1>
              <p className={styles.subtitle}>Discover and join local events — {events.length} upcoming</p>
            </div>
            <button className={styles.createButton} onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? '✕ Cancel' : '+ Create Event'}
            </button>
          </div>

          {showCreateForm && (
            <form className={styles.createForm} onSubmit={handleCreateEvent}>
              <h2 className={styles.formTitle}>Create New Event</h2>
              <div className={styles.formGrid}>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label className={styles.label}>Event Title</label>
                  <input type="text" required value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className={styles.input} placeholder="What's happening?" />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label className={styles.label}>Description</label>
                  <textarea required value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className={styles.textarea} rows="3" placeholder="Tell people what to expect..." />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Category</label>
                  <select value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} className={styles.select}>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Organizer</label>
                  <input type="text" required value={newEvent.organizer} onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })} className={styles.input} placeholder="Your name or org" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Date</label>
                  <input type="date" required value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Time</label>
                  <input type="time" required value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Venue</label>
                  <input type="text" required value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} className={styles.input} placeholder="Where?" />
                </div>
              </div>
              <button type="submit" className={styles.submitButton}>Create Event</button>
            </form>
          )}

          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search events by name, venue, or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>✕</button>}
          </div>

          <div className={styles.filtersRow}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Category</label>
              <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className={styles.filterSelect}>
                <option value="all">All Categories ({events.length})</option>
                {categories.map((c) => <option key={c} value={c}>{c} ({categoryCounts[c] || 0})</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.filterSelect}>
                <option value="date">Date</option>
                <option value="popular">Most Popular</option>
                <option value="saved">Saved First</option>
              </select>
            </div>
          </div>

          <div className={styles.categoryTabs}>
            <button className={`${styles.categoryTab} ${activeCategory === 'all' ? styles.categoryTabActive : ''}`} onClick={() => setActiveCategory('all')}>
              All
            </button>
            {categories.map((cat) => {
              const config = categoryConfig[cat];
              return (
                <button
                  key={cat}
                  className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryTabActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  style={activeCategory === cat ? { background: config.bg, color: config.color, borderColor: config.color } : {}}
                >
                  <span>{config.icon}</span> {cat}
                  <span className={styles.categoryCount}>{categoryCounts[cat] || 0}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.tabContent}>
            {filteredEvents.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📅</div>
                <h3 className={styles.emptyTitle}>No events found</h3>
                <p className={styles.emptyText}>Try adjusting your search or create a new event.</p>
              </div>
            ) : (
              <div className={styles.eventsList}>
                {filteredEvents.map((event) => {
                  const catConfig = categoryConfig[event.category] || categoryConfig.Community;
                  return (
                    <div key={event.id} className={styles.eventCard} onClick={() => setSelectedEvent(event)}>
                      <div className={styles.eventImage}>
                        <img src={event.image} alt={event.title} loading="lazy" />
                        <span className={styles.eventCategoryBadge} style={{ background: catConfig.bg, color: catConfig.color }}>
                          {catConfig.icon} {event.category}
                        </span>
                        <button
                          className={`${styles.saveButton} ${saved.includes(event.id) ? styles.saved : ''}`}
                          onClick={(e) => handleToggleSave(event.id, e)}
                          aria-label="Save event"
                        >
                          {saved.includes(event.id) ? '🔖' : '📑'}
                        </button>
                      </div>
                      <div className={styles.eventBody}>
                        <div className={styles.eventMetaRow}>
                          <span className={styles.eventRelativeDate}>{getRelativeTime(event.date)}</span>
                          <span className={styles.eventTime}>🕐 {event.time}</span>
                        </div>
                        <h3 className={styles.eventTitle}>{event.title}</h3>
                        <p className={styles.eventDescription}>{event.description}</p>
                        <div className={styles.eventDetails}>
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
                          <div className={styles.attendeesRow}>
                            <div className={styles.avatarStack}>
                              {[1, 2, 3].map((i) => (
                                <div key={i} className={styles.avatarMini} style={{ background: ['#0ea5e9', '#16a34a', '#f59e0b'][i - 1] }}>
                                  {String.fromCharCode(64 + i)}
                                </div>
                              ))}
                            </div>
                            <span className={styles.attendees}>{event.attendees} going</span>
                          </div>
                          <div className={styles.eventActions}>
                            <button
                              className={`${styles.attendButton} ${event.isAttending ? styles.attending : ''}`}
                              onClick={(e) => { e.stopPropagation(); handleAttend(event.id); }}
                            >
                              {event.isAttending ? '✓ Going' : 'RSVP'}
                            </button>
                            <button className={styles.shareButton} onClick={(e) => handleShare(event, e)}>
                              ↗
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={() => setSelectedEvent(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedEvent(null)}>✕</button>
            <div className={styles.modalImage}>
              <img src={selectedEvent.image} alt={selectedEvent.title} />
              <span className={styles.modalCategoryBadge} style={{ background: categoryConfig[selectedEvent.category]?.bg, color: categoryConfig[selectedEvent.category]?.color }}>
                {categoryConfig[selectedEvent.category]?.icon} {selectedEvent.category}
              </span>
            </div>
            <div className={styles.modalBody}>
              <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
              <div className={styles.modalMeta}>
                <span className={styles.modalMetaItem}>📅 {selectedEvent.date}</span>
                <span className={styles.modalMetaItem}>🕐 {selectedEvent.time}</span>
              </div>
              <p className={styles.modalDescription}>{selectedEvent.description}</p>
              <div className={styles.modalDetails}>
                <div className={styles.modalDetailRow}>
                  <span className={styles.modalDetailLabel}>📍 Venue</span>
                  <span className={styles.modalDetailValue}>{selectedEvent.venue}</span>
                </div>
                <div className={styles.modalDetailRow}>
                  <span className={styles.modalDetailLabel}>👤 Organizer</span>
                  <span className={styles.modalDetailValue}>{selectedEvent.organizer}</span>
                </div>
                <div className={styles.modalDetailRow}>
                  <span className={styles.modalDetailLabel}>👥 Attendees</span>
                  <span className={styles.modalDetailValue}>{selectedEvent.attendees}</span>
                </div>
              </div>
              <div className={styles.modalActions}>
                <button
                  className={`${styles.modalAttendButton} ${selectedEvent.isAttending ? styles.attending : ''}`}
                  onClick={() => { handleAttend(selectedEvent.id); }}
                >
                  {selectedEvent.isAttending ? '✓ Cancel RSVP' : 'RSVP Now'}
                </button>
                <button
                  className={`${styles.modalSaveButton} ${saved.includes(selectedEvent.id) ? styles.saved : ''}`}
                  onClick={() => handleToggleSave(selectedEvent.id)}
                >
                  {saved.includes(selectedEvent.id) ? '🔖 Saved' : '📑 Save'}
                </button>
                <button className={styles.modalShareButton} onClick={() => handleShare(selectedEvent)}>
                  ↗ Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`${styles.toast} ${styles[`toast${toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}`]}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Events;
