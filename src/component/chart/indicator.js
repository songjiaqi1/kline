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

export default indicator;