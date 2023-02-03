const M1 = 60 * 1000;

const MAP = {
  '1m': M1,
  '5m': M1 * 5,
  '15m': M1 * 15,
  '1h': M1 * 60,
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


export { transformData, MAP } ;
