import Coin from "@/app/Components/Coin";

export const generateMetadata = ({ params, searchParams }: CoinPageType) => {
  return {
    title: params.coin[0].toUpperCase() + params.coin.slice(1),
    icons: {
      icon: [{ url: searchParams.image }],
    },
  };
};

type Coin = string;
interface CoinPageType {
  params: {
    coin: Coin;
  };
  searchParams: {
    image: string;
  };
}
export default function Page({ params }: CoinPageType) {
  const { coin } = params;
  return <Coin {...{ coin }} />;
}
