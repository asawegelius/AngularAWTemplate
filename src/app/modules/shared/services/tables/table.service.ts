import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService<T> {
  dataSource = new BehaviorSubject<T[]>([]);

  constructor() { }

  setData(data: T[]) {
    this.dataSource.next(data);
  }

  getData() {
    return this.dataSource.asObservable();
  }
}
