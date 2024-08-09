import Coin from "@/app/Components/Coin";

// Dynamic title and favicon for coin page
export const generateMetadata = ({ params, searchParams }: CoinPageType) => {
  return {
    title: params.coin[0].toUpperCase() + params.coin.slice(1),
    icons: {
      icon: [{ url: searchParams.image }],
    },
  };
};

interface CoinPageType {
  params: {
    coin: string;
  };
  searchParams: {
    image: string;
  };
}
export default function Page({ params }: CoinPageType) {
  const { coin } = params;
  return <Coin {...{ coin }} />;
}
