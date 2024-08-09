import Carousel from "@/app/Components/Banner/Carousel";

export default function Banner() {
  return (
    <div className="bg-[url('/Banner.webp')] bg-contain w-full">
      <div className="flex flex-col pt-6 justify-around h-[300px] md:h-[400px] w-full mx-auto box-border xl:max-w-[1200px]">
        <div className="flex justify-center flex-col text-center h-0">
          <h1 className="text-white font-bold mb-3.5 lato text-[3.75rem] leading-[1.2] tracking-[-0.00833em]">
            Crypto Tracker
          </h1>
          <p className="text-[darkgrey] capitalize lato font-medium text-sm leading-[1.57] tracking-[0.00714em]">
            Track You Favorite Crypto Currency
          </p>
        </div>
        <div className="h-[60%] flex items-center">
          <Carousel />
        </div>
      </div>
    </div>
  );
}
