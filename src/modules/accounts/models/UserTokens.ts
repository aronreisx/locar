export interface IUserTokens {
  id: string;
  user_id: string;
  refresh_token: string;
  expiring_date: Date;
  created_at: Date;
}
