import React from 'react';
import './App.css';
import styled from 'styled-components';

import ChartContainer from './component/chart/Chart';
import HeaderWrapper from './component/data24/header24data';
import RightContainer from './component/body-right/index';

function App() {

  return (
    <>
        <Header>
            Header
        </Header>
        <Body>
          <BodyLeft>
            <LeftHeader>
              <LeftHeaderNameContainer>
                BTC/USD
              </LeftHeaderNameContainer>
              <HeaderWrapper/>
            </LeftHeader>
            <ChartContainer/>
          </BodyLeft>
          <RightContainer/>
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

const LeftHeaderNameContainer = styled.div`
  padding: 0 .3rem;
  box-sizing: border-box;
  width: fit-content;
`






export default App;
