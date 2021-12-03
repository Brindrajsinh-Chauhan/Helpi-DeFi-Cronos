import Web3 from 'web3'
//import { newKitFromWeb3 } from '@celo/contractkit';
import Tokenaddress from '../tokenaddress.json';
let kit;

let connectWallet = async function () {
      try {
        //notification("⚠ Please approve this DApp to use it.")
        const provider = await new Web3.providers.HttpProvider(Tokenaddress["CRONOS_PROVIDER"])
        const web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        return accounts[0];
        //this.setState({ account: accounts[0] })
        //console.log({account})

      } catch (error) {
        //notification(`⚠️ ${error}.`)
        console.log("Error! -  Catch section");
        console.log({ error });
        //this.setState({ loading: false })
      }

  };

export {connectWallet};