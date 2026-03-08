export interface IGetAllUsersResponse {
  id: number;
  name: IName;
  birthdate: string;
  document: string;
}

export interface IName {
  firstName: string;
  lastName: string;
}
