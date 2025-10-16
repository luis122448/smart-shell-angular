export interface ArticleSpecification{
  tpyinv: number
  typspe: number
  abrevi: string
  descri: string
  codext: string
  observ: string
  commen: string
  defaul: string
  multip: string
  format: string
  extension: string
  maxsize: number
  title: string
  status: string
  createby: string
  updateby: string
  createat: Date | number[],
  updateat: Date | number[],
}

export interface DAOArticleSpecification {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: ArticleSpecification[]
}

export interface DTOArticleSpecification {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: ArticleSpecification | null
}
