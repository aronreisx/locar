export interface ICreateUserTokenDTO {
  user_id: string;
  expiring_date: Date;
  refresh_token: string;
}
