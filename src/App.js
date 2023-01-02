import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import kline  from './klinechart';
import generatedKLineDataList from "./utils/generatedKLineDataList";
import moment from 'moment';

const M1 = 60 * 1000;

const MAP = {
  '1m': M1,
  '5m': M1*5,
  '15m': M1*15,
  '1h': M1* 60,
  '1d': M1 * 60 * 24
}


const transformData = (data, type) => {
  let data0 = data[0];
  const rest = new Map();
  rest.set(data0.timestamp, data0);
  data.forEach((item, index) => {
    if ((item.timestamp - data0.timestamp) >= MAP[type]) {
      data0 = item;
      rest.set(item.timestamp, item);
    } else {
      const newItem = { ...data0, close: item.close, open: data0.open, high: Math.max(data0.high, item.high), low: Math.min(item.low, data0.low)};
      rest.set(data0.timestamp, newItem);
    }
  });

  const newData = [];
  rest.forEach((item) => {
    newData.push(item);
  });
  return newData
}

function App() {
  let chart, origin;
  useEffect(() => {
    chart = kline.init(`app`);
    let list = generatedKLineDataList(Date.now(), 5000, 3000);
    list.forEach((item, index) => {
      item.timestamp = moment('2022-11-01 00:01').add(index, 'm').valueOf();
    });
    origin = list;
    chart.applyNewData(list);
    return () => {
      kline.dispose('app');
    }
  }, []);


  const [type, setType] = useState('1m');
  const handleClick = useCallback((type) => {
    setType(type);
    const newData = transformData(origin, type);
    chart.clearData();
    chart.applyNewData(newData);
  }, []);
  let flag = 0;
  useEffect(() => {
    const id = setInterval(() => {
      const data = generatedKLineDataList(Date.now(), 5000, 1)[0];
      const curDataList = chart.getDataList();
      const curData = curDataList[curDataList.length - 1];
      flag++;
      data.timestamp = curData.timestamp + 5000 * flag;
      if (data.timestamp - curData.timestamp > MAP[type]) {
        chart.updateData(data);
        flag = 0;
      } else {
        const lastData = curDataList[curDataList.length - 1];
        const newLastData = {...lastData, low: Math.min(lastData.low, data.low), close: data.close, high: Math.min(lastData.high, data.high), volume: lastData.volume + data.volume};
        console.log(lastData.open, newLastData.open, newLastData, lastData);
        chart.updateData(newLastData);
      }
      origin.push(data);
    }, 1000);

    return () => clearInterval(id);
  }, [])

  return (
    <>
        <div style={{width: '800px', height: '400px', margin: '30px auto'}} id='app' className="App">
        </div>
        <button onClick={() => handleClick('1m')}>1m</button>
        <button onClick={() => handleClick('5m')}>5m</button>
        <button onClick={() => handleClick('15m')}>15m</button>
        <button onClick={() => handleClick('1h')}>1h</button>
        <button onClick={() => handleClick('1d')}>1d</button>
    </>
   
  );
}

export default App;
