export interface DocumentHeader {
  numint: number
  codext: string
  typcomdoc: number
  sitcomdoc: number
  serie: string
  numdoc: number
  registdate: Date
  codbranch: number
  codplaiss: number
  ingsalcom: number
  reacomdoc: number
  codcur: string
  exchangerate: number
  codbuspar: string
  busnam: string
  addres: string
  poscod: string
  // Optional
  codlistprice?: number
  codsel: string
  typpaycon: number
  incigv: string
  tasigv: number
  impafecto?: number
  impinafecto?: number
  impexonerado?: number
  impgratuito?: number
  impigv?: number
  impisc?: number
  imptribadd01?: number
  imptribadd02?: number
  imptribadd03?: number
  imptribadd04?: number
  impdesc01?: number
  impdesc02?: number
  impdesc03?: number
  impdesc04?: number
  implistprice?: number
  impdesctotal?: number
  impsaleprice?: number
  imptribtotal?: number
  imptotal?: number
  arcpdf?: any
  arccrd?: any
  arcxml?: any
  refere?: string
  observ?: string
  commen?: string
  status?: string
  createby?: string
  updateby?: string
  createat?: Date
  updateat?: Date
}

export interface DAODocumentHeader{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: DocumentHeader[]
}

export interface DTODocumentHeader{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: DocumentHeader | null
}
