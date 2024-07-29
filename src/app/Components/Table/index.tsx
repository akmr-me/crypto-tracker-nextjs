"use client";

import { useCryptoContext } from "@/app/Context/CryptoContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Table() {
  const { state: { coins, symbol, local, searchKeyWord } = {} } =
    useCryptoContext();
  const [page, setPage] = useState(1);

  // Whenever user search for any crypto, current pagination is set based on all coin so reseting page back to 1 so that pagination workd based on current search keyword
  useEffect(() => {
    setPage(1);
  }, [searchKeyWord]);

  const handleSearch = () => {
    return coins?.filter(
      (coin) =>
        coin?.name.toLowerCase().includes(searchKeyWord) ||
        coin?.symbol.toLowerCase().includes(searchKeyWord)
    );
  };

  const handleNextPage = () =>
    setPage((prev) => {
      return prev >= (coinsAfterSearch?.length || 0) / 10
        ? (coinsAfterSearch?.length || 0) / 10
        : prev + 1;
    });

  const handlePreviousPage = () => {
    setPage((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  const handleJumpToPage = (page: number) => setPage(page);

  const paginationRangeArray = () => {
    const TempArr = [];
    const paginationButtonCount = Math.ceil(
      (coinsAfterSearch?.length || 0) / 20
    );
    const startPaginationNumber =
      page >=
      Math.ceil((coinsAfterSearch?.length || 0) / 10) -
        paginationButtonCount +
        1
        ? Math.ceil((coinsAfterSearch?.length || 0) / 10) -
          paginationButtonCount +
          1
        : page;
    const endPaginationNumber =
      startPaginationNumber + paginationButtonCount - 1;
    for (let i = startPaginationNumber; i <= endPaginationNumber; i++) {
      TempArr.push(i);
    }
    return TempArr;
  };

  const coinsAfterSearch = handleSearch();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-black text-white lato">
          <tr>
            <th scope="col" className="px-6 py-6">
              Coin
            </th>
            <th scope="col" className="px-6 py-6">
              Price
            </th>
            <th scope="col" className="px-6 py-6">
              24H Change
            </th>
            <th scope="col" className="px-6 py-6 text-right">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody>
          {coinsAfterSearch
            ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
            ?.map((row, i) => {
              const profit = row.price_change_percentage_24h > 0;
              return (
                <tr
                  key={row.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-black-rgba-10 even:dark:bg-black-rgba-10 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex gap-4 items-center">
                      <Link href={`/coins/${row.id}?image=${row.image}`}>
                        <img
                          src={row?.image}
                          alt={row?.name}
                          className="h-[50px]"
                        />
                      </Link>
                      <div className="flex flex-col">
                        <span className="text-xl uppercase">{row.symbol}</span>
                        <Link href={`/coins/${row.id}?image=${row.image}`}>
                          <span>{row.name}</span>
                        </Link>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-6">
                    {symbol} {row.current_price.toLocaleString(local)}
                  </td>
                  <td className="px-6 py-6">
                    {profit && "+"} {row.price_change_percentage_24h.toFixed(2)}
                    %
                  </td>
                  <td className="px-6 py-6 text-right">
                    {" "}
                    {symbol} {row.market_cap.toLocaleString(local).slice(0, -7)}{" "}
                    M
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 mb-10"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {(page - 1) * 10 + 1}-
            {Math.min(page * 10, coinsAfterSearch?.length || 0)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {coinsAfterSearch?.length}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>
          {paginationRangeArray().map((item) => {
            return (
              <>
                <li key={item}>
                  <button
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      item === page
                        ? "bg-gray-800 text-white dark:bg-white dark:text-black"
                        : ""
                    }`}
                    onClick={() => handleJumpToPage(item)}
                  >
                    {item}
                  </button>
                </li>
              </>
            );
          })}
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={handleNextPage}
              disabled={page >= (coinsAfterSearch?.length || 0) / 10}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
