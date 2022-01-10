import React, { Component } from 'react'
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from '../tokenaddress.json';

//Importing Utilities
import {connectWallet} from '../Utilis/connectWallet.js';
import {loadContract} from '../Utilis/ContractUtilis.js';
import {formatBalance} from '../Utilis/ContractUtilis.js';
import {loadTokens} from '../Utilis/ContractUtilis.js';

// token contracts
import USDToken from '../abis/USDToken.json'
import INRToken from '../abis/INRToken.json'
import HelpiToken from '../abis/HELPIToken.json'
import CELOToken from '../abis/IERC20Token.json'
import cUSDToken from '../abis/IERC20Token.json'
import IERC20Token from '../abis/IERC20Token.json'
import MutateToken from '../abis/MutateToken.json'
import stakingcontract from '../abis/StakingContract.json'

// components

//import AdminMain from './Main_components/adminMain'
import CardInfo from '../components/Cards/CardInfo.js'


//contracts address
const ERC20_DECIMALS = 18
const yieldfarmingaddress = Tokenaddress.STAKING
const helpiTokenaddress = Tokenaddress.HELPI
const mutateTokenaddress = Tokenaddress.MUTATE

//variables
let kit

class Contribute extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      staking: {},
      mutateToken: {},
      network: {},
      currentTime: '0',
      time: '0',
      loading: true
    }
  }

  // This will call the celo blockchain data functions function and load the web3
  async componentWillMount() {
    let connection = await connectWallet();
    this.setState({account: connection.account})
    this.setState({network: Tokenaddress[connection.network]})
    await this.loadingContracts()
    await this.getTime()
  }

  getTime = async function ()
  {
    let data = Date.now()
    this.setState({ currentTime: data })
  }


  loadingContracts = async function () {
        try{
            let network = this.state.network

            const yieldFarming = await loadContract(stakingcontract.abi, network["STAKING"])
            this.setState({ yieldFarming })
            let time = await yieldFarming.methods.lastContribution(this.state.account).call()
            this.setState({ time: time.toString()})
            console.log("Main contract loaded")

            //helpi token contract
            const helpiToken = await loadContract(HelpiToken.abi, network["HELPI"])
            this.setState({ helpiToken })
            //let helpiTokenBalance = await helpiToken.methods.balanceOf(this.state.account).call()
            //helpiTokenBalance = BigNumber(helpiTokenBalance).shiftedBy(-ERC20_DECIMALS)
            //this.setState({ helpiTokenBalance: helpiTokenBalance.toString() })
            console.log("HELPI loaded")

        } catch (error) {
            console.log("Error! -  Main Contract section")
            console.log({ error })
        }
  }

  // Function sections

  Contribute = () =>{
    this.setState({ loading: true})
    this.state.yieldFarming.methods.Contribute().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false})
    })
  }

  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }

    if(this.state.currentTime - this.state.time < 43200 ){
        alert = <button type="button" class="my-4 block-inline bg-red-500 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">YOU CAN CONTRIBUTE AFTER 12 HOURS</button>
    }else{
        alert = <button type="submit" class="my-4 block-inline bg-emerald-500 text-white text-center active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                onClick={(event) => {
                event.preventDefault()
                this.Contribute()}}>
                CONTRIBUTE
                </button>
    }

    let information =
    <p>
        Contribute to the network every 24 hours or less to help others earn rewards on their Staking while earning rewards yourself.
        <br></br>
        <br></br>
        <b>"When you help others, others help you because together we can grow more."</b>
        <br></br>
        <br></br>
        <i><b>Note: </b> If you do not contribute to the system within 24 hours of your last contribution, you would not be rewarded
        when others contribute to the system.</i> Your reward cycle will start again when you contribute again to the network.
    </p>
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '80%' }}>
            <div className="">
            <div>

            {CardInfo(information)}

            <br></br>
            {alert}

            </div>
            </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Contribute;