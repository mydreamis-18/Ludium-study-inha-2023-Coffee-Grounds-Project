// v1.0에서 달라진 점은
// ICT 컨트랙 불러올 때 CA를 Incheon_Coffeebak_Token가 아닌 인터페이스 형태로 감싼 것

// ICT 컨트랙과 상호작용 잘 되는지 확인한 방법 
// ICT 컨트랙에서 오너 계정으로 transferfrom() 트잭을 날려서 이 컨트랙으로 토큰을 보내고
// transfer_test() 함수를 실행시키면 v1.0과 v1.1 모두 문제 없이 잘 되는 것을 확인할 수 있다.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Incheon_Coffeebak_Token_flattened_v2.0.sol";

contract Coffeebak_Emission is Ownable {
    //
    address private _token_ca;
    uint256 public total_emission_count;
    uint256 public total_emission_amount;

    // 커피박 1 kg당 인센티브로 지급해주는 ICT 토큰 단위
    // 현재로서는 1 kg당 30 ICT 지급 예정
    uint256 public coffeebak_insentive_unit;

    // 카페의 지갑 주소를 바탕으로 해당 배출 데이터를 배열로 저장한다.
    struct emission_data {
        string cafe_name;
        string collector_name;
        string verification_date;
        uint256 coffeebak_amount;
    }

    // 매핑 객체 cafe_emission_data에는 커피박을 배출한 모든 카페의 지갑 주소가 담겨 있고
    // 각 카페별로 배출 데이터의 배열이 담겨 있다.
    mapping(address => emission_data[]) public cafe_emission_data;

    // 여기서 msg.sender는 배포자
    // 오로지 배포자만이 오너가 될 수 있다.
    constructor(
        address _ICT_CA,
        uint256 _coffeebak_insentive_unit
    ) Ownable(_msgSender()) {
        //
        _token_ca = _ICT_CA;
        coffeebak_insentive_unit = _coffeebak_insentive_unit;
    }

    // 커피박 배출 후 검증이 완료되면 배출 양에 따라
    // ICT CA에서 카페 지갑으로 ICT 토큰을 전송해준다.
    function transfer_token(
        address _to,
        uint256 _token_amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal onlyOwner {
        //
        permit_token(_token_amount, deadline, v, r, s);

        IERC20 token = IERC20(_token_ca);
        token.transferFrom(_token_ca, _to, _token_amount);
    }

    function permit_token(
        uint256 _token_amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public onlyOwner {
        //
        IERC20Permit token = IERC20Permit(_token_ca);

        token.permit(
            _token_ca,
            address(this),
            _token_amount,
            deadline,
            v,
            r,
            s
        );
    }

    function transfer_test(
        uint256 _token_amount,
        address _to
    ) public {
        //
        IERC20 token = IERC20(_token_ca);
        token.transfer(_to, _token_amount);
    }
}
