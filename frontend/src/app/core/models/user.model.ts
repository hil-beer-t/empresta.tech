import IAddress from "./address.model"

export default interface IUser {
  alias?: string,
  cpf: string,
  phoneNumber: string
  income: number,
  name: string,
  email: string,
  password?: string,
  address?: IAddress
}
