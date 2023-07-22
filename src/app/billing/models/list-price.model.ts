export interface ListPrice{
  codlistprice: number
  abrevi: string
  descri: string
  codext: string
  codcur: string
  inctax: string
  observ: string
  commen: string
  status: string
  createby: string
  updateby: string
  createat: Date | number[],
  updateat: Date | number[],
}

export interface DAOListPrice {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: ListPrice[]
}

export interface DTOListPrice {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: ListPrice | null
}

export interface BasicListPrice{
  codlistprice: number
  listprice: ListPrice | null
}
