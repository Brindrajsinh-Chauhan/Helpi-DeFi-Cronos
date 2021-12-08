## EVM Chainlink Price Feed API

Simple REST API demo illustrating interaction with an Ethereum (EVM) smart contract.

This API will be used to bridge Chainlink Price Feed from Polygon Mumbai to Cronos Cassini.

### JSON File specifies Contracts from Source and Destiny

```
{
    "contracts": 
        [ 
            {
                "description": "Bitcoin",
                "name" : "BTC",
                "sourceBlockchain": "Polygon Mumbai Testnet",
                "source" : "0x0d787a4a1548f673ed375445535a6c7A1EE56180",
                "destinyBlockchain": "Cronos Cassini Testnet",
                "destiny": "0x01b1E02abD769499cA858A2Ac5892d8F957211C4"                
            },        
            {
                "description": "Ethereum",
                "name" : "Ethereum",
                "sourceBlockchain": "Polygon Mumbai Testnet",
                "source" : "0x3C68CE8504087f89c640D02d133646d98e64ddd9",
                "destinyBlockchain": "Cronos Cassini Testnet",
                "destiny": "0x1D8A354655398EFE91a3Bc5BfAFB9602344Eeaf8"
            },        
            {
                "description": "tether USDT",
                "name" : "USDT",
                "sourceBlockchain": "Polygon Mumbai Testnet",
                "source" : "0xBD21A10F619BE90d6066c941b04e340841F1F989",
                "destinyBlockchain": "Cronos Cassini Testnet",
                "destiny": "0xA91eF2E9eFf3a404431f3A4Eb9e39fe03b6372AB"
            }    
        ]              
}
```