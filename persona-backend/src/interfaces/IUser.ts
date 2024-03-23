export interface IUser {
  _id: string;
  username: string;
  email: string;
  googleId?: string;
  isEmailVerified: boolean;
}
