export interface ListPriceArticle{
  codlistprice: number
  codart: string
  desart: string
  price: number
  modprice: string
  moddesc: string
  desmax: number
  desc01: number
  desc02: number
  desc03: number
  desc04: number
  impigv: number
  impisc: number
  imptribadd01: number
  imptribadd02: number
  imptribadd03: number
  imptribadd04: number
  implistprice: number
  impdesctotal: number
  impsaleprice: number
  imptribtotal: number
  imptotal: number
  status: string
  createby: string
  updateby: string
  createat: Date | number[],
  updateat: Date | number[],
}

export interface DAOListPriceArticle {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: ListPriceArticle[]
}

export interface DTOListPriceArticle {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: ListPriceArticle | null
}

export interface ByteListPriceArticle{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  bytes: string,
  format: string,
  name: string,
  extension: string
}

export interface BasicListPriceArticle{
  codlistprice: number
  listprice: ListPriceArticle | null
}
