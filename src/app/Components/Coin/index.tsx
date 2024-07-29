"use client";
import { fetchSingleCoin } from "@/app/actions";
import { CoinType } from "@/app/Configs/types";
import { useCryptoContext } from "@/app/Context/CryptoContext";
import { useEffect, useState } from "react";
import HTMLReactParser, { Element } from "html-react-parser";
import Image from "next/image";
import CoinInfo from "@/app/Components/CoinInfo";

type Coin = string;
interface CoinPropType {
  coin: Coin;
}
export default function Coin({ coin }: CoinPropType) {
  const [coinDetails, setCoinDetails] = useState<CoinType>();
  const {
    state: { symbol, currency, local, user, watchlist },
  } = useCryptoContext();

  useEffect(() => {
    (async () => {
      const data = await fetchSingleCoin(coin);
      setCoinDetails(data);
    })();
  }, [coin]);

  if (!coinDetails) return "Loading";
  const inWatchlist = watchlist.includes(coinDetails?.id);

  return (
    <div className="containerRoot flex">
      <div className="sidebarRoot w-[35%] flex flex-col items-center m-6 border-r-2 border-gray-500">
        <Image
          src={coinDetails?.image.large}
          alt={coinDetails?.name}
          height="200"
          width={200}
          style={{ marginBottom: 20 }}
        />
        <h3 className="mb-2.5 text-3xl leading-tight tracking-normal font-bold lato">
          {coinDetails.name}
        </h3>
        <p className="m-0 font-medium text-sm leading-[1.57] tracking-[0.00714em] w-full lato px-6 pb-3.5 text-justify">
          {/* {coinDetails?.description.en} */}
          {HTMLReactParser(String(coinDetails?.description.en.split("\n")[0]), {
            replace: (node) => {
              if (node instanceof Element && node.name) {
                if (node.name === "a") {
                  return node.children;
                }
              }
            },
          })}
        </p>
        <div className="self-start px-6 pt-2.5 pb-6.25">
          <span className="flex">
            <h6 className="marketDataRoot mb-2.5 text-xl leading-[1.6] tracking-[0.0075em] font-bold lato">
              Rank:
            </h6>
            &nbsp; &nbsp;
            <p className="m-0 font-normal text-base leading-[1.75] tracking-[0.00938em] lato">
              {coinDetails?.market_cap_rank}
            </p>
          </span>

          <span className="flex">
            <h6 className="heading mb-2.5 text-xl leading-[1.6] tracking-[0.0075em] font-bold lato">
              Current Price:
            </h6>
            &nbsp; &nbsp;
            <p className="m-0 font-normal text-base leading-[1.75] tracking-[0.00938em] lato">
              {symbol}{" "}
              {
                coinDetails.market_data.current_price[
                  currency.toLowerCase() as keyof typeof coinDetails.market_data.market_cap
                ].toLocaleString(local) // Solution to toLocaleString type issue at https://github.com/microsoft/TypeScript/pull/57679
              }
            </p>
          </span>
          <span className="flex ">
            <h6 className="mb-2.5 text-xl leading-[1.6] tracking-[0.0075em] font-bold lato">
              Market Cap:
            </h6>
            &nbsp; &nbsp;
            <h6 className="flex m-0 font-normal text-base leading-[1.75] tracking-[0.00938em] lato">
              {symbol}{" "}
              {/* soln for below type issue https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b */}
              {coinDetails?.market_data.market_cap[
                currency.toLowerCase() as keyof typeof coinDetails.market_data.market_cap
              ]
                .toLocaleString(local)
                .slice(0, -7)}{" "}
              M
            </h6>
          </span>
          {user && (
            <button>
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          )}
        </div>
      </div>
      <CoinInfo {...{ coin }} />
    </div>
  );
}
