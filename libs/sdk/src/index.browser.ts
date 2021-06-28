import { MangoPayOptions } from './lib/type';
import { getMangoPayApi } from './lib/api';

export * from './lib';

export function initialize(options: MangoPayOptions) {
  const { clientId, apiKey, sandbox, version, context = {} } = options;
  const domain = sandbox
    ? `https://api.sandbox.mangopay.com/v${version}`
    : `https://api.mangopay.com/v${version}`;

  // OAuth 2.0 
  let token: string;
  let authorizationExpireTime = 0;
  async function getToken() {
    const isExpired = new Date().getTime() > authorizationExpireTime;
    if (!token || isExpired) {
      const result = await fetch(`${domain}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientId}:${apiKey}`)
        },
        body: 'grant_type=client_credentials'
      });
      const { token_type, access_token, expires_in } = await result.json();
      authorizationExpireTime = new Date().getTime() + (expires_in * 1000);
      token = `${token_type} ${access_token}`;
    }
    return token;
  }


  async function post(url: string, data: unknown) {
    const authorization = await getToken();
    const res = await fetch(`${domain}/${clientId}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
      body: JSON.stringify(data)
    });
    if (res.status === 204) return;
    return res.json(); 
  }

  async function put(url: string, data: unknown) {
    const authorization = await getToken();
    const res = await fetch(`${domain}/${clientId}/${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }

  async function get(url: string, queryParams: Record<string, string | number | boolean> = {}) {
    const params = Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&');
    const baseUrl = `${domain}/${clientId}/${url}`;
    const getUrl = [baseUrl, params].join('?');
    const authorization = await getToken();
    const res = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
    });
    return res.json();
  }

  async function download(file: string) {
    if (file.startsWith('http://') || file.startsWith('https://')) {
      // Transform content to Base64
      file = await fetch(file)
        .then(res => res.arrayBuffer())
        .then(buffer => new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        .then(text => btoa(text));
    }
    return file;
  }

  const api = { context, get, post, put, download };
  return getMangoPayApi(api);
}
