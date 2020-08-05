import { parseResponseBody } from "./helper";
import APIError from "./api-error";


const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

const request = (url, { method, headers, body, options }) => {
  // if (!(body instanceof FormData)) {
  headers["Content-Type"] = "application/json; charset=utf-8";
  // }
  let response = fetch(url, {
    method: method,
    headers: {
      ...headers
    },
    body:
      method === METHOD.GET
        ? null
        : body instanceof FormData
          ? body
          : JSON.stringify(body != null ? body : {})
  }).then(
    response => {
      var responseBody = parseResponseBody(response);

      // a HTTP response >= 200 and < 400, is valid
      if (response.status >= 200 && response.status < 400) {
        return responseBody;
      }


      // otherwise, throw an error
      throw new APIError("Invalid HTTP Response status code.", {
        url: url,
        responseBody: responseBody,
        statusCode: response.status
      });
    },
    error => {
      throw new APIError(error.message, {
        url: url
      });
    }
  );

  return response;
};

function sendRequest(method, url, body, options = {}) {
  const headers = {

  };

  // if (options.authenticate !== false) {

  //   const accessToken = getAcessToken();
  //   headers.Authorization = `Bearer ${accessToken}`;
  // }

  return request(url, { method, body, headers, options });
}

export function get(url, options = {}) {
  return sendRequest(METHOD.GET, url, null, options);
}

export function post(url, body, options = {}) {

  return sendRequest(METHOD.POST, url, body, options);
}

export function destroy(url, options = {}) {
  return sendRequest(METHOD.DELETE, url, null, options);
}

export function update(url, body, options = {}) {
  return sendRequest(METHOD.PUT, url, body, options);
}
