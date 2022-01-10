import Web3 from 'web3'
import {loadweb3} from './web3tools.js';
//import { newKitFromWeb3 } from '@celo/contractkit';
//import BigNumber from "bignumber.js";
import Token from 'abis/IERC20Token.json'
import CELOToken from 'abis/IERC20Token.json'
import Tokenaddress from '../tokenaddress.json';
const ERC20_DECIMALS = 18

let kit;

let loadContract = async function (contractABI, contractAddress) {

    const web3 = await loadweb3()
    let contract = new web3.eth.Contract(contractABI, contractAddress);
    return contract;
};

let formatBalance = async function (balance) {

    const web3 = await loadweb3()
    let Balance = web3.utils.fromWei(balance, 'Ether')
    Balance = parseFloat(Balance)
    Balance = Balance.toFixed(2)
    return Balance;
};


let loadTokens = async function (tokenAddress ,account, contractAddress) {

    const web3 = await loadweb3()
    let contract = new web3.eth.Contract(Token.abi, tokenAddress);
    let accountBalance = await contract.methods.balanceOf(account).call()
    let contractBalance = await contract.methods.balanceOf(contractAddress).call()
    accountBalance = web3.utils.fromWei(accountBalance, 'Ether')
    accountBalance = parseFloat(accountBalance)
    accountBalance = accountBalance.toFixed(2)
    contractBalance = web3.utils.fromWei(contractBalance, 'Ether')
    contractBalance = parseFloat(contractBalance)
    contractBalance = contractBalance.toFixed(2)
    return {contract: contract, accountBalance: accountBalance, contractBalance: contractBalance};

};

export {loadTokens};
export {loadContract};
export {formatBalance};
