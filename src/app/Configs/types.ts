export interface CoinType {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: unknown;
  platforms: Record<string, string>;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  public_notice: unknown;
  additional_notices: string[];
  localization: Localization;
  description: Localization;
  links: CoinLinks;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: MarketData;
  community_data: {
    facebook_likes: string | number | null;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: string | number | null;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: { additions: number; deletions: number };
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: number[];
  };
  public_interest_stats: { alexa_rank: number; bing_matches: null | number };
  status_updates: number[];
  last_updated: Date;
  //   tickers: Ticker[];
}

export interface Localization {
  en: string;
  de: string;
  es: string;
  fr: string;
  it: string;
  pl: string;
  ro: string;
  hu: string;
  nl: string;
  pt: string;
  sv: string;
  vi: string;
  tr: string;
  ru: string;
  ja: string;
  zh: string;
  "zh-tw": string;
  ko: string;
  ar: string;
  th: string;
  id: string;
  cs: string;
  da: string;
  el: string;
  hi: string;
  no: string;
  sk: string;
  uk: string;
  he: string;
  fi: string;
  bg: string;
  hr: string;
  lt: string;
  sl: string;
}

export interface CoinList {
  id: string;
  symbol: string;
  name: string;
}

interface CoinLinks {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: string | null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}

export interface MarketData {
  current_price: Currency;
  total_value_locked: number | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: number | null;
  ath: Currency;
  ath_change_percentage: Currency;
  ath_date: Currency;
  atl: Currency;
  atl_change_percentage: Currency;
  atl_date: Currency;
  market_cap: Currency;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: Currency;
  high_24h: Currency;
  low_24h: Currency;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: Currency;
  price_change_percentage_1h_in_currency: Currency;
  price_change_percentage_24h_in_currency: Currency;
  price_change_percentage_7d_in_currency: Currency;
  price_change_percentage_14d_in_currency: Currency;
  price_change_percentage_30d_in_currency: Currency;
  price_change_percentage_60d_in_currency: Currency;
  price_change_percentage_200d_in_currency: Currency;
  price_change_percentage_1y_in_currency: Currency;
  market_cap_change_24h_in_currency: Currency;
  market_cap_change_percentage_24h_in_currency: Currency;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  last_updated: Date;
}

export interface Currency {
  USD: string;
  INR: string;
}
