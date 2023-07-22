export interface DialogMessage {
  width: string
  height?: string
  data: {
    status: number
    message: string
    logMessage?: string
    logUser?: String
    logTime?: Date
  }
}

export interface DialogDefault{
  width?: string
  height?: string
}
