import React, { Component } from "react";
import {changeNetwork} from '../../Utilis/web3tools.js';

export default function networkpill() {


    let handleChange = event => {
        let a = event.target.value
        changeNetwork(a)
        console.log("Network changed from network pill")
  }

    return(
        <>
        <select class="flex w-full rounded-full text-center text-lg text-black bg-white"
        onChange={(e) => {
        let a = e.target.value
        changeNetwork(a)
        }}>
        <option class="bg-white text-black" value='0xAEF3'>Celo Network (Alfajores)</option>
        <option class="bg-white text-black" value='0x153'>Cronos Network (Cassini)</option>
        <option class="bg-white text-black"value='0xA869'>Avalanche Network</option>
        </select>
        </>
    );
}