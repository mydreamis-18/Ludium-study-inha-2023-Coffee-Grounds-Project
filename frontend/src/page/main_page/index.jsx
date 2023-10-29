// 1_MAIN


import { useSelector } from "react-redux";
import { Background_image, High_line, Low_line } from "./style";


const Main_page = () => {
    //

    // 로그인 및 로그아웃 시 테스트용
    const user_state = useSelector((state) => state.user_reducer);
    console.log(user_state);


    return (
        <>
      <Background_image></Background_image>
      <div>
        <High_line>커피 한 잔이</High_line>
        </div>
        <div>
        <Low_line>자원이 될 때까지</Low_line>
      </div>
    </>
    );
};


export default Main_page;