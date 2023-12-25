export interface Article{
  codart: string
  typinv: number
  abrevi: string
  descri: string
  codext: string
  codbar: string
  codean: string
  registdate: Date | number[],
  cstock: string
  codprv: string
  codman: string
  coduni: string
  stocknegative : string
  editdescri : string
  printcomment : string
  image: ArrayBuffer
  observ: string
  commen: string
  status: string
  createby: string
  updateby: string
  createat: Date | number[],
  updateat: Date | number[],
}

export interface DAOArticle {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: Article[]
}

export interface DTOArticle {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: Article | null
}

export interface PAGEArticle {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  page: {
    content: Article[]
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

export interface ArticleBasic{
  typinv: number
  codart: string
  descri: string
  row: Article | null
}
