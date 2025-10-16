export interface Seller {
  codsel: string;
  abrevi: string;
  descri: string;
  apepat: string;
  apemat: string;
  nombre: string;
  registdate: string;
  poscod: string;
  addres: string;
  telefo: string;
  email: string;
  fax: string;
  image: ArrayBuffer;
  observ: string;
  commen: string;
  status: string;
  createby: string;
  updateby: string;
  createat: Date;
  updateat: Date;
}

export interface DAOSeller {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: Seller[]
}
