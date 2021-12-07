// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainlinkPriceFeed is Ownable{
    
        struct Price{
            uint80 roundID;
            int256 price;            
            uint startedAt;
            uint timeStamp;
            uint80 answeredInRound;
        }

        struct PriceFeedDetails{
            address priceFeed;
            string name;
            uint8 decimals;
        }

        mapping(address => address) tokenPriceFeedMapping;
        mapping(address => PriceFeedDetails) priceFeedDetails;

        event priceFeedAdded(address _token, address _priceFeed);

        function addTokenToPriceFeed(
            address _token, 
            address _priceFeed,
            string memory _name,
            uint8 _decimals
        )  
            public 
            onlyOwner
        {
            require(_token != address(0) && _priceFeed != address(0), "Must be valid address");
            tokenPriceFeedMapping[_token] =  _priceFeed;
            PriceFeedDetails memory pfd = PriceFeedDetails(_priceFeed, _name, _decimals);
            priceFeedDetails[_token] = pfd;    
            emit priceFeedAdded(_token, _priceFeed);    
        }

        function getPriceFeedDetails(address _priceFeed) public view returns(PriceFeedDetails memory){
            require(_priceFeed != address(0), "please insert valid address");
            return priceFeedDetails[_priceFeed];
        }

        function getPriceFeedMapping(address _priceFeed) public view returns(address){
            require(_priceFeed != address(0), "please insert valid address");
            return tokenPriceFeedMapping[_priceFeed];
        }

        function isValidPriceFeed(
            address _token
        ) 
            public 
            view 
            returns(bool)
        {
            if(tokenPriceFeedMapping[_token] != address(0)){
                return true;
            }else{
                return false;
            }        
        }

        function getTokenPriceByChainlink
        (
            address _token
        ) 
            public 
            view 
            returns (Price memory) 
        {
            require(isValidPriceFeed(_token) == true, "Token not valid");
            address priceFeedAddress = tokenPriceFeedMapping[_token];
            AggregatorV3Interface priceFeed = AggregatorV3Interface(
                priceFeedAddress
            );
            (
                uint80 roundID,
                int256 price,
                uint256 startedAt,
                uint256 timeStamp,
                uint80 answeredInRound
            ) = priceFeed.latestRoundData();
                                     
            Price memory p = Price(roundID, price, startedAt, timeStamp, answeredInRound);
            return p;
        }  
}

