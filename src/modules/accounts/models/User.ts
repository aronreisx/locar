export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
  admin: boolean;
  created_at: Date;
}
