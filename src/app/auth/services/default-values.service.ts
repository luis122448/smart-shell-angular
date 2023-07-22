import { Injectable } from '@angular/core';
import { Access, Currency, Inventory, Reason, Seller, Serie } from '../models/default-values.model';
import { CookieService } from 'ngx-cookie-service';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class DefaultValuesService {

  public accesses: Access[] = []
  public currencies: Currency[] = [
    {
      codcur: 'PEN',
      abrevi: 'PEN',
      descri: 'NUEVO SOL',
      codext: '1',
      symbol: 'S/.'
    },
    {
      codcur: 'USD',
      abrevi: 'USD',
      descri: 'DOLLAR',
      codext: '2',
      symbol: '$.'
    }
  ]
  public sellers: Seller[] = []
  public series: Serie[] = []
  public reasons: Reason[] = []
  public inventories: Inventory[] = []

  constructor(
    private cookieService: CookieService
  ) { }

  public getCookieValue(key: string): any[] {
    const cookieValue = this.cookieService.get(key)
    if(cookieValue) {
      return JSON.parse(cookieValue)
    }
    return []
  }

  public setCookieValue(key: string, value: any[]): void{
    this.cookieService.delete(key)
    const cookieValue = JSON.stringify(value)
    this.cookieService.set(key, cookieValue)
  }

  public removeCookie(key: string): void {
    this.cookieService.delete(key);
  }

}
