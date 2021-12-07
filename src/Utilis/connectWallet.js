import Web3 from 'web3'
//import { newKitFromWeb3 } from '@celo/contractkit';
import Tokenaddress from '../tokenaddress.json';
let kit;

let connectWallet = async function () {
    try{
      if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      //console.log(window.web3)
      console.log("in the first section")
      }
      else if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        console.log("in the second section")
      }
      else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
        //this.setState({ account: accounts[0] })
        //console.log({account})

    } catch (error) {
        //notification(`⚠️ ${error}.`)
        console.log("Error! -  Acoount connection section");
        console.log({ error });
        //this.setState({ loading: false })
      }

  };

export {connectWallet};