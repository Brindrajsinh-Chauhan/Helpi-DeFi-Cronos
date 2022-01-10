import Web3 from 'web3'
import {loadweb3} from './web3tools.js';
import { newKitFromWeb3 } from '@celo/contractkit';
import Tokenaddress from '../tokenaddress.json';
let kit;

let connectWallet = async function () {
    if (window.web3){
        try{
            //window.web3 = new Web3(window.web3.currentProvider)
            //const web3 = window.web3
            const web3 = await loadweb3()
            console.log("Injected Web3 Detected")
            const accounts = await web3.eth.getAccounts();
            const netID = await window.web3.currentProvider.networkVersion

            return {"network":netID, "account":accounts[0]};

        } catch (error) {
            //notification(`⚠️ ${error}.`)
            console.log("Error! -  No MetaMask on the Browser");
            console.log({ error });
            //this.setState({ loading: false })
        }
    }
    else{
      if (window.celo) {
          try {
            //notification("⚠ Please approve this DApp to use it.")
            await window.celo.enable()
            //notificationOff()
            const web3 = new Web3(window.celo)
            kit = newKitFromWeb3(web3)

            const accounts = await kit.web3.eth.getAccounts()
            kit.defaultAccount = accounts[0]
            console.log(accounts[0])
            return {"network":"44787", "account":accounts[0]};

          } catch (error) {
            //notification(`⚠️ ${error}.`)
            console.log("Error! -  App Catch section")
            //this.setState({ loading: false })
          }
      } else {
      //notification("⚠️ Please install the CeloExtensionWallet.")
      console.log("Error! - Browser does not support Celo wallet and MetaMask")
    }
    }
  };

export {connectWallet};