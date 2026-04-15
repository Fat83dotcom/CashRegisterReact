export interface IGetAllUsersResponse {
  id: number;
  name: IName;
  birthdate: string;
  taxId: string;
}

export interface IName {
  firstName: string;
  lastName: string;
}
