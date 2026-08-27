import React, { useState } from 'react';
import styles from '../styles/Sports.module.css';

const fixtures = [
  {
    id: 1,
    homeTeam: 'Balaka United FC',
    awayTeam: 'Mulanje FC',
    date: '2026-08-30',
    time: '14:00',
    venue: 'Balaka Stadium',
    status: 'upcoming',
  },
  {
    id: 2,
    homeTeam: 'Mzuzu Warriors',
    awayTeam: 'Balaka United FC',
    date: '2026-09-05',
    time: '15:30',
    venue: 'Mzuzu Stadium',
    status: 'upcoming',
  },
  {
    id: 3,
    homeTeam: 'Balaka City FC',
    awayTeam: 'Lilongwe FC',
    date: '2026-08-28',
    time: '16:00',
    venue: 'Balaka Sports Complex',
    status: 'live',
    homeScore: 1,
    awayScore: 0,
  },
];

const results = [
  {
    id: 1,
    homeTeam: 'Balaka United FC',
    awayTeam: 'Salima FC',
    date: '2026-08-20',
    homeScore: 2,
    awayScore: 1,
    venue: 'Balaka Stadium',
    competition: 'Super League',
  },
  {
    id: 2,
    homeTeam: 'Ntcheu FC',
    awayTeam: 'Balaka United FC',
    date: '2026-08-15',
    homeScore: 0,
    awayScore: 0,
    venue: 'Ntcheu Stadium',
    competition: 'Super League',
  },
  {
    id: 3,
    homeTeam: 'Balaka City FC',
    awayTeam: 'Zomba United',
    date: '2026-08-10',
    homeScore: 3,
    awayScore: 2,
    venue: 'Balaka Sports Complex',
    competition: 'First Division',
  },
];

const sportsNews = [
  {
    id: 1,
    title: 'Balaka United FC Signs New Striker Ahead of Super League Run-in',
    excerpt: 'Balaka United FC has completed the signing of a new forward to boost their attacking options for the remainder of the season.',
    time: '3 hours ago',
    author: 'Kwathu Sports',
  },
  {
    id: 2,
    title: 'Balaka Stadium Renovation Nears Completion',
    excerpt: 'The long-awaited renovation of Balaka Stadium is almost complete, with new seating and improved lighting expected to be finished by next month.',
    time: '1 day ago',
    author: 'Kwathu News',
  },
  {
    id: 3,
    title: 'Youth Football Tournament Kicks Off in Balaka',
    excerpt: 'Local youth teams are competing in a week-long football tournament aimed at developing young talent in the district.',
    time: '2 days ago',
    author: 'Kwathu Sports',
  },
];

function Sports() {
  const [activeTab, setActiveTab] = useState('fixtures');

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
            <a href="/sports" className={`${styles.sidebarLink} ${styles.active}`}>
              <span>⚽</span> Sports
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
            <h1 className={styles.title}>Sports - Balaka</h1>
            <p className={styles.subtitle}>Football fixtures, results, and updates from around Balaka</p>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'fixtures' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('fixtures')}
            >
              Upcoming Fixtures
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'results' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('results')}
            >
              Results
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'news' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('news')}
            >
              News
            </button>
          </div>

          {activeTab === 'fixtures' && (
            <div className={styles.tabContent}>
              {fixtures.length === 0 ? (
                <p className={styles.empty}>No upcoming fixtures available.</p>
              ) : (
                fixtures.map((match) => (
                  <div key={match.id} className={styles.fixtureCard}>
                    <div className={styles.fixtureHeader}>
                      <span className={styles.fixtureDate}>{match.date}</span>
                      <span className={styles.fixtureTime}>{match.time}</span>
                    </div>
                    <div className={styles.matchRow}>
                      <span className={styles.teamName}>{match.homeTeam}</span>
                      <span className={styles.vs}>vs</span>
                      <span className={styles.teamName}>{match.awayTeam}</span>
                    </div>
                    <p className={styles.matchVenue}>{match.venue}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'results' && (
            <div className={styles.tabContent}>
              {results.length === 0 ? (
                <p className={styles.empty}>No recent results available.</p>
              ) : (
                results.map((result) => (
                  <div key={result.id} className={styles.resultCard}>
                    <div className={styles.resultHeader}>
                      <span className={styles.resultCompetition}>{result.competition}</span>
                      <span className={styles.resultDate}>{result.date}</span>
                    </div>
                    <div className={`${styles.matchRow} ${result.homeScore > result.awayScore ? styles.win : result.homeScore < result.awayScore ? styles.loss : styles.draw}`}>
                      <span className={styles.teamName}>{result.homeTeam}</span>
                      <div className={styles.scoreBoard}>
                        <span className={styles.score}>{result.homeScore}</span>
                        <span className={styles.scoreDivider}>-</span>
                        <span className={styles.score}>{result.awayScore}</span>
                      </div>
                      <span className={styles.teamName}>{result.awayTeam}</span>
                    </div>
                    <p className={styles.matchVenue}>{result.venue}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'news' && (
            <div className={styles.tabContent}>
              {sportsNews.length === 0 ? (
                <p className={styles.empty}>No sports news available.</p>
              ) : (
                sportsNews.map((item) => (
                  <div key={item.id} className={styles.newsCard}>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.newsExcerpt}>{item.excerpt}</p>
                    <div className={styles.newsFooter}>
                      <span className={styles.author}>{item.author}</span>
                      <span className={styles.time}>{item.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sports;
