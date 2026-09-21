import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import styles from '../styles/Notifications.module.css';

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getNotificationIcon(type) {
  const icons = {
    post_created: '📝',
    post_liked: '❤️',
    post_commented: '💬',
    post_shared: '🔄',
    listing_created: '🛒',
    listing_liked: '❤️',
    listing_inquired: '💬',
    event_created: '🎉',
    event_attending: '✅',
    news_created: '📰',
    news_liked: '❤️',
    news_commented: '💬',
    news_shared: '🔄',
    message_received: '💬',
    comment_replied: '↩️',
    comment_liked: '❤️',
    user_followed: '👤',
  };
  return icons[type] || '🔔';
}

function getNotificationColor(type) {
  if (type.includes('liked')) return '#ec4899';
  if (type.includes('commented') || type.includes('replied') || type.includes('inquired')) return '#0ea5e9';
  if (type.includes('shared')) return '#8b5cf6';
  if (type.includes('attending')) return '#16a34a';
  if (type.includes('message')) return '#f59e0b';
  if (type.includes('created')) return '#6366f1';
  return '#64748b';
}

function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all'); // all, unread

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.notifications.getAll({ limit: 50 });
      if (response.success) {
        setNotifications(response.notifications);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.notifications.getUnreadCount();
      if (response.success) {
        setUnreadCount(response.count);
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const handleMarkRead = async (notificationId) => {
    try {
      await api.notifications.markRead(notificationId);
      setNotifications(prev => prev.map(n =>
        n._id === notificationId ? { ...n, read: true, readAt: new Date().toISOString() } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.notifications.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true, readAt: new Date().toISOString() })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await api.notifications.delete(notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = new Date(notification.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let groupKey;
    if (date.toDateString() === today.toDateString()) {
      groupKey = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      groupKey = 'Yesterday';
    } else {
      groupKey = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }

    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(notification);
    return groups;
  }, {});

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user?.fullName || 'Guest'}</h3>
              <p className={styles.userHandle}>{user?.email || 'Sign in to view notifications'}</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            <a href="/" className={styles.sidebarLink}><span>🏠</span> Feed</a>
            <a href="/explore" className={styles.sidebarLink}><span>🔍</span> Explore</a>
            <a href="/news" className={styles.sidebarLink}><span>📰</span> News</a>
            <a href="/sports" className={styles.sidebarLink}><span>⚽</span> Sports</a>
            <a href="/events" className={styles.sidebarLink}><span>🎉</span> Events</a>
            <a href="/categories" className={styles.sidebarLink}><span>🛒</span> Marketplace</a>
            <a href="/messages" className={styles.sidebarLink}><span>💬</span> Messages</a>
            <a href="/notifications" className={`${styles.sidebarLink} ${styles.active}`}><span>🔔</span> Notifications {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}</a>
            <a href="/profile" className={styles.sidebarLink}><span>👤</span> Profile</a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Notifications</h1>
            <div className={styles.headerActions}>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
                <option value="all">All</option>
                <option value="unread">Unread Only</option>
              </select>
              {unreadCount > 0 && (
                <button className={styles.markAllBtn} onClick={handleMarkAllRead}>
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className={styles.notificationsList}>
            {loading ? (
              <div className={styles.loading}>Loading notifications...</div>
            ) : filteredNotifications.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>🔔</div>
                <h3 className={styles.emptyTitle}>No notifications</h3>
                <p className={styles.emptyText}>You're all caught up!</p>
              </div>
            ) : (
              Object.entries(groupedNotifications).map(([date, items]) => (
                <div key={date} className={styles.dateGroup}>
                  <div className={styles.dateHeader}>{date}</div>
                  {items.map((notification) => (
                    <div
                      key={notification._id}
                      className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                      onClick={() => !notification.read && handleMarkRead(notification._id)}
                    >
                      <div
                        className={styles.notificationIcon}
                        style={{ backgroundColor: `${getNotificationColor(notification.type)}20` }}
                      >
                        <span style={{ color: getNotificationColor(notification.type) }}>
                          {getNotificationIcon(notification.type)}
                        </span>
                      </div>
                      <div className={styles.notificationContent}>
                        <div className={styles.notificationHeader}>
                          <h4 className={styles.notificationTitle}>{notification.title}</h4>
                          <span className={styles.notificationTime}>{formatRelativeTime(notification.createdAt)}</span>
                        </div>
                        <p className={styles.notificationMessage}>{notification.message}</p>
                        {notification.actor && (
                          <div className={styles.notificationActor}>
                            <span className={styles.actorName}>
                              {notification.actor.fullName || 'Someone'}
                            </span>
                            {' '}•{' '}
                            <span className={styles.actorType}>{notification.entityType || 'Activity'}</span>
                          </div>
                        )}
                      </div>
                      {!notification.read && (
                        <div className={styles.unreadDot} />
                      )}
                      <button
                        className={styles.deleteBtn}
                        onClick={(e) => { e.stopPropagation(); handleDelete(notification._id); }}
                        aria-label="Delete notification"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;