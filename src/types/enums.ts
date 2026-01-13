/**
 * Type of order to place.
 * @category Enums
 */
export enum OrderType {
  /** Limit order - executes at specified price or better */
  Limit = 1,
  /** Market order - executes immediately at current market price */
  Market = 2,
  /** Stop order - becomes market order when stop price is reached */
  Stop = 3,
  /** Stop-limit order - becomes limit order when stop price is reached */
  StopLimit = 4,
}

/**
 * Side of the order (buy or sell).
 * @category Enums
 */
export enum OrderSide {
  /** Buy order - go long or close short position */
  Buy = 0,
  /** Sell order - go short or close long position */
  Sell = 1,
}

/**
 * Current status of an order.
 * @category Enums
 */
export enum OrderStatus {
  /** Order is pending submission */
  Pending = 0,
  /** Order is working (open) in the market */
  Working = 1,
  /** Order has been completely filled */
  Filled = 2,
  /** Order was cancelled */
  Cancelled = 3,
  /** Order was rejected */
  Rejected = 4,
  /** Order is partially filled */
  PartiallyFilled = 5,
}

/**
 * Time unit for historical bar data.
 * @category Enums
 */
export enum BarUnit {
  /** Second bars */
  Second = 1,
  /** Minute bars */
  Minute = 2,
  /** Hourly bars */
  Hour = 3,
  /** Daily bars */
  Day = 4,
  /** Weekly bars */
  Week = 5,
  /** Monthly bars */
  Month = 6,
}

/**
 * Type of position (long or short).
 * @category Enums
 */
export enum PositionType {
  /** Long position - bought contracts */
  Long = 0,
  /** Short position - sold contracts */
  Short = 1,
}

/**
 * Type of trade execution.
 * @category Enums
 */
export enum TradeType {
  /** Trade executed at bid price */
  Bid = 0,
  /** Trade executed at ask price */
  Ask = 1,
}
