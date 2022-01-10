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
import {redDropdownPill} from '../../components/Pills/dropdownPill.js'
import {whiteDropdownPill} from '../../components/Pills/dropdownPill.js'
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
//const mutatetokenaddress = Tokenaddress.MUTATE
//const aTokenaddress = Tokenaddress.USDT
//const bTokenaddress = Tokenaddress.hPESO


class USD_cPESO extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      network: Tokenaddress["339"],
      a: "USDT",
      b: "hINR",
      atoken: {},
      btoken: {},
      aTokenaddress: Tokenaddress["339"]["USDT"],
      bTokenaddress: Tokenaddress["339"]["hINR"],
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
    let connection = await connectWallet();
    this.setState({account: connection.account})
    this.setState({network: Tokenaddress[connection.network]})
    this.setState({a: Tokenaddress[connection.network]["Tokens"][1]})
    this.setState({b: Tokenaddress[connection.network]["Tokens"][2]})
    this.setState({aTokenaddress: Tokenaddress[connection.network][Tokenaddress[connection.network]["Tokens"][1]]})
    this.setState({bTokenaddress: Tokenaddress[connection.network][Tokenaddress[connection.network]["Tokens"][2]]})
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
        let network = this.state.network
        const mutatetoken = await loadContract(MutateToken.abi, network["MUTATE"])
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
        let network = this.state.network
        let aToken = await loadTokens(address_a, this.state.account, network["MUTATE"])
        this.setState({aToken: aToken.contract})
        this.setState({aTokenBalance: aToken.accountBalance})
        this.setState({apoolBalance: aToken.contractBalance})

        let bToken = await loadTokens(address_b, this.state.account, network["MUTATE"])
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
    let network = this.state.network
    this.setState({aTokenaddress: network[atoken]})
    this.setState({bTokenaddress: network[btoken]})
    let exchangevalue = Currency[btoken].exchange_rate / Currency[atoken].exchange_rate
    exchangevalue = exchangevalue.toFixed(2)
    this.setState({exchangerate: exchangevalue})
    this.loadingTokens(network[atoken], network[btoken])
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
    let token_1 = this.state.network["Tokens"][1]
    let token_2 = this.state.network["Tokens"][2]
    let token_3 = this.state.network["Tokens"][3]
    let a = redDropdownPill(token_1, token_2, token_3, this.ahandleChange)
    let b = whiteDropdownPill(token_2, token_1, token_3, this.bhandleChange)

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
