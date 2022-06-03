export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  admin: boolean;
  created_at: Date;
}
