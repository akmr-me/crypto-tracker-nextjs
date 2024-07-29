import { useEffect, useState } from "react";
import { useCryptoContext } from "../Context/CryptoContext";
import { HistoricalChart } from "../Configs/api";
import axios from "axios";
import { Chart } from "react-google-charts";
import chartDays from "../Configs/chartDays";
import ButtonGroup from "./ButtonGroup";
import { useTheme } from "next-themes";

interface ParamsType {
  coin: string;
}

export default function CoinInfo({ coin }: ParamsType) {
  const {
    state: { symbol, currency, local, user, watchlist },
  } = useCryptoContext();
  const [historicData, setHistoricData] = useState<number[][] | undefined>();
  const [days, setDays] = useState(1);
  const { theme } = useTheme();
  console.log({ theme });
  useEffect(() => {
    const fetchHistoricData = async () => {
      const { data } = await axios.get(HistoricalChart(coin, days, currency));
      setHistoricData(data);
    };
    coin && fetchHistoricData();
    // eslint-disable-next-line
  }, [days, currency, coin]);

  const options = {
    legend: "none",
    bar: { groupWidth: "100%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
    ...(theme === "dark"
      ? {
          backgroundColor: "#14161A",
          vAxis: { textStyle: { color: "white" } },
          hAxis: { textStyle: { color: "white" } },
        }
      : {}),
  };

  if (!historicData) return "hiiiiiiiiiiiiiii";

  return (
    <div className="w-full">
      <p
        className="absolute top-[15%] left-1/2 z-100 transform-center"
        style={{ zIndex: 100 }}
      >{`Price (Past ${days} Days) in ${currency}`}</p>
      <Chart
        chartType="CandlestickChart"
        width="auto"
        height="600px"
        className="dark:bg-gray-700"
        data={[
          // ["Time", "Open", "High", "Low", "Close"], //API formate
          ["Time", "Low", "Open", "Close", "High"],
          ...historicData.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return [
              days === 1 ? time : date.toLocaleDateString(),
              // Formating data since both api's and react google chart data is in diffrent formate
              coin[3],
              coin[1],
              coin[4],
              coin[2],
            ];
          }),
        ]}
        options={options}
      />
      <ButtonGroup
        className="flex w-full justify-center"
        data={chartDays}
        onClick={(e, value) => {
          if (typeof value === "number") setDays(value);
        }}
        selected={days}
      />
    </div>
  );
}
