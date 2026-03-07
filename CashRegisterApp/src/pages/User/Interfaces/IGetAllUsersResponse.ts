export interface IGetAllUsersResponse {
  id: number;
  name?: IName | null;
  birthdate: Date | null;
  document?: string | null;
}

export interface IName {
  firstName: string;
  lastName: string;
}
