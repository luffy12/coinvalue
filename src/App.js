import React from 'react';
import Header from "./components/Header";
import './App.css';
import CoinDetailPage from './pages/CoinDetailPage';
import CoinSummaryPage from './pages/CoinSummaryPage';
import { BrowserRouter, Route } from "react-router-dom";
import { WatchListContextProvider } from './context/watchListContext';

function App() {
  return (
    <div className="container">
      <WatchListContextProvider>
      <BrowserRouter>
          <Header />
          <Route exact path="/" component={CoinSummaryPage} />
          <Route path="/coins/:id" component={CoinDetailPage} />
        </BrowserRouter>
      </WatchListContextProvider>
    
    </div>
  );
}

export default App;
