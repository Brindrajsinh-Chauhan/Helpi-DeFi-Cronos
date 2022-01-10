/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";


export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-hidden md:flex-row md:flex-nowrap md:overflow-hidden bg-primary flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 pl-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-2xl text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Helpi
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Helpi
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-white bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-white text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              DAP
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block p-4 rounded-l-full " +
                    (window.location.href.indexOf("/app/vesting") !== -1
                      ? "text-secondary bg-white hover:text-primary-600"
                      : "text-white hover:bg-primary-400")
                  }
                  to="/app/vesting"
                >
                  <i
                    className={
                      "fas fa-clock mr-2 text-sm " +
                      (window.location.href.indexOf("/app/vesting") !== -1
                        ? "opacity-75"
                        : "text-white")
                    }
                  ></i>{" "}
                  Vesting
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block p-4 rounded-l-full " +
                    (window.location.href.indexOf("/app/staking") !== -1
                      ? "text-secondary bg-white hover:text-primary-600"
                      : "text-white hover:bg-primary-400")
                  }
                  to="/app/staking"
                >
                  <i
                    className={
                      "fas fa-layer-group mr-2 text-sm " +
                      (window.location.href.indexOf("/app/staking") !== -1
                        ? "opacity-75"
                        : "text-white")
                    }
                  ></i>{" "}
                  Staking
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block p-4 rounded-l-full " +
                    (window.location.href.indexOf("/app/transfer") !== -1
                      ? "text-secondary bg-white hover:text-primary-600"
                      : "text-white hover:bg-primary-400")
                  }
                  to="/app/fund-transfer"
                >
                  <i
                    className={
                      "fas fa-exchange-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/app/transfer") !== -1
                        ? "opacity-75"
                        : "text-white")
                    }
                  ></i>{" "}
                  Fund Transfer
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block p-4 rounded-l-full " +
                    (window.location.href.indexOf("/app/buy-sell") !== -1
                      ? "text-secondary bg-white hover:text-primary-600"
                      : "text-white hover:bg-primary-400")
                  }
                  to="/app/"
                >
                  <i
                    className={
                      "fas fa-university mr-2 text-sm " +
                      (window.location.href.indexOf("/app/buy-sell") !== -1
                        ? "opacity-75"
                        : "text-white")
                    }
                  ></i>{" "}
                  Buy - Sell
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-white text-xs uppercase font-bold block pt-1 pb-4 no-underline">
             Links
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-white hover:bg-primary-400 text-xs uppercase py-3 rounded-l-full p-4 font-bold block"
                  to="/"
                >
                  <i className="fas fa-home text-white mr-2 text-sm"></i>{" "}
                  Landing
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-white hover:bg-primary-400 text-xs uppercase py-3  rounded-l-full p-4 font-bold block"
                  to="/app/contribute"
                >
                  <i className="fas fa-handshake text-white mr-2 text-sm"></i>{" "}
                  Contribute
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="text-white hover:bg-primary-400 text-xs uppercase py-3  rounded-l-full p-4 font-bold block"
                  to="/paper"
                >
                  <i className="fas fa-book text-white mr-2 text-sm"></i>{" "}
                  Paper
                </Link>
              </li>
            </ul>

            {/* Divider */}
            {/* <hr className="my-4 md:min-w-full" /> */}
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Other
            </h6> */}
            {/* Navigation */}

            {/* <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-white hover:bg-primary-400 text-xs uppercase py-3 rounded-l-full p-4 font-bold block"
                  to="/landing"
                >
                  <i className="fas fa-newspaper text-white mr-2 text-sm"></i>{" "}
                  Landing Page
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
