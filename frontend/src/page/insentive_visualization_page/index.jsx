// 8_MY_PAGE_CAFE_INSENTIVE

import {
    Outcontainer_green1, Outcontainer_beige1, Outcontainer_green2, Outcontainer_beige2, Outcontainer_green3,
    Token_cha, Emission_weight, Decreased_cost, Dec_carbon, Dec_cost, Dec_cost2
} from "./style";
import { useNavigate } from "react-router";


const Insentive_visualization_page = () => {
    //

    const nav = useNavigate();


    // 블록체인 통신 예정
    const total_token_amount = 131;


    // 백 통신 예정
    const total_emission_amount = 1000;


    return (
        <>


            <div onClick={() => nav("/insentive/token")}>
                <Token_cha>지급받은 총 토큰</Token_cha>
                <Outcontainer_green1>

                    <span>{total_token_amount}token</span>

                </Outcontainer_green1>
            </div>


            <div>
                <span><Emission_weight>배출 총량</Emission_weight></span>
                <Outcontainer_beige1>

                    <span>{total_emission_amount}kg</span>
                </Outcontainer_beige1>
            </div>


            <div>
                <span><Decreased_cost>쓰레기 봉투 절감 비용</Decreased_cost></span>
                <Outcontainer_green2>

                    <span>{parseInt(total_emission_amount / 20) * 620}원</span>
                </Outcontainer_green2>
            </div>


            <div>
                <span><Dec_carbon>감소한 탄소 배출량</Dec_carbon></span>
                <Outcontainer_beige2>

                    <span>"계산식 필요"</span>
                </Outcontainer_beige2>
            </div>


            <div>
                <span><Dec_cost>감소한 </Dec_cost></span>

                <span> <Dec_cost2> 매립비용</Dec_cost2>
                </span>

                <Outcontainer_green3>

                    <span>{total_emission_amount * 100}원</span>
                </Outcontainer_green3>
            </div>
        </>
    )
}


export default Insentive_visualization_page;