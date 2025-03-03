import React, { createContext, useContext, useState } from 'react';

interface GameContextType {
  score: number;
  updateScore: (newScore: number) => void;
  gameStats: {
    gamesPlayed: number;
    gamesWon: number;
    bestTime: number;
  };
  updateGameStats: (stats: { gamesPlayed?: number; gamesWon?: number; bestTime?: number }) => void;
}

const GameContext = createContext<GameContextType>({
  score: 0,
  updateScore: () => {},
  gameStats: {
    gamesPlayed: 0,
    gamesWon: 0,
    bestTime: 0,
  },
  updateGameStats: () => {},
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    bestTime: 0,
  });

  const updateScore = (newScore: number) => {
    setScore(newScore);
  };

  const updateGameStats = (stats: { gamesPlayed?: number; gamesWon?: number; bestTime?: number }) => {
    setGameStats(prevStats => ({
      ...prevStats,
      ...stats,
    }));
  };

  return (
    <GameContext.Provider value={{ score, updateScore, gameStats, updateGameStats }}>
      {children}
    </GameContext.Provider>
  );
};
