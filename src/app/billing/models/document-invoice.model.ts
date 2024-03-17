import { DocumentDetail } from "./document-detail.model"
import { DocumentHeader } from "./document-header.model"

export interface SearchDocumentInvoice{
  numint : number
  numdoc : number
  serie : string
  typcomdoc : number
  destypcomdoc : string
  sitcomdoc : number
  dessitcomdoc : string
  registdate : Date
  ingsalcom : number
  desingsalcom : string
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

export interface DocumentInvoice{
  header: DocumentHeader
  details: DocumentDetail[]
}

// export interface DocumentInvoiceHeader{
//   numint: number;
//   codext: string;
//   typcomdoc: number;
//   sitcomdoc: number;
//   serie: string;
//   numdoc: number;
//   registdate: Date | number[],
//   codbranch: number;
//   codplaiss: number;
//   ingsalcom: number;
//   reacomdoc: number;
//   codcur: string;
//   exchangerate: number;
//   codbuspar: string;
//   busnam: string;
//   addres: string;
//   poscod: string;
//   codsel: string;
//   typpaycon: number;
//   incigv: number;
//   tasigv: number;
//   impafecto: number;
//   impinafecto: number;
//   impexonerado: number;
//   impgratuito: number;
//   impigv: number;
//   impisc: number;
//   imptribadd01: number;
//   imptribadd02: number;
//   imptribadd03: number;
//   imptribadd04: number;
//   impdesc01: number;
//   impdesc02: number;
//   impdesc03: number;
//   impdesc04: number;
//   implistprice: number;
//   impdesctotal: number;
//   impsaleprice: number;
//   imptribtotal: number;
//   imptotal: number;
//   refere: string;
//   observ: string;
//   commen: string;
//   arcpdf: ArrayBuffer;
//   arccrd: ArrayBuffer;
//   arcxml: ArrayBuffer;
// }

// export interface documentInvoiceDetails{
//   numint: number;
//   numite: number;
//   typinv: number;
//   codart: string;
//   etiqueta: number;
//   quantity: number;
//   price: number;
//   impafecto: number;
//   impinafecto: number;
//   impexonerado: number;
//   impgratuito: number;
//   impigv: number;
//   impisc: number;
//   imptribadd01: number;
//   imptribadd02: number;
//   imptribadd03: number;
//   imptribadd04: number;
//   impdesc01: number;
//   impdesc02: number;
//   impdesc03: number;
//   impdesc04: number;
//   implistprice: number;
//   impdesctotal: number;
//   impsaleprice: number;
//   imptribtotal: number;
//   imptotal: number;
// }
