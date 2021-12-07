import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";
import Tokenaddress from 'tokenaddress.json';
import Currency from 'CurrencyToken.json';

//Importing Utilities
import {connectWallet} from '../../Utilis/connectWallet.js';
import {loadContract} from '../../Utilis/ContractUtilis.js';
import {formatBalance} from '../../Utilis/ContractUtilis.js';
import {loadTokens} from '../../Utilis/ContractUtilis.js';

// token contracts
import ERCToken from 'abis/IERC20Token.json' //ERC20
import MutateToken from 'abis/MutateToken.json'

// components
import TokenMain from '../../components/app/Main'
import TitlePill from '../../components/Pills/TitlePill.js'

//variables
let kit
//currencies to convert with currency code
let a_currency = "USD"
let b_currency = "COP"
// tokens for that currencies
//let a_token = "hUSD"
//let b_token = "hPESO"

//contracts address
const ERC20_DECIMALS = 18
const mutatetokenaddress = Tokenaddress.MUTATE
const aTokenaddress = Tokenaddress.USDT
const bTokenaddress = Tokenaddress.hPESO


class USD_cPESO extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      a: "USDT",
      b: "hINR",
      atoken: {},
      btoken: {},
      aTokenaddress: Currency["USDT"].address,
      bTokenaddress: Currency["hINR"].address,
      mutatetoken: {},
      aTokenBalance: '0',
      bTokenBalance: '0',
      apoolBalance: '0',
      bpoolBalance: '0',
      exchangerate: '74.98',
      loading: true
    };
    this.ahandleChange = this.ahandleChange.bind(this)
    this.bhandleChange = this.bhandleChange.bind(this)
  }

  // This will call the celo blockchain data functions function and load the web3
  async componentWillMount() {
    let accounts = await connectWallet();
    this.setState({account: accounts})
    await this.loadingContracts()
    await this.loadingTokens(this.state.aTokenaddress, this.state.bTokenaddress)
    //await this.getExchangeRate()
  }

  getExchangeRate = async function () {
    var URL = Tokenaddress.URL + Currency[this.state.a].symbol + "&to=" + Currency[this.state.a].symbol
    const response = await fetch(URL);
    const data = await response.json();
    this.setState({ exchangerate: data.result.toFixed(2) })
  }

  loadingContracts = async function () {
      try {
        //contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
        // tokenswitch address
        const mutatetoken = await loadContract(MutateToken.abi, mutatetokenaddress)
        this.setState({ mutatetoken })
        console.log("Mutate Token loaded")

      } catch (error) {
        console.log("Error! -  Main Contract section")
        console.log({ error })
      }
  }

  loadingTokens = async function (address_a, address_b) {
      try {
        this.setState({ loading: false })

        let aToken = await loadTokens(address_a, this.state.account, mutatetokenaddress)
        this.setState({aToken: aToken.contract})
        this.setState({aTokenBalance: aToken.accountBalance})
        this.setState({apoolBalance: aToken.contractBalance})

        let bToken = await loadTokens(address_b, this.state.account, mutatetokenaddress)
        this.setState({bToken: bToken.contract})
        this.setState({bTokenBalance: bToken.accountBalance})
        this.setState({bpoolBalance: bToken.contractBalance})


      } catch (error) {
        console.log("Error! -  Token section")
        console.log({ error })
      }
  }

  updateValue = async function (atoken, btoken){
    console.log(atoken, btoken)
    this.setState({aTokenaddress: Currency[atoken].address})
    this.setState({bTokenaddress: Currency[btoken].address})
    let exchangevalue = Currency[btoken].exchange_rate / Currency[atoken].exchange_rate
    exchangevalue = exchangevalue.toFixed(2)
    this.setState({exchangerate: exchangevalue})
    this.loadingTokens(Currency[atoken].address, Currency[btoken].address)

    console.log("We are in the update function")
  }

  // Function sections=================================================================================
  // USDT(a) - cPESO(b)
  a_b = (ato, aamount) => {
    this.setState({ loading: true})
    aamount = window.web3.utils.toWei(aamount, 'Ether')
    let exchangerate = BigNumber(this.state.exchangerate).shiftedBy(2)
    this.state.aToken.methods.approve(this.state.mutatetoken._address, aamount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.mutatetoken.methods.mutate(this.state.aToken._address, this.state.bToken._address, ato, aamount,exchangerate, true).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    })
  }


  ahandleChange = event => {
        let a = event.target.value
        this.setState({a: event.target.value})
        this.updateValue(event.target.value ,this.state.b)

  }

  bhandleChange = event => {
        this.setState({b: event.target.value})
        this.updateValue(this.state.a ,event.target.value)

  }

  //Render section=====================================================================================
  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }else{
        content = <TokenMain
            a = {this.state.a}
            b = {this.state.b}
            aTokenBalance = {this.state.aTokenBalance}
            bTokenBalance = {this.state.bTokenBalance}
            apoolBalance = {this.state.apoolBalance}
            bpoolBalance = {this.state.bpoolBalance}
            exchangerate = {this.state.exchangerate}
            a_b = {this.a_b}
            b_a = {this.b_a}
        />
    }
    let a =
    <select class="flex w-1/2 rounded-none text-center text-lg text-white bg-red-400" onChange={this.ahandleChange}>
        <option class="bg-white text-black" value="USDT">USDT</option>
        <option class="bg-white text-black" value="hINR">hINR</option>
        <option class="bg-white text-black"value="hPESO">hPESO</option>
    </select>

    let b =
    <select class="flex w-1/2 rounded-none text-center text-lg" onChange={this.bhandleChange}>
        <option value="hINR">hINR</option>
        <option value="USDT">USDT</option>
        <option value="hPESO">hPESO</option>
    </select>
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

export default USD_cPESO;
