import App from "@components/App";
import React from 'react';
import 'react-roulette-pro/dist/index.css';
import "../styles/globals.css";
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
