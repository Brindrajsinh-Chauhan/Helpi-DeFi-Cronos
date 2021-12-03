import Web3 from 'web3'
//import { newKitFromWeb3 } from '@celo/contractkit';
//import BigNumber from "bignumber.js";
import Token from 'abis/IERC20Token.json'
import CELOToken from 'abis/IERC20Token.json'
import Tokenaddress from '../tokenaddress.json';
const ERC20_DECIMALS = 18
let kit;

let loadContract = async function (contractABI, contractAddress) {
    const provider = await new Web3.providers.HttpProvider(Tokenaddress["CRONOS_PROVIDER"])
    const web3 = new Web3(provider);

    let contract = new web3.eth.Contract(contractABI, contractAddress);
    return contract;
};

let formatBalance = async function (balance) {
    let Balance = web3.utils.fromWei(balance, 'Ether')
    Balance = Balance.toFixed(2)
    return Balance;
};


let loadTokens = async function (tokenAddress ,account, contractAddress) {
    const provider = await new Web3.providers.HttpProvider(Tokenaddress["CRONOS_PROVIDER"])
    const web3 = new Web3(provider);

    let contract = new web3.eth.Contract(Token.abi, tokenAddress);
    let accountBalance = await contract.methods.balanceOf(account).call()
    let contractBalance = await contract.methods.balanceOf(contractAddress).call()
    accountBalance = web3.utils.fromWei(accountBalance, 'Ether')
    accountBalance = accountBalance.toFixed(2)
    contractBalance = web3.utils.fromWei(contractBalance, 'Ether')
    contractBalance = contractBalance.toFixed(2)
    return {contract: contract, accountBalance: accountBalance, contractBalance: contractBalance};

};

export {loadTokens};
export {loadContract};
export {formatBalance};
