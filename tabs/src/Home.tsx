import React from "react";

import ZapsSentComponent from "./components/ZapsSent";
import ZapChartComponent from "./components/ZapChart";

import styles from './components/ZapsSent.module.css';
import FeedList from './components/FeedList';
import { getWallets, getTotalSentAmount } from './services/lnbitsServiceLocal';
// import Leaderboard from "./components/Leaderboard";
import FeedComponent from './components/FeedComponent';

const Home: React.FC = () => {
  return (
    <div className={styles.feedcomponent}>

      <div className={styles.horizontalContainer}>
        <ZapsSentComponent />
        <ZapChartComponent />
      </div>
      <div style={{ margin: '7px 0', height: '20%' }} />
      <FeedComponent />
      {/* <Leaderboard /> */}
    </div>
  );
};

export default Home;
