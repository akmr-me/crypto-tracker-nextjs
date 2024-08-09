import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import axios from "axios";
import { useCryptoContext } from "@/app/Context/app";
import { HistoricalChart } from "@/app/Configs/api";
import { Chart as ReactGoogleChart } from "react-google-charts";
import chartDays from "@/app/Configs/chartDays";
import ButtonGroup from "@/app/Components/common/ButtonGroup";
import ChartSkeleton from "@/app/Components/Coin/Skeleton/Chart";

interface ParamsType {
  coin: string;
}

export default function Chart({ coin }: ParamsType) {
  const {
    state: { currency },
  } = useCryptoContext();
  const [historicData, setHistoricData] = useState<number[][] | undefined>();
  const [days, setDays] = useState(1);
  const { theme } = useTheme();

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
    chartArea: {
      // leave room for y-axis labels
      width: "85%",
      height: "80%",
    },
    bar: { groupWidth: "100%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
    ...(theme === "dark"
      ? {
          backgroundColor: "#14161A",
          vAxis: { textStyle: { color: "white", fontSize: 12 } },
          hAxis: { textStyle: { color: "white", fontSize: 12 } },
        }
      : {
          hAxis: { textStyle: { fontSize: 12 } },
          vAxis: { textStyle: { fontSize: 12 } },
        }),
  };

  if (!historicData) return <ChartSkeleton />;

  return (
    <div className="w-[70%] m-6 flex justify-center flex-col h-max-content">
      <p className="z-10 text-center">
        Price (<b>Past {days} Days</b>) in {currency}
      </p>
      <div className="w-full h-[500px]">
        <ReactGoogleChart
          chartType="CandlestickChart"
          width="auto"
          height="500px"
          className="dark:bg-gray-700"
          chartEvents={[
            {
              eventName: "ready",
              callback: ({ chartWrapper, google }) => {
                console.log("hiiiiiiii");
              },
            },
          ]}
          data={[
            // ["Time", "Open", "High", "Low", "Close"], //API formate
            ["Time", "Low", "Open", "Close", "High"],
            ...historicData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}: ${date
                      .getMinutes()
                      .toString()
                      .padEnd(2, "0")} PM`
                  : `${date.getHours()}:${date
                      .getMinutes()
                      .toString()
                      .padEnd(2, "0")} AM`;
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
      </div>
      <ButtonGroup
        className="flex w-full justify-center mt-8"
        data={chartDays}
        onClick={(e, value) => {
          if (typeof value === "number") setDays(value);
        }}
        selected={days}
      />
    </div>
  );
}
