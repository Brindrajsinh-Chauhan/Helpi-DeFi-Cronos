import React from "react";
import { useHistory } from "react-router-dom";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import networkpill from '../Pills/networkPill.js'

export default function Navbar() {
  const history = useHistory();
  let networkcontent = networkpill()
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-primary text-sm uppercase hidden lg:inline-block font-semibold"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              history.go(-1);
            }}
          >

            <i className="fas fa-arrow-left"></i> Back
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">

          </form>

          {/* User */}

            <div class="flex flex-col mx-4 rounded-full">
               <div class="flex mx-auto border-2 border-white-400 shadow-lg rounded-full h-12">
                {networkcontent}
                </div>
            </div>

            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
            </ul>

        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
