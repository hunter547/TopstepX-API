import { TopstepXError } from "./base.error";

export class ConnectionError extends TopstepXError {
  constructor(message: string) {
    super(message);
  }
}
