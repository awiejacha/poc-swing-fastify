export default class AbortError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AbortError';
    Object.setPrototypeOf(this, AbortError.prototype);
  }
}
