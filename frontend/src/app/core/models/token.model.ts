export default interface IToken {
  sub: string
  roles: string[]
  iss: string
  exp: number
  // whatever else is in the JWT.
}
