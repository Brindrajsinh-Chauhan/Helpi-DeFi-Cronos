// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CallerDestiny is Ownable {
    
    address contractPriceFeed;
    bool paused;

    constructor(address _contract){
        contractPriceFeed = _contract;
        paused = false;
    }

    function updatePriceFeedContract(address _newContract) public onlyOwner contractPaused{
        require(_newContract != address(0), "Please insert valid address");
        contractPriceFeed = _newContract;
    }

    function updateContractState(bool _update) public onlyOwner contractPaused{
        paused = _update;
    }

    modifier contractPaused{
        require(paused == false, "Contract caller has been paused, please contact admins.");
        _;
    }
}
