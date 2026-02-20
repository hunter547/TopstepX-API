/**
 * Type of order to place.
 * @category Enums
 */
export enum OrderTypeEnum {
    /** Limit order - executes at specified price or better */
    Limit = 1,
    /** Market order - executes immediately at current market price */
    Market = 2,
    /** Stop order - becomes market order when stop price is reached */
    Stop = 3,
    /** Stop-limit order - becomes limit order when stop price is reached */
    StopLimit = 4,
}