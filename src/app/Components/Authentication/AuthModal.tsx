import { useState } from "react";
import Login from "./Login";
import GoogleButton from "react-google-button";
import { signInWithGoogle } from "@/app/actions";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };

  const oAuthSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button
        className="relative inline-flex items-center justify-center p-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg border border-customGray m-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="relative px-4 py-1 dark:bg-transparent rounded-md group-hover:bg-opacity-0">
          Login
        </span>
      </button>

      {/* <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabIndex={-1}
        onClick={handleClose}
        aria-hidden="true"
        className={`${
          open ? "" : "hidden"
        } flex bg-black-rgba overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full`}
      >
        <div
          className="relative p-2 w-full max-w-md max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center bg-[#ffc107] justify-between p-2 md:p-2.5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={handleClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    // strokeLineJoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 md:pb-0 pb-0">
              <Login />
            </div>
            <div className="p-4 md:p-5 pt-0 md:pt-0">
              <p className="text-center pt-2 pb-2">OR</p>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={oAuthSignIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
