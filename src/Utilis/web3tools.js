import Web3 from 'web3'

let loadweb3 = async function () {

    window.web3 = new Web3(window.web3.currentProvider)
    const web3 = window.web3

    return web3;
};

export {loadweb3};