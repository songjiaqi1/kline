import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import kline  from './klinechart';
import generatedKLineDataList from "./utils/generatedKLineDataList";
import moment from 'moment';
import obj from './utils/obj';
import styled from 'styled-components';

import ChartContainer from './component/Chart'


function App() {

  return (
    <>
        <Header>
            Header
        </Header>
        <Body>
          <BodyLeft>
            <LeftHeader>
              BTC/USD
            </LeftHeader>
            <ChartContainer>
            </ChartContainer>
          </BodyLeft>
          <BodyRight>
          </BodyRight>
      </Body>
    </>
  );
}


const Header = styled.div`
  height: .56rem;
  width: 100%;
  background-color: rgb(17, 17, 17);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .20rem;
`

const Body = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
`

const BodyLeft = styled.div`
  flex: 1 1 auto;
  background-color: beige;
`

const BodyRight = styled.div`
  width: 4rem;
  min-height: 5rem;
  background-color: rgb(41, 41, 44);
`

const LeftHeader = styled.div`
  width: 100%;
  height: .72rem;
  background-color: rgb(24, 24, 26);
  border-bottom: 1px solid rgb(47, 47, 47);
  border-top: 1px solid rgb(47, 47, 47);
  display: flex;
  color: #fff;
  font-size: .32rem;
  align-items: center;
`






export default App;
