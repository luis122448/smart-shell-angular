import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DAOArticleSpecification } from '@billing-models/article-specification.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleSpecificationService {

  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByAll(typinv: number){
    let params = new HttpParams()
    params = params.set('typinv',typinv.toString())
    return this.httpCLient.get<DAOArticleSpecification>(`${this.API_URL}${this.PATH_BILLING}/article-specification/by-typinv`, { params })
  }

}

