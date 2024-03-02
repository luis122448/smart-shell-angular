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

export interface ApiResponseArrayBuffer{
  status?: number
  message?: string
  logMessage?: string
  logUser?: String
  logTime?: Date | number[],
  arrayBuffer: ArrayBuffer,
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

export interface ApiResponsePage<T> {
  status: number
  message: string
  logMessage: string
  logUser: String
  logTime: Date | number[],
  page: {
    content: T[]
    pageable: {
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      },
      offset: number
      pageNumber:  number
      pageSize: number
      paged: boolean
      unpaged: boolean
    },
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
  }
}
