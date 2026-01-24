export class AuthToken {
  constructor(
    public readonly accessToken: string,
    public readonly expireIn: number,
    public readonly tokenType: string = 'Bearer',
  ) {
    if (!accessToken) {
      throw new Error('Access token cannot be empty');
    }
  }
}
