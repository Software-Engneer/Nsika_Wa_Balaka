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
    status: 'live',
    homeScore: 1,
    awayScore: 0,
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
    status: 'upcoming',
  },
  {
    id: 4,
    homeTeam: 'Salima FC',
    awayTeam: 'Zomba United',
    date: '2026-09-12',
    time: '14:30',
    venue: 'Salima Stadium',
    status: 'upcoming',
  },
  {
    id: 5,
    homeTeam: 'Ntcheu FC',
    awayTeam: 'Mulanje FC',
    date: '2026-09-10',
    time: '15:00',
    venue: 'Ntcheu Stadium',
    status: 'upcoming',
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
  {
    id: 4,
    homeTeam: 'Mzuzu Warriors',
    awayTeam: 'Lilongwe FC',
    date: '2026-08-08',
    homeScore: 1,
    awayScore: 2,
    venue: 'Mzuzu Stadium',
    competition: 'Super League',
  },
];

const standings = [
  { position: 1, team: 'Balaka United FC', played: 8, won: 6, drawn: 1, lost: 1, gf: 14, ga: 5, points: 19 },
  { position: 2, team: 'Lilongwe FC', played: 8, won: 5, drawn: 2, lost: 1, gf: 12, ga: 6, points: 17 },
  { position: 3, team: 'Mzuzu Warriors', played: 8, won: 4, drawn: 2, lost: 2, gf: 10, ga: 7, points: 14 },
  { position: 4, team: 'Balaka City FC', played: 8, won: 3, drawn: 3, lost: 2, gf: 9, ga: 8, points: 12 },
  { position: 5, team: 'Salima FC', played: 8, won: 2, drawn: 3, lost: 3, gf: 7, ga: 9, points: 9 },
  { position: 6, team: 'Mulanje FC', played: 8, won: 2, drawn: 2, lost: 4, gf: 6, ga: 10, points: 8 },
  { position: 7, team: 'Zomba United', played: 8, won: 1, drawn: 2, lost: 5, gf: 5, ga: 12, points: 5 },
  { position: 8, team: 'Ntcheu FC', played: 8, won: 1, drawn: 1, lost: 6, gf: 4, ga: 15, points: 4 },
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
  {
    id: 4,
    title: 'Super League Transfer Window: Top Targets Revealed',
    excerpt: 'Clubs across the Super League are scrambling to strengthen their squads ahead of the final stretch of the season.',
    time: '3 days ago',
    author: 'Kwathu Sports',
  },
];

function Sports() {
  const [activeTab, setActiveTab] = useState('fixtures');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState(null);

  const filteredFixtures = fixtures.filter((match) => {
    const query = searchQuery.toLowerCase();
    return (
      match.homeTeam.toLowerCase().includes(query) ||
      match.awayTeam.toLowerCase().includes(query) ||
      match.venue.toLowerCase().includes(query)
    );
  });

  const toggleFavorite = (team) => {
    setFavoriteTeam((prev) => (prev === team ? null : team));
  };

  const getResultClass = (homeTeam, awayTeam, homeScore, awayScore) => {
    if (favoriteTeam === homeTeam) {
      return homeScore > awayScore ? styles.win : homeScore < awayScore ? styles.loss : styles.draw;
    }
    if (favoriteTeam === awayTeam) {
      return awayScore > homeScore ? styles.win : awayScore < homeScore ? styles.loss : styles.draw;
    }
    return '';
  };

  const getStandingRowClass = (team) => {
    if (team.position <= 2) return styles.championsLeague;
    if (team.position === 3 || team.position === 4) return styles.confederationCup;
    if (team.position >= standings.length - 1) return styles.relegation;
    return '';
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
            <a href="/" className={styles.sidebarLink}>
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
            <p className={styles.subtitle}>Football fixtures, results, standings, and updates from around Balaka</p>
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
              className={`${styles.tab} ${activeTab === 'standings' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('standings')}
            >
              Standings
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
              <div className={styles.searchBar}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search fixtures by team or venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>
                    ✕
                  </button>
                )}
              </div>
              {filteredFixtures.length === 0 ? (
                <p className={styles.empty}>No fixtures match your search.</p>
              ) : (
                filteredFixtures.map((match) => (
                  <div key={match.id} className={`${styles.fixtureCard} ${match.status === 'live' ? styles.liveCard : ''}`}>
                    <div className={styles.fixtureHeader}>
                      <span className={styles.fixtureDate}>{match.date}</span>
                      {match.status === 'live' ? (
                        <span className={styles.liveBadge}>
                          <span className={styles.liveDot}></span>
                          LIVE
                        </span>
                      ) : (
                        <span className={styles.fixtureTime}>{match.time}</span>
                      )}
                    </div>
                    <div className={styles.matchRow}>
                      <span className={styles.teamName}>{match.homeTeam}</span>
                      {match.status === 'live' ? (
                        <div className={styles.liveScoreBoard}>
                          <span className={styles.liveScore}>{match.homeScore}</span>
                          <span className={styles.scoreDivider}>-</span>
                          <span className={styles.liveScore}>{match.awayScore}</span>
                        </div>
                      ) : (
                        <span className={styles.vs}>vs</span>
                      )}
                      <span className={styles.teamName}>{match.awayTeam}</span>
                    </div>
                    <p className={styles.matchVenue}>
                      <span className={styles.venueIcon}>📍</span> {match.venue}
                    </p>
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
                  <div
                    key={result.id}
                    className={`${styles.resultCard} ${getResultClass(result.homeTeam, result.awayTeam, result.homeScore, result.awayScore)}`}
                  >
                    <div className={styles.resultHeader}>
                      <span className={styles.resultCompetition}>{result.competition}</span>
                      <span className={styles.resultDate}>{result.date}</span>
                    </div>
                    <div className={styles.matchRow}>
                      <div className={styles.teamBlock}>
                        <span className={styles.teamName}>{result.homeTeam}</span>
                        {favoriteTeam === result.homeTeam && <span className={styles.favoriteStar}>⭐</span>}
                      </div>
                      <div className={styles.scoreBoard}>
                        <span className={styles.score}>{result.homeScore}</span>
                        <span className={styles.scoreDivider}>-</span>
                        <span className={styles.score}>{result.awayScore}</span>
                      </div>
                      <div className={styles.teamBlock}>
                        {favoriteTeam === result.awayTeam && <span className={styles.favoriteStar}>⭐</span>}
                        <span className={styles.teamName}>{result.awayTeam}</span>
                      </div>
                    </div>
                    <p className={styles.matchVenue}>
                      <span className={styles.venueIcon}>📍</span> {result.venue}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'standings' && (
            <div className={styles.tabContent}>
              <div className={styles.tableWrapper}>
                <table className={styles.standingsTable}>
                  <thead>
                    <tr>
                      <th className={styles.posCol}>#</th>
                      <th className={styles.teamCol}>Team</th>
                      <th className={styles.statCol}>P</th>
                      <th className={styles.statCol}>W</th>
                      <th className={styles.statCol}>D</th>
                      <th className={styles.statCol}>L</th>
                      <th className={styles.statCol}>GF</th>
                      <th className={styles.statCol}>GA</th>
                      <th className={styles.statCol}>GD</th>
                      <th className={styles.statCol}>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team) => {
                      const gd = team.gf - team.ga;
                      return (
                        <tr
                          key={team.team}
                          className={`${styles.standingRow} ${getStandingRowClass(team)} ${favoriteTeam === team.team ? styles.favoriteRow : ''}`}
                          onClick={() => toggleFavorite(team.team)}
                        >
                          <td className={styles.posCol}>{team.position}</td>
                          <td className={styles.teamCol}>
                            <span className={styles.teamNameCell}>{team.team}</span>
                            {favoriteTeam === team.team && <span className={styles.favoriteStar}>⭐</span>}
                          </td>
                          <td className={styles.statCol}>{team.played}</td>
                          <td className={styles.statCol}>{team.won}</td>
                          <td className={styles.statCol}>{team.drawn}</td>
                          <td className={styles.statCol}>{team.lost}</td>
                          <td className={styles.statCol}>{team.gf}</td>
                          <td className={styles.statCol}>{team.ga}</td>
                          <td className={styles.statCol}>{gd > 0 ? `+${gd}` : gd}</td>
                          <td className={styles.statCol}>
                            <span className={styles.pointsCell}>{team.points}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className={styles.tableHint}>Click a team to set as favorite</p>
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
