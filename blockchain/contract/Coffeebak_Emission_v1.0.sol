// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Incheon_Coffeebak_Token_flattened_v2.0.sol";

contract Coffeebak_Emission is Ownable {
    //
    uint256 public total_emission_count;
    uint256 public total_emission_amount;
    Incheon_Coffeebak_Token private _token;

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
        Incheon_Coffeebak_Token _ICT_CA,
        uint256 _coffeebak_insentive_unit
    ) Ownable(_msgSender()) {
        //
        _token = _ICT_CA;
        coffeebak_insentive_unit = _coffeebak_insentive_unit;
    }

    function transfer_test(
        uint256 _token_amount,
        address _to
    ) public {
        //
        _token.transfer(_to, _token_amount);
    }
}
