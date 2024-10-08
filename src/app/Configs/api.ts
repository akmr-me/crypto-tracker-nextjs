export const CoinList = (currency: string): string =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id: string): string =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (
  id: string,
  days: number = 365,
  currency: string
): string =>
  `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency: string): string =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
