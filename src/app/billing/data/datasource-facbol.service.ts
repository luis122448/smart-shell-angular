import { Injectable } from '@angular/core';
import {
  DocumentDetail,
  DocumentDetailResume,
} from '../models/document-detail.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentHeader } from '../models/document-header.model';

@Injectable({
  providedIn: 'root',
})
export class DatasourceFacbolService {}

export class DataSourceDocumentHeader {
  static instance: DataSourceDocumentHeader;
  data = new BehaviorSubject<DocumentHeader>({} as DocumentHeader);
  originalData = new BehaviorSubject<DocumentHeader>({} as DocumentHeader);

  public static getInstance(): DataSourceDocumentHeader {
    if (!DataSourceDocumentHeader.instance) {
      DataSourceDocumentHeader.instance = new DataSourceDocumentHeader();
    }
    return DataSourceDocumentHeader.instance;
  }

  public connect(): Observable<DocumentHeader> {
    return this.data;
  }

  public disconnect() {}

  public delReset() {
    this.data.next({} as DocumentHeader);
  }

  public getInit(data: DocumentHeader) {
    this.data.next(data);
  }

  public get() {
    return this.data.getValue();
  }

  public getPush(row: DocumentHeader) {
    this.data.next(row);
  }

  public updateData<T>(key: string, value: T): void {
    const currentData = this.data.getValue();
    const updatedData = { ...currentData, [key]: value }; // Crear una copia actualizada del objeto
    this.data.next(updatedData);
  }

  public updateImp(data: DocumentDetailResume) {
    const currentData = this.data.getValue();
    const updateData = { ...currentData, ...data };
    this.data.next(updateData);
  }
}

export class DataSourceDocumentDetail {
  static instance: DataSourceDocumentDetail;
  data = new BehaviorSubject<DocumentDetail[]>([]);
  originalData = new BehaviorSubject<DocumentDetail[]>([]);

  constructor() {}

  public static getInstance(): DataSourceDocumentDetail {
    if (!DataSourceDocumentDetail.instance) {
      DataSourceDocumentDetail.instance = new DataSourceDocumentDetail();
    }
    return DataSourceDocumentDetail.instance;
  }

  public connect(): Observable<DocumentDetail[]> {
    return this.data;
  }

  public disconnect() {}

  public delReset() {
    this.data.next([]);
  }

  public getInit(data: DocumentDetail[]) {
    this.data.next(data);
    this.originalData.next(data);
  }

  public get() {
    return this.data.getValue();
  }

  public getNumite(numite: number): DocumentDetail {
    const DocumentDetailNotFound: DocumentDetail = {
      numite: 0,
      typinv: 0,
      desinv: 'MERC',
      codart: '',
      desart: '',
      etiqueta: 0,
      quantity: 0,
      price: 0,
      impafecto: 0,
      impinafecto: 0,
      impexonerado: 0,
      impgratuito: 0,
      impigv: 0,
      impisc: 0,
      implistprice: 0,
      impdesctotal: 0,
      impsaleprice: 0,
      imptribtotal: 0,
      imptotal: 0,
      update: false,
    };
    return (
      this.data.getValue().find((data) => data.numite === numite) ??
      DocumentDetailNotFound
    );
  }

  public getPush(row: DocumentDetail) {
    // Obtener el valor actual del BehaviorSubject
    const newData = this.data.getValue();

    // Agregar la nueva fila al arreglo
    newData.push(row);

    // Actualizar el BehaviorSubject con el nuevo arreglo
    this.data.next(newData);
  }

  public getDelete(numite: number) {
    const aux = this.data.getValue();
    const newData = aux.filter((data) => data.numite !== numite);
    this.data.next(newData);
  }

  // getFind(query: string){
  //   const data = this.originalData.getValue()
  //   const newData = data.filter(data =>{
  //     const word = `${data.codart}${data.descri}`
  //     return word.toLowerCase().includes(query.toLowerCase())
  //   })
  //   this.data.next(newData)
  // }

  public getCount() {
    const data = this.data.getValue();
    return data.reduce((count, data) => (count = count + 1), 0);
  }

  public getLastNumite() {
    const data = this.data.getValue();
    return data.reduce((numite, data) => (numite = data.numite), 0);
  }

  public putReasignNumite() {
    // Order by and asing numite
    const data = this.data.getValue();
    const newData = data.map((data, index) => {
      return {
        ...data,
        numite: index + 1,
      };
    });
  }

  public putPreCalculate(numite: number, updatedRow: DocumentDetail) {
    const data = this.data.getValue();
    // Calculo los Precios del Arreglo, del NumintModificado
    const updatedData = data.map((data) => {
      if (data.numite === numite) {
        const typinv = updatedRow.typinv;
        const codart = updatedRow.codart;
        const etiqueta = updatedRow.etiqueta;
        const quantity = updatedRow.quantity;
        const price = updatedRow.price;
        const update = updatedRow.update;
        return {
          ...data,
          typinv,
          codart,
          etiqueta,
          quantity,
          price,
          update,
        };
      }
      return data;
    });
    this.data.next(updatedData);
  }

  public getCalculateImport(numite: number) {
    const data = this.data.getValue();
    // Calculo los Precios del Arreglo, del NumintModificado
    const updatedData = data.map((data) => {
      if (data.numite === numite) {
        const impafecto = data.price * data.quantity;
        const impinafecto = 0;
        const impexonerado = 0;
        const impgratuito = 0;
        const impigv = parseFloat((impafecto * 0.18).toFixed(2));
        const impisc = 0;
        const implistprice =
          impafecto + impinafecto + impexonerado + impgratuito;
        const impdesctotal = 0;
        const impsaleprice = implistprice - impdesctotal;
        const imptribtotal = impigv + impisc;
        const imptotal = impsaleprice + imptribtotal;

        return {
          ...data,
          impafecto,
          impinafecto,
          impexonerado,
          impgratuito,
          impigv,
          impisc,
          implistprice,
          impdesctotal,
          impsaleprice,
          imptribtotal,
          imptotal,
        };
      }
      return data;
    });

    this.data.next(updatedData);
  }

  public getClean(numite: number) {
    const aux = this.data.getValue();
    const newData = aux.filter((data) => data.numite !== numite);
    this.data.next(newData);
  }

  public getImp() {
    const data = this.data.getValue();
    const resume: DocumentDetailResume = {
      impafecto: data.reduce(
        (sum, data) => (sum = sum + (data.impafecto ?? 0)),
        0
      ),
      impinafecto: data.reduce(
        (sum, data) => (sum = sum + (data.impinafecto ?? 0)),
        0
      ),
      impexonerado: data.reduce(
        (sum, data) => (sum = sum + (data.impexonerado ?? 0)),
        0
      ),
      impgratuito: data.reduce(
        (sum, data) => (sum = sum + (data.impgratuito ?? 0)),
        0
      ),
      impigv: data.reduce((sum, data) => (sum = sum + (data.impigv ?? 0)), 0),
      impisc: data.reduce((sum, data) => (sum = sum + (data.impisc ?? 0)), 0),
      implistprice: data.reduce(
        (sum, data) => (sum = sum + (data.implistprice ?? 0)),
        0
      ),
      impdesctotal: data.reduce(
        (sum, data) => (sum = sum + (data.impdesctotal ?? 0)),
        0
      ),
      impsaleprice: data.reduce(
        (sum, data) => (sum = sum + (data.impsaleprice ?? 0)),
        0
      ),
      imptribtotal: data.reduce(
        (sum, data) => (sum = sum + (data.imptribtotal ?? 0)),
        0
      ),
      imptotal: data.reduce(
        (sum, data) => (sum = sum + (data.imptotal ?? 0)),
        0
      ),
    };
    return resume;
  }
}
