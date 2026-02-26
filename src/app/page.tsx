'use client';

import { useCallback } from 'react';

const wallpapers = [
  { id: '01', gradient: 'linear-gradient(135deg, #0c1445, #1a237e)' },
  { id: '02', gradient: 'linear-gradient(135deg, #1a0505, #8b0000)' },
  { id: '03', gradient: 'linear-gradient(135deg, #051a1a, #005f56)' },
  { id: '04', gradient: 'linear-gradient(135deg, #1a0520, #7b1fa2)' },
  { id: '05', gradient: 'linear-gradient(135deg, #1a1200, #bf6900)' },
  { id: '06', gradient: 'linear-gradient(135deg, #020d1a, #1565c0)' },
  { id: '07', gradient: 'linear-gradient(135deg, #1a0a05, #c63f17)' },
  { id: '08', gradient: 'linear-gradient(135deg, #001a1a, #00695c)' },
  { id: '09', gradient: 'linear-gradient(135deg, #0d001a, #4a148c)' },
  { id: '10', gradient: 'linear-gradient(135deg, #0a1628, #1565c0)' },
  { id: '11', gradient: 'linear-gradient(135deg, #1a100a, #bf6900)' },
  { id: '12', gradient: 'linear-gradient(135deg, #0a1a12, #2e7d32)' },
  { id: '13', gradient: 'linear-gradient(135deg, #1a0a10, #ad1457)' },
  { id: '14', gradient: 'linear-gradient(135deg, #0a0d1a, #283593)' },
];

export default function Home() {
  const handleCardTap = useCallback(async (id: string) => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (!isTouch) return;

    try {
      const res = await fetch(`/wallpapers/mobile/${id}.png`);
      const blob = await res.blob();
      const file = new File([blob], `across-${id}-mobile.png`, {
        type: 'image/png',
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <a href="https://app.across.to/" target="_blank" rel="noopener noreferrer" className="logo-link">
            <svg
              className="logo"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.0003 0C57.4348 0.000148825 74 16.5656 74 37C74 57.4344 57.4348 73.9998 37.0003 74C16.5656 74 2.97694e-05 57.4345 0 37C0 16.5655 16.5656 0 37.0003 0ZM16.1873 53.6201L20.3801 57.8123L34.3896 43.8029C32.4664 43.0644 30.9353 41.5338 30.1968 39.6107L16.1873 53.6201ZM43.8033 39.6107C43.0648 41.5338 41.5336 43.0644 39.6104 43.8029L53.62 57.8123L57.8127 53.6201L43.8033 39.6107ZM16.1873 20.3799L30.1968 34.3893C30.9352 32.4661 32.4664 30.9355 34.3896 30.1971L20.3801 16.1877L16.1873 20.3799ZM39.6104 30.1971C41.5336 30.9355 43.0648 32.4661 43.8033 34.3893L57.8127 20.3799L53.62 16.1877L39.6104 30.1971Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <span className="header-title">wallpapers</span>
        </div>
      </header>

      <main className="gallery">
        {wallpapers.map((wp, i) => (
          <article
            key={wp.id}
            className="card"
            style={{
              background: wp.gradient,
              animationDelay: `${i * 0.06}s`,
            }}
            onClick={() => handleCardTap(wp.id)}
          >
            <div
              className="card-image"
              style={{
                backgroundImage: `url(/wallpapers/thumbnails/${wp.id}.png)`,
              }}
              role="img"
              aria-label={`Wallpaper ${wp.id}`}
            />
            <div className="card-overlay">
              <div className="download-links">
                <a
                  href={`/wallpapers/desktop/${wp.id}.jpg`}
                  download={`across-${wp.id}-desktop.jpg`}
                  className="download-link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                  <span>desktop</span>
                </a>
                <a
                  href={`/wallpapers/mobile/${wp.id}.png`}
                  download={`across-${wp.id}-mobile.png`}
                  className="download-link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M12 18h.01" />
                  </svg>
                  <span>mobile</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </main>

      <footer className="footer">across</footer>
    </>
  );
}
