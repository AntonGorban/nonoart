import { HttpStatus } from '../types';

import { BaseError, type ErrorOptionsWithMeta } from './base.error';

export class HTTPError extends BaseError {
  constructor(
    public readonly status: HttpStatus,
    message: string,
    causeOrOptions?: Error | ErrorOptionsWithMeta,
  ) {
    super(message, causeOrOptions);
  }

  public override toJSON() {
    return {
      ...super.toJSON(),
      status: this.status,
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                              4XX CLIENT ERRORS                             */
/* -------------------------------------------------------------------------- */

export class BadRequestHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.BAD_REQUEST, message || HttpStatus[HttpStatus.BAD_REQUEST], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class UnauthorizedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.UNAUTHORIZED, message || HttpStatus[HttpStatus.UNAUTHORIZED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class PaymentRequiredHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.PAYMENT_REQUIRED, message || HttpStatus[HttpStatus.PAYMENT_REQUIRED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class ForbiddenHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.FORBIDDEN, message || HttpStatus[HttpStatus.FORBIDDEN], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class NotFoundHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.NOT_FOUND, message || HttpStatus[HttpStatus.NOT_FOUND], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class MethodNotAllowedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.METHOD_NOT_ALLOWED, message || HttpStatus[HttpStatus.METHOD_NOT_ALLOWED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class NotAcceptableHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.NOT_ACCEPTABLE, message || HttpStatus[HttpStatus.NOT_ACCEPTABLE], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class ProxyAuthenticationRequiredHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(
      HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
      message || HttpStatus[HttpStatus.PROXY_AUTHENTICATION_REQUIRED],
      causeOrOptions,
    );
  }
}

/* -------------------------------------------------------------------------- */

export class RequestTimeoutHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.REQUEST_TIMEOUT, message || HttpStatus[HttpStatus.REQUEST_TIMEOUT], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class ConflictHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.CONFLICT, message || HttpStatus[HttpStatus.CONFLICT], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class GoneHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.GONE, message || HttpStatus[HttpStatus.GONE], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class LengthRequiredHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.LENGTH_REQUIRED, message || HttpStatus[HttpStatus.LENGTH_REQUIRED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class PreconditionFailedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.PRECONDITION_FAILED, message || HttpStatus[HttpStatus.PRECONDITION_FAILED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class PayloadTooLargeHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.PAYLOAD_TOO_LARGE, message || HttpStatus[HttpStatus.PAYLOAD_TOO_LARGE], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class UriTooLongHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.URI_TOO_LONG, message || HttpStatus[HttpStatus.URI_TOO_LONG], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class UnsupportedMediaTypeHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.UNSUPPORTED_MEDIA_TYPE, message || HttpStatus[HttpStatus.UNSUPPORTED_MEDIA_TYPE], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class RangeNotSatisfiableHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.RANGE_NOT_SATISFIABLE, message || HttpStatus[HttpStatus.RANGE_NOT_SATISFIABLE], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class ExpectationFailedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.EXPECTATION_FAILED, message || HttpStatus[HttpStatus.EXPECTATION_FAILED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class ImATeapotHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.IM_A_TEAPOT, message || HttpStatus[HttpStatus.IM_A_TEAPOT], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class MisdirectedRequestHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.MISDIRECTED_REQUEST, message || HttpStatus[HttpStatus.MISDIRECTED_REQUEST], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class UnprocessableEntityHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, message || HttpStatus[HttpStatus.UNPROCESSABLE_ENTITY], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class LockedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.LOCKED, message || HttpStatus[HttpStatus.LOCKED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class FailedDependencyHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.FAILED_DEPENDENCY, message || HttpStatus[HttpStatus.FAILED_DEPENDENCY], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class TooEarlyHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.TOO_EARLY, message || HttpStatus[HttpStatus.TOO_EARLY], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class UpgradeRequiredHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.UPGRADE_REQUIRED, message || HttpStatus[HttpStatus.UPGRADE_REQUIRED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class PreconditionRequiredHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.PRECONDITION_REQUIRED, message || HttpStatus[HttpStatus.PRECONDITION_REQUIRED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class TooManyRequestsHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.TOO_MANY_REQUESTS, message || HttpStatus[HttpStatus.TOO_MANY_REQUESTS], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class RequestHeaderFieldsTooLargeHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(
      HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE,
      message || HttpStatus[HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE],
      causeOrOptions,
    );
  }
}

/* -------------------------------------------------------------------------- */

export class UnavailableForLegalReasonsHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(
      HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS,
      message || HttpStatus[HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS],
      causeOrOptions,
    );
  }
}

/* -------------------------------------------------------------------------- */

export class ClientClosedRequestHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.CLIENT_CLOSED_REQUEST, message || HttpStatus[HttpStatus.CLIENT_CLOSED_REQUEST], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */
/*                             / 4XX CLIENT ERRORS                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                              5XX SERVER ERRORS                             */
/* -------------------------------------------------------------------------- */

export class InternalServerErrorHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class NotImplementedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.NOT_IMPLEMENTED, message || HttpStatus[HttpStatus.NOT_IMPLEMENTED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class BadGatewayHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.BAD_GATEWAY, message || HttpStatus[HttpStatus.BAD_GATEWAY], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class ServiceUnavailableHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.SERVICE_UNAVAILABLE, message || HttpStatus[HttpStatus.SERVICE_UNAVAILABLE], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class GatewayTimeoutHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.GATEWAY_TIMEOUT, message || HttpStatus[HttpStatus.GATEWAY_TIMEOUT], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class HTTPVersionNotSupportedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(
      HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
      message || HttpStatus[HttpStatus.HTTP_VERSION_NOT_SUPPORTED],
      causeOrOptions,
    );
  }
}

/* -------------------------------------------------------------------------- */

export class VariantAlsoNegotiatesHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(
      HttpStatus.VARIANT_ALSO_NEGOTIATES,
      message || HttpStatus[HttpStatus.VARIANT_ALSO_NEGOTIATES],
      causeOrOptions,
    );
  }
}

/* -------------------------------------------------------------------------- */

export class InsufficientStorageHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.INSUFFICIENT_STORAGE, message || HttpStatus[HttpStatus.INSUFFICIENT_STORAGE], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class LoopDetectedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.LOOP_DETECTED, message || HttpStatus[HttpStatus.LOOP_DETECTED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class NotExtendedHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(HttpStatus.NOT_EXTENDED, message || HttpStatus[HttpStatus.NOT_EXTENDED], causeOrOptions);
  }
}

/* -------------------------------------------------------------------------- */

export class NetworkAuthenticationRequiredHTTPError extends HTTPError {
  constructor(message?: string | null, causeOrOptions?: Error | ErrorOptionsWithMeta) {
    super(
      HttpStatus.NETWORK_AUTHENTICATION_REQUIRED,
      message || HttpStatus[HttpStatus.NETWORK_AUTHENTICATION_REQUIRED],
      causeOrOptions,
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                             / 5XX SERVER ERRORS                            */
/* -------------------------------------------------------------------------- */
