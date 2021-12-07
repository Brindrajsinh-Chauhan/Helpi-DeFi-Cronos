
const PriceFeedABI = require('../abi/destiny/OracleCronosChainlink.json')
const PriceFeedMatic = require('../abi/source/ChainlinkPriceFeed.json')
const  Web3 = require('web3')
const dotenv = require('dotenv')
dotenv.config()

//Mumbai Contract with price Feed
const MUMBAI_PRICE_FEED = process.env.MUMBAI_PRICE_FEED
//Mumbai Token Contracts
const WBTC = process.env.WBTC
const USDT = process.env.USDT
const WETH = process.env.WETH

const PRIVATE_KEY  = process.env.PRIVATE_KEY
const ACCOUNT = process.env.ACCOUNT
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const USDT_ADDRESS = process.env.USDT_ADDRESS
const MATIC_PROVIDER = process.env.MATIC_PROVIDER
const CRONOS_PROVIDER = process.env.CRONOS_PROVIDER
const CRONOS_CONTRACT = process.env.CRONOS_CONTRACT

async function writePriceFeedCronos() {
    
    const provider = await new Web3.providers.HttpProvider(CRONOS_PROVIDER)
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(PriceFeedABI, CRONOS_CONTRACT);

    const txBuilder = await contract.methods.addPairsOfTokens("0xA91eF2E9eFf3a404431f3A4Eb9e39fe03b6372AB","0xBD21A10F619BE90d6066c941b04e340841F1F989")
    let encodedTx = txBuilder.encodeABI()   

    let txObject = {
        data: encodedTx,
        gas: 50000,
        from: process.env.ACCOUNT,
        to: CRONOS_CONTRACT
    }

    await web3.eth.accounts.signTransaction(txObject, PRIVATE_KEY, function(error, signedTx){
        if(error){
            console.log(error)
        }else{
            web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                .on('receipt', function(receipt){
                    console.log(receipt);
                })
        }
    })        
}

async function RPC() {        
    const provider = await new Web3.providers.HttpProvider(MATIC_PROVIDER)
    const web3 = await new Web3(provider);

    const contract = await new web3.eth.Contract(PriceFeedMatic, MUMBAI_PRICE_FEED);
    const txBuilder = await contract.methods.addTokenToPriceFeed("", "")

    
    let encodedTx = txBuilder.encodeABI()   

    let txObject = {
        data: encodedTx,
        gas: 50000,
        from: process.env.ACCOUNT,
        to: MUMBAI_PRICE_FEED
    }

    await web3.eth.accounts.signTransaction(txObject, PRIVATE_KEY, function(error, signedTx){
        if(error){
            console.log(error)
        }else{
            web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                .on('receipt', function(receipt){
                    console.log(receipt);
                })
        }
    })  

    
}

writePriceFeedCronos().then(() => {

})