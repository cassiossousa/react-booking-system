export class PropertyValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PropertyValidationError';
  }
}

export class PropertyAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PropertyAlreadyExistsError';
  }
}
