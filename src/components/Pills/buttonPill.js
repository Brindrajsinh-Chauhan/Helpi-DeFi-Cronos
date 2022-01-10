import React, { Component } from "react";

export default function ButtonPill(state_token, _token, _function) {

    return(
        <>
        <button type="submit" value = {_token} class= {state_token === _token ? "block-inline w-1/2 rounded text-white text-center text-xl bg-red-400": "block-inline w-1/2 rounded text-black text-center text-xl bg-white-400" } onClick={_function}>
            Stake {_token}
        </button>
        </>

    );
}

