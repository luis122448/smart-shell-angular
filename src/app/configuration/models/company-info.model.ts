export interface CompanyInfo{
  numint: number
  typidedoc: number
  nroidedoc: string
  comnam: string
  addres: string
  poscod: string
  image: ArrayBuffer
  icon: ArrayBuffer
  logo: ArrayBuffer
  background: ArrayBuffer
  gloss: ArrayBuffer
  observ: string
  commen: string
  status: string
  createby: string
  updateby: string
  createat: Date | number[],
  updateat: Date | number[],
}

export interface DAOCompanyInfo {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: CompanyInfo[]
}

export interface DTOCompanyInfo {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: CompanyInfo | null
}
