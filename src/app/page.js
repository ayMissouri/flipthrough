'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getArtworkCount, getRandomArtwork } from '@/lib/api';
import { TRAIL_BUFFER_SIZE, MOUSE_MOVE_THRESHOLD } from '@/lib/constants';
import TrailItem from '@/components/TrailItem';

export default function Home() {
  const [totalArtworks, setTotalArtworks] = useState(0);
  const [trail, setTrail] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const isFetching = useRef(false);
  const trailRef = useRef([]);

  useEffect(() => {
    async function init() {
      try {
        const total = await getArtworkCount();
        setTotalArtworks(total);
        console.log('Total artworks available:', total);
      } catch (error) {
        console.error('Failed to initialize:', error);
      }
    }
    init();
  }, []);

  const handleMouseMove = useCallback(
    async (e) => {
      if (totalArtworks === 0) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      const dx = currentX - lastSpawnPos.current.x;
      const dy = currentY - lastSpawnPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > MOUSE_MOVE_THRESHOLD) {
        lastSpawnPos.current = { x: currentX, y: currentY };

        if (isFetching.current) return;
        isFetching.current = true;

        try {
          const artwork = await getRandomArtwork(totalArtworks);

          if (artwork) {
            const newTrailItem = {
              ...artwork,
              x: currentX,
              y: currentY,
              rotation: Math.random() * 20 - 10,
              zIndex: Date.now(),
              id: `${artwork.id}-${Date.now()}`,
            };

            setTrail((prev) => {
              const newTrail = [...prev, newTrailItem];
              if (newTrail.length > TRAIL_BUFFER_SIZE) {
                return newTrail.slice(newTrail.length - TRAIL_BUFFER_SIZE);
              }
              return newTrail;
            });
          }
        } catch (err) {
          console.error('Error in trail generation:', err);
        } finally {
          isFetching.current = false;
        }
      }
    },
    [totalArtworks]
  );

  const handleArtworkClick = (artwork) => {
    console.log('Clicked artwork:', artwork);
    setSelectedArtwork(artwork);
  };

  return (
    <main
      className='relative w-full h-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white cursor-crosshair'
      onMouseMove={handleMouseMove}>
      {trail.map((item, index) => (
        <TrailItem key={item.id} artwork={item} isTopMost={index === trail.length - 1} onClick={handleArtworkClick} />
      ))}

      {selectedArtwork && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => setSelectedArtwork(null)}>
          <div className='bg-white p-4 rounded' onClick={(e) => e.stopPropagation()}>
            <h2 className='text-xl font-bold'>{selectedArtwork.title}</h2>
            <p>Placeholder Detail View</p>
            <button onClick={() => setSelectedArtwork(null)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
