export interface Mensaje{
  status?: number
  message?: string
  logMessage?: string
  logUser?: String
  logTime?: Date
  minimum_length?: Number
  only_one_criterion? : string
  no_data_found?: String
  no_file_selected?: String
  no_required_fields?: String
}

export interface APIErrorMessage{
  status?: number
  message?: string
  logMessage?: string
  logUser?: String
  logTime?: Date
}
