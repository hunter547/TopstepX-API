import type { ConnectionManager } from "../connection-manager";
import { TypedEventEmitter } from "../../utils/typed.event.emitter";
import { RealtimeUserEventHubInterface } from "./realtime.user.event.hub.interface";
import { RealtimeUserOrderUpdateInterface } from "./order/realtime.user.order.update.interface";
import { RealtimeUserPositionUpdateInterface } from "./position/realtime.user.position.update.interface";
import { RealtimeUserTradeUpdateInterface } from "./trade/realtime.user.trade.update.interface";
import { RealtimeUserAccountUpdateInterface } from "./account/realtime.user.account.update.interface";

export class RealtimeUserEventHub extends TypedEventEmitter<RealtimeUserEventHubInterface> {
  private subscribedOrders = new Set<number>();
  private subscribedPositions = new Set<number>();
  private subscribedTrades = new Set<number>();

  constructor(private readonly connectionManager: ConnectionManager) {
    super();
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.connectionManager.onUserConnection((connection) => {
      connection.on(
        "GatewayUserAccount",
        (data: RealtimeUserAccountUpdateInterface) => {
          this.emit("account", data);
        },
      );

      connection.on(
        "GatewayUserOrder",
        (data: RealtimeUserOrderUpdateInterface) => {
          this.emit("order", data);
        },
      );

      connection.on(
        "GatewayUserPosition",
        (data: RealtimeUserPositionUpdateInterface) => {
          this.emit("position", data);
        },
      );

      connection.on(
        "GatewayUserTrade",
        (data: RealtimeUserTradeUpdateInterface) => {
          this.emit("trade", data);
        },
      );
    });
  }

  async subscribe(accountId: number): Promise<void> {
    await Promise.all([
      this.subscribeOrders(accountId),
      this.subscribePositions(accountId),
      this.subscribeTrades(accountId),
    ]);
  }

  async unsubscribe(accountId: number): Promise<void> {
    await Promise.all([
      this.unsubscribeOrders(accountId),
      this.unsubscribePositions(accountId),
      this.unsubscribeTrades(accountId),
    ]);
  }

  async subscribeOrders(accountId: number): Promise<void> {
    if (this.subscribedOrders.has(accountId)) return;
    const connection = this.connectionManager.userConnection;
    await connection.invoke("SubscribeOrders", accountId);
    this.subscribedOrders.add(accountId);
  }

  async unsubscribeOrders(accountId: number): Promise<void> {
    if (!this.subscribedOrders.has(accountId)) return;
    const connection = this.connectionManager.userConnection;
    await connection.invoke("UnsubscribeOrders", accountId);
    this.subscribedOrders.delete(accountId);
  }

  async subscribePositions(accountId: number): Promise<void> {
    if (this.subscribedPositions.has(accountId)) return;
    const connection = this.connectionManager.userConnection;
    await connection.invoke("SubscribePositions", accountId);
    this.subscribedPositions.add(accountId);
  }

  async unsubscribePositions(accountId: number): Promise<void> {
    if (!this.subscribedPositions.has(accountId)) return;
    const connection = this.connectionManager.userConnection;
    await connection.invoke("UnsubscribePositions", accountId);
    this.subscribedPositions.delete(accountId);
  }

  async subscribeTrades(accountId: number): Promise<void> {
    if (this.subscribedTrades.has(accountId)) return;
    const connection = this.connectionManager.userConnection;
    await connection.invoke("SubscribeTrades", accountId);
    this.subscribedTrades.add(accountId);
  }

  async unsubscribeTrades(accountId: number): Promise<void> {
    if (!this.subscribedTrades.has(accountId)) return;
    const connection = this.connectionManager.userConnection;
    await connection.invoke("UnsubscribeTrades", accountId);
    this.subscribedTrades.delete(accountId);
  }
}
