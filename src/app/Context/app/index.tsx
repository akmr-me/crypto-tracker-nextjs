"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  SET_ALERT,
  SET_COINS,
  SET_LOCAL,
  SET_SYMBOL,
  SET_USER,
  SET_WATCHLIST,
} from "@/app/Context/app/actionTypes";
import { fetchCoinList } from "@/app/actions";
import { auth, db } from "@/app/firebase";
import { ActionType, InitialState } from "@/app/Configs/types";
import reducer from "@/app/Context/app/reducer";
import initialState from "@/app/Context/app/initialState";

interface CryptoContextType {
  state: InitialState;
  dispatch: React.Dispatch<ActionType>;
}
const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue: CryptoContextType = { state, dispatch };

  useEffect(() => {
    dispatch({
      type: SET_SYMBOL,
      payload: state.currency === "USD" ? "$" : "₹",
    });
    dispatch({
      type: SET_LOCAL,
      payload: state.local === "USD" ? "en-US" : "en-IN",
    });
    (async () => {
      let coins = await fetchCoinList(state.currency);
      dispatch({
        type: SET_COINS,
        payload: coins,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currency]);

  useEffect(() => {
    if (state.alert.open) {
      toast[state.alert.type as keyof typeof toast](state.alert.message, {
        onDismiss: () =>
          dispatch({ type: SET_ALERT, payload: { message: "", open: false } }),
        onAutoClose: () =>
          dispatch({ type: SET_ALERT, payload: { message: "", open: false } }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.alert.open]);

  // Observer for user signin
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: SET_USER, payload: user });
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // check snapshot in db firebase
  useEffect(() => {
    let unSubscribe: (() => void) | undefined;
    if (state.user) {
      const coinDbRef = doc(db, "watchlist", state.user.uid);
      unSubscribe = onSnapshot(coinDbRef, (coin) => {
        if (coin.exists()) {
          dispatch({ type: SET_WATCHLIST, payload: coin.data().coins });
        } else {
          dispatch({
            type: SET_ALERT,
            payload: {
              open: true,
              message: "Coin Does not exits in DB!",
              type: "error",
            },
          });
        }
      });
    }
    return () => {
      unSubscribe && unSubscribe();
    };
  }, [state.user]);

  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCryptoContext must be used within a CryptoProvider");
  }
  return context;
};
