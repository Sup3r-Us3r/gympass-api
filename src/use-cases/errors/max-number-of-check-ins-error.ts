class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Max number of check-ins reached.');
  }
}

export { MaxNumberOfCheckInsError };
