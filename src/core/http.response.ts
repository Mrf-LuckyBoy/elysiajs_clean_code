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
