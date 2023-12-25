import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseByte } from '@billing-models/api-reponse.model';
import { ArticleAttached, DAOArticleAttached, DTOArticleAttached } from '@billing-models/article-attached.model';
import { environment } from '@enviroment';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleAttachedService {
  API_URL = environment.API_URL
  PATH_BILLING = environment.PATH_BILLING

  constructor(
    private httpCLient: HttpClient
  ) { }

  getByAll(codart: string){
    let params = new HttpParams()
    params = params.set('codart',codart)
    return this.httpCLient.get<DAOArticleAttached>(`${this.API_URL}${this.PATH_BILLING}/article-attached/by-all`, { params })
  }

  getById(codart: string, typspe: number){
    let params = new HttpParams()
    params = params.set('codart',codart)
    params = params.set('typspe',typspe.toString())
    return this.httpCLient.get<DTOArticleAttached>(`${this.API_URL}${this.PATH_BILLING}/article-attached/by-id`, { params })
  }

  findByDownloader(codart: string, typeps: number): Observable<any> {
    const params = new HttpParams()
      .set('codart', codart)
      .set('typeps', typeps.toString());
    return this.httpCLient.get<ApiResponseByte>(`${this.API_URL}${this.PATH_BILLING}/article-attached/by-downloader`, { params });
  }

  postSave(
    articleAttached: ArticleAttached,
    archiveEntityList: any[], // Reemplaza 'any[]' con el tipo real de archiveEntityList
    multipartFileList: File[] // Reemplaza 'any[]' con el tipo real de multipartFileList
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('codart', articleAttached.codart);
    formData.append('typspe', articleAttached.typspe.toString());
    formData.append('observ', articleAttached.observ);

    if (archiveEntityList.length > 0) {
      for (let i = 0; i < archiveEntityList.length; i++) {
        formData.append('archiveEntityList', JSON.stringify(archiveEntityList[i]));
      }
    } else {
      formData.append('archiveEntityList', '');
    }

    for (let i = 0; i < multipartFileList.length; i++) {
      formData.append('multipartFileList', multipartFileList[i]);
    }

    return this.httpCLient.post<ApiResponseByte>(`${this.API_URL}${this.PATH_BILLING}/article-attached`, formData);
  }

  delDelete(codart: string, typspe: number) {
    const params = new HttpParams()
      .set('codart', codart)
      .set('typspe', typspe.toString());
    return this.httpCLient.delete<ApiResponseByte>(`${this.API_URL}${this.PATH_BILLING}/article-attached`, { params });
  }


}
