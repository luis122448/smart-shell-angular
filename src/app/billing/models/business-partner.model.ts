export interface BusinessPartner {
  codbuspar: string
  typbuspar: number
  typidedoc: number
  nroidedoc: string
  codext: string
  busnam: string
  apepat: string
  apemat: string
  nombre: string
  registdate: Date
  poscod: string
  addres: string
  codtel: string
  telefo: string
  email: string
  typpaycon: number
  codlistprice: number
  limcre: number
  lispre: string
  image: ArrayBuffer
  observ: string
  commen: string
  status: string
  createby: string
  updateby: string
  createat: Date
  updateat: Date
}

export interface DAOBusinessPartner {
  status: number
  message: string
  list: BusinessPartner[]
}

export interface DTOBusinessPartner {
  status: number
  message: string
  object: BusinessPartner | null
}

export interface BusinessPartnerBasic {
  codbuspar: string
  busnam: string
  isNewBussinessPartner: boolean
}

export interface PAGEBusinessPartner {
  status: number
  message: string
  page: {
    content: BusinessPartner[]
    pageable: {
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      },
      offset: number
      pageNumber:  number
      pageSize: number
      paged: boolean
      unpaged: boolean
    },
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
  }
}

// Relacionado con la Condicion de Pago
export interface IntcomCondicionPago{
  codbuspar: string
  typpaycon: number
  limcre: number
}

export interface DTOIntcomCondicionPago{
  status: number
  message: string
  object: IntcomCondicionPago | null
}


export interface IntcomCondicionPagoView{
  codbuspar: string
  typpaycon: number
  abrtyppaycon: string
  destyppaycon: string
  limcre: number
  status: string
  createby: string
  updateby: string
  createat: Date
  updateat: Date
}

export interface DAOIntcomCondicionPagoView{
  status: number
  message: string
  list: IntcomCondicionPagoView[]
}
