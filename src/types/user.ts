export enum ERole {
  ADMIN = '000',
  SINGER = '001',
  USER = '002'
}

export interface Role {
  id: string
  code: ERole
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  isPremium: boolean
  roleCode: ERole
  role?: Role
}
