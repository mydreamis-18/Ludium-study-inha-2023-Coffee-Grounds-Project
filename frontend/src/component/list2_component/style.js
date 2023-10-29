import styled from "styled-components";

export const Big_container= styled.div`

box-sizing: border-box;

position: absolute;
width: 270px;
height: 348px;
left: calc(50% - 270px/2);
top: calc(50% - 348px/2 + 10px);

border: 2px solid rgba(103, 73, 63, 0.7);
border-radius: 30px;

`

//보상 완료 문구
export const Reward_complete = styled.span`

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 143.8%;

text-align: center;
letter-spacing: -0.025em;

color: #0F52BA;

`

//보상 미완료 문구
export const Reward_incomplete = styled.span`

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 143.8%;
/* or 16px */
text-align: center;
letter-spacing: -0.025em;

color: #C00A0A;

`

//다른 문구
export const Other_txt = styled.span`

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 143.8%;
/* or 16px */
text-align: center;
letter-spacing: -0.025em;


color: #67493F;

`

//첫째 문단
export const Paragraph = styled.span`

position: absolute;
width: 216px;
height: 34px;
left: calc(50% - 216px/2 + 2px);
top: calc(50% - 34px/2 - 135px);

`
