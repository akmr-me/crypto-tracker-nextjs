"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import {
  SET_ALERT,
  SET_COINS,
  SET_CURRENCY,
  SET_LOADING,
  SET_LOCAL,
  SET_SEARCH_KEYWORD,
  SET_SYMBOL,
  SET_USER,
  SET_WATCHLIST,
} from "../Configs/actionTypes";
import { fetchCoinList } from "../actions";

export interface InitialState {
  symbol: string;
  currency: string;
  local: string;
  coins: any[]; // Adjust this type as per the actual structure of 'coins'
  loading: boolean;
  user: null | {
    /* Define the structure of user object */
  };
  watchlist: any[]; // Adjust this type as per the actual structure of 'watchlist'
  alert: {
    open: boolean;
    type: string;
    message: string;
  };
  searchKeyWord: string;
}

const initialState: InitialState = {
  symbol: "₹",
  currency: "INR",
  local: "en-IN",
  coins: [],
  loading: false,
  user: null,
  watchlist: [],
  alert: {
    open: false,
    type: "success",
    message: "",
  },
  searchKeyWord: "",
};
interface ActionType {
  type: string;
  payload?: any;
}
interface CryptoContextType {
  state: InitialState;
  dispatch: React.Dispatch<ActionType>;
}
const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

function reducer(state: InitialState, action: ActionType) {
  switch (action.type) {
    case SET_SYMBOL:
      return { ...state, symbol: action.payload };
    case SET_CURRENCY:
      return { ...state, currency: action.payload };
    case SET_LOCAL:
      return { ...state, local: action.payload };
    case SET_COINS:
      return { ...state, coins: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_WATCHLIST:
      return { ...state, watchlist: action.payload };
    case SET_ALERT:
      return { ...state, alert: action.payload };
    case SET_SEARCH_KEYWORD:
      return { ...state, searchKeyWord: action.payload };
    default:
      return state;
  }
}

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
