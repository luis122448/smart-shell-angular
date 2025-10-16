export interface SerieCommercialDocument {
  typcomdoc: number
  serie: string
  abrevi: string
  descri: string
  codext: string | null
  codbranch: number | null
  docelectr: string
  typcorrel: string
  nrocorrel: number
  defaul: string
  typformat: number
  observ: string | null
  commen: string | null
  status?: string
  createby?: string
  updateby?: string
  createat?: Date | number[],
  updateat?: Date | number[],
}

export interface ChangeSerieCommercialDocument{
  view: 'search' | 'register' | 'new'
  typcomdoc: number
  serie: string
}
