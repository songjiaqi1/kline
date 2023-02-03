import { useState, useEffect } from "react";
import styled from 'styled-components';

const HeaderWrapper = (params) => {
  const [datas24, setDatas24] = useState({price: '--', change: 0, low: '--', high: '--'});
  useEffect(() => {

    
    setInterval(() => {
      const trend = 50 - Number((Math.random() * 100).toFixed(2));
      setDatas24({price: 1500 + trend, change: (trend/1500) * 100 , low: 1500, high: 1800 });
    }, 2000);
  }, []);

  return (
    <LeftHeader24Data>
      <Data24Item>{datas24.price}</Data24Item>
      <Data24Item>
        <Data24ItemTop>24h Change</Data24ItemTop>
        <Data24ItemBottom color={datas24.change > 0 ? 'green' : 'red'}>{`${datas24.change.toFixed(2)}%`}</Data24ItemBottom>
      </Data24Item>
      <Data24Item>
        <Data24ItemTop>{"24h Low"}</Data24ItemTop>
        <Data24ItemBottom>{datas24.low}</Data24ItemBottom>
      </Data24Item>
      <Data24Item>
        <Data24ItemTop>{"24h High"}</Data24ItemTop>
        <Data24ItemBottom>{datas24.high}</Data24ItemBottom>
      </Data24Item>
    </LeftHeader24Data>
  );
};

const LeftHeader24Data = styled.div`
  flex: 1 1 auto;
  height: 100%;
  overflow-x: auto;
  padding: 0.1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
`

const Data24Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: .2rem;
  align-items: center;
  justify-content: space-between;
  font-size: .20rem;
  min-width: .86rem;
`

const Data24ItemTop = styled.div`
  font-size: .14rem;
  color: #aaaaaa;
`


const Data24ItemBottom = styled.div`
  font-size: .2rem;
  color: ${props => props.color || '#fff'}
`

export default HeaderWrapper;
