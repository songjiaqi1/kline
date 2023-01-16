import React, {useCallback, useEffect, useMemo, useState, useRef, useLayoutEffect} from 'react';
import kline  from '../klinechart';
import generatedKLineDataList from "../utils/generatedKLineDataList";
import moment from 'moment';
import obj from '../utils/obj';
import styled from "styled-components";

const TOOL_ITEMS = [
    {type: 'time', value: '1m', name: '1m'},
    {type: 'time', value: '5m', name: '5m'},
    {type: 'time', value: '15m', name: '15m'},
    {type: 'time', value: '1h', name: '1h'},
    {type: 'time', value: '1d', name: '1d'},
    {type: 'chart_type', value: 'candle_solid', name: 'candle'},
    {type: 'chart_type', value: 'area', name: 'area line'},
    {type: 'indicators', value: 'indicators', name: 'indicators'}
];

const TOOL_ITEMS2 = [
    {type: 'full', name: 'full screen'},
    {type: 'screen_shoot', name: 'screen shoot'},
];

const indicator = {
  name: 'MA1',
  shortName: 'MA1',
  series: 'price',
  calcParams: [5],
  precision: 2,
  shouldCheckParamCount: false,
  shouldOhlc: true,
  plots: [
    { key: 'ma5', title: 'MA5: ', type: 'line' },
  ],
  regeneratePlots: (params) => {
    return params.map(p => {
      return { key: `ma${p}`, title: `MA${p}: `, type: 'line' }
    })
  },
  calcTechnicalIndicator: (dataList, { params, plots }) => {
    const closeSums = []
    return dataList.map((kLineData, i) => {
      const ma = {}
      const close = kLineData.close
      params.forEach((p, index) => {
        closeSums[index] = (closeSums[index] || 0) + close
        if (i >= p - 1) {
          ma[plots[index].key] = closeSums[index] / p
          closeSums[index] -= dataList[i - (p - 1)].close
        }
      })
      if (kLineData.high) {
        ma.ma5 = kLineData.high;
      }      
      return ma
    })
  },
  render: ({
    ctx,
    dataSource,
    viewport,
    styles,
    xAxis,
    yAxis
  }) => {
    console.log(yAxis);
  }
}

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

const themes = [
  { key: 'dark', text: '深色' },
  { key: 'light', text: '浅色' }
]

const textColorDark = '#929AA5'
const gridColorDark = '#292929'
const axisLineColorDark = '#333333'
const crossTextBackgroundColorDark = '#373a40'

const textColorLight = '#76808F'
const gridColorLight = '#ededed'
const axisLineColorLight = '#DDDDDD'
const crossTextBackgroundColorLight = '#686d76'
function getThemeOptions (theme) {
  const textColor = theme === 'dark' ? textColorDark : textColorLight
  const gridColor = theme === 'dark' ? gridColorDark : gridColorLight
  const axisLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
  const crossLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
  const crossTextBackgroundColor = theme === 'dark' ? crossTextBackgroundColorDark : crossTextBackgroundColorLight
  return {
    grid: {
      horizontal: {
        color: gridColor
      },
      vertical: {
        color: gridColor
      }
    },
    candle: {
      priceMark: {
        high: {
          color: textColor
        },
        low: {
          color: textColor
        }
      },
      tooltip: {
        text: {
          color: textColor
        }
      }
    },
    technicalIndicator: {
      tooltip: {
        text: {
          color: textColor
        }
      }
    },
    xAxis: {
      axisLine: {
        color: axisLineColor
      },
      tickLine: {
        color: axisLineColor
      },
      tickText: {
        color: textColor
      }
    },
    yAxis: {
      axisLine: {
        color: axisLineColor
      },
      tickLine: {
        color: axisLineColor
      },
      tickText: {
        color: textColor
      }
    },
    separator: {
      color: axisLineColor
    },
    crosshair: {
      horizontal: {
        line: {
          color: crossLineColor
        },
        text: {
          backgroundColor: crossTextBackgroundColor
        }
      },
      vertical: {
        line: {
          color: crossLineColor
        },
        text: {
          backgroundColor: crossTextBackgroundColor
        }
      }
    }
  }
}


const ChartWrapper = () => {
  let origin;
  const chart = useRef();
  let chartContainerRef = useRef(null);

  useEffect(() => {
    chart.current = kline.init(`app`);
    kline.extension.addTechnicalIndicatorTemplate([
      indicator
    ])
    let list = generatedKLineDataList(Date.now(), 5000, 5000);
    list.forEach((item, index) => {
      item.timestamp = moment('2022-11-01 00:01').add(index, 'm').valueOf();
    });
    origin = list;
    chart.current.applyNewData(list);

    const op = getThemeOptions('dark');
    op.candle.tooltip.labels = ['T: ', 'O: ', 'C: ', 'H: ', 'L: ', 'V: '];
    chart.current.setStyleOptions(op);
    return () => {
      kline.dispose('app');
    }
  }, []);

  const [type, setType] = useState('1m');


  const handleClick = useCallback((item) => {
    if (item.type === 'time') {
      setType(item.value);
      const newData = transformData(origin, item.value);
      chart.current.clearData();
      chart.current.applyNewData(newData);
    }

    if (item.type === 'chart_type') {
      chart.current.setStyleOptions({
        candle: {
          type: item.value
        }})
    }
  }, []);
  const handleClick2 = useCallback((item) => {
    if (item.type === 'full') {
      chart.current._chartPane._container.requestFullscreen().then(() => {
        setTimeout(() => {
          chart.current.resize();
        }, 1000)
      });
      return;
    }
    // 截屏
    const url = chart.current.getConvertPictureUrl(false, 'png', '#000000');
    const a = document.createElement('a');
    a.href = url;
    a.download = `image.png`;
    a.click();
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      const observer = new ResizeObserver( entries => {
        chart.current.resize();
      });
      observer.observe(chart.current._chartPane._container);
    }, 10);
  }, []);


  let flag = 0;
  useEffect(() => {
    const id = setInterval(() => {
      const data = generatedKLineDataList(Date.now(), 5000, 1)[0];
      const curDataList = chart.current.getDataList();
      const curData = curDataList[curDataList.length - 1];
      flag++;
      data.timestamp = curData.timestamp + 5000 * flag;
      if (data.timestamp - curData.timestamp > MAP[type]) {
        chart.current.updateData(data);
        flag = 0;
      } else {
        const lastData = curDataList[curDataList.length - 1];
        const newLastData = {...lastData, low: Math.min(lastData.low, data.low), close: data.close, high: Math.max(lastData.high, data.high), volume: lastData.volume + data.volume};
        chart.current.updateData(newLastData);
      }
      origin.push(data);
    }, 1000);

    return () => clearInterval(id);
  }, [])

  // const [showTopLine, setShowTopLine] = useState(false);
  // const handleClickTopLine = useCallback(() => {
  //   setShowTopLine(!setShowTopLine);
  // }, [showTopLine]);
  //
  // const addMa = () => {
  //   chart.createTechnicalIndicator('MA1', false, { id: 'candle_pane' })
  // }


  return (
    <ChartContainer>
        <ChartToolBar>
          <ToolItemsWrapper key={'ToolItemsWrapper1'}>
            {
              TOOL_ITEMS.map((item) => {
                return <ToolItem onClick={() => handleClick(item)} key={item.name}>{item.name}</ToolItem>
              })
            }
          </ToolItemsWrapper>
          <ToolItemsWrapper key={'ToolItemsWrapper2'}>
            {
              TOOL_ITEMS2.map((item) => {
                return <ToolItem onClick={() => handleClick2(item)} key={item.name}>{item.name}</ToolItem>
              })
            }
          </ToolItemsWrapper>
        </ChartToolBar>
        <div ref={ref => chartContainerRef = ref} style={{width: '100%', height: '4rem', margin: ''}} id='app' className="App"></div>
    </ChartContainer>
  
  );
}


const ChartContainer = styled.div`
  background-color: #161618;
  width: 100%;
  height: 6rem;
`

const ChartToolBar = styled.div`
  height: .32rem;
  width: 100%;
  display: flex;
  padding: .03rem;
  box-sizing: border-box;
  justify-content: space-between;
`

const ToolItemsWrapper = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  
`

const ToolItem = styled.div`
  width: fit-content;
  height: 100%;
  font-size: .16rem;
  color: #FFF;
  padding: 0 .03rem;
  margin-right: .1rem;
  box-sizing: border-box;
  cursor: pointer;
  //line-height: 100%;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #282c34;
  }
`
export default ChartWrapper;
