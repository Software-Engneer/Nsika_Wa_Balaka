import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import styles from '../styles/Messages.module.css';

function Messages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const response = await api.messages.getConversations();
      if (response.success) {
        setConversations(response.conversations);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.messages.getUnreadCount();
      if (response.success) {
        setUnreadCount(response.count);
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  const fetchNotificationCount = useCallback(async () => {
    if (!user) return;
    try {
      const response = await api.notifications.getUnreadCount();
      if (response.success) {
        setNotificationCount(response.count);
      }
    } catch (error) {
      console.error('Failed to fetch notification count:', error);
    }
  }, [user]);

  const fetchMessages = async (otherUserId) => {
    try {
      const response = await api.messages.getMessages(otherUserId);
      if (response.success) {
        setMessages(response.messages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    fetchConversations();
    fetchUnreadCount();
    fetchNotificationCount();
  }, [user, fetchNotificationCount]);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.otherUser._id);
    }
  }, [activeConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages([]);
    if (conversation.lastMessage && !conversation.lastMessage.read && conversation.lastMessage.recipient === user?.id) {
      api.messages.markRead(conversation.lastMessage._id);
      setConversations(prev => prev.map(c =>
        c._id === conversation._id ? { ...c, unreadCount: 0, lastMessage: { ...c.lastMessage, read: true } } : c
      ));
      fetchUnreadCount();
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation || sending) return;

    setSending(true);
    try {
      const response = await api.messages.send({
        recipientId: activeConversation.otherUser._id,
        content: newMessage.trim(),
      });
      if (response.success) {
        setMessages(prev => [...prev, response.message]);
        setNewMessage('');
        setConversations(prev => prev.map(c =>
          c._id === activeConversation._id
            ? { ...c, lastMessage: response.message, unreadCount: 0 }
            : c
        ));
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter(c =>
    c.otherUser.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user?.fullName || 'Guest'}</h3>
              <p className={styles.userHandle}>{user?.email || 'Sign in to message'}</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            <a href="/" className={styles.sidebarLink}><span>🏠</span> Feed</a>
            <a href="/explore" className={styles.sidebarLink}><span>🔍</span> Explore</a>
            <a href="/news" className={styles.sidebarLink}><span>📰</span> News</a>
            <a href="/sports" className={styles.sidebarLink}><span>⚽</span> Sports</a>
            <a href="/categories" className={styles.sidebarLink}><span>🛒</span> Marketplace</a>
            <a href="/messages" className={`${styles.sidebarLink} ${styles.active}`}><span>💬</span> Messages {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}</a>
            <a href="/notifications" className={styles.sidebarLink}><span>🔔</span> Notifications {notificationCount > 0 && <span className={styles.badge}>{notificationCount}</span>}</a>
            <a href="/profile" className={styles.sidebarLink}><span>👤</span> Profile</a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.messagesLayout}>
            <div className={styles.conversationsPanel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Messages</h2>
                <div className={styles.searchBar}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>
              <div className={styles.conversationsList}>
                {filteredConversations.length === 0 ? (
                  <div className={styles.empty}>No conversations yet</div>
                ) : (
                  filteredConversations.map((conv) => (
                    <div
                      key={conv._id}
                      className={`${styles.conversationItem} ${activeConversation?._id === conv._id ? styles.active : ''}`}
                      onClick={() => handleSelectConversation(conv)}
                    >
                      <div className={styles.convAvatar}>
                        {conv.otherUser.avatar?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className={styles.convInfo}>
                        <div className={styles.convHeader}>
                          <span className={styles.convName}>{conv.otherUser.fullName}</span>
                          <span className={styles.convTime}>{formatTime(conv.lastMessage.createdAt)}</span>
                        </div>
                        <div className={styles.convPreview}>
                          <span className={styles.convSender}>
                            {conv.lastMessage.sender === user?.id ? 'You: ' : ''}
                          </span>
                          {conv.lastMessage.content}
                        </div>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className={styles.unreadBadge}>{conv.unreadCount}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className={styles.chatPanel}>
              {activeConversation ? (
                <>
                  <div className={styles.chatHeader}>
                    <div className={styles.chatUserInfo}>
                      <div className={styles.chatAvatar}>
                        {activeConversation.otherUser.avatar?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <h3 className={styles.chatName}>{activeConversation.otherUser.fullName}</h3>
                        <span className={styles.chatStatus}>Online</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.messagesList}>
                    {messages.length === 0 ? (
                      <div className={styles.emptyMessages}>
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      <>
                        {messages.map((msg) => (
                          <div
                            key={msg._id}
                            className={`${styles.messageBubble} ${msg.sender._id === user?.id ? styles.sent : styles.received}`}
                          >
                            <p className={styles.messageContent}>{msg.content}</p>
                            <span className={styles.messageTime}>{formatTime(msg.createdAt)}</span>
                            {msg.sender._id === user?.id && msg.read && <span className={styles.readReceipt}>✓✓</span>}
                            {msg.replies && msg.replies.length > 0 && (
                              <div className={styles.replies}>
                                {msg.replies.map((reply) => (
                                  <div
                                    key={reply._id}
                                    className={`${styles.replyBubble} ${reply.sender._id === user?.id ? styles.sent : styles.received}`}
                                  >
                                    <p className={styles.replyContent}>{reply.content}</p>
                                    <span className={styles.replyTime}>{formatTime(reply.createdAt)}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>
                  <form className={styles.messageForm} onSubmit={handleSendMessage}>
                    <input
                      ref={messageInputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className={styles.messageInput}
                      disabled={sending}
                    />
                    <button
                      type="submit"
                      className={styles.sendButton}
                      disabled={sending || !newMessage.trim()}
                    >
                      {sending ? 'Sending...' : 'Send'}
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.noConversation}>
                  <div className={styles.noConvIcon}>💬</div>
                  <h3>Select a conversation</h3>
                  <p>Choose a conversation from the left or start a new one</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;