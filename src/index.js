const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv')
const Web3 = require('web3')
const PriceFeedABI = require('./abi/source/ChainlinkPriceFeed.json')
const ERC20 = require('./abi/source/ERC20.json')
const ChronosPriceFeed = require('./abi/destiny/OracleCronosChainlink.json')
const infoContracts = require('../utilities/contract-addresses.json')

// Config
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
dotenv.config()

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//Get
app.get('/getPriceFromSource', async(req, res) => {
    const { body } = req;
    const isValidToken = body.token;

    if(!isValidToken){
        return res.status(400).send({ message: 'invalid request, please send a valid token address' })
    }

    try {
        const provider = await new Web3.providers.HttpProvider(process.env.MATIC_PROVIDER)
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(PriceFeedABI, process.env.MUMBAI_PRICE_FEED);
        
    
        let sourceResult = await contract.methods.getTokenPriceByChainlink(isValidToken).call({from: process.env.ACCOUNT})
    
        let priceFeed = {
            roundID: sourceResult.roundID,
            price: sourceResult.price,            
            startedAt: sourceResult.startedAt,
            timeStamp: sourceResult.timeStamp,
            answeredInRound: sourceResult.answeredInRound
        }

        return res.send({ priceFeed })

    } catch (error) {
        return res.status(500).send({message: "There was an error: " + error.message})
    }    
});

app.get('/getPriceFromDestiny', async(req, res) => {
    const { body } = req;
    const isValidToken = body.token;

    if(!isValidToken){
        return res.status(400).send({ message: 'invalid request, please send a valid token address' })
    }

    try {

        const provider = await new Web3.providers.HttpProvider(process.env.CRONOS_PROVIDER)
        const web3 = await new Web3(provider);

        const contract = await new web3.eth.Contract(ChronosPriceFeed, process.env.CRONOS_PRICE_FEED_CONTRACT);
        const tx = await contract.methods.getLastPriceSavedByChainlink(isValidToken).call({from: process.env.ACCOUNT})        
        console.log(isValidToken)            
        return res.send({ value: tx })

    } catch (error) {
        return res.status(500).send({message: "There was an error: " + error.message})
    }    
});

app.post('/updatePriceDestiny', async(req, res) => {
    const { body } = req;
    const isValidToken = body.token;
    let cronosProvider = null
    let cronosWeb3 = null
    let maticProvider = null
    let maticWeb3 = null

    let priceFeed = {
        roundID: null,
        price: null,
        priceEighteen: null,
        startedAt: null,
        timeStamp: null,
        answeredInRound: null
    }

    if(!isValidToken){
        return res.status(400).send({ message: 'invalid request, please send a valid token address' })
    }

    try {
        cronosProvider = await new Web3.providers.HttpProvider(process.env.CRONOS_PROVIDER)
        cronosWeb3 = new Web3(cronosProvider);

        maticProvider = await new Web3.providers.HttpProvider(process.env.MATIC_PROVIDER)
        maticWeb3 = new Web3(maticProvider);
    } catch (error) {
        return res.status(500).send({message: "There was an error initializing web3: " + error.message})
    }

    try {
        const contract = new maticWeb3.eth.Contract(PriceFeedABI, process.env.MUMBAI_PRICE_FEED);    
        const contractSourceByDestiny = (infoContracts.contracts).find(e => e.destiny === isValidToken)
        let sourceResult = await contract.methods.getTokenPriceByChainlink(contractSourceByDestiny.source).call({from: process.env.ACCOUNT})
            
        priceFeed.roundID = sourceResult.roundID;
        priceFeed.price = sourceResult.price,
        priceFeed.priceEighteen = sourceResult.price,        
        priceFeed.startedAt = sourceResult.startedAt,
        priceFeed.timeStamp = sourceResult.timeStamp,
        priceFeed.answeredInRound = sourceResult.answeredInRound
            
    } catch (error) {
        return res.status(500).send({message: "There was an error getting price from Source Blockcain: " + error.message})
    }

    try {

        const destinyContract = new cronosWeb3.eth.Contract(ChronosPriceFeed, process.env.CRONOS_PRICE_FEED_CONTRACT);
        const result = null;
        const contractSourceByDestiny = (infoContracts.contracts).find(e => e.destiny === isValidToken)
        
        const lastPrice = {
            token: contractSourceByDestiny.source,      
            //roundID: priceFeed.roundID,
            roundID: 1,
            price:  priceFeed.price,
            priceEighteemDecimals: priceFeed.priceEighteen,
            startedAt: priceFeed.startedAt,
            timeStamp_source: priceFeed.timeStamp,
            timeStamp_cronos: priceFeed.timeStamp,
            //answeredInRound: priceFeed.answeredInRound
            answeredInRound: 1
        }
        
        console.log(lastPrice)

        const txBuilder = await destinyContract.methods.saveLastPriceFeed(lastPrice)
        let encodedTx = txBuilder.encodeABI()   
    
        let txObject = {
            data: encodedTx,
            gas: 80000,
            from: process.env.ACCOUNT,
            to: process.env.CRONOS_PRICE_FEED_CONTRACT
        }
        
        await cronosWeb3.eth.accounts.signTransaction(txObject, process.env.PRIVATE_KEY, function(error, signedTx){
            if(error){
                return res.status(500).send({message: "There was an error signing the transaction: " + error.message})                
            }else{
                cronosWeb3.eth.sendSignedTransaction(signedTx.rawTransaction)
                    .on('receipt', function(receipt){                        
                        return res.send({ result: receipt })                        
                    })
                    .on('error', function(error){
                        return res.status(500).send({message: "There was an error sending de transaction: " + error})
                    })
            }
        });
         
    } catch (error) {
        return res.status(500).send({message: "There was an error: " + error.message})
    }    
});

//Initialazing Server
app.listen(app.get('port'), () => {
    console.log(`Port listening ${app.get('port')}`);
});


