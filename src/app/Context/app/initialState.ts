import { InitialState } from "@/app/Configs/types";

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

export default initialState;
