export interface ReasonCommercialDocument{
  typcomdoc: number
  inout: number
  reacomdoc: number
  abrevi: string
  descri: string
  codext: string
  observ: string
  commen: string
  defaul: string
  status: string
  createby: string
  updateby: string
  createat: string
  updateat: string
}

export interface DAOReasonCommercialDocument{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: ReasonCommercialDocument[]
}
