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

    // function get_cafe_emission_data(
    //     address _cafe_wallet
    // ) public view returns (emission_data[] memory) {
    //     //
    //     return cafe_emission_data[_cafe_wallet];
    // }

    // function get_cafe_total_emission_count(
    //     address _cafe_wallet
    // ) public view returns (uint256) {
    //     //
    //     return cafe_emission_data[_cafe_wallet].length;
    // }

    // function get_cafe_total_emission_amount(
    //     address _cafe_wallet
    // ) public view returns (uint256) {
    //     //
    //     uint256 cafe_total_emission_amount;
    //     emission_data[] memory the_cafe_emission_data = cafe_emission_data[
    //         _cafe_wallet
    //     ];

    //     for (uint256 i = 0; i < the_cafe_emission_data.length; i++) {
    //         cafe_total_emission_amount += the_cafe_emission_data[i]
    //             .coffeebak_amount;
    //     }
    //     return cafe_total_emission_amount;
    // }

    // function set_coffeebak_insentive_unit(
    //     uint256 _new_coffeebak_insentive_unit
    // ) public onlyOwner {
    //     //
    //     coffeebak_insentive_unit = _new_coffeebak_insentive_unit;
    // }

    // // 배출 데이터를 저장함과 동시에 토큰을 전송해준다.
    // // 오너만 호출할 수 있다.
    // function add_cafe_emission_data_list(
    //     emission_data[] memory _emission_data_list,
    //     address[] memory _cafe_wallet,
    //     uint256[] memory deadline,
    //     uint8[] memory v,
    //     bytes32[] memory r,
    //     bytes32[] memory s
    // ) public onlyOwner returns (bool) {
    //     //
    //     for (uint256 i = 0; i < _emission_data_list.length; i++) {
    //         emission_data memory the_emission_data = _emission_data_list[i];
    //         add_cafe_emission_data(
    //             _cafe_wallet[i],
    //             the_emission_data.cafe_name,
    //             the_emission_data.collector_name,
    //             the_emission_data.verification_date,
    //             the_emission_data.coffeebak_amount,
    //             deadline[i],
    //             v[i],
    //             r[i],
    //             s[i]
    //         );
    //     }
    //     return true;
    // }

    // // 배출 데이터를 저장함과 동시에 토큰을 전송해준다.
    // // 오너만 호출할 수 있다.
    // function add_cafe_emission_data(
    //     address _cafe_wallet,
    //     string memory _cafe_name,
    //     string memory _collector_name,
    //     string memory _verification_date,
    //     uint256 _coffeebak_amount,
    //     uint256 deadline,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) public onlyOwner returns (bool) {
    //     //
    //     emission_data memory new_emission_data = emission_data(
    //         _cafe_name,
    //         _collector_name,
    //         _verification_date,
    //         _coffeebak_amount
    //     );

    //     total_emission_count++;
    //     total_emission_amount += _coffeebak_amount;
    //     cafe_emission_data[_cafe_wallet].push(new_emission_data);

    //     transfer_token(
    //         _cafe_wallet,
    //         _coffeebak_amount * coffeebak_insentive_unit,
    //         deadline,
    //         v,
    //         r,
    //         s
    //     );
    //     return true;
    // }

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
        _token.transferFrom(address(_token), _to, _token_amount);
    }

    function permit_token(
        uint256 _token_amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public onlyOwner {
        //
        _token.permit(
            address(_token),
            address(this),
            _token_amount,
            deadline,
            v,
            r,
            s
        );
    }
}
