export interface SearchDocumentInvoice{
  numint : number
  numdoc : number
  serie : string
  destypcomdoc : string
  dessitcomdoc : string
  registdate : Date
  desingsalcom : string
  desreacomdoc : string
  codbuspar : string
  busnam : string
  addres : string
  desplaiss : string
  codcur : string
  dessel : string
  destyppaycon : string
  impsaleprice : number
  imptotal : number
  isOpen: boolean
}

export interface DAOSearchDocumentInvoice{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: SearchDocumentInvoice[]
}

export interface SearchFilterDocumentInvoice{
  typcomdoc : number
  startat : string
  finalat : string
  sitcomdoc : string
  reacomdoc : string
  codbranch : string
  codplaiss : string
  serie : string
  codcur : string
  codsel : string
  typpaycon : number
  codbuspar : string
  busnam?: string
}

export interface DAOPrintDocumentInvoice{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  format: string
  bytes: string
}

export interface BasicDocumentInvoice{
  numint: number,
  serie?: string,
  numdoc?: number
}

export interface DAOBasicDocumentInvoice{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: BasicDocumentInvoice
}
