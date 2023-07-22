export interface SerieCommercialDocument {
  typcomdoc: number
  serie: string
  abrevi: string
  descri: string
  codext: string | null
  codbranch: number | null
  docelectr: string
  tipcorrel: string
  nrocorrel: number
  defect: string
  typformat: number
  observ: string | null
  commen: string | null
  status: string
  createby: string
  updateby: string
  createat: string
  updateat: string
}

export interface DAOSerieCommercialDocument {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: SerieCommercialDocument[]
}
