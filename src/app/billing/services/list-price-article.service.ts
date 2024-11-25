import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DAOListPriceArticle, DTOListPriceArticle, ListPriceArticle, ByteListPriceArticle } from '@billing-models/list-price-article.model';
import { ApiResponseList, ApiResponseObject, ApiResponsePage } from '@billing-models/api-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class ListPriceArticleService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByExport(codlistprice: number){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    return this.httpCLient.get<ByteListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-export`, { params })
  }

  getByGenerate(codlistprice: number){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    return this.httpCLient.get<ByteListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-generate`, { params })
  }

  getByPage(codlistprice: number, codart: string, desart: string, pageSize: number = 10,pageIndex: number = 0){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    params = params.set('codart',codart)
    params = params.set('desart',desart)
    params = params.set('size',pageSize.toString())
    params = params.set('page',pageIndex.toString())
    return this.httpCLient.get<ApiResponsePage<ListPriceArticle>>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-page`, { params })
  }

  getAll(codlistprice: number){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    return this.httpCLient.get<ApiResponseList<ListPriceArticle>>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-all`, { params })
  }

  getByLike(codart: string){
    let params = new HttpParams()
    params = params.set('codart',codart)
    return this.httpCLient.get<ApiResponseList<ListPriceArticle>>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-codart`, { params })
  }

  getById(codlistprice: number, codart: string){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    params = params.set('codart',codart)
    return this.httpCLient.get<ApiResponseObject<ListPriceArticle>>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-id`, { params })
  }

  postByImport(codlistprice: number, file: File) {
    const formData = new FormData();
    formData.append('codlistprice', codlistprice.toString());
    formData.append('archive', file, file.name);

    return this.httpCLient.post<ByteListPriceArticle>(`${this.API_URL}${this.PATH_BILLING}/list-price-article/by-import`,formData);
  }

  postSave(data: ListPriceArticle){
    return this.httpCLient.post<ApiResponseObject<ListPriceArticle>>(`${this.API_URL}${this.PATH_BILLING}/list-price-article`, data)
  }

  putUpdate(data: ListPriceArticle, codlistprice: number, codart: string){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    params = params.set('codart',codart)
    return this.httpCLient.put<ApiResponseObject<ListPriceArticle>>(`${this.API_URL}${this.PATH_BILLING}/list-price-article`, data, { params })
  }

  delDelete(codlistprice: number, codart: string){
    let params = new HttpParams()
    params = params.set('codlistprice',codlistprice.toString())
    params = params.set('codart',codart)
    return this.httpCLient.delete<ApiResponseObject<ListPriceArticle>>(`${this.API_URL}${this.PATH_BILLING}/list-price-article`, { params })
  }

}
