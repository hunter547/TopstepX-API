import { TopstepXError } from './base-error';

export class ApiError extends TopstepXError {
  constructor(
    message: string,
    code: number,
    public readonly endpoint: string
  ) {
    super(message, code);
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      endpoint: this.endpoint,
    };
  }
}
