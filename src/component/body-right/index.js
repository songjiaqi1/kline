import React, { useState } from "react"
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RightContainer = () => {
  const [selectedType, setSelectedType] = useState(0);
  return <BodyRight>
    <RightHeader>
      <RightHeaderItem onClick={() => setSelectedType(0)} isSelected={selectedType === 0}>
        LONG
      </RightHeaderItem>
      <RightHeaderItem onClick={() => setSelectedType(1)} isSelected={selectedType === 1}>
        SHORT
      </RightHeaderItem>
      <RightHeaderItem onClick={() => setSelectedType(2)} isSelected={selectedType === 2}>
        SWAP
      </RightHeaderItem>
    </RightHeader>
    <OrderTypeContainer>
      <OrderTypeLeft>
        <OrderTypeItemsHeader>order type</OrderTypeItemsHeader>
        <OrderTypeItems>Limit order</OrderTypeItems>
      </OrderTypeLeft>
      <OrderTypeRight>
        <OrderTypeItemsHeader>order type</OrderTypeItemsHeader>
        <OrderTypeValue/>
      </OrderTypeRight>
    </OrderTypeContainer>
    <ValueItem>
      <ValueItemHeader>
        <span>pay</span>
        <span>balance</span>
      </ValueItemHeader>
      <ValueWrapper>
        <ValueLeft>
          <OrderTypeValue/>
          <ValueRight>USDT</ValueRight>
        </ValueLeft>
      </ValueWrapper>
      <Line/>
      <ValueItemHeader>
        {/* <span>pay</span> */}
        <span>position size</span>
      </ValueItemHeader>
      <ValueWrapper>
        <ValueLeft>
          <OrderTypeValue/>
          <ValueRight>BTC</ValueRight>
        </ValueLeft>
      </ValueWrapper>
    </ValueItem>
    <SliderContainer>
      <ValueItemHeader>Leverage</ValueItemHeader>
      <Slider/>
    </SliderContainer>
    <DetailWrapper>
      <DetailItem>
        <DetailItemLeft>Collateral Asset</DetailItemLeft>
        <DetailItemRight>BTC</DetailItemRight>
      </DetailItem>
      <DetailItem>
        <DetailItemLeft>Collateral Value</DetailItemLeft>
        <DetailItemRight>--</DetailItemRight>
      </DetailItem>
      <DetailItem>
        <DetailItemLeft>Leverage</DetailItemLeft>
        <DetailItemRight>--</DetailItemRight>
      </DetailItem>
      <DetailItem>
        <DetailItemLeft>Entry Price</DetailItemLeft>
        <DetailItemRight>$20,827.14</DetailItemRight>
      </DetailItem>
      <DetailItem>
        <DetailItemLeft>Liquidation Price</DetailItemLeft>
        <DetailItemRight>--</DetailItemRight>
      </DetailItem>
    </DetailWrapper>
  </BodyRight>
};

export default RightContainer;

const BodyRight = styled.div`
  width: 4rem;
  min-height: 5rem;
  background-color: rgb(41, 41, 44);
  padding: 0.15rem;
`

const RightHeader = styled.div`
  width: 100%;
  height: .4rem;
  display: flex;
`

const RightHeaderItem = styled.div`
  flex: 1 1 auto;
  height: .4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .16rem;
  background-color: ${props => props.isSelected ? 'rgb(41, 41, 44)' : 'rgb(54, 54, 54)'};
  color: ${props => props.isSelected ? 'rgb(255, 179, 19);' : 'rgb(185, 185, 185)'};
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: rgb(41, 41, 44);
  }
`

const OrderTypeContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: row;
  padding-top: .14rem;
  justify-content: space-between;
`

const OrderTypeLeft = styled.div`
  width: 1rem;
`

const OrderTypeRight = styled.div`
  display: flex;
  flex-direction: column;
`

const OrderTypeItems = styled.div`
  font-size: 0.13rem;
  color: #fff;
  border: 1px solid rgb(54, 54, 54);
  padding: .10rem;
  height: .45rem;
  border-radius: .10rem;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  margin-right: .1rem;
`;

const OrderTypeItemsHeader = styled.div`
  font-size: .14rem;
  color: #fff;
  margin-bottom: .1rem;
`

const OrderTypeValue = styled.input`
  width: 100%;
  outline: none;
  margin: 0px;
  font-size: .16rem;
  color: rgb(255, 255, 255);
  line-height: .24rem;
  background-color: rgb(24, 24, 26);
  border: none;
  border-radius: .10rem;
  height: .45rem;
  padding: .10rem .15rem;
  font-weight: 600;
  font-family: inherit;
  box-sizing: border-box;
`

const ValueItem = styled.div`
  width: 100%;
  margin-top: 0.2rem;
`

const ValueItemHeader = styled.div`
  font-size: .13rem;
  color: #fff;
  margin-bottom: .1rem;
  display: flex;
  justify-content: space-between;
`;

const ValueWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  -webkit-box-align: center;
  align-items: center;
  border-radius: .10rem;
  border: 1px solid rgb(24, 24, 26);
  background-color: rgb(24, 24, 26);
  padding-right: .15rem;
`;

const ValueLeft = styled.div`
  border: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  border-radius: .10rem;
  background-color: rgb(24, 24, 26);
  padding: 0px .15rem;
`;

const ValueRight = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: .14rem;
  font-weight: 500;
  color: rgb(255, 255, 255);
  padding: 0 .1rem;
`;

const Line = styled.div`
  width: 100%;
  height: 0rem;
  border-bottom: 1px solid #aaa;
  margin: .2rem 0;
`

const SliderContainer = styled.div`
  margin-top: .15rem;
`

const DetailWrapper = styled.div`
  margin-top: .1rem;
`

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: .13rem;
  margin-bottom: .15rem;
`

const DetailItemLeft = styled.div`
  color: #fff;
`
const DetailItemRight = styled.div`
  color: #bbb;
`