import { DocumentDetail } from "./document-detail.model"
import { DocumentHeader } from "./document-header.model"

export interface SearchDocumentGeneric{
  numint : number
  numdoc : number
  serie : string
  typcomdoc : number
  destypcomdoc : string
  sitcomdoc : number
  dessitcomdoc : string
  registdate : Date
  inout : number
  desinout : string
  reacomdoc : number
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

export interface DAOSearchDocumentGeneric{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: SearchDocumentGeneric[]
}

export interface SearchFilterDocumentGeneric{
  typcomdoc : number
  startat : string
  finalat : string
  sitcomdoc : string
  reacomdoc : string
  codbranch? : string
  codplaiss? : string
  serie? : string
  codcur? : string
  codsel? : string
  typpaycon? : number
  codbuspar? : string
  busnam?: string
}

export interface DAOPrintDocumentGeneric{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  format: string
  bytes: string
}

export interface BasicDocumentGeneric{
  numint: number,
  serie?: string,
  numdoc?: number
}

export interface DAOBasicDocumentGeneric{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: BasicDocumentGeneric
}

export interface DocumentInvoice{
  header: DocumentHeader
  details: DocumentDetail[]
}
