export class BaseService {
  constructor(baseURL, getToken) {
    this.baseURL = baseURL;
    this.getToken = getToken; 
  }

  get headers() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request(endpoint, options = {}) {
    const config = {
      headers: this.headers,
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error en la petición');
      }

      console.log(data)
      return data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}
