export interface ICreateUserRequest {
  personId?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: string; // Mantido como string para envio ao backend (formato ISO ou similar)
  taxId?: string;
  email?: string;
  cellPhone?: string;
  phone?: string;
  gender?: string;
  userName: string;
  password?: string;
  role: string;
}
