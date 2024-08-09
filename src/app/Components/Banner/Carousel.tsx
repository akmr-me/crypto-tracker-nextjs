"use client";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import { fetchTrendingCoins } from "@/app/actions";
import { useCryptoContext } from "@/app/Context/app";
import { SET_LOADING } from "@/app/Context/app/actionTypes";
import Skeleton from "@/app/Components/common/Skeleton";
import Image from "next/image";

const responsive = {
  0: {
    items: 2,
  },
  612: {
    items: 3,
  },
  800: {
    items: 4,
  },
};

export default function Carousel() {
  const [trending, setTrending] = useState([]);

  const {
    state: { currency, symbol, local, loading },
    dispatch,
  } = useCryptoContext();

  useEffect(() => {
    (async function () {
      dispatch({ type: SET_LOADING, payload: true });
      const data = await fetchTrendingCoins(currency);
      dispatch({ type: SET_LOADING, payload: false });
      setTrending(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin: any) => {
    const profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link
        href={`/coins/${coin.id}?image=${coin.image}`}
        className="flex flex-col items-center cursor-pointer uppercase text-whitesmoke"
        key={coin.id}
      >
        {/* <img
          src={coin?.image}
          alt={coin?.name}
          style={{
            marginBottom: 10,
            height: "80px",
            "@media (maxWidth: 500px)": {
              height: "20px",
            },
          }}
        /> */}
        <Image
          src={coin?.image}
          alt={coin?.name}
          width={80}
          height={80}
          className="mb-2.5 h-5 sm:h-[80px]"
        />
        <span className="">{coin?.symbol}</span>
        &nbsp;
        <span
          style={{
            color: profit ? "rgb(14,203,29)" : "red",
            fontWeight: 500,
          }}
        >
          {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
        {!loading ? (
          <span className="text-[22px]">
            {symbol} {coin?.current_price?.toLocaleString(local)}
          </span>
        ) : (
          <Skeleton width="w-[40px]" height="h-[20px]" />
        )}
      </Link>
    );
  });

  return (
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
    />
  );
}
