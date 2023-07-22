export interface Mensaje{
  status?: number
  message?: string
  logMessage?: string
  logUser?: String
  logTime?: Date
  minimum_length?: Number
  only_one_criterion? : string
  no_data_found?: String
}

export interface APIErrorMessage{
  status?: number
  message?: string
  logMessage?: string
  logUser?: String
  logTime?: Date
}
