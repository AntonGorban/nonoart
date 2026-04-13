export type ErrorOptionsWithMeta = ErrorOptions & {
  meta?: Record<string, unknown>;
};

export class BaseError extends Error {
  public readonly isBaseError = true;
  readonly #message: string;
  public readonly meta?: Record<string, unknown> | undefined;

  constructor(message: string, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    let options: ErrorOptions | undefined;
    let meta: Record<string, unknown> | undefined;

    if (causeOrOptions instanceof Error) {
      options = { cause: causeOrOptions };
    } else if (causeOrOptions) {
      const { meta: metaFromOptions, ...rest } = causeOrOptions;
      options = rest;
      meta = metaFromOptions;
    }

    super(message, options);

    this.#message = message;
    this.name = this.constructor.name;
    this.meta = meta;

    Object.defineProperty(this, 'message', {
      get: () => this.#message,
      set: () => {
        throw new TypeError('Cannot set property message of BaseError (read-only)');
      },
      enumerable: true,
      configurable: true,
    });

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      const fallbackStack = new Error(message).stack;
      if (fallbackStack !== undefined) {
        this.stack = fallbackStack;
      }
    }
  }

  public override get message(): string {
    return this.#message;
  }

  public override set message(_value: string) {
    throw new TypeError('Cannot set property message of BaseError (read-only)');
  }

  public get [Symbol.toStringTag](): string {
    return `${this.name}: ${this.#message}`;
  }

  public override toString(): string {
    let result = `${this.name}: ${this.#message}`;

    const extraFields: Record<string, unknown> = {};
    for (const key of Object.keys(this)) {
      if (key === 'name' || key === 'message' || key === 'stack' || key === 'cause' || key === 'meta') {
        continue;
      }
      const value = (this as any)[key];
      if (value !== undefined && typeof value !== 'function') {
        extraFields[key] = value;
      }
    }

    if (this.meta && Object.keys(this.meta).length > 0) {
      extraFields['meta'] = this.meta;
    }

    if (Object.keys(extraFields).length > 0) {
      const pairs = Object.entries(extraFields)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join(', ');
      result += ` { ${pairs} }`;
    }

    if (this.cause !== undefined) {
      const causeStr = this.cause instanceof Error ? this.cause.toString() : String(this.cause);
      result += `\nCaused by: ${causeStr}`;
    }

    result += `\n${this.stack}`;
    return result;
  }

  public toJSON(): BaseErrorJSON {
    const result: BaseErrorJSON = {
      name: this.name,
      message: this.#message,
      isBaseError: this.isBaseError,
    };

    if (this.meta && Object.keys(this.meta).length > 0) {
      result.meta = this.meta;
    }

    if (this.cause !== undefined) {
      if (this.cause instanceof Error) {
        const causeJSON =
          typeof (this.cause as any).toJSON === 'function' ? (this.cause as any).toJSON() : String(this.cause);
        result.cause = causeJSON;
      } else {
        result.cause = this.cause;
      }
    }

    result.stack = this.stack;
    return result;
  }

  public static isBaseError(value: unknown): value is BaseError {
    return value instanceof Error && (value as BaseError).isBaseError === true;
  }
}

export interface BaseErrorJSON {
  name: string;
  message: string;
  isBaseError: boolean;
  meta?: Record<string, unknown>;
  cause?: unknown;
  stack?: string | undefined;
}
