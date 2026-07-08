import axios from "axios";
import { z } from "zod";

import {
  MultipleObjectsMapSchema,
  type MultipleObjectsMap,
  MultipleObjectsReturnedBodySchema,
} from "./schemas/errors/multiple-objects-returned";

/** JSON error body returned by the Wynncraft API. */
export const WynnApiErrorBodySchema = z.object({
  error: z.string(),
  detail: z.string(),
  code: z.number(),
  identifier: z.string().optional(),
  objects: MultipleObjectsMapSchema.optional(),
});

export type WynnApiErrorBody = z.infer<typeof WynnApiErrorBodySchema>;

/**
 * Base error thrown for Wynncraft API error responses.
 *
 * Use `instanceof` checks against {@link WynnApiError.NotFound},
 * {@link WynnApiError.Forbidden}, and other subclasses for typed handling.
 */
export class WynnApiError extends Error {
  override readonly name: string = "WynnApiError";
  /** Machine-readable error name from the API, e.g. `NotFound`. */
  readonly error: string;
  /** Human-readable error message from the API. */
  readonly detail: string;
  /** Wynncraft error code. */
  readonly code: number;
  /** Optional identifier for the resource that caused the error. */
  readonly identifier?: string;
  /** Present on {@link WynnApiError.MultipleObjectsReturned} errors. */
  readonly objects?: MultipleObjectsMap;
  /** HTTP status code from the response. */
  readonly status: number;

  /**
   * @param body - Parsed Wynncraft error response body.
   * @param status - HTTP status code from the response.
   */
  constructor(body: WynnApiErrorBody, status: number) {
    super(body.detail);
    this.error = body.error;
    this.detail = body.detail;
    this.code = body.code;
    this.identifier = body.identifier;
    this.objects = body.objects;
    this.status = status;
  }
}

type WynnErrorSubclass = new (body: WynnApiErrorBody, status: number) => WynnApiError;

function wynnErrorClass<const Name extends string>(errorName: Name): WynnErrorSubclass {
  return class extends WynnApiError {
    override readonly name = errorName;
  };
}

class MultipleObjectsReturnedError extends WynnApiError {
  override readonly name = "MultipleObjectsReturned";
  override readonly objects: MultipleObjectsMap;

  constructor(body: WynnApiErrorBody & { objects: MultipleObjectsMap }, status: number) {
    super(body, status);
    this.objects = body.objects;
  }
}

type MultipleObjectsReturnedConstructor = new (
  body: WynnApiErrorBody & { objects: MultipleObjectsMap },
  status: number,
) => MultipleObjectsReturnedError;

/** Typed subclasses for known Wynncraft API error names. */
export namespace WynnApiError {
  export const MultipleObjectsReturned: MultipleObjectsReturnedConstructor =
    MultipleObjectsReturnedError;
  export const InvalidFormError = wynnErrorClass("InvalidFormError");
  export const InvalidQueryParamsError = wynnErrorClass("InvalidQueryParamsError");
  export const MalformedPayload = wynnErrorClass("MalformedPayload");
  export const MalformedTokenError = wynnErrorClass("MalformedTokenError");
  export const CSRFError = wynnErrorClass("CSRFError");
  export const InvalidTokenError = wynnErrorClass("InvalidTokenError");
  export const PaginationError = wynnErrorClass("PaginationError");
  export const Forbidden = wynnErrorClass("Forbidden");
  export const NotFound = wynnErrorClass("NotFound");
  export const MethodNotAllowed = wynnErrorClass("MethodNotAllowed");
  export const TooManyRequest = wynnErrorClass("TooManyRequest");
  export const InternalError = wynnErrorClass("InternalError");
  export const InvalidCharacterUUID = wynnErrorClass("InvalidCharacterUUID");
  export const NoCharacterFound = wynnErrorClass("NoCharacterFound");
  export const MalformedPrefixError = wynnErrorClass("MalformedPrefixError");
  export const InvalidTree = wynnErrorClass("InvalidTree");
}

const WYNN_ERROR_REGISTRY: Record<string, WynnErrorSubclass | MultipleObjectsReturnedConstructor> =
  {
    MultipleObjectsReturned: WynnApiError.MultipleObjectsReturned,
    InvalidFormError: WynnApiError.InvalidFormError,
    InvalidQueryParamsError: WynnApiError.InvalidQueryParamsError,
    MalformedPayload: WynnApiError.MalformedPayload,
    MalformedTokenError: WynnApiError.MalformedTokenError,
    CSRFError: WynnApiError.CSRFError,
    InvalidTokenError: WynnApiError.InvalidTokenError,
    PaginationError: WynnApiError.PaginationError,
    Forbidden: WynnApiError.Forbidden,
    NotFound: WynnApiError.NotFound,
    MethodNotAllowed: WynnApiError.MethodNotAllowed,
    TooManyRequest: WynnApiError.TooManyRequest,
    InternalError: WynnApiError.InternalError,
    InvalidCharacterUUID: WynnApiError.InvalidCharacterUUID,
    NoCharacterFound: WynnApiError.NoCharacterFound,
    MalformedPrefixError: WynnApiError.MalformedPrefixError,
    InvalidTree: WynnApiError.InvalidTree,
  };

/** Union of all registered Wynncraft error names. */
export type WynnErrorName = keyof typeof WYNN_ERROR_REGISTRY;

/** Instance type for a known Wynncraft API error subclass. */
export type KnownWynnApiError = InstanceType<(typeof WYNN_ERROR_REGISTRY)[WynnErrorName]>;

/**
 * Build a typed {@link WynnApiError} from a parsed API error body.
 *
 * @param body - Parsed Wynncraft error response body.
 * @param status - HTTP status code from the response.
 * @returns Typed error subclass, or base `WynnApiError` for unknown names.
 */
export function createWynnApiError(body: WynnApiErrorBody, status: number): WynnApiError {
  if (body.error === "MultipleObjectsReturned") {
    const parsed = MultipleObjectsReturnedBodySchema.safeParse(body);
    if (parsed.success) {
      return new WynnApiError.MultipleObjectsReturned(parsed.data, status);
    }
  }

  const ErrorClass = WYNN_ERROR_REGISTRY[body.error as WynnErrorName] ?? WynnApiError;

  return new (ErrorClass as WynnErrorSubclass)(body, status);
}

/**
 * Convert an Axios error into a {@link WynnApiError}, if the response
 * body matches the Wynncraft error schema.
 *
 * @param error - Caught error, typically from an Axios request.
 * @returns Typed API error, or `null` for non-API failures.
 */
export function toWynnApiError(error: unknown): WynnApiError | null {
  if (!axios.isAxiosError(error) || !error.response) {
    return null;
  }

  const parsed = WynnApiErrorBodySchema.safeParse(error.response.data);
  if (!parsed.success) {
    return null;
  }

  return createWynnApiError(parsed.data, error.response.status);
}
