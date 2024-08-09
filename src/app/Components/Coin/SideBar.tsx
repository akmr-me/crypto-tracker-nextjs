"use client";

import { useEffect, useState } from "react";
import HTMLReactParser, { Element } from "html-react-parser";
import Image from "next/image";
import { fetchSingleCoin } from "@/app/actions";
import { CoinType } from "@/app/Configs/types";
import { useCryptoContext } from "@/app/Context/app";
import useUpdateWatchList from "@/app/hooks/useUpdateWatchList";
import SideBarSkeleton from "@/app/Components/Coin/Skeleton/SideBar";

export default function SideBar({ coin }: { coin: string }) {
  const [coinDetails, setCoinDetails] = useState<CoinType>();
  const {
    state: { symbol, currency, local, user, watchlist },
  } = useCryptoContext();
  const { addToWatchlist, removeFromWatchList } = useUpdateWatchList();

  useEffect(() => {
    (async () => {
      const data = await fetchSingleCoin(coin);
      setCoinDetails(data);
    })();
  }, [coin]);

  if (!coinDetails) return <SideBarSkeleton />;

  const inWatchlist = watchlist.includes(coinDetails?.id);

  return (
    <div className="sidebarRoot w-[30%] flex flex-col items-center m-6 border-r-2 border-gray-500">
      <Image
        src={coinDetails?.image.large}
        alt={coinDetails?.name}
        height={200}
        width={200}
        className="mb-5"
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
      <div className="self-start px-6 pt-2.5 pb-6.25 w-full">
        <span className="flex">
          <h6 className="marketDataRoot mb-2.5 text-xl leading-[1.6] tracking-[0.0075em] font-bold lato">
            Rank:
          </h6>
          &nbsp; &nbsp;
          <p className="m-0 font-normal text-base leading-[1.75] tracking-[0.00938em] lato w-full text-right">
            {coinDetails?.market_cap_rank}
          </p>
        </span>

        <span className="flex">
          <h6 className="heading mb-2.5 text-xl leading-[1.6] tracking-[0.0075em] font-bold lato w-full">
            Current Price:
          </h6>
          &nbsp; &nbsp;
          <p className="m-0 font-normal text-base leading-[1.75] tracking-[0.00938em] lato w-full text-right">
            {symbol}{" "}
            {
              coinDetails.market_data.current_price[
                currency.toLowerCase() as keyof typeof coinDetails.market_data.market_cap
              ].toLocaleString(local) // Solution to toLocaleString type issue at https://github.com/microsoft/TypeScript/pull/57679
            }
          </p>
        </span>
        <span className="flex">
          <h6 className="mb-2.5 text-xl leading-[1.6] tracking-[0.0075em] font-bold lato w-full">
            Market Cap:
          </h6>
          &nbsp; &nbsp;
          <p className="m-0 font-normal text-base leading-[1.75] tracking-[0.00938em] lato w-full text-right">
            {symbol}{" "}
            {/* soln for below type issue https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b */}
            {coinDetails?.market_data.market_cap[
              currency.toLowerCase() as keyof typeof coinDetails.market_data.market_cap
            ]
              .toLocaleString(local)
              .slice(0, -7)}{" "}
            M
          </p>
        </span>
        {user && (
          <span className="flex m-0 font-normal text-base leading-[1.75] tracking-[0.00938em] lato justify-center text-customYellow">
            <button
              className="relative inline-flex items-center justify-center p-1 overflow-hidden text-sm font-medium text-customYellowadd rounded-lg border border-customGray m-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onClick={() =>
                inWatchlist ? removeFromWatchList(coin) : addToWatchlist(coin)
              }
            >
              <span className="relative px-4 py-1 dark:bg-transparent rounded-md group-hover:bg-opacity-0">
                {" "}
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </span>{" "}
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
