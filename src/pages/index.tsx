import App from "@components/App";
import React from 'react';
import '../app/globals.css';
import 'react-roulette-pro/dist/index.css';
import {AppProvider} from "../context/AppContext";

const Home = () => {
  return (
    <div>
      <AppProvider>
        <App/>
      </AppProvider>
    </div>
  );
}

export default Home;
