export interface ApiResponseAuth<T>{
  status: number,
  message: string,
  logMessage?: string
  logUser?: String
  logTime?: Date | number[],
  object: T | null
}

export interface Auth{
  company: string,
  coduser: string,
  password: string
}

export interface AuthVerify{
  company: string,
  coduser: string,
  role: string,
  token: string,
  refreshToken: string
}

export interface GenericAuth{
  company?: string,
  coduser?: string,
  code?: string
  token?: string,
  refreshToken?: string
}
