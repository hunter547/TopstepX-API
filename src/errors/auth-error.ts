import { TopstepXError } from './base-error';

export class AuthenticationError extends TopstepXError {
  constructor(message: string, code?: number) {
    super(message, code);
  }
}
