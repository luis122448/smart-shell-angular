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
}

export interface Access{
  codacc: string
  abrevi: string
  descri: string
}

export interface Seller{
  codsel: string
  abrevi: string
  descri: string
  defaul: string
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
  ingsalcom: number
  reacomdoc: number
  abrevi: string
  descri: string
  defaul: string
}

export interface Situcion{
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

export interface TypeBusinessPartnerDefaultValues{
  typbuspar: number
  abrevi: string
  descri: string
  codext: string
  defaul: string
}
