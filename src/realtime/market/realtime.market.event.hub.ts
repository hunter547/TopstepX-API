import type { ConnectionManager } from "../connection-manager";
import { TypedEventEmitter } from "../../utils";
import {
  RealtimeMarketDepthEventInterface,
  RealtimeMarketQuoteEventInterface,
  RealtimeMarketTradeEventInterface,
} from "./event";
import { RealtimeMarketEventHubInterface } from "./realtime.market.event.hub.interface";

export class RealtimeMarketEventHub extends TypedEventEmitter<RealtimeMarketEventHubInterface> {
  private subscribedQuotes = new Set<string>();
  private subscribedTrades = new Set<string>();
  private subscribedDepth = new Set<string>();

  constructor(private readonly connectionManager: ConnectionManager) {
    super();
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.connectionManager.onMarketConnection((connection) => {
      connection.on(
        "GatewayQuote",
        (contractId: string, data: RealtimeMarketQuoteEventInterface[]) => {
          this.emit("quote", { contractId, data });
        },
      );

      connection.on(
        "GatewayTrade",
        (contractId: string, data: RealtimeMarketTradeEventInterface[]) => {
          this.emit("trade", { contractId, data });
        },
      );

      connection.on(
        "GatewayDepth",
        (contractId: string, data: RealtimeMarketDepthEventInterface[]) => {
          this.emit("depth", { contractId, data });
        },
      );
    });
  }

  async subscribe(contractId: string): Promise<void> {
    await Promise.all([
      this.subscribeQuotes(contractId),
      this.subscribeTrades(contractId),
      this.subscribeDepth(contractId),
    ]);
  }

  async unsubscribe(contractId: string): Promise<void> {
    await Promise.all([
      this.unsubscribeQuotes(contractId),
      this.unsubscribeTrades(contractId),
      this.unsubscribeDepth(contractId),
    ]);
  }

  async subscribeQuotes(contractId: string): Promise<void> {
    if (this.subscribedQuotes.has(contractId)) return;
    const connection = this.connectionManager.marketConnection;
    await connection.invoke("SubscribeContractQuotes", contractId);
    this.subscribedQuotes.add(contractId);
  }

  async unsubscribeQuotes(contractId: string): Promise<void> {
    if (!this.subscribedQuotes.has(contractId)) return;
    const connection = this.connectionManager.marketConnection;
    await connection.invoke("UnsubscribeContractQuotes", contractId);
    this.subscribedQuotes.delete(contractId);
  }

  async subscribeTrades(contractId: string): Promise<void> {
    if (this.subscribedTrades.has(contractId)) return;
    const connection = this.connectionManager.marketConnection;
    await connection.invoke("SubscribeContractTrades", contractId);
    this.subscribedTrades.add(contractId);
  }

  async unsubscribeTrades(contractId: string): Promise<void> {
    if (!this.subscribedTrades.has(contractId)) return;
    const connection = this.connectionManager.marketConnection;
    await connection.invoke("UnsubscribeContractTrades", contractId);
    this.subscribedTrades.delete(contractId);
  }

  async subscribeDepth(contractId: string): Promise<void> {
    if (this.subscribedDepth.has(contractId)) return;
    const connection = this.connectionManager.marketConnection;
    await connection.invoke("SubscribeContractMarketDepth", contractId);
    this.subscribedDepth.add(contractId);
  }

  async unsubscribeDepth(contractId: string): Promise<void> {
    if (!this.subscribedDepth.has(contractId)) return;
    const connection = this.connectionManager.marketConnection;
    await connection.invoke("UnsubscribeContractMarketDepth", contractId);
    this.subscribedDepth.delete(contractId);
  }
}
