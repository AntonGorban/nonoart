import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  requestId?: string;
  startTime?: number;
}

const als = new AsyncLocalStorage<RequestContext>();

export const context = {
  run(store: RequestContext, callback: () => void) {
    return als.run(store, callback);
  },

  getStore(): RequestContext | undefined {
    return als.getStore();
  },

  getRequestId(): string | undefined {
    return als.getStore()?.requestId;
  },
};
