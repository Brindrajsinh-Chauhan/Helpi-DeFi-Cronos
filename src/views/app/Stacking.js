import React, { Component } from 'react'
import Web3 from 'web3'
import ethers from 'ethers'
//import { newKitFromWeb3 } from '@celo/contractkit';
//import BigNumber from "bignumber.js";
import Tokenaddress from '../../tokenaddress.json';

//Importing Utilities
import {connectWallet} from '../../Utilis/connectWallet.js';
import {loadContract} from '../../Utilis/ContractUtilis.js';
import {formatBalance} from '../../Utilis/ContractUtilis.js';
import {loadTokens} from '../../Utilis/ContractUtilis.js';
import {isSupported} from '../../Utilis/web3tools.js';
import {changeNetwork} from '../../Utilis/web3tools.js';

// token contracts
import USDToken from 'abis/USDToken.json'
import INRToken from 'abis/INRToken.json'
import HelpiToken from 'abis/HELPIToken.json'
import ERCToken from 'abis/IERC20Token.json'
import stakingcontract from 'abis/StakingContract.json'

// components
import YieldMain from 'components/app/YieldMain'
import TitlePill from '../../components/Pills/TitlePill.js'
import ButtonPill from '../../components/Pills/buttonPill.js'

//contracts address
const ERC20_DECIMALS = 18
//const yieldfarmingaddress = Tokenaddress[this.state.network].STAKING
//const helpiTokenaddress = Tokenaddress.HELPI

//variables
let kit
let token_name = "WBTC"
let supported_networks = ["339", "44787"]
class Staking extends Component {

    constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      network: Tokenaddress["339"],
      tokenName: "",
      hepliToken: {},
      Token: {},
      yieldFarming: {},
      TokenBalance: '0',
      helpiTokenBalance: '0',
      stakingBalance: '0',
      APR: '100000',
      loading: true,
      supported: true
    };
    this.handleClick = this.handleClick.bind(this)
  }


  async componentWillMount() {
    let connection = await connectWallet();
    this.setState({account: connection.account})
    this.setState({network: Tokenaddress[connection.network]})
    let supported = await isSupported(connection.network)
    if (supported)
    {
        let token_name = Tokenaddress[connection.network].Tokens[0]
        this.setState({tokenName: token_name})
        await this.loadingContracts(token_name)
        await this.loadingTokens(token_name)
    }else{
        this.setState({supported: false})
    }
  }

  loadingContracts = async function (_token) {
      let network = this.state.network
      try {
        const yieldFarming = await loadContract(stakingcontract.abi, network["STAKING"])
        this.setState({ yieldFarming })
        let stakingBalance = await yieldFarming.methods.balanceOf(network[_token], this.state.account).call()
        stakingBalance = await formatBalance(stakingBalance)
        this.setState({ stakingBalance: stakingBalance.toString() })
        let testTime = await yieldFarming.methods.lastContribution(this.state.account).call()
        let helpiTokenBalance = await yieldFarming.methods.lockedBalance(this.state.account).call()
        helpiTokenBalance = await formatBalance(helpiTokenBalance)
        this.setState({ helpiTokenBalance: helpiTokenBalance.toString() })
        console.log("Main Contract loaded")

      } catch (error) {

        console.log("Error! -  Main Contract section")
        console.log({ error })
      }
  }

  loadingTokens = async function (_token) {
      try {

        this.setState({ loading: false })
        let network = this.state.network
        let Token = await loadTokens(network[_token], this.state.account, network["STAKING"])
        this.setState({Token: Token.contract})
        this.setState({TokenBalance: Token.accountBalance})
        let StakedBalance = Token.contractBalance
        let APR = (0.0000317 * 31540000) / StakedBalance
        APR = APR.toFixed(2)
        this.setState({ APR: APR.toString() })
        console.log("Token Loaded")

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
  stakeTokens = (tokentype, amount) => {
  console.log(amount)
  amount = window.web3.utils.toWei(amount, 'Ether')
    this.setState({ loading: true })
    this.state.Token.methods.approve(this.state.yieldFarming._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.yieldFarming.methods.StakeTokens(this.state.Token._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
         this.setState({ loading: false })
       })
    })
  }

  unstakeTokens = (tokentype) => {
      this.setState({ loading: true })
      this.state.yieldFarming.methods.unStakeTokens(this.state.network[this.state.tokenName]).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
  }

  contribute = () => {
    this.setState({ loading: true })
    this.state.yieldFarming.methods.Contribute().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  handleClick = event => {
        let a = event.target.value
        this.setState({tokenName: event.target.value})
        console.log("this is a",a)
        this.loadingContracts(a)
        this.loadingTokens(a)
  }


  render() {
    let content
    let a
    let b
    if (this.state.APR == "Infinity") {
      this.state.APR = "100000"
    }
    if (this.state.supported){
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    }
    else {
      content = <YieldMain
        tokenName = {this.state.tokenName}
        TokenBalance={this.state.TokenBalance}
        helpiTokenBalance={this.state.helpiTokenBalance}
        APR={this.state.APR}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        contribute={this.contribute}
      />

    let primary_token = this.state.network.Tokens[0]
    let secondary_token = this.state.network.Tokens[1]
    a = ButtonPill(this.state.tokenName, primary_token, this.handleClick)
    b = ButtonPill(this.state.tokenName, secondary_token, this.handleClick)
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
                {TitlePill(a,b)}
                {content}
            </div>
            </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Staking;
