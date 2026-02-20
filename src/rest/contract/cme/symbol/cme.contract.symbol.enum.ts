export enum CmeContractSymbolEnum {
  //////////////
  // EQUITIES //
  //////////////

  // E-mini S&P 500
  E_MINI_SP_500 = "ES",
  MICRO_E_MINI_SP_500 = "MES",

  // E-mini NASDAQ
  E_MINI_NASDAQ = "NQ",
  MICRO_E_MINI_NASDAQ = "MNQ",

  // E-mini Russell
  E_MINI_RUSSELL = "RTY",
  MICRO_E_MINI_RUSSELL = "M2K",

  // Nikkei
  NIKKEI = "NKD",

  // Dow
  MINI_DOW = "YM",
  MICRO_MINI_DOW = "MYM",

  //////////////////////
  // FORIEGN EXCHANGE //
  //////////////////////

  // Austrailian Dollar/US Dollar
  AUD_USD = "6A",
  MICRO_AUD_USD = "M6A",

  // British Pound/US Dollar
  GBP_USD = "6B",
  MICRO_GBP_USD = "M6B",

  // Canadian Dollar/US Dollar
  CAD_USD = "6C",

  // Euro/US Dollar
  EUR_USD = "6E",
  MICRO_EUR_USD = "M6E",
  E_MINI_EUR_USD = "E7",

  // Japanese Yen/US Dollar
  JPY_USD = "6J",

  // Swiss Franc/US Dollar
  CHF_USD = "6S",

  // Mexican Peso/US Dollar
  MXN_USD = "6M",

  // New Zealand Dollar/US Dollar
  NZD_USD = "6N",

  ////////////////
  // LIVE STOCK //
  ////////////////

  LEAN_HOGS = "HE",
  LIVE_CATTLE = "LE",

  ///////////
  // CROPS //
  ///////////

  CORN = "ZC",
  WHEAT = "ZW",
  SOYBEANS = "ZS",
  SOYBEAN_MEAL = "ZM",
  SOYBEAN_OIL = "ZL",

  ///////////////
  // GAS & OIL //
  ///////////////

  CRUDE_OIL = "CL",
  MICRO_CRUDE_OIL = "MCL",
  NATURAL_GAS = "NG",
  MICRO_NATURAL_GAS = "MNG",
  E_MINI_CRUDE_OIL = "QM",
  E_MINI_NATURAL_GAS = "QG",
  RBOB_GASOLINE = "RB",
  HEATING_OIL = "HO",

  ///////////////////
  // NOTES & BONDS //
  ///////////////////

  TWO_YEAR_NOTE = "ZT",
  FIVE_YEAR_NOTE = "ZF",
  TEN_YEAR_NOTE = "ZN",
  TEN_YEAR_ULTRA_NOTE = "TN",
  THIRTY_YEAR_BOND = "ZB",
  ULTRA_BOND = "UB",

  ////////////
  // METALS //
  ////////////

  GOLD = "GC",
  MICRO_GOLD = "MGC",
  SILVER = "SI",
  MICRO_SILVER = "SIL",
  COPPER = "HG",
  MICRO_COPPER = "MHG",
  PLATINUM = "PL",

  ////////////
  // CRYPTO //
  ////////////

  MICRO_BITCOIN = "MBT",
  MICRO_ETHER = "MET",
}
