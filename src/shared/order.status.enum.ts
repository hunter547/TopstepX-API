/**
 * Current status of an order.
 * @category Enums
 */
export enum OrderStatusEnum {
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