export interface MetadataModel{
  currency: Currency[]
  // branch: Branch[]
  typeCommercialDocument: TypeCommercialDocument[]
  seller: Seller[]
  serieCommercialDocument: Serie[]
  reasonCommercialDocument: Reason[]
  situationCommercialDocument: Situation[]
  typeInventory: Inventory[]
  warehouse: Warehouse[]
  listPrice: ListPrice[]
  typeBusinessPartner: TypeBusinessPartner[]
  user: any
}

export interface TypeCommercialDocument{
  typcomdoc: number
  abrevi: string
  descri: string
  defaul: string
}

export interface Seller{
  codsel: string
  abrevi: string
  descri: string
  defaul: string
}

export interface Branch{
  codbranch: number
  abrevi: string
  descri: string
  defaul: string
}

export interface Currency{
  codcur: string
  abrevi: string
  descri: string
  codext: string
  symbol: string
  defaul: string
}

export interface Access{
  codacc: string
  abrevi: string
  descri: string
}

export interface Serie{
  typcomdoc: number
  serie: string
  abrevi: string
  descri: string
  defaul: string
}

export interface Document{
  typcomdoc: number
  abrevi: string
  descri: string
  defaul: string
}

export interface Reason{
  typcomdoc: number
  inout: number
  reacomdoc: number
  abrevi: string
  descri: string
  defaul: string
}

export interface Situation {
  typcomdoc: number
  sitcomdoc: number
  abrevi: string
  descri: string
  defaul: string
}

export interface Inventory{
  typinv: number
  abrevi: string
  descri: string
  defaul: string
}

export interface ListPrice{
  codlistprice: string
  abrevi: string
  descri: string
  defaul: string
}

export interface TypeBusinessPartner{
  typbuspar: number
  abrevi: string
  descri: string
  codext: string
  defaul: string
}

export interface Warehouse {
  typinv: number
  codwarehouse: string
  abrevi: string
  descri: string
  defaul: string
}

export interface Currency {
  codcur: string
  abrevi: string
  descri: string
  codext: string
  symbol: string
  defaul: string
}

export interface Branch {
  codbranch: number
  abrevi: string
  descri: string
  defaul: string
}
