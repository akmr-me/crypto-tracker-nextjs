import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { SET_ALERT } from "@/app/Context/app/actionTypes";
import { useCryptoContext } from "../Context/app";

export default function useUpdateWatchList() {
  const { state: { user, watchlist } = {}, dispatch } = useCryptoContext();

  const addToWatchlist = async (coin: string) => {
    if (!user) return null;
    const coinDbRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinDbRef, {
        coins: watchlist ? [...watchlist, coin] : [coin],
      });

      dispatch({
        type: SET_ALERT,
        payload: {
          open: true,
          type: "success",
          message: `${coin} Added to Watchlist.`,
        },
      });
    } catch (e) {
      dispatch({
        type: SET_ALERT,
        payload: {
          open: true,
          type: "error",
          message: "Failed to add to Watchlist!",
        },
      });
    }
  };

  const removeFromWatchList = async (coin: string) => {
    if (!user) return;

    const coinDbRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinDbRef,
        {
          coins: watchlist?.filter((watch) => coin !== watch),
        },
        { merge: true }
      );
      dispatch({
        type: SET_ALERT,
        payload: {
          open: true,
          type: "info",
          message: `${coin} Removed from Watchlist.`,
        },
      });
    } catch (e) {
      console.log({ e });
      dispatch({
        type: SET_ALERT,
        payload: {
          open: true,
          type: "error",
          message: "Remove from Watchlist failed!",
        },
      });
    }
  };

  return { addToWatchlist, removeFromWatchList };
}
