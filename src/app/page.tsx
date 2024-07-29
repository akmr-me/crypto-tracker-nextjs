import Image from "next/image";
import Banner from "./Components/Banner";
import "react-alice-carousel/lib/alice-carousel.css";
import Table from "./Components/Table";
import SearchInput from "./Components/SearchInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Banner />
      <div className="w-full xl:max-w-[1200px]">
        <h2 className="lato font-normal text-4xl leading-tight tracking-normal my-4 text-center">
          CryptoCurrency Prices by Market Cap
        </h2>
        <div className="mb-4">
          <SearchInput />
        </div>
        <div>
          <Table />
        </div>
      </div>
    </main>
  );
}
