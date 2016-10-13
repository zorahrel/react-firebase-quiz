import 'isomorphic-fetch';

export const baseUrl = '';
export const defaultHeaders = {};

export default function REQUEST(relativePath, method, rawData = { headers: {}, body: {}}) {
  let data = {
    method,
    headers: {
      ...defaultHeaders,
      ...rawData.headers
    }
  };
  if(method === 'POST' || method === 'PUT') {
    data.body = JSON.stringify(rawData.body);
  }
  return fetch(baseUrl + relativePath, data);
}

export function GET(relativePath) {
  return REQUEST(relativePath, 'GET');
}
export function POST(relativePath, data) {
  return REQUEST(relativePath, 'POST', data);
}
export function PUT(relativePath, data) {
  return REQUEST(relativePath, 'PUT', data);
}
export function DELETE(relativePath) {
  return REQUEST(relativePath, 'DELETE');
}
