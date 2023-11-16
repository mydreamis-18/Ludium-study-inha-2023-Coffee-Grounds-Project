const { ethers } = require("ethers");
const { get_ca_fn } = require("../deploy");
const { get_read_only_contract_fn, get_contract_fn } = require("./index");
const { get_infura_provider_fn } = require("../create_wallet_ethers_v5.7.2");


(async () => {
    //
    
    const fileName = "Coffeebak_Emission_v2.0";


    const api_key = process.env.JIWON_API_KEY;
    const private_key = process.env.JIWON_PRIVATE_KEY;
    const provider = get_infura_provider_fn(api_key);
    const wallet = new ethers.Wallet(private_key, provider);


    const ca = get_ca_fn(fileName);
    const contract = await get_contract_fn(fileName);


    const domain = {
        name: "Coffeebak_Emission",
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


    const ict_file_name = "Incheon_Coffeebak_Token_flattened_v2.0";
    const ict_contract = await get_contract_fn(ict_file_name);
    const ict_read_only_contract = await get_read_only_contract_fn(ict_file_name);


    const owner = get_ca_fn("Incheon_Coffeebak_Token_flattened_v2.0");
    const spender = "0x7d547B43a6514ff4470746312AA87e7cDedB3dF2";
    const value = 1000;
    const nonce = await ict_contract.nonces(owner);
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
    
    
    console.log(deadline);
    console.log(nonce);
    console.log(v);
    console.log(r);
    console.log(s);


    // const cafe_wallet = "0x7d547B43a6514ff4470746312AA87e7cDedB3dF2";
    // const tx = await contract.add_cafe_emission_data(cafe_wallet, "지원이네", "지원", "2023-10-30", 100, deadline, v, r, s, { gasLimit: 100000 })
    const tx = await contract.permit_token(1000, deadline, v, r, s, { gasLimit: 100000 })


    // 가스비 에러 발생
    // 'cannot estimate gas; transaction may fail or may require manual gas limit'

    
    const receipt = await tx.wait();
    console.log(receipt);
})();

