// src/pages/index.tsx
import React from 'react';
import SteamData from '../components/SteamData';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Steam Data Viewer</h1>
      <SteamData />
    </div>
  );
}

export default Home;
