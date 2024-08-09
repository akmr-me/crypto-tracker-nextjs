import Image from "next/image";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { auth } from "@/app/firebase";
import { useCryptoContext } from "@/app/Context/app";
import useUpdateWatchList from "@/app/hooks/useUpdateWatchList";

export default function WishList() {
  const { state: { user, coins, watchlist, symbol, local } = {} } =
    useCryptoContext();
  const { removeFromWatchList } = useUpdateWatchList();

  function handleLogOut() {
    toast.promise(signOut(auth), {
      loading: "Logging Out ...",
      success: () => {
        return "Logged Out Successfully!";
      },
      error: () => {
        return "Some Error occured!";
      },
    });
  }

  if (!user) return;

  return (
    <div className="w-full h-full p-5 flex flex-col">
      <div className="flex flex-1 flex-col items-center h-[92%] gap-5">
        <Image
          src={user.photoURL || ""}
          width={180}
          height={180}
          className="object-contain rounded-full"
          alt="avatar"
        />
        <span className="w-full text-center font-bold break-words">
          {user.displayName || user.email}
        </span>
        <div className="flex-1 rounded-md w-full bg-gray-400 p-2 flex items-center flex-col gap-3 overflow-y-scroll">
          <span style={{ fontSize: "15px", textShadow: "0 0 5px black" }}>
            Watchlist
          </span>
          {/* eslint-disable-next-line */}

          {coins?.map((coin) => {
            if (watchlist?.includes(coin.id)) {
              return (
                <div
                  key={coin.name}
                  className="flex w-full justify-between py-1 px-2.5 rounded-md shadow-[0_0_3px_black]"
                >
                  <span>{coin.name}</span>
                  <span>
                    {symbol} {coin.current_price.toLocaleString(local)}
                  </span>
                  <span>
                    <MdOutlineDeleteOutline
                      className="cursor-pointer"
                      onClick={() => removeFromWatchList(coin.id)}
                    />
                  </span>
                </div>
              );
            }
          })}
        </div>
      </div>
      <button
        className="w-full text-gray-900 bg-[#ffc107] mt-5 hover:bg-[#ffcd07] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
}
