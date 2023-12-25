export interface ArticleAttached{
  codart: string
  typspe: number
  destypspe?: string
  archive: string
  observ: string
  idMongo: string
  status?: string
  createby?: string
  updateby?: string
  createat?: Date | number[],
  updateat?: Date | number[],
}

export interface DAOArticleAttached {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: ArticleAttached[]
}

export interface DTOArticleAttached {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: ArticleAttached | null
}
