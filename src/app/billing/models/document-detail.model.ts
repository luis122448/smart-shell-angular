export interface DocumentDetail{
  numint?: number;
  numite: number;
  typinv: number;
  desinv?: string;
  codart: string;
  desart?: string;
  etiqueta: number;
  quantity: number;
  // Optional
  stock?: number;
  price: number;
  modprice?: string;
  impafecto?: number;
  impinafecto?: number;
  impexonerado?: number;
  impgratuito?: number;
  impigv?: number;
  impisc?: number;
  imptribadd01?: number;
  imptribadd02?: number;
  imptribadd03?: number;
  imptribadd04?: number;
  moddesc?: string;
  impdesc01?: number;
  impdesc02?: number;
  impdesc03?: number;
  impdesc04?: number;
  implistprice?: number;
  impdesctotal?: number;
  impsaleprice?: number;
  imptribtotal?: number
  imptotal?: number;
  status?: string;
  createby?: string;
  updateby?: string;
  createat?: Date;
  updateat?: Date;
  update?: boolean
}

export interface DocumentDetailResume{
  impafecto?: number
  impinafecto?: number
  impexonerado?: number
  impgratuito?: number
  impigv?: number
  impisc?: number
  implistprice?: number
  impdesctotal?: number
  impsaleprice?: number
  imptribtotal?: number
  imptotal?: number
}

export interface DAODocumentDetail {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: DocumentDetail[]
}
