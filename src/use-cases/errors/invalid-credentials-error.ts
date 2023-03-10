class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials.');
  }
}

export { InvalidCredentialsError };
