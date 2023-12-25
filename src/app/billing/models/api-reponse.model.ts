export interface ApiResponseByte{
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  bytes: string,
  format: string,
  name: string,
  extension: string
}
