import styled from "styled-components";

export const Div_bigContainer = styled.div`
text-align: center;

font-size: 7vw;
padding: 3% 5% 5% 5%;
margin: 17% 10% 10%;

box-sizing: border-box;

position: absolute;
width: 75vw;
height: 66.25vw;
left: calc(50% - 93vw/2);
top: calc(50% - 66.25vw/2 - 9.38vw);

border: 2px solid rgba(103, 73, 63, 0.7);
border-radius: 30px;
`;

export const Span_el = styled.span`
font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 3.44vw;
line-height: 6.25vw;
color: #67493F;
`;

export const Span_el_request = styled.span`
font-size: 4vw;
font-weight: 400;
color: #0F52BA;
`;

export const Span_el_completed = styled.span`
font-size: 4vw;
font-weight: 400;
color: #C00A0A;
`;

export const Span_el_extra = styled.span`
font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 3.44vw;
line-height: 6.25vw;
color: #09C11B;
`;

export const Input_selectNBtn = styled.input`
appearance: none;
border-radius: 0; 
width: 12px; 
height: 12px; 
border: 1px solid #D2691E; 
margin-right: 3%; 
`;

export const Input_selectYBtn = styled.input`
appearance: none;
border-radius: 0; 
width: 12px; 
height: 12px; 
border: 1px solid #D2691E; 
margin-right: 3%; 

&:checked {
background-color: #D2691E; /* 선택된 라디오 버튼에 배경색을 적용하여 체크 표시를 나타냅니다. */
}
`;

export const Div_totalAmount = styled.span`

position: absolute;
width: 37.5vw;
height: 8.13vw;
left: calc(50% - 37.5vw/2);
top: calc(50% - 8.13vw/2 + 15.31vw);

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 4.38vw;
line-height: 181.3%;
/* identical to box height, or 25px */
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.005em;

color: #67493F;

`;