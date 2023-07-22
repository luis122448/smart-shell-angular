export interface SituationCommercialDocument{
  typcomdoc: number
  ingsalcom: number
  sitcomdoc: number
  abrevi: string
  descri: string
  codext: string
  observ: string
  commen: string
  status: string
  createby: string
  updateby: string
  createat: string
  updateat: string
}

export interface DAOSituationCommercialDocument{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: SituationCommercialDocument[]
}
