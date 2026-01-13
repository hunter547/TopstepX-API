import { describe, it, expect, vi } from 'vitest';
import { TypedEventEmitter } from '../src/utils';

interface TestEvents {
  [key: string]: unknown;
  data: { value: number };
  message: string;
  empty: void;
}

class TestEmitter extends TypedEventEmitter<TestEvents> {
  emitData(value: number) {
    this.emit('data', { value });
  }

  emitMessage(msg: string) {
    this.emit('message', msg);
  }

  emitEmpty() {
    this.emit('empty');
  }
}

describe('TypedEventEmitter', () => {
  it('should emit events with object data', () => {
    const emitter = new TestEmitter();
    const handler = vi.fn();

    emitter.on('data', handler);
    emitter.emitData(42);

    expect(handler).toHaveBeenCalledWith({ value: 42 });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should emit events with primitive data', () => {
    const emitter = new TestEmitter();
    const handler = vi.fn();

    emitter.on('message', handler);
    emitter.emitMessage('hello');

    expect(handler).toHaveBeenCalledWith('hello');
  });

  it('should emit void events', () => {
    const emitter = new TestEmitter();
    const handler = vi.fn();

    emitter.on('empty', handler);
    emitter.emitEmpty();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should support multiple listeners', () => {
    const emitter = new TestEmitter();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    emitter.on('data', handler1);
    emitter.on('data', handler2);
    emitter.emitData(1);

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });

  it('should remove listener with off()', () => {
    const emitter = new TestEmitter();
    const handler = vi.fn();

    emitter.on('data', handler);
    emitter.off('data', handler);
    emitter.emitData(1);

    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle once() listeners', () => {
    const emitter = new TestEmitter();
    const handler = vi.fn();

    emitter.once('data', handler);
    emitter.emitData(1);
    emitter.emitData(2);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({ value: 1 });
  });

  it('should remove all listeners for an event', () => {
    const emitter = new TestEmitter();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    emitter.on('data', handler1);
    emitter.on('data', handler2);
    emitter.removeAllListeners('data');
    emitter.emitData(1);

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  it('should remove all listeners when no event specified', () => {
    const emitter = new TestEmitter();
    const dataHandler = vi.fn();
    const messageHandler = vi.fn();

    emitter.on('data', dataHandler);
    emitter.on('message', messageHandler);
    emitter.removeAllListeners();
    emitter.emitData(1);
    emitter.emitMessage('test');

    expect(dataHandler).not.toHaveBeenCalled();
    expect(messageHandler).not.toHaveBeenCalled();
  });

  it('should be chainable', () => {
    const emitter = new TestEmitter();
    const handler = vi.fn();

    const result = emitter.on('data', handler).on('message', vi.fn());

    expect(result).toBe(emitter);
  });
});
