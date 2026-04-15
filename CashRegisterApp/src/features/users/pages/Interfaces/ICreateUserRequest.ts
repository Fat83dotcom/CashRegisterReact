export interface ICreateUserRequest {
  personId?: number;
  userName: string;
  password?: string;
  role: string;
}
