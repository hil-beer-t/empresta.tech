import IUser from "./user.model";

export default interface ILoan {
  id?: number
  cod?: string,
  status?: string,
  initialDate?: string,
  intervals?: string,
  value?: string,
  createdAt?: string,
  confirmedAt?: string,
  user?: IUser
}
