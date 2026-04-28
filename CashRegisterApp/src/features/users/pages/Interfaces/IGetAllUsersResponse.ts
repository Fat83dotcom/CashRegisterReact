export interface IGetAllUsersResponse {
  id: number;
  name: IName;
  birthdate: string;
  taxId: string;
  isActive: boolean;
}

export interface IName {
  firstName: string;
  lastName: string;
}
