import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getData(key: string): any {
    return JSON.parse(<string>localStorage.getItem(key));
  }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
  constructor() { }
}
