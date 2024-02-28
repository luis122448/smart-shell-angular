import { Injectable } from '@angular/core';
import { Access, Branch, Currency, Document, Inventory, Reason, Seller, Serie, Situcion } from '../models/default-values.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DefaultValuesService {

  public dark: boolean = true
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
  public branches: Branch[] = [
    {
      codbranch: 1,
      abrevi: '01',
      descri: 'Primary',
      defaul: 'Y'
    },
    {
      codbranch: 2,
      abrevi: '02',
      descri: 'Secundary',
      defaul: 'N'
    }
  ]
  public sellers: Seller[] = []
  public series: Serie[] = []
  public reasons: Reason[] = []
  public situations: Situcion[] = []
  public inventories: Inventory[] = []
  public documents: Document[] = []

  constructor(
    private cookieService: CookieService
  ) {
    // this.setCookieValue('branches',this.branches)
    // this.setCookieValue('currencies',this.currencies)
    this.setCookie('dark',this.dark.toString())
    this.setLocalStorageValue('branches', this.branches)
    this.setLocalStorageValue('currencies', this.currencies)
    // this.setLocalStorage('dark', this.dark.toString())
  }

  public getCookieValue(key: string): any[] {
    const cookieValue = this.cookieService.get(key)
    if(cookieValue) {
      return JSON.parse(cookieValue)
    }
    return []
  }

  public getCookie(key: string): string {
    return this.cookieService.get(key);
  }

  public setCookieValue(key: string, value: any[]): void{
    this.cookieService.delete(key)
    const cookieValue = JSON.stringify(value)
    this.cookieService.set(key, cookieValue)
  }

  public setCookie(key: string, value: string): void {
    this.cookieService.set(key, value);
  }

  public removeCookie(key: string): void {
    this.cookieService.delete(key);
  }

  public removeAllCookiesExceptSpecified(): void {
    const cookiesToKeep: string[] = ['token-smart-shell', 'token-refresh-smart-shell', 'dark'];
    Object.entries(this.cookieService.getAll()).forEach(([key, value]) => {
      if (!cookiesToKeep.includes(key)) {
        this.cookieService.delete(key);
      }
    });
  }

  public getLocalStorageValue(key: string): any[] {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue) {
      return JSON.parse(localStorageValue);
    }
    return [];
  }

  public getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  public setLocalStorageValue(key: string, value: any[]): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }

  public setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

}
