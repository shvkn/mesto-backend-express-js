class AuthError extends Error {
  constructor(message = '') {
    super(message);
  }
}

export default AuthError;
