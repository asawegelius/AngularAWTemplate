import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService<T> {
  /**
   * The observable data source for the table.
   * */
  dataSource = new BehaviorSubject<T[]>([]);


  /**
   * Sets the data for the table.
   * @param data The data to set.
   * */
  setData(data: T[]) {
    this.dataSource.next(data);
  }

  /**
   * Gets the data source as an observable.
   * @returns An observable of the data source.
   * */
  getData() {
    return this.dataSource.asObservable();
  }
}
