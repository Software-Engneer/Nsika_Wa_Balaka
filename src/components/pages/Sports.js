import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import CommentSection from '../CommentSection';
import styles from '../styles/Sports.module.css';

function Sports() {
  const { user } = useAuth();
  const [leagues, setLeagues] = useState({});
  const [activeLeague, setActiveLeague] = useState('ngwangwa');
  const [activeTab, setActiveTab] = useState('fixtures');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch leagues from API on mount
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const response = await api.leagues.getAll();
        if (response.success && response.leagues) {
          // Transform API data to match frontend format
          const transformed = response.leagues.reduce((acc, league) => {
            acc[league.key] = {
              name: league.name,
              description: league.description,
              season: league.season,
              teams: league.teams || [],
              fixtures: league.fixtures || [],
              results: league.results || [],
              standings: league.standings || [],
              news: league.news || [],
            };
            return acc;
          }, {});
          setLeagues(transformed);
          // Set active league to first available if current not in list
          if (!transformed[activeLeague]) {
            const firstKey = Object.keys(transformed)[0];
            if (firstKey) setActiveLeague(firstKey);
          }
        } else {
          setLeagues({});
        }
      } catch (error) {
        console.error('Failed to fetch leagues:', error);
        setLeagues({});
      } finally {
        setLoading(false);
      }
    };
    fetchLeagues();
  }, [activeLeague]);

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

  useEffect(() => {
    fetchNotificationCount();
  }, [user, fetchNotificationCount]);

  const league = leagues[activeLeague] || { fixtures: [], results: [], standings: [], teams: [], news: [] };

  const filteredFixtures = league.fixtures.filter((match) => {
    const q = searchQuery.toLowerCase();
    return (
      match.homeTeam.toLowerCase().includes(q) ||
      match.awayTeam.toLowerCase().includes(q) ||
      (match.venue && match.venue.toLowerCase().includes(q))
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

  const getStandingRowClass = (team, total) => {
    if (team.position <= 2) return styles.championsLeague;
    if (team.position === 3 || team.position === 4) return styles.confederationCup;
    if (team.position >= total - 1) return styles.relegation;
    return '';
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <div className={styles.header}>
              <h1 className={styles.title}>Sports - Balaka</h1>
              <p className={styles.subtitle}>Loading leagues...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Use league.news from API instead of hardcoded sportsNews
  const sportsNews = league.news || [];

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
            <a href="/" className={styles.sidebarLink}><span>🏠</span> Feed</a>
            <a href="/explore" className={styles.sidebarLink}><span>🔍</span> Explore</a>
            <a href="/news" className={styles.sidebarLink}><span>📰</span> News</a>
            <a href="/sports" className={`${styles.sidebarLink} ${styles.active}`}><span>⚽</span> Sports</a>
            <a href="/categories" className={styles.sidebarLink}><span>🛒</span> Marketplace</a>
            <a href="/messages" className={styles.sidebarLink}><span>💬</span> Messages</a>
            <a href="/notifications" className={styles.sidebarLink}><span>🔔</span> Notifications {notificationCount > 0 && <span className={styles.badge}>{notificationCount}</span>}</a>
            <a href="/profile" className={styles.sidebarLink}><span>👤</span> Profile</a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sports - Balaka</h1>
            <p className={styles.subtitle}>Football fixtures, results, and standings across all Balaka leagues</p>
          </div>

          <div className={styles.leagueSelectorBar}>
            <div className={styles.leagueDropdown}>
              <label className={styles.leagueLabel}></label>
              <select 
                value={activeLeague} 
                onChange={(e) => {
                  setActiveLeague(e.target.value);
                  setActiveTab('fixtures');
                  setSearchQuery('');
                }}
                className={styles.leagueSelect}
              >
                {Object.entries(leagues).map(([key, l]) => (
                  <option key={key} value={key}>{l.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'fixtures' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('fixtures')}
              >
                Fixtures ({league.fixtures.length})
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'results' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('results')}
              >
                Results ({league.results.length})
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'standings' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('standings')}
              >
                Standings ({league.standings.length})
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'teams' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('teams')}
              >
                Teams
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'news' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('news')}
              >
                News
              </button>
            </div>
          </div>

          {favoriteTeam && (
            <div className={styles.favoriteTeamBadge}>
              ⭐ Following: <strong>{favoriteTeam}</strong>
              <button className={styles.clearFavorite} onClick={() => setFavoriteTeam(null)}>✕</button>
            </div>
          )}

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
                  <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>✕</button>
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
              {league.results.length === 0 ? (
                <p className={styles.empty}>No recent results available.</p>
              ) : (
                league.results.map((result) => (
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
                    {league.standings.map((team) => {
                      const gd = team.gf - team.ga;
                      return (
                        <tr
                          key={team.team}
                          className={`${styles.standingRow} ${getStandingRowClass(team, league.standings.length)} ${favoriteTeam === team.team ? styles.favoriteRow : ''}`}
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
              <p className={styles.tableHint}>Click a team to follow them</p>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className={styles.tabContent}>
              <div className={styles.teamsGrid}>
                {league.teams.map((team) => (
                  <div
                    key={team}
                    className={`${styles.teamCard} ${favoriteTeam === team ? styles.teamCardFavorite : ''}`}
                    onClick={() => toggleFavorite(team)}
                  >
                    <div className={styles.teamCardIcon}>⚽</div>
                    <h3 className={styles.teamCardName}>{team}</h3>
                    {favoriteTeam === team && <span className={styles.teamCardBadge}>⭐ Following</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className={styles.tabContent}>
              {sportsNews.length === 0 ? (
                <p className={styles.empty}>No sports news available.</p>
              ) : (
                sportsNews.map((item) => (
                  <div key={item.id} className={styles.newsCard} onClick={() => setSelectedNews(item)}>
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

          {selectedNews && (
            <div className={styles.modalOverlay} onClick={() => setSelectedNews(null)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={() => setSelectedNews(null)}>✕</button>
                <div className={styles.modalBody}>
                  <h2 className={styles.modalTitle}>{selectedNews.title}</h2>
                  <div className={styles.modalMeta}>
                    <span className={styles.modalMetaItem}>{selectedNews.author}</span>
                    <span className={styles.modalMetaItem}>{selectedNews.time}</span>
                  </div>
                  <p className={styles.modalDescription}>{selectedNews.excerpt}</p>
                  <CommentSection commentableType="League" commentableId={selectedNews.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sports;
