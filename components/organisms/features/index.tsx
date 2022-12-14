import { useCallback, useEffect, useState } from 'react';
import { GameItemTypes } from '../../../services/data-types';
import { getFeaturedGame } from '../../../services/player';
import FeatureCard from './feature-card';

export default function Features() {
  const API_IMG = process.env.NEXT_PUBLIC_IMG;

  const [gameList, setGameList] = useState([]);

  const getFeatureGameList = useCallback(async () => {
    const data = await getFeaturedGame();
    console.log('data', data);
    setGameList(data);
  }, []);

  useEffect(() => {
    getFeatureGameList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="featured-game pt-50 pb-50">
      <div id="discover" className="container-fluid">
        <h2 className="text-4zxl fw-bold color-palette-1 mb-30">
          Our Featured
          <br />
          Games This Year
        </h2>
        <div className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4" data-aos="fade-up">
          {gameList.map((item: GameItemTypes) => (
            <FeatureCard key={item._id} title={item.name} category={item.category.name} thumbnail={`${API_IMG}/${item.thumbnail}`} id={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
