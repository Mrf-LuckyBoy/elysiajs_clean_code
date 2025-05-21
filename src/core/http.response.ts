import { t } from 'elysia';

export class HttpResponse {
  static success<T>(data: T) {
    return {
      success: true,
      message: 'Success',
      data,
    };
  }
  static badRequest(detail: string) {
    return {
      success: false,
      message: 'Bad Request',
      detail,
    };
  }
  static unauthorized(message = 'Unauthorized') {
    return {
      success: false,
      message,
    };
  }
  static forbidden(message = 'Forbidden') {
    return {
      success: false,
      message,
    };
  }
  static notFound(message = 'Not Found') {
    return {
      success: false,
      message,
    };
  }
  static error(detail: string) {
    return {
      success: false,
      message: 'Internal Server Error',
      detail,
    };
  }
}

export class HttpResponseSchema {
  static badRequest() {
    return t.Object({
      success: t.Literal(false),
      message: t.Literal('Bad Request'),
      detail: t.String(),
    });
  }

  static unauthorized() {
    return t.Object({
      success: t.Literal(false),
      message: t.String(), // optional: enforce t.Literal('Unauthorized')
    });
  }

  static forbidden() {
    return t.Object({
      success: t.Literal(false),
      message: t.Literal('Forbidden'),
    });
  }

  static notFound() {
    return t.Object({
      success: t.Literal(false),
      message: t.Literal('Not Found'),
    });
  }

  static error() {
    return t.Object({
      success: t.Literal(false),
      message: t.Literal('Internal Server Error'),
      detail: t.String(),
    });
  }
}
