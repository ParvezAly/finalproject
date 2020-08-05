function APIError(message, { url, responseBody, statusCode }) {
    this.name = "APIError";
    this.message = message;
    this.url = url;
    this.responseBody = responseBody;
    this.statusCode = statusCode;
  }
  APIError.prototype = new Error();
  
  export default APIError;
  