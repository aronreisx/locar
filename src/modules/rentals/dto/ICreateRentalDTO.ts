export interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  start_date: Date;
  expected_return_date: Date;
}
