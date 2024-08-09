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
} from "@/app/Context/app/actionTypes";
import { InitialState } from "@/app/Configs/types";

interface ActionType {
  type: string;
  payload?: any;
}

export default function reducer(state: InitialState, action: ActionType) {
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
