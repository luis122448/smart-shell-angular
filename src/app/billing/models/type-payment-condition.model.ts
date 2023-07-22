export interface TypePaymentCondition {
  typpaycon: number;
  abrevi: string;
  descri: string;
  codext: string;
  observ: string;
  commen: string;
  status?: string;
  createby?: string;
  updateby?: string;
  createat?: Date;
  updateat?: Date;
}

export interface DAOTypePaymentCondition {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  list: TypePaymentCondition[]
}
