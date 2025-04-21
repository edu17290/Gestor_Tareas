class AuthService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_URL;
    this.jwt = null;
    this.error = null;
  }

  async login({ username, password }) {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

  try {
    const response = await fetch(`${this.baseURL}users/login`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || response.statusText);
    }

    const { access_token } = await response.json();
    return { token: access_token, error: null };

  } catch (error) {
    return { token: null, error: error.message || "Error desconocido" };
  }
  }

  getToken() {
    return this.jwt;
  }

  getError() {
    return this.error;
  }

  clearError() {
    this.error = null;
  }
}

export default AuthService;
