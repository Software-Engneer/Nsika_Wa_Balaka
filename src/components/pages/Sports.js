import React, { useState } from 'react';
import styles from '../styles/Sports.module.css';

const leagues = {
  ngwangwa: {
    name: 'Ngwangwa League',
    description: 'Local Balaka district league',
    season: '2026 Season',
    teams: ['Balaka FC', 'Maphunziro FC', 'Chilobwe FC', 'Mpulula FC', 'Nsika FC', 'Phalula FC', 'Kalembo FC', 'Kachere FC'],
    fixtures: [
      { id: 'n1', homeTeam: 'Balaka FC', awayTeam: 'Maphunziro FC', date: '2026-09-06', time: '14:00', venue: 'Balaka Stadium', status: 'upcoming' },
      { id: 'n2', homeTeam: 'Chilobwe FC', awayTeam: 'Mpulula FC', date: '2026-09-08', time: '15:30', venue: 'Chilobwe Ground', status: 'upcoming' },
      { id: 'n3', homeTeam: 'Nsika FC', awayTeam: 'Balaka FC', date: '2026-09-10', time: '14:00', venue: 'Nsika Ground', status: 'upcoming' },
      { id: 'n4', homeTeam: 'Phalula FC', awayTeam: 'Kalembo FC', date: '2026-09-12', time: '15:00', venue: 'Phalula Ground', status: 'upcoming' },
      { id: 'n5', homeTeam: 'Maphunziro FC', awayTeam: 'Kachere FC', date: '2026-08-30', time: '14:00', venue: 'Maphunziro Ground', status: 'live', homeScore: 2, awayScore: 1 },
    ],
    results: [
      { id: 'nr1', homeTeam: 'Balaka FC', awayTeam: 'Chilobwe FC', date: '2026-08-25', homeScore: 3, awayScore: 1, venue: 'Balaka Stadium', competition: 'Ngwangwa League' },
      { id: 'nr2', homeTeam: 'Mpulula FC', awayTeam: 'Nsika FC', date: '2026-08-20', homeScore: 1, awayScore: 1, venue: 'Mpulula Ground', competition: 'Ngwangwa League' },
      { id: 'nr3', homeTeam: 'Phalula FC', awayTeam: 'Balaka FC', date: '2026-08-15', homeScore: 0, awayScore: 2, venue: 'Phalula Ground', competition: 'Ngwangwa League' },
      { id: 'nr4', homeTeam: 'Kalembo FC', awayTeam: 'Maphunziro FC', date: '2026-08-10', homeScore: 2, awayScore: 2, venue: 'Kalembo Ground', competition: 'Ngwangwa League' },
      { id: 'nr5', homeTeam: 'Kachere FC', awayTeam: 'Mpulula FC', date: '2026-08-05', homeScore: 0, awayScore: 3, venue: 'Kachere Ground', competition: 'Ngwangwa League' },
    ],
    standings: [
      { position: 1, team: 'Balaka FC', played: 8, won: 7, drawn: 1, lost: 0, gf: 18, ga: 4, points: 22 },
      { position: 2, team: 'Maphunziro FC', played: 8, won: 5, drawn: 2, lost: 1, gf: 13, ga: 6, points: 17 },
      { position: 3, team: 'Mpulula FC', played: 8, won: 4, drawn: 2, lost: 2, gf: 11, ga: 8, points: 14 },
      { position: 4, team: 'Chilobwe FC', played: 8, won: 4, drawn: 1, lost: 3, gf: 10, ga: 9, points: 13 },
      { position: 5, team: 'Nsika FC', played: 8, won: 3, drawn: 2, lost: 3, gf: 8, ga: 9, points: 11 },
      { position: 6, team: 'Phalula FC', played: 8, won: 2, drawn: 1, lost: 5, gf: 6, ga: 12, points: 7 },
      { position: 7, team: 'Kalembo FC', played: 8, won: 1, drawn: 2, lost: 5, gf: 5, ga: 14, points: 5 },
      { position: 8, team: 'Kachere FC', played: 8, won: 0, drawn: 1, lost: 7, gf: 3, ga: 16, points: 1 },
    ],
  },
  super: {
    name: 'Super League',
    description: 'Malawi national top-flight league',
    season: '2026 Season',
    teams: ['Balaka United FC', 'Lilongwe FC', 'Mzuzu Warriors', 'Blantyre United', 'Zomba All Stars', 'Salima FC', 'Mulanje FC', 'Ntcheu FC'],
    fixtures: [
      { id: 's1', homeTeam: 'Balaka United FC', awayTeam: 'Mulanje FC', date: '2026-08-30', time: '14:00', venue: 'Balaka Stadium', status: 'live', homeScore: 1, awayScore: 0 },
      { id: 's2', homeTeam: 'Mzuzu Warriors', awayTeam: 'Balaka United FC', date: '2026-09-05', time: '15:30', venue: 'Mzuzu Stadium', status: 'upcoming' },
      { id: 's3', homeTeam: 'Blantyre United', awayTeam: 'Zomba All Stars', date: '2026-09-07', time: '16:00', venue: 'Blantyre Stadium', status: 'upcoming' },
      { id: 's4', homeTeam: 'Salima FC', awayTeam: 'Zomba United', date: '2026-09-12', time: '14:30', venue: 'Salima Stadium', status: 'upcoming' },
    ],
    results: [
      { id: 'sr1', homeTeam: 'Balaka United FC', awayTeam: 'Salima FC', date: '2026-08-20', homeScore: 2, awayScore: 1, venue: 'Balaka Stadium', competition: 'Super League' },
      { id: 'sr2', homeTeam: 'Ntcheu FC', awayTeam: 'Balaka United FC', date: '2026-08-15', homeScore: 0, awayScore: 0, venue: 'Ntcheu Stadium', competition: 'Super League' },
      { id: 'sr3', homeTeam: 'Mzuzu Warriors', awayTeam: 'Lilongwe FC', date: '2026-08-08', homeScore: 1, awayScore: 2, venue: 'Mzuzu Stadium', competition: 'Super League' },
    ],
    standings: [
      { position: 1, team: 'Balaka United FC', played: 8, won: 6, drawn: 1, lost: 1, gf: 14, ga: 5, points: 19 },
      { position: 2, team: 'Lilongwe FC', played: 8, won: 5, drawn: 2, lost: 1, gf: 12, ga: 6, points: 17 },
      { position: 3, team: 'Mzuzu Warriors', played: 8, won: 4, drawn: 2, lost: 2, gf: 10, ga: 7, points: 14 },
      { position: 4, team: 'Blantyre United', played: 8, won: 3, drawn: 3, lost: 2, gf: 9, ga: 8, points: 12 },
      { position: 5, team: 'Salima FC', played: 8, won: 2, drawn: 3, lost: 3, gf: 7, ga: 9, points: 9 },
      { position: 6, team: 'Mulanje FC', played: 8, won: 2, drawn: 2, lost: 4, gf: 6, ga: 10, points: 8 },
      { position: 7, team: 'Zomba All Stars', played: 8, won: 1, drawn: 2, lost: 5, gf: 5, ga: 12, points: 5 },
      { position: 8, team: 'Ntcheu FC', played: 8, won: 1, drawn: 1, lost: 6, gf: 4, ga: 15, points: 4 },
    ],
  },
  first: {
    name: 'First Division',
    description: 'Malawi second-tier football league',
    season: '2026 Season',
    teams: ['Balaka City FC', 'Zomba United', 'Dedza FC', 'Machinga FC', 'Mwanza FC', 'Neno FC', 'Thyolo FC', 'Chikwawa FC'],
    fixtures: [
      { id: 'f1', homeTeam: 'Balaka City FC', awayTeam: 'Lilongwe FC', date: '2026-08-28', time: '16:00', venue: 'Balaka Sports Complex', status: 'upcoming' },
      { id: 'f2', homeTeam: 'Dedza FC', awayTeam: 'Balaka City FC', date: '2026-09-09', time: '15:00', venue: 'Dedza Ground', status: 'upcoming' },
      { id: 'f3', homeTeam: 'Machinga FC', awayTeam: 'Mwanza FC', date: '2026-09-11', time: '14:30', venue: 'Machinga Ground', status: 'upcoming' },
    ],
    results: [
      { id: 'fr1', homeTeam: 'Balaka City FC', awayTeam: 'Zomba United', date: '2026-08-10', homeScore: 3, awayScore: 2, venue: 'Balaka Sports Complex', competition: 'First Division' },
      { id: 'fr2', homeTeam: 'Neno FC', awayTeam: 'Balaka City FC', date: '2026-08-05', homeScore: 1, awayScore: 4, venue: 'Neno Ground', competition: 'First Division' },
    ],
    standings: [
      { position: 1, team: 'Balaka City FC', played: 6, won: 5, drawn: 1, lost: 0, gf: 15, ga: 4, points: 16 },
      { position: 2, team: 'Machinga FC', played: 6, won: 4, drawn: 1, lost: 1, gf: 10, ga: 5, points: 13 },
      { position: 3, team: 'Dedza FC', played: 6, won: 3, drawn: 2, lost: 1, gf: 9, ga: 6, points: 11 },
      { position: 4, team: 'Mwanza FC', played: 6, won: 3, drawn: 1, lost: 2, gf: 8, ga: 7, points: 10 },
      { position: 5, team: 'Zomba United', played: 6, won: 2, drawn: 1, lost: 3, gf: 7, ga: 9, points: 7 },
      { position: 6, team: 'Thyolo FC', played: 6, won: 1, drawn: 2, lost: 3, gf: 5, ga: 8, points: 5 },
      { position: 7, team: 'Neno FC', played: 6, won: 1, drawn: 1, lost: 4, gf: 4, ga: 11, points: 4 },
      { position: 8, team: 'Chikwawa FC', played: 6, won: 0, drawn: 1, lost: 5, gf: 3, ga: 14, points: 1 },
    ],
  },
};

const sportsNews = [
  {
    id: 1,
    title: 'Balaka FC Extends Lead Atop Ngwangwa League',
    excerpt: 'Balaka FC maintained their perfect start to the season with a convincing 3-1 win over Chilobwe FC at Balaka Stadium.',
    time: '3 hours ago',
    author: 'Kwathu Sports',
  },
  {
    id: 2,
    title: 'Ngwangwa League Top Scorer Race Heats Up',
    excerpt: 'With 8 goals in 8 matches, the race for the golden boot in the Ngwangwa League is wide open this season.',
    time: '1 day ago',
    author: 'Kwathu Sports',
  },
  {
    id: 3,
    title: 'Balaka United FC Signs New Striker Ahead of Super League Run-in',
    excerpt: 'Balaka United FC has completed the signing of a new forward to boost their attacking options for the remainder of the season.',
    time: '2 days ago',
    author: 'Kwathu Sports',
  },
  {
    id: 4,
    title: 'Youth Football Tournament Kicks Off in Balaka',
    excerpt: 'Local youth teams are competing in a week-long football tournament aimed at developing young talent in the district.',
    time: '3 days ago',
    author: 'Kwathu Sports',
  },
];

function Sports() {
  const [activeLeague, setActiveLeague] = useState('ngwangwa');
  const [activeTab, setActiveTab] = useState('fixtures');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState(null);

  const league = leagues[activeLeague];

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
            <a href="/notifications" className={styles.sidebarLink}><span>🔔</span> Notifications</a>
            <a href="/profile" className={styles.sidebarLink}><span>👤</span> Profile</a>
          </nav>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sports - Balaka</h1>
            <p className={styles.subtitle}>Football fixtures, results, and standings across all Balaka leagues</p>
          </div>

          <div className={styles.leagueSelector}>
            <h2 className={styles.leagueSelectorTitle}>Leagues</h2>
            <div className={styles.leagueGrid}>
              {Object.entries(leagues).map(([key, l]) => (
                <button
                  key={key}
                  className={`${styles.leagueCard} ${activeLeague === key ? styles.leagueCardActive : ''}`}
                  onClick={() => {
                    setActiveLeague(key);
                    setActiveTab('fixtures');
                    setSearchQuery('');
                  }}
                >
                  <div className={styles.leagueCardIcon}>
                    {key === 'ngwangwa' ? '🏆' : key === 'super' ? '⭐' : '🥈'}
                  </div>
                  <div className={styles.leagueCardBody}>
                    <h3 className={styles.leagueCardName}>{l.name}</h3>
                    <p className={styles.leagueCardDesc}>{l.description}</p>
                    <span className={styles.leagueCardMeta}>{l.teams.length} teams · {l.season}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.leagueHeader}>
            <div>
              <h2 className={styles.leagueName}>{league.name}</h2>
              <p className={styles.leagueSeason}>{league.season}</p>
            </div>
            {favoriteTeam && (
              <div className={styles.favoriteTeamBadge}>
                ⭐ Following: <strong>{favoriteTeam}</strong>
                <button className={styles.clearFavorite} onClick={() => setFavoriteTeam(null)}>✕</button>
              </div>
            )}
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
