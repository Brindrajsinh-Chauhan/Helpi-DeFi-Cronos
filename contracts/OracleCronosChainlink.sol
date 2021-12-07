// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OracleCronosChainlink is Ownable {
  
    struct Price {
        address token;        
        uint80 roundID;
        uint256 price;
        uint256 priceEighteemDecimals;
        uint256 startedAt;
        uint256 timeStamp_source;
        uint256 timeStamp_cronos;
        uint80 answeredInRound;
    }

    struct TokenInfo{
        address currentToken;
        address sourceToken;        
    }
    
    mapping(address => Price) lastPriceFeedSaved;
    mapping(address => address) pairsOfTokens;
    //Saved by source address
    mapping(address => TokenInfo) tokenInfoMapping;
    
    
    event PriceFeedAdded(address _token, address _priceFeed);
    event LastPriceFeedSaved(address indexed _token, uint256 indexed _price);


    function addPairsOfTokens(address _currentToken, address _sourceToken) public onlyOwner{
        require(_currentToken != address(0) && _sourceToken != address(0), "Please insert valid addresses");
        TokenInfo memory t = TokenInfo(_currentToken, _sourceToken);
        tokenInfoMapping[_sourceToken] = t;
        pairsOfTokens[_currentToken] = _sourceToken;
    }

    function getOriginTokenByCurrentToken(address _currentToken) public view returns(address){ 
        require(isValidPriceFeed(_currentToken) == true, "Token has not been added");       
        return pairsOfTokens[_currentToken];
    }

    function getCurrentTokenBySourceToken(address _sourcetToken) public view returns(address){         
        return tokenInfoMapping[_sourcetToken].currentToken;
    }
    
    function getLastPriceSavedByChainlink(address _currentToken) public view returns (uint256){
        require(isValidPriceFeed(_currentToken) == true, "Token has not been added");
        address originToken = getOriginTokenByCurrentToken(_currentToken);
        return lastPriceFeedSaved[originToken].price;           
    }

    function getAllTokenInfo(address _currentToken) public view returns (Price memory){
        require(isValidPriceFeed(_currentToken) == true, "Token has not been added");
        address originToken = getOriginTokenByCurrentToken(_currentToken);
        return lastPriceFeedSaved[originToken];           
    }
    
    function saveLastPriceFeed(Price memory _priceFeedInfo) public onlyOwner {     
        address currentToken = getCurrentTokenBySourceToken(_priceFeedInfo.token);
        require(isValidPriceFeed(currentToken) == true, "Token has not been added");  
        _priceFeedInfo.timeStamp_cronos = block.timestamp; 
        lastPriceFeedSaved[_priceFeedInfo.token] = _priceFeedInfo;
    }

    function isValidPriceFeed(address _currentToken) public view returns (bool) {
        if (pairsOfTokens[_currentToken] != address(0)) {
            return true;
        } else {
            return false;
        }
    }   

}
