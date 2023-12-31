export interface ExchangeRateSunat{
  registdate: Date,
  eventa: number,
  ecompra: number
}

export interface ExchangeRate{
  registdate: Date | number[],
  origen: string,
  destin: string,
  fventa: number,
  fcompra: number,
  cventa: number,
  ccompra: number,
  eventa: number,
  ecompra: number,
  status: string;
  createby: string;
  updateby: string;
  createat: Date;
  updateat: Date;
}

export interface DAOExchangeRate {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: ExchangeRate[]
}
