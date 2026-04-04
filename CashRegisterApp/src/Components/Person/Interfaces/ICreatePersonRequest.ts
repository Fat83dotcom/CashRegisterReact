export interface ICreatePersonRequest {
  firstName: string;
  lastName: string;
  birthDate: string | Date;
  document: string;
  email: string;
  cellPhone: string;
  phone: string;
  gender: string;
}
