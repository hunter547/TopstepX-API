import {
  HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
  HubConnectionState,
} from '@microsoft/signalr';
import type { AuthService } from '../auth';
import { ConnectionError } from '../errors';

export interface ConnectionManagerConfig {
  marketHubUrl: string;
  userHubUrl: string;
  auth: AuthService;
  reconnectDelays?: number[];
}

export class ConnectionManager {
  private marketConn: HubConnection | null = null;
  private userConn: HubConnection | null = null;
  private readonly config: Required<ConnectionManagerConfig>;
  private marketConnectionCallbacks: Array<(conn: HubConnection) => void> = [];
  private userConnectionCallbacks: Array<(conn: HubConnection) => void> = [];

  constructor(config: ConnectionManagerConfig) {
    this.config = {
      marketHubUrl: config.marketHubUrl,
      userHubUrl: config.userHubUrl,
      auth: config.auth,
      reconnectDelays: config.reconnectDelays ?? [0, 2000, 5000, 10000, 30000],
    };
  }

  async connect(): Promise<void> {
    const token = await this.config.auth.getSessionToken();

    // Build market connection
    this.marketConn = new HubConnectionBuilder()
      .withUrl(`${this.config.marketHubUrl}?access_token=${token}`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => this.config.auth.getSessionToken(),
      })
      .withAutomaticReconnect(this.config.reconnectDelays)
      .build();

    // Build user connection
    this.userConn = new HubConnectionBuilder()
      .withUrl(`${this.config.userHubUrl}?access_token=${token}`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => this.config.auth.getSessionToken(),
      })
      .withAutomaticReconnect(this.config.reconnectDelays)
      .build();

    // Notify callbacks before starting
    this.marketConnectionCallbacks.forEach((cb) => cb(this.marketConn!));
    this.userConnectionCallbacks.forEach((cb) => cb(this.userConn!));

    // Start connections
    try {
      await this.marketConn.start();
      await this.userConn.start();
    } catch (error) {
      throw new ConnectionError(
        `Failed to establish WebSocket connections: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async disconnect(): Promise<void> {
    await Promise.all([this.marketConn?.stop(), this.userConn?.stop()]);
    this.marketConn = null;
    this.userConn = null;
  }

  get isConnected(): boolean {
    return (
      this.marketConn?.state === HubConnectionState.Connected &&
      this.userConn?.state === HubConnectionState.Connected
    );
  }

  get marketConnection(): HubConnection {
    if (!this.marketConn) {
      throw new ConnectionError('Market connection not initialized');
    }
    return this.marketConn;
  }

  get userConnection(): HubConnection {
    if (!this.userConn) {
      throw new ConnectionError('User connection not initialized');
    }
    return this.userConn;
  }

  onMarketConnection(callback: (conn: HubConnection) => void): void {
    this.marketConnectionCallbacks.push(callback);
    if (this.marketConn) callback(this.marketConn);
  }

  onUserConnection(callback: (conn: HubConnection) => void): void {
    this.userConnectionCallbacks.push(callback);
    if (this.userConn) callback(this.userConn);
  }
}
