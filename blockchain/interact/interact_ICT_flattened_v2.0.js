// Problem
// 폴리곤 테스트 네트워크인 뭄바이를 사용해야 하는데 그러려면 solc 컴파일러 버전은 v0.8.19 이하여야 함
// 오픈 재플린 위자드 통해서 만든 컨트랙트는 다 v0.8.20 버전임
// 리믹스에서 v0.8.19 버전 선택 시 에러 발생함
// 모든 컨트랙트의 컴파일 버전을 v0.8.20에서 v0.8.19로 바꿔도 순식간에 다시 돌아가여 에러를 해결할 수 없음
// 혹시 몰라서 오픈 제플린 다운그레이드 해보았지만 동일함
// solc 컴파일러 사용 시 아래와 같은 에러 발생함
// C:\Ludium-study-inha-2023-Coffee-Grounds-Project\blockchain\compile\index.js:50
// const bytecode = compiledCode.contracts[fileName][contractName].evm.bytecode.object;
// TypeError: Cannot read properties of undefined (reading 'Incheon_Coffeebak_Token')


// Solution
// 리믹스에서 일단 최신 버전 컴파일러로 컴파일 후
// flatten 진행하고
// 컨트랙트 속 모든 버전 변경 후
// 리믹스에서 내 메타마스크 지갑으로 연결해서 배포하거나
// abi, bytecode 값을 vscode에 하드 코딩으로 복붙한 다음 ethers로 배포하고
// ca 값을 복붙한 다음 인터랙트 하면 성공됨


const { ethers } = require("ethers");
const { get_ca_fn } = require("../deploy");
const { get_read_only_contract_fn, get_contract_fn } = require("./index");
const { get_infura_provider_fn } = require("../create_wallet_ethers_v5.7.2");


(async () => {
    //
    
    const fileName = "Incheon_Coffeebak_Token_flattened_v2.0";


    // const read_only_contract = await get_read_only_contract_fn(fileName);
    // const contract_owner = await read_only_contract.owner();
    // console.log(contract_owner);


    const api_key = process.env.JIWON_API_KEY;
    const private_key = process.env.JIWON_PRIVATE_KEY;
    const provider = get_infura_provider_fn(api_key);
    const wallet = new ethers.Wallet(private_key, provider);


    const ca = get_ca_fn(fileName);
    const contract = await get_contract_fn(fileName);


    const domain = {
        name: "Incheon_Coffeebak_Token",
        version: "1",
        chainId: 80001,
        verifyingContract: ca,
    }


    const types = [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
    ]


    const owner = wallet.address;
    const spender = ca;
    const value = 1;
    const nonce = await contract.nonces(owner);
    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24;


    const values = {
        owner,
        spender,
        value,
        nonce,
        deadline,
    }


    const signature = await wallet._signTypedData(domain, { Permit: types }, values);
    const { v, r, s } = ethers.utils.splitSignature(signature);
    const tx = await contract.permit(owner, spender, value, deadline, v, r, s, { gasLimit: 1000000 });


    const receipt = await tx.wait();
    console.log(receipt);
})();

