export interface Auth{
  coduser: string,
  password: string
}

export interface ResponseAuth{
  status: number,
  message: string,
  coduser: string,
  verifyCode: string
}

export interface ResponseAuthVerify{
  status: number,
  message: string,
  coduser: string,
  codrol: string,
  token: string,
  refreshToken: string
}
