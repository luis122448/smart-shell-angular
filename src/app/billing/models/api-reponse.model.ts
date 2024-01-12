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

export interface ApiResponseObject<T>{
  status: number;
  message: string;
  logMessage: string;
  logUser: string;
  logTime: Date | number[];
  object: T | null;
}

export interface ApiResponseList<T>{
  status: number;
  message: string;
  logMessage: string;
  logUser: string;
  logTime: Date | number[];
  list: T[];
}
