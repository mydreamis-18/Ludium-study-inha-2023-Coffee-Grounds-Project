import styled from "styled-components";

export const Entire_container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
   
`;

export const DivContainer = styled.div`
  width: 300px;  // 전체 너비에서 양 옆 여백을 고려해 조정
  background-color: #ffffff;  
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); 
  margin: 15px 0;
`;

export const LabelDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  
  label {
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #555;
  }

  input {
    width: 280px;  // 전체 너비에서 양 옆 패딩을 고려해 조정
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  
  label, legend {
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #555;
  }

  input, select {
    width: 280px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const Cafe_name= styled.div`

position: absolute;
width: 17.5vw;
height: 5.63vw;
left: 9.38vw;
top: 52.5vw;

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 500;
font-size: 5vw;
line-height: 5vw;
letter-spacing: 0.11em;

color: #67493F;

`

export const Cafe_container= styled.div`

box-sizing: border-box;

position: absolute;
width: 84.38vw;
height: 11.25vw;
left: 9.38vw;
top: 59.69vw;

background: #FFFFFF;
border: 2px solid rgba(103, 73, 63, 0.7);
border-radius: 60px;

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 500;
font-size: 5vw;
line-height: 5vw;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.11em;
justify-content: center;

color: #67493F;

`

export const Coffee_status=styled.div`

position: absolute;
width: 29.69vw;
height: 5.94vw;
left: 9.38vw;
top: 80.31vw;

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 500;
font-size: 5vw;
line-height: 5vw;
letter-spacing: 0.11em;

color: #67493F;

`

export const Coffee_statuscon= styled.select`

box-sizing: border-box;

position: absolute;
width: 84.38vw;
height: 11.25vw;
left: 9.38vw;
top: 88.44vw;

background: #FFFFFF;
border: 2px solid rgba(103, 73, 63, 0.7);
border-radius: 60px;

`

export const Coffee_weight=styled.div`

position: absolute;
width: 29.69vw;
height: 5.94vw;
left: 9.38vw;
top: 109.06vw;

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 5vw;
line-height: 5vw;
letter-spacing: 0.11em;

color: #67493F;

`

export const Coffee_weightcon=styled.input`

box-sizing: border-box;

position: absolute;
width: 46.88vw;
height: 11.31vw;
left: 9.69vw;
top: 116.19vw;

background: #FFFFFF;
border: 2px solid rgba(103, 73, 63, 0.7);
border-radius: 60px;

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 5vw;
line-height: 5vw;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.11em;

color: #67493F;

`

export const KG=styled.div`

position: absolute;
width: 17.19vw;
height: 7.5vw;
left: 55vw;
top: 119.06vw;

font-family: 'Arita-dotum4.0(OTF)';
font-style: normal;
font-weight: 400;
font-size: 5vw;
line-height: 5vw;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.11em;

color: #67493F;

`