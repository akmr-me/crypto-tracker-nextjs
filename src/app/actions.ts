import axios from "axios";
import { CoinList, SingleCoin, TrendingCoins } from "./Configs/api";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function fetchTrendingCoins(currency: string): Promise<any> {
  let { data } = await axios(TrendingCoins(currency));
  return data;
}

export async function fetchCoinList(currency: string): Promise<any> {
  let { data } = await axios(CoinList(currency));
  return data;
}

export async function fetchSingleCoin(coin: string) {
  let { data } = await axios(SingleCoin(coin));
  return data;
}

export async function signInWithGoogle() {
  const res = await signInWithPopup(auth, googleProvider);
  return res;
}
