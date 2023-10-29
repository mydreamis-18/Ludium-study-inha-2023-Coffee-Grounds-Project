// 14_COLLECTION_ONCHAIN
import Small_title2_component from "../../component/small_title2_component";
import { Span_pageNumLeftDirectionBtn, Span_pageNumBtn,Span_pageNumRightDirectionBtn } from "./style";
import List_component from "../../component/list_component";
import { complete_reward } from "../../redux/middleware";
import { MAROON_COLOR_1 } from "../../base_style";
import { useState, useEffect } from "react";
import { Button_3 } from "../../base_style";
import { useNavigate } from "react-router";

const Collection_onchain_page = () => {
  //

  const nav = useNavigate();

  // 10개씩 보여주기
  const page_unit = 7;

  // 페이지네이션 넘버는 5개만 보여주기
  const page_number_unit = 5;

  const [total_page_count, set_total_page_count] = useState(0);
  const [collection_choice, set_collection_choice] = useState();
  const [current_page_number, set_current_page_number] = useState(0);

  const [collection_list, set_collection_list] = useState(new Array());

  // 수거 페이지 접속 시 백과 통신하여 수거 목록 조회
  useEffect(() => {
    //

    // 총 페이지 수를 구하는 함수 (데이터가 131개일 경우 14 페이지)
    const get_new_total_page_count_fn = (new_collection_list) => {
      //

      const page_count_temp = new_collection_list.length / page_unit;
      const isInt = page_count_temp === parseInt(page_count_temp);
      if (!isInt) {
        return parseInt(page_count_temp) + 1;
      }

      return page_count_temp;
    };

    // 백 연결 전 더미 데이터를 형성하는 함수
    const use_dummy_data_fn = () => {
      // 백 응답 결과 (리덕스 X)

      // 여기에 액션 날리면 됩니다.
      const new_collection_list = Array.from({ length: 131 }, (v, i) => {
        return {
          record_id: `UUID_CAFFEINE_ADDICTION_${i}`,
          reward_status: "보상완료",
          updated_at: new Date(),
          coffee_amount: 100,
          coffee_status: "곰팡이",
        };
      });

      set_current_page_number(1);
      set_collection_list(new_collection_list);
      set_total_page_count(get_new_total_page_count_fn(new_collection_list));
    };

    // 백 통신 함수

    const complete_reward_data = async () => {
      try {
        console.log("수거완료 목록 실행");
        const result = await complete_reward(); // 이 부분에서 백과 통신하고 결과를 가져옵니다.

        console.log(result);
        // 지훈아 예외 처리의 중요성
        // 백에 데이터가 없을 경우 null이 반환될 수 있음
        // 이러한 예외 처리는 백에서 해주는 것도 좋겠지?
        if (!result.data) {
          use_dummy_data_fn();
          return;
        }

        set_current_page_number(1);
        set_collection_list(result.data); // 가져온 결과로 상태를 업데이트합니다.\
        set_total_page_count(get_new_total_page_count_fn(result.data));
      } catch (error) {
        console.error("Error fetching collector collections:", error);
        use_dummy_data_fn();
      }
    };

    complete_reward_data();
  }, []);

  const plus_current_page_number_button_fn = () => {
    //

    // 마지막 페이지일 경우 예외 처리
    if (current_page_number >= total_page_count) {
      alert("마지막 페이지입니다.");
      return;
    }

    set_current_page_number((v) => v + 1);
  };

  const minus_current_page_number_button_fn = () => {
    //

    // 최초 페이지일 경우 예외 처리
    if (current_page_number <= 1) {
      alert("첫 페이지입니다.");
      return;
    }

    set_current_page_number((v) => v - 1);
  };

  return (
    <>
      <Small_title2_component title={"보상 목록"} />

      <List_component
        current_list={collection_list.slice(
          (current_page_number - 1) * page_unit,
          current_page_number * page_unit
        )}
        set_collection_choice={set_collection_choice}
      />

      <div>
        <Span_pageNumLeftDirectionBtn onClick={minus_current_page_number_button_fn}>
          {"<"}
        </Span_pageNumLeftDirectionBtn>

        {/* ㅜ total_page_count가 0이 아닐 때 */}
        {total_page_count &&
          Array.from({ length: page_number_unit }, (v, i) => i).map((v, i) => {
            //

            // 현재 페이지 넘버를 페이지페이션 유닛 5개 중 중앙으로 위치
            const middle_index = parseInt(page_number_unit / 2);

            // 현재 페이지가 3이면 start_index는 1
            let start_index = current_page_number - middle_index;

            // 현재 페이지가 1, 2이면 start_index는 1
            if (current_page_number <= middle_index) {
              start_index = 1;
            }

            // 현재 페이지가 마지막 페이지와 가까워질 경우 start_index 조정
            if (current_page_number + middle_index >= total_page_count) {
              start_index = total_page_count - page_number_unit + 1;
            }

            const page_number = start_index + i;

            // 현재 페이지일 경우
            const is_current_page = page_number === current_page_number;
            const current_page_style = {
              color: MAROON_COLOR_1,
            };

            const default_style = {};

            return (
              <Span_pageNumBtn
                key={`pagination-${page_number}`}
                onClick={() => set_current_page_number(page_number)}
                style={is_current_page ? current_page_style : default_style}
              >
                {" "}
                {page_number}{" "}
              </Span_pageNumBtn>
            );
          })}

        <Span_pageNumRightDirectionBtn onClick={plus_current_page_number_button_fn}>
          {">"}
        </Span_pageNumRightDirectionBtn>
      </div>
    </>
  );
};

export default Collection_onchain_page;
