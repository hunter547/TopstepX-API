import type { AuthService } from "../auth";

export interface ConnectionManagerConfigInterface {
  marketHubUrl: string;
  userHubUrl: string;
  auth: AuthService;
  reconnectDelays?: number[];
}
