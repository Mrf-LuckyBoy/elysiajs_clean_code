export class HttpResponse {
  static success<T>(data: T, message = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }

  static badRequest(details: string) {
    return {
      success: false,
      message: 'Bad Request',
      details,
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

  static error(message = 'Internal Server Error', details?: string) {
    return {
      success: false,
      message,
      details,
    };
  }
}
