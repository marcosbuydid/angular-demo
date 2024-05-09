import { Token } from '../models/token';

export default class Session {
  private static readonly TokenStorageKey = 'token';

  static setToken(token: Token): void {
    localStorage.setItem(this.TokenStorageKey, JSON.stringify(token));
  }

  static getToken(): Token {
    var jsonToken = localStorage.getItem(this.TokenStorageKey);
    if (jsonToken != null) return JSON.parse(jsonToken);
    return new Token();
  }

  static removeToken(): void {
    localStorage.removeItem(this.TokenStorageKey);
  }
}
