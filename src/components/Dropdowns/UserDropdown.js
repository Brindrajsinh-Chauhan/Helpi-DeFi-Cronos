import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import Tokenaddress from '../../tokenaddress.json';
import { useState } from "react";

//variables
let kit


const UserDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);

  const [account, setAccount] = React.useState("");
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };


  const connectCeloWallet = async function () {
    try {
        //notification("⚠ Please approve this DApp to use it.")
        const provider = await new Web3.providers.HttpProvider(Tokenaddress["CRONOS_PROVIDER"])
        const web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        return accounts[0];
        //this.setState({ account: accounts[0] })
        //console.log({account})

      } catch (error) {
        //notification(`⚠️ ${error}.`)
        console.log("Error! -  Catch section");
        console.log({ error });
        //this.setState({ loading: false })
      }

  };


  // useEffect(() => {
  //   connectCeloWallet()
  // }, [])

  const [visible, setVisible] = useState(false)


  const handleWallet = () => {
    //connectCeloWallet()
    setVisible(false)
  }

  return (
    <>
      <div className={`z-40 w-full h-full top-0 left-0 fixed bg-black opacity-20 ${visible ? 'visible' : 'invisible'}`} onClick={() => setVisible(false)}></div>
      <div
        className={`z-50 grid grid-cols-2 overflow-auto mx-auto p-6 border rounded-xl bg-white text-left fixed left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 ${visible ? 'visible' : 'invisible'}`}
      >
        <div className="m-4 w-30 h-30 flex flex-col items-center border rounded-xl p-4" onClick={handleWallet}>
          <svg viewBox="0 0 40 40" width="40px" color="text" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM la-Dshj"><path d="M36.0112 3.33337L22.1207 13.6277L24.7012 7.56091L36.0112 3.33337Z" fill="#E17726"></path><path d="M4.00261 3.33337L17.7558 13.7238L15.2989 7.56091L4.00261 3.33337Z" fill="#E27625"></path><path d="M31.0149 27.2023L27.3227 32.8573L35.2287 35.0397L37.4797 27.3258L31.0149 27.2023Z" fill="#E27625"></path><path d="M2.53386 27.3258L4.77116 35.0397L12.6772 32.8573L8.9987 27.2023L2.53386 27.3258Z" fill="#E27625"></path><path d="M12.2518 17.6496L10.0419 20.9712L17.8793 21.3281L17.6048 12.8867L12.2518 17.6496Z" fill="#E27625"></path><path d="M27.762 17.6494L22.3129 12.7905L22.1207 21.3279L29.9581 20.9711L27.762 17.6494Z" fill="#E27625"></path><path d="M12.6772 32.8574L17.3989 30.5652L13.336 27.3809L12.6772 32.8574Z" fill="#E27625"></path><path d="M22.6009 30.5652L27.3226 32.8574L26.6637 27.3809L22.6009 30.5652Z" fill="#E27625"></path><path d="M27.3226 32.8575L22.6009 30.5653L22.9715 33.6399L22.9303 34.9301L27.3226 32.8575Z" fill="#D5BFB2"></path><path d="M12.6772 32.8575L17.0694 34.9301L17.042 33.6399L17.3989 30.5653L12.6772 32.8575Z" fill="#D5BFB2"></path><path d="M17.1518 25.3495L13.2262 24.1965L15.9988 22.92L17.1518 25.3495Z" fill="#233447"></path><path d="M22.848 25.3495L24.001 22.92L26.801 24.1965L22.848 25.3495Z" fill="#233447"></path><path d="M12.6773 32.8573L13.3635 27.2023L8.99876 27.3258L12.6773 32.8573Z" fill="#CC6228"></path><path d="M26.6364 27.2023L27.3227 32.8573L31.0149 27.3258L26.6364 27.2023Z" fill="#CC6228"></path><path d="M29.9581 20.9709L22.1207 21.3278L22.8482 25.3495L24.0011 22.92L26.8012 24.1965L29.9581 20.9709Z" fill="#CC6228"></path><path d="M13.2263 24.1965L15.9989 22.92L17.1519 25.3495L17.8793 21.3278L10.0419 20.9709L13.2263 24.1965Z" fill="#CC6228"></path><path d="M10.0419 20.9709L13.3361 27.3809L13.2263 24.1965L10.0419 20.9709Z" fill="#E27525"></path><path d="M26.8011 24.1965L26.6638 27.3809L29.958 20.9709L26.8011 24.1965Z" fill="#E27525"></path><path d="M17.8793 21.3278L17.1519 25.3494L18.0715 30.0985L18.2637 23.8396L17.8793 21.3278Z" fill="#E27525"></path><path d="M22.1205 21.3278L21.7499 23.8258L21.9283 30.0985L22.848 25.3494L22.1205 21.3278Z" fill="#E27525"></path><path d="M22.848 25.3496L21.9284 30.0987L22.601 30.5654L26.6638 27.381L26.8011 24.1967L22.848 25.3496Z" fill="#F5841F"></path><path d="M13.2262 24.1967L13.336 27.381L17.3989 30.5654L18.0714 30.0987L17.1518 25.3496L13.2262 24.1967Z" fill="#F5841F"></path><path d="M22.9303 34.93L22.9715 33.6398L22.6284 33.3378H17.3714L17.042 33.6398L17.0694 34.93L12.6772 32.8574L14.2145 34.1202L17.3302 36.2751H22.6696L25.7853 34.1202L27.3226 32.8574L22.9303 34.93Z" fill="#C0AC9D"></path><path d="M22.601 30.5653L21.9284 30.0986H18.0715L17.3989 30.5653L17.0421 33.6399L17.3715 33.3379H22.6285L22.9716 33.6399L22.601 30.5653Z" fill="#161616"></path><path d="M36.5875 14.3003L37.7542 8.61779L36.011 3.33337L22.6009 13.2846L27.7618 17.6493L35.0365 19.7768L36.6424 17.8964L35.9424 17.3886L37.0679 16.3728L36.2169 15.7003L37.3287 14.863L36.5875 14.3003Z" fill="#763E1A"></path><path d="M2.24573 8.61779L3.42615 14.3003L2.67123 14.863L3.78302 15.7003L2.93202 16.3728L4.05753 17.3886L3.35752 17.8964L4.96343 19.7768L12.2518 17.6493L17.399 13.2846L4.00263 3.33337L2.24573 8.61779Z" fill="#763E1A"></path><path d="M35.0365 19.777L27.7619 17.6495L29.958 20.9712L26.6638 27.3811L31.0149 27.3262H37.4797L35.0365 19.777Z" fill="#F5841F"></path><path d="M12.2517 17.6495L4.96332 19.777L2.53386 27.3262H8.99869L13.336 27.3811L10.0419 20.9712L12.2517 17.6495Z" fill="#F5841F"></path><path d="M22.1205 21.3276L22.6009 13.2843L24.701 7.56067H15.2988L17.3988 13.2843L17.8792 21.3276L18.0577 23.8531L18.0714 30.0984H21.9283L21.9421 23.8531L22.1205 21.3276Z" fill="#F5841F"></path></svg>
          <h2 className="font-bold">Metamask</h2>
        </div>
        <div className="m-4 w-30 h-30 flex flex-col items-center border rounded-xl p-4">
          <svg viewBox="0 0 40 40" width="40px" color="text" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM la-Dshj"><path d="M8.68096 12.4756C14.9323 6.39698 25.0677 6.39698 31.3191 12.4756L32.0714 13.2071C32.384 13.511 32.384 14.0038 32.0714 14.3077L29.4978 16.8103C29.3415 16.9622 29.0881 16.9622 28.9318 16.8103L27.8965 15.8036C23.5354 11.563 16.4647 11.563 12.1036 15.8036L10.9948 16.8817C10.8385 17.0336 10.5851 17.0336 10.4288 16.8817L7.85517 14.3791C7.54261 14.0752 7.54261 13.5824 7.85517 13.2785L8.68096 12.4756ZM36.6417 17.6511L38.9322 19.8783C39.2448 20.1823 39.2448 20.675 38.9322 20.979L28.6039 31.022C28.2913 31.3259 27.7846 31.3259 27.472 31.022C27.472 31.022 27.472 31.022 27.472 31.022L20.1416 23.8942C20.0634 23.8182 19.9367 23.8182 19.8586 23.8942C19.8586 23.8942 19.8586 23.8942 19.8586 23.8942L12.5283 31.022C12.2157 31.3259 11.709 31.3259 11.3964 31.022C11.3964 31.022 11.3964 31.022 11.3964 31.022L1.06775 20.9788C0.755186 20.6749 0.755186 20.1821 1.06775 19.8782L3.35833 17.6509C3.6709 17.347 4.17767 17.347 4.49024 17.6509L11.8208 24.7789C11.8989 24.8549 12.0256 24.8549 12.1038 24.7789C12.1038 24.7789 12.1038 24.7789 12.1038 24.7789L19.4339 17.6509C19.7465 17.347 20.2533 17.347 20.5658 17.6509C20.5658 17.6509 20.5658 17.6509 20.5658 17.6509L27.8964 24.7789C27.9745 24.8549 28.1012 24.8549 28.1794 24.7789L35.5098 17.6511C35.8223 17.3471 36.3291 17.3471 36.6417 17.6511Z" fill="#3389FB"></path></svg>
          <h2 className="font-bold">WalletConnect</h2>
        </div>
        <div className="m-4 w-30 h-30 flex flex-col items-center border rounded-xl p-4" onClick={handleWallet}>
          <svg width="102" height="30" viewBox="0 0 85 25" fill="none" className="mb-4">
            <path d="M64.2368 22.079L66.5 21.3684V2.63159L64.2368 3.34212V22.079ZM38.1316 10.7105C39.5526 10.7105 40.8684 11.3421 41.7105 12.3947L42.6316 10.2632C41.421 9.10528 39.8158 8.55264 38.1316 8.55264C34.2368 8.55264 31.5526 11.6316 31.5789 15.0263C31.6052 18.7105 34.5 21.7105 38.1316 21.7105C39.9737 21.7105 41.3684 21.1579 42.421 20.3947V17.7895C41.3158 18.8947 39.7105 19.5526 38.3158 19.5526C36.2105 19.5526 33.8421 17.8421 33.8421 15.0263C33.8421 12.4211 35.8947 10.7105 38.1316 10.7105ZM53.1842 8.55264C49.2895 8.55264 47.0263 11.6316 47.0263 15.0263C47.0263 18.7105 49.9473 21.7105 53.5789 21.7105C55.421 21.7105 56.8158 21.1579 57.8684 20.3947V17.7895C56.7631 18.8947 55.1579 19.5526 53.7631 19.5526C51.8947 19.5526 49.8421 18.3947 49.421 15.9474H59.3421V15.079C59.3421 11.4474 56.9473 8.55264 53.1842 8.55264ZM77.6316 8.55264C74 8.55264 71.0526 11.5 71.0526 15.1316C71.0526 18.7632 74 21.7105 77.6316 21.7105C81.2631 21.7105 84.2105 18.7632 84.2105 15.1316C84.2105 11.5 81.2631 8.55264 77.6316 8.55264ZM53.2105 10.7105C54.9737 10.7105 56.8421 11.8158 57 13.9474H49.421C49.5789 11.8158 51.4473 10.7105 53.2105 10.7105ZM77.6316 19.5526C75.1842 19.5526 73.2105 17.579 73.2105 15.1316C73.2105 12.6842 75.1842 10.7105 77.6316 10.7105C80.0789 10.7105 82.0526 12.6842 82.0526 15.1316C82.0526 17.579 80.0789 19.5526 77.6316 19.5526Z" fill="#333333"></path>
            <path d="M15.1316 17.1053C19.1284 17.1053 22.3684 13.8653 22.3684 9.86842C22.3684 5.87158 19.1284 2.63158 15.1316 2.63158C11.1348 2.63158 7.89476 5.87158 7.89476 9.86842C7.89476 13.8653 11.1348 17.1053 15.1316 17.1053ZM15.1316 19.7368C9.6816 19.7368 5.26318 15.3184 5.26318 9.86842C5.26318 4.41842 9.6816 0 15.1316 0C20.5816 0 25 4.41842 25 9.86842C25 15.3184 20.5816 19.7368 15.1316 19.7368Z" fill="#35D07F"></path>
            <path d="M9.86842 22.3684C13.8653 22.3684 17.1053 19.1284 17.1053 15.1316C17.1053 11.1348 13.8653 7.89476 9.86842 7.89476C5.87158 7.89476 2.63158 11.1348 2.63158 15.1316C2.63158 19.1284 5.87158 22.3684 9.86842 22.3684ZM9.86842 25C4.41842 25 0 20.5816 0 15.1316C0 9.6816 4.41842 5.26318 9.86842 5.26318C15.3184 5.26318 19.7368 9.6816 19.7368 15.1316C19.7368 20.5816 15.3184 25 9.86842 25Z" fill="#FBCC5C"></path>
            <path d="M15.4553 19.7315C16.1392 18.903 16.6292 17.932 16.89 16.8899C17.9321 16.6294 18.9029 16.1391 19.7316 15.4554C19.6937 16.6623 19.4339 17.852 18.9647 18.9646C17.8521 19.4338 16.6624 19.6936 15.4553 19.7315ZM8.11026 8.10989C7.06815 8.37042 6.09736 8.86068 5.26868 9.54436C5.30657 8.33752 5.56631 7.14778 6.03552 6.03515C7.14815 5.56594 8.33789 5.30621 9.54473 5.26831C8.86105 6.09699 8.37078 7.06778 8.11026 8.10989Z" fill="#ECFF8F"></path>
          </svg>
          <h2 className="font-bold">Cello Wallet</h2>
        </div>
        <div className="m-4 w-30 h-30 flex flex-col items-center border rounded-xl p-4" onClick={handleWallet}>
          <img className="w-12 h-12" src="https://valoraapp.com/_next/static/images/icon-62b90ddabe4910b9c5d55ecabf817aa8.png" alt="" srcset="" />
          <h2 className="font-bold">Valora</h2>
        </div>
      </div>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          // dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
          setVisible(true)
        }}
      >
        <div className="items-center flex justify-items-center">
          <span className=" text-sm text-white bg-secondary inline-flex items-center justify-center rounded-full">
            {account != "" ? <>
              <span className="text-white mx-4 font-bold">{account.slice(0, 2) + (account.slice(2, 6) + "..." + account.slice(-4)).toUpperCase()}</span>
              <img
                alt="..."
                className="h-12 rounded-full align-middle border-none shadow-lg"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/375px-MetaMask_Fox.svg.png"
              />
            </>
              :
              <span className="z-10 text-center text-white flex  px-4 h-12 bg-secondary  rounded-full text-base items-center justify-center">
                {/* <i className="fas fa-question text-4xl"></i> */}
                <h2>Connect wallet</h2>
              </span>}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >

        </a>
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-secondary"
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a> */}
      </div>
    </>
  );
};

export default UserDropdown;
