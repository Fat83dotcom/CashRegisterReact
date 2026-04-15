export interface ICreatePersonRequest {
  personType: number;
  firstName: string;
  lastName: string;
  taxId: string;
  tradeName?: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  birthdate: string | Date;
  email: string;
  cellPhone?: string;
  phone?: string;
  gender?: string;
}
