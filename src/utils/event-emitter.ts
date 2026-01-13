// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventMap = { [key: string]: any };
type EventCallback<T> = T extends void ? () => void : (data: T) => void;

export class TypedEventEmitter<T extends EventMap = EventMap> {
  private listeners = new Map<keyof T, Set<EventCallback<T[keyof T]>>>();

  on<K extends keyof T>(event: K, callback: EventCallback<T[K]>): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback as EventCallback<T[keyof T]>);
    return this;
  }

  off<K extends keyof T>(event: K, callback: EventCallback<T[K]>): this {
    this.listeners.get(event)?.delete(callback as EventCallback<T[keyof T]>);
    return this;
  }

  once<K extends keyof T>(event: K, callback: EventCallback<T[K]>): this {
    const onceCallback = ((data: T[K]) => {
      this.off(event, onceCallback as EventCallback<T[K]>);
      (callback as (data: T[K]) => void)(data);
    }) as EventCallback<T[K]>;
    return this.on(event, onceCallback);
  }

  protected emit<K extends keyof T>(
    event: K,
    ...args: T[K] extends void ? [] : [T[K]]
  ): boolean {
    const callbacks = this.listeners.get(event);
    if (!callbacks || callbacks.size === 0) return false;

    callbacks.forEach((callback) => {
      try {
        if (args.length > 0) {
          (callback as (data: T[K]) => void)(args[0] as T[K]);
        } else {
          (callback as () => void)();
        }
      } catch (error) {
        console.error(`Error in event listener for ${String(event)}:`, error);
      }
    });
    return true;
  }

  removeAllListeners<K extends keyof T>(event?: K): this {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
    return this;
  }
}
