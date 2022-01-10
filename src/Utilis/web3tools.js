import Web3 from 'web3'
import networks from '../networks.json';
let support_network = ["339", "44787", "1"];

let loadweb3 = async function () {

    window.web3 = new Web3(window.web3.currentProvider)
    const web3 = window.web3

    return web3;
};

let isSupported = async function (network) {

    let value = false
    if (support_network.includes(network)){
        value = true
    }
    return value;
};

let changeNetwork = async function (ID) {

    window.web3 = new Web3(window.web3.currentProvider)
    const web3 = window.web3
    try{
    await web3.currentProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: ID}]
    })
    console.log("Network changed")
    }catch (error){
    if(error.code == 4902){
    console.log(networks[ID].rpcUrl)
        await web3.currentProvider.request
        ({
        method: 'wallet_addEthereumChain',
        params: [{
        chainId: ID,
        chainName: networks[ID].chainName,
        rpcUrls: [networks[ID].rpcUrl],
        nativeCurrency:{symbol: networks[ID].nativeCurrency.symbol, decimals: 18}
        }]
        })
        console.log("Network Added")
        }
    else
        {
        console.log("Error", error)
        }
    }
};

export {changeNetwork};
export {isSupported};
export {loadweb3};