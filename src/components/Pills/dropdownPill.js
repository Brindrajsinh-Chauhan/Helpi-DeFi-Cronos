import React, { Component } from "react";

export function redDropdownPill(a, b, c, _function) {

    return(
        <>
        <select class="flex w-1/2 rounded-none text-center text-lg text-white bg-red-400" onChange={_function}>
        <option class="bg-white text-black" value={a}>{a}</option>
        <option class="bg-white text-black" value={b}>{b}</option>
        <option class="bg-white text-black"value={c}>{c}</option>
        </select>
        </>

    );
}

export function whiteDropdownPill(a, b, c, _function) {

    return(
        <>
        <select class="flex w-1/2 rounded-none text-center text-lg" onChange={_function}>
        <option value={a}>{a}</option>
        <option value={b}>{b}</option>
        <option value={c}>{c}</option>
        </select>
        </>

    );
}