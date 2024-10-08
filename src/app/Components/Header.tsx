"use client";
import { SET_CURRENCY } from "@/app/Context/app/actionTypes";
import { useCryptoContext } from "@/app/Context/app";
import AuthModal from "@/app/Components/Authentication/AuthModal";
import Drawer from "@/app/Components/common/Drawer";
import Select from "@/app/Components/common/Select";
import ThemeSwitch from "@/app/Components/ThemeSwitch";
import WishList from "@/app/Components/WishList";

export default function Header() {
  const { state, dispatch } = useCryptoContext();

  const handleSelect = (e: any) =>
    dispatch({ type: SET_CURRENCY, payload: e.target.value });

  return (
    <nav className="bg-[#ffc107] border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-1 xl:max-w-[1200px] min-h-[64px]">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-base font-semibold whitespace-nowrap dark:text-white">
            Crypto Tracker
          </span>
        </a>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col items-center justify-between font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                <Select options={countries} onSelect={handleSelect} />
              </a>
            </li>
            <li>
              {/* <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              > */}
              <ThemeSwitch />
              {/* </a> */}
            </li>
            <li className="">
              {state.user ? (
                <Drawer>
                  <WishList />
                </Drawer>
              ) : (
                <AuthModal />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

var countries = [
  {
    label: "INR",
    value: "INR",
  },
  {
    label: "USD",
    value: "USD",
  },
];
