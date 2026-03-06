export interface IGetAllUsersResponse {
  id: number;
  name?: IName | null;
  birthdate: string;
  document?: string | null;
}

export interface IName {
  firstName: string;
  lastName: string;
}
