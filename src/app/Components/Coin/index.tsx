"use client";
import Chart from "@/app/Components/Coin/Chart";
import SideBar from "./SideBar";

interface CoinPropType {
  coin: string;
}

export default function Coin({ coin }: CoinPropType) {
  return (
    <div className="containerRoot flex min-h-screen-minus-64">
      <SideBar {...{ coin }} />
      <Chart {...{ coin }} />
    </div>
  );
}
