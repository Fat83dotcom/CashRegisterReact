export interface ICreateUserRequest {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  document?: string;
  email?: string;
  cellPhone?: string;
  phone?: string;
  gender?: string;
  role: string;
  password?: string; // Corrigido de passWord para password para bater com o backend se necessário, mas vou manter o que o form usa
  userName: string;
  personId?: number;
}
