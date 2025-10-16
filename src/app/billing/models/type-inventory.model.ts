export interface TypeInventory{
  typinv: number
  abrevi: string
  descri: string
  codext: string
  observ: string
  commen: string
  defaul: string
  status: string
  createby: string
  updateby: string
  createat: Date
  updateat: Date
}

export interface DAOTypeInventory {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: TypeInventory[]
}

export interface DTOTypeInventory {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  object: TypeInventory | null
}
