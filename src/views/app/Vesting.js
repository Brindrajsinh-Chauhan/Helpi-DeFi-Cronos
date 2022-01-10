import React, { Component } from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
//import BigNumber from "bignumber.js";
import Tokenaddress from '../../tokenaddress.json';

//Importing Utilities
import {connectWallet} from '../../Utilis/connectWallet.js';
import {loadContract} from '../../Utilis/ContractUtilis.js';
import {formatBalance} from '../../Utilis/ContractUtilis.js';
import {isSupported} from '../../Utilis/web3tools.js';
import {loadTokens} from '../../Utilis/ContractUtilis.js';

// token contracts
import USDToken from 'abis/USDToken.json'
import INRToken from 'abis/INRToken.json'
import HelpiToken from 'abis/HELPIToken.json'
import stakingcontract from 'abis/StakingContract.json'

// components
import VestingMain from 'components/app/Vesting'

//contracts address
const ERC20_DECIMALS = 18
const yieldfarmingaddress = Tokenaddress.STAKING
const helpiTokenaddress = Tokenaddress.HELPI

//variables
let kit
let content
let lockTime = 259200

class Vesting extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      network: Tokenaddress["339"],
      hepliToken: {},
      currentTime: '0',
      time: '0',
      yieldFarming: {},
      lockedBalance: '0',
      releasedBalance: '0',
      redeemedBalance: '0',
      loading: true,
      supported: true
    }
  }

  // This will call the celo blockchain data functions function and load the web3
  async componentWillMount() {
    let connection = await connectWallet();
    this.setState({account: connection.account})
    let supported = await isSupported(connection.network)
    if (supported){
    this.setState({network: Tokenaddress[connection.network]})
    await this.loadingContracts()
    await this.loadingTokens()
    await this.getTime()
    }else{
        this.setState({supported: false})
    }
  }

  getTime = async function ()
  {
    let data = Date.now()
    //console.log("Current Time:", data)
    this.setState({ currentTime: data })
  }

  loadingContracts = async function () {
      try {
        let network = this.state.network
        //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
        // tokenswitch address
        const yieldFarming = await loadContract(stakingcontract.abi, network["STAKING"])
        this.setState({ yieldFarming })
        let lockedBalance = await yieldFarming.methods.lockedBalance(this.state.account).call()
        lockedBalance = await formatBalance(lockedBalance)
        //lockedBalance = lockedBalance.toFixed(2)
        console.log(lockedBalance)
        this.setState({ lockedBalance: lockedBalance.toString() })
        let releasedBalance = await yieldFarming.methods.unlockedBalance(this.state.account).call()
        releasedBalance = await formatBalance(releasedBalance)
        this.setState({ releasedBalance: releasedBalance.toString() })
        let redeemedBalance = await yieldFarming.methods.redeemedBalance(this.state.account).call()
        redeemedBalance = await formatBalance(redeemedBalance)
        this.setState({ redeemedBalance: redeemedBalance.toString() })
        let time = await yieldFarming.methods.lastRelease(this.state.account).call()
        this.setState({ time: time.toString() })
        //console.log("This is the time",this.state.time)
        console.log("Yieldfarming loaded")

      } catch (error) {
        console.log("Error! -  Main Contract section")
        console.log({ error })
      }
  }

  loadingTokens = async function () {
      try {
        let network = this.state.network
        this.setState({ loading: false })

        //helpi token contract
        const helpiToken = await loadContract(HelpiToken.abi, network["HELPI"])
        this.setState({ helpiToken })
        console.log("HELPI loaded")

      } catch (error) {
        console.log("Error! -  Token section")
        console.log({ error })
      }
  }

  // Function sections

  releaseToken = () => {
    this.setState({ loading: true })
    this.state.yieldFarming.methods.releaseTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  redeemToken = (amount) => {
    amount = window.web3.utils.toWei(amount, 'Ether')
    this.setState({ loading: true })
    this.state.yieldFarming.methods.redeemTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  render() {
    if (this.state.supported){
    if (this.state.loading)
    {
      content = <p id="loader" className="text-center">Loading...</p>
    }
    else
    {
      content = <VestingMain
        lockedBalance={this.state.lockedBalance}
        releasedBalance={this.state.releasedBalance}
        redeemedBalance={this.state.redeemedBalance}
        releaseToken={this.releaseToken}
        redeemToken={this.redeemToken}
      />
    }

    if (this.state.currentTime - this.state.time <= lockTime)
    {
      alert = <button type="button" className="my-4 block-inline bg-red-500 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">TOKENS CAN BE UNLOCKED EVERY 72 HOURS</button>
    }
    else
    {
      alert = <button type="submit" className="my-4 block-inline bg-emerald-500 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
        onClick={(event) =>
        {
          event.preventDefault()
          this.releaseToken(this.state.currentTime)
        }}>
        UNLOCK NEW TOKENS
      </button>
    }
    }else{
      content = <p id="loader" className="text-center">We do not support this Injected network. Please switch to our supported network</p>
    }
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '80%' }}>
            <div className="">
            <div>

             {content}
             {alert}
             <div class="text-center m-2">
                 You can Unlock 1/60 part of your Helpi Balance every 3 Days
             </div>

               </div>
            </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Vesting;
