import React, { useEffect } from 'react';
import './App.css';
import kline  from './klinechart';
import generatedKLineDataList from "./utils/generatedKLineDataList";

function App() {

  useEffect(() => {
    const chart = kline.init(`app`);
    chart.applyNewData(generatedKLineDataList(Date.now(), 5000, 5));
    setInterval(() => {
      chart.applyMoreData(generatedKLineDataList(Date.now(), 5000, 1));
    }, 5000);
    return () => {
      kline.dispose('simple_chart');
    }
  }, []);

  return (
    <div style={{width: '800px', height: '400px'}} id='app' className="App">
      
    </div>
  );
}

export default App;
